import { Request, Response } from 'express'
import UserController from './UserController'
import { checkSearchParams, checkJwt, checkRole } from '../../middleware/checks'

export default [
    {
        path: '/api/v1/user',
        method: 'get',
        handler: [
            async (req: Request, res: Response) => {
                await UserController.findAll(req, res)
            }
        ]
    },
    {
        path: '/api/v1/user',
        method: 'post',
        handler: [
            async (req: Request, res: Response) => {
                await UserController.newUser(req, res)
            }
        ]
    },
    {
        path: '/api/v1/user/:id([0-9]+)',
        method: 'get',
        handler: [
            async (req: Request, res: Response) => {
                return await UserController.getOneById(req, res)
            }
        ]
    },
    {
        path: '/api/v1/user/:id([0-9]+)',
        method: 'patch',
        handler: [
            async (req: Request, res: Response) => {
                return await UserController.editUser(req, res)
            }
        ]
    },
    {
        path: '/api/v1/user/:id([0-9]+)',
        method: 'get',
        handler: [
            async (req: Request, res: Response) => {
                return await UserController.deleteUser(req, res)
            }
        ]
    }
]
