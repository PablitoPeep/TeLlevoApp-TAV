import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajespaPage } from './viajespa.page';

describe('ViajespaPage', () => {
  let component: ViajespaPage;
  let fixture: ComponentFixture<ViajespaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViajespaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
