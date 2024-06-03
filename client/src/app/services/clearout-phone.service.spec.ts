import { TestBed } from '@angular/core/testing';

import { ClearoutPhoneService } from './clearout-phone.service';

describe('ClearoutPhoneService', () => {
  let service: ClearoutPhoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClearoutPhoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
