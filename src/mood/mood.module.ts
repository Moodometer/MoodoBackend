import { Module } from '@nestjs/common';
import { MoodService } from './mood.service';
import { MoodController } from './mood.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mood, MoodSchema } from 'src/mood/schema/mood.schema';
import { AppModule } from 'src/app.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mood.name, collection: 'moods', schema: MoodSchema },
    ]),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [MoodController],
  providers: [MoodService],
})
export class MoodModule {}
