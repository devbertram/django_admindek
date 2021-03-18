
import React, { useState, useEffect, useCallback } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom"

function SideNavMenuWithLevel(props){

    const location = useLocation();
    const history = useHistory();
    const [is_menu_open, SetIsMenuOpen] = useState(false);
    
    useEffect(() => {
        let is_mounted = true;
        if(is_mounted == true){
            // check active path onload
            props.submenus.forEach((val, key) => {
                if(props.current_path.includes(val.subroute.url)){
                    SetIsMenuOpen(true);
                }
            })
        }
        return () => {
            is_mounted = false;
        } 
    }, []);


    const redirectToPath = useCallback((path) => {
        history.push(path), [history]
    });


    const getSubmenus = () => {
        const submenus = [];
        if(props.submenus.length > 0){
            props.submenus.forEach((val, key) => {
                if(val.subroute.is_nav == true){
                    submenus.push(
                        <li className={ hasActiveSubmenuPath(val.subroute.url) ? 'active' : '' } key={key}>
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


    const hasActiveSubmenuPath = (url) => {
        return location.pathname.includes(url);
    }


    const hasActiveMenuPath = () => {
        return is_menu_open === true || location.pathname.includes(props.url_name);
    }


    const handleClickMenu = (e, url) =>{
        e.preventDefault()
        redirectToPath(url)
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
        <li className={ hasActiveMenuPath() ? "pcoded-hasmenu active pcoded-trigger" : "pcoded-hasmenu"} dropdown-icon="style1" subitem-icon="style1" onClick={ handleOpen }>
            <NavLink to="#" onClick={ e => e.preventDefault()  } className="waves-effect waves-dark">
                <span className="pcoded-micon"><i className={ props.menu_icon }></i></span>
                <span className="pcoded-mtext">{ props.menu_name }</span>
            </NavLink>
            <ul className="pcoded-submenu" style={ hasActiveMenuPath() ? {display:''} : {display:'none'} }>
                { getSubmenus() }
            </ul>
        </li>
    );


}


export default SideNavMenuWithLevel;