import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("message", table => {

        table.foreign('sender_id').references("id").inTable( "users" );
        table.foreign('reciver_id').references("id").inTable( "users" );
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table("message", table => {

        table.dropForeign(["sender_id"] );
        table.dropForeign(["reciver_id"] );
    });
}

