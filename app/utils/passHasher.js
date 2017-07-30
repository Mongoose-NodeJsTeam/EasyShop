const crypto = require('crypto');
const algorithm = 'sha256';
const secret = 'abcdefg';
const hashEnc = 'hex';

const passHashing = (password) => {
    return crypto.createHmac(algorithm, secret)
        .update(password)
        .digest(hashEnc);
};

module.exports = { passHashing };