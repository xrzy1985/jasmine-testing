import { Injectable } from '@angular/core';
import { User } from '../../models/users.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  /**
   * @description To return an observable of the users from the API
   * 
   * @function getUsers
   */
  public getUsers(): Observable<any> {
    return this.http.get(`${environment.urls.users}`);
  }

  /**
   * @description To delete a specific user from the DB using ID as a key
   * 
   * @function deleteUser
   */
  public deleteUser(id: number): void {
    this.http.delete(`${environment.urls.users}${id}`);
  }
}
