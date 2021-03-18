require('../../config')

import React from "react"
import { observer } from 'mobx-react'
import { HashRouter, Switch, Route } from "react-router-dom"

import UserList from './UserListComp'
import UserCreate from './UserCreateComp'
import UserDetails from './UserDetailsComp'
import UserEdit from './UserEditComp'
import UserResetPassword from './UserResetPasswordComp'

const UserMain = observer(({ userStore }) => {

    return (
        <HashRouter>
            <Switch>

                {/* LIST */}
                <Route exact path="/users">
                    <UserList userStore={ userStore }/>
                </Route>

                {/* CREATE */}
                <Route exact path="/users/create">
                    <UserCreate userStore={ userStore }/>
                </Route>

                {/* DETAILS */}
                <Route exact path="/users/:user_id">
                    <UserDetails userStore={ userStore }/>
                </Route>

                {/* EDIT */}
                <Route exact path="/users/:user_id/edit">
                    <UserEdit userStore={ userStore }/>
                </Route>

                {/* RESET PASSWORD */}
                <Route exact path="/users/:user_id/reset_password">
                    <UserResetPassword userStore={ userStore }/>
                </Route>

            </Switch>
        </HashRouter>
    )

})

export default UserMain