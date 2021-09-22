import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-story",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.scss"],
})
export class StoryComponent implements OnInit, AfterViewInit {
  public style: object = {};
  @ViewChild("map") map: ElementRef;
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
  public mapArray = [0.3, 0.6, 1, 2, 3, 5, 7.5, 10, 15, 20];
  currentX = 0;
  currentY = 0;

  constructor() {}

  zoom = (event) => {
    console.log(event);
    this.mapScale = Date.now() * -event.deltaY;
  }

  ngOnInit(): void {
    this.mapImg = {};
    this.mapImg.id = 3;
  }

  ngAfterViewInit(): void {}
}
