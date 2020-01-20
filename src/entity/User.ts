import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable
} from 'typeorm'
import { Length } from 'class-validator'
import * as bcrypt from 'bcryptjs'
import { Job } from './Job'
import { Skill } from './Skill'
import { Register } from './Register'
@Entity('User')
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    displayName!: string

    @Column()
    email!: string

    @Column()
    @Length(4, 255)
    password!: string

    @Column()
    role!: string

    @Column({ nullable: true })
    about!: string

    @Column({ nullable: true })
    address!: string

    @Column({ nullable: true })
    photoURL!: string

    @Column()
    isVerified: boolean = false

    @Column()
    @CreateDateColumn()
    createdAt!: Date

    @Column()
    @UpdateDateColumn()
    updatedAt!: Date

    @OneToMany(
        () => Job,
        (Job: Job) => Job.user,
        { onDelete: 'CASCADE' }
    )
    jobs!: Job[]

    @ManyToMany(() => Skill)
    @JoinTable()
    skills!: Skill[]

    @OneToMany(
        () => Register,
        Register => Register.user
    )
    registers!: Register[]

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }
}
