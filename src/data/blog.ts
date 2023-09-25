import client from './directus';
import { readItem, readItems } from '@directus/sdk';
import type { Posts, Post } from './types/blog';

const blogFields: Array<string> = ['*', 'postimg.*'];

export async function fetchBlogPosts(): Promise<Posts> {
    return await client.request(readItems('posts', {
        fields: blogFields,
        filter: {
            status: {
                _eq: 'published'
            }
        }
    }));
}

export async function fetchBlogPost(id: string): Promise<Post> {
    return await client.request(readItem('posts', id, {
        fields: blogFields,
        filter: {
            status: {
                _eq: 'published'
            }
        }
    }));
}

export async function fetchBlogPostsByCategory(category: string): Promise<Posts> {
    return await client.request(readItems('posts', {
        fields: blogFields,
        filter: {
            status: {
                _eq: 'published'
            },
            category: {
                _eq: category
            }
        }
    }));
}