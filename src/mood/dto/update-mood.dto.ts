import { ApiProperty } from '@nestjs/swagger';

export class UpdateMoodDto {
  @ApiProperty({ required: true })
  mood: number;

  @ApiProperty({ required: true })
  deviceID: string;
}
