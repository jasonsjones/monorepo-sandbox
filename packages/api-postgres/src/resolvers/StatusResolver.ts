import { Resolver, Query } from 'type-graphql';

@Resolver()
class StatusResolver {
    @Query()
    public status(): string {
        return 'It works!';
    }
}

export default StatusResolver;
