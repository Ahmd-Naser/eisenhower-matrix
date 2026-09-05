import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Quadrant } from './quadrant';

describe('Quadrant', () => {
  let component: Quadrant;
  let fixture: ComponentFixture<Quadrant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quadrant],
    }).compileComponents();

    fixture = TestBed.createComponent(Quadrant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
