import { TestBed } from '@angular/core/testing';

import { MyGardenService } from './my-garden.service';

describe('MyGardenService', () => {
  let service: MyGardenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyGardenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
