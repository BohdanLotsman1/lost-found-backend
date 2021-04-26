import * as Knex from "knex";
import {HashService} from "../src/lib/services/hash.service";
import {UserModel} from "../src/modules/user/models/user.model";
import {RolesList} from "../src/lib/enums/roles.list";


let userId1;
let userId2;

export async function seed(knex: Knex): Promise<void> {

    await seedRoles(knex); 
    await seedUsers(knex);
    await seedPosts(knex);
}

async function seedRoles(knex: Knex) {
    await knex("roles").insert([
        { id: RolesList.ADMIN, role: "Admin" },
        { id: RolesList.CUSTOMER, role: "Customer" },
    ]);
}

async function seedUsers(knex: Knex) {
    const password = HashService.hash('qwerty123');

    let user = await UserModel.query(knex).insert({
        email: 'test@test.com',
        phone: '777-777-777',
        name: "Admin Admin",
        contact_face:'Adminovich',
        password,
    });

    await knex.table('user2roles').insert(
        [ RolesList.ADMIN ].map(roleId => {
            return {"user_id": user.id, "role_id": roleId}
        }));
    
    user = await UserModel.query(knex).insert({
        email: 'customer@test.com',
        phone: '777-777-777',
        name: "Customer Customer",
        contact_face:'Customer1',
        password,
    });  

    userId1 = user.id;

    await knex.table('user2roles').insert(
        [ RolesList.CUSTOMER ].map(roleId => {
            return {"user_id": user.id, "role_id": roleId}
    }));

    user = await UserModel.query(knex).insert({
        email: 'string@test.com',
        phone: '888-777-666',
        name: "String Customer",
        contact_face:'Customer2',
        password,
    });  

    userId2 = user.id;

    await knex.table('user2roles').insert(
        [ RolesList.CUSTOMER ].map(roleId => {
            return {"user_id": user.id, "role_id": roleId}
    }));
}

async function seedPosts(knex: Knex) {

    

    await knex.table('posts').insert({
       
        id:require('ulid').ulid(),
        header:'Потерян паспорт',
        description: 'Вчера на проспекте Гоголя я потерял паспорт',
        user_id: userId1,
        place: 'Запорожье',
        phone: '777-777-777',
        email: 'customer@test.com',
        contact_face: 'Артём',
        image:'',
        created_at: new Date()
    }); 
    
    await knex.table('posts').insert({
       
        id:require('ulid').ulid(),
        header:'Нашёл паспорт',
        description: 'Вчера на проспекте Гоголя я нашёл паспорт',
        user_id: userId2,
        place: 'Запорожье',
        phone: '777-777-777',
        email: 'string@test.com',
        contact_face: 'Артём',
        image:'',
        created_at: new Date()
    });
}
