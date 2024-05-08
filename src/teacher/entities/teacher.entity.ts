import { Class } from "src/class/entities/class.entity";
import { Register } from "src/register/entities/register.entity";
import { Schedule } from "src/schedule/entities/schedule.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    idTeacher: Number;
    @Column({nullable:true})
    Name:String
    @Column({nullable:true})
    BirthDate:Date
    @Column({nullable:true})
    Sex :String
    @Column({nullable:true})
    Status:String
    
    @OneToMany(() => Schedule, (schedule) => schedule.teacher)
    schedule: Schedule[]

}
