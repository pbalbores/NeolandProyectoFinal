import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosNewComponent } from './eventos-new.component';

describe('EventosNewComponent', () => {
  let component: EventosNewComponent;
  let fixture: ComponentFixture<EventosNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
