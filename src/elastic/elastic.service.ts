import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, Query } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './entity/product.model';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ElasticService {
    constructor(
        @InjectModel(Products.name)
        private readonly productModel: Model<Products>,
        private readonly esService: ElasticsearchService) { }

    async createProduct(product: CreateProductDTO){
        try {    
            const elasticResp = await this.esService.index({
                index: 'products',
                body: product,
            });
        
            const newProduct = new this.productModel(product);
            await newProduct.save()
            return {
                msg: 'Product indexed',
                elasticResponse: elasticResp,
            };
        } catch (err) {
            console.error(err);
            throw new Error('Error');
        }
    }

    async getProductById(id: string) {
        const query = {
            index: 'products',
            id: id,
        };
        try {
            const resp = await this.esService.get(query);
            if (!resp.found) {
                throw new NotFoundException({
                    product: resp,
                });
            }
            return {
                product: resp,
            };
        } catch (err) {
            throw new InternalServerErrorException({
                msg: 'Error not found',
                err,
            });
        }
    }


    async updateProduct(id: string, updateBody: Record<string, any>) {
        const updateQuery = {
            index: 'products',
            id,
            body: {
                doc: updateBody,
            },
        };
        try {
            await this.esService.update(updateQuery);
            return { msg: 'Product updated' };
        } catch (err) {
            console.error(err);
            throw new InternalServerErrorException({
                msg: 'Error updating product',
                err,
            });
        }
    }

    async searchProducts(@Query('product') product: string) {
        try {
            let query: any = {
                index: 'products',
            };
            if (product) {
                query.q = `*${product}*`;
            }
            const resp = await this.esService.search(query);

            return {
                products: resp.hits.hits,
            };
        } catch (err) {
            console.log(err);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteProduct(id: string) {
        const deleteQuery = {
            index: 'products',
            id,
        };
        try {
            await this.esService.delete(deleteQuery);
            return { msg: 'Product deleted' };
        } catch (err) {
            console.error(err);
            throw new NotFoundException({
                msg: 'Error deleting product',
                err,
            });
        }
    }

}
