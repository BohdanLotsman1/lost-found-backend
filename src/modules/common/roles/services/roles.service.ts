import { UserModel } from "../../../user/models/user.model";
import { User2RolesModel } from "../../../user/models/user2roles.model";
import { RolesList } from "../../../../lib/enums/roles.list";

export class RolesService {

    async updateUserRoles( user: UserModel, roleIds: RolesList[] ): Promise<void> {
        await this.detachRoles(user, roleIds);
        await User2RolesModel.query().delete().where("user_id",user.id)
        await this.attachRoles(user, roleIds);
    }

    async detachRoles( user: UserModel, roleIds: RolesList[] ): Promise<number> {
        return user.$relatedQuery('roles').unrelate().whereIn('role_id', roleIds);
    }

    async attachRoles( user: UserModel, roleIds: RolesList[] ): Promise<number> {
        return user.$relatedQuery( 'roles' ).relate( roleIds );
    }
}