import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetPasswordEmailSentPage } from './reset-password-email-sent.page';

describe('ResetPasswordEmailSentPage', () => {
  let component: ResetPasswordEmailSentPage;
  let fixture: ComponentFixture<ResetPasswordEmailSentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordEmailSentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordEmailSentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
