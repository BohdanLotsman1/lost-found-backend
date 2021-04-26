import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CustomerController } from "./controllers/customer.controller";
import { RolesService } from "../common/roles/services/roles.service";
import { CustomerService } from "./services/customer.service";
import { TokenService } from "../../lib/services/token.service";


@Module({
    providers: [RolesService, TokenService, CustomerService],
    exports: [ RolesService, TokenService, CustomerService],
    controllers: [CustomerController],
    imports: [
        JwtModule.register({
            secret: 'sd54Sje_#df',
            signOptions: { expiresIn: '60m' },
        } ),
    ]
})

export class CustomerModule {}