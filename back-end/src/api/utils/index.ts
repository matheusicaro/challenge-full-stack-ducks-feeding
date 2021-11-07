export const StringUtil = {
  isNullOrEmpty: (string: string | undefined): boolean => string === undefined || string === '' || string.length === 0
};

export const DateUtil = {
  convertToMilliseconds: (minutes: number): number => minutes * 60000
};
