const { hashedPassword } = require("../../Helper/Bracode");

module.exports.CUSTOMERS = {
    Query: {
        getAllCustomer: async (parent, args) => {
            try {
                return await parent.dbconfig.customer.findAll()
            } catch (err) {
                console.log(err);
                return []
            }
        },
        getCustomerById: async (parent, args, context) => {
            try {
                return await parent.dbconfig.customer.findOne({ where: { id: context.id} })
            } catch (err) {
                console.log(err);
                return {};
            }
        },
        getAllfacility: async (parent, args) => {
            try {
                return await parent.dbconfig.facility.findAll()
            } catch (err) {
                console.log(err);
                return {};
            }
        }
    },
    Mutation: {
        addCustomer: async (parent, args) => {
            try {
                return await parent.dbconfig.customer.create({
                    name: args.name,
                    address: args.address,
                    contact: args.contact,
                    email: args.email,
                    pincode: args.pincode,
                    state: args.state,
                    town: args.town,
                    password: await hashedPassword(args.password)
                })
            } catch (error) {
                console.log(error);
                return {};
            }
        },
        AddFacility: async (parent, args) => {
            try {
                return await parent.dbconfig.facility.create({
                    address: args.address,
                    contact: args.contact
                })
            } catch (error) {
                console.log(error);
                return {};
            }
        }
    }
}