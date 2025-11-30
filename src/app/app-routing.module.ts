import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./presentation/pages/tasks/tasks.module').then(m => m.TasksPageModule)
  },
  {
    path: 'task-detail',
    loadChildren: () =>
      import('./presentation/pages/task-detail/task-detail.module').then(m => m.TaskDetailPageModule)
  },
  {
    path: 'task-detail/:id',
    loadChildren: () =>
      import('./presentation/pages/task-detail/task-detail.module').then(m => m.TaskDetailPageModule)
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./presentation/pages/categories/categories.module').then(m => m.CategoriesPageModule)
  }
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
