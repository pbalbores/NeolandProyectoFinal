import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosTodayComponent } from './eventos-today.component';

describe('EventosTodayComponent', () => {
  let component: EventosTodayComponent;
  let fixture: ComponentFixture<EventosTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
