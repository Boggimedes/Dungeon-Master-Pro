import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  OnDestroy,
} from "@angular/core";
import { LayoutService } from "../services/layout.service";
import { WorldService } from "../services/world.service";
import { StoryService } from "../services/story.service";
import { Subscription } from "rxjs";
import { icons, typedIcons } from "../configs/const";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-notification-sidebar",
  templateUrl: "./notification-sidebar.component.html",
  styleUrls: ["./notification-sidebar.component.scss"],
})
export class NotificationSidebarComponent implements OnInit, OnDestroy {
  layoutSub: Subscription;
  isOpen = false;
  public customIcons = [];
  public mapData: any = {};
  public selected: any = {};
  public selectedRegion: any = {};
  public abbreviateNumber: any = {};
  public get icons() {
    if (localStorage.getItem("customIcons"))
      this.customIcons = JSON.parse(localStorage.getItem("customIcons"));
    return [...typedIcons, ...this.customIcons];
  }
  ngOnInit() {
    this.abbreviateNumber = this.storyService.abbreviateNumber;
    if (localStorage.getItem("customIcons"))
      this.customIcons = JSON.parse(localStorage.getItem("customIcons"));
    this.worldService.selectedRegion$
      .pipe(untilDestroyed(this))
      .subscribe((region: any) => {
        if (!region.id) return;
        this.selectedRegion = region;
      });
    this.storyService.data$
      .pipe(untilDestroyed(this))
      .subscribe((data: any) => {
        if (!Object.values(data).length) return;
        this.mapData = data;
        this.mapData.burgs.map((b) => {
          b.pop_txt = this.abbreviateNumber(
            b.population * this.mapData.populationRate
          );
        });
        this.selectedRegion.states.map((state) => {
          state.urban_txt = this.abbreviateNumber(
            state.urban * this.mapData.populationRate
          );
          state.area_txt = this.abbreviateNumber(state.area);
          state.rural_txt = this.abbreviateNumber(
            state.rural * this.mapData.populationRate
          );
        });
      });
  }
  constructor(
    private layoutService: LayoutService,
    private storyService: StoryService,
    public worldService: WorldService
  ) {
    this.layoutSub = layoutService.toggleNotiSidebar$.subscribe((open) => {
      this.isOpen = open;
    });
  }
  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  onClose() {
    this.layoutService.toggleNotificationSidebar(false);
  }
  groupBy = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  };

  addIcon() {
    let customIcons = [];
    if (localStorage.getItem("customIcons"))
      customIcons = JSON.parse(localStorage.getItem("customIcons"));
    let newIcon = (<HTMLInputElement>document.getElementById("addIconInput"))
      .value;
    if (newIcon) {
      customIcons.push(newIcon);
      localStorage.setItem("customIcons", JSON.stringify(customIcons));
      // this.drawIcons();
    }
  }
  selectCapital(capitalI) {
    this.select({ i: capitalI, population: 1 }, true, "burg");
  }
  zoomTo(item, z = 5, d = 1200) {
    let { x, y } = item;
    this.storyService.zoomTo(x, y, z, d);
  }
  select(object, zoomTo = false, selectType = "burg") {
    console.log(object);
    if (this.selected == object || !Object.values(object).length) {
      this.selected = {};
      this.storyService.select({}, null);
      return;
    }
    this.selected = object;
    if (zoomTo) this.zoomTo(object);
    console.log(selectType);
    this.storyService.select(object, selectType);
  }
  // const grouped = groupBy(pets, pet => pet.type);
  // console.log(grouped.get("Dog")); // -> [{type:"Dog", name:"Spot"}, {type:"Dog", name:"Rover"}]
  // console.log(grouped.get("Cat")); // -> [{type:"Cat", name:"Tiger"}, {type:"Cat", name:"Leo"}]
}
