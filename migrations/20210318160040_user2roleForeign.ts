import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table( 'user2roles', table => {
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('role_id').references('id').inTable('roles');
    } );
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table( 'user2roles', table => {
        table.dropForeign( ['user_id'] );
        table.dropForeign( ['role_id'] );
    } );
}

