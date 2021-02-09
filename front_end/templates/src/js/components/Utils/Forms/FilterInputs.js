
import React from "react";


function SelectDefault(props){ 

    const getOptions = () => {

        let options = []
        let list = props.list

        list.map((val, key) => {
            options.push(
                <option value={ val['0'] } key={ key }> { val['1'] } </option>
            )
        })

        return options
        
    }

    return (
        <div className={ props.divColumn }>
            <label className="col-sm-12 col-form-label">{ props.label }</label>
            <div className="col-sm-12">
                <select name="select" className="form-control" value={ props.value } onChange={ props.setter }>
                    <option value="">None</option>
                    { getOptions() }
                </select>
            </div>
        </div>
    );
    
}


export { SelectDefault }