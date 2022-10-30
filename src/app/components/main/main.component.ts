import { Component, OnInit } from '@angular/core';
import { MessagesPipe } from '../../pipes/messages/messages.pipe';
import { User } from '../../models/users.interface';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-main',
  template: `{{ phrase }}`,
  styleUrls: ['./main.component.scss'],
  providers: [ MessagesPipe ],
})
export class MainComponent implements OnInit {
  phrase: string;

  constructor(private messages: MessagesPipe, private users: UsersService) {
    this.phrase = this.messages.transformMessage(
      'this is another phrase passed through a pipe from the component file'
    );
  }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers() {}

  public deleteUsers(user: User) {}
}
