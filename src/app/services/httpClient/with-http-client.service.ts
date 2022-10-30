import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../../models/posts.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WithHttpClientService {

  constructor(private http: HttpClient) {}

  /**
   * @description return an observable from the API request
   * 
   * @function getPosts
   * @returns Observable<Posts[]>
   */
  getPosts(): Observable<any> {
    return this.http.get(`${environment.urls.posts}`);
  }

  /**
   * @description To remove one of the Posts from the DB
   * 
   * @function deletePost
   * @param {id: number}
   */
  deletePost(id: number): void {
    this.http.delete(`${environment.urls.posts}${id}`);
  }
}
