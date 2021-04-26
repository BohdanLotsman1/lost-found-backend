import {RolesList} from "../../lib/enums/roles.list"

export interface IChangeRole {
    role: RolesList;
    user_id: string;
}
