import { ApiProperty } from '@nestjs/swagger';

export class CreateMoodDto {
  @ApiProperty({ required: false })
  mood: number;

  @ApiProperty({ required: true })
  cellPhoneNumber: string;

  @ApiProperty({ required: true })
  deviceID: string;
}
