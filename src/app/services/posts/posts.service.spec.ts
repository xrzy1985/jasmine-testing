import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PostsService } from './posts.service';
import { Posts } from '../../models/posts.interface';
import { BehaviorSubject, filter, from, Observable, of, pipe } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CaptureIdPipe } from '../../pipes/captureId/capture-id.pipe';

describe('PostsService', () => {
  let http: jasmine.SpyObj<HttpClient>;
  let id: number;
  let mockHttpService: any;
  let mockService: Partial<PostsService>;
  let pipe: CaptureIdPipe;
  let posts: Posts[];
  let postsService: PostsService;
  let service: PostsService;

  beforeEach(() => {
    http = jasmine.createSpyObj('HttpClient', ['delete', 'get']);
    id = 1;
    pipe = new CaptureIdPipe();
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
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PostsService,
        { provide: HttpClient, useValue: http }
      ],
    });
    postsService = new PostsService(http);
    service = TestBed.inject(PostsService);
    http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('getPosts using spy creating service instantiation manually', () => {
    beforeEach(() => {
      http.get.and.returnValue(of(posts));
    });
    it('should return an observable from API', () => {
      postsService.getPosts().subscribe({
        next: (data: Posts[]) => {
          expect(data).toEqual(posts);
          expect(data.length).toBe(3);
        },
      });
    });

    it('should call the http get spy', () => {
      postsService.getPosts();
      expect(http.get).toHaveBeenCalled();
    });
  });

  describe('getPosts using the TestBed injection of HttpClient with PostsService', () => {
    beforeEach(() => {
      http.get.and.returnValue(of(posts));
    });

    it('should behave...', () => {
      service.getPosts();
      expect(http.get).toHaveBeenCalled();
      expect(http.get).toHaveBeenCalledWith(`${environment.urls.posts}`);
    });

    it('should return an instance of an observable', () => {
      expect(service.getPosts()).toBeInstanceOf(Observable);
    });

    it('should return values', () => {
      service.getPosts().subscribe({
        next: (data: Posts[]) => {
          expect(data.length).toBe(3);
        },
      });
    });
  });

  describe('deletePost', () => {
    beforeEach(() => {
      http.get.and.returnValue(of(posts.filter((post) => post.id !== id)));
      http.delete.and.callThrough();
    });

    it('should expect http delete to have been called', () => {
      service.deletePost(1);
      expect(http.delete).toHaveBeenCalled();
      expect(http.delete).toHaveBeenCalledWith(
        `${environment.urls.posts}${id}`
      );
    });

    it('should expect the post to be removed', () => {
      service.deletePost(id);
      service.getPosts().subscribe({
        next: (data: Posts[]) => {
          expect(data.length).toBe(2);
        },
      });
    });

    it('should expect the post to not be removed', () => {
      service.deletePost(0);
      http.get.and.returnValue(of(posts.filter((post) => post.id !== 0)));
      service.getPosts().subscribe({
        next: (data: Posts[]) => {
          expect(data.length).toBe(3);
        },
      });
    });
  });
});
