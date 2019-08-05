export class Post {
    id: number;
    name: string;
    date: Date;
    languageId: number;
    languageName: string;
    authorId: number;
    authorName: string;
    previewText: string;
    fullText: string;

    constructor();
    constructor(id: number, name: string, date: Date, languageId: number, languageName: string, authorId: number, authorName: string, previewText: string, fullText?: string); 
    constructor(id?: number, name?: string, date?: Date, languageId?: number, languageName?: string, authorId?: number, authorName?: string, previewText?: string, fullText?: string) {    
        this.id = id || 0;
        this.name = name || "";
        this.date = date || new Date();
        this.languageId = languageId || 1;
        this.languageName = languageName || "";
        this.authorId = authorId || 1;
        this.authorName = authorName || "";
        this.previewText = previewText || "";
        this.fullText = fullText || "";
    } 
}