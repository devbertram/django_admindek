
require('../../config');

import React , { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import SideNavMenu from "./SideNavMenuComp";
import SideNavMenuWithLevel from "./SideNavMenuWithLevelComp";

function SideNavMain(props){

    const [routes, setRoutes] = useState({});
    const [current_route, setCurrentRoute] = useState({});



    useEffect(() => {

        let is_mounted = true;

        if(is_mounted == true){
            getRoutes()
            getCurrentRoute()
        }

        return () => {
            is_mounted = false;
        } 

    }, []);



    const getRoutes = () => {
        
        axios.get('api/user_route/get_by_user/')
        .then((response) => {
            setRoutes(response.data)
        });

    }



    const getCurrentRoute = () => {
        
        let url = window.location.toString();
        setCurrentRoute(url.replace(window.location.origin, ""))

    }



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
                                    current_route={current_route}
                                />
                            )
                        }else{
                            admin_menus.push(
                                <SideNavMenuWithLevel 
                                    key={key} 
                                    menu_name={val.route.nav_name} 
                                    menu_icon={val.route.icon} 
                                    submenus={val.userSubroute_userRoute}
                                    current_route={current_route}
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
                        <li className={ current_route == "/dashboard" ? "active" : "" }>
                            <a href="/dashboard" className="waves-effect waves-dark">
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