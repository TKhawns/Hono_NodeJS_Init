import type { Context } from "hono";
import type { UserService } from "../../service/user.js";
import type { LoginBody } from "../validator/user.js";
import { serveData } from "./response/response.js";

// Implement method that authentication infomation, such as login, register, ...
export class AuthController {
    private service: UserService;

    constructor(userService: UserService) {
        this.service = userService;

        this.login = this.login.bind(this);
    }

    public async login(c: Context) {
        const body: LoginBody = await c.req.json();
        const user = await this.service.find(body.email);
        
        return serveData(c, {user: user });
    }
}
