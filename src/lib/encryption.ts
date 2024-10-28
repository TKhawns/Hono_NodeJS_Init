import crypto from 'crypto';
import { SECRET_KEY } from './constants.js';

const decryptFunc = (inputPass: string): string => {
    // Derive the 256-bit key from the password using SHA-256 hashing
    const hash = crypto.createHmac('sha256', SECRET_KEY).update(inputPass).digest('hex');
    return hash;
};

const verifyPassword = (text: string, encryptedText: string): boolean => {
    return text === decryptFunc(encryptedText);
};

export { decryptFunc, verifyPassword };
