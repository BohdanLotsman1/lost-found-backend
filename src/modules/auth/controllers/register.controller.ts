import { BadRequestException, Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { IRegisterUser } from "../types";
import { RegisterService } from "../services/register.service";
import { RolesService } from "../../common/roles/services/roles.service";
import { RolesList } from "../../../lib/enums/roles.list";
import {registerSchema} from "../../../lib/validator/user/register.validator";
import {YupOptions} from "../../../lib/validator/yup.validator";

@Controller('register')
export class RegisterController {
    constructor(
        private registerService: RegisterService,
        private rolesService: RolesService,
    ) {}

    @Post('/')
    async registerCustomer(@Req() request, @Body() body: IRegisterUser){

        const data = await registerSchema.validate(body, YupOptions);
        const user = await this.registerService.registerUser(request, data);

        await this.rolesService.attachRoles(user, [RolesList.CUSTOMER]);
        return { user }
    }
}
