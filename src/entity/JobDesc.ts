import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany
} from 'typeorm'
import { Job } from './Job'

@Entity('JobDesc')
export class JobDesc {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    description!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @ManyToMany(
        () => Job,
        Job => Job.jobDescs
    )
    jobs!: Job[]
}
