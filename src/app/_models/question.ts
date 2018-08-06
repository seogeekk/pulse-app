export class Question {
    _id: string;
    question: string;
    options: string[];
    schedule: [{ time: Date}];
    groupId: string;
    location: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
