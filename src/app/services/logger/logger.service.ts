import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private messages: string[] = [];

  constructor() {}

  /**
   * @description To push a msg to the messages array
   *
   * @function logMessage
   */
  public logMessage(msg: string): void {
    if (msg) {
      this.messages.push(msg);
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
