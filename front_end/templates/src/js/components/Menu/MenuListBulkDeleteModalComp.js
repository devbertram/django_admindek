

import React, {useState} from 'react'
import { observer } from 'mobx-react'

import eventBus from '../Utils/EventBus'
import DivLoader from '../Utils/DivLoaderComp'


const MenuListBulkDeleteModal = observer(({ menuStore }) => {

    const [page_loader, SetPageLoader] = useState(false);


    const handleBulkDeleteSubmit = (e) => {
        e.preventDefault()
        SetPageLoader(true)
        let ids_for_delete = [];
        menuStore.selected_rows.map(data => {
            if(data.status === true){
                ids_for_delete.push(data.id)
            }
        })
        if(ids_for_delete.length > 0){
            axios.delete('api/route/bulk_destroy/', {
                data: { 
                    ids:ids_for_delete 
                }
            }).then((response) => {
                eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                    message: "The menus has been successfully Deleted!", type: "inverse"
                });
                menuStore.fetch()
                SetPageLoader(false)
            }).catch((error) => {
                if(error.response.status == 500){
                    eventBus.dispatch("SHOW_TOAST_NOTIFICATION", {
                        message: "There's an error trying to send data to the server!", type: "danger" 
                    });
                }
                SetPageLoader(false)
            });
        }
        $("#route-bulk-delete-modal").modal('hide');
    }


    return (
        <div className="modal" id="route-bulk-delete-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <DivLoader type="Circles" loading={page_loader}/>
                    <div className="modal-header">
                        <h4 className="modal-title">Delete Menus</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h4>Are you sure you want to permanently delete these records?</h4>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-danger waves-effect waves-light" onClick={ handleBulkDeleteSubmit }>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    
});


export default MenuListBulkDeleteModal