import { Component, OnInit } from '@angular/core';

import {FormGroup, FormArray, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Question} from '../_models/question';
import {Group} from '../_models/group';
import {QuestionService} from '../_services/question.service';
import {GroupService} from '../_services/group.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
      private questionService: QuestionService,
      private groupService: GroupService
  ) {

  }

  ngOnInit() {
      this.askForm = this._fb.group({
          title: new FormControl('', Validators.required),
          groupId: this.groupSearch,
          schedule: new FormControl(),
          itemRows: this._fb.array([this.initItemRows()])

      });

      this.getGroups();

      console.log(localStorage.getItem('userId'));
  }


    getGroups() {
        this.groupService.getAll()
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
    this.question.userId = localStorage.getItem('userId');
    this.question.schedule = this.askForm.value.schedule;
    this.question.groupId = this.askForm.value.groupId;

    console.log(this.question);

    this.questionService.create(this.question)
        .subscribe(
            data => {
              console.log(data);
            }
        )

    //console.log(this.question);

    this.loading = false;

  }


}
