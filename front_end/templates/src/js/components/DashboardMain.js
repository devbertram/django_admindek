require('../config')

import React from "react"
import ReactDOM from "react-dom"
import { HashRouter, Switch, Route, Link} from "react-router-dom"

import SideNavMain from './Authentication/SideNavMainComp'
import HomeMain from './Home/HomeMain'
import UserMain from './User/UserMain'
import userStore from './User/store/UserStore'
import MenuMain from './Menu/MenuMain'
import menuStore from './Menu/store/MenuStore'

const DashboardMain = () => {

    return (
        <HashRouter>
    
            <div id="pcoded" className="pcoded">
                <div className="pcoded-overlay-box"></div>
        
                <div className="pcoded-container navbar-wrapper">
        
                    <nav className="navbar header-navbar pcoded-header">
                        <div className="navbar-wrapper">
                            <div className="navbar-logo">
                                <Link to="/" style={{fontSize:'20px', fontWeight:'bold'}}>
                                    ADMINDEK
                                </Link>
                                <a className="mobile-menu" id="mobile-collapse" href="#">
                                    <i className="feather icon-menu icon-toggle-right"></i>
                                </a>
                                <a className="mobile-options waves-effect waves-light">
                                    <i className="feather icon-more-horizontal"></i>
                                </a>
                            </div>
                            <div className="navbar-container container-fluid">
                                <ul className="nav-right">
                                    <li className="user-profile header-notification">
                                        <div className="dropdown-primary dropdown">
                                            <div className="dropdown-toggle" data-toggle="dropdown">
                                                <img src={`${window.location.origin}/static/images/user_avatar.jpeg`} className="img-radius" alt="User-Profile-Image"/>
                                                <span>TEEEEEEEEST</span>
                                                <i className="feather icon-chevron-down"></i>
                                            </div>
        
                                            <ul className="show-notification profile-notification dropdown-menu" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
                                            
                                                <li>
                                                    <Link to="/profile">
                                                        <i className="feather icon-user"></i> Profile
                                                    </Link>
                                                </li>
                                            
                                                <div id="logout"></div>
                                            
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

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
                    
                </div>
            </div>

        </HashRouter>
    )

}



ReactDOM.render( 
    <DashboardMain/>, 
    document.getElementById('root')
);