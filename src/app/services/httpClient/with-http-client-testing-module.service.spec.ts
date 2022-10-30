import { TestBed } from '@angular/core/testing';
import { WithHttpClientTestingModuleService } from './with-http-client-testing-module.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

fdescribe('WithHttpClientTestingModuleService', () => {
  let controller: HttpTestingController;
  let http: HttpClient;
  let id: number = 1;
  let url: string = environment.urls.posts;
  let urls: Record<string, string> = {
    delete: `${url}${id}`,
    get: `${url}`
  };
  let service: WithHttpClientTestingModuleService;
  interface Data {
    test: boolean;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    controller = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(WithHttpClientTestingModuleService);
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })

  it('should behave...', () => {
    let spy = spyOn(http, 'get');
    service.getPosts();
    expect(http.get).toHaveBeenCalled();
  });

  it('should', () => {
    let data: Data = { test: true };
    http.get<Data>(urls['get']).subscribe({
      next: (resp: Data) => {
        expect(Object.keys(resp).length).toBe(1);
        expect(Object.keys(resp)[0]).toBe('test');
        expect(resp).toEqual(data);
        expect(resp.test).toBeTrue();
      }
    });
    const req = controller.expectOne(urls['get']);
    req.flush({ test: true });
    expect(req.request.method).toBe('GET');
  });

  it('should throw an error', () => {
    http.delete<any>(urls['delete']).subscribe({
      next: (resp: any) => {
        expect(resp).toBeTruthy();
        expect(resp.status).toBe(404);
        expect(resp.error).toEqual('This is a thrown error.');
      }
    });
    let req = controller.expectOne(urls['delete']);
    req.flush({ status: 404, error: 'This is a thrown error.' });
    expect(req.request.method).toBe('DELETE');
  });
  
});
