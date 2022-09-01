import breakpoints from 'config/breakpoints';

const sequence = [
  breakpoints.xs,
  breakpoints.sm,
  breakpoints.md,
  breakpoints.lg,
  breakpoints.xl,
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _isEqualOrUp(input: string, compare: string) {
  return sequence.indexOf(input) >= sequence.indexOf(compare);
}

function _isEqualOrDown(input: string, compare: string) {
  return sequence.indexOf(input) <= sequence.indexOf(compare);
}

export default class BreakpointService {
  public static isEqualOrUp(input: string, compare: string) {
    return sequence.indexOf(input) >= sequence.indexOf(compare);
  }

  public static isEqualOrDown(input: string, compare: string) {
    return sequence.indexOf(input) <= sequence.indexOf(compare);
  }

  public static isLg(input: string) {
    return _isEqualOrDown(input, breakpoints.lg);
  }

  public static isMd(input: string) {
    return _isEqualOrDown(input, breakpoints.md);
  }

  public static isSm(input: string) {
    return _isEqualOrDown(input, breakpoints.sm);
  }

  public static isXs(input: string) {
    return _isEqualOrDown(input, breakpoints.xs);
  }
}
