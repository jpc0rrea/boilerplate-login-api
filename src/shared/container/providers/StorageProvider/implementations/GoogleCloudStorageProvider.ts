import uploadConfig from '@config/upload';
import { Storage } from '@google-cloud/storage';
import mime from 'mime';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '../models/IStorageProvider';

class GoogleCloudStorageProvider implements IStorageProvider {
  private client: Storage;

  constructor() {
    this.client = new Storage({
      keyFilename: path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        '..',
        '..',
        'layback-cloud-storage-credentials.json',
      ),
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new AppError('File not found');
    }

    await this.client
      .bucket(uploadConfig.config.googleCloudStorage.bucket)
      .upload(originalPath, {
        destination: file,
      });

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    if (file !== 'no-img.png') {
      await this.client
        .bucket(uploadConfig.config.googleCloudStorage.bucket)
        .file(file)
        .delete();
    }
  }
}

export default GoogleCloudStorageProvider;
