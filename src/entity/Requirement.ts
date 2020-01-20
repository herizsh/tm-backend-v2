import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany
} from 'typeorm'
import { Job } from './Job'

@Entity('Requirement')
export class Requirement {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    description!: string

    @ManyToMany(
        () => Job,
        Job => Job.requirements
    )
    jobs!: Job[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}
