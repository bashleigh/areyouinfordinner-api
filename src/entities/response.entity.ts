import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinTable,
} from 'typeorm';
import User from './user.entity';
import Group from './group.entity';

@Entity()
export default class Response {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.responses)
    user: User;

    @Column({
        default: 1,
    })
    attending: boolean;

    @ManyToOne(type => Group, group => group.responses)
    @JoinTable()
    group: Group;

    @CreateDateColumn()
    created;

    @UpdateDateColumn()
    updated;
}
