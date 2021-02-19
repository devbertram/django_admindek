

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import eventBus from '../Utils/EventBus'

import { InputTextInline, SelectMultiInline } from '../Utils/Forms/InlineInputs'
import DivLoader from '../Utils/DivLoaderComp'



const UserCreateModal = observer(({ userStore }) => {

    const[firstname, SetFirstname] = useState("");
    const[lastname, SetLastname] = useState("");
    const[email, SetEmail] = useState("");
    const[username, SetUsername] = useState("");
    const[password, SetPassword] = useState("");
    const[password_confirm, SetPasswordConfirm] = useState("");

    const[error_fields, SetErrorFields] = useState({ 
        firstname: "", lastname: "",  email: "", username: "", password: "", user_routes:"", user_subroutes:"", 
    });

    const [loader, SetLoader] = useState(false);

    
    useEffect (() => {
        
        let is_mounted = true;

        if(is_mounted = true){
            userStore.setRouteOptions();
        }

        return () => {
            is_mounted = false;
        } 

    },[])



    const handleUserRouteMultiSelectChange = (values) => {
        userStore.setUserRoutes(values)
    }


    
    const handleUserSubrouteMultiSelectChange = (values) => {
        userStore.setUserSubroutes(values)
    }



    const handleResetForm = () => {

        SetFirstname("")
        SetLastname("")
        SetEmail("")
        SetUsername("")
        SetPassword("")
        SetPasswordConfirm("")
        SetErrorFields({})
        userStore.setUserRoutes([])
        userStore.setUserSubroutes([])
        userStore.setSubrouteOptions([])

    }



    const handleSave = (e, is_save_another) => {

        e.preventDefault()

        SetLoader(true)

        if(password != password_confirm){

            SetErrorFields({ password : "Password doesn't match!" })
            SetLoader(false)

        }else{

            axios.post('api/user/', { 

                first_name : firstname,
                last_name : lastname,
                email : email,
                username : username, 
                password : password, 
                user_routes : userStore.user_routes,
                user_subroutes : userStore.user_subroutes,

            }).then((response) => {

                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "User Successfully Created!", type: "inverse" 
                });

                userStore.fetch();
                userStore.setSelectedUser(response.data.id);

                SetLoader(false);
                handleResetForm();

                if (is_save_another == 0){
                    $("#user-create-modal").modal('hide');
                }

            }).catch((error) => {

                if(error.response.status == 400){

                    let field_errors = error.response.data;
    
                    SetErrorFields({
                        firstname: field_errors.first_name?.toString(),
                        lastname: field_errors.last_name?.toString(),
                        email: field_errors.email?.toString(),
                        username: field_errors.username?.toString(),
                        password: field_errors.password?.toString(),
                        user_routes: field_errors.user_routes?.toString(),
                        user_subroutes: field_errors.user_subroutes?.toString(),
                    });

                }

                if(error.response.status == 500){

                    eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                        message: "There's an error trying to send data to the server!", type: "danger" 
                    });

                }
    
                SetLoader(false);
            });


        }

    }



    return (

        <div className="modal" id="user-create-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">

                    <DivLoader type="Circles" loading={loader}/>

                    <div className="modal-header">
                        <h4 className="modal-title">Add User</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">

                        <div className="col-sm-12">

                            <h4 className="sub-title">User Details</h4>

                            <InputTextInline 
                                type="text"
                                label="Firstname:"
                                placeholder="Firstname"
                                errorField={ error_fields.firstname }
                                value={ firstname }
                                setter={ e => SetFirstname(e.target.value) }
                            />

                            <InputTextInline 
                                type="text"
                                label="Lastname:"
                                placeholder="Lastname"
                                errorField={ error_fields.lastname }
                                value={ lastname }
                                setter={ e => SetLastname(e.target.value) }
                            />

                            <InputTextInline 
                                type="text"
                                label="Email:"
                                placeholder="Email"
                                errorField={ error_fields.email }
                                value={ email }
                                setter={ e => SetEmail(e.target.value) }
                            />

                            <InputTextInline 
                                type="text"
                                label="Username:"
                                placeholder="Username"
                                errorField={ error_fields.username }
                                value={ username }
                                setter={ e => SetUsername(e.target.value) }
                            />

                            <InputTextInline 
                                secureTextEntry
                                type="password"
                                label="Password:"
                                placeholder="Password"
                                errorField={ error_fields.password }
                                value={ password }
                                setter={ e => SetPassword(e.target.value) }
                            />

                            <InputTextInline 
                                type="password"
                                label="Confirm Password:"
                                placeholder="Confirm Password"
                                errorField={ error_fields.password_confirm }
                                value={ password_confirm }
                                setter={ e => SetPasswordConfirm(e.target.value) }
                            />

                        </div>


                        <div className="col-sm-12 mt-4">

                            <h4 className="sub-title">User Permissions</h4>

                                <SelectMultiInline 
                                    label="Modules:"
                                    name="user_routes"
                                    value={userStore.user_routes}
                                    errorField={ error_fields.user_routes }
                                    options={userStore.route_options}
                                    onChange={handleUserRouteMultiSelectChange}
                                    closeMenuOnSelect={false}
                                    defaultMenuIsOpen={false}

                                />

                                <SelectMultiInline 
                                    label="Permissions:"
                                    name="user_subroutes"
                                    value={userStore.user_subroutes}
                                    errorField={ error_fields.user_subroutes }
                                    options={userStore.subroute_options}
                                    onChange={handleUserSubrouteMultiSelectChange}
                                    closeMenuOnSelect={false}
                                    defaultMenuIsOpen={false}
                                />

                        </div>

                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleResetForm }>Reset</button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ (e) => handleSave(e, 0) }>Save</button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ (e) => handleSave(e, 1) }>Save and add another</button>
                    </div>

                </div>
            </div>
        </div>

    );

    
});


export default UserCreateModal