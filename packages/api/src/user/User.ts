/* tslint:disable:only-arrow-functions */
import { genSalt, hash } from 'bcrypt-nodejs';
import mongoose, { Schema } from 'mongoose';
import { IUserModel } from '../types';

const userSchema = new Schema(
    {
        name: {
            first: String,
            last: String
        },
        email: { type: String, unique: true },
        password: String
    },
    { timestamps: true }
);

userSchema.pre('save', function(next) {
    const user: IUserModel = this as IUserModel;

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

userSchema.post('save', function(error: any, doc: any, next: (error?: any) => void) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } else {
        next();
    }
});

/*
This is the middleware we will need to add to if we need to
do any clean up after a user is deleted.

userSchema.post('findOneAndRemove', function(doc) {
});
*/

const User = mongoose.model<IUserModel>('User', userSchema);

export default User;
