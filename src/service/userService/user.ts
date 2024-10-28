import type { UserRepository } from "../../repository/user_repo/user.js";

export class UserService {
    private repo: UserRepository;

    constructor(userRepository: UserRepository) {
        this.repo = userRepository;

        this.create = this.create.bind(this);
    }

    public async create(name: string, email: string, password: string) {
        await this.repo.create({ name, email, password});
    }

    public async findUserByEmail(email: string) {
        return this.repo.findUserByEmail(email);
    }

    public async registerUser(name: string, email: string, password: string) {
        return this.repo.registerUser({name, email, password})
    }
}
