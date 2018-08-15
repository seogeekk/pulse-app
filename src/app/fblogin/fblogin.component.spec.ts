import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FBLoginComponent } from './fblogin.component';

describe('FBLoginComponent', () => {
  let component: FBLoginComponent;
  let fixture: ComponentFixture<FBLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FBLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FBLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
