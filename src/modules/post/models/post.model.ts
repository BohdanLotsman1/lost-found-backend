import { UlidModel } from "../../../lib/models/ulidModel";
import { Model } from "objection";
import { UserModel } from "src/modules/user/models/user.model";

export class PostModel extends UlidModel {
    static get tableName() {
        return 'posts';
    }

    static get relationMappings()  {
        return {
            franchise: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: 'posts.user_id',
                    to: 'users.id'
                }
            },

        }
    };

    header: string;
    place:string;
    image: string;
    user_id:string;
    description: string;
    email: string;
    phone: string;
    contact_face: string;
}