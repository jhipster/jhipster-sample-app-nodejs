import { Authority } from './authority.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Exclude } from 'class-transformer';

@Entity('nhi_user')
export class User extends BaseEntity {
    @Column({ unique: true })
    login: string;
    @Column({ nullable: true })
    firstName?: string;
    @Column({ nullable: true })
    lastName?: string;
    @Column()
    email: string;
    @Column({ default: false })
    activated?: boolean;
    @Column({ default: 'en' })
    langKey?: string;

    @ManyToMany(() => Authority)
    @JoinTable()
    authorities?: any[];

    @Column({
        type: 'varchar',
    })
    @Exclude()
    password: string;
    @Column({ nullable: true })
    imageUrl?: string;
    @Column({ nullable: true })
    activationKey?: string;
    @Column({ nullable: true })
    resetKey?: string;
    @Column({ nullable: true })
    resetDate?: Date;
}
