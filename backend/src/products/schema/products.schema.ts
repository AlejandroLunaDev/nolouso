import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type ProductDocument = Product & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Product {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: [String] })
  thumbnails: string[];

  @Prop({ type: Boolean, default: false })
  isPromoted: boolean;

  @Prop({ type: String, required: true, unique: true })
  code: string;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Boolean, default: true })
  status: boolean;

  @Prop({ type: String, ref: 'users', default: 'admin' })
  owner: string;

  @Prop({ type: Number, default: 0 })
  likes: number;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  likedBy: mongoose.Types.ObjectId[];
}

const ProductSchema = SchemaFactory.createForClass(Product);

// Agrega el plugin de paginación
ProductSchema.plugin(mongoosePaginate);

export { ProductSchema };
