import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as path from "path";
import * as express from "express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>( AppModule, { cors: true } );

    app.useStaticAssets(path.join(__dirname, '../static'));

    app.use(express.static(path.join(__dirname, '../../images')));

    await app.listen(process.env.PORT || 3000);
}

bootstrap();
