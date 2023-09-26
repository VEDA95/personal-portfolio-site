import client from './directus';
import { readSingleton, readItems } from '@directus/sdk';
import type { LandingPage } from './types/landing';

export default async function fetchLandingPageData(): Promise<LandingPage> {
    return await client.request(readSingleton('landingpage', {
        fields: ['*', 'skills.*', 'projects.*']
    }));
}