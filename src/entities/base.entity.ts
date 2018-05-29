import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

abstract class Base {
  @PrimaryGeneratedColumn() id: number;

  @CreateDateColumn() created;

  @UpdateDateColumn() updated;
}

export default Base;
