import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSoundComponent } from './edit-sound.component';

describe('EditSoundComponent', () => {
  let component: EditSoundComponent;
  let fixture: ComponentFixture<EditSoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
