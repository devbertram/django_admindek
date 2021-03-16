require('../config')

import React, {useState, useEffect}from "react"
import ReactDOM from "react-dom"
import { HashRouter, Switch, Route, Link} from "react-router-dom"

import eventBus from "./Utils/EventBus";
import SideNavMain from './SideNavMainComp'

import ProfileMain from './Profile/ProfileMain'
import HomeMain from './Home/HomeMain'
import UserMain from './User/UserMain'
import userStore from './User/store/UserStore'
import MenuMain from './Menu/MenuMain'
import menuStore from './Menu/store/MenuStore'

const DashboardMain = () => {

    const [current_user, SetCurrentUser] = useState({});


    useEffect(() => {
        let is_mounted = true;
        if(is_mounted == true){
            axios.get('api/user/current_user').then(response => SetCurrentUser(response.data));
        }
        return () => {
            is_mounted = false;
        } 
    }, []);


    const handleLogout = (event) => {
        event.preventDefault();
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: true, is_dashboard: true});
        axios.post('logout/')
            .then((response) => {
                if (response.status == 200) {
                    localStorage.clear();
                    location.replace(window.location.origin + '/')
                    eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: false, is_dashboard: true });
                }
            });
    }


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
                                            <span>{ current_user.first_name ? current_user.first_name : current_user.username }</span>
                                            <i className="feather icon-chevron-down"></i>
                                        </div>
                                        <ul className="show-notification profile-notification dropdown-menu" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
                                            <li>
                                                <Link to="/profile">
                                                    <i className="feather icon-user"></i> Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <a href="#" onClick={ handleLogout }>
                                                    <i className="feather icon-log-out"></i> Logout
                                                </a>
                                            </li>
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
    
                            {/* Profile */}
                            <Route path="/profile">
                                <ProfileMain currentUser={current_user}/>
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