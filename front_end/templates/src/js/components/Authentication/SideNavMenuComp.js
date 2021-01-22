
import React from "react";

function SideNavMenu(props){

    return (
        <li>
            <a href={ props.url } className="waves-effect waves-dark">
                <span className="pcoded-micon">
                    <i className={ props.menu_icon }></i>
                </span>
                <span className="pcoded-mtext">{ props.menu_name }</span>
            </a>
        </li>
    );
}


export default SideNavMenu;