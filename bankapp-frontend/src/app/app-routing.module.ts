import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  //login - localhost://4200 - login page
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  //register - localhost://4200/register
  {
    path: 'register',
    component: RegisterComponent,
  },
  //dashboard - localhost://4200/dashboard
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  //transactions - localhost://4200/transactions
  {
    path: 'transactions',
    component: TransactionComponent,
  },
  //page not found - localhost://4200/pagenotfound
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
