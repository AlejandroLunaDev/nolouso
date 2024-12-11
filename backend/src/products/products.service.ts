import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/products.schema';
import { User, UserDocument } from '../users/schema/user.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async getFavorites(): Promise<Product[]> {
    return this.productModel
      .find({ likes: { $gte: 20 } })
      .sort({ likes: -1 })
      .limit(10)
      .exec();
  }

  async toggleFavorite(productId: string, userId: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(productId);
      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }

      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const userObjectId = new Types.ObjectId(userId);
      const productObjectId = new Types.ObjectId(productId);

      const userLikedIndex = product.likedBy.findIndex((id) =>
        id.equals(userObjectId),
      );

      if (userLikedIndex === -1) {
        // Añadir a favoritos
        product.likedBy.push(userObjectId);
        product.likes += 1;

        // Actualizar favoritos del usuario
        if (!user.favorites) {
          user.favorites = [];
        }
        if (!user.favorites.some((favId) => favId.toString() === productId)) {
          user.favorites.push(productObjectId as any);
        }
        await user.save();
      } else {
        // Quitar de favoritos
        product.likedBy.splice(userLikedIndex, 1);
        product.likes -= 1;

        // Remover de favoritos del usuario
        user.favorites = user.favorites.filter(
          (favId) => favId.toString() !== productId,
        );
        await user.save();
      }

      return await product.save();
    } catch (error) {
      console.error('Error en toggleFavorite:', error);
      throw error;
    }
  }

  async getUserFavorites(userId: string): Promise<Product[]> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Obtener los productos favoritos del usuario
    const favorites = await this.productModel
      .find({
        _id: { $in: user.favorites },
      })
      .exec();

    return favorites;
  }
}
