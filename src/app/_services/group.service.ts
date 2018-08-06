import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Group} from '../_models/group';

@Injectable()
export class GroupService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Group[]>('/groups');
    }

    findOne(id: string) {
        return this.http.get<Group>('/groups/' + id);
    }

    create(group: Group) {
        return this.http.post('/groups', group);
    }

    update(group: Group) {
        return this.http.put('/groups/' + group._id, group);
    }

    delete(id: number) {
        return this.http.delete('/groups/' + id);
    }
}