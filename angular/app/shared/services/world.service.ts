import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { share } from "rxjs/operators";
import { ReplaySubject } from "rxjs";
import { World } from "../../models/world";
import { NPC } from "../../models/world";
import { Region } from "../../models/region";

@Injectable({
  providedIn: "root",
})
export class WorldService {
  private npcsSource = new ReplaySubject<NPC[]>();
  public npcs$ = this.npcsSource.asObservable();

  private selectedNPCSource = new ReplaySubject<NPC>();
  public selectedNPC$ = this.selectedNPCSource.asObservable();

  private selectedWorldSource = new ReplaySubject<World>();
  public selectedWorld$ = this.selectedWorldSource.asObservable();

  private selectedRegionSource = new ReplaySubject<Region>();
  public selectedRegion$ = this.selectedRegionSource.asObservable();

  public showFile;

  constructor(private http: HttpClient) {}

  getWorld = (id) => {
    console.log("Get World");
    this.http
      .get("/api/world/" + id)
      .subscribe((data: World) =>
        this.selectedWorldSource.next(new World(data))
      );
  };
  updateWorld = (world) => {
    world = { name: world.name, id: world.id };
    this.http.put("/api/world/" + world.id, world).subscribe();
  };
  getWorldFromRegion = (id) => {
    console.log("Get World FR");
    this.http.get("/api/world/fr/" + id).subscribe((data: World) => {
      console.log(data);
      console.log(new World(data));
      this.selectedWorldSource.next(new World(data));
    });
  };
  getRegion = (id) => {
    this.http.get("/api/region/" + id).subscribe((data: { region: Region }) => {
      this.getWorldFromRegion(data.region.id);
      this.selectedRegionSource.next(new Region(data.region));
    });
  };
  selectNpc(npc) {
    {
      console.log(npc);
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
      npc.featuresArray = Object.values(npc.features).sort(function (
        a: any,
        b: any
      ) {
        return (
          ordering[a.name] - ordering[b.name] || a.name.localeCompare(b.name)
        );
      });
      if (npc.events)
        npc.events = npc.events.sort((a, b) => (a.age > b.age ? 1 : -1));
      console.log(npc);
      this.selectedNPCSource.next(new NPC(npc));
    }
  }
  getNpc = (npcId) => {
    this.http
      .get("/api/npc/" + npcId)
      .subscribe((data: { npc: any }) => this.selectNpc(data.npc));
  };
  getNpcs = (regionId) => {
    return this.http.get("/api/region/" + regionId + "/npcs");
  };
  getNpcList = (regionId) => {
    return this.http.get("/api/region/" + regionId + "/npc-list");
  };
  getAspects = () => {
    return this.http.get("/api/aspects");
  };
  updateNpc = (params) => {
    return this.http
      .put("/api/npc/" + params.id, params)
      .subscribe((data: { npc: any }) => this.selectNpc(data.npc));
  };
  addNpc = (params) => {
    return this.http.post("/api/npcs/npc/add", params);
  };
  createWorld = (world = null) => {
    return this.http.post("/api/world/create", world);
  };
  deleteWorld = (id) => {
    return this.http.delete("/api/world/" + id);
  };
  deleteNpc = (params) => {
    return this.http.post("/api/npcs/npc/delete", params);
  };
  seedRegion = (region) => {
    const call = this.http
      .get("/api/region/" + region.id + "/seed")
      .pipe(share());
    return call;
  };
  saveRegion = (region) => {
    console.log(region.feature_types.body);
    const call = this.http
      .put("/api/region/" + region.id, region)
      .pipe(share());
    return call;
  };
  generateFeatures = (npcId, lockedFeatures) => {
    return this.http
      .put("/api/npc/" + npcId + "/generate-features", {
        locked_features: lockedFeatures,
      })
      .pipe(share());
  };
  ageRegion = (region, years) => {
    const call = this.http
      .get("/api/region/" + region.id + "/age/" + years)
      .pipe(share());
    return call;
  };
  clearRegion = (region) => {
    const call = this.http
      .get("/api/region/" + region.id + "/clear")
      .pipe(share());
    return call;
  };
  addRegion = (world, region = null) => {
    const call = this.http
      .post("/api/world/" + world.id + "/region/add", { region: region })
      .pipe(share());
    return call;
  };
  deleteRegion = (region) => {
    const call = this.http.delete("/api/region/" + region.id).pipe(share());
    return call;
  };
  updateBurg = (region, burg) => {
    const call = this.http
      .put("/api/region/" + region.id + "/burg", burg)
      .pipe(share());
    return call;
  };
  updatePOI = (poi, region) => {
    const call = this.http
      .put("/api/region/" + region.id + "/poi", { poi })
      .pipe(share());
    call.subscribe();
    return call;
  };
  updateSVG = (svg, region) => {
    const call = this.http
      .put("/api/region/" + region.id + "/svg", { svg })
      .pipe(share());
    call.subscribe();
    return call;
  };
  getPOI = (poi, region) => {
    let type = poi.selectType == "burg" ? "burgs" : "poi";
    const call = this.http
      .get("/api/region/" + region.id + "/" + type + "/" + poi.i)
      .pipe(share());
    return call;
  };
  createPOI = (poi, svg, region) => {
    const call = this.http
      .post("/api/region/" + region.id + "/create-poi", { poi, svg })
      .pipe(share());
    call.subscribe();
    return call;
  };
  attachNPC = (npc, poi) => {
    const call = this.http.post(
      "/api/region/" +
        npc.region_id +
        "/" +
        poi.selectType +
        "/" +
        poi.i +
        "/" +
        npc.id,
      {}
    );
    return call;
  };
  detachNPC = (npc, poi) => {
    const call = this.http.delete(
      "/api/region/" +
        npc.region_id +
        "/" +
        poi.type +
        "/" +
        poi.i +
        "/" +
        npc.id,
      {}
    );
    return call;
  };
  addDescriptive = (descriptive, world) => {
    this.http.post("/api/world/" + world.id + "/descriptive", descriptive);
  };
  saveDescriptive = (descriptive, world) => {
    return this.http.post(
      "/api/world/" +
        world.id +
        "/race" +
        (descriptive.id ? "/" + descriptive.id : ""),
      descriptive
    );
  };
  saveRace = (race, world) => {
    return this.http.post(
      "/api/world/" + world.id + "/race" + (race.id ? "/" + race.id : ""),
      race
    );
  };
  deleteDescriptive = (descriptive) => {
    this.http.delete("/api/descriptive/" + descriptive.id, descriptive);
  };
  deleteRace = (race) => {
    this.http.delete("/api/race/" + race.id, race);
  };
  copyFromWorld = (source, target) => {
    return this.http.get("/api/copy-world/" + target.id + "/" + source.id);
  };
  copyFromRegion = (source, target) => {
    return this.http.get("/api/copy-region/" + target.id + "/" + source.id);
  };
}
