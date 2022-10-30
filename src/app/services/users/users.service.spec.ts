import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';
import { Observable, of } from 'rxjs';
import { User } from '../../models/users.interface';
import { environment } from '../../../environments/environment';
import { CaptureIdPipe } from '../../pipes/captureId/capture-id.pipe';

describe('Manually mock service, and jasmine spies', () => {
  let http: jasmine.SpyObj<HttpClient>;
  let mockHttpService: any;
  let mockService: Partial<UsersService>;
  let pipe: CaptureIdPipe;
  let service: UsersService;
  let users: User[];

  beforeEach(() => {
    pipe = new CaptureIdPipe();
    users = [
      {
        id: 1,
        name: 'Jimmy Johns',
        username: 'JimmyJohns1',
        email: 'email@email.com',
        phone: '1234567890',
      },
      {
        id: 2,
        name: 'Jimmy Johns',
        username: 'JimmyJohns2',
        email: 'email@email.com',
        phone: '1234567890',
      },
      {
        id: 3,
        name: 'Jimmy Johns',
        username: 'JimmyJohns3',
        email: 'email@email.com',
        phone: '1234567890',
      },
    ];
  });

  describe('UsersService using the mocked services', () => {
    beforeEach(() => {
      mockHttpService = {
        get: (url: string) => of(users),
        delete: (url: string) => {
          users = users.filter((user: User) => user.id !== pipe.transform(url));
        },
      };
      mockService = {
        getUsers: () => {
          return mockHttpService.get(`${environment.urls.users}`);
        },
        deleteUser: (id: number) => {
          mockHttpService.delete(`${environment.urls.users}${id}`);
        },
      };
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          UsersService,
          { provide: UsersService, useValue: mockService }
        ],
      });
      service = TestBed.inject(UsersService);
    });
  
    describe('Service Creation', () => {
      it('should be created', () => {
        expect(service).toBeTruthy();
      });
  
      it('should setup service', () => {
        expect(users.length).toBe(3);
      });
    });
  
    describe('Using the mock services created', () => {
      describe('getUsers', () => {
        it('should return an instance of an observable', () => {
          expect(service.getUsers()).toBeInstanceOf(Observable);
        });
    
        it('should expect mock http service to be called', () => {
          let spy = spyOn(mockHttpService, 'get');
          service.getUsers();
          expect(spy).toHaveBeenCalled();
        });
    
        it('should return 3 values', () => {
          service.getUsers().subscribe({
            next: (data: User[]) => {
              expect(data.length).toBe(3);
            },
          });
        });
    
        it('should throw an error', () => {
          service.getUsers = () => {
            throw new Error('error');
          };
          expect(service.getUsers).toThrowError();
        });
      });
    
      describe('deleteUser', () => {
        it('should not remove a user if id is less that 1', () => {
          service.deleteUser(0);
          expect(users.length).toBe(3);
          service.deleteUser(-1);
          expect(users.length).toBe(3);
        });
    
        it('should remove the user associated with the ID passed into the method', () => {
          service.deleteUser(1);
          expect(users.length).toBe(2);
        });
    
        it('should throw an error', () => {
          service.deleteUser = (id: number) => {
            throw new Error('error');
          };
          expect(service.deleteUser).toThrowError();
        });
      });
    });  
  });
  
  describe('UsersService using the jasmine spy http client object', () => {
    beforeEach(() => {
      http = jasmine.createSpyObj(HttpClient, ['delete', 'get']);
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          UsersService,
          { provide: HttpClient, useValue: http }
        ],
      });
      http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
      service = TestBed.inject(UsersService);
    });
  
    describe('Service Creation', () => {
      it('should be created', () => {
        expect(service).toBeTruthy();
      });
  
      it('should setup service', () => {
        expect(users.length).toBe(3);
      });
    });
  
    describe('getUsers', () => {
      beforeEach(() => {
        http.get.and.returnValue(of(users));
      });
    
      it('should return 3 values', () => {
        service.getUsers().subscribe({
          next: (data: User[]) => {
            expect(data).toEqual(users);
            expect(data.length).toBe(3);
          } 
        })
      });
    
      it('should call the http get method', () => {
        service.getUsers();
        expect(http.get).toHaveBeenCalled();
      });
    });
  });
})
