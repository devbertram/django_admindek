
import React, { useState } from "react";

function SideNavMenuWithLevel(props){

    const [is_open, setIsOpen] = useState(false);


    const getSubmenus = () => {

        const submenus = [];

        if(props.submenus.length > 0){
            props.submenus.forEach((val, key) => {
                if(val.subroute.is_nav == true){
                    submenus.push(
                        <li className="" key={key}>
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

        if(is_open == false){
            setIsOpen(true)
        }else{
            setIsOpen(false)
        }
        
    }


    return (
        <li className={is_open == true ? "pcoded-hasmenu active pcoded-trigger" : "pcoded-hasmenu"} dropdown-icon="style1" subitem-icon="style1" onClick={handleOpen}>
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