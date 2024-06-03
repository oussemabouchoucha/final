import { TestBed } from '@angular/core/testing';

import { ClearoutService } from './clearout.service';

describe('ClearoutService', () => {
  let service: ClearoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClearoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
