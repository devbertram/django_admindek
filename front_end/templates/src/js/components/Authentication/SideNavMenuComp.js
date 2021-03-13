
import React from "react";
import { NavLink } from "react-router-dom"

function SideNavMenu(props){

    return (
        <li className={ props.current_route ===  props.url ? "active" : ""}>
            <NavLink to={ props.url } className="waves-effect waves-dark">
                <span className="pcoded-micon">
                    <i className={ props.menu_icon }></i>
                </span>
                <span className="pcoded-mtext">{ props.menu_name }</span>
            </NavLink>
        </li>
    );
    
}


export default SideNavMenu;