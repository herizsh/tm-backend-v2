import { validate } from 'class-validator'
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import config from '../../config/config'
import { User } from '../../entity/User'

class AuthController {
    public static register = async (req: Request, res: Response) => {
        // const data = JSON.parse(request.data);
        // const { displayName, password, email } = data;
        console.log(req.body.data)
        const { displayName, email, password, role } = req.body.data
        const userRepository = getRepository(User)
        const isEmailExists = await userRepository.find({ email })

        if (isEmailExists.length > 0) {
            res.status(409).send('Email already exists.')
        } else {
            try {
                if (displayName && password && email && role) {
                    const user = new User()
                    user.email = email
                    user.displayName = displayName
                    user.password = password
                    user.role = role
                    user.photoURL = 'assets/images/avatars/Abbott.jpg'
                    user.hashPassword()
                    // const userRepository = getRepository(User);
                    const newUser = await userRepository.save(user)
                    delete newUser.password

                    const accessToken = jwt.sign(
                        { userId: user.id, email: user.email },
                        config.jwtSecret,
                        { expiresIn: config.expiresIn }
                    )

                    const userData = {
                        data: {
                            about: newUser.about,
                            address: newUser.address,
                            createdAt: newUser.createdAt,
                            displayName: newUser.displayName,
                            email: newUser.email,
                            isVerified: newUser.isVerified,
                            photoURL: newUser.photoURL,
                            updatedAt: newUser.updatedAt
                        },
                        from: 'express-postgres-db',
                        role: newUser.role,
                        uuid: newUser.id
                    }

                    const response = {
                        access_token: accessToken,
                        user: userData
                    }
                    res.send(response)
                } else {
                    res.status(400).send('Data tidak boleh kosong')
                }
            } catch (e) {
                const error = 'Error when register'
                res.status(400).send(error)
            }
        }
    }

    public static login = async (req: Request, res: Response) => {
        const { email, password } = req.body.data

        if (!(email && password)) {
            res.status(400).send()
        }

        // Get user from database
        const userRepository = getRepository(User)
        let user!: User
        try {
            user = await userRepository.findOneOrFail({ where: { email } })
        } catch (error) {
            res.status(401).send()
        }

        // Check if encrypted password match
        console.log(user)
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send()
            return
        }

        const userData = {
            data: {
                about: user.about,
                address: user.address,
                createdAt: user.createdAt,
                displayName: user.displayName,
                email: user.email,
                isVerified: user.isVerified,
                photoURL: user.photoURL,
                updatedAt: user.updatedAt
            },
            from: 'express-postgres-db',
            role: user.role,
            uuid: user.id
        }

        const accessToken = jwt.sign(
            { userId: user.id, email: user.email },
            config.jwtSecret,
            { expiresIn: config.expiresIn }
        )
        const response = {
            access_token: accessToken,
            user: userData
        }
        console.log(response)

        res.send(response)
    }

    public static loginWithToken = async (req: Request, res: Response) => {
        let { access_token } = req.body.data
        if (access_token.startsWith('Bearer ')) {
            // Remove Bearer from string
            access_token = access_token.slice(7, access_token.length)
        }

        try {
            const { email }: any = jwt.verify(access_token, config.jwtSecret)
            const userRepository = getRepository(User)
            let user!: User
            try {
                user = await userRepository.findOneOrFail({ where: { email } })
            } catch (error) {
                res.status(401).send()
            }
            delete user.password

            const newAccessToken = jwt.sign(
                { userId: user.id, email: user.email },
                config.jwtSecret,
                { expiresIn: config.expiresIn }
            )
            const userData = {
                data: {
                    about: user.about,
                    address: user.address,
                    createdAt: user.createdAt,
                    displayName: user.displayName,
                    email: user.email,
                    isVerified: user.isVerified,
                    photoURL: user.photoURL,
                    updatedAt: user.updatedAt
                },
                from: 'express-postgres-db',
                role: user.role,
                uuid: user.id
            }

            const response = {
                access_token: newAccessToken,
                user: userData
            }
            res.send(response)
            // return [200, response];
        } catch (e) {
            const error = 'Invalid access token detected'
            // return [401, { error }];
            res.status(401).send(error)
        }
    }

    public static changePassword = async (req: Request, res: Response) => {
        // Get ID from JWT
        const id = res.locals.jwtPayload.userId

        // Get parameters from the body
        const { oldPassword, newPassword } = req.body
        if (!(oldPassword && newPassword)) {
            res.status(400).send('Password harus diisi bos')
        }

        // Get user from the database
        const userRepository = getRepository(User)
        let user!: User
        try {
            user = await userRepository.findOneOrFail(id)
        } catch (id) {
            res.status(401).send()
        }

        // Check if old password matchs
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            res.status(401).send()
            return
        }

        // Validate de model (password lenght)
        user.password = newPassword
        const errors = await validate(user)
        if (errors.length > 0) {
            res.status(400).send(errors)
            return
        }
        // Hash the new password and save
        user.hashPassword()
        userRepository.save(user)

        res.status(204).send('Data berhasil diupdate')
    }
}
export default AuthController
