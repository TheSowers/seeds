import Knex from 'knex';
import path from 'path';

const __dirname = path.resolve()

export const knex = Knex({
    client: 'better-sqlite3',
    connection: {
        filename: path.join(__dirname, '230226.sqlite'),
    },
    useNullAsDefault: true,
});
