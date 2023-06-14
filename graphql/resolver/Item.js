module.exports.ITEM = {
    Query: {
        getAllItems: async (parent, args) => {
            try {
                return await parent.dbconfig.item.findAll()
            } catch (err) {
                console.log(err);
                return []
            }
        },
        getItemById: async (parent, args) => {
            try {
                return await parent.dbconfig.item.findOne({ where: { id: args.id } })
            } catch (err) {
                console.log(err);
                return {};
            }
        },
    },
    Mutation: {
        AddItem: async (parent, args) => {
            try {
                if (args.filelink) {
                    return data = await parent.dbconfig.item.create({
                        description: args.description,
                        cost: args.cost,
                        filelink: args.filelink
                    })
                }
                return data = await parent.dbconfig.item.create({
                    description: args.description,
                    cost: args.cost,
                });
            }
            catch (err) {
                console.log(err);
                return {};
            }
        },
        AddEditItemOfVendor: async (parent, args, context) => {
            try {
                const { dbconfig } = parent;
                console.log(args.itemshave, context.id);
                const checkEntryAvailable = await dbconfig.vendorItem.findOne({
                    where: {
                        vendorid: +context.id,
                        itemshave: args.itemshave
                    }
                })
                if (checkEntryAvailable?.dataValues?.id) {
                    await dbconfig.vendorItem.update({
                        quantity: args.quantity
                    },
                        {
                            where: {
                                id: checkEntryAvailable.dataValues.id
                            }
                        });
                    return {
                        id: checkEntryAvailable.dataValues.id,
                        vendorid: context.id,
                        itemshave: args.itemshave,
                        quantity: args.quantity
                    };
                }
                data = await dbconfig.vendorItem.create({
                    vendorid: context.id,
                    itemshave: args.itemshave,
                    quantity: args.quantity
                });
                return data;
            }
            catch (err) {
                console.log(err)
            }
        }
    }
}