import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TambolaTicketsComponent } from './tambola-tickets.component';

describe('TambolaTicketsComponent', () => {
  let component: TambolaTicketsComponent;
  let fixture: ComponentFixture<TambolaTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TambolaTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TambolaTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
