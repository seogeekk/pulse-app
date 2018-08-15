import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../_services/question.service';

import { Question } from '../_models/question';
import {Observable} from 'rxjs/Observable';
import {AnswerService} from '../_services/answer.service';
import {GroupService} from '../_services/group.service';
import {UserService} from '../_services/user.service';
import {FBUser} from '../_models/fbuser';
import {Member} from '../_models/member';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public question: Question;

  public questionId;

  public answerdata = [];

  public totalresponded: number = 0;
  public totalmembers: number = 0;
  public avgresponse: number = 0;
  public notresponded: number = 0;

  public groupMembers: Member[] = [];
  public submitter: FBUser = new FBUser();

  public chartData = [];
  public chartLabel = [];

  public barChartOptions: any = {
      scaleShowVerticalLines: false,
      responsive: true
  };



  constructor(private questionservice: QuestionService,
              private answerservice: AnswerService,
              private groupservice: GroupService,
              private userservice: UserService,
              private route: ActivatedRoute) { }

  async ngOnInit() {

      await this.route.params.subscribe( params => {
          const questionId: string = params['questionId'];

          this.questionId = questionId;


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

      await this.getQuestionDetail(this.questionId);

      // get members
      await this.getMembers(this.question.groupId)
          .then(
              data => {
                  this.groupMembers = <Member[]> data;
              }
          );

      console.log(this.groupMembers);
      await this.getAnswers(this.questionId)
          .then(
              data => {
                  let answers = [];
                  for (const answer of data ) {
                      answers.push({
                          userId: answer.userId,
                          name: this.getMemberName(answer.userId),
                          createdAt: answer.createdAt,
                          answer: answer.answer,
                          comment: answer.comment
                      });
                  }
                  this.answerdata = answers;
              }
          );

  }

  getMemberName(id: string) {
      let name = '';

      if (this.groupMembers) {
          const result = this.groupMembers.filter(member => member.id === id);
          if (result) {
              name = result[0].name;
          }
      }

      return name;
  }

  getMembers(id: string) {
    return this.groupservice.findMembers(id)
        .map((data: Member[]) => data).toPromise();
  }

  getAnswers(id: string) {
    return this.answerservice.getAnswers(id)
        .map(data => data).toPromise();
  }


  getQuestion(id: string) {
      return this.questionservice.getQuestion(id)
          .map(data => data).toPromise();
  }

  getAnswerCount(id: string) {
      return this.answerservice.getCount(id)
          .map(data => data).toPromise();
  }

  async getQuestionDetail(questionId: string) {

      const question: Question = <Question> await this.getQuestion(questionId);

      const answers = <any> await this.getAnswerCount(question._id);
      const groupmembers = <any> await this.getMembers(question.groupId);

      const answerdata: Map<string, number> = new Map<string, number>();

      for (const answer of answers) {
          answerdata.set(answer._id, answer.count);
      }

      // get chart label
      this.chartLabel = question.options;

      for (const option of this.chartLabel) {
          const dat = answerdata.get(option);
          if (! dat) {
              this.chartData.push(0);
          } else {
              this.chartData.push(dat);
          }
      }

      // count all responded
      if (answers) {
          for (const answer of answers) {
              this.totalresponded += answer.count;
          }
      }

      // get all member count
      if (groupmembers) {
          this.totalmembers = groupmembers.length;
      }

      this.notresponded = this.totalmembers - this.totalresponded;

      question.answers = this.chartData;


      if (this.notresponded > 0) {
          this.chartLabel.push('Not Responded');
          question.answers.push(this.notresponded);
      }
      this.question = question;

      // get avg response time
      const avg = <any> await this.getResponseTime(question._id);

      this.avgresponse = avg.ave/8640000;

  }

  getResponseTime(id: string) {
      return this.answerservice.getAvgTime(id)
          .map(data => data).toPromise();
  }

  // events
  public chartClicked(e:any):void {
      console.log(e);
  }

  public chartHovered(e:any):void {
      console.log(e);
  }

}
