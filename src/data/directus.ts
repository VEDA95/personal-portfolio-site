import { createDirectus, rest } from '@directus/sdk';

const client = createDirectus(import.meta.env.PUBLIC_DIRECTUS_URL).with(rest());

export default client;