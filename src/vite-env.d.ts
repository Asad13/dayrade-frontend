/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_DEV_BASE_ENDPOINT: string;
  readonly VITE_API_BASE_PATH: string;
  readonly VITE_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
