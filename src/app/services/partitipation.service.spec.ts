import { TestBed } from '@angular/core/testing';

import { PartitipationService } from './partitipation.service';

describe('PartitipationService', () => {
  let service: PartitipationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartitipationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
