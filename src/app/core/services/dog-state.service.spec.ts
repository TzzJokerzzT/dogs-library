import { TestBed } from '@angular/core/testing';

import { DogStateService } from './dog-state.service';

describe('DogStateService', () => {
  let service: DogStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
