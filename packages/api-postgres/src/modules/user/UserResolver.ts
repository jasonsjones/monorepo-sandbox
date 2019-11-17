import { Arg, Resolver, Mutation, Query } from 'type-graphql';
import { MutationResponse } from '../../types';
import { User } from '../../entity/User';
import UserService from '../../services/UserService';
import { RegisterInput } from './register/RegisterInput';

@Resolver(User)
class UserResolver {
    @Query(() => [User])
    allUsers(): Promise<User[]> {
        return UserService.getAllUsers();
    }

    @Mutation(() => MutationResponse)
    async registerUser(
        @Arg('input') { firstName, lastName, email, password }: RegisterInput
    ): Promise<MutationResponse> {
        const user = await UserService.createUser(firstName, lastName, email, password);

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
