

import React from 'react'

import { observer } from 'mobx-react'

import eventBus from '../Utils/EventBus'
import { SelectDefault } from '../Utils/Forms/FilterInputs'


const UserListFilterModal = observer(({ userStore }) => {



    const handleFilterSubmit = (e) => {
        e.preventDefault()
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: true, is_dashboard: true })
        userStore.handleFilterSubmit()
        $("#user-filter-modal").modal('hide')
        eventBus.dispatch("SHOW_FULLPAGE_LOADER", { is_loading: false, is_dashboard: true })
    }



    return (

        <div className="modal" id="user-filter-modal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Filter Records</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-group row">

                            <SelectDefault
                                divColumn="col-md-6"
                                label="Online Status:"
                                list={ [ ['1', 'Online'], ['0', 'Offline'] ] }
                                value={ userStore.filter_online_status }
                                setter={ (e) => userStore.setFilterOnlineStatus(e.target.value) }
                            />

                            <SelectDefault
                                divColumn="col-md-6"
                                label="Super User Status:"
                                list={ [ ['1', 'Super User'], ['0', 'Normal User'] ] }
                                value={ userStore.filter_su_status }
                                setter={ (e) => userStore.setFilterSUStatus(e.target.value) }
                            />
                            
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary waves-effect waves-light" onClick={ handleFilterSubmit }>Filter</button>
                    </div>

                </div>
            </div>
        </div>
    );

    
});


export default UserListFilterModal