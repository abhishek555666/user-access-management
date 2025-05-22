/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMeta {
  readonly env: {
    VITE_API_URL: string;
    // Add other env variables here
  };
}