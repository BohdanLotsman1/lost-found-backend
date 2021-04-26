import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AdminController } from "./controllers/admin.controller";
import { RegisterService } from "../auth/services/register.service";
import { RolesService } from "../common/roles/services/roles.service";
import { TokenService } from "../../lib/services/token.service";
import {UserService} from "../user/services/user.service";

@Module({
    providers: [RegisterService, RolesService, TokenService,UserService],
    exports: [RegisterService, RolesService,  TokenService,UserService],
    controllers: [AdminController],
    imports: [
        JwtModule.register({
            secret: 'sd54Sje_#df',
            signOptions: { expiresIn: '60m' },
        } ),
    ]
})

export class AdminModule {}