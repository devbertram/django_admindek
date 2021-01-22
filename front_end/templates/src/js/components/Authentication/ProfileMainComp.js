
require('../../config');

import React from "react";
import ReactDOM from "react-dom";

import ProfileUsernameForm from "./ProfileUsernameFormComp";
import ProfilePasswordForm from "./ProfilePasswordFormComp";


function ProfileMain(props){

    return (
        <div>
            <ProfileUsernameForm/>
            <ProfilePasswordForm/>
        </div>
    );
}


ReactDOM.render( <ProfileMain/> , document.getElementById('profile'));