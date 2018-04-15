import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Index,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
} from 'typeorm';
import Group from './group.entity';

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

	@CreateDateColumn()
	created;

	@UpdateDateColumn()
	updated;

}