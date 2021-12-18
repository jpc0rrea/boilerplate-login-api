import uploadConfig from '@config/upload';
import { container } from 'tsyringe';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import GoogleCloudStorageProvider from './implementations/GoogleCloudStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';
import IStorageProvider from './models/IStorageProvider';

const providers = {
  s3: S3StorageProvider,
  disk: DiskStorageProvider,
  googleCloudStorage: GoogleCloudStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
