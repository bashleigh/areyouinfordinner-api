import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Index,
	ManyToMany,
	JoinTable,
	OneToMany,
} from 'typeorm';
import User from './user.entity';
import Response from './response.entity';

@Entity()
export default class Group {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({
		default: 1,
	})
	isActive: boolean;

	@Column()
	@Index({
		unique: true,
	})
	code: string;

	@ManyToMany(type => User, user => user.groups)
	@JoinTable()
	users: User[];

	@OneToMany(type => Response, response => response.group)
	responses: Response[];

	@CreateDateColumn()
	created;

	@UpdateDateColumn()
	updated;

}
