import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import {FBUser} from '../_models/fbuser';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('/users');
    }

    findUser(username: string) {
        return this.http.get<any>('/user?username=' + username);
    }

    findFBUser(memberId: string) {
        console.log('Finding FB User: ' + memberId);
        return this.http.get<FBUser>('/fb/member/' + memberId);
    }

    getById(id: number) {
        return this.http.get('/users/' + id);
    }

    create(user: User) {
        return this.http.post('/users', user);
    }

    update(user: User) {
        return this.http.put('/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('/users/' + id);
    }
}