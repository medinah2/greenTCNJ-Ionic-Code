import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaterialSpecsPage } from './material-specs.page';

describe('MaterialSpecsPage', () => {
  let component: MaterialSpecsPage;
  let fixture: ComponentFixture<MaterialSpecsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialSpecsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialSpecsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
