import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Comments } from '../../models/comments.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {}

  /**
   * @description To gather all of the comments from the API
   * 
   * @function getComments
   * @returns Observable<any>
   */
  public getComments(): Observable<any> {
    return this.http.get(`${environment.urls.comments}`);
  }

  /**
   * @description To remove the element associated to the ID passed in
   * 
   * @function deleteComment
   */
  public deleteComment(id: number): void {
    this.http.delete(`${environment.urls.comments}${id}`);
  }
}
