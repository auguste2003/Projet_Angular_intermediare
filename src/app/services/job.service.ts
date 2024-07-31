import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Job } from '../job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  // key of the jobs stored in localstorage 
  private favoritesKey = 'favoriteJobs';
  // behaviorObject of type Job 
  private favoritesSubject: BehaviorSubject<Job[]>;

  constructor(private http: HttpClient) {
    const favorites = this.getFavoriteJobsFromLocalStorage(); 
    // initialize the behaviorOnjects with the actual jobs 
    this.favoritesSubject = new BehaviorSubject<Job[]>(favorites);
  }
/**
 * 
 * @returns all jobs 
 */
  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('/jobs');
  }

  /**
   * 
   * @param id is the id of a job 
   * @returns the job 
   */
  getJobById(id: string | null): Observable<Job> {
    return this.http.get<Job>(`/jobs/${id}`);
  }

  /**
   * 
   * @returns the actual jobs as observable 
   */
  getFavoriteJobs(): Observable<Job[]> {
    return this.favoritesSubject.asObservable();
  }

  /**
   * 
   * @returns the actual jobs in the loaclstorage 
   */
  private getFavoriteJobsFromLocalStorage(): Job[] {
    const favorites = localStorage.getItem(this.favoritesKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  /**
   * store  the job in  the local storage 
   * @param job actual job 
   */
  toggleFavorite(job: Job): void {
    const favorites = this.getFavoriteJobsFromLocalStorage();
    const index = favorites.findIndex(fav => fav.id === job.id);
    if (index === -1) {
      favorites.push(job);//  add if not exists 
    } else {
      favorites.splice(index, 1); // remove if exists 
    }
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  /**
   *  chec if the job is a favorite 
   * @param jobId 
   * @returns 
   */
  isFavorite(jobId: number): boolean {
    const favorites = this.getFavoriteJobsFromLocalStorage();
    return favorites.some(fav => fav.id === jobId); // Retourne true si fav est un élement de l'array  
  }

  /**
   * Refresh the favorite jobs 
   */
  refreshFavorites(): void {
    const favorites = this.getFavoriteJobsFromLocalStorage();
    this.favoritesSubject.next(favorites);
  }
}
