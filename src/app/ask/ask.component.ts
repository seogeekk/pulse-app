import { Component, OnInit } from '@angular/core';

import {FormGroup, FormArray, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import {Question} from '../_models/question';
import {Group} from '../_models/group';
import {QuestionService} from '../_services/question.service';
import {GroupService} from '../_services/group.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AlertService} from '../_services/alert.service';
import {isSuccess} from '@angular/http/src/http_utils';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {
  model: any = {};
  askForm: FormGroup;

  question: Question;
  loading = false;
  groups = [];

  alertmessage;

  private userId;

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
      private router: Router
  ) {

  }

  ngOnInit() {
        this.userId = localStorage.getItem('userId');
      this.askForm = this._fb.group({
          title: new FormControl('', Validators.required),
          groupId: this.groupSearch,
          schedule: new FormControl(),
          itemRows: this._fb.array([this.initItemRows()])

      });

      this.getGroups();

      this.alertservice.getMessage().subscribe(message => { this.alertmessage = message; });
  }


    getGroups() {
        this.groupservice.getAll()
            .subscribe((data: Group[]) => {
                this.groups = data;
                this.groupResult = this.groups;
                console.log(data);
        });
    }


  initItemRows() {
      return this._fb.group({
          // list all your form controls here, which belongs to your form array
          itemname: [ '', Validators.minLength(1)]
      });
  }

  addNewRow() {
      // control refers to your formarray
      const control = <FormArray>this.askForm.controls['itemRows'];
      // add new formgroup
      control.push(this.initItemRows());
  }

  deleteRow(index: number) {
      const control = <FormArray>this.askForm.controls['itemRows'];
      control.removeAt(index);
  }

  ask() {
    this.loading = true;

    // Build my payload
    this.question = new Question();
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
        )

    this.loading = false;

  }


}
