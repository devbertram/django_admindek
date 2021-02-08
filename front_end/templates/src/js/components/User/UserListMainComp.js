require('../../config')

import React, { useState, useEffect, useCallback } from "react"
import ReactDOM from "react-dom"
import moment from "moment"
import { debounce, entries, filter } from 'lodash'
import eventBus from '../Utils/EventBus'

import { Counter, FooterPaginationDefault } from '../Utils/Table/TableFooters'
import { AddButton, SearchInput, FilterButton, RefreshButton, EntriesSelect, HeaderPaginationDefault } from '../Utils/Table/TableHeaders'

function UserListMain(props){

    const [list, SetList] = useState({}) // records
    const [total_records, SetTotalRecords] = useState(0) // total count of records
    const [page_prev, SetPagePrev] = useState(0) // previous page
    const [page_current, SetPageCurrent] = useState(1) // current page
    const [page_next, SetPageNext] = useState(2) // next page
    const [page_size, SetPageSize] = useState(10) // number of records per page
    const [page_limit, SetPageLimit] = useState(0) // number of pages
    const [query, SetQuery] = useState("") // search query
    
    // filters
    const [filter_online_status, SetFilterOnlineStatus] = useState("")
    const [filter_su_status, SetFilterSUStatus] = useState("")

    // search 
	const debounceFetch = useCallback(
        debounce(
            function(prm_query, prm_page_size, prm_page_current, prm_filter_online_status, prm_filter_su_status){
                fetch(prm_query, prm_page_size, prm_page_current, prm_filter_online_status, prm_filter_su_status)
            }, 
        500), []
    );


    
    useEffect (() => {
        
        let is_mounted = true;

        if(is_mounted = true){
            fetch(query, page_size, page_current, filter_online_status, filter_su_status)
        }

        return () => {
            is_mounted = false;
        } 

    },[])



    const fetch = (prm_query, prm_page_size, prm_page_current, prm_filter_online_status, prm_filter_su_status) => {

        axios.get('api/user', { 
            params: { 
                q: prm_query, 
                page_size: prm_page_size, 
                page: prm_page_current, 
                os:prm_filter_online_status, 
                sus:prm_filter_su_status 
            }
        }).then((response) => {
            SetList(response.data.results)
            SetTotalRecords(response.data.count)
            SetPageLimit(Math.ceil(response.data.count / prm_page_size))
        });

    }



    const getTableRows = () => {
        
        let table_rows = []

        if(list.length > 0){

            list.forEach((val, key) => {

                let last_login = moment(val.last_login).format("MM/DD/YYYY hh:mm A")
                let date_joined = moment(val.date_joined).format("MM/DD/YYYY hh:mm A")

                table_rows.push(
                    <tr key={key}>
                        <td className="align-middle">{ val.username }</td>
                        <td className="align-middle">{ val.fullname }</td>
                        <td className="align-middle">{ val.is_active == true ? <label className="label label-success">online</label> : <label className="label label-danger">offline</label> }</td>
                        <td className="align-middle">{ last_login }</td>
                        <td className="align-middle">{ date_joined }</td>
                        <td className="align-middle">
                            <button className="btn btn-primary btn-sm" type="button">
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



    const handlePaginationClick = (e, prm_page_current) => {

        e.preventDefault()

        if(prm_page_current > 0 && prm_page_current <= page_limit){
            SetPagePrev(prm_page_current - 1)
            SetPageCurrent(prm_page_current)
            SetPageNext(prm_page_current + 1)
            fetch(query, page_size, prm_page_current, filter_online_status, filter_su_status)
        }

    }



    const handlePageSizeClick = (e) => {

        e.preventDefault()

        let prm_page_size = e.target.value

        if(prm_page_size > 0){
            SetPagePrev(0)
            SetPageCurrent(1)
            SetPageNext(2)
            SetPageSize(prm_page_size)
            fetch(query, prm_page_size, 1, filter_online_status, filter_su_status)
        }

    }



    const handleSearch = (e) => {

        e.preventDefault()
        
        let prm_query = e.target.value

        SetPagePrev(0)
        SetPageCurrent(1)
        SetPageNext(2)
        SetQuery(prm_query)
        debounceFetch(prm_query, page_size, 1, filter_online_status, filter_su_status)
        
    }



    const handleFilterButtonClick = (e) => {
        e.preventDefault()
        $("#user-filter-modal").modal('toggle');
    }



    const handleFilterSubmit = (e) => {

        e.preventDefault()
        
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: true, is_dashboard: true })

        SetPagePrev(0)
        SetPageCurrent(1)
        SetPageNext(2)
        fetch(query, page_size, 1, filter_online_status, filter_su_status)
        
        $("#user-filter-modal").modal('hide')

        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: false, is_dashboard: true })
        
    }



    const handleRefreshClick = (e) => {

        e.preventDefault()

        SetPagePrev(0)
        SetPageCurrent(1)
        SetPageNext(2)
        SetPageSize(10)
        SetQuery("")
        SetFilterOnlineStatus("")
        SetFilterSUStatus("")
        fetch("", 10, 1, "", "")
        
    }



    const handleAddButtonClick = (e) => {

        e.preventDefault()

        console.log('test');
        
    }



    return (

        <div className="row">
            <div className="col-sm-12">
                <div className="card">
                    
                    <div className="card-block table-border-style">


                        {/* Table Header */}
                        <div className="row">

                            <div className="col-md-9 d-flex flex-row">

                                <div>
                                    <AddButton displayText="Add" clickHandler={ handleAddButtonClick }/>
                                </div>

                                <div className="pl-4" style={{ width : '40%' }}>
                                    <SearchInput searchText={ query } clickHandler={ handleSearch } />
                                </div>

                                <div className="pl-4">
                                    <FilterButton clickHandler={ handleFilterButtonClick } />
                                </div>

                                <div className="pl-4">
                                    <RefreshButton clickHandler={ handleRefreshClick } />
                                </div>

                            </div>

                            <div className="col-md-3 d-flex flex-row mt-1">
                                <div style={{ width:'50%' }}>
                                    <EntriesSelect pageSize={ page_size } clickHandler={ handlePageSizeClick } />
                                </div>
                                <div className="pl-4 mt-1 float-right">
                                    <HeaderPaginationDefault
                                        pagePrev={ page_prev }
                                        pageNext={ page_next }
                                        pageLimit={ page_limit }
                                        prevClickHandler={ (e) => { handlePaginationClick(e, page_prev) } }
                                        nextClickHandler={ (e) => { handlePaginationClick(e, page_next) } }
                                    />
                                </div>
                            </div>

                        </div>


                        {/* TABLE */}
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


                        {/* Table Footer */}
                        <div className="row mt-4">
                            <div className="col-md-5 mt-1">
                                <Counter
                                    pageSize={ page_size }
                                    pageCurrent={ page_current }
                                    pageLimit={ page_limit }
                                    totalCount={ total_records }
                                />
                            </div>
                            <div className="col-md-7">
                                <FooterPaginationDefault
                                    pagePrev={ page_prev }
                                    pageNext={ page_next }
                                    pageLimit={ page_limit }
                                    prevClickHandler={ (e) => { handlePaginationClick(e, page_prev) } }
                                    nextClickHandler={ (e) => { handlePaginationClick(e, page_next) } }
                                />
                            </div>
                        </div>


                        {/* Filter Modal */}
                        <div className="modal" id="user-filter-modal" role="dialog">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">

                                    <div className="modal-header">
                                        <h4 className="modal-title">Filter Records</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <div className="modal-body">

                                        <div className="form-group row">

                                            <div className="col-sm-6">
                                                <label className="col-sm-12 col-form-label">Online Status:</label>
                                                <div className="col-sm-12">
                                                    <select name="select" className="form-control" value={ filter_online_status } onChange={ e => SetFilterOnlineStatus(e.target.value) }>
                                                        <option value="">None</option>
                                                        <option value="1">Online</option>
                                                        <option value="0">Offline</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <label className="col-sm-12 col-form-label">Super User Status:</label>
                                                <div className="col-sm-12">
                                                    <select name="select" className="form-control" value={ filter_su_status } onChange={ e => SetFilterSUStatus(e.target.value) }>
                                                        <option value="">None</option>
                                                        <option value="1">Super User</option>
                                                        <option value="0">Normal User</option>
                                                    </select>
                                                </div>
                                            </div>
                                            
                                        </div>

                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleFilterSubmit }>Filter</button>
                                    </div>

                                </div>
                            </div>
                        </div>



                    </div>

                </div>
            </div>
        </div>

    );
    
}


ReactDOM.render( <UserListMain/> , document.getElementById('user_list'));