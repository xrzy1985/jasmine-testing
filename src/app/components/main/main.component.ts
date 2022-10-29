import { Component, OnInit } from '@angular/core';
import { MessagesPipe } from '../../pipes/messages/messages.pipe';

@Component({
  selector: 'app-main',
  template: `{{ phrase }}`,
  styleUrls: ['./main.component.scss'],
  providers: [ MessagesPipe ],
})
export class MainComponent implements OnInit {
  phrase: string;

  constructor(private messages: MessagesPipe) {
    this.phrase = this.messages.transformMessage(
      'this is another phrase passed through a pipe from the component file'
    );
  }

  ngOnInit() {}
}
