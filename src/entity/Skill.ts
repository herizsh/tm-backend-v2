import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany
} from 'typeorm'
import { User } from './User'

@Entity('Skill')
export class Skill {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    description!: string

    @ManyToMany(
        () => User,
        User => User.skills
    )
    users!: User[]

    @Column()
    @CreateDateColumn()
    createdAt!: Date

    @Column()
    @UpdateDateColumn()
    updatedAt!: Date
}
