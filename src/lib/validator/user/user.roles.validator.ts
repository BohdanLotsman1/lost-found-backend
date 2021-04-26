import * as yup from 'yup';
import {RolesList} from "../../enums/roles.list";

export const UserRolesYupSchema = yup.object({
    role_ids: yup.array( yup.number() ).required()
        .test('role_exist','Role does not exist'
    ,   (value)=>{
            let roles = [];
            roles = value.map(m=>{
                return !!RolesList[m];
            });
        return !roles.includes(false)
    })
});