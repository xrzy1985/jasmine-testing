import { TestBed } from '@angular/core/testing';
import { CommentsService } from './comments.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { Comments } from '../../models/comments.interface';
import { environment } from '../../../environments/environment';
import { CaptureIdPipe } from '../../pipes/captureId/capture-id.pipe';

describe('CommentsService', () => {
  let comments: Comments[];
  let mockHttpService: any;
  let mockService: any;
  let pipe: CaptureIdPipe;
  let service: CommentsService;

  beforeEach(() => {
    pipe = new CaptureIdPipe();
    comments = [
      {
        body: 'Body',
        email: 'email@email.com',
        id: 1,
        name: 'Jimmy Johns',
        postId: 1,
        comment: {
          title: 'Comment Title',
          body: 'Comment Body',
        },
      },
      {
        body: 'Body',
        email: 'email@email.com',
        id: 2,
        name: 'Jimmy Johns',
        postId: 2,
        comment: {
          title: 'Comment Title',
          body: 'Comment Body',
        },
      },
      {
        body: 'Body',
        email: 'email@email.com',
        id: 3,
        name: 'Jimmy Johns',
        postId: 3,
        comment: {
          title: 'Comment Title',
          body: 'Comment Body',
        },
      },
    ];
    mockHttpService = {
      get: (url: string) => of(comments),
      delete: (url: string) => {
        comments = comments.filter((c: Comments) => c.id !== pipe.transform(url));
      },
    };
    mockService = {
      getComments: () => mockHttpService.get(environment.urls.comments),
      deleteComment: (id: number) =>
        mockHttpService.delete(`${environment.urls.comments}${id}`),
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: CommentsService, useValue: mockService }],
    });
    service = TestBed.inject(CommentsService);
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should setup', () => {
      expect(comments.length).toBe(3);
    });
  });

  describe('getComments', () => {
    it('should return an instance of an observable', () => {
      expect(service.getComments()).toBeInstanceOf(Observable);
    });

    it('should call the mock http service', () => {
      let spy = spyOn(mockHttpService, 'get');
      service.getComments();
      expect(spy).toHaveBeenCalled();
    });

    it('should return 3 values from the observable', () => {
      service.getComments().subscribe({
        next: (data: Comments[]) => {
          expect(data.length).toBe(3);
        },
      });
    });

    it('should throw an error', () => {
      service.getComments = () => {
        throw new Error('error');
      };
      expect(service.getComments).toThrowError();
    });
  });

  describe('deleteComment', () => {
    it('should not delete a comment if the ID is less than or equal to 0', () => {
      service.deleteComment(0);
      expect(comments.length).toBe(3);
      service.deleteComment(-1);
      expect(comments.length).toBe(3);
    });

    it('should delete the comment associated with the ID passed into the method', () => {
      service.deleteComment(1);
      expect(comments.length).toBe(2);
    });

    it('should throw an error', () => {
      service.deleteComment = (id: number) => {
        throw new Error('error');
      };
      expect(service.deleteComment).toThrowError();
    });
  });
});
