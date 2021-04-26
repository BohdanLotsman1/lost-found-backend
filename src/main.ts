import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as path from "path";
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>( AppModule, { cors: true } );

    app.useStaticAssets(path.join(__dirname, '../static'));

    await app.listen(process.env.PORT || 3000);
}

bootstrap();
