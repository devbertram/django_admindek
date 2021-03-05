
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
    selected_route = 0; // selected menu id after create or update
    is_list_loading = false;
    is_form_loading = false;
    is_opened_form = 0; // 0 = create form, 1 = update form

    // Form
    route_id = "";
    category = "";
    name = "";
    is_menu = null;
    is_dropdown = null;
    nav_name = "";
    icon = "";
    url = "";
    url_name = "";
    subroutes = [];
    error_fields = {};

    constructor(){
        makeAutoObservable(this)
    }


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


    retrieve(id){
        axios.get('api/route/' + id)
        .then((response) => {
            let route = response.data;
            runInAction(() => {
                this.route_id = route.id
                this.category = route.category
                this.name = route.name
                this.is_menu = route.is_menu
                this.is_dropdown = route.is_dropdown
                this.nav_name = route.nav_name
                this.icon= route.icon
                this.url = route.url
                this.url_name = route.url_name
                this.subroutes = route.subroute_route
            })
        });
    }


    setSelectedRoute(selected_route){
        this.selected_route = selected_route;
    }


    setIsOpenedForm(is_opened_form){
        this.is_opened_form = is_opened_form;
    }


    // Form
    resetForm(){
        this.route_id = "";
        this.category = "";
        this.name = "";
        this.nav_name = "";
        this.is_menu = null;
        this.is_dropdown = null;
        this.icon = "";
        this.url = "";
        this.url_name = "";
        this.subroutes = [];
        this.error_fields = {};
    }

    setRouteId(route_id){
        this.route_id = route_id;
    }

    setCategory(cat){
        this.category = cat;
    }

    setName(name){
        this.name = name;
    }

    setIsMenu(is_menu){
        this.is_menu = is_menu;
    }

    setIsDropdown(is_dropdown){
        this.is_dropdown = is_dropdown;
    }

    setNavName(nav_name){
        this.nav_name = nav_name;
    }

    setIcon(icon){
        this.icon = icon;
    }

    setUrl(url){
        this.url = url;
    }

    setUrlName(url_name){
        this.url_name = url_name;
    }

    addSubroutes(){
        this.subroutes = [...this.subroutes, { name:"", is_nav:"", nav_name:"", url:"", url_name:"" }]
    }

    modifySubroutes(index, e){
        const list = [...this.subroutes];
        list[index][e.target.name] = e.target.value;
        this.subroutes = list;
    }

    deleteSubroutes(index){
        const list = [...this.subroutes];
        list.splice(index, 1);
        this.subroutes = list;
    }

    setSubroutes(subroutes){
        this.subroutes = subroutes;
    }

    setErrorFields(obj){
        this.error_fields = obj;
    }



    // List Handlers
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
        this.selected_route = 0;
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