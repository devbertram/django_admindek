

import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react';
import { Link, useHistory, useParams } from 'react-router-dom';

import DivLoader from '../Utils/DivLoaderComp'



const MenuDetails = observer(({ menuStore }) => {

    const [loader, SetLoader] = useState(false);

    const { param_id } = useParams();
    const history = useHistory();
    const redirectToList = useCallback(() => history.push('/'), [history]);
    
    
    useEffect (() => {
        let is_mounted = true;
        if(is_mounted = true){
            retrieveRoute()
        }
        return () => {
            is_mounted = false;
        } 
    },[])


    const retrieveRoute = () => {

        SetLoader(true)

        axios.get('api/route/' + param_id)

        .then((response) => {

            let route = response.data;

            menuStore.setRouteId(route.id)
            menuStore.setCategory(route.category)
            menuStore.setName(route.name)
            menuStore.setIsMenu(route.is_menu)
            menuStore.setIsDropdown(route.is_dropdown)
            menuStore.setNavName(route.nav_name)
            menuStore.setIcon(route.icon)
            menuStore.setUrl(route.url)
            menuStore.setUrlName(route.url_name)
            menuStore.setSubroutes(route.subroute_route)

            console.log(menuStore.subroutes)

        });
        
        SetLoader(false)

    }
    

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
                        <button className="btn btn-md btn-primary btn-outline-primary float-right pt-2 pb-2 ml-2">
                            <i className="fa fa-pencil-square-o"></i> Edit
                        </button>
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