import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
} from "@angular/core";
import { WorldService } from "../../shared/services/world.service";
import { ActivatedRoute } from "@angular/router";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Region } from "../../models/region";
import { World } from "../../models/world";
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent,
} from "ngx-perfect-scrollbar";

@UntilDestroy()
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
  public selectedRegion: Region = new Region();
  public selectedWorld: World = new World();
  public selectedParty: any = {};
  currentX = 0;
  currentY = 0;
  public saveBtn: string = "Saved";
  selectedPOI: any = {};
  set population(population) {
    this._population =
      population /
      (this.selectedPOI.populationRate * this.selectedPOI.urbanization);
  }
  get population() {
    return (
      this._population *
      this.selectedPOI.populationRate *
      this.selectedPOI.urbanization
    );
  }
  constructor(
    private route: ActivatedRoute,
    private worldService: WorldService
  ) {
    this.route.paramMap.subscribe((p) => {
      console.log(JSON.stringify(p));
      console.log(p.get("regionId"));
      if (!!p.get("regionId")) {
        this.worldService.getRegion(parseInt(p.get("regionId"), 10));
      }
    });
  }

  ngOnInit(): void {
    this.worldService.selectedRegion$
      .pipe(untilDestroyed(this))
      .subscribe((region) => {
        this.selectedRegion = region;
        if (this.selectedWorld.id !== this.selectedRegion.world_id) {
          this.worldService.getWorldFromRegion(region.id);
        }
      });
    this.worldService.selectedWorld$
      .pipe(untilDestroyed(this))
      .subscribe((world) => {
        this.selectedWorld = world;
      });
  }

  ngAfterViewInit(): void {}

  savePOI = () => {
    this.saveBtn = "...Saving";
    this.worldService
      .updatePOI(this.selectedRegion, this.selectedPOI)
      .subscribe((response) => (this.saveBtn = "Saved"));
  };

  mapClicked = (poi) => {
    console.log(poi);
    this.selectedPOI = poi;
    this.worldService.getPOI(this.selectedRegion, poi).subscribe((poi: any) => {
      this.selectedPOI = { ...this.selectedPOI, ...poi };
      if (poi.type == "party") {
        this.selectedParty = this.selectedPOI;
      }
    });
    this.mapBox = true;
    if (typeof poi.capital != "undefined") {
      this._population = this.selectedPOI.population;
    }
    if (poi.type == "dungeons") {
    }
    if (poi.type == "ruins") {
    }
    if (poi.type == "statues") {
    }
    if (poi.type == "brigands") {
    }
    if (poi.type == "volcanoes") {
    }
    if (poi.type == "mines") {
    }
    if (poi.type == "inns") {
    }
    if (poi.type == "pirates") {
    }
    if (poi.type == "lake-monsters") {
    }
    if (poi.type == "sea-monsters") {
    }
    if (poi.type == "hill-monsters") {
    }
    if (poi.type == "waterfalls") {
    }
    if (poi.type == "lighthouses") {
    }
  };
}
