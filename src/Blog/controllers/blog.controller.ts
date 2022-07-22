import {BlogService} from "../service/blog.service";
import {Request, Response} from "express";


export class BlogController {
    constructor(private blogService: BlogService) {
    }

    public all = async (req: Request, res: Response) => {
        const blogs = await this.blogService.getBlogs()
        console.log(blogs)
    }

    public find = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const blog = await this.blogService.findById(id)
        console.log(blog)
    }

    public store = async (req: Request, res: Response) => {
        const createdBlog = this.blogService.createBlog(req.body);
        console.log(createdBlog)
    }

    public update = async (req: Request, res: Response) => {
        const blog_id = parseInt(req.params.id)
        const body = {
            blog_id,
            ...req.body
        }
        const blog = this.blogService.findById(blog_id)
        if (!blog) {
            res.status(404).send({
                message: 'Blog Not found'
            })
        }
        const updatedData = await this.blogService.updateBlog(body)
        console.log(updatedData)
    }

    public destroy = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const deletedBlog = await this.blogService.findById(id)
        console.log(deletedBlog)
    }

    public blogComments = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const blogComments = await this.blogService.findById(id)
        console.log(blogComments)
    }
}
