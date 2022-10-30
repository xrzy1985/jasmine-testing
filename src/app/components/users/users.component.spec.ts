import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/users.interface';
import { BehaviorSubject, of, Observable, throwError } from 'rxjs';
import { UsersService } from '../../services/users/users.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  // let mockService: any;
  let spy: any;
  let users: User[];
  let usersServiceStub: UsersService;

  beforeEach(async () => {
    users = [
      {
        id: 1,
        name: 'Jimmy',
        username: 'Johns',
        email: 'email1@email.com',
      },
      {
        id: 2,
        name: 'Johns',
        username: 'Jimmy',
        email: 'email2@email.com',
      },
      {
        id: 3,
        name: 'Jim',
        username: 'John',
        email: 'email3@email.com',
      },
    ];
    // mockService = {
    //   getUsers: () => {
    //     usersServiceStub.getUsers().subscribe({
    //       next: (resp: any) => {
    //         component['users$'].next(resp);
    //       },
    //       error: (err: unknown) => {
    //         console.log(err);
    //       }
    //     });
    //   },
    //   deleteUser: (id: number) => {
    //     component['users$'].next(
    //       component['users$'].getValue().filter((user: User) => user.id !== id)
    //     );
    //     usersServiceStub.deleteUser(id);
    //   }
    // };
    usersServiceStub = jasmine.createSpyObj(UsersService, {
      getUsers: of(users),
      deleteUser: (id: number) => {
        void '';
      }
    });
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: UsersService, useValue: usersServiceStub }],
    }).compileComponents();
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('getUsers', () => {
    it('should get all of the users, expect 3', () => {
      component['users$'].next([]);
      expect(component['users$'].getValue().length).toBe(0);
      component.getUsers();
      expect(component['users$'].getValue().length).toBe(3);
    });

    it('should throw an error', () => {
      usersServiceStub = jasmine.createSpyObj(UsersService, {
        getUsers: () => {
          throw 'error';
        },
      });
      expect(component.getUsers).toThrow();
    });
  });

  describe('deleteUser', () => {
    it('should not remove any elements if ID is 0 or negative', () => {
      component.deleteUser(-1);
      expect(component['users$'].getValue().length).toBe(3);
      component.deleteUser(0);
      expect(component['users$'].getValue().length).toBe(3);
    });

    it('should remove an element if the ID is a valid ID', () => {
      component.deleteUser(1);
      expect(component['users$'].getValue().length).toBe(2);
    });
  });

  describe('returnUsers', () => {
    it('should return an instance of an observable', () => {
      expect(component.returnUsers()).toBeInstanceOf(Observable);
    });

    it('should return a length of 3 from observable', () => {
      const resp = new BehaviorSubject([]);
      component.returnUsers().subscribe((data: any) => {
        resp.next(data);
      });
      expect(resp.getValue().length).toBe(3);
    });
  });
});
