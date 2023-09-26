
export interface Skill {
    id: string;
    date_created: string;
    date_updated: string | null;
    name: string;
    icon: string | null;
    category: string;
    longdescription: string;
    shortdescription: string;
    page_id: string;
}

export default type Skills = Array<Skill>;