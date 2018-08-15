import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Answer } from '../_models/answer';

@Injectable()
export class AnswerService {
    constructor(private http: HttpClient) { }

    getCount(id: string) {
        console.log('Calling service for question id: ' + id);
        return this.http.get<Answer[]>('/answer?count=true&questionId=' + id);
    }

    getAvgTime(id: string) {
        return this.http.get<any>('/answer?time=true&questionId=' + id);
    }

    getAnswers(id: string) {
        return this.http.get<any>('/answer?questionId=' + id);
    }

}
