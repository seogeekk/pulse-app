import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import {AskComponent} from './ask/ask.component';
import {PulseBodyComponent} from './pulse-body/pulse-body.component';
import {QuestionComponent} from './question/question.component';
import {GroupsComponent} from './groups/groups.component';
import {MembersComponent} from './members/members.component';
import {MemberComponent} from './member/member.component';

const appRoutes: Routes = [
    // uncomment to redirect to login
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'dashboard',
                component: PulseBodyComponent
            },
            { path: 'ask', component: AskComponent },
            { path: 'ask/edit/:questionId', component: AskComponent },
            { path: 'question/:questionId', component: QuestionComponent },
            { path: 'groups', component: GroupsComponent },
            { path: 'groups/members/:groupId', component: MembersComponent },
            { path: 'member/:memberId', component: MemberComponent }
        ],
        canActivate: [AuthGuard]
    },
    { path: 'login', component: LoginComponent },



    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);
