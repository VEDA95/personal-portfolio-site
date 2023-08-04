import client from './directus';
import { readSingleton, readItems } from '@directus/sdk';

export async function fetchSkillPageData(): Promise<any> {
    return await client.request(readSingleton('skillpage', {
        fields: ['*']
    }));
}

export async function fetchSkills(): Promise<any> {
    return await client.request(readItems('skills', {
        fields: ['*']
    }));
}