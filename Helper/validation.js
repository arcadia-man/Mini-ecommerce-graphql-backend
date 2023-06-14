const isContact = (value) => {
    if (value.length !== 10) {
        return false;
    }
    for (const i of value) {
        if (!(i <= '9' && i >= '0')) {
            return false;
        }
    }
    return true;
}
const isPincode = (value) => {
    if (value.length !== 6) {
        return false;
    }
    for (const i of value) {
        if (!(i <= '9' && i >= '0')) {
            return false;
        }
    }
    return true;
}

function check_input(args) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!(args.name && args.address && args.contact && args.email && args.pincode && args.state && args.town)) return "All fields must be field!";
    if (!(mailformat.test(args.email))) return "Enter Valid Email!";
    if (!isContact(args.contact)) return "Provide valid 10 digit mobile number!";
    if (!isPincode(args.pincode)) return "Provide valid 6 digit pin code!";
    return "good"
}

async function duplicate_user(model, email) {
    try {
        const data = await model.findOne({ where: { email: email } });
        if (data) return "User already exits!";
        return "good";
    } catch (error) {
        return "Oop's server is busy try after sometime"
    }
}
module.exports = {
    check_input, duplicate_user
}