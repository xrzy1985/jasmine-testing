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
      expect(pipe.transformMessage('james is going to the gym')).toBe('James is going to the gym.');
    });

    it('should return an empty string if an empty value is passed in', () => {
      expect(pipe.transformMessage('')).toBe('');
      expect(pipe.transformMessage(null)).toBe('');
      expect(pipe.transformMessage(undefined)).toBe('');
    });
  })
  
});
