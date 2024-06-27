import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddressUpdateService } from './address_update.service';
import { UnsupportedMediaTypeException } from '@nestjs/common';

@Controller('address-updates')
export class AddressUpdateController {
  constructor(private readonly addressUpdateService: AddressUpdateService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAddressUpdate(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    try {
      if (!file) {
        throw new BadRequestException('File must be provided');
      }
      const user_id = req.user?.id; // Assuming the user object is attached to the request by some middleware
      if (!user_id) {
        throw new BadRequestException('User ID must be provided');
      }
      const addressUpdate = await this.addressUpdateService.attachAddressUpdateFile(user_id, file.buffer, file.originalname);
      return {
        message: 'File uploaded successfully',
        addressUpdateId: addressUpdate.id,
      };
    } catch (error) {
      if (error instanceof UnsupportedMediaTypeException) {
        throw new BadRequestException('Unsupported file type. Only .csv files are allowed');
      }
      throw error;
    }
  }
}