import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req } from '@nestjs/common';
import { IPost } from "../types";
import { PostService } from "../services/post.service";
import { AccessLevel } from 'src/lib/decorator/app-access.decorator';
import { AccessLevelList } from 'src/lib/enums/accessLevel.list';

@Controller('post')
export class PostController {
    constructor(protected productService: PostService) {}

    @Get('/all')
    @AccessLevel(AccessLevelList.LEVEL_CUSTOMER)
    async all(@Req() request){ 
        const list = await this.productService.findAll();
        return { list };
    }

    @Get('/user/:id')
    @AccessLevel(AccessLevelList.LEVEL_CUSTOMER)
    async byUser(@Param('id') id:string){ 
        const list = await this.productService.findByUser(id);
        return { list };
    }

    @Post('/')
    @AccessLevel(AccessLevelList.LEVEL_CUSTOMER)
    async insert(@Body() data:IPost){ 
        const list = await this.productService.insert(data);
        return { list };
    }

    @Patch('/:id')
    @AccessLevel(AccessLevelList.LEVEL_CUSTOMER)
    async update(@Param('id') id:string, @Body() data:IPost){ 
        const list = await this.productService.update(id,data);
        return { list };
    }

    @Delete('/:id')
    @AccessLevel(AccessLevelList.LEVEL_CUSTOMER)
    async delete(@Param('id') id:string){ 
        const list = await this.productService.delete(id);
        return { list };
    }
}