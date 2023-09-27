import client from './directus';
import { readSingleton, readItems } from '@directus/sdk';
import type Page from './types/page';
import type { Skills } from './types/skills';

export async function fetchSkillPageData(): Promise<Page> {
    return await client.request(readSingleton('skillpage', {
        fields: ['*']
    }));
}

export async function fetchSkills(): Promise<Skills> {
    return await client.request(readItems('skills', {
        fields: ['*']
    }));
}