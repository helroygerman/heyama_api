import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateObjectDto {
  @ApiProperty({ example: 'Mon objet', description: 'Titre de l’objet' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Une petite description',
    description: 'Description de l’objet',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
