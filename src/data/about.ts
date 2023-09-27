import client from './directus';
import { readSingleton } from '@directus/sdk';
import type Page from './types/page';

export default async function fetchAboutPageData(): Promise<Page> {
    return await client.request(readSingleton('about', {
        fields: ['*']
    })) as Page;
}