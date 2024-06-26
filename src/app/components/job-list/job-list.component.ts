import { Component } from '@angular/core';
import { Job } from '../../job';
import { JobService } from '../../services/job.service';
import { Router } from '@angular/router'; // insert the router 
import { JobComponent } from '../job/job.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [JobComponent,CommonModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css',
  providers:[JobService]
})
export class JobListComponent {
  jobs: Job[] = [];

  // subscription used to hald the jobs from the service 
  private jobsSubscription!: Subscription;

  constructor(private jobService: JobService) {}

  /**
   * initialize the jobs 
   */
  ngOnInit(): void {
    this.jobsSubscription = this.jobService.getAllJobs().subscribe(data => {
      this.jobs = data;
    });
  }

/**
 * stop the subscription 
 */
  ngOnDestroy(): void {
    if (this.jobsSubscription) {
      this.jobsSubscription.unsubscribe();
    }
  }

  /**
   * 
   * @param job new job , that we must add in the localstorage 
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
 
}
