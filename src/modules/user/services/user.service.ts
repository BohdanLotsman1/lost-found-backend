import { HttpException, Injectable } from '@nestjs/common';
import { AccessLevelList } from 'src/lib/enums/accessLevel.list';
import { UserModel } from "../models/user.model";

@Injectable()
export class UserService {

    async findById( id ): Promise<UserModel> {
       
       return UserModel.query().findById( id );       
    }

    async findByEmail( email ): Promise<UserModel> {

        return UserModel.query().where('email', email ).limit(1).first();
    }

  
    async updateUser( id: string, userData:any){
        
        await UserModel.query().update(userData).where(`id`,id);    

        const data = await UserModel.query().select().where('id', id );

        return {data}
    }

    async getRole( userId: string ): Promise<string> {

        const role = await UserModel.query()
        .where('id', userId)
        .withGraphFetched('[roles]')
        .limit(1)
        .first();

        let roleName = role['roles'][0].role;      

        if ( roleName == AccessLevelList.LEVEL_SUPER  ) {
            return AccessLevelList.LEVEL_SUPER;
        }

        if (  roleName ==  AccessLevelList.LEVEL_CUSTOMER ) {
            return AccessLevelList.LEVEL_CUSTOMER
        }
    }

    async deleteUser(userID:string):Promise<number>{

        return UserModel.query().delete().where('id', userID );
    }

    async getAllUsers():Promise<UserModel[]>{

        return UserModel.query().select()
    }
 
}