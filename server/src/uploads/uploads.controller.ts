import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Headers,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContentRangePipe } from './pipes/content-range.pipe';
import { StreamingService } from './streaming/streaming.service';
import * as path from 'path';
import { UPLOAD_PATH } from './upload-path.const';
import { Response } from 'express';
import { StreamResponseStats } from './streaming/stream-response.type';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly streamingService: StreamingService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      originalName: file.originalname,
    };
  }

  @Get(':filename')
  public async getFile(
    @Param('filename') fileName: string,
    @Headers('range') rawRange: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const range = new ContentRangePipe().transform(rawRange);

    const filePath = path.join(UPLOAD_PATH, fileName);

    const result = await this.streamingService.streamFile(filePath, range);

    const headers = this.createHeaders(result.fileStats);
    const status = this.getStatus(result.fileStats);

    res.status(status).set(headers);

    return new StreamableFile(result.fileStream);
  }

  private createHeaders(fileStats: StreamResponseStats): Record<string, any> {
    const headers: Record<string, any> = {
      'Content-Type': 'video/mp4',
      'Content-Length': fileStats.contentSize,
    };

    if (fileStats.byteRange) {
      headers['Accept-Ranges'] = 'bytes';
      headers['Content-Range'] = fileStats.byteRange;
    }

    return headers;
  }

  private getStatus(fileStats: StreamResponseStats): number {
    return fileStats.byteRange ? 206 : 200;
  }
}
