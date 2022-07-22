import {AppDataSource} from "./database/data-source";
import express from "express";
import {DatabaseService} from "./database/database.service";
import {DataSource} from "typeorm";
import {UserController} from "./User/controllers/user.controller";
import {UserService} from "./User/service/user.service";
import {userRouter} from "./User/userRoutes";
import {BlogService} from "./Blog/service/blog.service";
import {BlogController} from "./Blog/controllers/blog.controller";
import {blogRouter} from "./Blog/blogRoutes";
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'

import swaggerDoc from './swagger.json'


AppDataSource.initialize().then(async (connection: DataSource) => {

    dotenv.config()
    if (!process.env.PORT) {
        process.exit(1)
    }

    const database = new DatabaseService(connection)
    const userService = new UserService(database)
    const blogService = new BlogService(database)
    const userController = new UserController(userService);
    const blogController = new BlogController(blogService);

    const PORT: number = +process.env.PORT
    const app = express();

    app.use(express.json());
    app.use('/api/users', userRouter(userController))
    app.use('/api/blogs', blogRouter(blogController))
    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDoc)
    );
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });

}).catch(err => {
    console.error({
        message:err.code
    })
})
