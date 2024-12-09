import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
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
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    const userObjectId = new Types.ObjectId(userId);
    const userLikedIndex = product.likedBy.findIndex((id) =>
      id.equals(userObjectId),
    );

    if (userLikedIndex === -1) {
      product.likedBy.push(userObjectId);
      product.likes += 1;
    } else {
      product.likedBy.splice(userLikedIndex, 1);
      product.likes -= 1;
    }

    return product.save();
  }

  async getUserFavorites(userId: string): Promise<Product[]> {
    return this.productModel.find({ likedBy: userId }).exec();
  }
}
