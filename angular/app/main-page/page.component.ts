import { Component } from "@angular/core";
import { WorldService } from "../shared/services/world.service";
import { ActivatedRoute } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"],
})
export class PageComponent {
  public get locationString() {
    return this.regionName
      ? this.worldName + " | " + this.regionName
      : this.worldName;
  }
  public worldName: string;
  public regionName: string;
  constructor(
    private route: ActivatedRoute,
    private worldService: WorldService
  ) {
    this.route.paramMap.subscribe((p) => {
      if (!!p.get("regionId")) {
        this.worldService.getRegion(parseInt(p.get("regionId"), 10));
        this.worldService.getWorldFromRegion(parseInt(p.get("regionId"), 10));
      }
      if (!!p.get("worldId")) {
        this.worldService.getWorld(parseInt(p.get("worldId"), 10));
      }
    });
    this.worldService.selectedRegion$
      .pipe(untilDestroyed(this))
      .subscribe((region) => {
        this.regionName = region.name;
      });
    this.worldService.selectedWorld$
      .pipe(untilDestroyed(this))
      .subscribe((world) => {
        console.log(world);
        this.worldName = world.name;
      });
  }
}
