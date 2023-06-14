const { Op } = require("sequelize");
const FullFillMent = require("../../Helper/OrderFullfillment");

module.exports.Ordefullfillment = {
    Mutation: {
        AddInvoice: async (parent, args) => {
            const { dbconfig } = parent;
            const tax = 0.3;
            const order = await dbconfig.order.findOne({
                where: { barcode: args.barcode }
            });
            if (order.dataValues && order.dataValues.id) {
                const item = await dbconfig.item.findOne({ where: { id: order.dataValues.orderitem } })
                console.log(item.dataValues)

                if (item.dataValues && item.dataValues.id) {
                    const idisavalilavle = await dbconfig.invoice.findOne({ where: { orderid: order.dataValues.id } })
                    if (idisavalilavle) {
                        return { status: "Invoice has been generated" }
                    }
                    const data = await dbconfig.invoice.create({
                        orderid: order.dataValues.id,
                        facility: 1,
                        costvalue: (1 + tax) * order.dataValues.quantity * item.dataValues.cost,
                    });
                    await dbconfig.order.update({ status: 3 }, { where: { id: order.dataValues.id } })
                    return data
                }
                else {
                    return {}
                }

            }
            return {};
        },
        CancleOrder: async (parent, args, context) => {
            const { dbconfig } = parent;
            try {
                let order_id = args.orderid ? args.orderid : 0;
                let data;
                if (!args.id && args.barcode) {
                    data = await dbconfig.order.findOne({
                        where: {
                            [Op.or]: [
                                { id: args.orderid ? args.orderid : 0 },
                                { barcode: args.barcode ? args.barcode : "abc" }
                            ]
                        }
                    });
                    
                    order_id = data?.dataValues?.id ? data.dataValues.id : 0;
                    // console.log(data)
                }
                // console.log(order_id)

                if (order_id !== 0) {
                    await dbconfig.order.update({ status: '7' }, { where: { id: order_id } });
                    await dbconfig.orderfullfillment.update({ status: '5' }, { where: { orderid: order_id } });
                    return {
                        orderid: order_id,
                    }
                }
                else {
                    return {
                        error: "Order does not exits",
                    }
                }
            }
            catch (err) {
                return {
                    error: "Internal server error",
                }
            }
        },
        Orderfullfillmetn: async (parent, args) => {
            try {
                const fullfill = new FullFillMent();
                const orderid = await fullfill.haveId(parent.dbconfig.order, args.id, args.barcode);
                console.log(orderid) 
                if (orderid === 0) return [{ error: "No order are placed." }];
                return fullfill.fillorder(parent.dbconfig, orderid);
            } catch (error) {
                console.log(error)
                return [{ error: "Intnal server error." }];
            }
        }
    }
}