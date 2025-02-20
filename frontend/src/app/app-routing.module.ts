import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkComponent } from './selected-works/work/work.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path:"", component: MainpageComponent},
  {path: 'work/:slug', component: WorkComponent},
  {path: 'admin/login', component: AdminLoginComponent},
  { path: "admin/dashboard", component: AdminPanelComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
