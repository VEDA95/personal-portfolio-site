import client from './directus';
import { readSingleton, readItems, readItem } from '@directus/sdk';
import type { Page } from './types/page';
import type { Projects, Project } from './types/projects';

export async function fetchProjectPageData(): Promise<Page> {
    return await client.request(readSingleton('projectpage', {
        fields: ['*']
    }));
}

export async function fetchProjects(): Promise<Projects> {
    return await client.request(readItems('projects', {
        fields: ['*']
    }));
}

export async function fetchProject(id: string): Promise<Project> {
    return await client.request(readItem('projects', id, {
        fields: ['*', 'panelimg.*']
    }));
}