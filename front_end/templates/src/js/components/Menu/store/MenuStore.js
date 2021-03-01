
import { debounce } from 'lodash'
import { makeAutoObservable, runInAction } from "mobx"

class MenuStore{

    page_type = "LIST";
    // List
    list = {};
    total_records = 0;
    page_prev = 0;
    page_current = 1;
    page_next = 2;
    page_size = 10;
    page_limit = 0;
    query = "";

	delaySearch = debounce(() => this.fetch(), 500); // search delay
    selected_menu = 0; // selected menu id after create or update
    is_list_loading = false;
    is_form_loading = false;
    is_opened_form = 0; // 0 = create form, 1 = update form

    // Form
    menu_id = "";
    name = "";
    error_fields = {};

    constructor(){
        makeAutoObservable(this)
    }


    // Form
    resetForm(){
        this.name = "";
        this.error_fields = {};
    }


    setName(name){
        this.name = name;
    }


    // List Handlers
    fetch(){
        this.is_list_loading = true;
        axios.get('api/route', { 
            params: { 
                q: this.query, 
                page_size: this.page_size, 
                page: this.page_current, 
            }
        }).then((response) => {
            runInAction(() => {
                this.list = response.data.results;
                this.total_records = response.data.count
                this.page_limit = Math.ceil(response.data.count / this.page_size);
            })
        });
        this.is_list_loading = false;
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
        this.selected_menu = 0;
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

const menuStore = new MenuStore()

export default menuStore