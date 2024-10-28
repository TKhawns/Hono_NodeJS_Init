import type { UserRepository } from "../repository/user_repo/user.js";

export class UserService {
    private repo: UserRepository;

    constructor(userRepository: UserRepository) {
        this.repo = userRepository;

        this.create = this.create.bind(this);
    }

    public async create(name: string, email: string, age: number) {
        await this.repo.create({ name, email, age});
    }

    public async find(email: string) {
        return this.repo.findUserByEmail(email);
    }
}
