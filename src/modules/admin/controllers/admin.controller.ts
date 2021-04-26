import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { RolesService } from "../../common/roles/services/roles.service";
import {IChangeRole} from "../types"
import {UserService} from "../../user/services/user.service"
import { AccessLevel } from 'src/lib/decorator/app-access.decorator';
import { AccessLevelList } from 'src/lib/enums/accessLevel.list';


@Controller('admin')
@AccessLevel(AccessLevelList.LEVEL_SUPER)
export class AdminController {
    constructor(
        private rolesService: RolesService,
        private userService: UserService,
    ) {}

    @Patch('/role')
    async createBooking(@Req() request, @Body() body: IChangeRole) {
            
        let user = await this.userService.findById(body.user_id) ;
        if(user)
        return this.rolesService.updateUserRoles(user, [body.role] );
        else return "User doesn't exist"
    }
}