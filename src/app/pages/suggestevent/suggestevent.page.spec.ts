import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuggesteventPage } from './suggestevent.page';

describe('SuggesteventPage', () => {
  let component: SuggesteventPage;
  let fixture: ComponentFixture<SuggesteventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggesteventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuggesteventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
