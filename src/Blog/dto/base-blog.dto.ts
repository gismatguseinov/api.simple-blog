export class BaseBlogDto {
    blog_id: number
    user_id: number
    title: string
    description: string
    is_visible: boolean
    reading_time: number
    created_at: Date
    updated_at: Date
}