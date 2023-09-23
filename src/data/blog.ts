import client from './directus';
import { readItem, readItems } from '@directus/sdk';


export async function fetchBlogPosts(): Promise<any> {
    return await client.request(readItems('posts', {
        fields: ['*']
    }));
}

export async function fetchBlogPost(id: string): Promise<any> {
    return await client.request(readItem('posts', id, {
        fields: ['*']
    }));
}

export async function fetchBlogPostsByCategory(category: string): Promise<any> {
    return await client.request(readItems('posts', {
        fields: ['*'],
        filter: {
            category: {
                _eq: category
            }
        }
    }));
}