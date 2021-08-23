import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit, AfterViewInit {
  public style: object = {};
  @ViewChild('map') map: ElementRef;
  public mapBox = true;
  public npcBox = false;
  public timeBox = false;
  public mapImg;
  public startingMapHeight;
  public startingMapWidth;
  public faBookOpen = faBookOpen;
  faUserFriends = faUserFriends;
  faCogs = faCogs;
  faHourglassHalf = faHourglassHalf;
  public mapScale = 1;
  public mapArray = [0.1, 0.2, 0.5, 1, 1.25, 1.6, 2];
  currentX = 0;
  currentY = 0;

  constructor() {

   }

ngOnInit(): void {
    this.mapImg = {};
    this.mapImg.id = 3;
  }

  ngAfterViewInit(): void {

  }
}


