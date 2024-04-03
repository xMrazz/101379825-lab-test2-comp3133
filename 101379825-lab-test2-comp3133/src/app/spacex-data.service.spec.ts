import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpacexDataService } from './spacex-data.service';
import { Mission } from './models/mission';

describe('SpacexDataService', () => {
  let service: SpacexDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpacexDataService]
    });
    service = TestBed.inject(SpacexDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all launches', () => {
    const dummyLaunches: Mission[] = [
      {
        mission_name: 'Test Mission 1',
        launch_year: '2020',
        details: 'Details here',
        mission_patch_small: 'image.jpg',
        flight_number: 1,
        rocket: {
          rocket_id: 'falcon1',
          rocket_name: 'Falcon 1',
          rocket_type: 'Merlin A',
          first_stage: {
            cores: []
          } 
        },
      },
    ];

    service.getLaunches().subscribe(launches => {
      expect(launches.length).toBe(dummyLaunches.length);
      expect(launches).toEqual(dummyLaunches);
    });

    const request = httpMock.expectOne(service['apiUrl']);
    expect(request.request.method).toBe('GET');
    request.flush(dummyLaunches);
  });
});