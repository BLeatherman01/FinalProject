import { TestBed } from '@angular/core/testing';

import { BingSearchService } from './bing-search.service';

describe('BingSearchService', () => {
  let service: BingSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
