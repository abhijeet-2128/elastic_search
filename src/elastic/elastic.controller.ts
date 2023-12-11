import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ElasticService } from './elastic.service';
import { CreateProductDTO } from './dto/product.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('products')
export class ElasticController {
  constructor(private readonly elasticService: ElasticService) { }

  //create product
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProduct(@Body() product: CreateProductDTO) {
    return this.elasticService.createProduct(product);
  }

  //get productBy ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.elasticService.getProductById(id);
  }

  //update product
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() updateBody: Record<string, any>) {
    return this.elasticService.updateProduct(id, updateBody);
  }

  //delete product
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.elasticService.deleteProduct(id);
  }

  //search product
  @UseGuards(JwtAuthGuard)
  @Get()
  async searchProduct(@Query('product') productName: string): Promise<any> {
    return this.elasticService.searchProducts(productName);
  }

}
