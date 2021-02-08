import React from "react";


// Add Button
function AddButton(props){
    return (
        <button className="btn btn-md btn-success" type="button" onClick={ props.clickHandler }>
            <i className="fa fa-plus-square"></i> { props.displayText }
        </button>
    );
}


// Search
function SearchInput(props){
    return (
        <div className="input-group input-group-button">
            <input type="text" className="form-control" placeholder="Search .." value={ props.searchText } onChange={ props.clickHandler } />
            <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </div>
    );
}


// Filter Button
function FilterButton(props){
    return (
        <button className="btn btn-primary" type="button" onClick={ props.clickHandler } >
            <i className="fa fa-filter"></i> Filters
        </button>
    );
}


// Refresh Button
function RefreshButton(props){
    return (
        <button className="btn btn-primary" type="button" onClick={ props.clickHandler } >
            &nbsp;<i className="fa fa-refresh"></i>
        </button>
    );
}


// Entries
function EntriesSelect(props){
    return (
        <div className="form-group d-flex flex-row">
            <div>
                <label className="col-form-label mt-1">
                    Entries:
                </label>
            </div>
            <div className="pl-2">
                <select className="form-control input-md" value={ props.pageSize } onChange={ props.clickHandler } style={{ width:'100%' }}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
    );
}


// Header Pagination Default
function HeaderPaginationDefault(props){
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



// Export Functions
export { AddButton, SearchInput, FilterButton, RefreshButton, EntriesSelect, HeaderPaginationDefault }