import express from 'express';
import {UserController} from "./controllers/user.controller";

const route = express.Router();

export const userRouter = (userController: UserController) => {
    route.get('/', userController.all);
    route.post('/', userController.create);
    route.get('/:id', userController.find);
    route.put('/:id', userController.update);
    route.delete('/:id', userController.remove);
    route.get('/:id/blogs', userController.getUserBlogs);
    return route;
}


