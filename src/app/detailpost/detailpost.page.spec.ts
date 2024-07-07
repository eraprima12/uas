import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailpostPage } from './detailpost.page';

describe('DetailpostPage', () => {
  let component: DetailpostPage;
  let fixture: ComponentFixture<DetailpostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailpostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
