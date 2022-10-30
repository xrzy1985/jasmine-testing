import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Todos } from '../../models/todos.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) {}

  /**
   * @description To return an observable of an array of Todos
   * 
   * @function getTodos
   */
   public getTodos(): Observable<any> {
    return this.http.get(`${environment.urls.todos}`);
  }

  /**
   * @description To delete a todo, given an id
   * 
   * @function deleteTodo
   */
  public deleteTodo(id: number): void {
    this.http.delete(`${environment.urls.todos}${id}`);
  }
}

