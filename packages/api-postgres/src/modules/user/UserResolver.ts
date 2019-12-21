import { Arg, Resolver, Mutation, Query, Ctx, UseMiddleware } from 'type-graphql';
import { MutationResponse } from '../../types';
import { User } from '../../entity/User';
import UserService from '../../services/UserService';
import { RegisterInput } from './register/RegisterInput';
import Mailer from '../../services/mailer/Mailer';
import { isAuth } from '../auth/authMiddleware';

@Resolver(User)
class UserResolver {
    @Query(() => [User])
    allUsers(): Promise<User[]> {
        return UserService.getAllUsers();
    }

    @Query(() => User)
    @UseMiddleware(isAuth)
    me(@Ctx() context: any): User {
        return context.contextUser;
    }

    @Mutation(() => MutationResponse)
    async registerUser(
        @Arg('input') { firstName, lastName, email, password }: RegisterInput,
        @Ctx() context: any
    ): Promise<MutationResponse> {
        const user = await UserService.createUser(firstName, lastName, email, password);
        const baseUrl = `${context.req.get('origin')}`;
        await Mailer.sendVerificationEmail(baseUrl, user);
        return {
            success: true,
            message: 'user created',
            payload: {
                user
            }
        };
    }
}

export default UserResolver;
