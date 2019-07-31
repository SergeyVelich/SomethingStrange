import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    public authorizationHeaderValue: string;

    constructor() { }

    get originURI() {
        return 'http://localhost:4200';
    }

    get authApiURI() {
        return 'http://localhost:6050';
    }

    get resourceApiURI() {
        return 'http://localhost:6001/api';
    }

    get secretApiURI() {
        return 'http://localhost:5050/api';
    }
}