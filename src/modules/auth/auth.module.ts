import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { RegisterController } from "./controllers/register.controller";
import { AuthController } from "./controllers/auth.controller";
import { RegisterService } from "./services/register.service";
import { RolesService } from "../common/roles/services/roles.service";
import { UserService } from "../user/services/user.service";
import { AuthService } from "./services/auth.service";
import { TokenService } from "../../lib/services/token.service";
import { authVerifyMiddleware } from "src/lib/middleware/authVerify.middleware";
import { userVerifyMiddleware } from "src/lib/middleware/userVerify.middleware";

@Module({
    providers: [RegisterService, RolesService,  UserService, AuthService, TokenService],
    exports: [RegisterService, RolesService,  UserService, AuthService, TokenService],
    controllers: [RegisterController, AuthController],
    imports: [
        JwtModule.register({
            secret: 'sd54Sje_#df',
            signOptions: { expiresIn: '60m' },
        } ),
    ]
})

export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {

        consumer.apply(authVerifyMiddleware)
        .exclude(
            { path: '/auth/login', method: RequestMethod.POST },
            { path:'/register', method: RequestMethod.POST},
            { path:'/post', method:RequestMethod.ALL},
            { path:'/post/search', method:RequestMethod.ALL},
        ).forRoutes("*")
       
            
        consumer.apply(userVerifyMiddleware)
            .exclude(
                { path: '/auth/login', method: RequestMethod.POST },
                { path:'/register', method: RequestMethod.POST},
                { path:'/post', method:RequestMethod.ALL},
                { path:'/post/search', method:RequestMethod.ALL},
            ).forRoutes("*");
    }
}