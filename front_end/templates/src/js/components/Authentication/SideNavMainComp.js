
require('../../config');

import React , { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import eventBus from "../Utils/EventBus";

import SideNavMenu from "./SideNavMenuComp";
import SideNavMenuWithLevel from "./SideNavMenuWithLevelComp";

function SideNavMain(props){

    const [routes, setRoutes] = useState({});


    useEffect(() => {

        let is_mounted = true;

        if(is_mounted == true){
            axios.get('api/user_route/get_by_user/')
                 .then((response) => {
                    eventBus.dispatch("GET_ROUTES", { routes: response.data });
                 });
        }

        return () => {
            is_mounted = false;
            eventBus.remove("GET_ROUTES");
        } 

    }, []);


    eventBus.on("GET_ROUTES", (data) => setRoutes(data.routes));


    const getMenus = (category) => {

        const admin_menus = [];

        if(routes.length > 0){
            routes.forEach((val, key) => {
                if(val.route.category == category) {
    
                    if(val.route.is_menu == true){
                        if(val.route.is_dropdown == false){
                            admin_menus.push(
                                <SideNavMenu 
                                    key={key} 
                                    menu_name={val.route.nav_name} 
                                    menu_icon={val.route.icon} 
                                    url={val.route.url}
                                />
                            )
                        }else{
                            admin_menus.push(
                                <SideNavMenuWithLevel 
                                    key={key} 
                                    menu_name={val.route.nav_name} 
                                    menu_icon={val.route.icon} 
                                    submenus={val.userSubroute_userRoute}
                                />
                            )
                        }
                    }
    
                }
            })
        }

        return admin_menus

    }




    return (

        <nav className="pcoded-navbar">
            <div className="nav-list">
                <div className="pcoded-inner-navbar main-menu">

                    <div className="pcoded-navigation-label">App</div>
                    <ul className="pcoded-item pcoded-left-item">
                        <li className="">
                            <a href="/" className="waves-effect waves-dark">
                                <span className="pcoded-micon">
                                    <i className="ti-home"></i>
                                </span>
                                <span className="pcoded-mtext">Home</span>
                            </a>
                        </li>
                    </ul>

                    <div className="pcoded-navigation-label">Admin</div>
                    <ul className="pcoded-item pcoded-left-item">
                        { getMenus('ADM') }
                    </ul>

                </div>
            </div>
        </nav>


    );
}


ReactDOM.render(<SideNavMain/> , document.getElementById('side_nav'));