import { TestBed } from '@angular/core/testing';

import { VerifyClientService } from './verify-client.service';

describe('VerifyClientService', () => {
  let service: VerifyClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
