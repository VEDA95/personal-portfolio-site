import type { Blocks } from './block';
import type { Image } from './image.ts';


export interface Post {
    id: string;
    status: string;
    date_created: string;
    date_updated: string |  null;
    title: string;
    category: string;
    postimg: Image | null;
    content: Blocks | null;
}

export type Posts = Array<Post>;