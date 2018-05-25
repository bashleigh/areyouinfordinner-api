import {
	Entity,
	Column,
	Index,
	ManyToMany,
	OneToMany,
} from 'typeorm';
import Base from './base.entity';
import Group from './group.entity';
import Response from './response.entity';

@Entity()
export default class User extends Base {

	@Column()
	firstname: string;

	@Column()
	lastname: string;

	@Column()
	@Index({
		unique: true,
	})
	email: string;

	@Column({
		//select: false,
	})
	password: string;

	@Column({
		default: 1,
	})
	isActive: boolean;

	@ManyToMany(type => Group, group => group.users)
	groups: Group[];

	@OneToMany(type => Response, response => response.user)
	responses: Response[];
}
