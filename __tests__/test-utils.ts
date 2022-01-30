export const getRandChar = (): string =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26));

export const getRandInt = (max = 1000): number =>
  Math.floor(Math.random() * max);
