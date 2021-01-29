require('../../config')

import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom"

import moment from "moment"

function UserListMain(props){

    const [list, SetList] = useState({})
    const [pagination_count, SetPaginationCount] = useState(0)
    
    const [page_prev, SetPagePrev] = useState(0)
    const [page_current, SetPageCurrent] = useState(1)
    const [page_next, SetPageNext] = useState(2)

    const [query, SetQuery] = useState("")
    const [page_size, SetPagSize] = useState(5)

    const page_limit = Math.ceil(pagination_count / page_size)



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

        axios.get('api/user', { params: { q:q, page_size:ps, page: pc } })
             .then((response) => {
                SetList(response.data.results)
                SetPaginationCount(response.data.count)
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



    const getPaginationCountFrom = (count) => {

        let count_from = 0

        if(count > 0){
            let current_count = page_size * page_current
            let factor = page_size - 1
            count_from = current_count - factor
        }

        return count_from

    }



    const getPaginationCountTo = (count) => {

        let count_to = 0

        if(count > 0){
            
            if(page_current == page_limit){
                count_to = count
            }else{
                count_to = page_size * page_current
            }
            
        }

        return count_to

    }



    const handlePaginationClick = (e, q, ps, cp) => {

        e.preventDefault()

        if(cp > 0 && cp <= page_limit){

            SetPagePrev(cp - 1)
            SetPageNext(cp + 1)
            SetPageCurrent(cp)

            fetch(q, ps, cp)

        }

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
                                    <input type="text" className="form-control" placeholder="Search .."/>
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-1">
                                <button className="btn btn-primary ml-2" type="button">
                                    <i className="fa fa-filter"></i> Filters
                                </button>
                            </div>

                            <div className="col-md-2">
                                <div className="form-group row mt-1">
                                    <div className="col-md-5">
                                        <label className="col-form-label mt-1 ml-4">
                                            Entries:
                                        </label>
                                    </div>
                                    <div className="col-md-7">
                                        <select className="form-control input-md">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="dataTables_paginate mt-2">
                                    <ul className="pagination">

                                        <li className={page_prev > 0 ? "page-item" : "page-item disabled"} 
                                            onClick={(e) => { handlePaginationClick(e, query, page_size, page_prev) }}>
                                            <a href={ void(0) } className="page-link">Previous</a>
                                        </li>

                                        <li className={page_next != 0 && page_next <= page_limit ? "page-item" : "page-item disabled"} 
                                            onClick={(e) => { handlePaginationClick(e, query, page_size, page_next) } }>
                                            <a href={ void(0) } className="page-link">Next</a>
                                        </li>

                                    </ul>
                                </div>
                            </div>

                        </div>


                        {/* TABLE */}
                        <div className="table-responsive mt-3">
                            <table className="table table-striped table-bordered table-de">
                                <thead>
                                    <tr>
                                        <th>Username</th>
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
                                <span>
                                    Showing { getPaginationCountFrom(pagination_count) } to { getPaginationCountTo(pagination_count) } of { pagination_count } entries
                                </span>
                            </div>
                            <div className="col-md-7">
                                <div className="dataTables_paginate">
                                    <ul className="pagination">

                                        <li className={page_prev > 0 ? "page-item" : "page-item disabled"} 
                                            onClick={(e) => { handlePaginationClick(e, query, page_size, page_prev) }}>
                                            <a href={ void(0) } className="page-link">Previous</a>
                                        </li>

                                        <li className={page_next != 0 && page_next <= page_limit ? "page-item" : "page-item disabled"} 
                                            onClick={(e) => { handlePaginationClick(e, query, page_size, page_next) } }>
                                            <a href={ void(0) } className="page-link">Next</a>
                                        </li>

                                    </ul>
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