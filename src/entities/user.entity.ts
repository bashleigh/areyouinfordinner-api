import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Index,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

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

	@Column()
	isActive: boolean;

	@CreateDateColumn()
	created;

	@UpdateDateColumn()
	updated;

}