import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRestauranteComponent } from './list-restaurante.component';

describe('ListRestauranteComponent', () => {
  let component: ListRestauranteComponent;
  let fixture: ComponentFixture<ListRestauranteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRestauranteComponent]
    });
    fixture = TestBed.createComponent(ListRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
