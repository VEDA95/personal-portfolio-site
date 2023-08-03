import client from './directus';
import { readSingleton } from '@directus/sdk';

export default async function fetchAboutPageData(): Promise<any> {
    return await client.request(readSingleton('about', {
        fields: ['*']
    }));
}