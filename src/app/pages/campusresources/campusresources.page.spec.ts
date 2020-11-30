import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CampusresourcesPage } from './campusresources.page';

describe('CampusresourcesPage', () => {
  let component: CampusresourcesPage;
  let fixture: ComponentFixture<CampusresourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusresourcesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CampusresourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
