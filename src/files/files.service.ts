// src/files/files.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { Express } from 'express';

@Injectable()
export class FilesService {
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly endpointHost: string;

  constructor(private readonly config: ConfigService) {
    const endpoint = this.config.get<string>('B2_S3_ENDPOINT');
    const region = this.config.get<string>('B2_S3_REGION');
    const accessKeyId = this.config.get<string>('B2_S3_KEY_ID');
    const secretAccessKey = this.config.get<string>('B2_S3_KEY');
    const bucket = this.config.get<string>('B2_S3_BUCKET');

    if (!endpoint || !region || !accessKeyId || !secretAccessKey || !bucket) {
      throw new Error('Missing B2 S3 configuration in .env');
    }

    this.bucket = bucket;

    this.s3 = new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // ex: s3.us-west-004.backblazeb2.com
    this.endpointHost = endpoint.replace('https://', '');
  }

  /**
   * Upload d'une image dans B2 (S3-compatible) et retour de l'URL publique.
   */
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const ext = file.originalname.split('.').pop() || 'bin';
    const key = `objects/${uuid()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3.send(command);

    // URL de type: https://bucket.s3.region.backblazeb2.com/objects/uuid.ext
    return `https://${this.bucket}.${this.endpointHost}/${key}`;
  }

  /**
   * Suppression d'un objet dans B2 à partir de sa "key" (pas l'URL complète).
   */
  async deleteObject(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await this.s3.send(command);
  }
}
