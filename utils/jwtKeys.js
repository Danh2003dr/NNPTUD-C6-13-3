/**
 * Load RSA keys cho JWT RS256.
 * Private key: dùng để ký token (sign).
 * Public key: dùng để xác thực token (verify).
 */
const fs = require('fs');
const path = require('path');

const keysDir = path.join(__dirname, '..', 'keys');
const privateKeyPath = path.join(keysDir, 'private.pem');
const publicKeyPath = path.join(keysDir, 'public.pem');

function loadKey(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error('Thiếu file khóa. Chạy: node scripts/generateKeys.js');
  }
  return fs.readFileSync(filePath, 'utf8');
}

module.exports = {
  getPrivateKey: () => loadKey(privateKeyPath),
  getPublicKey: () => loadKey(publicKeyPath)
};
