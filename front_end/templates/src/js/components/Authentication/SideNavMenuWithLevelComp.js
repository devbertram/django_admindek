
import React, { useState, useEffect, useCallback } from "react";

import { NavLink, useLocation, useHistory } from "react-router-dom"

function SideNavMenuWithLevel(props){

    const location = useLocation();
    const history = useHistory();
    const [is_menu_open, SetIsMenuOpen] = useState(false);
    const [current_path, SetCurrentPath] = useState("");

    useEffect(() => {
        let is_mounted = true;
        if(is_mounted == true){
            hasActiveRouteOnLoad()
        }
        return () => {
            is_mounted = false;
        } 
    }, []);


    const redirectToPath = useCallback((path) => {
        history.push(path), [history]
    });
    

    const hasActiveRouteOnLoad = () => {
        props.submenus.forEach((val, key) => {
            if(props.current_route.includes(val.subroute.url)){
                SetIsMenuOpen(true);
            }
        })
    }


    const hasActiveRoute = (path) => {
        return location.pathname === path;
    }


    const getSubmenus = () => {
        const submenus = [];
        if(props.submenus.length > 0){
            props.submenus.forEach((val, key) => {
                if(val.subroute.is_nav == true){
                    submenus.push(
                        <li className={ hasActiveRoute(val.subroute.url) ? 'active' : '' } key={key}>
                            <NavLink to="#" className="waves-effect waves-dark" onClick={e => handleClickMenu(e, val.subroute.url)}>
                                <span className="pcoded-mtext">{ val.subroute.nav_name }</span>
                            </NavLink>
                        </li>
                    )
                }
            })
        }
        return submenus
    }


    const handleClickMenu = (e, path) =>{
        e.preventDefault()
        redirectToPath(path)
        SetCurrentPath(path)
    }

    
    const handleOpen = (e) =>{
        e.preventDefault()
        if(is_menu_open == false){
            SetIsMenuOpen(true)
        }else{
            SetIsMenuOpen(false)
        }
    }


    return (
        <li className={is_menu_open === true || current_path === location.pathname ? "pcoded-hasmenu active pcoded-trigger" : "pcoded-hasmenu"} 
            dropdown-icon="style1" 
            subitem-icon="style1" 
            onClick={ handleOpen }
            id={props.id}>
            <NavLink to="#" onClick={ e => e.preventDefault() } className="waves-effect waves-dark">
                <span className="pcoded-micon"><i className={ props.menu_icon }></i></span>
                <span className="pcoded-mtext">{ props.menu_name }</span>
            </NavLink>
            <ul className="pcoded-submenu" style={ is_menu_open === true || current_path === location.pathname ? {display:''} : {display:'none'} }>
                { getSubmenus() }
            </ul>
        </li>
    );


}


export default SideNavMenuWithLevel;