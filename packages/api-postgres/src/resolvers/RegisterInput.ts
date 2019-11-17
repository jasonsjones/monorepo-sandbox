import { InputType, Field } from 'type-graphql';
import { IsEmail, Length, MinLength } from 'class-validator';
import { IsEmailAlreadyExist } from './IsUserAlreadyExist';

@InputType()
export class RegisterInput {
    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({ message: 'Email already exists' })
    email: string;

    @Field()
    @MinLength(3)
    password: string;
}
