/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_DIRECTUS_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
