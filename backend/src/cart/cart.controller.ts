import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Cart } from './schema/cart.schema'; // Importa el modelo del carrito

@ApiBearerAuth()
@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    return await this.cartService.create(createCartDto);
  }

  @Get()
  async findAll(): Promise<Cart[]> {
    return await this.cartService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cart> {
    return await this.cartService.findOne(id); // Se pasa id como string
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    return await this.cartService.update(id, updateCartDto); // Se pasa id como string
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.cartService.remove(id); // Se pasa id como string
  }
}
