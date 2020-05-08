import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourHundredFourComponent } from './four-hundred-four.component';

describe('FourHundredFourComponent', () => {
  let component: FourHundredFourComponent;
  let fixture: ComponentFixture<FourHundredFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourHundredFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourHundredFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
