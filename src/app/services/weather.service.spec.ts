import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  // Minimal mock that matches the WeatherResponse interface
  const mockWeatherResponse = {
    name: 'Baguio City',
    dt: 1700000000,
    main: {
      temp: 18.5,
      feels_like: 17.2,
      humidity: 83,
      pressure: 1014,
      temp_min: 16.0,
      temp_max: 20.1
    },
    weather: [{ id: 741, main: 'Fog', description: 'light fog', icon: '50d' }],
    wind: { speed: 2.5, deg: 180 },
    visibility: 5000,
    sys: { country: 'PH', sunrise: 1700000000, sunset: 1700050000 }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifies no unexpected HTTP requests were made
    httpMock.verify();
  });

  // Test 1: Service is injectable
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test 2: Successful HTTP GET returns correct weather data
  it('should fetch weather data for Baguio City coordinates and return correct temperature', () => {
    service.getWeatherByCoordinates().subscribe(data => {
      expect(data.name).toBe('Baguio City');
      expect(data.main.temp).toBe(18.5);
      expect(data.main.humidity).toBe(83);
      expect(data.weather[0].description).toBe('light fog');
    });

    const req = httpMock.expectOne(r =>
      r.url.includes('/weather') && r.params.get('lat') === '16.4023'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockWeatherResponse);
  });

  // Test 3: catchError transforms HTTP errors into user-friendly messages
  it('should handle API errors and return a user-friendly error message via catchError', () => {
    service.getWeatherByCoordinates().subscribe({
      next: () => fail('Expected an error to be thrown'),
      error: (err: Error) => {
        expect(err.message).toContain('Could not load weather data');
      }
    });

    const req = httpMock.expectOne(r => r.url.includes('/weather'));
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });
});