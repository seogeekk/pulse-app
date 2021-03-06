import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import {AlertService} from '../_services/alert.service';

@Component({
    // moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    public alertmessage: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertservice: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.alertservice.getMessage().subscribe(message => { this.alertmessage = message; });
    }

    login() {

        this.loading = true;
        console.log('Logging in');
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    // get user details and add on storage
                    this.userService.findUser(this.model.username)
                        .subscribe(
                            user => {
                                console.log(user);
                                localStorage.setItem('username', user.username);
                                localStorage.setItem('userId', user._id)
                                localStorage.setItem('profilename', user.firstName + ' ' + user.lastName);
                                localStorage.setItem('firstname', user.firstName);
                                localStorage.setItem('lastname', user.lastName);
                            });

                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.log(error);
                    if (error.error) {
                        this.alertservice.error(error.error.message);
                    } else {
                        this.alertservice.error('Internal Error!');
                    }
                    this.loading = false;
                });
    }

}