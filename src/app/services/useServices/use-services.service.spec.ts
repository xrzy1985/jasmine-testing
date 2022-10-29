import { TestBed } from '@angular/core/testing';
import { CalculatorService } from '../calculator/calculator.service';
import { LoggerService } from '../logger/logger.service';
import { UseServicesService } from './use-services.service';

describe('UseServicesService', () => {
  let calculatorService: CalculatorService;
  let loggerService: LoggerService;
  let service: UseServicesService;
  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatorService, LoggerService, UseServicesService],
      imports: [],
    });
    calculatorService = TestBed.inject(CalculatorService);
    loggerService = TestBed.inject(LoggerService);
    service = TestBed.inject(UseServicesService);
    spy = spyOn(loggerService, 'logMessage');
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('useCalculatorAdd', () => {
    it('should add two numbers, set them in the variable, and call the logger service', () => {
      service.useCalculatorAdd(1, 2);
      expect(service.twoAddedNumbers).toBe(3);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('useCalculatorSubtract', () => {
    it('should subtract two numbers, set them in the variable, and call the logger service', () => {
      service.useCalculatorSubtract(2, 1);
      expect(service.twoSubtractedNumbers).toBe(1);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('useCalculatorMultiply', () => {
    it('should multiply two numbers, set them in the variable, and call the logger service', () => {
      service.useCalculatorMultiply(2, 1);
      expect(service.twoMultipliedNumbers).toBe(2);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('useCalculatorMultiply', () => {
    it('should divide x by y, set them in the variable, and call the logger service', () => {
      service.useCalculatorDivide(4, 2);
      expect(service.twoDividedNumbers).toBe(2);
      expect(spy).toHaveBeenCalled();
    });
  });
});
