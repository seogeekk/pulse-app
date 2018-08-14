import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Routing
import { Routing } from './app.routing';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Helpers
import { AuthGuard } from './_guards/auth.guard';
import { APIInterceptor } from './_interceptors/backend';

// Components
import { AskComponent } from './ask/ask.component';
import { PulseBodyComponent } from './pulse-body/pulse-body.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

// Services
import { QuestionService } from './_services/question.service';
import { GroupService } from './_services/group.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { AnswerService } from './_services/answer.service';
import { QuestionComponent } from './question/question.component';
import {AlertService} from './_services/alert.service';
import { GroupsComponent } from './groups/groups.component';
import { MembersComponent } from './members/members.component';
import { MemberComponent } from './member/member.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PulseBodyComponent,
    AskComponent,
    QuestionComponent,
    GroupsComponent,
    MembersComponent,
    MemberComponent
  ],
  imports: [
    BrowserModule, Routing, FormsModule, HttpClientModule, ChartsModule, ReactiveFormsModule,
      BrowserAnimationsModule,
      OwlDateTimeModule,
      OwlNativeDateTimeModule,
  ],
  providers: [
      // {provide: APP_BASE_HREF, useValue : '/' },
      {provide: LocationStrategy, useClass: HashLocationStrategy},
      {provide: HTTP_INTERCEPTORS, useClass: APIInterceptor,
          multi: true},
      AuthGuard,
      AuthenticationService,
      QuestionService,
      UserService,
      GroupService,
      AnswerService,
      AlertService
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
