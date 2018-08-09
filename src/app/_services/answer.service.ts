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

    // create(question: Question) {
    //     return this.http.post('/questions', question);
    // }
    //
    // update(question: Question) {
    //     return this.http.put('/questions/' + question._id, question);
    // }
    //
    // delete(id: number) {
    //     return this.http.delete('/questions/' + id);
    // }
}