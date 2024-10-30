import { createPool, Pool } from 'mysql2/promise'

export async function connect(): Promise<Pool> {
    const connection = await createPool({
        host: 'mysql-186236-0.cloudclusters.net',
        port: 10013,
        user: 'admin',
        password: 'swIyAqvQ',
        database: 'privado',
        connectionLimit: 15
    });
    return connection;
}