import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OlvidarContraPage } from './olvidar-contra.page';

describe('OlvidarContraPage', () => {
  let component: OlvidarContraPage;
  let fixture: ComponentFixture<OlvidarContraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvidarContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
