import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msgPipe'
})
export class MessagesPipe implements PipeTransform {

  transform(value: string, bool?: boolean): string {
    return bool ? this.transformMessage(value) : this.transformValue(value);
  }

  public transformValue(value: string): string {
    return !value ? '' : value.charAt(0).toUpperCase() + value.slice(1);
  }

  public transformMessage(msg: string): string {
    return !msg ? '' : `${msg.charAt(0).toUpperCase()}${msg.slice(1)}.`;
  }

}
