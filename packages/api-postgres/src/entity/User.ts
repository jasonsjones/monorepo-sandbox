import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column('varchar', { unique: true, length: 255 })
    email: string;

    @Column()
    password: string;

    @Field()
    name: string;

    @Field()
    @Column({ default: false })
    isEmailVerified: boolean;

    @Field()
    @Column()
    emailVerificationToken: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;
}
