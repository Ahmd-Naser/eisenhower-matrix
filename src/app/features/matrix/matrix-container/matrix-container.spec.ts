import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatrixContainer } from './matrix-container';

describe('MatrixContainer', () => {
  let component: MatrixContainer;
  let fixture: ComponentFixture<MatrixContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(MatrixContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
