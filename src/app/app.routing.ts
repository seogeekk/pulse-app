import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import {AskComponent} from './ask/ask.component';
import {PulseBodyComponent} from './pulse-body/pulse-body.component';

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
            { path: 'ask', component: AskComponent }
        ],
        canActivate: [AuthGuard]
    },
    { path: 'login', component: LoginComponent },



    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);
