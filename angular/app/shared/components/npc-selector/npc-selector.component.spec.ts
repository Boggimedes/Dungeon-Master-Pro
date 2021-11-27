import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcSelectorComponent } from './npc-selector.component';

describe('NpcSelectorComponent', () => {
  let component: NpcSelectorComponent;
  let fixture: ComponentFixture<NpcSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpcSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpcSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
