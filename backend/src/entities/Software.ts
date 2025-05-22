import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { AccessRequest } from './AccessRequest.js';


@Entity()
export class Software {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("text")
  description!: string;

  @Column("simple-array")
  accessLevels!: string[];

  @Column()
  version!: string;

  @Column()
  vendor!: string;

  @OneToMany(() => AccessRequest, (request) => request.software)
  requests!: Request[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
