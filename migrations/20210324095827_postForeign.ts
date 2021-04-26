import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("posts", table => {
       
        table.foreign("user_id").references("id").inTable("users");       
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table( 'posts', table => {

        table.foreign( ['user_id'] );     
    } );
}

