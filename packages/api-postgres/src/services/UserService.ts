import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import { User } from '../entity/User';
import DateUtils from '../utils/DateUtils';

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
            user.passwordResetToken = v4();
            user.passwordResetTokenExpiresAt = DateUtils.getDateMinutesFromNow(120);

            await user.save();
        }
        return user;
    }

    static async changePassword(
        token: string,
        password: string
    ): Promise<{ success: boolean; message: string; user: User | undefined }> {
        let success: boolean;
        let message: string;
        const user = await this.getUserByProperty('passwordResetToken', token);

        if (user) {
            const now = DateUtils.getCurrentDate();
            const tokenIsExpired = now > user.passwordResetTokenExpiresAt;
            if (!tokenIsExpired) {
                user.password = await bcrypt.hash(password, 12);
                user.passwordResetToken = '';
                user.passwordResetTokenExpiresAt = now;

                await user.save();

                success = true;
                message = 'password changed';
            } else {
                success = false;
                message = 'reset token is expired';
            }
        } else {
            success = false;
            message = 'reset token not valid for user';
        }

        return {
            success,
            message,
            user
        };
    }
}

export default UserService;
