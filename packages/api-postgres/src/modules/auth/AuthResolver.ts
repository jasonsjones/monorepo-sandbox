import { Resolver, Mutation, Arg, ObjectType, Field, Ctx } from 'type-graphql';
import { compareSync } from 'bcryptjs';
import UserService from '../../services/UserService';
import { createAccessToken, createRefreshToken } from './authUtils';
import { AppContext, MutationResponse } from '../../types';
import { User } from '../../entity/User';

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
        @Arg('password') password: string,
        @Ctx() context: AppContext
    ): Promise<LoginResponse> {
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            throw new Error('invalid user credentials');
        }

        const isValid = compareSync(password, user.password);
        if (!isValid) {
            throw new Error('invalid user credentials');
        }

        context.res.cookie('qid', createRefreshToken(user), { httpOnly: true });

        const token = createAccessToken(user);
        return {
            accessToken: token
        };
    }

    @Mutation(() => Boolean)
    logout(@Ctx() context: AppContext): boolean {
        context.res.clearCookie('qid');
        return true;
    }

    @Mutation(() => MutationResponse)
    async confirmEmail(@Arg('token') token: string): Promise<MutationResponse> {
        let user: User | undefined;
        try {
            user = await UserService.getUserByProperty('emailVerificationToken', token);
        } catch (e) {
            console.log(e);
        }

        if (!user) {
            return {
                success: true,
                message: 'verification token not found'
            };
        }

        if (!user?.isEmailVerified || user?.emailVerificationToken !== '') {
            (user as User).isEmailVerified = true;
            (user as User).emailVerificationToken = '';
            await user?.save();
            return {
                success: true,
                message: 'user email confirmed',
                payload: {
                    user
                }
            };
        } else {
            return {
                success: true,
                message: 'user email already confirmed',
                payload: {
                    user
                }
            };
        }
    }
}

export default AuthResolver;
