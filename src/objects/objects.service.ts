import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectEntity, ObjectDocument } from './schemas/object.schema';
import { CreateObjectDto } from './dto/create-object.dto';
import { FilesService } from '../files/files.service';
import { Express } from 'express';

@Injectable()
export class ObjectsService {
  constructor(
    @InjectModel(ObjectEntity.name)
    private readonly objectModel: Model<ObjectDocument>,
    private readonly filesService: FilesService,
  ) {}

  async create(
    createObjectDto: CreateObjectDto,
    file?: Express.Multer.File,
  ) {
    let imageUrl = '';

    if (file) {
      imageUrl = await this.filesService.uploadImage(file);
    }

    const created = new this.objectModel({
      ...createObjectDto,
      imageUrl,
    });

    return created.save();
  }

  async findAll() {
    return this.objectModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    const object = await this.objectModel.findById(id).exec();
    if (!object) {
      throw new NotFoundException(`Object with id ${id} not found`);
    }
    return object;
  }

  async remove(id: string) {
    const object = await this.objectModel.findById(id).exec();
    if (!object) {
      throw new NotFoundException(`Object with id ${id} not found`);
    }

    if (object.imageUrl) {
      const url = object.imageUrl as string;
      const parts = url.split('.backblazeb2.com/');
      if (parts.length === 2) {
        const key = parts[1];
        await this.filesService.deleteObject(key);
      }
    }

    return this.objectModel.findByIdAndDelete(id).exec();
  }
}
