import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class room {
    @PrimaryGeneratedColumn()
    idRoom: number

    @Column()
    Name: string

    @Column()
    status: string

    @Column()
    idBase: string
}

