export default class TextService {
  public static getNumberText(num: number) {
    const str = `${num}`;
    if (str.length === 1) {
      return `0${str}`;
    } else {
      return str;
    }
  }
}
