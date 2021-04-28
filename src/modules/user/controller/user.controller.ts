import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { AccessLevel } from 'src/lib/decorator/app-access.decorator';
import { AccessLevelList } from 'src/lib/enums/accessLevel.list';
import { UserService } from 'src/modules/user/services/user.service';


@Controller('user')
export class UserController {
    constructor(
        private userService:UserService
    ) {}

    @Get('/all')
    @AccessLevel(AccessLevelList.LEVEL_SUPER)
    async all(@Query() page:number){ 
        const data = await this.userService.getAllUsers(page);
        return { data };
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string,@Body() data: any){
        
        return this.userService.updateUser(id,data);    
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id:string){

        return this.userService.deleteUser(id);
    }

}