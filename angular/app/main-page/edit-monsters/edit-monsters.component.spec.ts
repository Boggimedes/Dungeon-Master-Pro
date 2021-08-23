import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMonstersComponent } from './edit-monsters.component';

describe('EditMonstersComponent', () => {
  let component: EditMonstersComponent;
  let fixture: ComponentFixture<EditMonstersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMonstersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMonstersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
