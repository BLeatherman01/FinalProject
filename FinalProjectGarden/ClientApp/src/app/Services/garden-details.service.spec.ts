import { TestBed } from '@angular/core/testing';

import { GardenDetailsService } from './garden-details.service';

describe('GardenDetailsService', () => {
  let service: GardenDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardenDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
