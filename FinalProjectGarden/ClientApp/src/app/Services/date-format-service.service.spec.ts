import { TestBed } from '@angular/core/testing';

import { DateFormatServiceService } from './date-format-service.service';

describe('DateFormatServiceService', () => {
  let service: DateFormatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateFormatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
