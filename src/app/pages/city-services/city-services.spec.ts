import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityServices } from './city-services';

describe('CityServices', () => {
  let component: CityServices;
  let fixture: ComponentFixture<CityServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityServices],
    }).compileComponents();

    fixture = TestBed.createComponent(CityServices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
