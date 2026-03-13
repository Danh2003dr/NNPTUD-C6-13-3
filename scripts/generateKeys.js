#!/usr/bin/env node
/**
 * Script tạo cặp khóa RSA (RS256) cho JWT.
 * Chạy: node scripts/generateKeys.js
 * Tạo ra: keys/private.pem, keys/public.pem
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const keysDir = path.join(__dirname, '..', 'keys');
if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir, { recursive: true });
}

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
});

fs.writeFileSync(path.join(keysDir, 'private.pem'), privateKey);
fs.writeFileSync(path.join(keysDir, 'public.pem'), publicKey);
console.log('Đã tạo keys/private.pem và keys/public.pem');
process.exit(0);
