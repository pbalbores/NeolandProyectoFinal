import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosFilterComponent } from './eventos-filter.component';

describe('EventosFilterComponent', () => {
  let component: EventosFilterComponent;
  let fixture: ComponentFixture<EventosFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
