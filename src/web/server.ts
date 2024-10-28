import { Hono } from "hono";
import { serverNotFound } from "./controller/response/error.js";
import { UserRepository } from "../repository/user_repo/user.js";
import { UserService } from "../service/userService/user.js";
import { AuthController } from "./controller/authController.js";
import { jwt } from "hono/jwt";
import { SECRET_KEY } from "../lib/constants.js";

export class Server {
    private app: Hono;

    constructor(app: Hono) {
        this.app = app;
    }

    public configure() {
        // Index path
        this.app.get('/', (c) => {
            return c.text('Hono server OK!');
        });

        // Universal catchall
        this.app.notFound((c) => {
            return serverNotFound(c);
        });

        // version of API
        const api = this.app.basePath('/v1');

        // Setup repos
        const userRepo = new UserRepository();

        // Setup services
        const userService = new UserService(userRepo);

        // Setup controllers
        const authController = new AuthController(userService);

        // Register routes
        this.registerUserRoutes(api, authController);
    }

    private registerUserRoutes(api: Hono, authCtroller: AuthController) {
        const user = new Hono();
        const authCheck = jwt({secret: SECRET_KEY});

        user.get('/me', authCheck, authCtroller.getMyInfo);
        user.post('/login', authCtroller.login);
        user.post('/register', authCtroller.register);
        api.route('/user', user);
    }
}
