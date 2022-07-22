import {UserService} from "../service/user.service";
import {Request, Response} from "express";

export class UserController {
    constructor(private userService: UserService) {
    }

    public all = async (req: Request, res: Response) => {
        const users = await this.userService.getUsers()
        if (users.length === 0) {
            res.status(204).send(users)
        }
        res.status(200).send(users)

    }

    public find = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const user = await this.userService.findById(id)
        if (Object.keys(user).length === 0) {
            res.status(404).send({
                error: 'User Not found'
            })
        }
        res.status(200).send(user)
    }

    public create = async (req: Request, res: Response) => {
        const createdUser = await this.userService.createUser(req.body)
        if (createdUser) {
            res.status(201).send({
                message: 'User successfully created'
            })
        }
    }

    public update = async (req: Request, res: Response) => {
        const user_id = parseInt(req.params.id)
        const body = {
            user_id,
            ...req.body
        }
        const updatedUser = await this.userService.updateUser(body);
        console.log(updatedUser)
    }

    public remove = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.id)
        const result = await this.userService.deleteUser(userId)
        console.log(result)
    }

    public getUserBlogs = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.id)
        const user = await this.userService.findById(userId)
        // if (user.message.length === 0) {
        //     res.status(404).send({
        //         message: 'User Not Found.'
        //     })
        // }
        const blogs = await this.userService.getUserBlogs(userId)
        console.log(blogs)
    }


}