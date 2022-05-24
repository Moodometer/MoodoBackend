import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MoodService } from './mood.service';
import { CreateMoodDto } from './dto/create-mood.dto';
import { UpdateMoodDto } from './dto/update-mood.dto';
import { ApiQuery } from '@nestjs/swagger';
import { DeleteMoodDto } from './dto/delete-mood.dto';

@Controller('mood')
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  @Post()
  create(@Body() createMoodDto: CreateMoodDto) {
    return this.moodService.create(createMoodDto);
  }

  @Get()
  @ApiQuery({ name: 'numbers' })
  findContactList(@Query('numbers') cellPhoneNumbers) {
    return this.moodService.findContactList(cellPhoneNumbers);
  }

  @Patch(':cellPhoneNumber')
  update(
    @Param('cellPhoneNumber') cellPhoneNumber: string,
    @Body() updateMoodDto: UpdateMoodDto,
  ) {
    return this.moodService.update(cellPhoneNumber, updateMoodDto);
  }

  @Delete(':cellPhoneNumber')
  remove(
    @Param('cellPhoneNumber') cellPhoneNumber: string,
    @Body() deleteMoodDto: DeleteMoodDto,
  ) {
    return this.moodService.remove(cellPhoneNumber, deleteMoodDto);
  }
}
