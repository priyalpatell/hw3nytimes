// Template for data to pass into ArtComp.svelte
export interface Article {
    id: string;
    section: string;
    headline: string;
    snippet: string;
    image?: string;
    caption?: string;
}

export interface Comments {
    id: String; 
    replies: { 
        user: String; 
        body: String; 
        display: boolean 
    }[]; 
    count: number;
}