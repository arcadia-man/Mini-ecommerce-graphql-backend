const { rule } = require("graphql-shield");
const { isPasswordCorrect } = require("../Helper/Bracode");


const isAdmin = rule()(async () => {
    return true;
    return false;
});

const isCustomer = rule()(async (parent, args, context) => {
    try {
        if (context.id && context.password) {
            const data = await parent.dbconfig.customer.findOne({
                attributes: ["password"],
                where: { id: context.id }
            });
            if (data && await isPasswordCorrect(context.password, data.password))
                return true;
            return "Either user or password is not correct!";
        }
        else return "User must be login!"
    } catch (error) {
        return "Oop's server is busy!"
    }
});

const isVendor = rule()(async (parent, args, context) => {
    try {
        if (context.id && context.password) {
            const data = await parent.dbconfig.vendor.findOne({
                attributes: ["password"],
                where: { id: context.id }
            });
            if (data && await isPasswordCorrect(context.password, data.password))
                return true;
            return "Either user or password is not correct!";
        }
        else return "User must be login!"
    } catch (error) {
        return "Oop's server is busy!"
    }
})

module.exports = {
    isAdmin, isCustomer, isVendor
}

