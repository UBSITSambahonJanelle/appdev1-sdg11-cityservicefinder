

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherWidgetComponent } from './weather-widget.component';
import { WeatherService } from '../../services/weather.service';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { WeatherResponse } from '../../models/weather';


const mockWeather: WeatherResponse = {
  name: 'Baguio City',
  dt: 1714000000,
  main: { temp: 16, feels_like: 14, humidity: 78, pressure: 1015, temp_min: 14, temp_max: 18 },
  weather: [{ id: 801, main: 'Clouds', description: 'light fog', icon: '02d' }],
  wind: { speed: 1.4, deg: 270 },
  visibility: 8000,
  sys: { country: 'PH', sunrise: 1713995000, sunset: 1714040000 },
};

describe('WeatherWidgetComponent', () => {
  let component: WeatherWidgetComponent;
  let fixture: ComponentFixture<WeatherWidgetComponent>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    mockWeatherService = jasmine.createSpyObj('WeatherService', ['getWeatherByCoordinates']);
    mockWeatherService.getWeatherByCoordinates.and.returnValue(of(mockWeather));

    await TestBed.configureTestingModule({
      imports: [WeatherWidgetComponent],
      providers: [
        provideHttpClient(),
        { provide: WeatherService, useValue: mockWeatherService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call WeatherService.getWeatherByCoordinates() on init', () => {
    expect(mockWeatherService.getWeatherByCoordinates).toHaveBeenCalled();
  });

  it('should render the BAGUIO CITY location label', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('BAGUIO CITY');
  });

  it('should set loadError when service throws', () => {
    mockWeatherService.getWeatherByCoordinates.and.returnValue(
      throwError(() => new Error('API key invalid'))
    );
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.loadError).toBe('API key invalid');
  });
});
