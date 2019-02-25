import UserStore from '../../user/UserStore';

export default {
    user: (parent: any, args: any) => UserStore.getUserById(args.id),
    users: () => UserStore.getUsers()
};
