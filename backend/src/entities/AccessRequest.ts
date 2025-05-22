// AccessRequest.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import type { User } from './User.js';   // <-- type only import to avoid circularity
import { User as UserClass } from './User.js'; // <-- import actual class only once

import { Software } from './Software.js';

@Entity()
export class AccessRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserClass, (user) => user.requests)
  user!: User;

  @ManyToOne(() => Software, (software) => software.requests)
  software!: Software;

  @Column()
  accessType!: string;

  @Column()
  reason!: string;

  @Column({ default: 'pending' })
  status!: 'pending' | 'approved' | 'rejected';

  @CreateDateColumn()
  createdAt!: Date;
}
