import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { User } from '../entity/User'

export class Seed1575347908385 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User()
        user.email = 'admin@gmail.com'
        user.displayName = 'Heri Susanto'
        user.password = 'admin'
        user.role = 'ADMIN'
        user.photoURL = 'assets/images/avatars/Abbott.jpg'
        user.hashPassword()
        const userRepository = getRepository(User)
        await userRepository.save(user)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {}
}
