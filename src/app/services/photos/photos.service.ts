import { Injectable } from '@angular/core';
import { Photos } from '../../models/photos.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) {}

  /**
   * @description To get all photos from the API
   * 
   * @function getPhotos
   * @returns Observable<Photos[]>
   */
  public getPhotos(): Observable<any> {
    return this.http.get(environment.urls.photos);
  }


  /**
   * @description To remove a photo that is associated to the ID passed in
   * 
   * @function deletePhoto
   */
  public deletePhoto(id: number): void {
    this.http.delete(`${environment.urls.photos}${id}`)
  }
}
