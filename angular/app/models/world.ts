import { race } from "rxjs";
import { Region } from "./region";

export class World {
  public id: number;
  public name: string;
  public descriptives: [];
  public professions: Profession[];
  public races: Race[];
  public regions: Region[];
  public stats: [];
  public body_types: string[];
  public descriptive_types: string[];

  constructor(data: any = {}) {
    data = !!data ? data : {};

    Object.assign(this, data);
    if (typeof this.regions != "undefined") {
      console.log(this.regions);
      this.regions = this.regions.map((r) => new Region(r));
    }
  }
}

export class Npc {
  public id: number;
  public name: string;
  public city: string;
  public gender: string;
  public profession_id: number;
  public profession;
  public alive: number = 1;
  public married: number;
  public race_id: number;
  public race: Race;
  public spouse_id: number;
  public spouse: Npc;
  public birth_parent_id: number;
  public birting_parent: Npc;
  public parent_id: number;
  public parent: Npc;
  public region_id: number;
  public region: Region;
  public age: number;
  public birth_year: number;
  public generation: number;
  public excluded: number;
  public retired: number;
  public met_party: number;
  public abilities: string;
  public features;
  public events;
  public notes: string;
  constructor(data: any = {}) {
    data = !!data ? data : {};

    Object.assign(this, data);
  }
}

export interface Race {
  id: number;
  name: string;
  genders: [];
  adulthood: number;
  middleAge: number;
  oldAge: number;
  venerable: number;
  maxAge: number;
  friendRate: number;
  enemyRate: number;
}

export interface Profession {
  id: number;
  name: string;
  min_age: number;
  max_age: number;
}
