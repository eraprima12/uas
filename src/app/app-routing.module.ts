import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/hoem.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then(m => m.ReportPageModule)
  },
  {
    path: 'detailpost/:index',
    loadChildren: () => import('./detailpost/detailpost.module').then(m => m.DetailpostPageModule)
  },
  {
    path: 'searchposts',
    loadChildren: () => import('./searchposts/searchposts.module').then( m => m.SearchpostsPageModule)
  },
  {
    path: 'drafts',
    loadChildren: () => import('./drafts/drafts.module').then( m => m.DraftsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
