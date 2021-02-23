

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import eventBus from '../Utils/EventBus'

import { InputTextInline, SelectMultiInline } from '../Utils/Forms/InlineInputs'
import DivLoader from '../Utils/DivLoaderComp'



const UserUpdateModal = observer(({ userStore }) => {


    const [loader, SetLoader] = useState(false);


    const handleUserRouteMultiSelectChange = (values) => {
        userStore.setUserRoutes(values)
    }

    
    const handleUserSubrouteMultiSelectChange = (values) => {
        userStore.setUserSubroutes(values)
    }


    const handleUpdate = (e) => {

        e.preventDefault()
        
        SetLoader(true)

        axios.put('api/user/' + userStore.user_id +'/', {

            first_name : userStore.first_name,
            last_name : userStore.last_name,
            email : userStore.email,
            username : userStore.username, 
            user_routes : userStore.user_routes,
            user_subroutes : userStore.user_subroutes,

        }).then((response) => {

            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "User Successfully Updated!", type: "inverse" 
            });

            userStore.fetch();
            userStore.setSelectedUser(response.data.id);
            
            SetLoader(false);

        }).catch((error) => {

            if(error.response.status == 400){
                let field_errors = error.response.data;
                userStore.setErrorFields({
                    firstname: field_errors.first_name?.toString(),
                    lastname: field_errors.last_name?.toString(),
                    email: field_errors.email?.toString(),
                    username: field_errors.username?.toString(),
                    user_routes: field_errors.user_routes?.toString(),
                    user_subroutes: field_errors.user_subroutes?.toString(),
                });
            }

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

            SetLoader(false);

        });

    }



    return (

        <div className="modal" id="user-update-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">

                    <DivLoader type="Circles" loading={loader}/>
                    <DivLoader type="ThreeDots" loading={userStore.is_form_loading}/>

                    <div className="modal-header">
                        <h4 className="modal-title">Update User</h4>
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
                                errorField={ userStore.error_fields.firstname }
                                value={ userStore.first_name }
                                setter={ e => userStore.setFirstname(e.target.value) }
                            />

                            <InputTextInline 
                                type="text"
                                label="Lastname:"
                                placeholder="Lastname"
                                errorField={ userStore.error_fields.lastname }
                                value={ userStore.last_name }
                                setter={ e => userStore.setLastname(e.target.value) }
                            />

                            <InputTextInline 
                                type="text"
                                label="Email:"
                                placeholder="Email"
                                errorField={ userStore.error_fields.email }
                                value={ userStore.email }
                                setter={ e => userStore.setEmail(e.target.value) }
                            />

                            <InputTextInline 
                                type="text"
                                label="Username:"
                                placeholder="Username"
                                errorField={ userStore.error_fields.username }
                                value={ userStore.username }
                                setter={ e => userStore.setUsername(e.target.value) }
                            />

                        </div>


                        <div className="col-sm-12 mt-4">

                            <h4 className="sub-title">User Permissions</h4>

                                <SelectMultiInline 
                                    label="Modules:"
                                    name="user_routes"
                                    value={userStore.user_routes}
                                    errorField={ userStore.error_fields.user_routes }
                                    options={userStore.route_options}
                                    onChange={handleUserRouteMultiSelectChange}
                                    closeMenuOnSelect={false}
                                    defaultMenuIsOpen={false}

                                />

                                <SelectMultiInline 
                                    label="Permissions:"
                                    name="user_subroutes"
                                    value={userStore.user_subroutes}
                                    errorField={ userStore.error_fields.user_subroutes }
                                    options={userStore.subroute_options}
                                    onChange={handleUserSubrouteMultiSelectChange}
                                    closeMenuOnSelect={false}
                                    defaultMenuIsOpen={false}
                                />

                        </div>

                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ (e) => handleUpdate(e) }>Save</button>
                    </div>

                </div>
            </div>
        </div>

    );

    
});


export default UserUpdateModal