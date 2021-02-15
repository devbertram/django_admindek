

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import eventBus from '../Utils/EventBus'

import { InputTextInline } from '../Utils/Forms/InlineInputs'
import DivLoader from '../Utils/DivLoaderComp'


const UserCreateModal = observer(({ userStore }) => {

    const[firstname, SetFirstname] = useState("");
    const[lastname, SetLastname] = useState("");
    const[email, SetEmail] = useState("");
    const[username, SetUsername] = useState("");
    const[password, SetPassword] = useState("");
    const[password_confirm, SetPasswordConfirm] = useState("");
    const[routes, SetRoutes] = useState([]);
    const[error_fields, SetErrorFields] = useState({ firstname: "", lastname: "",  email: "", username: "", password: ""});

    const [loader, SetLoader] = useState(false);


    const handleResetForm = (e) => {

        e.preventDefault()

        SetFirstname("")
        SetLastname("")
        SetEmail("")
        SetUsername("")
        SetPassword("")
        SetPasswordConfirm("")
        SetErrorFields({})

    }


    const handleRouteSelectChange = (e) => {

        e.preventDefault()

        console.log('test')

    }


    const handleSave = (e, is_save_another) => {

        e.preventDefault()

        console.log(routes)

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

            }).then((response) => {

                userStore.fetch()
                userStore.setSelectedUser(response.data.id)
                SetLoader(false)
                handleResetForm()

                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", { 
                    message: "User Successfully Created!", type: "success" 
                })

                if (is_save_another == 0){
                    $("#user-create-modal").modal('hide')
                }

            }).catch((error) => {

                let field_errors = error.response.data;

                SetErrorFields({
                    firstname: field_errors.first_name?.toString(),
                    lastname: field_errors.last_name?.toString(),
                    email: field_errors.email?.toString(),
                    username: field_errors.username?.toString(),
                    password: field_errors.password?.toString(),
                })

                SetLoader(false)
                
            });


        }



    }



    return (

        <div className="modal" id="user-create-modal" role="dialog">

            <div className="modal-dialog modal-lg" role="document">

                <div className="modal-content">

                    <DivLoader loading={loader}/>

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
                            <h4 className="sub-title">User Routes</h4>
                            <button type="button"
                                    className="btn btn-primary waves-effect waves-light m-b-10 mr-2" 
                                    id="select-all">
                                select all
                            </button>
                            <button type="button"
                                    className="btn btn-primary waves-effect waves-light m-b-10" 
                                    id="deselect-all">
                                deselect all
                            </button>
                            <select id="public-methods" value={ routes } onChange={ handleRouteSelectChange } multiple>
                                <option value="elem_1">elem 1</option>
                                <option value="elem_2">elem 2</option>
                                <option value="elem_3">elem 3</option>
                                <option value="elem_4">elem 4</option>
                                <option value="elem_5">elem 5</option>
                                <option value="elem_6">elem 6</option>
                                <option value="elem_7">elem 7</option>
                                <option value="elem_8">elem 8</option>
                                <option value="elem_9">elem 9</option>
                                <option value="elem_10">elem 10</option>
                            </select>
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