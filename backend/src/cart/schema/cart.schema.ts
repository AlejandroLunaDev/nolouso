import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/products/schema/products.schema';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }) // Referencia al usuario
  userId: mongoose.Schema.Types.ObjectId; // ID del usuario al que pertenece el carrito

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[]; // Array de referencias a documentos de Product
}

export const CartSchema = SchemaFactory.createForClass(Cart);
