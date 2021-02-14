

import React, { useState } from 'react'

import { observer } from 'mobx-react'
import eventBus from '../Utils/EventBus'

import { InputTextInline } from '../Utils/Forms/InlineInputs'


const UserCreateModal = observer(({ userStore }) => {

    const[firstname, SetFirstname] = useState("");
    const[lastname, SetLastname] = useState("");
    const[email, SetEmail] = useState("");
    const[username, SetUsername] = useState("");
    const[password, SetPassword] = useState("");
    const[password_confirm, SetPasswordConfirm] = useState("");
    const[is_superuser, SetIsSuperuser] = useState(false);
    const[is_staff, SetIsStaff] = useState(false);
    const[is_active, SetIsActive] = useState(false);
    
    const [error_fields, setErrorFields] = useState({ firstname: "", lastname: "",  email: "", username: "", password: ""});

    const handleSave = (e) => {

        e.preventDefault()

        if(password != password_confirm){
            setErrorFields({
                password : "Password doesn't match!"
            })
        }else{

            axios.post('api/user/', { 

                first_name : firstname,
                last_name : lastname,
                email : email,
                username : username, 
                password : password, 

            }).then((response) => {

                console.log(response)

            }).catch((error) => {

                let field_errors = error.response.data;

                setErrorFields({
                    firstname: field_errors.first_name?.toString(),
                    lastname: field_errors.last_name?.toString(),
                    email: field_errors.email?.toString(),
                    username: field_errors.username?.toString(),
                    password: field_errors.password?.toString(),
                })
                
            });


        }



    }



    return (

        <div className="modal" id="user-create-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Add User</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">

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

                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleSave }>Save</button>
                    </div>

                </div>
            </div>
        </div>

    );

    
});


export default UserCreateModal