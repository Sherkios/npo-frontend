/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_API_PORT: string;
  // Добавьте другие переменные окружения, которые хотите типизировать
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
