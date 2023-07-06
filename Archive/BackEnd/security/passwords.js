const bcrypt = require('bcrypt');
const encodePassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10)
    } catch {
        return null;
    }
}

const comparePassword = async (password, encPassword) => {
    try {
        console.log(password,encPassword)
        const comapred = await bcrypt.compare(password, encPassword)
        console.log(comapred)
        return comapred
    } catch {
        return null;
    }
}

module.exports = {
    encodePassword,
    comparePassword
}