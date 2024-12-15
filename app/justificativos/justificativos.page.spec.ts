import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JustificativosPage } from './justificativos.page';

describe('JustificativosPage', () => {
  let component: JustificativosPage;
  let fixture: ComponentFixture<JustificativosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificativosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
