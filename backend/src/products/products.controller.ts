import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('favorites')
  async getFavorites() {
    return this.productsService.getFavorites();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-favorites')
  async getUserFavorites(@Req() req: any) {
    const userId = req.user.id;
    if (!userId) {
      throw new UnauthorizedException('Usuario no autenticado');
    }
    return this.productsService.getUserFavorites(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorite/:id')
  async toggleFavorite(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    if (!userId) {
      throw new UnauthorizedException('Usuario no autenticado');
    }
    return this.productsService.toggleFavorite(id, userId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The product has been created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all products.' })
  async findAll(@Req() req: any) {
    const page = parseInt(req.query.page) || 1; // Página por defecto: 1
    const limit = parseInt(req.query.limit) || 10; // Límite por defecto: 10
    return this.productsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return a single product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The product has been updated.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'The product has been deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
