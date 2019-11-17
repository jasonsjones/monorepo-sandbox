import { Resolver, Query } from 'type-graphql';

@Resolver()
class StatusResolver {
    @Query(() => String)
    public status(): string {
        return 'It works!';
    }
}

export default StatusResolver;
