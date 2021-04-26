import { Module } from "@nestjs/common";
import { PostService } from "./services/post.service";
import { PostController } from "./controllers/post.controller";
import { RolesService } from "../common/roles/services/roles.service";
import { TokenService } from "../../lib/services/token.service";

@Module({
    providers: [PostService,RolesService, TokenService,],
    exports: [PostService, RolesService, TokenService],
    controllers: [PostController]

})

export class PostModule {}
