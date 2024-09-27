import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop()
  last_name: string;

  @Prop({ required: true })
  age: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'carts' })
  cartId: Types.ObjectId;

  @Prop({ enum: ['admin', 'user', 'premium'], default: 'user' })
  role: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop([
    {
      reference: {
        dniFront: { type: String, required: false },
        dniBack: { type: String, required: false },
      },
      fullName: { type: String, required: false },
      dni: { type: String, required: false, unique: true },
      birthDate: { type: Date, required: false },
      phone: { type: String, required: false },
      address: { type: String, required: false },
      postalCode: { type: String, required: false },
      neighborhood: { type: String, required: false },
      city: { type: String, required: false },
      province: { type: String, required: false },
      bankCard: {
        cardNumber: { type: String, required: false },
        cardHolderName: { type: String, required: false },
        expirationDate: { type: Date, required: false },
        cvv: { type: String, required: false },
      },
    },
  ])
  documents: Record<string, any>[];

  @Prop({ default: Date.now })
  last_connection: Date;

  @Prop({ default: false })
  isPremium: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
