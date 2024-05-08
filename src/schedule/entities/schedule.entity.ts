import { Class } from "src/class/entities/class.entity"
import { Teacher } from "src/teacher/entities/teacher.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinColumn, ManyToOne } from "typeorm"

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    idSchedule: number
    @Column({nullable:true})
    weekdays: string
    @Column({nullable:true})
    startTime: string
    @Column({nullable:true})
    endTime: string
   
    // @Column()
    // idClass: number

    @ManyToOne(() => Class,cl=>cl.schedule)
    @JoinColumn({ name: 'idClass' })
    classes: Class[]
    @ManyToOne(() => Teacher, (teacher) => teacher.schedule)
    teacher: Teacher

}


