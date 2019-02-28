import { genSalt, hash } from 'bcrypt-nodejs';
import mongoose, { Schema } from 'mongoose';
import { UserModelType } from '../types';

const userSchema = new Schema({
    email: String,
    password: String
});

// tslint:disable next-line
userSchema.pre('save', function(next /*: (e: any, user?: UserModelType) => void */) {
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

const User = mongoose.model<UserModelType>('User', userSchema);

export default User;
