import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    Param,
    Patch,
    Put,
    Res,
    Req,
    Scope, Inject,
} from '@nestjs/common';
import _ from 'underscore';
import { Response, Request } from 'express';
import {Model} from "objection";

@Controller()
export class AppController {

    @Get()
    async root(
        @Req() req: Request
    ) {
        return 'Current date: ' + new Date();
    }

}
