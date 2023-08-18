import client from './directus';
import { readSingleton } from '@directus/sdk';

export default async function fetchContactPageData(): Promise<any> {
    return await client.request(readSingleton('contactpage', {
        fields: ['*']
    }));
}