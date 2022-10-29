import { StrengthPipe } from './strength.pipe';

describe('Strength Pipe', () => {
  let pipe: any;
  let value: number;
  
  beforeAll(() => {
    pipe = new StrengthPipe();
  });

  describe('StrengthPipe Creation', () => {
    it('create an instance', () => {
      expect(pipe).toBeTruthy();
    });
  });
  
  describe('', () => {
    it('should expect weak to be returned from pipe', () => {
      expect(pipe.transform(5)).toContain('weak');
    });

    it('should expect strong to be returned from pipe', () => {
      value = 15;
      expect(pipe.transform(value)).toBe(`${value} is strong`);
    });

    it('should expect strongest to be returned from pipe', () => {
      value = 25;
      expect(pipe.transform(value)).toContain(`is strongest`);
    });
  });
})


