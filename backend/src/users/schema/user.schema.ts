import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class User {
  id?: string;
  _id?: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique: true }) // El email debe ser único
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' }) // Asigna un rol por defecto
  role: string;

  @Prop({ default: '' }) // Por defecto, el avatar está vacío
  avatar: string;

  @Prop({ default: false }) // Valor por defecto para isPremium
  isPremium: boolean;

  @Prop({ type: [String], default: [] }) // Array para documentos
  documents: string[];

  @Prop({ type: Date, default: Date.now }) // Fecha de la última conexión
  last_connection: Date;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
  favorites: MongooseSchema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
