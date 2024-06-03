import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LeadsComponent } from './leads/leads.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard.component';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../Material.Module';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { DialogBoxComponent } from './manageusers/dialog-box/dialog-box.component';
import { AlertBoxComponent } from './manageusers/alert-box/alert-box.component';
import { TableComponent } from './manageusers/table/table.component';
import { FormsModule } from '@angular/forms';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatStepperModule} from '@angular/material/stepper';
import { BrowserModule } from '@angular/platform-browser';
import { MatChipsModule} from '@angular/material/chips';
import { ProfileComponent } from './profile/profile.component';
import { UploadImgComponent } from './profile/upload-img/upload-img.component';
import { DialogComponent } from './leads/dialog/dialog.component';
import { QualityComponent } from './quality/quality.component';
import { PhoneValidationComponent } from './phone-validation/phone-validation.component';
import { EmailValidationComponent } from './email-validation/email-validation.component';
import { GenaralSettingComponent } from './profile/genaral-setting/genaral-setting.component';
import { SecuritySettingComponent } from './profile/security-setting/security-setting.component';
import { ImportDialogComponent } from './leads/import-dialog/import-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';





@NgModule({
  declarations: [
    DashboardComponent,
    SidenavComponent,
    BodyComponent,
    LeadsComponent,
    HeaderComponent,
    ManageusersComponent,
    AlertBoxComponent,
    TableComponent,
    DialogBoxComponent,
    ProfileComponent,
    UploadImgComponent,
    DialogComponent,
    QualityComponent,
    PhoneValidationComponent,
    EmailValidationComponent,
    GenaralSettingComponent,
    SecuritySettingComponent,
    ImportDialogComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    OverlayModule,
    CdkMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableExporterModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatStepperModule,
    MatChipsModule,
    MatTooltipModule
  ]
})
export class DashboardModule { }
