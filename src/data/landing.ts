import client from './directus';
import { readSingleton } from '@directus/sdk';

export default async function fetchLandingPageData(): Promise<any> {
    return await client.request(readSingleton('landingpage'));
}