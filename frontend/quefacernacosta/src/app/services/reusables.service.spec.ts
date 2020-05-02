import { TestBed } from '@angular/core/testing';

import { ReusablesService } from './reusables.service';

describe('ReusablesService', () => {
  let service: ReusablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReusablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
