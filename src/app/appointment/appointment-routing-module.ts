import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentForm } from './appointment-form/appointment-form';
import { AppointmentList } from './appointment-list/appointment-list';

const routes: Routes = [
  {
    path: '',
    component: AppointmentList,
  },
  {
    path: 'create',
    component: AppointmentForm,
  },
  {
    path: 'edit/:appointmentId',
    component: AppointmentForm,
  },
  {
    path: 'status/:status}',
    component: AppointmentList,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentRoutingModule {}
