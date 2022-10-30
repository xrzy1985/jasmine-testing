import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private http: HttpClient) {}

  /**
   * @description To return all of the albums from the API
   * 
   * @function getAlbums
   * @returns Observable<Albums[]>
   */
  public getAlbums(): Observable<any> {
    return this.http.get(`${environment.urls.albums}`);
  }

  /**
   * @description To delete the comment associated to the ID passed into the method
   * 
   * @function deleteAlbum
   */
  public deleteAlbum(id: number): void {
    this.http.delete(`${environment.urls.albums}${id}`);
  }
}
