
import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import eventBus from "./EventBus";

import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';

function ToastNotification(props){ 

    useEffect(() => {
        
        eventBus.on("SHOW_TOAST_NOTIFICATION", (data) => {

            store.addNotification({
                title: data.title,
                message: data.message,
                type: data.type,
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__slideInRight"],
                animationOut: ["animate__animated", "animate__slideOutRight"], 
                width: 400,
                dismiss: {
                  duration: 4000,
                  onScreen: true,
                  pauseOnHover: true,
                  click: true,
                  showIcon: true
                }
            });
            
        });

        return () => {
            eventBus.remove("SHOW_TOAST_NOTIFICATION");
        }

    });

    return (
        <ReactNotification />
    );
}


ReactDOM.render(<ToastNotification />, document.getElementById('toast'));