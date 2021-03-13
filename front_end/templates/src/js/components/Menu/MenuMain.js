require('../../config')

import React from "react"
import { HashRouter, Switch, Route } from "react-router-dom"
import { observer } from 'mobx-react'

import MenuList from './MenuListComp.js'
import MenuCreate from './MenuCreateComp.js'
import MenuDetails from './MenuDetailsComp.js'
import MenuEdit from './MenuEditComp.js'
import MenuEditPermission from './MenuEditPermissionComp.js'


const MenuMain = observer(({ menuStore }) => {
    
    return (
        <HashRouter>
            <Switch>

                {/* LIST */}
                <Route exact path="/menus">
                    <MenuList menuStore={ menuStore }/>
                </Route>

                {/* CREATE */}
                <Route exact path="/menus/create">
                    <MenuCreate menuStore={ menuStore }/>
                </Route>

                {/* DETAILS */}
                <Route exact path="/menus/:param_id">
                    <MenuDetails menuStore={ menuStore }/>
                </Route>

                {/* EDIT */}
                <Route exact path="/menus/:param_id/edit">
                    <MenuEdit menuStore={ menuStore }/>
                </Route>

                {/* EDIT Permissions*/}
                <Route exact path="/menus/:param_id/edit_permissions">
                    <MenuEditPermission menuStore={ menuStore }/>
                </Route>

            </Switch>
        </HashRouter>
    )

})

export default MenuMain