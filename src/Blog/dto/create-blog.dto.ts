import * as Joi from "joi";

export class CreateBlogDto {
    user_id: number
    title: string
    description: string

    createBlogValidation() {
        return Joi.object({
            user_id: Joi.number().required(),
            title: Joi.string().required().min(20).max(255),
            description: Joi.string().required().min(2000),
        })
    }
}