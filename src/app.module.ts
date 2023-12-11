import { Module } from '@nestjs/common';
import { ElasticModule } from './elastic/elastic.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/elastic_search'),
    ElasticModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
