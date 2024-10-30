import { createPool, Pool } from 'mysql2/promise'

export async function connect(): Promise<Pool> {
    const connection = await createPool({
        host: 'bpxg7kdtw088bigqfxlw-mysql.services.clever-cloud.com',
        user: 'um7oqqzbpqbi6svf',
        password: 'ECA5GaFM82HiyAwK9X3b',
        database: 'bpxg7kdtw088bigqfxlw',
        connectionLimit: 10
    });
    return connection;
}