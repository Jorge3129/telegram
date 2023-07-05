import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadsController } from './uploads.controller';
import { StreamingService } from './streaming/streaming.service';
import { diskStorage } from 'multer';
import { UPLOAD_PATH } from './upload-path.const';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: UPLOAD_PATH,
        filename: (req, file, callback) => {
          callback(null, `${file.originalname}`);
        },
      }),
    }),
  ],
  controllers: [UploadsController],
  providers: [StreamingService],
})
export class UploadsModule {}
