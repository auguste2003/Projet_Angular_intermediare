import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { JobListComponent } from './components/job-list/job-list.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { JobService } from './services/job.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,JobListComponent,FavoritesListComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-job-search';
constructor (private jobService:JobService){}
  
refreshFavorites(): void {
  this.jobService.refreshFavorites();
}
}
