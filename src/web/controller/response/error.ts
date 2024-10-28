import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

const serverNotFound = (c: Context) => {
    return c.json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) }, <StatusCode>StatusCodes.NOT_FOUND);
};

const serveUnprocessableEntity = (c: Context, message: string) => {
    return c.json({ error: message }, <StatusCode>StatusCodes.UNPROCESSABLE_ENTITY);
};

const ERRORS = {
    USER_EXISTS: 'User already exists',
    USER_NOT_FOUND: 'User not found',
};

export {
    ERRORS,
    serverNotFound,
    serveUnprocessableEntity

};
