export class Question {
    _id: string;
    question: string;
    options: [{ option: string }];
    schedule: [{ time: Date}];
    createdAt: Date;
    updatedAt: Date;
}
