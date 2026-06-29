import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing-module';
import { DoctorForm } from './doctor-form/doctor-form';
import { DoctorList } from './doctor-list/doctor-list';
import { ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';

@NgModule({
  declarations: [DoctorForm, DoctorList],
  imports: [CommonModule, DoctorRoutingModule, ReactiveFormsModule],
})
export class DoctorModule {}
