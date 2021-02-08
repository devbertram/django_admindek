import React from "react";

function TablePaginationDefault(props){

    return (

        <div className="dataTables_paginate">
            <ul className="pagination">

                <li className={props.pagePrev > 0 ? "page-item" : "page-item disabled"} 
                    onClick={ props.prevClickHandler }>
                    <a href={ void(0) } className="page-link">Previous</a>
                </li>

                <li className={props.pageNext != 0 && props.pageNext <= props.pageLimit ? "page-item" : "page-item disabled"} 
                    onClick={ props.nextClickHandler }>
                    <a href={ void(0) } className="page-link">Next</a>
                </li>

            </ul>
        </div>

    );
    
}


export default TablePaginationDefault;