import {DatabaseService} from "../../database/database.service";
import {CreateUserDto} from "../dto/create-user.dto";
import {UpdateUserDto} from "../dto/update-user.dto";
import {BaseUserDto} from "../dto/base-user.dto";

export class UserService {
    constructor(private database: DatabaseService) {
    }

    async getUsers(): Promise<BaseUserDto[]> {
        return await this.database.runFunction<BaseUserDto[]>('public.get_users');
    }

    async findById(id: number): Promise<BaseUserDto> {
        return await this.database.runFunction<BaseUserDto>('public.get_user', {
            _user_id: id
        });
    }

    async createUser(createUserDto: CreateUserDto): Promise<any> {
        const userDto = new CreateUserDto()
        const schema = userDto.createUserValidation()

        const result = schema.validate(createUserDto)
        if (result.error) {
            throw new Error('result.error.message')
        }

        const user = await this.database.callProcedure<any>('public.create_user', {
            _result: null,
            _username: createUserDto.username,
            _email: createUserDto.email,
            _password: createUserDto.password
        });
        console.log(user)
        return user
    }

    async updateUser(updateUserDto: UpdateUserDto): Promise<CreateUserDto> {
        console.log(updateUserDto)
        const userDto = new UpdateUserDto()
        const schema = userDto.updateUserValidation()
        const result = schema.validate(updateUserDto)
        if (result.error) {
            throw new Error(result.error.message)
        }
        return await this.database.callProcedure('public.update_user', {
            _user_id: updateUserDto.user_id,
            _username: updateUserDto.username,
            _email: updateUserDto.email,
            _password: updateUserDto.password
        });
    }

    async deleteUser(id: number) {
        const user = await this.findById(id)
        console.log(user)
        // if (user.message.length === 0) {
        //     return {success: false, message: 'User Not Found.', statusCode: 404}
        // }
        const deletedUser = await this.database.callProcedure<BaseUserDto>('delete_user', {
            _user_id: id
        })
        console.log(deletedUser)
    }

    async getUserBlogs(id: number) {
        return await this.database.runFunction('get_user_blos', {
            _user_id: id
        });
    }

}
