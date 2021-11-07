import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import environment from './environment';
import { Logger } from './logger';

/**
 * Function responsible for validating whether JWT token is expired based on generation time
 *
 * @param  {string} token
 * @returns {boolean}
 */
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt.verify(token, environment.JWT_TOKEN_SECRET) as jwt.JwtPayload;

    return !decoded || !decoded.exp || Date.now() > decoded.exp;
  } catch (err) {
    Logger.error(err);
    return true;
  }
};

/**
 * Function responsible for returning encrypted text with a round of 8 times
 *
 * @param  {string} text
 * @returns {Promise<string>}
 */
const encrypt = async (text: string): Promise<string> => bcrypt.hash(text, 8);

/**
 * Function responsible for validating a text hash is equal to the entered hash
 *
 * @param  {string} text
 * @param  {string} hash
 *
 * @returns {boolean}
 */
const isSameHash = async (text: string, hash: string): Promise<boolean> => bcrypt.compare(text, hash);

const Security = {
  encrypt,
  isSameHash,
  isTokenExpired
};

export default Security;
