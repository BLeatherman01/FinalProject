import { TestBed } from '@angular/core/testing';

import { SearchedPlantService } from './searched-plant.service';

describe('SearchedPlantService', () => {
  let service: SearchedPlantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchedPlantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
