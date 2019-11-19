import { Resolver, Mutation, Arg, ObjectType, Field } from 'type-graphql';
import { compareSync } from 'bcryptjs';
import UserService from '../../services/UserService';
import { generateToken } from './authUtils';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
}

@Resolver()
class AuthResolver {
    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string
    ): Promise<LoginResponse> {
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            throw new Error('invalid user credentials');
        }

        const isValid = compareSync(password, user.password);
        if (!isValid) {
            throw new Error('invalid user credentials');
        }

        const token = generateToken(user);
        return {
            accessToken: token
        };
    }
}

export default AuthResolver;
