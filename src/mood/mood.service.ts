import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mood, MoodDocument } from 'src/mood/schema/mood.schema';
import { CreateMoodDto } from './dto/create-mood.dto';
import { UpdateMoodDto } from './dto/update-mood.dto';
import { createHash } from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import { MoodEntity } from './entities/mood.entity';
import { DeleteMoodDto } from './dto/delete-mood.dto';

@Injectable()
export class MoodService {
  /**
   * The constructor function is used to inject the Mood model into the MoodService class
   * @param mooodModel - This is the model that we will use to perform CRUD operations on the database.
   * @param {ConfigService} configService - This is the service that we use for accessing the config.
   */
  constructor(
    @InjectModel(Mood.name) private mooodModel: Model<MoodDocument>,
    private configService: ConfigService,
  ) {}

  /**
   * It creates a new mood entry in the database
   * @param {CreateMoodDto} createMoodDto - CreateMoodDto - This is the DTO that we created earlier from the request body.
   * @returns A MoodEntity object.
   */
  async create(createMoodDto: CreateMoodDto): Promise<MoodEntity> {
    try {
      createMoodDto.cellPhoneNumber = createHash('sha256')
        .update(createMoodDto.cellPhoneNumber)
        .digest('hex');

      var model = await this.mooodModel.create(createMoodDto);

      return new MoodEntity(createMoodDto.cellPhoneNumber, model.mood);
    } catch (exception: any) {
      if (exception instanceof HttpException) {
        throw exception;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * It takes a string of cell phone numbers, and returns a list of MoodEntities
   * @param {string} cellPhoneNumbers - string - The cell phone numbers of the users you want to find.
   * @returns A MoodEntity[] which contains the found MoodEntities
   */
  async findContactList(cellPhoneNumbers: string): Promise<MoodEntity[]> {
    try {
      if (cellPhoneNumbers.includes(',')) {
        var numbers = cellPhoneNumbers.split(';');
        var moods = await this.mooodModel.find({
          cellPhoneNumber: { $in: numbers },
        });
        return moods.map(
          (mood) => new MoodEntity(mood.cellPhoneNumber, mood.mood),
        );
      } else {
        var user = await this.mooodModel.find({
          cellPhoneNumber: cellPhoneNumbers,
        });
        if (user == null || user.length == 0) {
          throw new NotFoundException(
            "Couldn't find any User with that specified CellPhoneNumber",
          );
        }
        return user.map(
          (mood) => new MoodEntity(mood.cellPhoneNumber, mood.mood),
        );
      }
    } catch (exception: any) {
      if (exception instanceof HttpException) {
        throw exception;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * It updates the mood of a user with the specified cellPhoneNumber and the deviceID
   * @param {string} cellPhoneNumber - The cell phone number of the user whose mood you want to update.
   * @param {UpdateMoodDto} updateMoodDto - UpdateMoodDto which contains the information needed for the update
   * @returns The updated MoodEntity object.
   */
  async update(cellPhoneNumber: string, updateMoodDto: UpdateMoodDto) {
    try {
      var mood = await this.mooodModel.findOne({
        cellPhoneNumber,
        deviceID: updateMoodDto.deviceID,
      });
      if (mood == null) {
        throw new NotFoundException(
          "Couldn't find any User with that specified CellPhoneNumber",
        );
      }
      mood.mood = updateMoodDto.mood;
      await mood.save();
      return new MoodEntity(cellPhoneNumber, mood.mood);
    } catch (exception: any) {
      if (exception instanceof HttpException) {
        throw exception;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * It removes a mood from the database.
   * @param {string} cellPhoneNumber - The cell phone number of the user.
   * @param {DeleteMoodDto} deleteMoodDto - DeleteMoodDto where the deviceID is stored in
   */
  async remove(cellPhoneNumber: string, deleteMoodDto: DeleteMoodDto) {
    try {
      var mood = await this.mooodModel.deleteOne({
        cellPhoneNumber,
        deviceID: deleteMoodDto.deviceID,
      });
      if (mood.deletedCount <= 0) {
        throw new NotFoundException(
          "Couldn't find any User with that specified CellPhoneNumber",
        );
      }
    } catch (exception: any) {
      if (exception instanceof HttpException) {
        throw exception;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
