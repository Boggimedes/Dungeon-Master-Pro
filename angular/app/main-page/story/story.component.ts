import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
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
  encapsulation: ViewEncapsulation.None,
})
export class StoryComponent implements OnInit, AfterViewInit {
  public mapBox = false;
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
  private _population = 0;
  public editPop = false;
  currentX = 0;
  currentY = 0;
  selectedMapMarker: any = {};
  set population(population) {
    this._population =
      population /
      (this.selectedMapMarker.populationRate *
        this.selectedMapMarker.urbanization);
  }
  get population() {
    return (
      this._population *
      this.selectedMapMarker.populationRate *
      this.selectedMapMarker.urbanization
    );
  }
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  mapClicked = (marker) => {
    console.log(marker);
    this.selectedMapMarker = { type: marker.type, ...marker.data };
    this.mapBox = true;
    if (marker.type == "burg") {
      this._population = this.selectedMapMarker.population;
    }
    if (marker.type == "dungeons") {
    }
    if (marker.type == "ruins") {
    }
    if (marker.type == "statues") {
    }
    if (marker.type == "brigands") {
    }
    if (marker.type == "volcanoes") {
    }
    if (marker.type == "mines") {
    }
    if (marker.type == "inns") {
    }
    if (marker.type == "pirates") {
    }
    if (marker.type == "lake-monsters") {
    }
    if (marker.type == "sea-monsters") {
    }
    if (marker.type == "hill-monsters") {
    }
    if (marker.type == "waterfalls") {
    }
    if (marker.type == "lighthouses") {
    }
  };
}
