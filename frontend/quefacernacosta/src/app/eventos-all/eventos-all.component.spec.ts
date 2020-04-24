import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosAllComponent } from './eventos-all.component';

describe('EventosAllComponent', () => {
  let component: EventosAllComponent;
  let fixture: ComponentFixture<EventosAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
