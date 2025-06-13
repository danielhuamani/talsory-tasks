import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth/auth.component';
import { authGuard } from '@guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'tasks',
        loadComponent: () =>
          import('./pages/tasks/task-list/task-list.component').then(
            (m) => m.TaskListComponent
          ),
      },
      {
        path: 'tasks/create',
        loadComponent: () =>
          import('./pages/tasks/task-create/task-create.component').then(
            (m) => m.TaskCreateComponent
          ),
      },
      {
        path: 'tasks/:id/update',
        loadComponent: () =>
          import('./pages/tasks/task-update/task-update.component').then(
            (m) => m.TaskUpdateComponent
          ),
      },
    ],
  },
];
