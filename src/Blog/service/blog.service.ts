import {DatabaseService} from "../../database/database.service";
import {UpdateBlogDto} from "../dto/update-blog.dto";
import {CreateBlogDto} from "../dto/create-blog.dto";
import {BaseBlogDto} from "../dto/base-blog.dto";

export class BlogService {

    constructor(private database: DatabaseService) {
    }

    async getBlogs(): Promise<BaseBlogDto[]> {
        return await this.database.runFunction<BaseBlogDto[]>('get_blogs')
    }

    async findById(id: number): Promise<BaseBlogDto> {
        return await this.database.runFunction<BaseBlogDto>('get_blog', {
            _blog_id: id
        })
    }

    async updateBlog(updateBlogDto: UpdateBlogDto): Promise<UpdateBlogDto> {
        const blogDto = new UpdateBlogDto()
        const schema = blogDto.updateBlogValidation()
        const validate = schema.validate(updateBlogDto)
        if (validate.error) {
            throw new Error(validate.error.message)
        }
        return await this.database.callProcedure<UpdateBlogDto>('update_blog', {
            _user_id: updateBlogDto.user_id,
            _title: updateBlogDto.title,
            _description: updateBlogDto.description,
            _is_visible: updateBlogDto.is_visible,
            _blog_id: updateBlogDto.blog_id
        })
    }

    async createBlog(createBlogDto: CreateBlogDto): never | Promise<CreateBlogDto> {
        const createDto = new CreateBlogDto();
        const schema = createDto.createBlogValidation()
        const validate = schema.validate(createBlogDto)
        if (validate.error) {
            throw new Error(validate.error.message)
        }
        return await this.database.callProcedure<CreateBlogDto>('create_blog', {
            _user_id: createBlogDto.user_id, _title: createBlogDto.title, _description: createBlogDto.description,
        })
    }

    async deleteBlog(blogId:number) {
        return await this.database.callProcedure<BaseBlogDto>('delete_blog', {
            _blog_id: blogId
        })
    }

    async getCommentsByBlogId(blogId: number) {
        return await this.database.runFunction('get_comments', {
            _blog_id: blogId
        })
    }

}