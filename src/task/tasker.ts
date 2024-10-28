import type { UserService } from "../service/user.js";
import sendWelcomeEmail from "./sendWelcomeEmail.js";

const TASK = {
    SendWelcomeEmail: 'SendWelcomeEmail',
};

class Tasker {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;

        this.processor = this.processor.bind(this);
    }

    private async processor(data: any) {
        await sendWelcomeEmail(data.id, this.userService);
    }
}

export { TASK, Tasker };
