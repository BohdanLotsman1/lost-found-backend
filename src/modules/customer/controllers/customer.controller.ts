import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import  * as Knex from "knex";
import { AccessLevel } from 'src/lib/decorator/app-access.decorator';
import { AccessLevelList } from 'src/lib/enums/accessLevel.list';
import { CustomerService } from "../services/customer.service";

let knex: Knex;

@Controller('customer')
@AccessLevel(AccessLevelList.LEVEL_CUSTOMER)
export class CustomerController {
    constructor(
        private customerService: CustomerService,

    ) {}

    @Get('/myMessage/:id')
    @AccessLevel(AccessLevelList.LEVEL_CUSTOMER)
    async myMessage(@Param('id') id:string){ 
        return knex.table('message').select().where('reciver_id',id)
    }

    @Get('/toMeMessage/:id')
    @AccessLevel(AccessLevelList.LEVEL_CUSTOMER)
    async toMeMessage(@Param('id') id:string){ 
        return knex.table('message').select().where('sender_id',id)
    }

    @Get('/myMessage/:id')
    @AccessLevel(AccessLevelList.LEVEL_CUSTOMER)
    async all(@Param('id') id:string){ 
        return knex.table('message').select().where('reciver_id',id)
    }

}