
require('../../config');

import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import eventBus from "../Utils/EventBus";


function LogoutFormMain(props){

    const handleLogout = (event) => {

        event.preventDefault();
        
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: true, is_dashboard: true});

        axios.post('logout/')
            .then((response) => {
                if (response.status == 200) {
                    localStorage.clear();
                    location.replace(window.location.origin + '/')
                    eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: false, is_dashboard: true });
                }
            });

    }

    return (
        
        <li>
            <a href="#" onClick={handleLogout}>
                <i className="feather icon-log-out"></i> Logout
            </a>
        </li>
        
    );
}


ReactDOM.render( <LogoutFormMain/> , document.getElementById('logout'));