import { TestBed } from '@angular/core/testing';

import { ApiasistenciaService } from './apiasistencia.service';

describe('ApiasistenciaService', () => {
  let service: ApiasistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiasistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
