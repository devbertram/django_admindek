require('../../config')

import React from "react"
import { observer } from 'mobx-react'
import { HashRouter, Switch, Route } from "react-router-dom"

import UserList from './UserListComp'
import UserCreate from './UserCreateComp'

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

            </Switch>
        </HashRouter>
    )

})

export default UserMain