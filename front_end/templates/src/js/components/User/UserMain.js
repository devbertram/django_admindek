require('../../config')

import React from "react"
import ReactDOM from "react-dom"

import { UserStoreProvider } from './store/UserContext'
import UserListComp from './UserListComp'

const UserMain = (prop) => {

    return (
        <UserStoreProvider>
            <UserListComp/>
        </UserStoreProvider>
    )
    
}

ReactDOM.render( <UserMain/> , document.getElementById('user_root'));