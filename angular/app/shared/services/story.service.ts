import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { share } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { Campaign } from "../../models/campaign";
import { GameMap } from "../../models/game-map";

@Injectable({
  providedIn: "root",
})
export class StoryService {
  public features = [];
  public religions = [];
  public markers = [];
  public urbanization = 1;
  public populationRate = 1000;
  private campaignListSource = new BehaviorSubject<Campaign[]>([]);
  public campaignList$ = this.campaignListSource.asObservable();
  private dataSource = new BehaviorSubject<{}>({});
  public data$ = this.dataSource.asObservable();
  private zoomSource = new BehaviorSubject<{}>({});
  public zoom$ = this.zoomSource.asObservable();
  private campaignSource = new BehaviorSubject<Campaign>(new Campaign());
  public campaign$ = this.campaignSource.asObservable();
  private mapSource = new BehaviorSubject<GameMap>(new GameMap());
  public map$ = this.mapSource.asObservable();
  private selectedSource = new BehaviorSubject<any>({});
  public selected$ = this.selectedSource.asObservable();
  public day;

  constructor(private http: HttpClient) {}
  zoomTo(x, y, z, d) {
    this.zoomSource.next({ x, y, z, d });
  }
  getCampaigns = () => {
    this.http
      .get("/api/campaigns")
      .subscribe((data: { campaigns: Campaign[] }) =>
        this.campaignListSource.next(data.campaigns)
      );
  };
  getCampaign = (id) => {
    this.http
      .get("/api/campaign/" + id)
      .subscribe((data: { campaign: Campaign }) =>
        this.campaignSource.next(data.campaign)
      );
  };
  updateCampaign = (campaign) => {
    this.http
      .put("/api/campaign/" + campaign.id, campaign)
      .subscribe((data: { campaign: Campaign }) =>
        this.campaignSource.next(data.campaign)
      );
  };
  select = (item, type) => {
    let data: any = this.dataSource.getValue();
    let selected: any = {};

    if (typeof item !== "object") {
      if (typeof item.length != "undefined" && item.length > 3) {
        item = { i: item.replace("marker", "") };
      } else {
        item = { i: item };
      }
    }
    if (type == "marker") {
      const note = data.notes.find((note) => note.id === "marker" + item.i);
      selected = { ...data.markers[item.i], ...item };
      console.log(selected);
    }
    if (type == "npc") {
      selected = item;
    }
    if (type == "burg") {
      selected = { ...data.burgs[item.i], ...item };
      selected.elevation = this.getHeight(
        data.cells.h[selected.cell],
        false,
        data.heightExponent
      );
      if (selected.cell) {
        const temperature = data.cells.temp[data.cells.g[selected.cell]];
        selected.temperature = this.convertTemperature(temperature);
        selected.biome = data.cells.biome[selected.cell];
        selected.biome = data.cells.biome[selected.cell];
      }
    }
    selected.selectType = type;

    if (selected.culture) selected.cObject = data.cultures[selected.culture];
    if (selected?.npcs) selected.npcs = selected.npcs;

    this.selectedSource.next(selected);
  };
  setData = (data, cells) => {
    let settings = data[1].split("|");

    // this.features = JSON.parse(data[12]);
    // this.markers = data[35] ? JSON.parse(data[35]) : [];
    // this.religions = data[29]
    //   ? JSON.parse(data[29])
    //   : [{ i: 0, name: "No religion" }];
    let newData = {
      states: JSON.parse(data[14]),
      burgs: JSON.parse(data[15]),
      populationRate: settings[12],
      urbanization: settings[13],
      cultures: JSON.parse(data[13]),
      notes: JSON.parse(data[4]),
      markers: data[35] ? JSON.parse(data[35]) : [],
      cells: cells,
      heightExponent: settings[4],
    };
    this.dataSource.next(newData);
  };
  getMap = (id) => {
    let cId = this.campaignSource.getValue()
      ? this.campaignSource.getValue().id
      : null;
    this.http
      .post("/api/map/" + id, { campaignId: cId })
      .subscribe((data: { map: GameMap }) => {
        this.mapSource.next(data.map);
      });
  };
  getHeight = (h, abs: any = false, heightExponent) => {
    const unit = "ft"; //this.heightUnit.value;
    let unitRatio = 3.281; // default calculations are in feet
    // if (unit === "m") unitRatio = 1;
    // // if meter
    // else if (unit === "f") unitRatio = 0.5468; // if fathom

    let height = -990;
    if (h >= 20) height = Math.pow(h - 18, heightExponent);
    else if (h < 20 && h > 0) height = ((h - 20) / h) * 50;

    if (abs) height = Math.abs(height);
    return Math.round(height * unitRatio) + " " + unit;
  };
  convertTemperature = (c) => {
    return Math.round((c * 9) / 5 + 32) + "°F";
  };
  updateCampaignPOI = (poi, campaign) => {
    return this.http.put(
      "/api/campaign-poi/" + campaign.id + "/" + poi.region_id,
      poi
    );
  };
  updateCampaignNPC = (npc, campaign) => {
    return this.http.put(
      "/api/campaign-npc/" + campaign.id + "/" + npc.id,
      npc
    );
  };
  resetCampaignPOI = (poi, campaign) => {
    return this.http.delete(
      "/api/campaign-poi/" + campaign.id + "/" + poi.region_id
    );
  };
  resetCampaignNPC = (npc, campaign) => {
    return this.http.delete("/api/campaign-npc/" + campaign.id + "/" + npc.id);
  };
  // random number in a range
  rand(x = 1, y) {
    return x + (crypto.getRandomValues(new Uint32Array(1))[0] % (y - x + 1));
  }
  // return random value from the array
  ra = (array) => {
    return array[this.rand(0, array.length - 1)];
  };
  // probability shorthand
  P = (probability) => {
    if (probability >= 1) return true;
    if (probability <= 0) return false;
    return Math.random() < probability;
  };
  each = (n) => {
    return (i) => i % n === 0;
  };
  // probability shorthand for floats
  Pint = (float) => {
    return ~~float + +this.P(float % 1);
  };
  abbreviateNumber(value) {
    let newValue: any = parseInt(value, 10);
    value = parseInt(value, 10);
    if (value >= 1000) {
      var suffixes = ["", "k", "m", "b", "t"];
      var suffixNum = Math.floor(("" + value).length / 3);
      var shortValue: any = "";
      for (var precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat(
          (suffixNum != 0
            ? value / Math.pow(1000, suffixNum)
            : value
          ).toPrecision(precision)
        );
        var dotLessShortValue = (shortValue + "").replace(
          /[^a-zA-Z 0-9]+/g,
          ""
        );
        if (dotLessShortValue.length <= 2) {
          break;
        }
      }

      if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
      if (shortValue < 1) {
        shortValue = shortValue * 1000;
        suffixNum -= 1;
      }
      newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
  }
}
