import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import { Todos } from '../../models/todos.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CaptureIdPipe } from '../../pipes/captureId/capture-id.pipe';

describe('TodosService', () => {
  let mockHttpService: any;
  let mockService: Partial<TodosService>;
  let pipe: CaptureIdPipe;
  let service: TodosService;
  let todos: Todos[];

  beforeEach(() => {
    pipe = new CaptureIdPipe();
    todos = [
      {
        completed: true,
        id: 1,
        title: 'Todo 1',
        userId: 1,
      },
      {
        completed: true,
        id: 2,
        title: 'Todo 2',
        userId: 2,
      },
      {
        completed: true,
        id: 3,
        title: 'Todo 3',
        userId: 3,
      },
    ];
    mockHttpService = {
      get: (url: string) => of(todos),
      delete: (url: string) => {
        todos = todos.filter((todo: Todos) => todo.id !== pipe.transform(url));
      },
    };
    mockService = {
      getTodos: () => mockHttpService.get(`${environment.urls.todos}`),
      deleteTodo: (id: number) => {
        mockHttpService.delete(`${environment.urls.todos}${id}`);
      },
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: TodosService, useValue: mockService }],
    });
    service = TestBed.inject(TodosService);
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should setup service', () => {
      expect(todos.length).toBe(3);
    });
  });

  describe('getTodos', () => {
    it('should return an observable of todos', () => {
      expect(service.getTodos()).toBeInstanceOf(Observable);
    });

    it('should call the mock http service', () => {
      let spy = spyOn(mockHttpService, 'get');
      service.getTodos();
      expect(spy).toHaveBeenCalled();
    });

    it('should expect the behavior subject to have 3 elements ', () => {
      service.getTodos().subscribe({
        next: (data: Todos[]) => {
          expect(data.length).toBe(3);
        },
      });
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo with specific ID', () => {
      service.deleteTodo(1);
      service.getTodos().subscribe((data: Todos[]) => {
        expect(todos.length).toBe(2);
      });
    });

    it('should not remove an element with an id of 0 or a negative id', () => {
      service.deleteTodo(0);
      service.getTodos().subscribe((data: Todos[]) => {
        expect(todos.length).toBe(3);
      });
      service.deleteTodo(-1);
      service.getTodos().subscribe((data: Todos[]) => {
        expect(todos.length).toBe(3);
      });
    });

    it('should throw an error', () => {
      service.deleteTodo = (id: number) => {
        throw 'error';
      };
      expect(service.deleteTodo).toThrow();
    });
  });
});
