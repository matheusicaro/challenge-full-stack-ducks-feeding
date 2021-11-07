export const StringUtil = {
  isNullOrEmpty: (string: string | undefined): boolean => string === undefined || string === '' || string.length === 0
};

export const DateUtil = {
  convertToSeconds: (hour: number): number => hour * 60,
  getTimestampNowinSeconds: (): number => Math.floor(Date.now() / 1000)
};
