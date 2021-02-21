

import React, { useEffect } from 'react'

import moment from 'moment'
import { observer } from 'mobx-react'

import { TableHeaderDefault } from '../Utils/Table/TableHeaders'
import { TableFooterDefault } from '../Utils/Table/TableFooters'
import UserListFilterModal from './UserListFilterModalComp'
import UserCreateModal from './UserCreateModalComp'
import UserUpdateModal from './UserUpdateModalComp'


const UserList = observer(({ userStore }) => {


    
    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            userStore.fetch()
            userStore.setRouteOptions()
        }
        return () => {
            is_mounted = false;
        } 
    },[])



    const getTableRows = () => {
        
        let table_rows = []
        let user_list = userStore.list

        if(user_list.length > 0){

            user_list.forEach((val, key) => {

                let last_login = moment(val.last_login).format("MM/DD/YYYY hh:mm A")
                let date_joined = moment(val.date_joined).format("MM/DD/YYYY hh:mm A")
                
                table_rows.push(
                    <tr key={key} className={ val.id == userStore.selected_user ? "table-success" : "" }>
                        <td className="align-middle">{ val.username }</td>
                        <td className="align-middle">{ val.fullname }</td>
                        <td className="align-middle">{ val.is_active == true ? <label className="label label-success">online</label> : <label className="label label-danger">offline</label> }</td>
                        <td className="align-middle">{ last_login }</td>
                        <td className="align-middle">{ date_joined }</td>
                        <td className="align-middle">
                            <button className="btn btn-primary btn-sm" type="button" onClick={ (e) => handleUpdateButtonClick(e, val.id) }>
                                <i className="fa fa-pencil ml-1"></i>
                            </button>
                            <button className="btn btn-danger btn-sm ml-1" type="button">
                                <i className="fa fa-trash ml-1"></i>
                            </button>
                        </td>
                    </tr>
                )

            })

        }

        return table_rows

    }



    const handleCreateButtonClick = (e) => {
        e.preventDefault()
        $("#user-create-modal").modal('toggle')
        userStore.resetForm()
    }



    const handleUpdateButtonClick = (e, id) => {
        e.preventDefault()
        $("#user-update-modal").modal('toggle')
        userStore.retrieveUser(id)
    }



    const handleFilterButtonClick = (e) => {
        e.preventDefault()
        $("#user-filter-modal").modal('toggle')
    }



    return (

        <div className="row">
            <div className="col-sm-12">
                <div className="card">
                    
                    <div className="card-block table-border-style">

                        {/* Table Header */}
                        <TableHeaderDefault
                            addButtonClickHandler={ handleCreateButtonClick }
                            searchInputValue={ userStore.query }
                            searchInputHandler={ (e) => userStore.handleSearch(e) }
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


                        {/* TABLE BODY */}
                        <div className="table-responsive mt-3">
                            <table className="table table-striped table-bordered table-de">
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
                                    { getTableRows() }
                                </tbody>
                            </table>
                        </div>

                        <div className="table-responsive mt-3" 
                             style={ userStore.is_loading == true ? {} : { display:"none", }}>
                            <center><h4>Loading ...</h4></center>
                        </div>
        
                        <div className="table-responsive mt-3" 
                             style={ userStore.is_loading == false && userStore.list.length == 0 ? {} : { display:"none", }}>
                            <center><h4>No records found!</h4></center>
                        </div>


                        {/* Table Footer */}
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


                        {/* Filter Modal */}
                        <UserListFilterModal userStore={ userStore } />


                        {/* Create Modal */}
                        <UserCreateModal userStore={ userStore } />


                        {/* Update Modal */}
                        <UserUpdateModal userStore={ userStore } />

                    </div>

                </div>
            </div>
        </div>

    );
    
});


export default UserList