import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import Base from './base.entity';
import User from './user.entity';
import Group from './group.entity';

@Entity()
export default class Response extends Base {
  @ManyToOne(type => User, user => user.responses)
  user: User;

  @Column({
    default: 1,
  })
  attending: boolean;

  @ManyToOne(type => Group, group => group.responses)
  @JoinTable()
  group: Group;
}
