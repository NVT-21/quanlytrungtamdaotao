import { Attendance } from "src/attendance/entities/attendance.entity";
import { Base } from "src/base/entities/base.entity";
import { Course } from "src/course/entities/course.entity";
import { Register } from "src/register/entities/register.entity";
import { Schedule } from "src/schedule/entities/schedule.entity";
import { Student } from "src/student/entities/student.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
  idClass: number;

  @Column()
  Name: string;
  @Column({nullable: true})
  NumeberStudent: number;

 

  @Column('date')
  startDay: Date;
  @Column('date',{nullable:true})
  endDay: Date;
  @Column({nullable: true})
  Status: string;

  // @Column()
  // idBase: string;
  // @ManyToOne(() => Base, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'idBase' })
  // base: Base;

  @ManyToOne(() => Course, course => course.classes,{onDelete: 'CASCADE'})
  @JoinColumn({ name: 'idCourse' })
  course: Course;
  // @ManyToMany(() => Student, student => student.classes, { onDelete: 'CASCADE', cascade: true })
  // @JoinTable()
  // student: Student[];
  @OneToMany(() => Register, Register => Register.classes)
  public register: Register[];
  @OneToMany(() => Schedule, schedule => schedule.classes,{cascade: true})
  schedule: Schedule[]
  @OneToMany(() => Attendance, attendance=>attendance.classes,{cascade: true})
  attendance: Attendance
  
}