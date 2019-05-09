import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculDitineraireComponent } from './calcul-ditineraire.component';

describe('CalculDitineraireComponent', () => {
  let component: CalculDitineraireComponent;
  let fixture: ComponentFixture<CalculDitineraireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculDitineraireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculDitineraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
