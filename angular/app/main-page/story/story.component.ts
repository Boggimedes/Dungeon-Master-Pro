import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
} from "@angular/core";
import { WorldService } from "../../shared/services/world.service";
import { StoryService } from "../../shared/services/story.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faUserFriends,
  faTimesCircle,
  faMinusCircle,
  faSignature,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { Region } from "../../models/region";
import { World, NPC, POI } from "../../models/world";
import { HookGenerator } from "./hooks/hooks.component";
import { climates, climateNames } from "../../shared/configs/const";
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent,
} from "ngx-perfect-scrollbar";
import { QuillEditorComponent } from "ngx-quill";

import { debounceTime, distinctUntilChanged } from "rxjs/operators";

import Quill from "quill";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

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
  public climates = climates;
  public climateNames = climateNames;
  public mapImg;
  form: FormGroup;
  public faTimesCircle = faTimesCircle;
  public faMinusCircle = faMinusCircle;
  public startingMapHeight;
  public startingMapWidth;
  public hookBox;
  public burgName;
  public markerName;
  public quickHook;
  public activeNpc;
  public hideConfirm = 0;
  public faBookOpen = faBookOpen;
  public hookGenerator = new HookGenerator();
  faUserFriends = faUserFriends;
  faCogs = faCogs;
  faHourglassHalf = faHourglassHalf;
  public mapScale = 1;
  public mapArray = [0.3, 0.6, 1, 2, 3, 5, 7.5, 10, 15, 20];
  private _population = 0;
  public editPop = false;
  public selectedRegion: Region;
  public selectedWorld: World;
  public selectedParty: any = {};
  public mapData: any = {};
  public selectedState: any = {};
  public editor: any = {};
  public floor = Math.floor;
  public npcRow = ["3rem", "3rem", "3rem"];
  // public orderClass = (i) => {
  //   return {
  //     "poi-npc-hover order-5": this.activeNpc == i,
  //     "order-2": this.activeNpc == i - 1 && !(i % 2),
  //     "order-1": this.activeNpc == i - 2 && !(i % 2),
  //     "order-1": this.activeNpc < i,
  //     "order-12": this.activeNpc > i
  //   };
  // };
  currentX = 0;
  currentY = 0;
  lifeValues = ["Dead", "Alive", "Immortal", "Undead"];
  _selectedNPC;
  recentNpcs = [];
  public set selectedNPC(npc) {
    if (npc == null) {
      this._selectedNPC = null;
      return;
    }
    if (npc.id == this.selectedNPC?.id) return;

    this.recentNpcs = this.recentNpcs.filter((n) => {
      return n.id !== npc.id;
    });
    if (this._selectedNPC?.id) this.recentNpcs.unshift(this._selectedNPC);
    this.recentNpcs = this.recentNpcs.slice(0, 9);
    this._selectedNPC = new NPC(npc, this.selectedWorld);
  }
  public get selectedNPC() {
    return this._selectedNPC;
  }
  public saveBtn: string = "Saved";
  public _selectedPOI: POI = new POI({});
  set selectedPOI(poi: POI) {
    if (poi.population) {
      poi.pop_txt = this.storyService.abbreviateNumber(
        poi.population * this.mapData.populationRate * this.mapData.urbanization
      );
    }
    this._selectedPOI = poi;
    console.log(this._selectedPOI);
  }
  get selectedPOI() {
    return this._selectedPOI;
  }

  public editorConfig = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      [{ list: "ordered" }, { list: "bullet" }],

      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme

      ["clean"], // remove formatting button
    ],
  };
  constructor(
    private worldService: WorldService,
    private storyService: StoryService
  ) {}
  onSelectionChanged = (event) => {
    if (event.oldRange == null) {
      this.onNotesFocus(event);
      this.editor = event.editor;
      this.saveBtn = "Save";
    }
    if (event.range == null) {
      // this.onNotesBlur(event);
    }
  };
  onNotesFocus(event) {
    event.editor.theme.modules.toolbar.container.style.display = "flex";
  }

  onNotesBlur(event) {
    event.editor.theme.modules.toolbar.container.style.display = "none";
  }
  ngOnInit(): void {
    this.worldService.selectedRegion$
      .pipe(untilDestroyed(this))
      .subscribe((region) => {
        this.selectedRegion = region;
      });
    this.worldService.selectedWorld$
      .pipe(untilDestroyed(this))
      .subscribe((world) => {
        console.log(world);
        if (!world) return;
        this.selectedWorld = world;
      });
    this.storyService.data$
      .pipe(untilDestroyed(this))
      .subscribe((data: any) => {
        if (!Object.values(data).length) return;
        this.mapData = data;
        this.mapData.burgs.map((b) => {
          b.pop_txt = this.storyService.abbreviateNumber(
            b.population * this.mapData.populationRate
          );
        });
        this.selectedRegion.states.map((state) => {
          state.urban_txt = this.storyService.abbreviateNumber(
            state.urban * this.mapData.populationRate
          );
          state.area_txt = this.storyService.abbreviateNumber(state.area);
          state.rural_txt = this.storyService.abbreviateNumber(
            state.rural * this.mapData.populationRate
          );
        });
      });
    this.worldService.selectedNPC$
      .pipe(untilDestroyed(this))
      .subscribe((npc) => {
        if (!Object.values(npc).length) return;
        console.log(npc);
        this.selectedNPC = new NPC(npc, this.selectedWorld);
      });
    this.storyService.selected$
      .pipe(untilDestroyed(this))
      .subscribe((selected) => {
        if (!Object.values(selected).length) return;
        console.log(selected);
        if (selected.selectType == "marker" || selected.selectType == "burg") {
          this.worldService
            .getPOI(selected, this.selectedRegion)
            .subscribe((poi: any) => {
              this.selectedPOI = new POI({ ...selected, ...poi });

              if (poi.type == "party") {
                this.selectedParty = this.selectedPOI;
              }
            });
        }
        if (selected.selectType == "state") {
          this.selectedPOI = new POI({ selected });
          this.selectedState = selected;
        }
      });
  }

  ngAfterViewInit(): void {}
  temperatureRange(biome, temperature) {
    let scale = temperature.substr(-2, 2);
    let temp = temperature.replace(scale, "");
    let low = temp - 0 + this.climates[biome][scale == "°F" ? 0 : 2];
    let high = temp - 0 + this.climates[biome][scale == "°F" ? 1 : 3];
    return low + "° - " + high + scale;
  }
  savePOI = () => {
    this.saveBtn = "...Saving";
    try {
      if (this.editor)
        this.editor.theme.modules.toolbar.container.style.display = "none";
    } catch (err) {
      console.log(err);
    }
    console.log(this.selectedPOI);
    if (this.selectedPOI.selectType == "burg") {
      this.burgName = this.selectedPOI.name;
    }
    if (this.selectedPOI.selectType == "marker") {
      this.markerName = this.selectedPOI.name;
    }
    this.worldService
      .updatePOI(this.selectedPOI, this.selectedRegion)
      .subscribe((response) => (this.saveBtn = "Saved"));
  };
  generateHook = () => {
    let hook = this.hookGenerator.generateHook();
    this.selectedPOI.hook = hook.type;
    this.quickHook = hook.note;
  };
  mapClicked = () => {
    // console.log(poi);
    // this.selectedPOI = poi;
    // this.worldService.getPOI(poi).subscribe((poi: any) => {
    //   this.selectedPOI = new POI({ ...this.selectedPOI, ...poi });
    //   console.log(this.selectedPOI);
    //   if (poi.type == "party") {
    //     this.selectedParty = this.selectedPOI;
    //   }
    // });
    this.mapBox = true;
  };
  zoomTo(item, z = 5, d = 1200) {
    let { x, y } = item;
    this.storyService.zoomTo(x, y, z, d);
  }
  rand(x = 1, y) {
    return x + (crypto.getRandomValues(new Uint32Array(1))[0] % (y - x + 1));
  }

  // return random value from the array
  ra(array) {
    return array[this.rand(0, array.length - 1)];
  }
  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  attachNPC(npc) {
    if (!this.selectedPOI) return;
    this.worldService
      .attachNPC(npc, this.selectedPOI)
      .subscribe((npc) =>
        this.selectedPOI.npcs.push(new NPC(npc, this.selectedWorld))
      );
  }
  detachNPC(npc) {
    if (!this.selectedPOI) return;
    this.worldService.detachNPC(npc, this.selectedPOI).subscribe((npc: NPC) => {
      this.selectedPOI.npcs = this.selectedPOI.npcs.filter(
        (n) => n.id != npc.id
      );
      this.selectedNPC = null;
    });
  }
  saveNotes(npc) {
    this.worldService.updateNpc(npc);
  }
  hidePOI(confirm) {
    if (confirm) {
      this.hideConfirm = 1;
      setTimeout(() => (this.hideConfirm = 0), 4000);
    } else {
      // this.storyService
      //   .hidePOI(this.selectedPOI)
      //   .subscribe((response) => (this.hideConfirm = 0));
      console.log("POI Hidden (but not really)");
      this.hideConfirm = 0;
      this.mapBox = false;
    }
  }
}
