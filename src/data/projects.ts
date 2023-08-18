import client from './directus';
import { readSingleton, readItems, readItem } from '@directus/sdk';

export async function fetchProjectPageData(): Promise<any> {
    return await client.request(readSingleton('projectpage', {
        fields: ['*']
    }));
}

export async function fetchProjects(): Promise<any> {
    return await client.request(readItems('projects', {
        fields: ['*']
    }));
}

export async function fetchProject(id: string): Promise<any> {
    return await client.request(readItem('projects', id, {
        fields: ['*', 'panelimg.*']
    }));
}