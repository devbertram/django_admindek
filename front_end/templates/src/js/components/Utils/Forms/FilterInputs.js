
import React from "react";
import Select from "react-select";


function SelectDefaultFilter(props){ 
    
    const getOptions = () => {
        let options = []
        let list = props.list
        list.map((val, key) => {
            options.push(<option value={ val['0'] } key={ key }> { val['1'] } </option>)
        })
        return options
    }

    return (
        <div className={ props.divColumn }>
            <label className="col-sm-12 col-form-label">{ props.label }</label>
            <div className="col-sm-12">
                <select name="select" className="form-control" value={ props.value } onChange={ props.onChange }>
                    <option value="">None</option>
                    { getOptions() }
                </select>
            </div>
        </div>
    );
    
}


function SelectFilter(props){ 

    return(
        <div className={ props.divColumn }>
            <label className="col-sm-12 col-form-label">{ props.label }</label>
            <div className="col-sm-12">
                <Select
                    name={props.name}
                    value={props.value}
                    isDisabled={props.isDisabled}
                    options={props.options}
                    onChange={props.onChange}
                    className="basic-single"
                    classNamePrefix="Select"
                    isClearable={false}
                    isSearchable={true}
                />
            </div>
        </div>
    );
    
}


export { SelectDefaultFilter, SelectFilter }