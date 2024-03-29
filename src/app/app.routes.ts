import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormComponent } from './components/form/form.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'add-city',
    component: FormComponent,
    title: 'Add City Information',
  },
  {
    path: 'details/:id',
    component: CityDetailsComponent,
    title: 'City Details',
  },
];
