import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcBoardComponent } from './npc-board.component';

describe('NpcBoardComponent', () => {
  let component: NpcBoardComponent;
  let fixture: ComponentFixture<NpcBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpcBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpcBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
