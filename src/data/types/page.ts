import type { Blocks } from './block';

export interface Page {
    id: string;
    date_created: string;
    date_updated: string | null;
    heading: string;
    content: Blocks;
}