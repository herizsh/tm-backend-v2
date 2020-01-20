import { Request, Response, NextFunction } from 'express'
import { HTTP400Error, HTTP401Error } from '../utils/httpErrors'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import { getRepository } from 'typeorm'

import { User } from '../entity/User'

export const checkSearchParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.query.q) {
        throw new HTTP400Error('Missing q parameter')
    } else {
        next()
    }
}

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    // const token = <string>req.headers['authorization'];
    let token =
        <string>req.headers['x-access-token'] ||
        req.headers['authorization'] ||
        ''
    // Express headers are auto converted to lowercase
    if (token.substr(0, 7) == 'Bearer ') {
        // Remove Bearer from string
        token = token.slice(7, token.length).trimLeft()
    }
    let jwtPayload
    //Try to validate the token and get data
    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret)
        res.locals.jwtPayload = jwtPayload
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        // res.status(401).send();
        throw new HTTP401Error('Unauthorized')
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId, email } = jwtPayload
    const newToken = jwt.sign({ userId, email }, config.jwtSecret, {
        expiresIn: '1h'
    })
    res.setHeader('token', newToken)

    //Call the next middleware or controller
    next()
}

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous midleware
        const id = res.locals.jwtPayload.userId

        //Get user role from the database
        const userRepository = getRepository(User)
        let user!: User
        try {
            user = await userRepository.findOneOrFail(id)
        } catch (id) {
            throw new HTTP401Error('Unauthorized')
        }

        //Check if array of authorized roles includes the user's role
        if (roles.indexOf(user.role) > -1) next()
        throw new HTTP401Error('Unauthorized')
    }
}
