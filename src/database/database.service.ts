import {DataSource} from "typeorm";

export class DatabaseService {
    constructor(private connection: DataSource) {
    }

    async runFunction<T>(functionName: string, params?: object): Promise<T> {
        const query = this.createSqlSignature(functionName, params)
        return await this.execute<T>(`SELECT *
                                   FROM ${query}`, params)
    }

    async callProcedure<T>(procedureName: string, params: object):Promise<T> {
        const query = this.createSqlSignature(procedureName, params)
        return this.execute<T>(`CALL ${query}`, params && Object.values(params))
    }

    async execute<T>(query: string, params?: object): Promise<T> {
        try {
            return await this.connection.query(`${query}`, params && Object.values(params));
        } catch (error) {
            throw Error(error.message)
        }
    }

    createSqlSignature(functionName: string, parameters: object) {
        const params = []
        if (parameters) {
            let i = 1;
            for (const key of Object.keys(parameters)) {
                params.push(`${key} => $${i}`)
                i++;
            }
        }
        params.join(',')
        return `${functionName}(${params})`

    }

}