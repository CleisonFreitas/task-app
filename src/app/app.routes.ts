import { Routes } from '@angular/router';
import { Login } from './screens/login/login';
import { TaskScreen } from './screens/task/task.screen';
import { authGuard } from './core/auth/auth.guard';
import { Register } from './screens/register/register';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'todo', component: TaskScreen, canActivate: [authGuard] },
];
