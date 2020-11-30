import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuggestmaterialPage } from './suggestmaterial.page';

describe('SuggestmaterialPage', () => {
  let component: SuggestmaterialPage;
  let fixture: ComponentFixture<SuggestmaterialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestmaterialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestmaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
