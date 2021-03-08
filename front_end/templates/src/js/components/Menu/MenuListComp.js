

import React, { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react'

import { TableHeaderDefault } from '../Utils/Table/TableHeaders'
import { TableFooterDefault } from '../Utils/Table/TableFooters'


const MenuList = observer(({ menuStore }) => {

    const history = useHistory();

    
    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            menuStore.fetch()
        }
        return () => {
            is_mounted = false;
        } 
    },[])



    const redirectToMenuCreate = useCallback(() => {
        if(menuStore.is_opened_form === 1){
            menuStore.resetForm()
        }
        menuStore.setIsOpenedForm(0)
        history.push('/create'), [history]
    });



    const redirectToMenuDetails = useCallback((id) => {
        menuStore.setRouteId(id)
        menuStore.setIsOpenedForm(1)
        history.push('/' + id), [history]
    });



    const getTableRows = () => {
        let table_rows = []
        let menu_list = menuStore.list
        if(menu_list.length > 0){
            menu_list.forEach((val, key) => {
                table_rows.push(
                    <tr key={key} className={ val.id == menuStore.selected_route ? "table-success" : "" }>
                        <th scope="row" className="align-middle">
                            <a href="#" onClick={ (e) => handleClickRow(e, val.id) }>
                                <ins className="text-info">{ val.name }</ins>
                            </a>
                        </th>
                        <td className="align-middle">{ val.category }</td>
                        <td className="align-middle">
                            { val.is_menu == true ? 
                                <label className="label label-success">Yes</label> 
                                : 
                                <label className="label label-danger">No</label> 
                            }
                        </td>
                        <td className="align-middle">
                            { val.is_dropdown == true ? 
                                <label className="label label-success">Yes</label> 
                                : 
                                <label className="label label-danger">No</label> 
                            }
                        </td>
                        <td className="align-middle">{ val.nav_name }</td>
                        <td className="align-middle"><i className={ val.icon }></i></td>
                        <td className="align-middle">{ val.url }</td>
                        <td className="align-middle">{ val.url_name }</td>
                    </tr>
                )
            })
        }
        return table_rows
    }



    const handleClickRow = (e, id) => {
        e.preventDefault()
        redirectToMenuDetails(id)
    }



    const handleFilterButtonClick = (e) => {
        e.preventDefault()
        $("#menu-filter-modal").modal('toggle')
    }



    return (

    <div className="pcoded-content">
        <div className="page-header card">
            <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <i className="feather icon-user bg-c-blue"></i>
                        <div className="d-inline">
                            <h5>Menus and Permissions</h5>
                            <span>Manage Menus and Permissions</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="page-header-breadcrumb">
                        <ul className=" breadcrumb breadcrumb-title">
                            <li className="breadcrumb-item">
                                <a href="/dashboard"><i className="feather icon-home"></i></a>
                            </li>
                            <li className="breadcrumb-item">
                                Menus
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="pcoded-inner-content">
            <div className="main-body">
                <div className="page-wrapper">
                    <div className="page-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card table-card">


                                    {/* Table Header */}
                                    <div className="card-header p-b-0"> 
                                        <TableHeaderDefault
                                            addButtonClickHandler={ redirectToMenuCreate }
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
                                            <table className="table table-sm table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Category</th>
                                                        <th>Is Side Nav.</th>
                                                        <th>Is Side Nav. Dropdown</th>
                                                        <th>Side Nav. Name</th>
                                                        <th>Side Nav. Icon</th>
                                                        <th>Url</th>
                                                        <th>Url Name</th>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
    
});


export default MenuList