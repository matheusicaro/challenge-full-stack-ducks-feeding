import { Pool, QueryResult } from 'pg';
import environment from './environment';
import { Logger } from './logger';

/**
 * Using connection pooling with postgres
 *
 * More at: https://node-postgres.com/features/pooling
 */
const pool = new Pool({
  connectionString: environment.DATABASE_URL
});

const emitErrorForServiceOrNetworkError = (error: any) => {
  Logger.error('Unexpected error on idle client', error);
  process.exit(-1);
};

pool.on('error', emitErrorForServiceOrNetworkError);

export default {
  query: <T>(text: string): Promise<QueryResult<T>> => pool.query(text)
};
