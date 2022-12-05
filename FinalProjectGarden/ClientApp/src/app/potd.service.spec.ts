import { TestBed } from '@angular/core/testing';

import { POTDService } from './potd.service';

describe('POTDService', () => {
  let service: POTDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(POTDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
