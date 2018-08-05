import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserXhr } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { Routing } from './app.routing';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { APIInterceptor } from './_interceptors/backend';
import { PulseBodyComponent } from './pulse-body/pulse-body.component';
import {QuestionService} from './_services/question.service';
// import {CustExtBrowserXhr} from './_interceptors/custbrowserxhr';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AskComponent } from './ask/ask.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PulseBodyComponent,
    AskComponent
  ],
  imports: [
    BrowserModule, Routing, FormsModule, HttpClientModule, ChartsModule
  ],
  providers: [
      {provide: APP_BASE_HREF, useValue : '/' },
      {provide: HTTP_INTERCEPTORS, useClass: APIInterceptor,
          multi: true},
      // {provide: BrowserXhr, useClass: CustExtBrowserXhr},
      AuthGuard,
      AuthenticationService,
      QuestionService,
      UserService
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
