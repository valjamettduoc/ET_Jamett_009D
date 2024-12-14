import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JustificarAsistenciaPage } from './justificar-asistencia.page';

describe('JustificarAsistenciaPage', () => {
  let component: JustificarAsistenciaPage;
  let fixture: ComponentFixture<JustificarAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificarAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
