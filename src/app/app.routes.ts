import { Routes } from '@angular/router';
import { JobComponent } from './components/job/job.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';

export const routes: Routes = [
    {
     path: '', redirectTo: '/jobs', pathMatch: 'full'} ,
      { path: 'jobs', component: JobListComponent},
      { path: 'favorites', component: FavoritesListComponent},
      { path: 'jobs/:id', component: JobDetailComponent}


];
