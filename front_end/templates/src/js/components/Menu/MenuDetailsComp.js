

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

            console.log(response)

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
                        <div className="card-header-right pt-0">
                            <button class="btn btn-md btn-danger btn-outline-danger">
                                Delete
                            </button>
                            <button class="btn btn-md btn-primary btn-outline-primary  ml-2">
                                Update
                            </button>
                            <Link to="/" className="btn btn-md btn-inverse btn-outline-inverse ml-2">
                                Back to List
                            </Link>
                        </div>
                    </div>

                    <div className="card-block">

                        details

                    </div>

                </div>
            </div>
        </div>

    );
    
});


export default MenuDetails