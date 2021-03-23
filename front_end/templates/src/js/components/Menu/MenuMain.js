require('../../config')

import React , {useEffect}from "react"
import { HashRouter, Switch, Route } from "react-router-dom"
import { observer } from 'mobx-react'

import MenuList from './MenuListComp.js'
import MenuCreate from './MenuCreateComp.js'
import MenuDetails from './MenuDetailsComp.js'
import MenuEdit from './MenuEditComp.js'
import MenuEditPermission from './MenuEditPermissionComp.js'
import NotFoundPage from '../ErrorPages/NotFoundPageComp'


const MenuMain = observer(({ menuStore, dashboardMainStore }) => {

    useEffect(() => {
        let is_mounted = true;
        if(is_mounted == true){
            console.log(dashboardMainStore.current_user_subroute)
        }
        return () => {
            is_mounted = false;
        } 
    }, []);

    return (
        <HashRouter>
            <Switch>

                {/* LIST */}
                <Route path="/menus">
                    { dashboardMainStore.checkIfSubrouteExist('menu-manage-page') ? 
                        <MenuList menuStore={menuStore} dashboardMainStore={dashboardMainStore}/> : <NotFoundPage/> }
                </Route>

                {/* CREATE */}
                <Route exact path="/menus/create">
                    { dashboardMainStore.checkIfSubrouteExist('menu-create-page') ? 
                        <MenuCreate menuStore={menuStore}/> : <NotFoundPage/> }
                </Route>

                {/* DETAILS */}
                <Route exact path="/menus/:menu_id">
                    { dashboardMainStore.checkIfSubrouteExist('menu-details-page') ? 
                        <MenuDetails menuStore={menuStore} dashboardMainStore={dashboardMainStore}/> : <NotFoundPage/> }
                </Route>

                {/* EDIT */}
                <Route exact path="/menus/:menu_id/edit">
                    { dashboardMainStore.checkIfSubrouteExist('menu-edit-page') ? 
                        <MenuEdit menuStore={menuStore}/> : <NotFoundPage/> }
                </Route>

                {/* EDIT Permissions*/}
                <Route exact path="/menus/:menu_id/edit_permissions">
                    { dashboardMainStore.checkIfSubrouteExist('menu-edit-permissions-page') ? 
                        <MenuEditPermission menuStore={menuStore}/> : <NotFoundPage/> }
                </Route>
    
                {/* Page not found */}
                <Route path="/menus/*">
                    <NotFoundPage/>
                </Route>

            </Switch>
        </HashRouter>
    )

})

export default MenuMain