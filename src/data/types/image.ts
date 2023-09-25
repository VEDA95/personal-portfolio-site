
export interface Image {
    id: string;
    storage: string;
    filename_disk: string;
    filename_download: string;
    title: string;
    type: string;
    folder: string | null;
    uploaded_by: string;
    uploaded_on: string;
    modified_by: string | null;
    modified_on: string | null;
    charset: string | null;
    filesize: string;
    width: number;
    height: number;
    duration: string | number | null;
    embed: string | null;
    description: string | null;
    location: string | null;
    tags: Array<string> | null;
    metadata: {
        [index: string]: any;
    };
}