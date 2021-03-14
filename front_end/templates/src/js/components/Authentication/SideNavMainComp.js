
require('../../config');

import React ,{ useState, useEffect } from "react"
import { NavLink, useLocation} from "react-router-dom"

import SideNavMenu from "./SideNavMenuComp"
import SideNavMenuWithLevel from "./SideNavMenuWithLevelComp"

function SideNavMain(props){

    const location = useLocation();
    const [routes, setRoutes] = useState({});
    const [current_path, setCurrentPath] = useState("");


    useEffect(() => {
        let is_mounted = true;
        if(is_mounted == true){
            getRoutes()
            setCurrentPath(location.pathname)
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
                                    current_path={current_path}
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
                        <li className={ location.pathname === "/" ? "active" : "" } key={0}>
                            <NavLink to="/" className="waves-effect waves-dark">
                                <span className="pcoded-micon">
                                    <i className="ti-home"></i>
                                </span>
                                <span className="pcoded-mtext">Home</span>
                            </NavLink>
                        </li>
                    </ul>

                    <div className="pcoded-navigation-label">Admin</div>
                    <ul className="pcoded-item pcoded-left-item">
                        { getMenus('ADM') }
                    </ul>

                    <div className="pcoded-navigation-label">HR</div>
                    <ul className="pcoded-item pcoded-left-item">
                        { getMenus('HR') }
                    </ul>

                </div>
            </div>
        </nav>
    );


}

export default SideNavMain;