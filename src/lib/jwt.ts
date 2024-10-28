import { sign, verify } from 'hono/jwt';
import { SECRET_KEY } from './constants.js';

type JWTPayload = {
    [key: string]: unknown;
    exp?: number;
};

/**
 * Encodes the given id and email into a JWT token with an expiration time of 30 days.
 *
 * @param {number} id - The id to be included in the token payload.
 * @param {string} email - The email to be included in the token payload.
 * @return {Promise<string>} A promise that resolves to the encoded JWT token.
 */

const encodeJWT = async (id: number, email: string) => {
    const payload: JWTPayload = {
        sub: id,
        email: email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // Token expires in 30 days
    };
    return await sign(payload, SECRET_KEY);
};

const check = async (token: string): Promise<JWTPayload> => {
    return await verify(token, SECRET_KEY);
};

export { encodeJWT };
export type { JWTPayload };

