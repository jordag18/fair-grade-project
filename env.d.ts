declare namespace NodeJS {
    interface ProcessEnv {
      DB_INSTANCE_CONNECTION: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
    }
  }
  