import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Index,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	OneToMany,
} from 'typeorm';
import Group from './group.entity';
import Response from './response.entity';

@Entity()
export default class User {

	@PrimaryGeneratedColumn()
	id: number;

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
		select: false,
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

	@CreateDateColumn()
	created;

	@UpdateDateColumn()
	updated;

}
