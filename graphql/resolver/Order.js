const { Barcode } = require("../../Helper/Bracode");
const { Sequelize } = require("../../models");
module.exports.OrderProcess = {
    Query: {
        getAllOrderList: async (parent, args) => {
            try {
                return await parent.dbconfig.order.findAll()
            } catch (err) {
                console.log(err);
                return []
            }
        },
        getAllInvoices: async (parent, args) => {
            try {
                return await parent.dbconfig.invoice.findAll()
            } catch (err) {
                console.log(err);
                return []
            }
        },
        getEgarness: async (parent, args) => {
            try {
                let a = await parent.dbconfig.vendor.findAll({
                        include :[
                            {
                                model: parent.dbconfig.vendorItem,
                                attributes: ['id'] ,
                                on : {
                                    id : Sequelize.col("vendoritems.vendorid")
                                }
                            }
                        ]
                    }
                );
                console.log(a.map(({name})=>name));
                return {ram : [a.map(({name})=>name)]}
            }
            catch (err) {
                return new Error(err)
            }
        }

    },
    Mutation: {
        Orderplace: async (parent, args, context) => {
            try {
                const { dbconfig } = parent;
                let current_date = new Date();
                let new_date = new Date();
                new_date.setDate(current_date.getDate() + 7);
                // const data = await dbconfig.order.create({
                //     customerid: context.id, 
                //     orderitem: args.orderitem,
                //     quantity: args.quantity,
                //     status: '1',
                //     order_at: current_date,
                //     expected_date: new_date,
                //     barcode: Barcode()
                // });
                console.log(current_date)
                return {
                    customerid: context.id,
                    orderitem: args.orderitem,
                    quantity: args.quantity,
                    status: '1',
                    order_at: current_date,
                    // (`${current_date.getDate()}-${current_date.getMonth()}-${current_date.getFullYear()} `),
                    expected_date: new_date,
                    barcode: Barcode()
                };
            } catch (err) {
                console.log(err);
                return {};
            }
        },
    }
}