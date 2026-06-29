import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing-module';
import { AppointmentForm } from './appointment-form/appointment-form';
import { AppointmentList } from './appointment-list/appointment-list';
import { ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material-module';

@NgModule({
  declarations: [AppointmentForm, AppointmentList],
  imports: [CommonModule, AppointmentRoutingModule, ReactiveFormsModule, AngularMaterialModule],
})
export class AppointmentModule {}
