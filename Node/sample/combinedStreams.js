const zlib = require('zlib');
const crypto = require('crypto');
const combine = require('multipipe');

module.exports.compressAndEncrypt = passwd => {
  return combine(
    zlib.createGzip(),
    crypto.createCipher('aes192', passwd)
  );
};

module.exports.decryptAndDecompress = passwd => {
  return combine(
    crypto.createDecipher('aes192', passwd),
    zlib.createGunzip()
  );
};
