import Knex from 'knex';
import path from 'path';

const __dirname = path.resolve()

export const knex = Knex({
    client: 'better-sqlite3',
    connection: {
        filename: path.join(__dirname, 'db.sqlite'),
    },
    useNullAsDefault: true,
});

if ((await knex.schema.hasTable('subway')) === false) {
    console.log('test subway')
    await knex.schema.createTable('subway', function(table) {
        table.bigIncrements('id');
        table.string('line').notNullable();
        table.string('name').notNullable();
        table.string('destination').nullable();
    });
    await knex.schema.alterTable('subway', function(table) {
        table.unique(['line', 'name', 'destination'], {indexName: 'line_name_destination__unique_idx'})
    });
}

if ((await knex.schema.hasTable('time_table')) === false) {
    console.log('test time_table')
    await knex.schema.createTable('time_table', function(table) {
        table.bigIncrements('id');
        table.string('type').notNullable();
        table.datetime('departure_time').notNullable();
        table.bigInteger('subway_id').notNullable();
    });
    await knex.schema.alterTable('time_table', function(table) {
        table.unique(['type', 'departure_time', 'subway_id'], {indexName: 'type_departure_time_subway_id__unique_idx'})
    });
}
