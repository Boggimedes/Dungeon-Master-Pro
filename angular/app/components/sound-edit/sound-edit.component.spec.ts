import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SoundEditComponent } from "./sound-edit.component";

describe("SoundEditComponent", () => {
  let component: SoundEditComponent;
  let fixture: ComponentFixture<SoundEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoundEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
