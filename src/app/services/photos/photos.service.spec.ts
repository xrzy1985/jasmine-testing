import { TestBed } from '@angular/core/testing';

import { PhotosService } from './photos.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Photos } from '../../models/photos.interface';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CaptureIdPipe } from '../../pipes/captureId/capture-id.pipe';

describe('PhotosService', () => {
  let mockHttpService: any;
  let mockService: Partial<PhotosService>;
  let pipe: CaptureIdPipe;
  let photos: Photos[];
  let service: PhotosService;

  beforeEach(() => {
    pipe = new CaptureIdPipe();
    photos = [
      {
        albumId: 1,
        id: 1,
        thumbnailUrl: 'https://thumbnailurl.com/',
        title: 'title 1',
        url: 'https://url.com/',
      },
      {
        albumId: 2,
        id: 2,
        thumbnailUrl: 'https://thumbnailurl.com/',
        title: 'title 2',
        url: 'https://url.com/',
      },
      {
        albumId: 3,
        id: 3,
        thumbnailUrl: 'https://thumbnailurl.com/',
        title: 'title 3',
        url: 'https://url.com/',
      },
    ];
    mockHttpService = {
      get: (url: string) => of(photos),
      delete: (url: string) => {
        photos = photos.filter((p: Photos) => p.id !== pipe.transform(url));
      },
    };
    mockService = {
      getPhotos: () => mockHttpService.get(environment.urls.photos),
      deletePhoto: (id: number) => {
        mockHttpService.delete(`${environment.urls.photos}${id}`);
      },
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClientTestingModule, useValue: mockHttpService },
        { provide: PhotosService, useValue: mockService },
      ],
    });
    service = TestBed.inject(PhotosService);
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should setup', () => {
      expect(photos.length).toBe(3);
    });
  });

  describe('getPhotos', () => {
    it('should call Http service, get', () => {
      let spy = spyOn(mockHttpService, 'get');
      service.getPhotos();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return an instance of an observable', () => {
      expect(service.getPhotos()).toBeInstanceOf(Observable);
    });
    
    it('should get the photos', () => {
      service.getPhotos().subscribe({
        next: (data: Photos[]) => {
          expect(data.length).toBe(3);
        }
      });
    });

    it('should throw an error', () => {
      service.getPhotos = () => {
        throw (new Error('error'));
      }
      expect(service.getPhotos).toThrowError();
    });
  });

  describe('deletePhoto', () => {
    it('should not remove any elements if ID is less than or equal to 0', () => {
      service.deletePhoto(0);
      expect(photos.length).toBe(3);
      service.deletePhoto(-1);
      expect(photos.length).toBe(3);
    });

    it('should remove element that matches with the ID', () => {
      service.deletePhoto(1);
      expect(photos.length).toBe(2);
    });

    it('should throw an error', () => {
      service.deletePhoto = () => {
        throw( new Error('error') );
        expect(service.deletePhoto).toThrowError();
      }
    });
  })
  
});
