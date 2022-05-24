import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoodModule } from './mood/mood.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Mood, MoodSchema } from './mood/schema/mood.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MoodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
