import { Component, OnInit } from '@angular/core';

import { QuestionService } from '../_services/question.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-pulse-body',
  templateUrl: './pulse-body.component.html',
  styleUrls: ['./pulse-body.component.css']
})
export class PulseBodyComponent implements OnInit {

    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType = 'horizontalBar';
    public barChartLegend: boolean = false;

    public chartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40]}
    ];

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

  constructor(
        private questionservice: QuestionService
  ) {}

  ngOnInit() {


    this.getAllQuestions();


  }

  getAllQuestions() {
      this.questionservice.getAll()
          .subscribe(
              data => {
                console.log(data);
              }
          );
  }
}
