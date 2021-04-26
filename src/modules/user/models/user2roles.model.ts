import {Model} from "nestjs-objection";

export class User2RolesModel extends Model {
    static get tableName() {
        return 'user2roles';
    }

    user_id: string;
    role_id: number;
}