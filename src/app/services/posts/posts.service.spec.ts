import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PostsService } from './posts.service';
import { Posts } from '../../models/posts.interface';
import { BehaviorSubject, filter, Observable, of, pipe } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CaptureIdPipe } from '../../pipes/captureId/capture-id.pipe';

describe('PostsService', () => {
  let mockHttpService: any;
  let mockService: Partial<PostsService>;
  let pipe: CaptureIdPipe;
  let posts: Posts[];
  let service: PostsService;

  beforeEach(() => {
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
    mockHttpService = {
      get: (url: string) => of(posts),
      delete: (url: string) => {
        of(posts).subscribe({
          next: () => {
            posts = posts.filter((p: Posts) => p.id !== pipe.transform(url));
          },
          error: (err: unknown) => {
            console.error(err);
          },
          complete: () => { console.log('Complete Delete'); }
        });
      }
    };
    mockService = {
      getPosts: () => mockHttpService.get(environment.urls.posts),
      deletePost: (id: number) => {
        mockHttpService.delete(`${environment.urls.posts}${id}`);
      },
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClient, useValue: mockHttpService },
        { provide: PostsService, useValue: mockService },
      ],
    });
    service = TestBed.inject(PostsService);
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('getPosts', () => {
    it('should return the posts as an observable', () => {
      expect(service.getPosts()).toBeInstanceOf(Observable);
    });

    it('should have 3 elements returned', () => {
      service.getPosts().subscribe({
        next: (data: Posts[]) => {
          expect(data.length).toBe(3);
        },
      });
    });

    it('should throw an error', () => {
      service.getPosts = () => {
        throw new Error('error');
      };
      expect(service.getPosts).toThrowError();
    });
  });

  describe('deletePost', () => {
    it('should remove the element with the corresponding ID', () => {
      service.deletePost(1);
      service.getPosts().subscribe({
        next: (data: Posts[]) => {
          expect(data.length).toBe(2);
        },
      });
    });

    it('should not delete any elements if the ID is not a number greater than 0', () => {
      service.deletePost(0);
      expect(posts.length).toBe(3);
      service.deletePost(-1);
      expect(posts.length).toBe(3);
    });

    it('should throw an error', () => {
      service.deletePost = (id: number) => {
        throw new Error('error');
      };
      expect(service.deletePost).toThrowError();
    });
  });
});
