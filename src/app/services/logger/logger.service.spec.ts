import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import { MessagesPipe } from '../../pipes/messages/messages.pipe';

describe('LoggerService', () => {
  let messagesPipe: MessagesPipe;
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService, MessagesPipe],
    });
    messagesPipe = TestBed.inject(MessagesPipe);
    service = TestBed.inject(LoggerService);
  });

  describe('Logger Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should not have any messages in the messages array', () => {
      expect(service['messages'].length).toBeLessThan(1);
    });
  });

  describe('clearMessages', () => {
    it('should clear out the messages array', () => {
      service.logMessage('A message');
      service.clearMessages();
      expect(service.returnMessages().length).toBe(0);
    });
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
  });
});
