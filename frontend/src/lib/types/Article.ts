// Template for data to pass into ArtComp.svelte
export interface Article {
    section: string;
    headline: string;
    snippet: string;
    image?: string;
    caption?: string;
}