import { Class } from "src/class/entities/class.entity";
import { Student } from "src/student/entities/student.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date',nullable:true })
  date: Date;

  @Column()
  status: string;
  @Column({nullable:true })
  lesson: number;

  @ManyToOne(() => Student, student => student.attendances)
  @JoinColumn({ name: 'idStudent' })
  student: Student;
  @ManyToOne(() => Class, Class => Class.attendance)
  @JoinColumn({ name: 'idClass' })
  classes: Class;
  
 
}
