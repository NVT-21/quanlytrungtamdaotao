import { Attendance } from "src/attendance/entities/attendance.entity"
import { Class } from "src/class/entities/class.entity"
import { Course } from "src/course/entities/course.entity"
import { Register } from "src/register/entities/register.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm"

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    idStudent: number
    @Column({nullable:true})
    Name: string
    @Column({nullable:true})
    BirthDay: Date
    @Column({nullable:true})
    Sex: string
    @Column({nullable:true})
    PhoneNumber: string
    @Column({nullable:true})
    Status: string
    @Column({nullable:true})
    tuitionStatus :string
    @Column({nullable:true})
    deposit :Number
    // @ManyToMany(() => Class,cl=>cl.student)
    // classes: Class[]
    @OneToMany(() => Register, Register => Register.student)
    public register: Register[];
    @OneToMany(() => Attendance, attendance => attendance.student)
    attendances: Attendance;
    

}