import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNpcsComponent } from './edit-npcs.component';

describe('EditNpcsComponent', () => {
  let component: EditNpcsComponent;
  let fixture: ComponentFixture<EditNpcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNpcsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNpcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
