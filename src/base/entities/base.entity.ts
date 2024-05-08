// co-so.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Base {
  @PrimaryGeneratedColumn()
  idBase: number;

  @Column()
  Name: string;

  @Column()
  Address: string;
}

