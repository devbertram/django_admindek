

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Link, useParams} from 'react-router-dom';

import DivLoader from '../Utils/DivLoaderComp'



const MenuDetails = observer(({ menuStore }) => {

    const [loader, SetLoader] = useState(false);
    const { param_id } = useParams();
    
    
    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            SetLoader(true)
            menuStore.setIsOpenedForm(1)
            menuStore.retrieve(param_id)
            SetLoader(false)
        }
        return () => {
            is_mounted = false;
        } 
    },[])


    return (

        <div className="row">
            <div className="col-sm-12">
                <div className="card">

                    <DivLoader type="Circles" loading={loader}/>
                    <div className="card-header">
                        <h5>Menu Details</h5>
                        <Link to="/" className="btn btn-primary btn-outline-primary float-right pt-2 pb-2 ml-2">
                            <i className="fa fa-navicon"></i> Back to List
                        </Link>
                        <Link to={`/${param_id}/edit`} className="btn btn-md btn-primary btn-outline-primary float-right pt-2 pb-2 ml-2">
                            <i className="fa fa-pencil-square-o"></i> Edit
                        </Link>
                        <button className="btn btn-md btn-danger btn-outline-danger float-right pt-2 pb-2">
                            <i className="fa fa-trash"></i> Delete
                        </button>
                    </div>

                    <div className="card-block table-border-style">

                        <h5 className="sub-title">Menu Details</h5>

                        <div className="row">
                            <div className="col-md-3">
                                <p>Category:</p>
                                <p>Name:</p>
                                <p>Is Side Navigation:</p>
                                <p>Is Side Navigation Dropdown:</p>
                                <p>Side Navigation Name:</p>
                                <p>Side Navigation Icon:</p>
                                <p>Url:</p>
                                <p>Url Name:</p>
                            </div> 
                            <div className="col-md-9">
                                <p>{ menuStore.category }</p>
                                <p>{ menuStore.name }</p>
                                <p>{ menuStore.is_menu === true ? "YES" : "NO" }</p>
                                <p>{ menuStore.is_dropdown === true ? "YES" : "NO" } </p>
                                <p>{ menuStore.nav_name }</p>
                                <p><i className={ menuStore.icon }></i></p>
                                <p>{ menuStore.url }</p>
                                <p>{ menuStore.name }</p>
                            </div> 
                        </div>

                        <h5 className="sub-title mt-2">Permissions</h5>

                        <div className="table-responsive">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Permission Name</th>
                                        <th>Type</th>
                                        <th>Subitem Name</th>
                                        <th>Url</th>
                                        <th>Url Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        menuStore.subroutes.map((val, key) =>{
                                            return (
                                                <tr key={key}>
                                                    <td>{ val.name }</td>
                                                    <td className="align-middle">
                                                        { val.is_nav === true ? 
                                                            <label className="label label-success">Subitem</label> 
                                                            : 
                                                            <label className="label label-danger">API</label> 
                                                        }
                                                    </td>
                                                    <td>{ val.nav_name }</td>
                                                    <td>{ val.url }</td>
                                                    <td>{ val.url_name }</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    );
    
});


export default MenuDetails