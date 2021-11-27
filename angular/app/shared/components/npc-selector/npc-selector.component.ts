import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { WorldService } from "../../../shared/services/world.service";
import { World, NPC } from "../../../models/world";
import { Region } from "../../../models/region";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import { PerfectScrollbarComponent } from "ngx-perfect-scrollbar";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { StoryService } from "../../services/story.service";

@UntilDestroy()
@Component({
  selector: "app-npc-selector",
  templateUrl: "./npc-selector.component.html",
  styleUrls: ["./npc-selector.component.scss"],
})
export class NpcSelectorComponent implements OnInit {
  worldSubscription: Subscription;
  @ViewChild(PerfectScrollbarComponent, { static: false })
  componentRef?: PerfectScrollbarComponent;
  npcI: number;
  selectedNPC: NPC;
  selectedWorld: World;
  faInfinity = faInfinity;
  faSkull = faSkull;
  faRandom = faRandom;
  public regions: Region[];
  lifeValues = ["Dead", "Alive", "Immortal", "Undead"];
  grouping = ["age", "race", "profession", "lineage"];
  npcGroups = [];
  npcs: NPC[];
  groupedNpcs;
  lockedFeatures = [];
  featuresArray = [];
  selectedRegion: Region = new Region();
  constructor(
    private storyService: StoryService,
    private worldService: WorldService
  ) {}
  selectNpc = (npc: NPC, i) => {
    this.npcI = i;
    console.log(i);
    console.log(npc);
    this.worldService.getNpc(npc.id);
  };
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

  public ageGroup(npc) {
    if (npc.age < npc.race.adulthood) return "Youth";
    if (npc.age < npc.race.middle_age) return "Adult";
    if (npc.age < npc.race.old_age) return "Middle Aged";
    return "Old Age & Venerable";
  }
  ngOnInit(): void {
    this.worldService.selectedRegion$
      .pipe(untilDestroyed(this))
      .subscribe((region: Region) => {
        if (!Object.values(region).length) return;
        console.log(region);
        if (typeof region.id == "undefined") return;
        console.log(region.id);
        this.selectedRegion = region;
        console.log(region);
        this.worldService
          .getNpcList(region.id)
          .subscribe((data: { npcs; region }) => {
            this.npcs = data.npcs;
          });
      });
    this.worldService.selectedWorld$
      .pipe(untilDestroyed(this))
      .subscribe((world) => {
        if (!Object.values(world).length) return;
        console.log(world);
        if (!world) return;
        this.selectedWorld = world;
      });
    this.worldService.selectedNPC$
      .pipe(untilDestroyed(this))
      .subscribe((npc) => {
        if (!Object.values(npc).length) return;
        this.selectedNPC = npc;
        console.log(npc);
        console.log(this.npcI);
        if (!this.npcI) return;
        this.npcs[this.npcI] = npc;
      });
  }
}
