import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarComentarioPage } from './editar-comentario.page';

describe('EditarComentarioPage', () => {
  let component: EditarComentarioPage;
  let fixture: ComponentFixture<EditarComentarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarComentarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
