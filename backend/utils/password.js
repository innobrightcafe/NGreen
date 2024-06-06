const crypto = require('crypto');


const hashPassword = async (value) => {
    const hash = crypto.createHash('sha256').update(value).digest('hex');
    return hash;
}

const comparePassword = async (hash, originalValue) => {
    const newHash = await hashPassword(originalValue);
    return hash === newHash;
};

module.exports = {hashPassword, comparePassword}