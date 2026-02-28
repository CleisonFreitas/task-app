import { Routes } from '@angular/router';
import { Login } from './screens/login/login';
import { Register } from './screens/register/register';
import { TasksScreen } from './screens/task/task.screen';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'todo', component: TasksScreen },
];
