const StorageService = {
  save: <T>(key: string, data: T) => {
    localStorage.setItem(key, typeof data === 'string' ? data : JSON.stringify(data));
  },

  get: <T>(key: string) => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data) as T | null;
  },

  delete: (key: string) => {
    localStorage.removeItem(key);
  },
};

export default StorageService;
