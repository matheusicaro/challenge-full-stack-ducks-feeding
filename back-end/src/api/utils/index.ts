export const StringUtil = {
  isNullOrEmpty: (string: string | undefined): boolean => string === undefined || string === '' || string.length === 0
};
