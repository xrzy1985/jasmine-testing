import { MessagesPipe } from './messages.pipe';

describe('MessagesPipe', () => {
  let pipe: any;

  beforeEach(() => {
    pipe = new MessagesPipe();
  });

  describe('Message Pipe Creation', () => {
    it('create an instance', () => {
      expect(pipe).toBeTruthy();
    });
  });

  describe('transform', () => {
    it('should call transformMessage', () => {
      expect(pipe.transform('this is a msg', true)).toBe('This is a msg.');
    });

    it('should call transformValue', () => {
      expect(pipe.transform('this is a msg')).toBe('This is a msg');
      expect(pipe.transform('this is a msg', false)).toBe('This is a msg');
      expect(pipe.transform('this is a msg', null)).toBe('This is a msg');
      expect(pipe.transform('this is a msg', undefined)).toBe('This is a msg');
    });
  });

  describe('transformValue', () => {
    it('should capitalize the first letter of the string value', () => {
      expect(pipe.transformValue('james')).toBe('James');
    });

    it('should return an empty string if an empty value is passed into the method', () => {
      expect(pipe.transformValue('')).toBe('');
      expect(pipe.transformValue(null)).toBe('');
      expect(pipe.transformValue(undefined)).toBe('');
    });
  });

  describe('transformMessage', () => {
    it('should capitalize the first word of the message and add a period to the end', () => {
      expect(pipe.transformMessage('james is going to the gym')).toBe(
        'James is going to the gym.'
      );
      expect(pipe.transformMessage('this is a msg')).toBe('This is a msg.');
    });

    it('should return an empty string if an empty value is passed in', () => {
      expect(pipe.transformMessage('')).toBe('');
      expect(pipe.transformMessage(null)).toBe('');
      expect(pipe.transformMessage(undefined)).toBe('');
    });
  });
});
