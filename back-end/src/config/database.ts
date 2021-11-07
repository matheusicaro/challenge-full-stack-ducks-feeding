export default {
  query: <T>(queryAsText: string): Promise<T> =>
    new Promise<any>(resolve => {
      resolve('');
    }) /*eslint no-undef: 0*/
};
