import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosIndexComponent } from './eventos-index.component';

describe('EventosIndexComponent', () => {
  let component: EventosIndexComponent;
  let fixture: ComponentFixture<EventosIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
