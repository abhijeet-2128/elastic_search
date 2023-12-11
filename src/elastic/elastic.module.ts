import { Module } from '@nestjs/common';
import { ElasticService } from './elastic.service';
import { ElasticController } from './elastic.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './entity/product.model';
import { AuthService } from 'src/auth/auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from 'src/proto/user/user';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Products', schema: ProductSchema}
    ]),
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: USER_PACKAGE_NAME,
          protoPath: join('src/proto/user/user.proto'),
    
          // protoPath:
          //   '/home/admin185/Desktop/grpc_micro/restaurant-service/src/proto/user/user.proto',
        },        
      },
    ]),
    ElasticsearchModule.register({
    node: 'http://localhost:9200',
  }),
],
  controllers: [ElasticController],
  providers: [ElasticService,AuthService],
})
export class ElasticModule {}
