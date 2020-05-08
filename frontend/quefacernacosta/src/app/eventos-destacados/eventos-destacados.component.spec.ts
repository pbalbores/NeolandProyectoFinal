import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosDestacadosComponent } from './eventos-destacados.component';

describe('EventosDestacadosComponent', () => {
  let component: EventosDestacadosComponent;
  let fixture: ComponentFixture<EventosDestacadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosDestacadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosDestacadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
