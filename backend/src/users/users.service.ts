import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { User, UserDocument } from './schema/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  // Crear un nuevo usuario
  async create(createUserDto: RegisterAuthDto): Promise<UserDocument | null> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return await createdUser.save();
  }

  // Buscar todos los usuarios
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  // Buscar usuario por ID
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Buscar usuario por email
  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  // Actualizar usuario

  // Eliminar usuario
  async remove(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Método para comparar contraseñas
  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
