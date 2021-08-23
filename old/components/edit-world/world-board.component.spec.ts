import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldBoardComponent } from './world-board.component';

describe('WorldBoardComponent', () => {
  let component: WorldBoardComponent;
  let fixture: ComponentFixture<WorldBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
