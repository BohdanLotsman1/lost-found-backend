import { RoleModel } from "../../common/roles/models/role.model";
import _ from 'underscore';
import { UlidModel } from "../../../lib/models/ulidModel";
import { Model } from "objection";
import { Injectable } from "@nestjs/common";
import { User2RolesModel } from "./user2roles.model";


@Injectable()
export class UserModel extends UlidModel {
    static get tableName() {
        return 'users';
    }

    email: string;
    phone: string;
    contact_face?:string
    password: string;
    name: string;
    location?: string;

    static get relationMappings() {
        return {
            roles: {
                modelClass: RoleModel,
                relation: Model.ManyToManyRelation,
                join: {
                    from: 'users.id',
                    through: {
                        modelClass: User2RolesModel,
                        from: 'user2roles.user_id',
                        to: 'user2roles.role_id'
                    },
                    to: 'roles.id'
                }
            },
        }
    }

    get $secureFields(): string[] {
        return ['password'];
    }

    $formatJson(json) {
        
        json = super.$formatJson(json);

        return _.omit(json, this.$secureFields);
    }
}
