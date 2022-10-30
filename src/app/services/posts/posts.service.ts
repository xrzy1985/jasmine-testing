import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../../models/posts.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}

  /**
   * @description return an observable from the API request
   * 
   * @function getPosts
   * @returns Observable<Posts[]>
   */
  getPosts(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users/');
  }

  /**
   * @description To remove one of the Posts from the DB
   * 
   * @function deletePost
   * @param {id: number}
   */
  deletePost(id: number): void {
    this.http.delete(`https://jsonplaceholder.typicode.com/users/${id}`).subscribe({
      error: (err: unknown) => {
        console.error(err);
      },
      complete: () => {
        console.log('Delete operation complete.');
      }
    })
  }
}
