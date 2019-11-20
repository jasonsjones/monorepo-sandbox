import { Arg, Resolver, Mutation, Query, Ctx } from 'type-graphql';
import { MutationResponse } from '../../types';
import { User } from '../../entity/User';
import UserService from '../../services/UserService';
import { RegisterInput } from './register/RegisterInput';
import Mailer from '../../services/mailer/Mailer';

@Resolver(User)
class UserResolver {
    @Query(() => [User])
    allUsers(): Promise<User[]> {
        return UserService.getAllUsers();
    }

    @Mutation(() => MutationResponse)
    async registerUser(
        @Arg('input') { firstName, lastName, email, password }: RegisterInput,
        @Ctx() context: any
    ): Promise<MutationResponse> {
        const user = await UserService.createUser(firstName, lastName, email, password);
        const baseUrl = `${context.req.protocol}://${context.req.get('host')}`;
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
