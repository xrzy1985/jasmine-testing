import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strength',
})
export class StrengthPipe implements PipeTransform {
  public transform(value: number): string {
    return value < 10
      ? `${value} is weak`
      : value > 10 && value < 20
      ? `${value} is strong`
      : `${value} is strongest`;
  }
}
