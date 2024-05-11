import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  UserName: string;

  @Column()
  password: string;

  @Column()
  PasswordCorfirm: string;
}
