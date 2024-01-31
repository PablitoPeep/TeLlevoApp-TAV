import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomepaPage } from './homepa.page';

describe('HomepaPage', () => {
  let component: HomepaPage;
  let fixture: ComponentFixture<HomepaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomepaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
