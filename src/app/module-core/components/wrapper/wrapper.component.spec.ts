import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../../module-account/services/auth/auth.service';
import { MockAuthService } from '../../../module-test/mocks/mock-auth.service';

describe('WrapperComponent', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ],
      declarations: [HeaderComponent, WrapperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
