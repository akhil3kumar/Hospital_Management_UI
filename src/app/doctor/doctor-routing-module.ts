import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorList } from './doctor-list/doctor-list';
import { DoctorForm } from './doctor-form/doctor-form';

const routes: Routes = [
  {
    path: '',
    component: DoctorList,
  },
  {
    path: 'create',
    component: DoctorForm,
  },
  {
    path: 'edit/:doctorId',
    component: DoctorForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
