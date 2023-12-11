import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Products & Document;

@Schema()
export class Products {
  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: [String] })
  categories: string[];

  @Prop({ required: true })
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Products);
