require('../../config')

import React from "react"
import { observer } from 'mobx-react'

import UserListComp from './UserListComp'

const UserMain = observer(({ userStore }) => {

    return (
    <div className="pcoded-content">
        <div className="page-header card">
            <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <i className="feather icon-user bg-c-blue"></i>
                        <div className="d-inline">
                            <h5>Users</h5>
                            <span>Manage Users</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="page-header-breadcrumb">
                        <ul className=" breadcrumb breadcrumb-title">
                            <li className="breadcrumb-item">
                                <a href="{% url 'dashboard_home_page' %}"><i className="feather icon-home"></i></a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="#">Users</a>
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
    
                        <UserListComp userStore={ userStore }/>
    
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

})

export default UserMain