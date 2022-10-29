import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() {}

  /**
   * @description add two numbers
   * 
   * @function addTwo
   */
  public addTwo(x: number, y: number): number {
    return x + y;
  }

  /**
   * @description subtract two numbers
   * 
   * @function subtractTwo
   */
  public subtractTwo(x: number, y: number): number {
    return x - y;
  }

  /**
   * @description multiply two numbers
   * 
   * @function multiplyTwo
   */
  public multiplyTwo(x: number, y: number): number {
    return x * y;
  }
  
  /**
   * @description divide two numbers
   * 
   * @function divideTwo
   * @note Divisor cannot be 0
   */
  public divideTwo(x: number, y: number): number {
    return x / (y > 0 || y < 0 ? y : 1);
  }
}
