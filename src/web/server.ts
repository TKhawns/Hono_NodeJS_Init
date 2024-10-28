import { Hono } from "hono";
import { serverNotFound } from "./controller/response/error.js";
import { UserRepository } from "../repository/user_repo/user.js";
import { UserService } from "../service/user.js";
import { AuthController } from "./controller/authController.js";

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

    private registerUserRoutes(api: Hono, authCtrl: AuthController) {
        const user = new Hono();

        user.post('/login', authCtrl.login);
        api.route('/user', user);
    }
}
