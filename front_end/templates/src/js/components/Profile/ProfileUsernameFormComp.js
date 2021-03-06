
import React, { useState } from "react";

import eventBus from "../Utils/EventBus";
import { InputTextInline } from "../Utils/Forms/InlineInputs";


function ProfileUsernameForm(props){ 
    
    const [new_username, setNewUsername] = useState("");
    const [current_password, setCurrentPassword] = useState("");
    const [error_fields, setErrorFields] = useState({ new_username: "", current_password: "", non_field_errors: "" });
    
    

    const handleSubmit = (event) => {
        event.preventDefault()
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { 
            is_loading: true, 
            is_dashboard: true 
        })
        axios.post('auth/users/set_username/', {
                new_username: new_username,
                current_password: current_password,
            })
            .then((response) => {
                if (response.status == 204) {
                    setNewUsername("")
                    setCurrentPassword("")
                    setErrorFields({})
                    logoutUser()
                }
            })
            .catch((error) => {
                setErrorFields({
                    new_username : error.response.data.new_username?.toString(),
                    current_password : error.response.data.current_password?.toString(),
                    non_field_errors : error.response.data.non_field_errors?.toString()
                })
                eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: false, is_dashboard: false })
            });
    }


    const logoutUser = () => {
        axios.post('logout/')
            .then((response) => {
                if (response.status == 200) {
                    localStorage.clear()
                    location.replace(window.location.origin + '/set_username_logout')
                    eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: false, is_dashboard: true });
                }
            });
    }


    return (
    
    <div className="card">
        <div className="card-header">
            <h5>Change Username</h5>
        </div>
        <div className="card-block">
            <div className="alert alert-warning background-warning">
                <strong><i className="fa fa-warning"></i>  Warning!</strong> You will be ask to login again after you change your username.
            </div>

            <form onSubmit={handleSubmit}>

                <InputTextInline 
                    type="text"
                    label="New Username:"
                    placeholder="New Username"
                    errorField={ error_fields.new_username }
                    value={ new_username }
                    setter={ e => setNewUsername(e.target.value) }
                />

                <InputTextInline 
                    type="password"
                    label="Current Password:"
                    placeholder="Current Password"
                    errorField={ error_fields.current_password }
                    value={ current_password }
                    setter={ e => setCurrentPassword(e.target.value) }
                />

                <div className="form-group row">
                    <label className="col-sm-2"></label>
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary m-b-0">Submit</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
        
    );

}

export default ProfileUsernameForm;