import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart, CartSchema } from './schema/cart.schema'; // Asegúrate de importar el esquema de carrito
import { User, UserSchema } from 'src/users/schema/user.schema'; // Si necesitas acceder al esquema de usuario
import { Product, ProductSchema } from 'src/products/schema/products.schema'; // Si necesitas acceder al esquema de producto

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]), // Importa el esquema de carrito
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Opcional: solo si necesitas interacción con usuarios
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), // Opcional: solo si necesitas interacción con productos
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
