
export interface ListItem {
    content: string;
    items?: Array<ListItem>;
}

export interface Block {
    id: string;
    type: 'header' | 'quote' | 'nestedlist' | 'code' | 'image' | 'paragraph';
    data: {
        text?: string;
        level?: number;
        alignment?: string;
        style?: string;
        items?: Array<ListItem>;
        code?: string;
        file?: {
            width: number;
            height: number;
            size: string;
            name: string;
            title: string;
            extension: string;
            fileId: string;
            fileUrl: string;
            url: string;
        };
        caption?: string;
        withBorder?: boolean;
        stretched?: boolean;
        withBackground?: boolean;
    };
    tunes?: {
        alignment?: {
            alignment: string;
        };
    };
}

export interface Blocks {
    time: number;
    blocks: Array<Block>;
    version: string;
}