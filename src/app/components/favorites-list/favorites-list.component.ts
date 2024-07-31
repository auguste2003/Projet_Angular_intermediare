import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../job';
import { Router } from '@angular/router'; // insert the router 
import { JobComponent } from '../job/job.component';
import { CommonModule } from '@angular/common';
import { Subscription, Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [JobComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.css'
})
export class FavoritesListComponent {
  favoriteJobs: Job[] = [];
  filteredFavoriteJobs$!: Observable<Job[]>;
  searchControl = new FormControl('');

   // subscription used to hald the favorite jobs from the service 
  private favoritesSubscription!: Subscription;

  constructor(private jobService: JobService) {}

   /**
   * initialize the jobs 
   */
  ngOnInit(): void {
    this.favoritesSubscription = this.jobService.getFavoriteJobs().subscribe(favorites => {
      this.favoriteJobs = favorites;
      this.setupFilteredFavoriteJobs();
    });
  }
 /**
   * unsubscribe  
   */
  ngOnDestroy(): void {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

   /**
   * 
   * @param job neu job , that we must add in the localstorage 
   */
  toggleFavorite(job: Job): void {
    this.jobService.toggleFavorite(job);
  }
/**
 *  We must check if it is a favorite job 
 * @param jobId of the actual job 
 * @returns 
 */
  isFavorite(jobId: number): boolean {
    return this.jobService.isFavorite(jobId);
  }


  private setupFilteredFavoriteJobs(): void {
    this.filteredFavoriteJobs$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(text => this.filterFavoriteJobs(text ?? ''))
    );
  }

  private filterFavoriteJobs(searchText: string): Job[] {
    return this.favoriteJobs.filter(job => {
      return job.title.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  hasNoFavoriteJobs(): boolean {
    return this.favoriteJobs.length === 0;
  }

  hasNoFilteredFavoriteJobs(filteredJobs: Job[] | null): boolean {
    return filteredJobs?.length === 0;
  }

}

