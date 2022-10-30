import { TestBed } from '@angular/core/testing';
import { WithHttpClientService } from './with-http-client.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Posts } from '../../models/posts.interface';
import { environment } from '../../../environments/environment';

describe('WithHttpClientService', () => {
  let http: jasmine.SpyObj<HttpClient>;
  let id: number;
  let posts: Posts[];
  let service: WithHttpClientService;

  beforeEach(() => {
    id = 1;
    posts = [
      {
        id: 1,
        userId: 1,
        title: 'POST 1',
        body: 'POST BODY',
      },
      {
        id: 2,
        userId: 2,
        title: 'POST 2',
        body: 'POST BODY',
      },
      {
        id: 3,
        userId: 3,
        title: 'POST 3',
        body: 'POST BODY',
      },
    ];
    http = jasmine.createSpyObj(HttpClient, ['delete', 'get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WithHttpClientService,
        { provide: HttpClient, useValue: http }
      ]
    });
    http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    service = TestBed.inject(WithHttpClientService);
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('getPosts', () => {
    beforeEach(() => {
      http.get.and.returnValue(of(posts));
    });

    it('should return an instance of an observable', () => {
      expect(service.getPosts()).toBeInstanceOf(Observable);
    });

    it('should return 3 values from Observable', () => {
      service.getPosts().subscribe({
        next: (data: Posts[]) => {
          expect(data).toEqual(posts);
          expect(data.length).toBe(3);
        }
      })
    });
  })
  
  describe('deletePost', () => {
    beforeEach(() => {
      http.get.and.returnValue(of(posts.filter(p => p.id !== id)));
    });

    it('should call the delete method from http', () => {
      service.deletePost(1);
      expect(http.delete).toHaveBeenCalled();
      expect(http.delete).toHaveBeenCalledWith(`${environment.urls.posts}${id}`);
    });

    it('should not remove any posts if a number less than 1 is passed in', () => {
      http.get.and.returnValue(of(posts.filter(p => p.id !== 0)));
      service.deletePost(0);
      service.getPosts().subscribe({
        next: (data: Posts[]) => {
          expect(data).toEqual(posts);
          expect(data.length).toBe(3);
        }
      });
    });

    it('should remove the element with the associated ID', () => {
      service.deletePost(1);
      service.getPosts().subscribe({
        next: (data: Posts[]) => {
          expect(data).toEqual(posts.filter(p => p.id !== id));
        }
      });
    });
  })
  
});
