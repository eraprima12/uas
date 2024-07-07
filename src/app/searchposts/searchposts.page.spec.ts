import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchpostsPage } from './searchposts.page';

describe('SearchpostsPage', () => {
  let component: SearchpostsPage;
  let fixture: ComponentFixture<SearchpostsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchpostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
