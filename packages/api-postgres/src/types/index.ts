/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express';
import { ObjectType, Field } from 'type-graphql';
import { User } from '../entity/User';

export interface ContextUser {
    id: string;
    email: string;
}

export interface AppContext {
    req: Request;
    res: Response;
    contextUser?: ContextUser;
}

@ObjectType()
class PayloadType {
    @Field()
    user?: User;
}

@ObjectType()
export class MutationResponse {
    @Field()
    success: boolean;

    @Field()
    message: string;

    @Field()
    payload?: PayloadType;
}
