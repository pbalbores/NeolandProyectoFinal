import { TestBed } from '@angular/core/testing';

import { EventosAllService } from './eventos-all.service';

describe('EventosAllService', () => {
  let service: EventosAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventosAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
