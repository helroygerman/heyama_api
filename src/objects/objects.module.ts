import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectsService } from './objects.service';
import { ObjectsController } from './objects.controller';
import { ObjectEntity, ObjectSchema } from './schemas/object.schema';
import { FilesService } from '../files/files.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ObjectEntity.name, schema: ObjectSchema },
    ]),
  ],
  controllers: [ObjectsController],
  providers: [ObjectsService, FilesService],
})
export class ObjectsModule {}
