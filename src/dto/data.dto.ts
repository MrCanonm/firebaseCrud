import { ApiProperty } from '@nestjs/swagger';

export class DataDto {
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  edad: number;
}
