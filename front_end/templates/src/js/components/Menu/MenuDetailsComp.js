

import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react';
import { Link, useParams, useHistory} from 'react-router-dom';

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'



const MenuDetails = observer(({ menuStore }) => {

    const [loader, SetLoader] = useState(false);
    const { param_id } = useParams();
    const history = useHistory();


    
    const redirectBackToMenuList = useCallback(() => {
        history.push('/'), [history]
    });

    
    
    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            SetLoader(true)
            menuStore.setIsOpenedForm(1)
            menuStore.retrieve(param_id)
            menuStore.setSelectedRoute(param_id)
            SetLoader(false)
        }
        return () => {
            is_mounted = false;
        } 
    },[])



    const handleDeleteRouteModal = (e) => {
        e.preventDefault()
        $("#route-delete-modal").modal('toggle')
    }



    const handleDeleteRouteSubmit = (e) => {
        e.preventDefault()
        axios.delete('api/route/'+param_id+'/')
             .then((response) => {
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Menu has been successfully Deleted!", type: "inverse"
                });
                $("#route-delete-modal").modal('hide');
                redirectBackToMenuList()
             }).catch((error) => {
                if(error.response.status == 404){
                    eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                        message: "Data Not Found!", type: "danger" 
                    });
                }
                if(error.response.status == 500){
                    eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                        message: "There's an error trying to send data to the server!", type: "danger" 
                    });
                }
            });
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
                                <Link to="/">Menus</Link>
                            </li>
                            <li className="breadcrumb-item">
                                Details
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

                            <div className="col-sm-12">
                                <div className="card">

                                    <DivLoader type="Circles" loading={loader}/>
                                    <div className="card-header">
                                        <h5>Menu Details</h5>
                                        <Link to="/" className="btn btn-primary btn-outline-primary float-right pt-2 pb-2 ml-2">
                                            <i className="fa fa-navicon"></i> Back to List
                                        </Link>
                                        <button className="btn btn-md btn-danger btn-outline-danger float-right pt-2 pb-2" 
                                                onClick={ handleDeleteRouteModal }>
                                            <i className="fa fa-trash"></i> Delete
                                        </button>
                                    </div>

                                    <div className="card-block">
                                        <div className="col-md-12">

                                            <ul className="nav nav-tabs  tabs" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active show" data-toggle="tab" href="#menuDetails" role="tab" aria-selected="true">
                                                        Menu Details
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="tab" href="#permissions" role="tab" aria-selected="false">
                                                        Permissions
                                                    </a>
                                                </li>
                                            </ul>

                                            <div className="tab-content tabs card-block">

                                                <div className="tab-pane active show" id="menuDetails" role="tabpanel">

                                                    <h5 className="sub-title mt-2">Menu Details</h5>

                                                    <Link to={`/${param_id}/edit`} className="btn btn-md btn-primary btn-outline-primary pt-2 pb-2">
                                                        <i className="fa fa-pencil-square-o"></i> Edit
                                                    </Link>

                                                    <div className="row mt-4">
                                                        <div className="col-md-3">
                                                            <p>Category:</p>
                                                            <p>Name:</p>
                                                            <p>Is Side Navigation:</p>
                                                            <p>Is Side Navigation Dropdown:</p>
                                                            <p>Side Navigation Name:</p>
                                                            <p>Side Navigation Icon:</p>
                                                            <p>Url:</p>
                                                            <p>Url Name:</p>
                                                        </div> 
                                                        <div className="col-md-9">
                                                            <p>{ menuStore.category }</p>
                                                            <p>{ menuStore.name }</p>
                                                            <p>{ menuStore.is_menu === true ? "YES" : "NO" }</p>
                                                            <p>{ menuStore.is_dropdown === true ? "YES" : "NO" } </p>
                                                            <p>{ menuStore.nav_name }</p>
                                                            <p><i className={ menuStore.icon }></i></p>
                                                            <p>{ menuStore.url }</p>
                                                            <p>{ menuStore.name }</p>
                                                        </div> 
                                                    </div>

                                                </div>


                                                <div className="tab-pane" id="permissions" role="tabpanel">

                                                    <h5 className="sub-title mt-2">Permissions</h5>

                                                    <Link to={`/${param_id}/edit_permissions`} className="btn btn-md btn-primary btn-outline-primary pt-2 pb-2">
                                                        <i className="fa fa-pencil-square-o"></i> Edit Permissions
                                                    </Link>

                                                    <div className="table-responsive mt-3">
                                                        <table className="table table-sm">
                                                            <thead>
                                                                <tr>
                                                                    <th>Permission Name</th>
                                                                    <th>Type</th>
                                                                    <th>Subitem Name</th>
                                                                    <th>Url</th>
                                                                    <th>Url Name</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                menuStore.subroutes.map((val, key) =>{
                                                                    return (
                                                                        <tr key={key}>
                                                                            <td>{ val.name }</td>
                                                                            <td className="align-middle">
                                                                                { val.is_nav === true ? 
                                                                                    <label className="label label-success">Subitem</label> 
                                                                                    : 
                                                                                    <label className="label label-danger">API</label> 
                                                                                }
                                                                            </td>
                                                                            <td>{ val.nav_name }</td>
                                                                            <td>{ val.url }</td>
                                                                            <td>{ val.url_name }</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                                                                    
                            {/* DELETE MODAL */}
                            <div className="modal" id="route-delete-modal" role="dialog">
                                <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">Delete Subroute</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <h4>Are you sure you want to permanently delete this record?</h4>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-danger waves-effect waves-light" onClick={ handleDeleteRouteSubmit }>Delete</button>
                                        </div>
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


export default MenuDetails