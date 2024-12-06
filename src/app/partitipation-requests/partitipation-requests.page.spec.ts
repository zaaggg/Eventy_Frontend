import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartitipationRequestsPage } from './partitipation-requests.page';

describe('PartitipationRequestsPage', () => {
  let component: PartitipationRequestsPage;
  let fixture: ComponentFixture<PartitipationRequestsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PartitipationRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
