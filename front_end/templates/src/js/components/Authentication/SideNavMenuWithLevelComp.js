
import React, { useState, useEffect } from "react";

function SideNavMenuWithLevel(props){

    const [is_menu_open, setIsMenuOpen] = useState(false);


    useEffect(() => {
        let is_mounted = true;
        if(is_mounted == true){
            hasActiveRouteOnLoad()
        }
        return () => {
            is_mounted = false;
        } 
    }, []);
        

    const hasActiveRouteOnLoad = () => {
        props.submenus.forEach((val, key) => {
            if(props.current_route === val.subroute.url){
                setIsMenuOpen(true);
            }
        })
    }


    const getSubmenus = () => {
        const submenus = [];
        if(props.submenus.length > 0){
            props.submenus.forEach((val, key) => {
                if(val.subroute.is_nav == true){
                    submenus.push(
                        <li className={ props.current_route === val.subroute.url ? "active" : "" } key={key}>
                            <a href={ val.subroute.url } className="waves-effect waves-dark">
                                <span className="pcoded-mtext">{ val.subroute.nav_name }</span>
                            </a>
                        </li>
                    )
                }
            })
        }
        return submenus
    }

    
    const handleOpen = (event) =>{
        if(is_menu_open == false){
            setIsMenuOpen(true)
        }else{
            setIsMenuOpen(false)
        }
    }


    return (
        <li className={is_menu_open === true ? "pcoded-hasmenu active pcoded-trigger" : "pcoded-hasmenu"} dropdown-icon="style1" subitem-icon="style1" onClick={handleOpen}>
            <a href="#!" className="waves-effect waves-dark">
                <span className="pcoded-micon"><i className={ props.menu_icon }></i></span>
                <span className="pcoded-mtext">{ props.menu_name }</span>
            </a>
            <ul className="pcoded-submenu">
                { getSubmenus() }
            </ul>
        </li>
    );


}


export default SideNavMenuWithLevel;