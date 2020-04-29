import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosChildrenComponent } from './eventos-children.component';

describe('EventosChildrenComponent', () => {
  let component: EventosChildrenComponent;
  let fixture: ComponentFixture<EventosChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
