module.exports = {

    addpage(page) {
        if (page) {
            return `LIMIT ${(page - 1) * 20}, ${20};`;
        }
        return `LIMIT ${0}, ${20};`;
    },
    addorder(order) {
        if (order) {
            let orderby = "ORDER BY ";
            for (let i = 0; i < order.length; i++) {
                orderby += 'p.'+order[i].sortby + ' ';
                orderby += order[i].sorttype ? order[i].sorttype : "DESC";
                orderby += " "
                if (i !== order.length - 1) orderby += ", ";
            }
            return orderby;
        }
        return "";
    },
    addfilter(filter) {
        if (filter) {
            let filterby = "WHERE ";
            for (let i = 0; i < filter.length; i++) {
                filterby += "( "
                if(filter[i].like){
                    filterby += `items.description like "%${filter[i].like}%" `;
                    if(filter[i].cost) filterby += "and ";
                }
                if(filter[i].cost){
                    if(filter[i].cost.start){
                        filterby += `cost >= ${filter[i].cost.start} `;
                        if(filter[i].cost.end) filterby += "and ";
                    }
                    if(filter[i].cost.end){
                        filterby += `cost <= ${filter[i].cost.end} `;
                    }
                }
                filterby += ") ";
                if (i !== filter.length - 1) filterby += "or ";
            }
            return filterby;
        }
        return "";
    },
}