import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguracionPerfilPage } from './configuracion-perfil.page';

describe('ConfiguracionPerfilPage', () => {
  let component: ConfiguracionPerfilPage;
  let fixture: ComponentFixture<ConfiguracionPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
