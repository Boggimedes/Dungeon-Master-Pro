import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditSpellsComponent } from "./edit-spells.component";

describe("EditSpellsComponent", () => {
  let component: EditSpellsComponent;
  let fixture: ComponentFixture<EditSpellsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSpellsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
