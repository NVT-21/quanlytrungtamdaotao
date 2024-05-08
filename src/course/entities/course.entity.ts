// khoa-hoc.entity.ts
import { Class } from 'src/class/entities/class.entity';
import { Register } from 'src/register/entities/register.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  idCourse: number;
  @Column({nullable:true})
  Name: string;
  @Column({nullable:true})
  describe: string;
  
  @Column({nullable:true})
  status: string;
  @Column({nullable:true})
  totalSession: number
  @Column({nullable:true})
  tuition: number
  @OneToMany(() => Class, cl => cl.course, { cascade: true})
  classes: Class[];
  
  @OneToMany(() => Register, reg => reg.course, { cascade: true })
  registers: Register[];
}
