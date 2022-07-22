import {CreateUserDto} from "./create-user.dto";
import * as Joi from "joi";


export class UpdateUserDto extends CreateUserDto {
    user_id: number


    updateUserValidation() {
        return Joi.object({
            username: Joi.string().required().min(5).max(255),
            password: Joi.string().required().min(6).max(50),
            email: Joi.string().required().email().min(5).max(255),
            user_id: Joi.number().required()
        });
    }
}