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
            <input type="text" className="form-control" placeholder="Search .." value={ props.searchValue } onChange={ props.searchHandler } />
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
                <select className="form-control input-md" value={ props.pageSize } onChange={ props.changeHandler } style={{ width:'100%' }}>
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



// Header Pagination Default
function TableHeaderDefault(props){

    return (

        <div className="row">
            
            <div className="col-md-9 d-flex flex-row">
                <div>
                    <AddButton displayText="Add" clickHandler={ props.addButtonClickHandler }/>
                </div>
                <div className="pl-4" style={{ width : '40%' }}>
                    <SearchInput searchValue={ props.searchInputValue } searchHandler={ props.searchInputHandler } />
                </div>
                <div className="pl-4">
                    <FilterButton clickHandler={ props.filterButtonClickHandler } />
                </div>
                <div className="pl-4">
                    <RefreshButton clickHandler={ props.refreshButtonClickHandler } />
                </div>
            </div>

            <div className="col-md-3 d-flex flex-row mt-1">
                <div style={{ width:'50%' }}>
                    <EntriesSelect pageSize={ props.entriesSelectPageSize } changeHandler={ props.entriesSelectChangeHandler } />
                </div>
                <div className="pl-4 mt-1 float-right">
                    <HeaderPaginationDefault
                        pagePrev={ props.paginationPagePrev }
                        pageNext={ props.paginationPageNext }
                        pageLimit={ props.paginationPageLimit }
                        prevClickHandler={ props.paginationPrevClickHandler }
                        nextClickHandler={ props.paginationNextClickHandler }
                    />
                </div>
            </div>

        </div>

    );

}



// Export Functions
export { AddButton, SearchInput, FilterButton, RefreshButton, EntriesSelect, HeaderPaginationDefault, TableHeaderDefault }