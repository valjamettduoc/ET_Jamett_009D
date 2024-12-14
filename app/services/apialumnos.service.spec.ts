import { TestBed } from '@angular/core/testing';

import { ApialumnosService } from './apialumnos.service';

describe('ApialumnosService', () => {
  let service: ApialumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApialumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
