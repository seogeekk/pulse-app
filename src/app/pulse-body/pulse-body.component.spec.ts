import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PulseBodyComponent } from './pulse-body.component';

describe('PulseBodyComponent', () => {
  let component: PulseBodyComponent;
  let fixture: ComponentFixture<PulseBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PulseBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PulseBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
