import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdenComponent } from './list-orden.component';

describe('ListOrdenComponent', () => {
  let component: ListOrdenComponent;
  let fixture: ComponentFixture<ListOrdenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOrdenComponent]
    });
    fixture = TestBed.createComponent(ListOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
