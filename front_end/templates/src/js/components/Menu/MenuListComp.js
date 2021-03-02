

import React, { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react'

import { TableHeaderDefault } from '../Utils/Table/TableHeaders'
import { TableFooterDefault } from '../Utils/Table/TableFooters'
import MenuCreateModal from './MenuCreateModalComp'


const MenuList = observer(({ menuStore }) => {

    const history = useHistory();
    const handleCreateButtonClick = useCallback(() => history.push('/create'), [history]);

    
    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            menuStore.fetch()
        }
        return () => {
            is_mounted = false;
        } 
    },[])



    const getTableRows = () => {
        
        let table_rows = []
        let menu_list = menuStore.list

        if(menu_list.length > 0){
            menu_list.forEach((val, key) => {
                table_rows.push(
                    <tr key={key} className={ val.id == menuStore.selected_menu ? "table-success" : "" }>
                        <td className="align-middle">{ val.name }</td>
                        <td className="align-middle">{ val.category }</td>
                        <td className="align-middle">
                            <button className="btn btn-primary btn-sm" type="button" onClick={ (e) => handleUpdateButtonClick(e, val.id) }>
                                <i className="fa fa-pencil ml-1"></i>
                            </button>
                            <button className="btn btn-danger btn-sm ml-1" type="button" onClick={ (e) => handleDeleteButtonClick(e, val.id) }>
                                <i className="fa fa-trash ml-1"></i>
                            </button>
                        </td>
                    </tr>
                )
            })
        }

        return table_rows

    }



    const handleUpdateButtonClick = (e, id) => {
        e.preventDefault()
        $("#menu-update-modal").modal('toggle')
        menuStore.setIsOpenedForm(1)
        menuStore.setMenuId(id)
        menuStore.retrieveUser()
    }



    const handleDeleteButtonClick = (e, id) => {
        e.preventDefault()
        $("#menu-delete-modal").modal('toggle')
        menuStore.setMenuId(id)
    }



    const handleFilterButtonClick = (e) => {
        e.preventDefault()
        $("#menu-filter-modal").modal('toggle')
    }



    return (

        <div className="row">
            <div className="col-md-12">
                <div className="card table-card">

                    {/* Table Header */}
                    <div className="card-header p-b-0"> 
                        <TableHeaderDefault
                            addButtonClickHandler={ handleCreateButtonClick }
                            searchInputValue={ menuStore.query }
                            searchInputHandler={ (e) => menuStore.handleSearch(e) }
                            filterButtonClickHandler={ handleFilterButtonClick }
                            refreshButtonClickHandler={ (e) => menuStore.handleRefreshClick(e) }
                            entriesSelectPageSize={ menuStore.page_size }
                            entriesSelectChangeHandler={ (e) => menuStore.handlePageSizeClick(e) }
                            paginationPagePrev={ menuStore.page_prev }
                            paginationPageNext={ menuStore.page_next }
                            paginationPageLimit={ menuStore.page_limit }
                            paginationPrevClickHandler={ (e) => menuStore.handlePaginationClick(e, menuStore.page_prev) }
                            paginationNextClickHandler={ (e) => menuStore.handlePaginationClick(e, menuStore.page_next) }
                        />  
                    </div>
                    
                    {/* TABLE BODY */}
                    <div className="card-block table-border-style pb-0 pt-0">
                        <div className="table-responsive">
                            <table className="table table-xs table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { getTableRows() }
                                </tbody>
                            </table>
                        </div>

                    </div>
                    

                    {/* Table Footer */}
                    <div className="card-footer">
                        <TableFooterDefault
                            counterPageSize={ menuStore.page_size }
                            counterPageCurrent={ menuStore.page_current }
                            counterPageLimit={ menuStore.page_limit }
                            counterTotalRecords={ menuStore.total_records }
                            paginationPagePrev={ menuStore.page_prev }
                            paginationPageNext={ menuStore.page_next }
                            paginationPageLimit={ menuStore.page_limit }
                            paginationPrevClickHandler={ (e) => menuStore.handlePaginationClick(e, menuStore.page_prev) }
                            paginationNextClickHandler={ (e) => menuStore.handlePaginationClick(e, menuStore.page_next) }  
                        />
                    </div>

                </div>

                {/* Filter Modal */}
                {/* <MenuListFilterModal menuStore={ menuStore } /> */}

                {/* Create Modal */}
                <MenuCreateModal menuStore={ menuStore } />

                {/* Update Modal */}
                {/* <UserUpdateModal menuStore={ menuStore } /> */}

                {/* Delete Modal */}
                {/* <UserDeleteModal menuStore={ menuStore } /> */}

            </div>
        </div>

    );
    
});


export default MenuList