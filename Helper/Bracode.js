const bcrypt = require("bcrypt")
const Barcode = () => {
    let first = ["abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "!@#$%^&*()_+~"];
    let str = "";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            str += first[i].charAt(Math.floor(Math.random() * first[i].length))
        }
    }
    return str;
}

const hashedPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const isPasswordCorrect = async (password1, password2) => {
    return await bcrypt.compare(password1, password2);
}
module.exports = { Barcode, hashedPassword , isPasswordCorrect}