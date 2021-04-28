import { HttpException, Injectable } from '@nestjs/common';
import { IPost } from "../types";
import { PostModel } from "../models/post.model";

@Injectable()
export class PostService {

    async findAll(page:any): Promise<any> {
        
        const postsCount:any =  await PostModel.query().select().count().as('count').first()

        let pages = Math.round(postsCount['count(*)']/10);

        if(pages<postsCount['count(*)']/10)
        pages++

        const list = await PostModel.query().select().limit(10).offset(page*10-10).orderBy('created_at','DESC');

        if(pages == 0){
            pages = 1
        }
        
        return{list,pages}
    }

    async findById(id: string): Promise<PostModel> {
        
        return PostModel.query().select().where('id', id).first();
    }

    async findByUser(id: string): Promise<PostModel[]> {
        
        return PostModel.query().select();
    }

    async insert(image:Express.Multer.File ,data: any): Promise<PostModel|any> {
              
        if(image !== undefined){
            data.image = image.filename;
        }

        const product = await PostModel.query().insert(data);
        
        return PostModel.query().select().where('id', product.id).first();    
    }

    async update(id, data: IPost): Promise<PostModel> {
        
        await PostModel.query().update(data).findById(id);
        return PostModel.query().select().where('id', id).first();
    }

    async delete(id) {
        
        return PostModel.query().delete().where('id', id);
    }
}