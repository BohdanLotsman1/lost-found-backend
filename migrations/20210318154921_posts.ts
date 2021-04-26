import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("posts", table => {

        table.string("id").primary();
        table.string("header").notNullable();
        table.string('description').notNullable();
        table.string('image').nullable();
        table.string('user_id').notNullable();
        table.string('place').notNullable();
        table.string('phone', 500).notNullable();
        table.string('email').notNullable();
        table.string('contact_face').notNullable();
        table.timestamps();
        table.dateTime( 'deleted_at' ).nullable();
    });
}


export async function down(knex: Knex): Promise<void> {

    return knex.schema.dropTable("posts");
}

