import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'T-Shirt' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'T-Shirt description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: ['https://example.com/image.jpg'] })
  @IsArray()
  @IsOptional()
  @IsString({ each: true }) // Valida que cada elemento del array sea string
  thumbnails?: string[];

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isPromoted?: boolean;

  @ApiProperty({ example: 'ABC123' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({ example: '632d9f7b0f6d0f1c7b0f6d0f' })
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  category: string; // Ref al ID de la categoría

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @ApiProperty({ example: '632d9f7b0f6d0f1c7b0f6d0f' })
  @IsString()
  @IsOptional()
  owner?: string;
}
