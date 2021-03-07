

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link, useParams } from 'react-router-dom';

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'



const MenuEditPermission = observer(({ menuStore }) => {

    const [loader, SetLoader] = useState(false);
    const { param_id } = useParams();
    
    

    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            SetLoader(true)
            menuStore.setIsOpenedForm(1)
            menuStore.retrieve(param_id)
            SetLoader(false)
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



    const getSubrouteFieldError = (key, field_name) => {
        if(menuStore.error_fields.subroutes){
            let errors = [...menuStore.error_fields.subroutes];
            if(errors[key]){
                return (
                    <div className="col-form-label">
                        <p className="text-danger">{ errors[key][field_name] }</p>
                    </div>
                )
            }else{ return ""; }
        }else{ return ""; }
    };



    const handleSaveSubroute = (e, key, id) => {

        e.preventDefault();
        
        SetLoader(true)
        const subroute = menuStore.findSubrouteById(id)

        console.log(subroute[key]['id'])

        axios.put('api/subroute/'+id+"/", { 

            route: param_id,
            name: subroute[key]['name'],
            is_nav: subroute[key]['is_nav'],
            nav_name: subroute[key]['nav_name'],
            url: subroute[key]['url'],
            url_name: subroute[key]['url_name'],

        }).then((response) => {

            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "Permission Successfully Saved!", type: "inverse" 
            });

            menuStore.setSelectedRoute(param_id)

            SetLoader(false);

        }).catch((error) => {

            if(error.response.status === 500){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "There's an error trying to send data to the server!", type: "danger" 
                });
            }

            SetLoader(false);

        });

    }
    


    return (

        <div className="row">
            <div className="col-sm-12">
                <div className="card">

                    <DivLoader type="Circles" loading={loader}/>
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
                            <h4 className="sub-title">Menu Permissions</h4>
                            
                            <div className="table-responsive">
                            
                                <button className="btn btn-md btn-success btn-outline-success mb-2 pt-2 pb-2" onClick={ () => menuStore.addSubroutes() }>
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
                                    {
                                        menuStore.subroutes.map((val, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td className="align-middle">
                                                        { getSubrouteInputField('name', val.name, 'Ex: Can View User List', key) }
                                                        { getSubrouteFieldError(key, 'name') }
                                                    </td>
                                                    <td className="align-middle">
                                                        <select name="is_nav" 
                                                                value={val.is_nav} 
                                                                className="form-control form-control-primary" 
                                                                onChange={(e) => menuStore.modifySubroutes(key, e)}>
                                                            <option value="">Select</option>
                                                            <option value={false}>Api</option>
                                                            <option value={true}>Nav Subitem</option>
                                                        </select>
                                                        { getSubrouteFieldError(key, 'is_nav') }
                                                    </td>
                                                    <td className="align-middle">
                                                        { getSubrouteInputField('nav_name', val.nav_name, 'Ex: User Manage', key) }
                                                        { getSubrouteFieldError(key, 'nav_name') }
                                                    </td>
                                                    <td className="align-middle">
                                                        { getSubrouteInputField('url', val.url, 'Ex: /user/list/', key) }
                                                        { getSubrouteFieldError(key, 'url') }
                                                    </td>
                                                    <td className="align-middle">
                                                        { getSubrouteInputField('url_name', val.url_name, 'Ex: user_list', key) }
                                                        { getSubrouteFieldError(key, 'url_name') }
                                                    </td>
                                                    <td className="align-middle">
                                                        <button className="btn btn-primary pb-2 pt-2" type="button" onClick={ e => handleSaveSubroute(e, key, val.id) }>
                                                            Save
                                                        </button>
                                                        <button className="btn btn-danger pb-2 pt-2 ml-2" type="button" onClick={ () => menuStore.deleteSubroutes(key) }>
                                                            <i className="fa fa-trash ml-1"></i>
                                                        </button>
                                                    </td>
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

    );
    
});


export default MenuEditPermission