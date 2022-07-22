import express from "express";
import {BlogController} from "./controllers/blog.controller";


const route = express.Router();

export const blogRouter = (blogController: BlogController) => {
    route.get('/', blogController.all)
    route.post('/', blogController.store)
    route.get('/:id', blogController.find)
    route.get('/:id/comments', blogController.blogComments)
    route.put('/:id', blogController.update)
    route.delete('/:id', blogController.destroy)

    return route
}