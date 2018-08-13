import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../_services/question.service';

import { Question } from '../_models/question';
import {Observable} from 'rxjs/Observable';
import {AnswerService} from '../_services/answer.service';
import {GroupService} from '../_services/group.service';
import {UserService} from '../_services/user.service';
import {FBUser} from '../_models/fbuser';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public question: Question;

  public totalresponded: number = 0;
  public totalmembers: number = 0;
  public avgresponse: number = 0;
  public notresponded: number = 0;

  public submitter: FBUser = new FBUser();

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

  constructor(private questionservice: QuestionService,
              private answerservice: AnswerService,
              private groupservice: GroupService,
              private userservice: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe( params => {
          const questionId: string = params['questionId'];
          this.getQuestionDetails(questionId);

          this.submitter.name = 'User';
          this.submitter.imgurl = '../../assets/images/defaulticon.png';

          // get user service
          this.userservice.findFBUser(this.question.userId)
              .subscribe( data => {
                  console.log(data);
                 if (data.name) {
                   this.submitter.name = data.name;
                   this.submitter.id = data.id;
                   this.submitter.imgurl = data.picture.data.url;
                 }
              });

      });

  }

  getQuestionDetails(questionId: string) {
      let question: Question;

      Observable.forkJoin(
          this.questionservice.getQuestion(questionId)
      ).subscribe(questions => {

          question = <any>questions[0];

          const chartdata = [];

          Observable.forkJoin(
              this.answerservice.getCount(question._id),
              this.groupservice.findMembers(question.groupId)
          ).subscribe( data => {

              const answers = <any>data[0];
              const groupmembers = <any>data[1];

              const answerdata: Map<string, number> = new Map<string, number>();

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

              // count all responded
              if (question.answers) {
                  this.totalresponded = this.question.answers.reduce((a, b) => a + b, 0);
              }

              // get all member count
              if (groupmembers) {
                  this.totalmembers = data.length;
              }

              this.notresponded = this.totalmembers - this.totalresponded;

              question.answers = chartdata;


              if (this.notresponded > 0) {
                  question.options.push('Not Responded');
                  question.answers.push(this.notresponded);
              }

              console.log(question);
              this.question = question;

              // get avg response time
              // TBD
              this.answerservice.getAvgTime(question._id)
                  .subscribe(data => {
                      if (data) {
                          this.avgresponse = data.ave/8640000;
                      }
                  });

          });
      });
  }

}
