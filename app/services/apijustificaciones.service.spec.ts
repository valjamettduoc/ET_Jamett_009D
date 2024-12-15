import { TestBed } from '@angular/core/testing';

import { ApijustificacionesService } from './apijustificaciones.service';

describe('ApijustificacionesService', () => {
  let service: ApijustificacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApijustificacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
