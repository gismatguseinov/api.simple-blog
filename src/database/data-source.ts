import {DataSource} from "typeorm";
import dotenv from 'dotenv'

dotenv.config()
const dbPort: number = +process.env.DB_PORT
const dbUsername: string = process.env.DB_USERNAME
const dbPassword: string = process.env.DB_PASSWORD
const dbName: string = process.env.DB_NAME
const dbHost: string = process.env.DB_HOST


export const AppDataSource = new DataSource({
    type: "postgres",
    host: dbHost,
    port: dbPort,
    username: dbUsername,
    password: dbPassword,
    database: dbName,
    synchronize: false,
    logging: false,
})