import { eq } from 'drizzle-orm';
import { db,type NewUser } from '../../db/index.js';
import { usersTable } from '../../db/schema.js';

export class UserRepository {
    constructor() {}

    public async create(user: NewUser) {
        return db.insert(usersTable).values(user);
    }

    public async findUserByEmail(email: string) {
        return await db.query.usersTable.findFirst({
            where: eq(usersTable.email, email),        
        }
        );
    }

    public async registerUser(user: NewUser) {
        return await db.insert(usersTable).values(user)
    }
}
