const { shield, and, or } = require("graphql-shield");
const { isAdmin, isCustomer, isVendor } = require("../validations/authorization");
const { validCustomer, validVendor } = require("../validations/inputValidation");
// validation of a graphql api for its all end points.
// Admin is allowed to acces any end points
const permissions = shield({
    Query: {
        // Particular customer, vendor can see his/her profile
        getAllCustomer: isAdmin,
        getCustomerById: or(isAdmin, isCustomer),
        getAllVendor: isAdmin,
        getVendorById: or(isAdmin, isVendor),
        getAllInvoices: isAdmin,
        getAllOrderList: isAdmin
    },
    Mutation: {
        // Valid user input or admin can generate customer, vendor 
        addCustomer: validCustomer,
        AddVendor: and(isAdmin, validVendor),
        // Vendor will generate the item and caratlane(admin) itself can add its item or 
        // give assurance of item to user. Anyone can get item detail without any validation.
        AddItem: or(isAdmin, isVendor),
        // To add the item by vendor of specifice item and its quantity
        AddEditItemOfVendor: or(isAdmin, isVendor),
        // valid customer can order the item
        Orderplace: or(isAdmin, isCustomer),
        Orderfullfillmetn: isAdmin,
        AddInvoice: isAdmin,
        AddFacility: isAdmin,
        // CancleOrder: or(isAdmin, isCustomer)
    }
})

module.exports = permissions
