import path from 'path';

const __dirname = path.resolve()

export const knexConfig = {
    client: 'better-sqlite3',
    connection: {
        filename: path.join(__dirname, 'db.sqlite'),
    },
    useNullAsDefault: true,
};
