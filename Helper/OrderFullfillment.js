const { Op } = require("sequelize");

module.exports = class FullFillMent {
    data;
    async haveId(order, id, barcode) {
        if (id) return id;
        if (barcode) {
            const data = await order.findOne({
                where: {
                    [Op.or]: [
                        { id: id ? id : 0 },
                        { barcode: barcode ? barcode : "abc" }
                    ]
                }
            });
            this.data = data;
            return data?.dataValues?.id ? data.dataValues.id : 0;
        }
        return 0;
    }

    async fillorder(dbconfig, order_id) {
        const returnValue = []
        const isfullfilled = await dbconfig.orderfullfillment.findOne({ where: { orderid: order_id } })
        if (isfullfilled) {
            returnValue.push({ error: "Order is fullfield already" })
            return returnValue
        }
        const itemavailable = await dbconfig.vendorItem.findAll({
            where: {
                itemshave: this.data.dataValues.orderitem,
                quantity: { [Op.gt]: 0 }
            }
        })
        let quantityFullfill = this.data.dataValues.quantity;
        var ord = new Date(this.data.dataValues.order_at)
        ord.setDate(ord.getDate() + 3);
        if (itemavailable) {
            for (const i of itemavailable) {
                console.log(i.dataValues)
                if (quantityFullfill > 0) {
                    if (i.dataValues.quantity <= quantityFullfill) {
                        console.log("1")
                        const ordertocraft = await dbconfig.orderfullfillment.create({
                            orderid: order_id,
                            vendorid: i.dataValues.vendorid,
                            quntityfullfillment: i.dataValues.quantity,
                            facilityaddress: 1,
                            fullfillmentdate: ord,
                            orderdate: this.data.dataValues.order_at,
                            status: '1'
                        })
                        console.log(ordertocraft)
                        await dbconfig.order.update({ status: '2' }, { where: { id: order_id } });
                        returnValue.push(ordertocraft)
                        quantityFullfill = quantityFullfill - i.dataValues.quantity;
                    }
                    else {
                        try {
                            const ordertocraft =  await dbconfig.orderfullfillment.create({
                                orderid: order_id,
                                vendorid: i.dataValues.vendorid,
                                quntityfullfillment: quantityFullfill,
                                facilityaddress: 1,
                                fullfillmentdate: ord,
                                orderdate: this.data.dataValues.order_at,
                                status: '1'
                            })
    
                            console.log(ordertocraft)
                            await dbconfig.order.update({ status: '2' }, { where: { id: order_id } })
                            returnValue.push(ordertocraft)
                            quantityFullfill = 0;  
                        } catch (error) {
                            console.log(error)
                        }
                    }

                }
                else {
                    break;
                }
            }
            console.log("3")

            if (quantityFullfill > 0) {
                const ordertocraft = await  dbconfig.orderfullfillment.create({
                    orderid: order_id,
                    quntityfullfillment: quantityFullfill,
                    facilityaddress: 2,
                    fullfillmentdate: ord,
                    orderdate: this.data.dataValues.order_at,
                    status: '1'
                });
                console.log(ordertocraft)
                await dbconfig.order.update({ status: '2' }, { where: { id: order_id } })
                quantityFullfill = 0;
                returnValue.push(ordertocraft);
            }
            return returnValue;
        }
        else {
            const ordertocraft = await dbconfig.orderfullfillment.create({
                orderid: order_id,
                quntityfullfillment: quantityFullfill,
                facilityaddress: 2,
                fullfillmentdate: ord,
                orderdate: this.data.dataValues.order_at,
                status: "1"
            })
            await dbconfig.order.update({ status: '2' }, { where: { id: order_id } })
            ordertocraft.error = "Item is not available to any vendor"
            returnValue.push(ordertocraft)
            return returnValue;
        }
    }
}