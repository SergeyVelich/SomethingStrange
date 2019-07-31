import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputButtonClearComponent } from './input-button-clear.component';

describe('InputButtonClearComponent', () => {
  let component: InputButtonClearComponent;
  let fixture: ComponentFixture<InputButtonClearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputButtonClearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputButtonClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
