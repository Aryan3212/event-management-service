import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from "typeorm"
import Workshops from "./workshops.entity"

@Entity()
export class Reservations {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    email!: string

    @ManyToOne(() => Workshops, (workshop) => workshop.reservations,{
        onDelete: "NO ACTION",
    })
    workshop!: Relation<Workshops>
}
export default Reservations;