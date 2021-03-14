require('../config')

import React from "react"
import ReactDOM from "react-dom"
import { HashRouter, Switch, Route} from "react-router-dom"

import SideNavMain from './Authentication/SideNavMainComp'
import HomeMain from './Home/HomeMain'
import UserMain from './User/UserMain'
import userStore from './User/store/UserStore'
import MenuMain from './Menu/MenuMain'
import menuStore from './Menu/store/MenuStore'

const DashboardMain = () => {

    return (
        <HashRouter>

            <div className="pcoded-main-container">
                <div className="pcoded-wrapper">

                    <SideNavMain/>

                    <Switch>

                        {/* HOME */}
                        <Route exact path="/">
                            <HomeMain/>
                        </Route>

                        {/* Users */}
                        <Route path="/users">
                            <UserMain userStore={userStore}/>
                        </Route>

                        {/* Menu */}
                        <Route path="/menus">
                            <MenuMain menuStore={menuStore}/>
                        </Route>

                    </Switch>

                </div>
            </div>

        </HashRouter>
    )

}



ReactDOM.render( 
    <DashboardMain/>, 
    document.getElementById('root')
);