import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { StatusCode } from "hono/utils/http-status";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

const serverNotFound = (c: Context) => {
    return c.json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) }, <StatusCode>StatusCodes.NOT_FOUND);
};

const serveUnprocessableEntity = (c: Context, message: string) => {
    return c.json({ error: message }, <StatusCode>StatusCodes.UNPROCESSABLE_ENTITY);
};

const serveInternalServerError = (c: Context, error: any) => {
    if (error instanceof HTTPException) {
        return c.json({ error: error.message }, <StatusCode>error.status);
    }
    return c.json({ error: error.message }, <StatusCode>StatusCodes.INTERNAL_SERVER_ERROR);
};

const serveUnauthorized = (c: Context, error: any) => {
    console.log(error);
    return c.json({ error: error.message }, <StatusCode>StatusCodes.UNAUTHORIZED);
};

const ERRORS = {
    USER_EXISTS: 'User already exists',
    PASSWORD_FAIL: "Password is not correct",
    USER_NOT_FOUND: 'User not found',
    REGISTER_FAIL: "Register account doesn't successfully"
};

export {
    ERRORS,
    serverNotFound,
    serveUnprocessableEntity,
    serveInternalServerError,
    serveUnauthorized
};
