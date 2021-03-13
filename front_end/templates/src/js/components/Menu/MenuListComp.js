

import React, { useState, useEffect, useCallback } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { observer } from 'mobx-react'

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'
import { TableHeaderDefault } from '../Utils/Table/TableHeaders'
import { TableFooterDefault } from '../Utils/Table/TableFooters'


const MenuList = observer(({ menuStore }) => {

    const history = useHistory();
    const {url} = useRouteMatch();
    const [is_delete_modal_loading, SetIsDeleteModalLoading] = useState(false);
    const [is_page_loading, SetIsPageLoading] = useState(false);
    const [select_all_checkbox, SetSelectAllCheckbox] = useState(false);


    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            menuStore.fetch()
            SetIsPageLoading(true)
        }
        SetIsPageLoading(false)
        return () => {
            is_mounted = false
        } 
    },[])


    const redirectToMenuCreate = useCallback(() => {
        if(menuStore.is_opened_form === 1){
            menuStore.resetForm()
        }
        menuStore.setIsOpenedForm(0)
        history.push(url + '/create'), [history]
    });


    const redirectToMenuDetails = useCallback((id) => {
        menuStore.setRouteId(id)
        menuStore.setIsOpenedForm(1)
        history.push(url + '/' + id), [history]
    });


    const tableRowIsChecked = (id) => {
        return menuStore.selected_rows.some(data => {
            return data.id === id && data.status === true;
        })
    }


    const handleOpenMenuDetails = (e, id) => {
        e.preventDefault()
        redirectToMenuDetails(id)
    }


    const handleSelectCheckbox = (e, id) => {
        menuStore.setSelectedRowObject(e.target.checked, id)
    }


    const handleSelectAllCheckbox = (e) => {
        SetSelectAllCheckbox(e.target.checked)
        menuStore.selected_rows.map(data => {
            menuStore.setSelectedRowObject(e.target.checked, data.id)
        })
    }

    
    const handleOpenBulkDeleteModal = (e) => {
        e.preventDefault()
        $("#route-bulk-delete-modal").modal('toggle')
    }


    const handleBulkDeleteSumbmit = (e) => {
        e.preventDefault()
        let ids_for_delete = [];
        SetIsDeleteModalLoading(true)
        menuStore.selected_rows.map(data => {
            if(data.status === true){
                ids_for_delete.push(data.id)
            }
        })
        if(ids_for_delete.length > 0){
            axios.delete('api/route/bulk_destroy/', {
                data: { 
                    ids:ids_for_delete 
                }
            }).then((response) => {
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "The menus has been successfully Deleted!", type: "inverse"
                });
                menuStore.fetch()
            }).catch((error) => {
                if(error.response.status == 500){
                    eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                        message: "There's an error trying to send data to the server!", type: "danger" 
                    });
                }
            });
        }
        SetIsDeleteModalLoading(false)
        SetSelectAllCheckbox(false)
        $("#route-bulk-delete-modal").modal('hide');
    }


    return (

    <div className="pcoded-content">
        <div className="page-header card">
            <div className="row align-items-end">
                <div className="col-lg-8">
                    <div className="page-header-title">
                        <i className="feather icon-user bg-c-blue"></i>
                        <div className="d-inline">
                            <h5>Menus</h5>
                            <span>Manage Menus and Permissions</span>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="page-header-breadcrumb">
                        <ul className=" breadcrumb breadcrumb-title">
                            <li className="breadcrumb-item">
                                <Link to="/"><i className="feather icon-home"></i></Link>
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

                                    <DivLoader type="Circles" loading={is_page_loading}/>

                                    {/* Table Header */}
                                    <div className="card-header p-b-0"> 
                                        <TableHeaderDefault
                                            addButtonClickHandler={ redirectToMenuCreate }
                                            searchInputValue={ menuStore.query }
                                            searchInputHandler={ (e) => menuStore.handleSearch(e) }
                                            filterButton={ false }
                                            refreshButtonClickHandler={ (e) => menuStore.handleRefreshClick(e) }
                                            deleteButton={true}
                                            deleteButtonDisable= { menuStore.selected_rows.some(data => data.status === true) }
                                            deleteButtonClickHandler={ (e) => handleOpenBulkDeleteModal(e) }
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
                                            <table className="table table-de table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="p-0">
                                                            <div className="checkbox-fade fade-in-primary ml-3 mt-3">
                                                                <label>
                                                                    <input type="checkbox" checked={select_all_checkbox} onChange={ handleSelectAllCheckbox }/>
                                                                    <span className="cr">
                                                                        <i className="cr-icon icofont icofont-ui-check txt-primary"></i>
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </th>
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
                                                { menuStore.list.map((val, key) => {
                                                    return (
                                                        <tr key={key} 
                                                            className={ val.id == menuStore.selected_route || tableRowIsChecked(val.id) ? "table-info" : "" }>

                                                            <td className="p-0">
                                                                <div className="checkbox-fade fade-in-primary ml-3 mt-3">
                                                                    <label>
                                                                        <input key={key}
                                                                               type="checkbox"
                                                                               checked={ tableRowIsChecked(val.id) }
                                                                               onChange={ e => handleSelectCheckbox(e, val.id) }/>
                                                                        <span className="cr">
                                                                            <i className="cr-icon icofont icofont-ui-check txt-primary"></i>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <th scope="row" className="align-middle">
                                                                <a href="#" onClick={ (e) => handleOpenMenuDetails(e, val.id) }>
                                                                    <ins className="text-info">{ val.name }</ins>
                                                                </a>
                                                            </th>
                                                            <td className="align-middle">{ val.category }</td>
                                                            <td className="align-middle">
                                                                { val.is_menu == true ? 
                                                                    <label className="label label-success">Yes</label> 
                                                                    : <label className="label label-danger">No</label> 
                                                                }
                                                            </td>
                                                            <td className="align-middle">
                                                                { val.is_dropdown == true ? 
                                                                    <label className="label label-success">Yes</label> 
                                                                    : <label className="label label-danger">No</label> 
                                                                }
                                                            </td>
                                                            <td className="align-middle">{ val.nav_name }</td>
                                                            <td className="align-middle"><i className={ val.icon }></i></td>
                                                            <td className="align-middle">{ val.url }</td>
                                                            <td className="align-middle">{ val.url_name }</td>
                                                            
                                                        </tr>
                                                    )
                                                }) }
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
                                                                    
        {/* BULK DELETE MODAL */}
        <div className="modal" id="route-bulk-delete-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <DivLoader type="Circles" loading={is_delete_modal_loading}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Delete Menus</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h4>Are you sure you want to permanently delete the selected records?</h4>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger waves-effect waves-light" onClick={ handleBulkDeleteSumbmit }>Delete</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

    );
    
});


export default MenuList