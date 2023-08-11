/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_DIRECTUS_URL: string;
    readonly AKISMET_BLOG_URL: string;
    readonly AKISMET_API_KEY: string;
    readonly GMAIL_USER_NAME: string;
    readonly GMAIL_APP_PASSWORD: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
