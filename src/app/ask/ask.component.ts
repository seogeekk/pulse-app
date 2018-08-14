import { Component, OnInit } from '@angular/core';

import {FormGroup, FormArray, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Question} from '../_models/question';
import {Group} from '../_models/group';
import {QuestionService} from '../_services/question.service';
import {GroupService} from '../_services/group.service';
import {AlertService} from '../_services/alert.service';


@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {

  public askForm: FormGroup;

  public question: Question = new Question();
  loading = false;
  groups = [];

  public alertmessage: string;

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

    get itemRows() { return <FormArray>this.askForm.get('itemRows'); }

    filterGroups(id: string) {
        let group = '';
        const result = this.groupResult.filter(item => item.id === id);
        if (result.length === 1) {
            group = result[0].name;
        }
        return group;
    }

  async ngOnInit() {


      await this.route.params.subscribe((urlParams) => {
          this._id = urlParams['questionId'];
          console.log('param: ' + this._id);
      });

      this.groupResult = <Group[]> await this.getGroups();

      if (this._id) {
          console.log('Query question');
          this.question = <Question> await this.getQuestionDetail(this._id);
          // get group if it's provided
          console.log(this.question);
      }

      this.userId = localStorage.getItem('userId');
      this.askForm = this._fb.group({
          title: new FormControl(this.question.question, Validators.required),
          groupId: new FormControl(this.question.groupId, Validators.required),
          schedule: new FormControl(this.question.schedule, Validators.required),
          itemRows: this._fb.array([]),
          commentFlag: new FormControl(this.question.comment)
      });

      if (this.question.options) {
          for (const option of this.question.options) {
              console.log(option);
              this.addNewRow(option);
          }
      } else {
          this.addNewRow();
          this.addNewRow();
      }


      this.alertservice.getMessage().subscribe(message => { this.alertmessage = message; });
  }

  getQuestionDetail(questionId: string) {
        return this.questionservice.getQuestion(questionId)
            .map(data => data).toPromise();
  }

  getGroups() {
    return this.groupservice.getAll()
        .map((data: Group[]) => data).toPromise();
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

      this.question.question = this.askForm.value.title;

      const options = [];
      for (const option of this.askForm.value.itemRows) {
          options.push(option.itemname);
      }

      this.question.options = options;
      this.question.userId = this.userId;
      this.question.schedule = this.askForm.value.schedule;
      this.question.groupId = this.askForm.value.groupId;
      this.question.comment = this.askForm.value.commentFlag;

      console.log(this.question);
    // Build my payload
      if (this.question._id) {

          this.questionservice.update(this.question)
              .subscribe(
                  data => {
                      this.alertservice.success('Question successfully updated');
                      this.router.navigate(['question/' + this.question._id]);
                  },
                  error => {
                      console.log(error);
                      this.alertservice.error('Internal error!');
                  }
              );

      } else {


          this.questionservice.create(this.question)
              .subscribe(
                  data => {
                      const result: Question = <Question> data;
                      this.alertservice.success('Question successfully created');
                      this.router.navigate(['question/' + result._id]);
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
