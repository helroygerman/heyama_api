import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectsService } from './objects.service';
import { CreateObjectDto } from './dto/create-object.dto';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';


@ApiTags('objects')
@Controller('objects')
export class ObjectsController {
  constructor(private readonly objectsService: ObjectsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Création d’un Object avec image',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Mon objet' },
        description: {
          type: 'string',
          example: 'Une petite description',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['title', 'description', 'image'],
    },
  })
  @ApiCreatedResponse({ description: 'Object créé avec succès' })
  create(
    @Body() createObjectDto: CreateObjectDto,
    @UploadedFile() file: any,
  ) {
    return this.objectsService.create(createObjectDto, file);
  }

  @Get()
  @ApiOkResponse({ description: 'Liste des Objects' })
  findAll() {
    return this.objectsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Détails d’un Object' })
  @ApiNotFoundResponse({ description: 'Object introuvable' })
  findOne(@Param('id') id: string) {
    return this.objectsService.findOne(id);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Object supprimé' })
  @ApiNotFoundResponse({ description: 'Object introuvable' })
  remove(@Param('id') id: string) {
    return this.objectsService.remove(id);
  }
}
