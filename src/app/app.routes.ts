import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HostListComponent } from './pages/host-list/host-list.component';
import { authGuard, loginGuard } from './auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'browse', component: HostListComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
    { path: '**', redirectTo: '',
    },
];
