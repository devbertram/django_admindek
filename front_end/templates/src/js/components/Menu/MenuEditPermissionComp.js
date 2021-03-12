

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link, useParams } from 'react-router-dom';

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'



const MenuEditPermission = observer(({ menuStore }) => {

    const { param_id } = useParams();
    const [is_page_loading, SetIsPageLoading] = useState(false);
    const [selected_subroute_id, SetSelectedSubrouteId] = useState("");
    const [subroute_delete_id, SetSubrouteDeleteId] = useState("");
    
    
    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            SetIsPageLoading(true)
            menuStore.setIsOpenedForm(1)
            menuStore.retrieve(param_id)
            SetIsPageLoading(false)
        }
        return () => {
            is_mounted = false;
        } 
    },[])


    const getSubrouteInputField = (name, value, placeholder, key) => {
        return(
            <input 
                name={ name } 
                value={ value }
                className="form-control" 
                placeholder={ placeholder }
                onChange={ (e) => menuStore.modifySubroutes(key, e) }
            />
        )
    };


    const getErrorFields = () => {
        return(
            <div class="alert alert-danger">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <i class="icofont icofont-close-line-circled"></i>
                </button>
                <p>Field Errors!</p>
                { menuStore.error_fields.subroutes['name'][0] ? (<p>Name:<code>{ menuStore.error_fields.subroutes['name'][0] }</code></p>) : "" }
                { menuStore.error_fields.subroutes['is_nav'][0] ? (<p>Type:<code>{ menuStore.error_fields.subroutes['is_nav'][0] }</code></p>) : "" }
                { menuStore.error_fields.subroutes['nav_name'][0] ? (<p>Subitem Name:<code>{ menuStore.error_fields.subroutes['nav_name'][0] }</code></p>) : "" }
                { menuStore.error_fields.subroutes['url'][0] ? (<p>Url:<code>{ menuStore.error_fields.subroutes['url'][0] }</code></p>) : "" }
                { menuStore.error_fields.subroutes['url_name'][0] ? (<p>Url Name:<code>{ menuStore.error_fields.subroutes['url_name'][0] }</code></p>) : "" }
            </div>
        )
    };


    const handleCreateSubroute = (e, key) => {
        e.preventDefault();
        SetIsPageLoading(true)
        const subroute = menuStore.findSubrouteByKey(key)
        axios.post('api/subroute/', { 
            route: param_id,
            name: subroute.name,
            is_nav: subroute.is_nav,
            nav_name: subroute.nav_name,
            url: subroute.url,
            url_name: subroute.url_name,
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Permission Successfully Created!", type: "inverse" 
            });
            SetSelectedSubrouteId(response.data.id)
            menuStore.setSelectedRoute(param_id)
            menuStore.retrieve(param_id)
            SetIsPageLoading(false);
        }).catch((error) => {
            if(error.response.status === 400){
                let field_errors = error.response.data;
                menuStore.setErrorFields({
                    subroutes: field_errors ,
                });
            }
            if(error.response.status === 500){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "There's an error trying to send data to the server!", type: "danger" 
                });
            }
            SetIsPageLoading(false);
        });
    }


    const handleUpdateSubroute = (e, key, id) => {
        e.preventDefault();
        SetIsPageLoading(true)
        const subroute = menuStore.findSubrouteById(id)
        axios.put('api/subroute/'+id+'/', { 
            route: param_id,
            name: subroute[key]['name'],
            is_nav: subroute[key]['is_nav'],
            nav_name: subroute[key]['nav_name'],
            url: subroute[key]['url'],
            url_name: subroute[key]['url_name'],
        }).then((response) => {
            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Permission Successfully Updated!", type: "inverse" 
            });
            SetSelectedSubrouteId(response.data.id)
            menuStore.setSelectedRoute(param_id)
            menuStore.retrieve(param_id)
            SetIsPageLoading(false);
        }).catch((error) => {
            if(error.response.status === 400){
                let field_errors = error.response.data;
                menuStore.setErrorFields({
                    subroutes: field_errors ,
                });
            }
            if(error.response.status === 500){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "There's an error trying to send data to the server!", type: "danger" 
                });
            }
            SetIsPageLoading(false);
        });

    }


    const handleDeleteSubrouteModal = (e, id) => {
        e.preventDefault()
        SetSubrouteDeleteId(id)
        $("#subroute-delete-modal").modal('toggle')
    }


    const handleDeleteSubrouteSubmit = (e, subroute_delete_id) => {
        e.preventDefault()
        axios.delete('api/subroute/'+subroute_delete_id+"/")
             .then((response) => {
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Permission Successfully Deleted!", type: "inverse" 
                });
                menuStore.retrieve(param_id)
                $("#subroute-delete-modal").modal('hide');
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
                            <h5>Menus</h5>
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
                                <Link to={`/${menuStore.route_id}`}>Details</Link>
                            </li>
                            <li className="breadcrumb-item">
                                Edit Permissions
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

                                    <DivLoader type="Circles" loading={is_page_loading}/>
                                    <div className="card-header">
                                        <h5>Edit Menu Permissions</h5>
                                        <Link to={`/${param_id}`} className="btn btn-primary btn-outline-primary float-right pt-2 pb-2 ml-2">
                                            <i className="fa fa-arrow-left"></i> Back
                                        </Link>
                                        <Link to="/" className="btn btn-primary btn-outline-primary float-right pt-2 pb-2">
                                            <i className="fa fa-navicon"></i> Back to List
                                        </Link>
                                    </div>

                                    <div className="card-block">

                                        {/* MENU DETAILS */}
                                        <div className="col-md-12">
                                            { menuStore.error_fields.subroutes ? getErrorFields() : "" }
                                            <h4 className="sub-title">Menu Permissions</h4>
        
                                            <div className="table-responsive">
                                                <button className="btn btn-md btn-success btn-outline-success mb-2 pt-2 pb-2" 
                                                        onClick={ () => menuStore.addSubroutes() }>
                                                    <i className="fa fa-plus"></i> Add Permission
                                                </button>

                                                <table className="table table-de">
                                                    <thead>
                                                        <tr>
                                                            <th>Permission Name</th>
                                                            <th>Type</th>
                                                            <th>Subitem Name</th>
                                                            <th>Url</th>
                                                            <th>Url Name</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    { menuStore.subroutes.map((val, key) => {
                                                        return (
                                                            <tr key={key} className={ val.id === selected_subroute_id ? "table-info" : "" }>
                                                                <td className="align-middle">
                                                                    { getSubrouteInputField('name', val.name, 'Ex: Can View User List', key) }
                                                                </td>
                                                                <td className="align-middle">
                                                                    <select name="is_nav" 
                                                                            value={val.is_nav} 
                                                                            className="form-control form-control-primary" 
                                                                            onChange={(e) => menuStore.modifySubroutes(key, e)}>
                                                                        <option value="">Select</option>
                                                                        <option value={false}>Api</option>
                                                                        <option value={true}>Subitem</option>
                                                                    </select>
                                                                </td>
                                                                <td className="align-middle">
                                                                    { getSubrouteInputField('nav_name', val.nav_name, 'Ex: User Manage', key) }
                                                                </td>
                                                                <td className="align-middle">
                                                                    { getSubrouteInputField('url', val.url, 'Ex: /user/list/', key) }
                                                                </td>
                                                                <td className="align-middle">
                                                                    { getSubrouteInputField('url_name', val.url_name, 'Ex: user_list', key) }
                                                                </td>
                                                                { val.is_from_query === true ? 
                                                                    (
                                                                        <td className="align-middle">
                                                                            <button className="btn btn-primary pb-2 pt-2" 
                                                                                    type="button" 
                                                                                    onClick={ e => handleUpdateSubroute(e, key, val.id) }>
                                                                                Update
                                                                            </button>
                                                                            <button className="btn btn-danger pb-2 pt-2 ml-2" 
                                                                                    type="button" 
                                                                                    onClick={ e => handleDeleteSubrouteModal(e, val.id) }>
                                                                                <i className="fa fa-trash ml-1"></i>
                                                                            </button>
                                                                        </td>
                                                                    ) : 
                                                                    (
                                                                        <td className="align-middle">
                                                                            <button className="btn btn-success pb-2 pt-2" 
                                                                                    type="button" 
                                                                                    onClick={ e => handleCreateSubroute(e, key) }>
                                                                                Create
                                                                            </button>
                                                                            <button className="btn btn-danger pb-2 pt-2 ml-2" 
                                                                                    type="button" 
                                                                                    onClick={ () => menuStore.deleteSubroutes(key) }>
                                                                                <i className="fa fa-trash ml-1"></i>
                                                                            </button>
                                                                        </td>
                                                                    )
                                                                }
                                                            </tr>
                                                        )
                                                    }) }
                                                    </tbody>
                                                </table>
                                                
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                                    

                            {/* DELETE MODAL */}
                            <div className="modal" id="subroute-delete-modal" role="dialog">
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
                                            <button type="button" className="btn btn-danger waves-effect waves-light" onClick={ e => handleDeleteSubrouteSubmit(e, subroute_delete_id) }>Delete</button>
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


export default MenuEditPermission