import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    });
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('logMessage', () => {
    it('should push a message to the messages array', () => {
      service.logMessage('this is a message');
      expect(service.returnMessages().length).toBe(1);
    });
  });

  describe('returnMessages', () => {
    it('should return an empty array', () => {
      expect(service.returnMessages().length).toBe(0);
    });

    it('should return an empty array if a empty string is pushed', () => {
      service.logMessage('');
      expect(service.returnMessages().length).toBe(0);
    });

    it('should return 1 if we push 1 message to the messages array', () => {
      service.logMessage('This is the only message');
      expect(service.returnMessages().length).toBe(1);
    });
  })
  
  
});
