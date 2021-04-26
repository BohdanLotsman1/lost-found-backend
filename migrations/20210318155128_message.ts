import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable( 'message', table => {
        table.string('sender_id').notNullable();
        table.string('reciver_id').notNullable()
        table.string( 'message').notNullable();
        table.timestamps();
        table.dateTime( 'deleted_at' ).nullable();
    } );
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("franchise");
}

