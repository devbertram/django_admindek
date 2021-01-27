require('../../config');

import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

import moment from "moment"
import eventBus from "../Utils/EventBus";

function UserListMain(props){

    const [list, SetList] = useState({})
    const [pagination, SetPagination] = useState({count:0, next:null, previous:null})

    const [query_params, SetQuery] = useState({
        q : null,
        

    })
    const [page_limit, SetPageLimit] = useState(10)


    const fetchUser = (is_mounted) => {

        if(is_mounted == true){
            axios.get('api/user', { params: { q: query} })
                 .then((response) => {
                    eventBus.dispatch("FETCH_USERS", { users: response.data })
                    SetList(response.data.results)
            });
        }

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
                        <td className="align-middle">{ val.is_active == true ? <label class="label label-success">online</label> : <label class="label label-danger">offline</label> }</td>
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


    useEffect (() => {

        let is_mounted = true;

        fetchUser(is_mounted)

        return () => {
            is_mounted = false;
            eventBus.remove("FETCH_USERS");
        } 

    },[])


    


    return (
            
        <div className="row">
            <div className="col-sm-12">
                <div className="card">
                    
                    <div className="card-block table-border-style">


                        {/* FILTERS */}
                        <div className="row">

                            <div className="col-md-4">
                                <div className="input-group input-group-md input-group-button">
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

                            <div className="col-md-5">
                                <button className="btn btn-md btn-success float-right" type="button">
                                    <i className="fa fa-plus-square"></i> Add User
                                </button>
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
                                <span>Showing 1 to 10 of 20 entries</span>
                            </div>
                            <div className="col-md-7">
                                <div className="dataTables_paginate">
                                    <ul className="pagination">
                                        <li className="paginate_button page-item previous disabled" id="complex-dt_previous">
                                            <a href="#" className="page-link">
                                                Previous
                                            </a>
                                        </li>
                                        <li className="page-item active">
                                            <a href="#" className="page-link">1</a>
                                        </li>
                                        <li className="page-item">
                                            <a href="#" className="page-link">2</a>
                                        </li>
                                        <li className="paginate_button page-item next">
                                            <a href="#" className="page-link">Next</a>
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