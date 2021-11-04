import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { WorldService } from "../../shared/services/world.service";
import { World, Npc } from "../../models/world";
import { Region } from "../../models/region";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import { PerfectScrollbarComponent } from "ngx-perfect-scrollbar";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit-npcs",
  templateUrl: "./edit-npcs.component.html",
  styleUrls: ["./edit-npcs.component.scss"],
})
export class EditNpcsComponent implements OnInit {
  worldSubscription: Subscription;
  @ViewChild(PerfectScrollbarComponent, { static: false })
  componentRef?: PerfectScrollbarComponent;

  selectedNpc: Npc;
  selectedWorld: World;
  faInfinity = faInfinity;
  faSkull = faSkull;
  faRandom = faRandom;
  public regions: Region[];
  lifeValues = ["Dead", "Alive", "Immortal", "Undead"];
  grouping = ["age", "race", "profession", "lineage"];
  npcGroups = [];
  npcs: Npc[];
  groupedNpcs;
  lockedFeatures = [];
  featuresArray = [];
  selectedRegion: Region = new Region();
  constructor(
    private route: ActivatedRoute,
    private worldService: WorldService
  ) {
    route.paramMap.subscribe((p) => {
      if (!!p.get("regionId")) {
        this.selectRegion({ id: parseInt(p.get("regionId"), 10) });
        this.worldService.getWorldFromRegion(parseInt(p.get("regionId"), 10));
      }
    });
  }

  selectRegion = (region) => {
    this.worldService.getNpcs(region.id).subscribe((data: { npcs; region }) => {
      this.selectedRegion = data.region;
      this.npcs = data.npcs;
    });
  };
  selectNpc = (npc: Npc) => {
    var ordering = {}, // map for efficient lookup of sortIndex
      sortOrder = [
        "face shape",
        "skin complexion",
        "skin color",
        "hair description",
        "hair color",
        "eye description",
        "eye color",
        "clothing",
        "body",
        "body extra",
        "special",
      ];
    for (var i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;
    this.featuresArray = Object.values(npc.features).sort(function (
      a: any,
      b: any
    ) {
      return (
        ordering[a.name] - ordering[b.name] || a.name.localeCompare(b.name)
      );
    });
    npc.events = npc.events.sort((a, b) => (a.age > b.age ? 1 : -1));
    this.selectedNpc = npc;
  };

  ngOnInit(): void {
    this.worldSubscription = this.worldService.selectedWorld$.subscribe(
      (world) => {
        if (world) {
          this.selectedWorld = new World(world);
          this.regions = this.selectedWorld.regions;
        }
      }
    );
  }
  public upperFirst(name, empty = "None") {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : empty;
  }

  public groupBy(list, keyGetter) {
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
  }
  groupNpcsBy = (group) => {
    let groupObject;
    switch (group) {
      case "age":
        groupObject = this.groupBy(this.npcs, (npc) => this.ageGroup(npc));
        this.groupedNpcs = Array.from(groupObject).sort();
        break;
      case "race":
        groupObject = this.groupBy(this.npcs, (npc) => npc.race.name);
        this.groupedNpcs = Array.from(groupObject).sort();
        break;
      case "profession":
        groupObject = this.groupBy(this.npcs, (npc) =>
          npc.profession ? npc.profession.name : "None"
        );
        this.groupedNpcs = Array.from(groupObject).sort();
        break;
      case "lineage":
        groupObject = this.groupBy(this.npcs, (npc) => {
          if (!npc.features.lineage) return "None";
          let name = npc.features.lineage["text"];
          return this.upperFirst(name);
        });
        this.groupedNpcs = Array.from(groupObject).sort();
        break;
    }
  };
  findRace = (raceId) => {
    return this.selectedWorld.races.find((r) => r.id == raceId);
  };
  findProfession = (professionId) => {
    return this.selectedWorld.professions.find((p) => p.id == professionId);
  };
  public generateFeatures = (npc) => {
    this.worldService
      .generateFeatures(npc.id, this.lockedFeatures)
      .subscribe((data: { npc }) => {
        this.selectNpc(data.npc);
      });
  };

  public ageGroup(npc) {
    if (npc.age < npc.race.adulthood) return "Youth";
    if (npc.age < npc.race.middle_age) return "Adult";
    if (npc.age < npc.race.old_age) return "Middle Aged";
    return "Old Age & Venerable";
  }
}
