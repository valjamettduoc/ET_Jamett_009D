import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrgeneradosPage } from './qrgenerados.page';

describe('QrgeneradosPage', () => {
  let component: QrgeneradosPage;
  let fixture: ComponentFixture<QrgeneradosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrgeneradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
