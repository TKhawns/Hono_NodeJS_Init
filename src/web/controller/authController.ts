import type { Context } from "hono";
import type { UserService } from "../../service/userService/user.js";
import type { LoginBody, RegisterBody } from "../validator/user_validate.js";
import { serveData } from "./response/response.js";
import { ERRORS,  serveInternalServerError,  serveUnauthorized } from "./response/error.js";
import { verifyPassword, decryptFunc } from "../../lib/encryption.js";
import { encodeJWT, type JWTPayload } from "../../lib/jwt.js";

// Implement method that authentication infomation, such as login, register, ...
export class AuthController {
    private service: UserService;

    constructor(userService: UserService) {
        this.service = userService;

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.getMyInfo = this.getMyInfo.bind(this);
    }

    public async login(c: Context) {
        const body: LoginBody = await c.req.json();
        // Search user information by email from database
        const user = await this.service.findUserByEmail(body.email);

        if (!user) {
            return serveUnauthorized(c, new Error(ERRORS.USER_NOT_FOUND));
        }
        
        const encodePassword = verifyPassword(user.password, body.password)
        if (!encodePassword) {
            return serveUnauthorized(c, new Error(ERRORS.PASSWORD_FAIL));
        }
        const token = await encodeJWT(user.id, user.email);

        
        return serveData(c, {token: token, user: user });
    }

    public async register(c: Context) {
        const body: RegisterBody = await c.req.json();
        // Check if user have existed
        const userData = await this.service.findUserByEmail(body.email);
        console.log(userData);

        if (userData) {
            return serveUnauthorized(c, new Error(ERRORS.USER_EXISTS))
        }
        // Else hash the password sha256
        const hashPassword = decryptFunc(body.password);
        const status = await this.service.registerUser(body.name, body.email, hashPassword);

        if (!status) {
            return serveUnauthorized(c, new Error(ERRORS.REGISTER_FAIL));
        }

        return serveData(c, 
            {
                user: {
                name: body.name,
                email: body.email,
                password: hashPassword
                }
            }
        );
    }

    public async getMyInfo(c: Context) {
        const payload: JWTPayload = c.get('jwtPayload');
        const user = await this.service.findUserByEmail(payload.email as string);
        if (!user) {
            return serveInternalServerError(c, new Error(ERRORS.USER_NOT_FOUND));
        }
        return serveData(c, { user: user });
    }
}
