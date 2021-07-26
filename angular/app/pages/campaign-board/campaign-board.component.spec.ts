import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignBoardComponent } from './campaign-board.component';

describe('CampaignBoardComponent', () => {
  let component: CampaignBoardComponent;
  let fixture: ComponentFixture<CampaignBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
