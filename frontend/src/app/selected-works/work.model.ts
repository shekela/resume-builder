export interface Work{
    id?: number; 
    name: string;
    year: number;
    role: string;
    location: string;
    type: string;
    imageUrl: string;
    gallery: string[];
    description: string;
    slug?: string;
}