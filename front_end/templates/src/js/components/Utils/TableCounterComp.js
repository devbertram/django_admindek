import React from "react";

function TableCounter(props){


    const getPaginationCountFrom = () => {
        let count_from = 0
        if(props.totalCount > 0){
            let current_count = props.pageSize * props.pageCurrent
            let factor = props.pageSize - 1
            count_from = current_count - factor
        }
        return count_from
    }


    const getPaginationCountTo = () => {
        let count_to = 0
        if(props.totalCount > 0){
            if(props.pageCurrent == props.pageLimit){
                count_to = props.totalCount
            }else{
                count_to = props.pageSize * props.pageCurrent
            }
        }
        return count_to
    }


    return (
        <span>
            Showing { getPaginationCountFrom() } to { getPaginationCountTo() } of { props.totalCount } entries
        </span>
    );
    
}


export default TableCounter;