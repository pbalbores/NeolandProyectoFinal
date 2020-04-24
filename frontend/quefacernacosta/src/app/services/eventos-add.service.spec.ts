import { TestBed } from '@angular/core/testing';

import { EventosAddService } from './eventos-add.service';

describe('EventosAddService', () => {
  let service: EventosAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventosAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
