import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TambolaLogicComponent } from './tambola-logic.component';

describe('TambolaLogicComponent', () => {
  let component: TambolaLogicComponent;
  let fixture: ComponentFixture<TambolaLogicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TambolaLogicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TambolaLogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
