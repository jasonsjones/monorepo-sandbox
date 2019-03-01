import { genSalt, hash } from 'bcrypt-nodejs';
import mongoose, { Schema } from 'mongoose';
import { UserModelType } from '../types';

const userSchema = new Schema(
    {
        email: String,
        password: String
    },
    { timestamps: true }
);

// tslint:disable next-line
userSchema.pre('save', function(next) {
    const user: UserModelType = this as UserModelType;

    genSalt(10, (saltErr: any, salt: string) => {
        if (saltErr) {
            return next(saltErr);
        }
        hash(user.password, salt, null, (hashErr: any, hashPwd: string) => {
            if (hashErr) {
                return next(hashErr);
            }
            user.password = hashPwd;
            next();
        });
    });
});

/*
This is the middleware we will need to add to if we need to
do any clean up after a user is deleted.

// tslint:disable next-line
userSchema.post('findOneAndRemove', function(doc) {
});
*/

const User = mongoose.model<UserModelType>('User', userSchema);

export default User;
