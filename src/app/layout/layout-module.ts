import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing-module';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { Footer } from './footer/footer';
import { AdminLayout } from './admin-layout/admin-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AngularMaterialModule } from '../angular-material-module';

@NgModule({
  declarations: [Header, Sidebar, Footer, AdminLayout],
  imports: [CommonModule, LayoutRoutingModule, AngularMaterialModule],
  exports: [AdminLayout],
})
export class LayoutModule {}
