

import React, { useEffect, useCallback } from 'react'

import moment from 'moment'
import { observer } from 'mobx-react'
import { Link, useHistory } from "react-router-dom"

import { TableHeaderDefault } from '../Utils/Table/TableHeaders'
import { TableFooterDefault } from '../Utils/Table/TableFooters'
import UserListFilterModal from './UserListFilterModalComp'
import UserUpdateModal from './UserUpdateModalComp'
import UserDeleteModal from './UserDeleteModalComp'


const UserList = observer(({ userStore }) => {

    const history = useHistory();


    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            userStore.fetch()
        }
        return () => {
            is_mounted = false;
        } 
    },[])


    const redirectToUserCreate = useCallback(() => {
        history.push('/users/create'), [history]
    });


    const redirectToUserDetails = useCallback((id) => {
        menuStore.setRouteId(id)
        menuStore.setIsOpenedForm(1)
        history.push(url + '/' + id), [history]
    });


    const handleOpenUserDetails = (e, id) => {
        e.preventDefault()
        redirectToUserDetails(id)
    }


    const handleCreateButtonClick = (e) => {
        e.preventDefault()
        if(userStore.is_opened_form === 1){
            userStore.resetForm()
        }
        redirectToUserCreate()
        userStore.setIsOpenedForm(0)
    }


    const handleUpdateButtonClick = (e, id) => {
        e.preventDefault()
        $("#user-update-modal").modal('toggle')
        userStore.setIsOpenedForm(1)
        userStore.setUserId(id)
        userStore.retrieveUser()
    }


    const handleDeleteButtonClick = (e, id) => {
        e.preventDefault()
        $("#user-delete-modal").modal('toggle')
        userStore.setUserId(id)
    }


    const handleFilterButtonClick = (e) => {
        e.preventDefault()
        $("#user-filter-modal").modal('toggle')
    }


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
                                <Link to="/"><i className="feather icon-home"></i></Link>
                            </li>
                            <li className="breadcrumb-item">
                                Users
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
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card table-card">


                                    {/* Table Header */}
                                    <div className="card-header"> 
                                        <TableHeaderDefault
                                            addButtonClickHandler={ handleCreateButtonClick }
                                            searchInputValue={ userStore.query }
                                            searchInputHandler={ (e) => userStore.handleSearch(e) }
                                            filterButton={true}
                                            filterButtonClickHandler={ handleFilterButtonClick }
                                            refreshButtonClickHandler={ (e) => userStore.handleRefreshClick(e) }
                                            entriesSelectPageSize={ userStore.page_size }
                                            entriesSelectChangeHandler={ (e) => userStore.handlePageSizeClick(e) }
                                            paginationPagePrev={ userStore.page_prev }
                                            paginationPageNext={ userStore.page_next }
                                            paginationPageLimit={ userStore.page_limit }
                                            paginationPrevClickHandler={ (e) => userStore.handlePaginationClick(e, userStore.page_prev) }
                                            paginationNextClickHandler={ (e) => userStore.handlePaginationClick(e, userStore.page_next) }
                                        /> 
                                    </div>


                                    {/* TABLE BODY */}
                                    <div className="card-block table-border-style pb-0 pt-0">
                                        <div className="table-responsive">
                                            <table className="table table-sm table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Username</th>
                                                        <th>Name</th>
                                                        <th>Status</th>
                                                        <th>Last Login</th>
                                                        <th>Date Joined</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                { userStore.list.map((val, key) => {
                                                    let last_login = moment(val.last_login).format("MM/DD/YYYY hh:mm A")
                                                    let date_joined = moment(val.date_joined).format("MM/DD/YYYY hh:mm A")
                                                    return (
                                                        <tr key={key} className={ val.id == userStore.selected_user ? "table-info" : "" }>
                                                            <td className="align-middle">
                                                                <a href="#" onClick={ (e) => handleOpenUserDetails(e, val.id) }>
                                                                    <ins className="text-info">{ val.username }</ins>
                                                                </a>
                                                            </td>
                                                            <td className="align-middle">{ val.fullname }</td>
                                                            <td className="align-middle">
                                                                { val.is_active == true ? 
                                                                    <label className="label label-success">active</label> 
                                                                    : <label className="label label-danger">inactive</label> 
                                                                }
                                                            </td>
                                                            <td className="align-middle">{ last_login }</td>
                                                            <td className="align-middle">{ date_joined }</td>
                                                            <td className="align-middle">
                                                                <button className="btn btn-sm btn-primary" type="button" onClick={ (e) => handleUpdateButtonClick(e, val.id) }>
                                                                    <i className="fa fa-pencil ml-1"></i>
                                                                </button>
                                                                <button className="btn btn-sm btn-danger ml-1" type="button" onClick={ (e) => handleDeleteButtonClick(e, val.id) }>
                                                                    <i className="fa fa-trash ml-1"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="table-responsive mt-3" 
                                             style={ userStore.is_loading == true ? {} : { display:"none", }}>
                                            <center><h4>Loading ...</h4></center>
                                        </div>
                                        <div className="table-responsive mt-3" 
                                             style={ userStore.is_loading == false && userStore.list.length === 0 ? {} : { display:"none", }}>
                                            <center><h4>No records found!</h4></center>
                                        </div>
                                    </div>


                                    {/* Table Footer */}
                                    <div className="card-footer">
                                        <TableFooterDefault
                                            counterPageSize={ userStore.page_size }
                                            counterPageCurrent={ userStore.page_current }
                                            counterPageLimit={ userStore.page_limit }
                                            counterTotalRecords={ userStore.total_records }
                                            paginationPagePrev={ userStore.page_prev }
                                            paginationPageNext={ userStore.page_next }
                                            paginationPageLimit={ userStore.page_limit }
                                            paginationPrevClickHandler={ (e) => userStore.handlePaginationClick(e, userStore.page_prev) }
                                            paginationNextClickHandler={ (e) => userStore.handlePaginationClick(e, userStore.page_next) }  
                                        />
                                    </div>

                                </div>

                                {/* Filter Modal */}
                                <UserListFilterModal userStore={ userStore } />

                                {/* Update Modal */}
                                <UserUpdateModal userStore={ userStore } />

                                {/* Delete Modal */}
                                <UserDeleteModal userStore={ userStore } />

                            </div>
                        </div>
    
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
    
});


export default UserList