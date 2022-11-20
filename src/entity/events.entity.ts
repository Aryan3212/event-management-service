import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from "typeorm"
import Workshops from "./workshops.entity"

@Entity({ name: 'events' })
export class EventsEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    start_at!: Date

    @Column()
    end_at!: Date

    @OneToMany(() => Workshops, (workshop) => workshop.event, {
        onDelete: "NO ACTION",
    })
    workshops?: Relation<Workshops>[]

}

export default EventsEntity;