import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventssPage } from './eventss.page';

describe('EventssPage', () => {
  let component: EventssPage;
  let fixture: ComponentFixture<EventssPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventssPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
