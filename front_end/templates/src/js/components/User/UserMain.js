require('../../config')

import React from "react"
import ReactDOM from "react-dom"

import UserListComp from './UserListComp'
import userStore from './store/UserStore'

ReactDOM.render( 
    <UserListComp userStore={ userStore }/>, 
    document.getElementById('user_root')
);