
import { debounce } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"

class UserStore{

    list = {};
    total_records = 0;
    page_prev = 0;
    page_current = 1;
    page_next = 2;
    page_size = 10;
    page_limit = 0;
    query = "";
    filter_online_status = { value:"", label:"Select" }; // filter
    filter_su_status = { value:"", label:"Select" }; // filter
	delaySearch = debounce(() => this.fetch(), 500); // search delay
    selected_user = 0; // selected user id after create or update
    is_loading = false;

    // User Create
    user_routes = [];
    user_subroutes = [];
    route_options = [];
    subroute_options = [];
    

    constructor(){
        makeAutoObservable(this)
    }


    setUserRoutes(array){

        let existing = this.getUserRouteValues();
        let passed = this.getUserRoutePassedValues(array);
        let diff = [];
        
        if(existing.length < passed.length ){
            diff = passed.filter(x => !existing.includes(x));
            if(diff.length === 1){
                axios.get('api/route/' + diff.toString())
                    .then((response) => {
                        let subroutes = response.data.subroute_route;
                        if(subroutes.length > 0){
                            subroutes.forEach(data_subroute => {
                                this.subroute_options.push({ value:data_subroute.id, label:data_subroute.name });
                            });
                        }
                    });
            }
        }
        
        if(existing.length > passed.length ){
            diff = existing.filter(x => !passed.includes(x));
            if(diff.length === 1){
                axios.get('api/route/' + diff.toString())
                    .then((response) => {
                        let subroutes = response.data.subroute_route;
                        if(subroutes.length > 0){
                            subroutes.forEach(data_subroute => {
                                this.removeObjectFromSubrouteOptions(data_subroute.id)
                                this.removeObjectFromUserSubroutes(data_subroute.id)
                            });
                        }
                    });
            }
        }

        this.user_routes = array;

    }


    
    getUserRouteValues(){
        let array = [];
        this.user_routes.forEach(data => array.push(data.value))
        return array;
    }



    getUserRoutePassedValues(values){
        let array = [];
        values.forEach(data => array.push(data.value))
        return array;
    }



    removeObjectFromSubrouteOptions(value){

        for (var i=0; i < this.subroute_options.length; i++){
            if (this.subroute_options[i].value === value) {
                this.subroute_options.splice(i, 1);
                break;
            }
        }

    }



    removeObjectFromUserSubroutes(value){

        let user_subroutes = [];

        this.user_subroutes.forEach(data => {
            user_subroutes.push({value:data.value, label:data.label})
        })

        for (var i=0; i < user_subroutes.length; i++){
            if (user_subroutes[i].value === value) {
                user_subroutes.splice(i, 1);
                break;
            }
        }
        
        this.user_subroutes = user_subroutes;

    }



    setUserSubroutes(array){
        this.user_subroutes = array;
    }



    setRouteOptions(){
        axios.get('api/route/get_all')
             .then((response) => {
                let routes = response.data; 
                let array = [];
                if(routes.length > 0){
                    routes.forEach(data => {
                        array.push({value:data.id, label:data.name})
                    });
                }
                runInAction(() => {
                    this.route_options = array;
                })
             });
    }



    setSubrouteOptions(array){
        this.subroute_options = array;
    }



    setSelectedUser(id){
        this.selected_user = id;
    }



    setFilterOnlineStatus(online_status){
        this.filter_online_status = online_status;
    }



    setFilterSUStatus(su_status){
        this.filter_su_status = su_status;
    }



    fetch(){

        this.is_loading = true;

        axios.get('api/user', { 
            params: { 
                q: this.query, 
                page_size: this.page_size, 
                page: this.page_current, 
                os: this.filter_online_status.value,
                sus: this.filter_su_status.value
            }
        }).then((response) => {
            runInAction(() => {
                this.list = response.data.results;
                this.total_records = response.data.count
                this.page_limit = Math.ceil(response.data.count / this.page_size);
            })
        });

        this.is_loading = false;

    }



    handleSearch(e){
        e.preventDefault()
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.query = e.target.value;
        this.delaySearch();
    }



    handleRefreshClick(e){
        e.preventDefault()
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.page_size = 10;
        this.query = "";
        this.filter_online_status = "";
        this.filter_su_status = "";
        this.selected_user = 0;
        this.fetch();
    }



    handlePageSizeClick(e){
        e.preventDefault()
        if(e.target.value > 0){
            this.page_prev = 0;
            this.page_current = 1;
            this.page_next = 2;
            this.page_size = e.target.value;
            this.fetch();
        }
    }



    handlePaginationClick(e, page_current){
        e.preventDefault()
        if(page_current > 0 && page_current <= this.page_limit){
            this.page_prev = page_current - 1;
            this.page_current = page_current;
            this.page_next = page_current + 1;
            this.fetch();
        }
    }



    handleFilterSubmit(){
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.fetch();
    }



}


const userStore = new UserStore()


export default userStore