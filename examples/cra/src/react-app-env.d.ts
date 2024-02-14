/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    // provide type safety for environment variable
    REACT_APP_SAMPLE_ENV: string;
  }
}
