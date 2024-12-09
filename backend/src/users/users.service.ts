import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly CartService: CartService,
  ) {}

  // Crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = createUserDto.password
      ? await bcrypt.hash(createUserDto.password, 10)
      : undefined;

    const newUserData = {
      ...createUserDto,
      ...(hashedPassword && { password: hashedPassword }), // Solo agrega password si está definido
    };

    const newUser = new this.userModel(newUserData);
    console.log(newUser);
    const savedUser = await newUser.save();
    // Crear un carrito asociado al nuevo usuario
    await this.CartService.create({
      userId: savedUser._id.toString(),
      products: [],
    });
    // Asegúrate de pasar el usuario al DTO del carrito

    return savedUser;
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  // Obtener un usuario por ID
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  // Actualizar un usuario
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return updatedUser;
  }

  // Eliminar un usuario
  async remove(id: string): Promise<void> {
    const cart = await this.CartService.findByUserId(id);

    if (cart) {
      await this.CartService.remove(cart._id.toString());
    }
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
  }
}
