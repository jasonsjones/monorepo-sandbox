import { Arg, Resolver, Mutation, Query, FieldResolver, Root } from 'type-graphql';
import { MutationResponse } from '../types';
import { User } from '../entity/User';
import UserService from '../services/UserService';

@Resolver(User)
class UserResolver {
    @Query(() => [User])
    allUsers(): Promise<User[]> {
        return UserService.getAllUsers();
    }

    @FieldResolver()
    name(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`;
    }

    @Mutation(() => MutationResponse)
    async registerUser(
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string,
        @Arg('email') email: string,
        @Arg('password') password: string
    ): Promise<MutationResponse> {
        const response = await UserService.createUser(firstName, lastName, email, password);
        if (Array.isArray(response)) {
            return {
                success: false,
                message: 'unable to create user',
                error: response
            };
        }

        return {
            success: true,
            message: 'user created'
        };
    }
}

export default UserResolver;
