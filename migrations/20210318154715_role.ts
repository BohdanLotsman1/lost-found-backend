import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("roles", table => {
        table.integer("id").unsigned().primary();
        table.string("role", 255 ).notNullable().unique();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("roles");
}

