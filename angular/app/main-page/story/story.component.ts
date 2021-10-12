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
  selectedBurg: any = {};
  set population(population) {
    this._population = population / (this.selectedBurg.populationRate * this.selectedBurg.urbanization);
  }
  get population() {
    return this._population * this.selectedBurg.populationRate * this.selectedBurg.urbanization
  }
    constructor() {

}

  ngOnInit(): void {

  }



ngAfterViewInit(): void {

  }

  mapClicked = (data) => {
    if (data.type == 'burg') {
      this.selectedBurg = data.burg;
      this.mapBox = true;
      this._population = this.selectedBurg.population;
    }
  }
}
