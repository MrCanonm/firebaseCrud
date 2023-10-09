import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Data } from './interface/data.interface';
import { DataDto } from './dto/data.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(): Promise<any> {
    return this.appService.getData();
  }

  @Post()
  async createData(@Body() data: DataDto): Promise<void> {
    const datos: Data = {
      nombre: data.nombre,
      edad: data.edad,
    };
    await this.appService.createData(datos);
  }

  @Patch(':id')
  async partialUpdateData(
    @Param('id') id: string,
    @Body() updateData: DataDto,
  ): Promise<void> {
    await this.appService.partialUpdateData(id, updateData);
  }

  @Delete(':id')
  async deleteData(@Param('id') id: string): Promise<void> {
    await this.appService.deleteData(id);
  }
  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const storagePath = 'Imagen/' + file.originalname; // Define la ruta de almacenamiento en Firebase Storage
      const publicUrl = await this.appService.uploadFile(file, storagePath);
      return { url: publicUrl };
    } catch (error) {
      return { error: 'Error al cargar el archivo en Firebase Storage' };
    }
  }
}
