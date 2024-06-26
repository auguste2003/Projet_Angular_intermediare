import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../job';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent {
  // recieve  the job from  the parents 
  @Input() job!: Job;

  // recieve  the value  from  the parents 
  @Input() isFavorite!: boolean;
    // Send the event to the parents
  @Output() toggleFavorite = new EventEmitter<void>();

  onToggleFavorite(): void {
    this.toggleFavorite.emit();
  }
}
