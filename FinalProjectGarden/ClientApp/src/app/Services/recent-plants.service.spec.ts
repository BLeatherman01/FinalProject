import { TestBed } from '@angular/core/testing';

import { RecentPlantsService } from './recent-plants.service';

describe('RecentPlantsService', () => {
  let service: RecentPlantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentPlantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
