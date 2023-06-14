const { rule } = require("graphql-shield");
const { check_input, duplicate_user } = require("../Helper/validation");



const validCustomer = rule()(async (parent, args) => {
    const checkInput = check_input(args);
    const duplicateUser = await duplicate_user(parent.dbconfig.customer, args.email)
    if (checkInput !== "good") return checkInput;
    if (duplicateUser !== "good") return duplicateUser;
    if (duplicateUser === "good" && checkInput === "good") return true;
    else return false
});

const validVendor = rule()(async (parent, args) => {
    const checkInput = check_input(args);
    const duplicateUser = await duplicate_user(parent.dbconfig.vendor, args.email)
    if (checkInput !== "good") return checkInput;
    if (duplicateUser !== "good") return duplicateUser;
    if (duplicateUser === "good" && checkInput === "good") return true;
    else return false
});



module.exports = {
    validCustomer,
    validVendor,
}
