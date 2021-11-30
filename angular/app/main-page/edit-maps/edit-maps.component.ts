import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { WorldService } from "../../shared/services/world.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-edit-maps",
  templateUrl: "./edit-maps.component.html",
  styleUrls: ["./edit-maps.component.scss"],
})
export class EditMapsComponent implements OnInit {
  urlSafe: SafeResourceUrl;
  public selectedRegion;
  constructor(
    public sanitizer: DomSanitizer,
    public worldService: WorldService
  ) {}

  ngOnInit() {
    this.worldService.selectedRegion$
      .pipe(untilDestroyed(this))
      .subscribe((region) => {
        this.selectedRegion = region;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          "/api/region/" + region.id + "/edit-map"
        );
      });
  }
}
