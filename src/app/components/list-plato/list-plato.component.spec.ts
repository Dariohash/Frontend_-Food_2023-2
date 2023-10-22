import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlatoComponent } from './list-plato.component';

describe('ListPlatoComponent', () => {
  let component: ListPlatoComponent;
  let fixture: ComponentFixture<ListPlatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPlatoComponent]
    });
    fixture = TestBed.createComponent(ListPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
