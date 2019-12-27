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

    static getUserByProperty(property: string, value: string): Promise<User | undefined> {
        return User.findOne({ where: { [property]: value } });
    }

    static getUserByEmail(email: string): Promise<User | undefined> {
        return User.findOne({ where: { email } });
    }

    static async generatePasswordToken(email: string): Promise<User | undefined> {
        const user = await User.findOne({ where: { email } });
        if (user) {
            const in2Hours = new Date();
            in2Hours.setHours(in2Hours.getHours() + 2);

            user.passwordResetToken = v4();
            user.passwordResetTokenExpiresAt = in2Hours;

            await user.save();
        }
        return user;
    }
}

export default UserService;
