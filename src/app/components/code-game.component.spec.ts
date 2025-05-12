import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeGameComponen } from './code-game.component';

describe('CodeGameComponent', () => {
  let component: CodeGameComponen;
  let fixture: ComponentFixture<CodeGameComponen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeGameComponen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeGameComponen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
