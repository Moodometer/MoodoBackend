import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MoodDocument = Mood & Document;

@Schema()
export class Mood {
  @Prop()
  mood: number;

  @Prop()
  cellPhoneNumber: string;

  @Prop()
  deviceID: string;
}

export const MoodSchema = SchemaFactory.createForClass(Mood);
