import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'captureId',
})
export class CaptureIdPipe implements PipeTransform {
  transform(url: string): number {
    let index = url.lastIndexOf('/');
    let str = url.substring((index === (url.length - 1) ? -1 : index) + 1);
    let num = parseInt(/^[0-9]+$/.test(str) ? str : '0');
    return url ? num >= 0 ? num : 0 : 0;
  }
}
