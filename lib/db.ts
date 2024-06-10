import mysql from 'mysql2/promise';
import { Connector, IpAddressTypes } from '@google-cloud/cloud-sql-connector';
import dotenv from 'dotenv';

dotenv.config();

const connector = new Connector();

const instanceConnectionName = process.env.DB_INSTANCE_CONNECTION_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbName = process.env.DB_NAME as string;

if (!instanceConnectionName || !dbUser || !dbPassword || !dbName) {
  throw new Error('Missing one or more required environment variables: DB_INSTANCE_CONNECTION_NAME, DB_USER, DB_PASSWORD, DB_NAME');
}

async function createPool() {
  const clientOpts = await connector.getOptions({
    instanceConnectionName,
    ipType: IpAddressTypes.PUBLIC,
  });

  const pool = mysql.createPool({
    ...clientOpts,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return pool;
}

export default createPool;
