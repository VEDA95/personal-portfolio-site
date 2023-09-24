import client from './directus';
import { readItem, readItems } from '@directus/sdk';

const blogFields: Array<string> = ['*', 'postimg.*'];

export async function fetchBlogPosts(): Promise<any> {
    return await client.request(readItems('posts', {fields: blogFields}));
}

export async function fetchBlogPost(id: string): Promise<any> {
    return await client.request(readItem('posts', id, {fields: blogFields}));
}

export async function fetchBlogPostsByCategory(category: string): Promise<any> {
    return await client.request(readItems('posts', {
        fields: blogFields,
        filter: {
            category: {
                _eq: category
            }
        }
    }));
}