import { TestBed } from '@angular/core/testing';

import { SearchedImagesService } from './searched-images.service';

describe('SearchedImagesService', () => {
  let service: SearchedImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchedImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
