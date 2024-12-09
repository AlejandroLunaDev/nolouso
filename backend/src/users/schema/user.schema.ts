import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
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
}

export const UserSchema = SchemaFactory.createForClass(User);
