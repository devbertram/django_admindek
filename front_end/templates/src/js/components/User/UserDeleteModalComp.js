

import React from 'react'
import { observer } from 'mobx-react'
import eventBus from '../Utils/EventBus'


const UserDeleteModal = observer(({ userStore }) => {


    const handleDelete = (e) => {

        e.preventDefault()

        axios.delete('api/user/' + userStore.user_id)
        
        .then((response) => {

            eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                message: "User Successfully Deleted!", type: "inverse" 
            });

            userStore.fetch();

            $("#user-delete-modal").modal('hide');

        }).catch((error) => {

            if(error.response.status == 404){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "Data Not Found!", type: "danger" 
                });
            }

            if(error.response.status == 500){
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "There's an error trying to send data to the server!", type: "danger" 
                });
            }

        });

    }



    return (

        <div className="modal" id="user-delete-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Delete User</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <h4>Are you sure you want to permanently delete this record?</h4>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger waves-effect waves-light" onClick={ handleDelete }>Delete</button>
                    </div>

                </div>
            </div>
        </div>

    );

    
});


export default UserDeleteModal