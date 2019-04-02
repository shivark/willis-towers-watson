import { TestBed } from '@angular/core/testing';

import { PoliciesService } from './policies.service';
import { HttpClient } from '@angular/common/http';

describe('PoliciesService', () => {


  beforeEach(() => {
    const spyHttpClient = jasmine.createSpyObj('httpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        PoliciesService,
        { provide: HttpClient, useValue: spyHttpClient }
      ]
    });
  });

  it('should be created', () => {
    const service: PoliciesService = TestBed.get(PoliciesService);
    expect(service).toBeTruthy();
  });
});
