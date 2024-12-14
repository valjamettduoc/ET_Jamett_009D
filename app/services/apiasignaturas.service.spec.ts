import { TestBed } from '@angular/core/testing';

import { ApiasignaturasService } from './apiasignaturas.service';

describe('ApidatosService', () => {
  let service: ApiasignaturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiasignaturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

