import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import { User } from '../entity/User';

class UserService {
    static EMAIL_LENGTH = 3;
    static PASSWORD_LENGTH = 3;

    static getAllUsers(): Promise<User[]> {
        return User.find();
    }

    static async createUser(
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = User.create({ firstName, lastName, email, password: hashedPassword });
        user.emailVerificationToken = v4();
        return user.save();
    }

    static getUserByEmail(email: string): Promise<User | undefined> {
        return User.findOne({ where: { email } });
    }
}

export default UserService;
