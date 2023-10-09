import { Field, ObjectType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { EntityWithMeta } from '../common';
import { VAR_CHAR } from './constants';

@ObjectType()
@Entity('rates')
export class RateEntity extends EntityWithMeta {
    @IsString()
    @MinLength(1)
    @Field(() => String)
    @Column({ ...VAR_CHAR, default: null })
    public country!: string;

    @IsString()
    @MinLength(1)
    @Field(() => String)
    @Column({ ...VAR_CHAR, default: null })
    public currency!: string;

    @MinLength(1)
    @Field(() => Number)
    @Column('decimal', { default: null, precision: 32, scale: 16 })
    public amount!: number;

    @IsString()
    @MinLength(1)
    @Field(() => String)
    @Column({ ...VAR_CHAR, default: null })
    public code!: string;

    @MinLength(1)
    @Field(() => Number)
    @Column('decimal', { default: null, precision: 32, scale: 16 })
    public rate!: number;
    /* Relations */
}
