

import React, { useEffect } from 'react'

import moment from 'moment'
import { observer } from 'mobx-react'

import { TableHeaderDefault } from '../Utils/Table/TableHeaders'
import { TableFooterDefault } from '../Utils/Table/TableFooters'
import UserListFilterModal from './UserListFilterModalComp'
import UserCreateModal from './UserCreateModalComp'
import UserUpdateModal from './UserUpdateModalComp'
import UserDeleteModal from './UserDeleteModalComp'


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
                            <button className="btn btn-sm btn-primary" type="button" onClick={ (e) => handleUpdateButtonClick(e, val.id) }>
                                <i className="fa fa-pencil ml-1"></i>
                            </button>
                            <button className="btn btn-sm btn-danger ml-1" type="button" onClick={ (e) => handleDeleteButtonClick(e, val.id) }>
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
        console.log(userStore.is_opened_form)
        if(userStore.is_opened_form === 1){
            userStore.resetForm()
        }
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

        <div className="row">
            <div className="col-sm-12">
                <div className="card table-card">


                    {/* Table Header */}
                    <div className="card-header"> 
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
                    </div>


                    {/* TABLE BODY */}
                    <div className="card-block table-border-style pb-0 pt-0">
                        <div className="table-responsive">
                            <table className="table table-xs table-striped table-bordered">
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

                {/* Create Modal */}
                <UserCreateModal userStore={ userStore } />

                {/* Update Modal */}
                <UserUpdateModal userStore={ userStore } />

                {/* Delete Modal */}
                <UserDeleteModal userStore={ userStore } />

            </div>
        </div>

    );
    
});


export default UserList