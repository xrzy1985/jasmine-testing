import { Injectable } from '@angular/core';
import { CalculatorService } from '../calculator/calculator.service';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class UseServicesService {

  public twoAddedNumbers = 0;
  public twoSubtractedNumbers = 0;
  public twoMultipliedNumbers = 0;
  public twoDividedNumbers = 0;

  constructor(private calculatorService: CalculatorService, private loggerService: LoggerService) {}

  public useCalculatorAdd(x: number, y: number): void {
    this.twoAddedNumbers = this.calculatorService.addTwo(x, y);
    this.loggerService.logMessage(`${x} and ${y} were added together`);
  }

  public useCalculatorSubtract(x: number, y: number): void {
    this.twoSubtractedNumbers = this.calculatorService.subtractTwo(x, y);
    this.loggerService.logMessage(`${y} was subtracted from ${x}`);
  }

  public useCalculatorMultiply(x: number, y: number): void {
    this.twoMultipliedNumbers = this.calculatorService.multiplyTwo(x, y);
    this.loggerService.logMessage(`${x} and ${y} were multiplied`);
  }

  public useCalculatorDivide(x: number, y: number): void {
    this.twoDividedNumbers = this.calculatorService.divideTwo(x, y);
    this.loggerService.logMessage(`${x} was divided by ${y}`);
  }
}
