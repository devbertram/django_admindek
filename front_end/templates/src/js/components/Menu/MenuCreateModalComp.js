

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import eventBus from '../Utils/EventBus'

import { InputTextInline, SelectMultiInline } from '../Utils/Forms/InlineInputs'
import DivLoader from '../Utils/DivLoaderComp'



const MenuCreateModal = observer(({ menuStore }) => {


    const [loader, SetLoader] = useState(false);


    const handleResetForm = (e) =>{
        e.preventDefault()
        menuStore.resetForm()
    }


    const handleCreate = (e, is_save_another) => {

        // e.preventDefault()
        
        // SetLoader(true)

        // if(menuStore.password != menuStore.password_confirm){

        //     menuStore.setErrorFields({ password : "Password doesn't match!" })
        //     SetLoader(false)

        // }else{

        //     axios.post('api/user/', { 

        //         first_name : menuStore.first_name,
        //         last_name : menuStore.last_name,
        //         email : menuStore.email,
        //         username : menuStore.username, 
        //         password : menuStore.password, 
        //         user_routes : menuStore.user_routes,
        //         user_subroutes : menuStore.user_subroutes,

        //     }).then((response) => {

        //         eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
        //             message: "User Successfully Created!", type: "inverse" 
        //         });

        //         menuStore.fetch();
        //         menuStore.setSelectedUser(response.data.id);
        //         menuStore.resetForm()
                
        //         SetLoader(false);

        //         if (is_save_another == 0){
        //             $("#user-create-modal").modal('hide');
        //         }

        //     }).catch((error) => {

        //         if(error.response.status == 400){
        //             let field_errors = error.response.data;
        //             menuStore.setErrorFields({
        //                 firstname: field_errors.first_name?.toString(),
        //                 lastname: field_errors.last_name?.toString(),
        //                 email: field_errors.email?.toString(),
        //                 username: field_errors.username?.toString(),
        //                 password: field_errors.password?.toString(),
        //                 user_routes: field_errors.user_routes?.toString(),
        //                 user_subroutes: field_errors.user_subroutes?.toString(),
        //             });
        //         }

        //         if(error.response.status == 404){
        //             eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
        //                 message: "Data Not Found!", type: "danger" 
        //             });
        //         }

        //         if(error.response.status == 500){
        //             eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
        //                 message: "There's an error trying to send data to the server!", type: "danger" 
        //             });
        //         }
    
        //         SetLoader(false);

        //     });


        // }

    }



    return (

        <div className="modal" id="menu-create-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">

                    <DivLoader type="Circles" loading={loader}/>

                    <div className="modal-header">
                        <h4 className="modal-title">Add Menu and Permissions</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">

                        <div className="col-sm-12">

                            <h4 className="sub-title">Menu Details</h4>

                            <InputTextInline 
                                type="text"
                                label="Name:"
                                placeholder="Name"
                                errorField={ menuStore.error_fields.name }
                                value={ menuStore.name }
                                setter={ e => menuStore.setName(e.target.value) }
                            />

                        </div>


                        <div className="col-sm-12 mt-4">

                            <h4 className="sub-title">Permissions</h4>

                        </div>

                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ (e) => handleResetForm(e) }>Reset</button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ (e) => handleCreate(e, 0) }>Save</button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ (e) => handleCreate(e, 1) }>Save and add another</button>
                    </div>

                </div>
            </div>
        </div>

    );

    
});


export default MenuCreateModal