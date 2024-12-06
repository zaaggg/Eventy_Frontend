import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyPartitipationsPage } from './my-partitipations.page';

describe('MyPartitipationsPage', () => {
  let component: MyPartitipationsPage;
  let fixture: ComponentFixture<MyPartitipationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPartitipationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
