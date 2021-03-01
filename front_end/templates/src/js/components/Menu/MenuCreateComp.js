

import React, { useEffect} from 'react'
import { observer } from 'mobx-react'
import { Link } from "react-router-dom";

import { InputTextInline } from '../Utils/Forms/InlineInputs'



const MenuCreate = observer(({ menuStore }) => {
    

    return (

        <div className="row">
            <div className="col-sm-12">
                <div className="card">

                    <div className="card-header">
                        <h5>Create Menu and Permissions</h5>
                        <div className="card-header-right pt-0">
                            <Link to="/" className="btn btn-outline-primary btn-sm">
                                Back to List
                            </Link>
                        </div>
                    </div>

                    <div className="card-block">

                        <div className="col-md-12">

                            <h4 className="sub-title">Menu Details</h4>

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
                                errorField={ menuStore.error_fields.name }
                                value={ menuStore.name }
                                setter={ e => menuStore.setName(e.target.value) }
                            />

                            <InputTextInline 
                                type="text"
                                label="Display Icon:"
                                placeholder="Display Icon"
                                errorField={ menuStore.error_fields.name }
                                value={ menuStore.name }
                                setter={ e => menuStore.setName(e.target.value) }
                            />

                            <InputTextInline 
                                type="text"
                                label="Url:"
                                placeholder="Url"
                                errorField={ menuStore.error_fields.name }
                                value={ menuStore.name }
                                setter={ e => menuStore.setName(e.target.value) }
                            />

                            <InputTextInline 
                                type="text"
                                label="Url Name:"
                                placeholder="(Django Route Name)"
                                errorField={ menuStore.error_fields.name }
                                value={ menuStore.name }
                                setter={ e => menuStore.setName(e.target.value) }
                            />

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Is Menu:</label>
                                <div className="col-sm-10 form-radio">
                                    <div className="radio radio-inline">
                                        <label>
                                            <input type="radio" name="is_menu"/>
                                            <i className="helper"></i><code>true</code>
                                        </label>
                                    </div>
                                    <div className="radio radio-inline">
                                        <label>
                                            <input type="radio" name="is_menu"/>
                                            <i className="helper"></i><code>false</code>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Is Dropdown:</label>
                                <div className="col-sm-10 form-radio">
                                    <div className="radio radio-inline">
                                        <label>
                                            <input type="radio" name="is_dropdown"/>
                                            <i className="helper"></i><code>true</code>
                                        </label>
                                    </div>
                                    <div className="radio radio-inline">
                                        <label>
                                            <input type="radio" name="is_dropdown"/>
                                            <i className="helper"></i><code>false</code>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-12">

                            <h4 className="sub-title">Permissions</h4>

                        </div>



                    </div>

                </div>
            </div>
        </div>

    );
    
});


export default MenuCreate