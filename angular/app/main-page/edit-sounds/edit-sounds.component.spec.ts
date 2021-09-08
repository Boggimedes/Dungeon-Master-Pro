import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditSoundsComponent } from "./edit-sounds.component";

describe("EditSoundsComponent", () => {
  let component: EditSoundsComponent;
  let fixture: ComponentFixture<EditSoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSoundsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
