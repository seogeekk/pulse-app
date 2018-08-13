import { Component, OnInit } from '@angular/core';

import { QuestionService } from '../_services/question.service';
import { AnswerService } from '../_services/answer.service';
import { Question } from '../_models/question';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-pulse-body',
  templateUrl: './pulse-body.component.html',
  styleUrls: ['./pulse-body.component.css']
})
export class PulseBodyComponent implements OnInit {

    public questions;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartType = 'horizontalBar';

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

  constructor(
        private questionservice: QuestionService,
        private answerservice: AnswerService
  ) {}

  ngOnInit() {
    this.getAllQuestions();
  }


  getAllQuestions() {
      Observable.forkJoin(
        this.questionservice.getAll()
      ).subscribe(response => {
          const questions = <any>response[0];

          const data: Question[] = [];

          for (let i = 0; i < questions.length; i++) {
              const q: Question = new Question();
              const question = questions[i];
              q._id = question._id;
              q.question = question.question;

              const chartdata = [];

              Observable.forkJoin(
                  this.answerservice.getCount(question._id)
              ).subscribe( data => {

                  const answerdata: Map<string, number> = new Map<string, number>();
                  const answers = <any>data[0];
                  for (const answer of answers) {
                      answerdata.set(answer._id, answer.count);
                  }

                  for (const option of question.options) {
                      const dat = answerdata.get(option);
                      if (! dat) {
                          chartdata.push(0);
                      } else {
                          chartdata.push(dat);
                      }
                  }
              });

              q.options = question.options;
              q.answers = chartdata;
              q.createdAt = question.createdAt;
              data.push(q);
          }

          this.questions = data;

      });
  }

}
