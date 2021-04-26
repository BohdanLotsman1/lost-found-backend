import {Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ObjectionModule, Model } from 'nestjs-objection';
import databaseConfig from './config/database.config';
import { AppController } from "./app.controller";
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ScheduleModule } from "@nestjs/schedule";
import { AuthModule } from "./modules/auth/auth.module";
import {CustomerModule}  from "./modules/customer/customer.module"
import {AdminModule} from "./modules/admin/admin.module"
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ObjectionModule.forRoot({
            Model,
            config: databaseConfig,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, '../static'),
        }),
        ScheduleModule.forRoot(),
        AuthModule,
        CustomerModule,
        AdminModule,
        UserModule,
        PostModule
    ],
    controllers: [AppController],
   
})
export class AppModule {}
