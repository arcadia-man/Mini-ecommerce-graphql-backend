const { hashedPassword } = require("../../Helper/Bracode");

module.exports.VENDOR = {
    Query: {
        getAllVendor: async (parent, args) => {
            try {
                return await parent.dbconfig.vendor.findAll()
            } catch (err) {
                console.log(err);
                 return []
            }
        },
        getVendorById: async (parent, args , context) => {
            try {
                return await parent.dbconfig.vendor.findOne({ where: { id: context.id } })
            } catch (err) {
                console.log(err);
                return {};
            }
        } 
    },
    Mutation: {
        AddVendor: async (parent, args) => {
            try {
                return await parent.dbconfig.vendor.create({
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
    }
}