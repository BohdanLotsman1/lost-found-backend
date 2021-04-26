import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable( 'user2roles', table => {
        table.string( 'user_id' ).notNullable();
        table.integer( 'role_id' ).notNullable().unsigned();
    } );
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("user2roles");
}

