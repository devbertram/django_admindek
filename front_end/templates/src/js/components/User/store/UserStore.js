
export function createUserStore(){

    return {

        list: {}, // records
        total_records: 0, // total count of records
        page_prev: 0, // previous page
        page_current: 1, // current page
        page_next: 2, // next page
        page_size: 10, // number of records per page
        page_limit: 0, // number of pages
        query: "", // search query

        filter_online_status: "",
        filter_su_status: "",

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
                this.total_records = response.data.count;
                this.page_limit = response.data.count / this.page_size;
            });
            
        },

    }

}