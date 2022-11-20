import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation, OneToMany } from "typeorm"
import EventsEntity from "./events.entity"
import Reservations from "./reservations.entity"
@Entity()
export class Workshops {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    description!: string

    @Column()
    start_at!: Date

    @Column()
    end_at!: Date

    @ManyToOne(() => EventsEntity, (event) => event.workshops, {
        onDelete: "NO ACTION",
    })
    event!: Relation<EventsEntity>

    @OneToMany(() => Reservations, (reservation) => reservation.workshop, {
        onDelete: "NO ACTION",
    })
    reservations?: Relation<Reservations>[]
}

export default Workshops;