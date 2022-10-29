import { Injectable } from '@angular/core';
import { MessagesPipe } from '../../pipes/messages/messages.pipe';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private messages: string[] = [];

  constructor(private msgPipe: MessagesPipe) {}

  /**
   * @description To push a msg to the messages array
   *
   * @function logMessage
   */
  public logMessage(msg: string): void {
    if (msg) {
      this.messages.push(this.msgPipe.transformMessage(msg));
    }
  }

  /**
   * @description To return the array of messages
   *
   * @function returnMessages
   */
  public returnMessages(): string[] {
    return this.messages;
  }
}
