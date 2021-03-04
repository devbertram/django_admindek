require('../../config')

import React from "react"
import ReactDOM from "react-dom"
import { HashRouter, Switch, Route, Link } from "react-router-dom"

import MenuList from './MenuListComp.js'
import MenuCreate from './MenuCreateComp.js'
import MenuDetails from './MenuDetailsComp.js'
import menuStore from './store/MenuStore'


function MenuMain(props){


    return (
        <HashRouter>
            <Switch>

                <Route exact path="/">
                    <div className="pcoded-content">
                        <div className="page-header card">
                            <div className="row align-items-end">
                                <div className="col-lg-8">
                                    <div className="page-header-title">
                                        <i className="feather icon-user bg-c-blue"></i>
                                        <div className="d-inline">
                                            <h5>Menus and Permissions</h5>
                                            <span>Manage Menus and Permissions</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="page-header-breadcrumb">
                                        <ul className=" breadcrumb breadcrumb-title">
                                            <li className="breadcrumb-item">
                                                <a href="/dashboard"><i className="feather icon-home"></i></a>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <a href="#">Menus</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pcoded-inner-content">
                            <div className="main-body">
                                <div className="page-wrapper">
                                    <div className="page-body">
                                        <MenuList menuStore={ props.menuStore }/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Route>

                <Route path="/create">
                    <div className="pcoded-content">
                        <div className="page-header card">
                            <div className="row align-items-end">
                                <div className="col-lg-8">
                                    <div className="page-header-title">
                                        <i className="feather icon-user bg-c-blue"></i>
                                        <div className="d-inline">
                                            <h5>Menus and Permissions</h5>
                                            <span>Manage Menus and Permissions</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="page-header-breadcrumb">
                                        <ul className=" breadcrumb breadcrumb-title">
                                            <li className="breadcrumb-item">
                                                <a href="/dashboard"><i className="feather icon-home"></i></a>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <Link to="/">Menus</Link>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <Link to="/create">Create Menu</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pcoded-inner-content">
                            <div className="main-body">
                                <div className="page-wrapper">
                                    <div className="page-body">
                                        <MenuCreate menuStore={ props.menuStore }/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Route>

                <Route path="/:param_id">
                    <div className="pcoded-content">
                        <div className="page-header card">
                            <div className="row align-items-end">
                                <div className="col-lg-8">
                                    <div className="page-header-title">
                                        <i className="feather icon-user bg-c-blue"></i>
                                        <div className="d-inline">
                                            <h5>Menus and Permissions</h5>
                                            <span>Manage Menus and Permissions</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="page-header-breadcrumb">
                                        <ul className=" breadcrumb breadcrumb-title">
                                            <li className="breadcrumb-item">
                                                <a href="/dashboard"><i className="feather icon-home"></i></a>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <Link to="/">Menus</Link>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <Link to={ "/" + menuStore.route_id }>{ menuStore.route_id }</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pcoded-inner-content">
                            <div className="main-body">
                                <div className="page-wrapper">
                                    <div className="page-body">
                                        <MenuDetails menuStore={ props.menuStore }/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Route>

            </Switch>
        </HashRouter>
    )

}



ReactDOM.render( 
    <MenuMain menuStore={ menuStore }/>, 
    document.getElementById('menu_root')
);