import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsComponent } from './leads/leads.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard.component';
import { BodyComponent } from './body/body.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { TableComponent } from './manageusers/table/table.component';
import { ProfileComponent } from './profile/profile.component';
import { QualityComponent } from './quality/quality.component';
import { PhoneValidationComponent } from './phone-validation/phone-validation.component';
import { EmailValidationComponent } from './email-validation/email-validation.component';
import { GenaralSettingComponent } from './profile/genaral-setting/genaral-setting.component';

const routes: Routes = [
  { 
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'leads', component: LeadsComponent },
      { path: 'body', component: BodyComponent },
      { path: 'sidenav', component: SidenavComponent },
      { path: 'manageusers', component: ManageusersComponent },
      { path: 'table', component: TableComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'quality', component: QualityComponent },
      { path: 'phonevalidation', component: PhoneValidationComponent },
      { path: 'emailvalidation', component: EmailValidationComponent },
      { path: 'generalSetting', component: GenaralSettingComponent },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
