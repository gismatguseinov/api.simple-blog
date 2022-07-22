import {CreateBlogDto} from "./create-blog.dto";
import * as Joi from "joi";


export class UpdateBlogDto extends CreateBlogDto {
    user_id: number
    blog_id: number
    is_visible: boolean

    updateBlogValidation() {
        return Joi.object({
            user_id: Joi.number().required(),
            blog_id: Joi.number().required(),
            title: Joi.string().required().min(20).max(255),
            description: Joi.string().required().min(1000),
            is_visible: Joi.boolean().required().default(true),
        })
    }
}