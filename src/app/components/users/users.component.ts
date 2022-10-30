import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/users.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private users$: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * @description To retrieve the users, and store them in the users$ variable
   * 
   * @function getUsers
   */
  public getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users$.next(users);
      },
      error: (err: unknown) => {
        console.error(err);
      },
      complete: () => {
        console.log('Completed operation', this.users$.getValue());
      }
    });
  }

  /**
   * @description To remove the user from the local variable, and delete from the DB
   * 
   * @function deleteUser
   */
  public deleteUser(id: number): void {
    if (id !== undefined || id !== null) {
      this.users$.next(this.users$.getValue().filter((u: User) => u.id !== id));
      this.usersService.deleteUser(id);
    }
  }

  /**
   * @description To remove the list of users
   * 
   * @function deleteUser
   * @type Observable<User[]>
   */
  public returnUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

}
