import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEffectComponent } from './edit-effect.component';

describe('EditEffectComponent', () => {
  let component: EditEffectComponent;
  let fixture: ComponentFixture<EditEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEffectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
