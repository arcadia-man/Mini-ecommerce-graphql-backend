const { addfilter, addorder, addpage } = require("../../Helper/Querygenerator");

module.exports.search = {
    query: (like) => `select * from items where description like "%${like}%"`
};

module.exports.filtersearch = {
    query: (args, asked) => {
        return `select p.id as item_id ${asked.includes('description') ? ', p.description' : ''}${asked.includes('cost') ? ', p.cost as cost' : ''}${asked.includes('filelink') ? ', p.filelink' : ''}${asked.includes('vendorid') ? ', case when vendoritems.vendorid is null then 0 else vendoritems.vendorid end as vendorid' : ''}${asked.includes('quantity') ? ', case when vendoritems.quantity is null then 0 else vendoritems.quantity end as quantity' : ''}${asked.includes('vendor_name') ? ', case when vendors.name is null then "Crafting team" else vendors.name end as vendor_name' : ''}${asked.includes('address') ? ', case when vendors.address is null then "adsfsd" else vendors.address end as address' : ''}${asked.includes('contact') ? ', case when vendors.contact is null then "1234467898" else vendors.contact end as contact' : ''} from (select * from items ${addfilter(args.filter)}) as p left join vendoritems on p.id = vendoritems.itemshave left join vendors on  vendoritems.vendorid = vendors.id ${addorder(args.sort)} ${addpage(args.page)}`;
    }
};
