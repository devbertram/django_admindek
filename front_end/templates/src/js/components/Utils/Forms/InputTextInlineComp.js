
import React, { useState } from "react";


function InputTextInline(props){ 

    return (

        <div className={ props.errorField ? "form-group row has-danger" : "form-group row"}>

            <label className="col-sm-2 col-form-label">{ props.label }</label>

            <div className="col-sm-10">

                <input type={props.type} 
                       className={ props.errorField ? "form-control form-control-danger" : "form-control"}
                       placeholder={ props.placeholder } 
                       value={props.value} 
                       onChange={ props.setter }/>

                <div className="col-form-label" style={ props.errorField ? {} : {display:"none"} }> 
                    { props.errorField ? props.errorField : ""}
                </div>

            </div>

        </div>
        
    );
}


export default InputTextInline;