import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messages'
})
export class MessagesPipe implements PipeTransform {

  transform(): void { void true; }

  public transformValue(value: string): string {
    return !value ? '' : value.charAt(0).toUpperCase() + value.slice(1);
  }

  public transformMessage(msg: string): string {
    return !msg ? '' : `${msg.charAt(0).toUpperCase()}${msg.slice(1)}.`;
  }

}
