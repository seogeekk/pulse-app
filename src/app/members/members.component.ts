import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Member } from '../_models/member';
import {Group} from '../_models/group';
import {GroupService} from '../_services/group.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private groupservice: GroupService) { }

  public members: Member[];
  public groupId;

  async ngOnInit() {

      await this.route.params.subscribe((urlParams) => {
          this.groupId = urlParams['groupId'];
      });

      this.members = <Member[]> await this.getMembers(this.groupId);
      console.log(this.members);


  }

  getMembers(id: string) {
      return this.groupservice.findMembers(id)
          .map((data: Group[]) => data).toPromise();
  }
}
