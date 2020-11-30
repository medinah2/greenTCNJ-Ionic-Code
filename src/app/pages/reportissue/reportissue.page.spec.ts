import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportissuePage } from './reportissue.page';

describe('ReportissuePage', () => {
  let component: ReportissuePage;
  let fixture: ComponentFixture<ReportissuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportissuePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportissuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
