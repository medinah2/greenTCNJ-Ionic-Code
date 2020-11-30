import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectinterestsPage } from './selectinterests.page';

describe('SelectinterestsPage', () => {
  let component: SelectinterestsPage;
  let fixture: ComponentFixture<SelectinterestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectinterestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectinterestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
