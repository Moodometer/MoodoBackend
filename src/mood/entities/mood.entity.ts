export class MoodEntity {
  cellPhoneNumber: string;
  mood: number;

  constructor(cellPhoneNumber: string = '', mood: number = 0) {
    this.cellPhoneNumber = cellPhoneNumber;
    this.mood = mood;
  }
}
