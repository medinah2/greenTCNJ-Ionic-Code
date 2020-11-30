import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhatgoeswherePage } from './whatgoeswhere.page';

describe('WhatgoeswherePage', () => {
  let component: WhatgoeswherePage;
  let fixture: ComponentFixture<WhatgoeswherePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatgoeswherePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhatgoeswherePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
