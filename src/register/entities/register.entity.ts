import { Class } from "src/class/entities/class.entity";
import { Course } from "src/course/entities/course.entity";
import { Student } from "src/student/entities/student.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Register {
    @PrimaryGeneratedColumn()
     registerId: number
    @Column({nullable: true})
    Status:String
    @ManyToOne(() => Course, course => course.registers,{onDelete: 'CASCADE'})
    public course: Course;
    @ManyToOne(() => Student, student => student.register, { onDelete: 'CASCADE', cascade: true })
    public student: Student
    @ManyToOne(() => Class, cl => cl.register, { cascade: true})
    public classes: Class;
    
    
}
