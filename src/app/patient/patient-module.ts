import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing-module';
import { PatientList } from './patient-list/patient-list';
import { PatientForm } from './patient-form/patient-form';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PatientList, PatientForm],
  imports: [CommonModule, PatientRoutingModule, ReactiveFormsModule],
})
export class PatientModule {}
