import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { IPost } from "../types";
import { PostService } from "../services/post.service";
import { AccessLevel } from 'src/lib/decorator/app-access.decorator';
import { AccessLevelList } from 'src/lib/enums/accessLevel.list';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
    constructor(protected productService: PostService) {}

    @Get('/')
    async all(@Query('page') page:any){ 
        const postData = await this.productService.findAll(page);
        return {postData};
    }

    @Get('/user/:id')
    @AccessLevel(AccessLevelList.LEVEL_CUSTOMER)
    async byUser(@Param('id') id:string){ 
        const list = await this.productService.findByUser(id);
        return { list };
    }

    @Post('/')
    @AccessLevel(AccessLevelList.LEVEL_CUSTOMER)
    @UseInterceptors(FileInterceptor('image',{ dest: "./images" }))
    async add(@UploadedFile() image: Express.Multer.File, @Body() data: any) {
        
        const dataobj = JSON.parse(data.payload)
        const list = await this.productService.insert(image,dataobj);
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