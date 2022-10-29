import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatorService]
    });
    service = TestBed.inject(CalculatorService);
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('addTwo', () => {
    it('should add two numbers', () => {
      expect(service.addTwo(1, 1)).toBe(2);
    });
  });

  describe('subtractTwo', () => {
    it('should subtract two numbers', () => {
      expect(service.subtractTwo(2, 1)).toBe(1);
    });
  });

  describe('multiplyTwo', () => {
    it('should multiply two numbers', () => {
      expect(service.multiplyTwo(1, 2)).toBe(2);
    });
  });

  describe('divideTwo', () => {
    it('should divide two numbers', () => {
      expect(service.divideTwo(4, 2)).toBe(2);
    });

    it('should not divide by 0', () => {
      expect(service.divideTwo(2, 0)).toBe(2);
    });
  });
});
