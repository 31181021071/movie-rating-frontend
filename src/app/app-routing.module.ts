import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthActivateRouteGuard } from './routeGuard/auth.routeguard';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'user-profile', component: UserProfileComponent , canActivate: [AuthActivateRouteGuard]},
  { path: 'admin-profile', component: AdminProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
