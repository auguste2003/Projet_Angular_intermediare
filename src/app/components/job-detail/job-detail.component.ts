import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../job';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css'
})
export class JobDetailComponent {
  job!: Job;

  /**
   * subscription of a job 
   */
  private jobSubscription!: Subscription; 

  constructor(private route: ActivatedRoute, private jobService: JobService) {}
 /**
  * hold the jobs using the subscription from the service 
  */
  ngOnInit(): void {
  const jobId = this.route.snapshot.paramMap.get('id');
  this.jobSubscription= this.jobService.getJobById(jobId).subscribe(job => {
      this.job = job;
    });
  }
  /**
   * unsubscribe 
   */
  ngOnDestroy(){
    this.jobSubscription.unsubscribe() ; 
  }
}
