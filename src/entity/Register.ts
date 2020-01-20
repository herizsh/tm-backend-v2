import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from 'typeorm'
import { User } from './User'
import { Job } from './Job'

@Entity('Register')
export class Register {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(
        () => User,
        User => User.registers
    )
    user!: User

    @ManyToOne(
        () => Job,
        Job => Job.registers
    )
    job!: Job

    @Column()
    status!: string

    @Column()
    @CreateDateColumn()
    createdAt!: Date

    @Column()
    @UpdateDateColumn()
    updatedAt!: Date
}
