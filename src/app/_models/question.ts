import { Answer } from './answer';

export class Question {
    _id: string;
    question: string;
    options: string[];
    answers: any[];
    schedule: [{ time: Date}];
    groupId: string;
    location: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
