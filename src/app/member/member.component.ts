import { Component, OnInit } from '@angular/core';
import {FBUser} from '../_models/fbuser';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  public memberId;
  public user;

  constructor(private route: ActivatedRoute,
              private userservice: UserService) { }

  async ngOnInit() {

      await this.route.params.subscribe((urlParams) => {
          this.memberId = urlParams['memberId'];
      });

      this.user = <FBUser> await this.getMemberDetail(this.memberId);

      if (this.user.picture ) {
        this.user.imgurl = this.user.picture.data.url;
      } else {
        this.user.imgurl =  '../assets/images/defaulticon.png';
      }


  }

  getMemberDetail(id: string) {
      return this.userservice.findFBUser(id)
          .map((data: FBUser) => data).toPromise();
  }

}
