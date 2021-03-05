

import React, { useState, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link, useHistory, useParams } from 'react-router-dom';

import eventBus from '../Utils/EventBus'
import { InputTextInline, RadioButton } from '../Utils/Forms/InlineInputs'
import DivLoader from '../Utils/DivLoaderComp'



const MenuEdit = observer(({ menuStore }) => {


    const [loader, SetLoader] = useState(false);
    const history = useHistory();
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


    const redirectBackToMenuList = useCallback(() => {
        history.push('/'), [history]
    });


    const handleSave = (e) => {

        e.preventDefault();
        SetLoader(true)

        // axios.post('api/route/', { 

        //     category : menuStore.category,
        //     name : menuStore.name,
        //     nav_name : menuStore.nav_name,
        //     url : menuStore.url,
        //     url_name : menuStore.url_name,
        //     icon : menuStore.icon,
        //     is_menu : menuStore.is_menu,
        //     is_dropdown : menuStore.is_dropdown,
        //     subroutes : menuStore.subroutes,

        // }).then((response) => {

        //     eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
        //         message: "Menu / Permission Successfully Created!", type: "inverse" 
        //     });

        //     menuStore.resetForm()
        //     menuStore.setSelectedRoute(response.data.id)

        //     if(isa === 0){
        //         redirectBackToMenuList()
        //     }

        //     SetLoader(false);

        // }).catch((error) => {

        //     if(error.response.status === 400){
        //         let field_errors = error.response.data;
        //         menuStore.setErrorFields({
        //             category: field_errors.category?.toString(),
        //             name: field_errors.name?.toString(),
        //             nav_name: field_errors.nav_name?.toString(),
        //             url: field_errors.url?.toString(),
        //             url_name: field_errors.url_name?.toString(),
        //             icon: field_errors.icon?.toString(),
        //             is_menu: field_errors.is_menu?.toString(),
        //             is_dropdown: field_errors.is_dropdown?.toString(),
        //             subroutes: field_errors.subroutes?.toString(),
        //         });
        //     }

        //     if(error.response.status === 500){
        //         eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
        //             message: "There's an error trying to send data to the server!", type: "danger" 
        //         });
        //     }

        //     SetLoader(false);

        // });

    }
    


    return (

        <div className="row">
            <div className="col-sm-12">
                <div className="card">

                    <DivLoader type="Circles" loading={loader}/>
                    <div className="card-header">
                        <h5>Edit Menu and Permissions</h5>
                        <Link to="/" className="btn btn-primary btn-outline-primary float-right pt-2 pb-2">
                            <i className="fa fa-navicon"></i> Back to List
                        </Link>
                    </div>

                    <div className="card-block">


                        {/* MENU DETAILS */}
                        <div className="col-md-12">
                            <h4 className="sub-title">Menu Details</h4>

                            <InputTextInline 
                                type="text"
                                label="Category:"
                                placeholder="Category"
                                errorField={ menuStore.error_fields.category }
                                value={ menuStore.category }
                                setter={ e => menuStore.setCategory(e.target.value) }
                            />

                            <InputTextInline 
                                type="text"
                                label="Name:"
                                placeholder="Name"
                                errorField={ menuStore.error_fields.name }
                                value={ menuStore.name }
                                setter={ e => menuStore.setName(e.target.value) }
                            />

                            <RadioButton
                                label="Is Side Navigation:"
                                name="is_menu"
                                selected={ menuStore.is_menu }
                                options={ [{value:true, label:"Yes"}, {value:false, label:"No"}] }
                                onChange={ (e) => menuStore.setIsMenu(e.target.value) }
                                errorField={ menuStore.error_fields.is_menu }
                            />

                            <RadioButton
                                label="Is Side Navigation Dropdown"
                                name="is_dropdown"
                                selected={ menuStore.is_dropdown }
                                options={ [{value:true, label:"Yes"}, {value:false, label:"No"}] }
                                onChange={ (e) => menuStore.setIsDropdown(e.target.value) }
                                errorField={ menuStore.error_fields.is_dropdown }
                            />

                            <InputTextInline 
                                type="text"
                                label="Side Navigation Name:"
                                placeholder="Side Navigation Name"
                                errorField={ menuStore.error_fields.nav_name }
                                value={ menuStore.nav_name }
                                setter={ e => menuStore.setNavName(e.target.value) }
                            />

                            <InputTextInline 
                                type="text"
                                label="Side Navigation Icon:"
                                placeholder="Side Navigation Icon"
                                errorField={ menuStore.error_fields.icon }
                                value={ menuStore.icon }
                                setter={ e => menuStore.setIcon(e.target.value) }
                            />

                            <InputTextInline 
                                type="text"
                                label="Url:"
                                placeholder="Url"
                                errorField={ menuStore.error_fields.url }
                                value={ menuStore.url }
                                setter={ e => menuStore.setUrl(e.target.value) }
                            />

                            <InputTextInline 
                                type="text"
                                label="Url Name:"
                                placeholder="(Django Route Name)"
                                errorField={ menuStore.error_fields.url_name }
                                value={ menuStore.url_name }
                                setter={ e => menuStore.setUrlName(e.target.value) }
                            />

                        </div>


                        {/* PERMISSIONS */}
                        <div className="col-md-12 mt-5 mb-5">
                            <h5 className="sub-title">Permissions</h5>

                            <div className="table-responsive">
                            
                                <button className="btn btn-md btn-success btn-outline-success float-right mb-2  pt-2 pb-2" onClick={ () => menuStore.addSubroutes() }>
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
                                                    <td>
                                                        <input 
                                                            name="name" 
                                                            value={val.name}
                                                            className="form-control" 
                                                            placeholder="Ex: Can View User List" 
                                                            onChange={(e) => menuStore.modifySubroutes(key, e)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <select name="is_nav" 
                                                                value={val.is_nav} 
                                                                className="form-control form-control-primary" 
                                                                onChange={(e) => menuStore.modifySubroutes(key, e)}>
                                                            <option value="">Select</option>
                                                            <option value={false}>Api</option>
                                                            <option value={true}>Nav Subitem</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input 
                                                            name="nav_name" 
                                                            value={val.nav_name}
                                                            className="form-control" 
                                                            placeholder="Ex: User Manage"
                                                            onChange={(e) => menuStore.modifySubroutes(key, e)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input 
                                                            name="url" 
                                                            value={val.url}
                                                            className="form-control" 
                                                            placeholder="Ex: /user/list/"
                                                            onChange={(e) => menuStore.modifySubroutes(key, e)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input 
                                                            name="url_name" 
                                                            value={val.url_name}
                                                            className="form-control" 
                                                            placeholder="Ex: user_list"
                                                            onChange={(e) => menuStore.modifySubroutes(key, e)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-sm btn-danger" type="button" onClick={ () => menuStore.deleteSubroutes(key) }>
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


                        {/* BUTTON / FOOTERS */}
                        <div className="form-group row">
                            <div className="col-sm-12">
                                <button type="submit" className="btn btn-primary float-right mr-2" onClick={ handleSave }>
                                    Save
                                </button>
                            </div>
                        </div>



                    </div>

                </div>
            </div>
        </div>

    );
    
});


export default MenuEdit