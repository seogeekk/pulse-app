import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Group} from '../_models/group';
import {Member} from '../_models/members';

@Injectable()
export class GroupService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Group[]>('/fb/groups');
    }

    findMembers(id: string) {
        console.log(id);
        return this.http.get<Member[]>('/fb/members/' + id);
    }
}
