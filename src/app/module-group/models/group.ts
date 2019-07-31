export class Group {
    id: number;
    name: string;
    date: Date;
    languageId: number;
    languageName: string;
    description: string;

    constructor();
    constructor(id: number, name: string, date: Date, languageId: number, languageName: string, description: string); 
    constructor(id?: number, name?: string, date?: Date, languageId?: number, languageName?: string, description?: string) {    
        this.id = id || 0;
        this.name = name || "";
        this.date = date || new Date();
        this.languageId = languageId || 1;
        this.languageName = languageName || "";
        this.description = description || "";
    } 
}