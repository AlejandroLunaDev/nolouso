import { IsArray, IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({
    description: 'ID del usuario al que pertenece el carrito',
    type: String,
    example: '60d21b4667d0d8992e610c85', // Ejemplo de un ID de MongoDB
  })
  @IsMongoId()
  @IsNotEmpty()
  userId: string; // ID del usuario al que pertenece el carrito

  @ApiProperty({
    description: 'Array de IDs de productos en el carrito',
    type: [String],
    example: ['60d21b4667d0d8992e610c85', '60d21b4667d0d8992e610c86'], // Ejemplos de IDs de productos
  })
  @IsArray()
  @IsNotEmpty({ each: true }) // Asegura que no haya elementos vacíos
  products: string[]; // Array de IDs de productos
}
