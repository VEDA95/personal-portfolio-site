import type { Blocks } from './block';
import type { Image } from './image';

export interface Project {
    id: string;
    date_created: string;
    date_updated: string | null;
    name: string;
    panelimg: Image;
    content: Blocks;
    shortdescription: string;
    page_id: string;
}

export type Projects = Array<Project>;