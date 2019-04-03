import { TestBed } from '@angular/core/testing';

import { PolicyService } from './policy.service';
import { HttpClient } from '@angular/common/http';

describe('PoliciesService', () => {


  beforeEach(() => {
    const spyHttpClient = jasmine.createSpyObj('httpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        PolicyService,
        { provide: HttpClient, useValue: spyHttpClient }
      ]
    });
  });

  it('should be created', () => {
    const service: PolicyService = TestBed.get(PolicyService);
    expect(service).toBeTruthy();
  });
});
