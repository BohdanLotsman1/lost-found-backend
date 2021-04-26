import { HttpException, Injectable } from '@nestjs/common';
import { IPost } from "../types";
import { PostModel } from "../models/post.model";
import { UserModel } from 'src/modules/user/models/user.model';

@Injectable()
export class PostService {

    async findAll(): Promise<PostModel[]> {
        
        return PostModel.query().select();
    }

    async findById(id: string): Promise<PostModel> {
        
        return PostModel.query().select().where('id', id).first();
    }

    async findByUser(id: string): Promise<PostModel[]> {
        
        return PostModel.query().select();
    }

    async insert(data: IPost): Promise<PostModel|any> {
              
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