import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditWorldsComponent } from "./edit-worlds.component";

describe("EditWorldsComponent", () => {
  let component: EditWorldsComponent;
  let fixture: ComponentFixture<EditWorldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditWorldsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
