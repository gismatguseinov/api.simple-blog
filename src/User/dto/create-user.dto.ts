import * as Joi from "joi";

export class CreateUserDto {
    public username: string;

    public email: string;

    public password: string

    createUserValidation() {
        return Joi.object({
            username: Joi.string().required().min(5).max(255),
            password: Joi.string().required().min(6).max(50),
            email: Joi.string().required().email().min(5).max(255),
        });
    }
}