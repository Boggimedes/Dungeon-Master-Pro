import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Region } from "../../models/region";
import { ActivatedRoute } from "@angular/router";
import { WorldService } from "../../shared/services/world.service";
import { StoryService } from "../../shared/services/story.service";
import { AuthService } from "../../shared/auth/auth.service";
import { Subscription } from "rxjs";
import { World, NPC, POI, Race } from "../../models/world";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { faClone } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent,
} from "ngx-perfect-scrollbar";

@Component({
  selector: "app-edit-worlds",
  templateUrl: "./edit-worlds.component.html",
  styleUrls: ["./edit-worlds.component.scss"],
})
export class EditWorldsComponent implements OnInit {
  @ViewChild(PerfectScrollbarComponent, { static: false })
  componentRef?: PerfectScrollbarComponent;
  worldCollapsed: boolean = false;
  selectedWorld: World;
  worldSubscription: Subscription;
  public hideConfirm = 0;
  public config: PerfectScrollbarConfigInterface = {
    wheelPropagation: true,
    scrollXMarginOffset: -120,
    scrollYMarginOffset: -120,
  };
  selectedProfession: any = {};
  selectedDescriptive: any = {};
  selectedRace: any = {};
  racesSearch;
  faSkullCrossbones = faSkullCrossbones;
  descriptiveSearch = "";
  professionSearch = "";
  ageYears = 1;
  faLink = faLink;
  filteredDescriptives;
  clickTimeout;
  filteredProfessions;
  dPage = 1;
  faClone = faClone;
  pPage = 1;
  rPage = 1;
  rPageSize = 15;
  dPageSize = 15;
  pPageSize = 15;
  Object = Object;
  showGender;
  newGender = [];
  ageGroups = {
    none: "None",
    adulthood: "Adulthood",
    middleAge: "Middle Age",
    oldAge: "Old Age",
    venerable: "Venerable",
    maxAge: "Max Age",
  };
  descriptiveTypes = [
    "special",
    "face shape",
    "skin complexion",
    "skin color",
    "hair color",
    "hair hescription",
    "eye description",
    "eye color",
    "body",
    "clothing",
    "body extra",
    "quirk",
    "manner",
    "lineage",
  ];

  descriptiveExtras = [];
  public linkedArray = [];
  ageGroupsArray = Object.values(this.ageGroups);
  ageGroupsKeys = Object.keys(this.ageGroups);
  genders = [];
  constructor(
    private route: ActivatedRoute,
    private worldService: WorldService,
    private storyService: StoryService,
    private authService: AuthService
  ) {}

  deleteWorld(confirm) {
    if (confirm) {
      this.hideConfirm = 1;
      setTimeout(() => (this.hideConfirm = 0), 4000);
    } else {
      // this.storyService
      //   .hidePOI(this.selectedPOI)
      //   .subscribe((response) => (this.hideConfirm = 0));
      console.log("POI Hidden (but not really)");
      this.hideConfirm = 0;
      this.worldService
        .deleteWorld(this.selectedWorld.id)
        .subscribe((data: any) => {
          this.authService.updateUser(data.user);
          this.selectedWorld = null;
        });
    }
  }
  updateWorld() {
    this.worldService.updateWorld(this.selectedWorld);
  }
  saveProfession = () => {};

  saveRegion = (index) => {
    console.log(index);
    console.log(this.selectedWorld.regions[index]);
    let region = this.selectedWorld.regions[index];
    this.worldService.saveRegion(region).subscribe((data: { region }) => {
      this.selectedWorld.regions[index] = new Region(data.region);
    });
  };

  addGender = () => {};

  linkToggle = (index) => {
    this.selectedWorld.regions[index].linked =
      !this.selectedWorld.regions[index].linked;
  };

  linkAll = () => {
    let allTrue = true;
    let tmpRegions = this.selectedWorld.regions.map((r) => {
      if (!r.linked) allTrue = false;
      r.linked = true;
      return r;
    });
    if (allTrue) this.selectedWorld.regions.map((r) => (r.linked = false));
    else this.selectedWorld.regions = tmpRegions;
  };
  genderNames = (genders) => {
    return genders.map((g) => g[0]).join(", ");
  };

  filterDescriptives = () => {
    if (!this.descriptiveSearch) {
      this.filteredDescriptives = null;
    }
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
    } else {
      this.clickTimeout = setTimeout(() => {
        this.clickTimeout = null;
      }, 1200);
    }

    this.filteredDescriptives = this.selectedWorld.descriptives.filter(
      (item: any) => {
        for (var prop in item) {
          if (Object.prototype.hasOwnProperty.call(item, prop)) {
            if (typeof item[prop] == "string")
              if (
                item[prop]
                  .toLowerCase()
                  .indexOf(this.descriptiveSearch.toLowerCase()) !== -1
              )
                return true;
          }
        }
      }
    );
  };

  filterProfessions = () => {
    if (!this.professionSearch) {
      this.filteredProfessions = null;
    }
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
    } else {
      this.clickTimeout = setTimeout(() => {
        this.clickTimeout = null;
      }, 600);
    }

    this.filteredProfessions = this.selectedWorld.professions.filter(
      (item: any) => {
        for (var prop in item) {
          if (Object.prototype.hasOwnProperty.call(item, prop)) {
            if (typeof item[prop] == "string")
              if (
                item[prop]
                  .toLowerCase()
                  .indexOf(this.professionSearch.toLowerCase()) !== -1
              )
                return true;
          }
        }
      }
    );
  };

  isPopulated = (record) => {
    let totalPopulation = 0;
    for (let i = 0; i < record.stats.length; i++) {
      totalPopulation += record.stats[i].living;
    }
    return totalPopulation > 0;
  };
  changeFeature = (feature, i) => {
    if (this.selectedWorld.regions[i].linked) {
      this.selectedWorld.regions = this.selectedWorld.regions.map((r) => {
        if (r.linked) {
          r.feature_types[feature["name"]] = feature;
        }
        return r;
      });
    }
    this.selectedWorld.regions[i].feature_types[feature["name"]] = feature;
    console.log(this.selectedWorld.regions[i]);
  };
  newRegion = (region = null) => {
    this.worldService
      .addRegion(this.selectedWorld, region)
      .subscribe((data: { region }) => {
        if (data.region.prof_balance === null) data.region.prof_balance = [];
        if (data.region.racial_balance === null)
          data.region.racial_balance = [];
        this.selectedWorld.regions.push(new Region(data.region));
      });
  };
  saveRace = (race) => {
    this.worldService
      .saveRace(this.selectedWorld, race)
      .subscribe((r: Race) => {
        if (!race.id) return this.selectedWorld.races.push(r);
        this.selectedWorld.races.map((race) => {
          if (race.id === r.id) return r;
          return race;
        });
      });
  };
  saveDescriptive = (descriptive) => {
    this.worldService
      .saveDescriptive(this.selectedWorld, descriptive)
      .subscribe((d: any) => {
        if (!descriptive.id) return this.selectedWorld.descriptives.push(d);
        this.selectedWorld.descriptives.map((descriptive: any) => {
          if (descriptive.id === d.id) return d;
          return descriptive;
        });
      });
  };

  addBalance = (item, type, regionIndex, value) => {
    let region = this.selectedWorld.regions[regionIndex];
    if (region.linked) {
      this.selectedWorld.regions = this.selectedWorld.regions.map((r) => {
        console.log(r);
        if (r.linked) {
          r = this.setBalance(item, type, r, value);
        }
        return r;
      });
    } else {
      this.selectedWorld.regions[regionIndex] = this.setBalance(
        item,
        type,
        region,
        value
      );
    }
  };

  setBalance = (item, type, region, value) => {
    let adjusted = false;
    let key = type == "prof_balance" ? "professions" : "races";
    if (item == "all") {
      region[type] = [];
      this.selectedWorld[key].forEach((a) => {
        region[type].push({ name: a.name, id: a.id, value: value });
      });
      return region;
    }
    region[type].forEach((r, i) => {
      if (r.id == item.id) {
        region[type][i].value = value;
        adjusted = true;
      }
    });
    if (!adjusted)
      region[type].push({ name: item.name, id: item.id, value: value });
    console.log(region);
    return region;
  };

  clearRegion = (region, index) => {
    this.worldService.clearRegion(region).subscribe((data: { region }) => {
      this.selectedWorld.regions[index] = new Region(data.region);
    });
  };

  deleteRegion = (region, index) => {
    this.worldService.deleteRegion(region).subscribe(() => {
      this.selectedWorld.regions.splice(index, 1);
    });
  };

  seedRegion = (region, index) => {
    console.log(region);
    this.worldService.seedRegion(region).subscribe((data: { region }) => {
      this.selectedWorld.regions[index] = new Region(data.region);
    });
  };

  ageRegion = (region, years, index) => {
    this.worldService.ageRegion(region, years).subscribe((data: { region }) => {
      this.selectedWorld.regions[index] = new Region(data.region);
    });
  };

  maxAge = (group) => {
    let k = this.ageGroupsKeys;
    let p = this.selectedProfession;
    this.selectedProfession.max_age =
      k.indexOf(group) >= k.indexOf(p.min_age) ? group : p.min_age;
  };

  minAge = (group) => {
    let k = this.ageGroupsKeys;
    let p = this.selectedProfession;
    this.selectedProfession.min_age =
      k.indexOf(group) <= k.indexOf(p.max_age) ? group : p.max_age;
  };

  ngOnInit(): void {
    this.worldSubscription = this.worldService.selectedWorld$.subscribe(
      (world) => {
        if (world) {
          if (
            typeof world !== "undefined" &&
            typeof world.races !== "undefined"
          ) {
            world.races.forEach((r) => {
              r.genders.forEach((g) => {
                if (this.genders.indexOf(g[0]) != -1) return;
                this.genders.push(g[0]);
              });
            });
            world.body_types = world.body_types.map((t: string) => {
              t = t.replace("Body (", "").replace(")", "");
              return t;
            });
            world.stats.urban_pop = this.storyService.abbreviateNumber(
              world.stats.urban_pop
            );
            world.stats.rural_pop = this.storyService.abbreviateNumber(
              world.stats.rural_pop
            );
          }
          this.selectedWorld = world;
          console.log(this.selectedWorld);
        }
      }
    );
  }
}
