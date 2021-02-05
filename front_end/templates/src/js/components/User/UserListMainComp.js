require('../../config')

import React, {useState, useEffect, useCallback} from "react"
import ReactDOM from "react-dom"
import moment from "moment"
import { debounce, filter } from 'lodash';

import TablePaginationDefault from "../Utils/TablePaginationDefaultComp"
import TableCounter from "../Utils/TableCounterComp"

function UserListMain(props){

    const [list, SetList] = useState({}) // records
    const [total_records, SetTotalRecords] = useState(0) // total count of records
    const [page_prev, SetPagePrev] = useState(0) // previous page
    const [page_current, SetPageCurrent] = useState(1) // current page
    const [page_next, SetPageNext] = useState(2) // next page
    const [page_size, SetPageSize] = useState(10) // number of records per page
    const [page_limit, SetPageLimit] = useState(0) // number of pages
    const [query, SetQuery] = useState("") // search query

	const debounceFetch = useCallback(
        debounce(
            function(q, ps, pc){
                fetch(q, ps, pc)
            }, 
        500), []
    );

    // filters
    const [filter_online_status, SetFilterOnlineStatus] = useState("")
    const [filter_su_status, SetFilterSUStatus] = useState("")


    
    useEffect (() => {

        let is_mounted = true;

        if(is_mounted = true){
            fetch(query, page_size, page_current)
        }

        return () => {
            is_mounted = false;
        } 

    },[])



    const fetch = (q, ps, pc) => {

        axios.get('api/user', { params: { q:q, page_size:ps, page: pc, os:filter_online_status, sus:filter_su_status } })
             .then((response) => {
                SetList(response.data.results)
                SetTotalRecords(response.data.count)
                SetPageLimit(Math.ceil(response.data.count / ps))
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



    const handlePaginationClick = (e, q, ps, cp) => {

        e.preventDefault()

        if(cp > 0 && cp <= page_limit){
            SetPagePrev(cp - 1)
            SetPageCurrent(cp)
            SetPageNext(cp + 1)
            SetPageSize(ps)
            fetch(q, ps, cp)
        }

    }



    const handlePageSizeClick = (e) => {

        e.preventDefault()

        let ps = e.target.value

        if(ps > 0){
            SetPagePrev(0)
            SetPageCurrent(1)
            SetPageNext(2)
            SetPageSize(ps)
            fetch(query, ps, 1)
        }

    }



    const handleSearch = (e) => {

        e.preventDefault()
        
        let q = e.target.value

        SetPagePrev(0)
        SetPageCurrent(1)
        SetPageNext(2)
        SetPageSize(10)
        SetQuery(q)
        debounceFetch(q, 10, 1)
        
    }



    const handleFilterButtonClick = (e) => {

        e.preventDefault()

        $("#user-filter-modal").modal('toggle');
        
    }



    const handleSubmitFilter = (e) => {

        e.preventDefault()

        SetPagePrev(0)
        SetPageCurrent(1)
        SetPageNext(2)
        fetch(query, page_size, 1)
        
        $("#user-filter-modal").modal('hide')
        
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
        fetch("", 10, 1)
        
    }



    return (

        <div className="row">
            <div className="col-sm-12">
                <div className="card">
                    
                    <div className="card-block table-border-style">


                        {/* FILTERS */}
                        <div className="row">

                            <div className="col-md-1">
                                <button className="btn btn-md btn-success" type="button">
                                    <i className="fa fa-plus-square"></i> Add User
                                </button>
                            </div>

                            <div className="col-md-5">
                                <div className="input-group input-group-md input-group-button ml-3">
                                    <input type="text" className="form-control" placeholder="Search .." value={ query } onChange={ handleSearch } />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-1">
                                <button className="btn btn-primary ml-2" type="button" onClick={ handleFilterButtonClick } >
                                    <i className="fa fa-filter"></i> Filters
                                </button>
                            </div>

                            <div className="col-md-1">
                                <button className="btn btn-primary ml-2" type="button" onClick={ handleRefreshClick } >
                                    &nbsp;<i className="fa fa-refresh"></i>
                                </button>
                            </div>

                            <div className="col-md-2">
                                <div className="form-group row">
                                    <div className="col-md-5">
                                        <label className="col-form-label mt-1">
                                            Entries:
                                        </label>
                                    </div>
                                    <div className="col-md-7">
                                        <select className="form-control input-md" value={ page_size } onChange={ handlePageSizeClick }>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-2 mt-1">
                                <TablePaginationDefault
                                    pagePrev={ page_prev }
                                    pageNext={ page_next }
                                    pageLimit={ page_limit }
                                    prevClickHandler={ (e) => { handlePaginationClick(e, query, page_size, page_prev) } }
                                    nextClickHandler={ (e) => { handlePaginationClick(e, query, page_size, page_next) } }
                                />
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


                        {/* PAGINATION */}
                        <div className="row mt-4">
                            <div className="col-md-5 mt-1">
                                <TableCounter
                                    pageSize={ page_size }
                                    pageCurrent={ page_current }
                                    pageLimit={ page_limit }
                                    totalCount={ total_records }
                                />
                            </div>
                            <div className="col-md-7">
                                <TablePaginationDefault
                                    pagePrev={ page_prev }
                                    pageNext={ page_next }
                                    pageLimit={ page_limit }
                                    prevClickHandler={ (e) => { handlePaginationClick(e, query, page_size, page_prev) } }
                                    nextClickHandler={ (e) => { handlePaginationClick(e, query, page_size, page_next) } }
                                />
                            </div>
                        </div>


                        {/* Filter Modal */}
                        <div className="modal fade" id="user-filter-modal" role="dialog">
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
                                                        <option value="">Select</option>
                                                        <option value="1">Online</option>
                                                        <option value="0">Offline</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <label className="col-sm-12 col-form-label">Super User Status:</label>
                                                <div className="col-sm-12">
                                                    <select name="select" className="form-control" value={ filter_su_status } onChange={ e => SetFilterSUStatus(e.target.value) }>
                                                        <option value="">Select</option>
                                                        <option value="1">Super User</option>
                                                        <option value="0">Normal User</option>
                                                    </select>
                                                </div>
                                            </div>
                                            
                                        </div>

                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleSubmitFilter }>Filter</button>
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