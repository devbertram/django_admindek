
import { debounce } from 'lodash'
import { makeAutoObservable } from "mobx"

class UserStore{

    list = {};
    total_records = 0;
    page_prev = 0;
    page_current = 1;
    page_next = 2;
    page_size = 10;
    page_limit = 0;
    query = "";

    filter_online_status = "";
    filter_su_status = "";

    // search 
	delaySearch = debounce(() => this.fetch(), 500);

    
    constructor(){
        makeAutoObservable(this, {

        })
    }



    fetch(){
    
        axios.get('api/user', { 
            params: { 
                q: this.query, 
                page_size: this.page_size, 
                page: this.page_current, 
                os: this.filter_online_status, 
                sus: this.filter_su_status 
            }
        }).then((response) => {
            this.list = response.data.results;
            this.total_records = response.data.count
            this.page_limit = Math.ceil(response.data.count / this.page_size);
        });
   
    }


    handleSearch(e){

        e.preventDefault()
        this.page_prev = 0;
        this.page_current = 1;
        this.page_next = 2;
        this.query = e.target.value;
        this.delaySearch()
        
    }




}


const userStore = new UserStore()


export default userStore