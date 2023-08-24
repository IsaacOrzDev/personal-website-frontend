export default class TimeService {
  public static timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
