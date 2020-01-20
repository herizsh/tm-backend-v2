import {
    Column,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany
} from 'typeorm'
import { User } from './User'
import { JobDesc } from './JobDesc'
import { Requirement } from './Requirement'
import { Register } from './Register'

@Entity('Job')
export class Job {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    startTime!: Date

    @Column()
    endTime!: Date

    @Column()
    quota!: number

    @Column()
    description!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @ManyToOne(
        () => User,
        (User: User) => User.jobs,
        { onDelete: 'CASCADE' }
    )
    @JoinTable()
    user!: User

    @OneToMany(
        () => Register,
        Register => Register.job
    )
    registers!: Register[]

    @ManyToMany(() => JobDesc)
    @JoinTable()
    jobDescs!: JobDesc[]

    @ManyToMany(() => Requirement)
    @JoinTable()
    requirements!: Requirement[]
}
