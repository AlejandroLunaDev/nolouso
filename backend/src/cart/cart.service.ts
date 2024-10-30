import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, CartDocument } from './schema/cart.schema';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    @InjectModel(User.name) private readonly userModel: Model<User>, // Inyecta el modelo de usuario
  ) {}

  // Crear un nuevo carrito asociado a un usuario
  async create(createCartDto: CreateCartDto): Promise<Cart> {
    // Verificar si el usuario existe
    const userExists = await this.userModel
      .findById(createCartDto.userId)
      .exec();
    if (!userExists) {
      throw new NotFoundException(
        `Usuario con ID ${createCartDto.userId} no encontrado`,
      );
    }

    // Crear el nuevo carrito
    const newCart = new this.cartModel({
      userId: createCartDto.userId, // Asocia el carrito al usuario
      products: createCartDto.products.map(
        (productId) => new Types.ObjectId(productId),
      ), // Convertir los IDs a ObjectId
    });

    return await newCart.save(); // Guardar y retornar el carrito creado
  }

  // Obtener todos los carritos
  async findAll(): Promise<Cart[]> {
    return await this.cartModel.find().populate('products').exec(); // Llenar los productos
  }

  // Obtener un carrito por ID
  async findOne(id: string): Promise<CartDocument> {
    const cart = await this.cartModel.findById(id).populate('products').exec();
    if (!cart) {
      throw new NotFoundException(`Carrito con ID ${id} no encontrado`);
    }
    return cart; // Retornar el carrito encontrado
  }

  async findByUserId(userId: string): Promise<CartDocument> {
    const cart = await this.cartModel
      .findOne({ userId: userId })
      .populate('products')
      .exec();
    if (!cart) {
      throw new NotFoundException(`Carrito con ID ${userId} no encontrado`);
    }
    return cart;
  }
  // Actualizar un carrito
  async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    const updatedCart = await this.cartModel
      .findByIdAndUpdate(id, updateCartDto, { new: true })
      .populate('products')
      .exec();
    if (!updatedCart) {
      throw new NotFoundException(`Carrito con ID ${id} no encontrado`);
    }
    return updatedCart; // Retornar el carrito actualizado
  }

  // Eliminar un carrito
  async remove(id: string): Promise<void> {
    const result = await this.cartModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Carrito con ID ${id} no encontrado`);
    }
  }
}
