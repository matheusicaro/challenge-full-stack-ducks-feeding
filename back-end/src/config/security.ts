import bcrypt from 'bcrypt';

const Security = {
  encrypt: async (text: string): Promise<string> => bcrypt.hash(text, 8),
  isSameHash: async (text: string, hash: string): Promise<boolean> => bcrypt.compare(text, hash)
};

export default Security;
