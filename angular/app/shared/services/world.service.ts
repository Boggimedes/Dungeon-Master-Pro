import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { share } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { World } from "../../models/world";
import { Region } from "../../models/region";

@Injectable({
  providedIn: "root",
})
export class WorldService {
  private npcsSource = new BehaviorSubject<any>([]);
  public npcs$ = this.npcsSource.asObservable();

  private selectedNpcSource = new BehaviorSubject<any>([]);
  public selectedNpc$ = this.selectedNpcSource.asObservable();

  private selectedWorldSource = new BehaviorSubject<World>(new World());
  public selectedWorld$ = this.selectedWorldSource.asObservable();

  private selectedRegionSource = new BehaviorSubject<Region>(new Region());
  public selectedRegion$ = this.selectedRegionSource.asObservable();

  public showFile;

  constructor(private http: HttpClient) {}

  getWorld = (id) => {
    this.http
      .get("/api/world/" + id)
      .subscribe((data: World) => this.selectedWorldSource.next(data));
  };

  getWorldFromRegion = (id) => {
    this.http
      .get("/api/world/fr/" + id)
      .subscribe((data: World) => this.selectedWorldSource.next(data));
  };

  getRegion = (id) => {
    this.http
      .get("/api/region/" + id)
      .subscribe((data: { region: Region }) =>
        this.selectedRegionSource.next(data.region)
      );
  };

  getNpc = (npcId) => {
    this.http
      .get("/api/npc/" + npcId)
      .subscribe((data: { npc: any }) => this.selectedNpcSource.next(data.npc));
  };

  getNpcs = (regionId) => {
    return this.http.get("/api/region/" + regionId + "/npcs");
  };

  getAspects = () => {
    return this.http.get("/api/aspects");
  };

  updateNpc = (params) => {
    return this.http.post("/api/npcs/npc/update", params);
  };
  addNpc = (params) => {
    return this.http.post("/api/npcs/npc/add", params);
  };
  deleteNpc = (params) => {
    return this.http.post("/api/npcs/npc/delete", params);
  };
  public seedRegion = (region) => {
    const call = this.http
      .get("/api/region/" + region.id + "/seed")
      .pipe(share());
    return call;
  };
  public saveRegion = (region) => {
    console.log(region.feature_types.body);
    const call = this.http
      .put("/api/region/" + region.id, region)
      .pipe(share());
    return call;
  };
  public generateFeatures = (npcId, lockedFeatures) => {
    return this.http
      .put("/api/npc/" + npcId + "/generate-features", {
        locked_features: lockedFeatures,
      })
      .pipe(share());
  };
  // getRegions = (params) => {
  //     return this.http.post('/api/npcs/region/get', params);
  // }
  public ageRegion = (region, years) => {
    const call = this.http
      .get("/api/region/" + region.id + "/age/" + years)
      .pipe(share());
    return call;
  };
  public clearRegion = (region) => {
    const call = this.http
      .get("/api/region/" + region.id + "/clear")
      .pipe(share());
    return call;
  };
  // updateRegion = (params) => {
  //     const call = this.http.post('/api/npcs/region/update', params).pipe(share());
  //     call.subscribe((data) => this.selectedWorldSource.next(data));
  //     return call;
  // }
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
  // deleteWorld = (params) => {
  //     const call = this.http.post('/api/npcs/world/delete', params).pipe(share());
  //     call.subscribe((data) => this.selectedWorldSource.next(data));
  //     return call;
  // }
  // getDescriptives = (params) => {
  //     return this.http.post('/api/npcs/descriptives/get', params);
  // }
  // updateDescriptives = (params) => {
  //     return this.http.post('/api/npcs/descriptives/update', params);
  // }
  // updateNpcRecord = (table,params) => {
  //     return this.http.post('/api/npcs/'+table+'/update', params);
  // }
  // deleteNpcRecord = (table,params) => {
  //     return this.http.post('/api/npcs/'+table+'/delete', params);
  // }
  // addDescriptives = (params) => {
  //     return this.http.post('/api/npcs/descriptives/add', params);
  // }
  // deleteDescriptives = (params) => {
  //     return this.http.post('/api/npcs/descriptives/delete', params);
  updateBurg = (region, burg) => {
    const call = this.http
      .put("/api/region/" + region.id + "/burg", burg)
      .pipe(share());
    return call;
  };
  updatePOI = (region, poi) => {
    console.log("wth?");
    const call = this.http
      .put("/api/region/" + region.id + "/poi", poi)
      .pipe(share());
    return call;
  };
  getPOI = (region, poi) => {
    console.log(poi);
    let type = typeof poi.capital == "undefined" ? poi.type : "burgs";
    const call = this.http
      .get("/api/region/" + region.id + "/" + type + "/" + poi.i)
      .pipe(share());
    return call;
  };
}
