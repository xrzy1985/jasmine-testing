import { CaptureIdPipe } from './capture-id.pipe';
import { environment } from '../../../environments/environment';

describe('CaptureIdPipe', () => {
  let pipe: CaptureIdPipe;

  beforeEach(() => {
    pipe = new CaptureIdPipe();
  });

  describe('Pipe Creation', () => {
    it('create an instance', () => {
      expect(pipe).toBeTruthy();
    });
  });

  describe('transform', () => {
    it('should return a number from a valid url', () => {
      expect(pipe.transform(`${environment.urls.users}${1}`)).toBe(1);
      expect(pipe.transform(`${environment.urls.users}${10}`)).toBe(10);
      expect(pipe.transform(`${environment.urls.users}${123456789}`)).toBe(
        123456789
      );
    });

    it('should return 0 if no number is present', () => {
      expect(pipe.transform(`${environment.urls.users}`)).toBe(0);
    });

    it('should return 0 if a negative number is used in the url', () => {
      expect(pipe.transform(`${environment.urls.users}${-1}`)).toBe(0);
    });

    it('should return 0 if a string follows the last index of /', () => {
      expect(pipe.transform(`${environment.urls.users}james`)).toBe(0);
    });
  });
});
