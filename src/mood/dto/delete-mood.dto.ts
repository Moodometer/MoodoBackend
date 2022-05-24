import { ApiProperty } from '@nestjs/swagger';

export class DeleteMoodDto {
  @ApiProperty({ required: true })
  deviceID: string;
}
