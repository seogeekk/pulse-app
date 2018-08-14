import { Component, OnInit } from '@angular/core';

import {FormGroup, FormArray, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Question} from '../_models/question';
import {Group} from '../_models/group';
import {QuestionService} from '../_services/question.service';
import {GroupService} from '../_services/group.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AlertService} from '../_services/alert.service';
import {isSuccess} from '@angular/http/src/http_utils';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {
  model: any = {};
  askForm: FormGroup;

  public question: Question = new Question();
  loading = false;
  groups = [];

  alertmessage;

  private userId;
  private _id;

  groupSearch: FormControl = new FormControl();

  groupResult: Group[];

    date: Date = new Date();
    settings = {
        bigBanner: false,
        timePicker: true,
        format: 'dd-MM-yyyy',
        defaultOpen: false
    }

  constructor(
      private _fb: FormBuilder,
      private questionservice: QuestionService,
      private groupservice: GroupService,
      private alertservice: AlertService,
      private router: Router,
      private route: ActivatedRoute
  ) {

  }

  async ngOnInit(): void {

      await this.route.params.subscribe((urlParams) => {
          this._id = urlParams['questionId'];
          console.log('param: ' + this._id);
      });

      if (this._id) {
          console.log('Query question');
          this.question = <Question> await this.getQuestionDetail(this._id);
          console.log(this.question);
      }

      this.userId = localStorage.getItem('userId');
      this.askForm = this._fb.group({
          title: new FormControl(this.question.question, Validators.required),
          groupId: new FormControl(this.question.groupId, Validators.required),
          schedule: new FormControl(this.question.schedule, Validators.required),
          itemRows: this._fb.array([])
      });

      if (this.question.options) {
          for (const option of this.question.options) {
              console.log(option);
              this.addNewRow(option);
          }
      } else {
          this.addNewRow();
      }
      this.getGroups();

      this.alertservice.getMessage().subscribe(message => { this.alertmessage = message; });
  }

  getQuestionDetail(questionId: string) {
        return this.questionservice.getQuestion(questionId)
            .map(data => data).toPromise();
  }

  getGroups() {
    this.groupservice.getAll()
        .subscribe((data: Group[]) => {
            this.groups = data;
            this.groupResult = this.groups;
            console.log(data);
        });
  }

  initItemRows(options: string) {

      return this._fb.group({ itemname: [options || '', Validators.minLength(1)] });
  }

  addNewRow(item?: string) {
      // control refers to your formarray
      const control = <FormArray>this.askForm.controls['itemRows'];
      // add new formgroup
      control.push(this.initItemRows(item));
  }

  deleteRow(index: number) {
      const control = <FormArray>this.askForm.controls['itemRows'];
      control.removeAt(index);
  }

  ask() {
    this.loading = true;

    // Build my payload
      if (this.question._id) {
          this.question.question = this.askForm.value.title;

          const options = [];
          for (const option of this.askForm.value.itemRows) {
              options.push(option.itemname);
          }
          this.question.options = options;
          this.question.userId = this.userId;
          this.question.schedule = this.askForm.value.schedule;
          this.question.groupId = this.askForm.value.groupId;

          console.log(this.question);

          this.questionservice.update(this.question)
              .subscribe(
                  data => {
                      console.log(data);
                      this.alertservice.success('Question successfully updated');
                      //this.router.navigate(['question/' + data.question._id]);
                  },
                  error => {
                      console.log(error);
                      this.alertservice.error('Internal error!');
                  }
              );

      } else {
          // create new
          this.question.question = this.askForm.value.title;

          const options = [];
          for (const option of this.askForm.value.itemRows) {
              options.push(option.itemname);
          }
          this.question.options = options;
          this.question.userId = this.userId;
          this.question.schedule = this.askForm.value.schedule;
          this.question.groupId = this.askForm.value.groupId;

          console.log(this.question);

          this.questionservice.create(this.question)
              .subscribe(
                  data => {
                      console.log(data);
                      this.alertservice.success('Question successfully created');
                      //this.router.navigate(['question/' + data.question._id]);
                  },
                  error => {
                      console.log(error);
                      this.alertservice.error('Internal error!');
                  }
              );
      }
    this.loading = false;

  }


}
