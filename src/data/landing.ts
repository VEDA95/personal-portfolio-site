import client from './directus';
import { readSingleton, readItems } from '@directus/sdk';

export default async function fetchLandingPageData(): Promise<any> {
    return await client.request(readSingleton('landingpage', {
        fields: ['*', 'skills.*', 'projects.*']
    }));
}