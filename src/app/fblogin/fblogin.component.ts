import { Component, OnInit } from '@angular/core';

import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';


@Component({
  selector: 'app-fblogin',
  templateUrl: './fblogin.component.html',
  styleUrls: ['./fblogin.component.css']
})
export class FBLoginComponent implements OnInit {

    constructor(private fb: FacebookService) {

        let initParams: InitParams = {
            appId: '419639298543215',
            xfbml: true,
            version: 'v2.8'
        };

        fb.init(initParams);

    }

  ngOnInit() {
  }

    loginWithFacebook(): void {

        this.fb.login()
            .then((response: LoginResponse) => console.log(response))
            .catch((error: any) => console.error(error));

    }

}
