import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Question } from '../_models/question';

@Injectable()
export class QuestionService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Question[]>('/questions');
    }

    getQuestion(id: string) {
        return this.http.get<Question>('/questions/' + id);
    }

    create(question: Question) {
        return this.http.post('/questions', question);
    }

    update(question: Question) {
        return this.http.put('/questions/' + question._id, question);
    }

    delete(id: number) {
        return this.http.delete('/questions/' + id);
    }
}