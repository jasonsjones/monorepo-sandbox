import { Resolver, Mutation, Arg } from 'type-graphql';
import { compareSync } from 'bcryptjs';
import UserService from '../../services/UserService';

@Resolver()
class AuthResolver {
    @Mutation(() => Boolean)
    async login(@Arg('email') email: string, @Arg('password') password: string): Promise<boolean> {
        const user = await UserService.getUserByEmail(email);
        if (user) {
            return compareSync(password, user.password);
        }
        return false;
    }
}

export default AuthResolver;
