import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/login/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { NewUserComponent } from './components/user/new-user/new-user.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'usuario',    
    children: [
      { path: '', redirectTo: 'usuario', pathMatch: 'full' },
      { path: '', component: UserComponent, data: {title: "Usuario"}, children:[] },
      { path: 'novo', component: NewUserComponent,  data: { title: 'Novo usuário' }, children:[] },
      { path: 'update-usuario/:id', component: NewUserComponent, data: { title: 'Editar usuário' } },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
