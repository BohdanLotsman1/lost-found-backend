import { HttpException, Injectable } from '@nestjs/common';
import { IPost } from "../types";
import { PostModel } from "../models/post.model";
import * as fs from "fs";

@Injectable()
export class PostService {

    async findAll(page:any): Promise<any> {
        
        const postsCount =  await PostModel.query().select().count().as('count').first()

        let pages = Math.round(postsCount['count(*)']/10);

        if(pages<postsCount['count(*)']/10)
        pages++

        const list = await PostModel.query().select().orderBy('created_at','DESC').limit(10).offset(page*10-10);

        if(pages == 0){
            pages = 1
        }
        
        return{list,pages}
    }

    async findById(id: string): Promise<PostModel> {
        
        return PostModel.query().select().where('id', id).first();
    }

    async findByUser(id: string): Promise<PostModel[]> {
        
        return PostModel.query().select().where('user_id',id);
    }

    async searchPosts(page:number,search:string): Promise<any> {
        
        if(search == "" ){
            return await this.findAll(1)
        }
        else{
            const postsCount =  await PostModel.query().select().orderBy('created_at', 'DESC')

            const searchArray = postsCount.filter(item=>{
                if(item.header.toLowerCase().includes(search.toLowerCase())
                || item.description.toLowerCase().includes(search.toLowerCase())
                || item.place.toLowerCase().includes(search.toLowerCase())){
                    return item
                }   
            })

            let pages = Math.round(searchArray.length/10);

            if(pages<searchArray.length/10)
            pages++
   
            let coef = 1

            if(searchArray.length < page*10){
                coef = 0
            }

            const list = searchArray.slice(page*10-10,10*coef||undefined);
            return {list,pages}
        }
        
    }

    async insert(image:Express.Multer.File ,data: any): Promise<PostModel|any> {
              
        if(image !== undefined){
            data.image = image.filename;
        }

        const product = await PostModel.query().insert(data);
        
        return PostModel.query().select().where('id', product.id).first();    
    }

    async update(id:string, data: IPost,image: Express.Multer.File): Promise<PostModel> {


        if(image !== undefined){

            fs.unlink(`images/${data.image}`, (err) => {
                if (err) {
                  return
                }
            })

            data.image = image.filename;
        }

        await PostModel.query().update(data).where('id',id);
        return PostModel.query().select().where('id', id).first();
    }

    async delete(id) {
        
        return PostModel.query().delete().where('id', id);
    }
}