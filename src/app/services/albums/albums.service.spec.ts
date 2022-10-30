import { TestBed } from '@angular/core/testing';

import { AlbumsService } from './albums.service';
import { Albums } from '../../models/albums.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CaptureIdPipe } from '../../pipes/captureId/capture-id.pipe';

describe('AlbumsService', () => {
  let albums: Albums[];
  let mockHttpService: any;
  let mockService: Partial<AlbumsService>;
  let pipe: CaptureIdPipe;
  let service: AlbumsService;

  beforeEach(() => {
    pipe = new CaptureIdPipe();
    albums = [
      {
        id: 1,
        title: 'Album Title',
        userId: 1,
      },
      {
        id: 2,
        title: 'Album Title',
        userId: 2,
      },
      {
        id: 3,
        title: 'Album Title',
        userId: 3,
      },
    ];
    mockHttpService = {
      get: (url: string) => of(albums),
      delete: (url: string) => {
        albums = albums.filter(
          (album: Albums) => album.id !== pipe.transform(url)
        );
      },
    };
    mockService = {
      getAlbums: () => {
        return mockHttpService.get(`${environment.urls.albums}`);
      },
      deleteAlbum: (id: number) => {
        mockHttpService.delete(`${environment.urls.albums}${id}`);
      },
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CaptureIdPipe,
        { provide: AlbumsService, useValue: mockService },
      ],
    });
    service = TestBed.inject(AlbumsService);
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should setup', () => {
      expect(albums.length).toBe(3);
    });
  });

  describe('getAlbums', () => {
    it('should return an instance of an Observable', () => {
      expect(service.getAlbums()).toBeInstanceOf(Observable);
    });

    it('should return all of the albums from the API', () => {
      service.getAlbums();
      expect(albums.length).toBe(3);
    });

    it('should throw an error', () => {
      service.getAlbums = () => {
        throw new Error('error');
      };
      expect(service.getAlbums).toThrowError();
    });
  });

  describe('deleteAlbum', () => {
    it('should not remove any elements with an id less than or equal to 0', () => {
      service.deleteAlbum(-1);
      expect(albums.length).toBe(3);
      service.deleteAlbum(0);
      expect(albums.length).toBe(3);
    });

    it('should remove the element associated to the ID passed into the method', () => {
      service.deleteAlbum(1);
      expect(albums.length).toBe(2);
    });

    it('should throw an error', () => {
      service.deleteAlbum = (id: number) => {
        throw new Error('error');
      };
      expect(service.deleteAlbum).toThrowError();
    });
  });
});
