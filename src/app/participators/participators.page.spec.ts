import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipatorsPage } from './participators.page';

describe('ParticipatorsPage', () => {
  let component: ParticipatorsPage;
  let fixture: ComponentFixture<ParticipatorsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipatorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
