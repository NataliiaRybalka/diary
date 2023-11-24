"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decipheredText = exports.cipheredText = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const SECRET_KEY = process.env.SECRET_KEY;
const cipheredText = (text) => {
    if (!SECRET_KEY)
        throw new Error('Key not found');
    let cipherText = crypto_js_1.default.AES.encrypt(text, SECRET_KEY).toString();
    return cipherText.toString().replace('/', 'Por21Ld');
};
exports.cipheredText = cipheredText;
const decipheredText = (cipherText) => {
    if (!SECRET_KEY)
        throw new Error('Key not found');
    cipherText = cipherText.toString().replace('Por21Ld', '/');
    const bytes = crypto_js_1.default.AES.decrypt(cipherText, SECRET_KEY);
    const originalText = bytes.toString(crypto_js_1.default.enc.Utf8);
    return originalText;
};
exports.decipheredText = decipheredText;
