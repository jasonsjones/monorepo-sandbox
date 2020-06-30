import { getConnection } from 'typeorm';
import { User } from '../entity/User';

class TestUtilities {
    public static async dropUsers(): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(User)
            .execute();
    }
}

export default TestUtilities;
