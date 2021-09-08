import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  OnDestroy,
} from "@angular/core";
import { LayoutService } from "../services/layout.service";
import { WorldService } from "../services/world.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-notification-sidebar",
  templateUrl: "./notification-sidebar.component.html",
  styleUrls: ["./notification-sidebar.component.scss"],
})
export class NotificationSidebarComponent implements OnInit, OnDestroy {
  layoutSub: Subscription;
  isOpen = false;

  ngOnInit() {}

  constructor(
    private layoutService: LayoutService,
    private worldService: WorldService
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

  // const grouped = groupBy(pets, pet => pet.type);
  // console.log(grouped.get("Dog")); // -> [{type:"Dog", name:"Spot"}, {type:"Dog", name:"Rover"}]
  // console.log(grouped.get("Cat")); // -> [{type:"Cat", name:"Tiger"}, {type:"Cat", name:"Leo"}]
}
