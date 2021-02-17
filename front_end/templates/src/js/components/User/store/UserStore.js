
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
    filter_online_status = ""; // filter
    filter_su_status = ""; // filter
	delaySearch = debounce(() => this.fetch(), 500); // search delay
    selected_user = 0; // selected user id after create or update
    is_loading = false;

    // User Create
    user_route_options = [];
    user_subroute_options = [];
    
    constructor(){
        makeAutoObservable(this)
    }


    setUserRouteOptions(){
        axios.get('api/route/get_all')
             .then((response) => {
                let routes = response.data; 
                let array = [];
                if(routes.length > 0){
                    routes.forEach(data => {
                        array.push({value:data.id, label:data.name})
                    });
                }
                this.user_route_options = array;
             });
    }


    setUserSubrouteOptions(array){
        this.user_subroute_options = array;
    }


    setSelectedUser(id){
        this.selected_user = id;
    }


    setFilterSUStatus(su_status){
        this.filter_su_status = su_status;
    }


    setFilterOnlineStatus(online_status){
        this.filter_online_status = online_status;
    }


    fetch(){

        this.is_loading = true;

        axios.get('api/user', { 
            params: { 
                q: this.query, 
                page_size: this.page_size, 
                page: this.page_current, 
                os: this.filter_online_status, 
                sus: this.filter_su_status 
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