import { Component, OnInit } from '@angular/core';
import {GroupService} from '../_services/group.service';
import {Group} from '../_models/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private groupservice: GroupService) { }

  public groups: Group[] = [];
  async ngOnInit() {
      const results = <any> await this.getGroups();

      console.log(results);

      for (const result of results) {
        const group: Group = new Group();
        group.id = result.id;
        group.name = result.name;
        if (result.picture) {
            group.imgurl = result.picture.data.url;
        } else {
            group.imgurl = '../assets/images/defaulticon.png';
        }

        this.groups.push(group);
      }

  }

  getGroups() {
      return this.groupservice.getAll()
          .map((data) => data).toPromise();
  }
}
