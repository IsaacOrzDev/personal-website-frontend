export default class RandomService {
  public static getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
