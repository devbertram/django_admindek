

import React, { useState} from 'react'
import { observer } from 'mobx-react'
import { Link } from "react-router-dom";

import { InputTextInline, RadioButton } from '../Utils/Forms/InlineInputs'



const MenuCreate = observer(({ menuStore }) => {


    const addPermissionRows = () =>{
        menuStore.setSubroutes([...menuStore.subroutes, { name:"", is_nav:false, nav_name:"", url:"", url_name:"" }])
    }


    const deletePermissionRows = (index) =>{
        const list = [...menuStore.subroutes];
        list.splice(index, 1);
        menuStore.setSubroutes(list);
    }


    const modifyPermissionRows = (index, e) =>{
        const list = [...menuStore.subroutes];
        list[index][e.target.name] = e.target.value;
        menuStore.setSubroutes(list);
    }


    const handleSave = (e, isa) => {
        e.preventDefault();
        console.log(menuStore.subroutes)
    }
    

    return (

        <div className="row">
            <div className="col-sm-12">
                <div className="card">

                    <div className="card-header">
                        <h5>Create Menu and Permissions</h5>
                        <div className="card-header-right pt-0">
                            <Link to="/" className="btn btn-sm btn-primary btn-outline-primary">Back to List</Link>
                        </div>
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

                            <InputTextInline 
                                type="text"
                                label="Display Name:"
                                placeholder="Display Name"
                                errorField={ menuStore.error_fields.nav_name }
                                value={ menuStore.nav_name }
                                setter={ e => menuStore.setNavName(e.target.value) }
                            />

                            <InputTextInline 
                                type="text"
                                label="Display Icon:"
                                placeholder="Display Icon"
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

                            <RadioButton
                                label="Is Side Navigation:"
                                name="is_menu"
                                options={ [{value:true, label:"True"}, {value:false, label:"False"}] }
                                onChange={ (e) => menuStore.setIsMenu(e.target.value) }
                                errorField={ menuStore.error_fields.is_menu }
                            />

                            <RadioButton
                                label="Is Side Navigation Dropdown"
                                name="is_dropdown"
                                options={ [{value:true, label:"True"}, {value:false, label:"False"}] }
                                onChange={ (e) => menuStore.setIsDropdown(e.target.value) }
                                errorField={ menuStore.error_fields.is_dropdown }
                            />

                        </div>


                        {/* PERMISSIONS */}
                        <div className="col-md-12 mt-5 mb-5">
                            <h5 className="sub-title">Permissions</h5>

                            <div className="table-responsive">
                            
                                <button className="btn btn-sm btn-outline-primary mb-2" onClick={ () => addPermissionRows() }>
                                    <i className="fa fa-plus"></i> Add Permission
                                </button>

                                <table className="table table-de">
                                    <thead>
                                        <tr>
                                            <th>Permission Name</th>
                                            <th>Is Navigation Sub Item</th>
                                            <th>Navigation Sub Item Name</th>
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
                                                            onChange={(e) => modifyPermissionRows(key, e)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input 
                                                            name="is_nav" 
                                                            value={val.is_nav}
                                                            className="form-control" 
                                                            placeholder=""
                                                            onChange={(e) => modifyPermissionRows(key, e)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input 
                                                            name="nav_name" 
                                                            value={val.nav_name}
                                                            className="form-control" 
                                                            placeholder="Ex: User Manage"
                                                            onChange={(e) => modifyPermissionRows(key, e)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input 
                                                            name="url" 
                                                            value={val.url}
                                                            className="form-control" 
                                                            placeholder="Ex: /user/list/"
                                                            onChange={(e) => modifyPermissionRows(key, e)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input 
                                                            name="url_name" 
                                                            value={val.url_name}
                                                            className="form-control" 
                                                            placeholder="Ex: user_list"
                                                            onChange={(e) => modifyPermissionRows(key, e)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-sm btn-danger" type="button" onClick={ () => deletePermissionRows(key) }>
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
                                <button type="submit" className="btn btn-primary float-right mr-2" onClick={ (e) => handleSave(e, 0)}>
                                    Save
                                </button>
                                <button type="submit" className="btn btn-primary float-right mr-2" onClick={ (e) => handleSave(e, 1)}>
                                    Save and add another
                                </button>
                                <button type="submit" className="btn btn-primary float-right mr-2">
                                    Reset
                                </button>
                            </div>
                        </div>



                    </div>

                </div>
            </div>
        </div>

    );
    
});


export default MenuCreate