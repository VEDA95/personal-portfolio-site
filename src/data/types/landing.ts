import type { Blocks } from './block';
import type { Skills } from './skills';
import type { Projects } from './projects';

export interface LandingPage {
    id: string;
    date_created: string;
    date_updated: string | null;
    aboutsection: Blocks;
    skills: Skills;
    projects: Projects;
}