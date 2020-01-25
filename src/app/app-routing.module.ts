import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CredentialsComponent } from './pages/credentials/credentials.component';
import { StructureComponent } from './pages/structure/structure.component';
import { CurrentUserComponent } from './pages/current-user/current-user.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'credentials', pathMatch: 'full' },
  { path: 'credentials', component: CredentialsComponent },
  { path: 'structure', component: StructureComponent },
  { path: 'current-user', component: CurrentUserComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
