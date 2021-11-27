import { race } from "rxjs";
import { Region } from "./region";

export class World {
  public id: number;
  public name: string;
  public descriptives: [];
  public professions: Profession[];
  public races: Race[];
  public racesOb: any = {};
  public regions: Region[];
  public stats: [];
  public body_types: string[];
  public descriptive_types: string[];

  constructor(data: any = {}) {
    if (!Object.values(data).length) return;
    data = !!data ? data : {};

    Object.assign(this, data);
    if (typeof this.regions != "undefined") {
      this.regions = this.regions.map((r) => new Region(r));
    }
    console.log(data);
    if (data.races) {
      for (let i = 0; i < data.races.length; i++) {
        this.racesOb[data.races[i].id] = data.races[i];
      }
    }
  }
}

export class NPC {
  public id: number;
  public name: string;
  public city: string;
  public gender: string;
  public level: number;
  public class;
  public profession_id: number;
  public profession;
  public alive: number = 1;
  public married: number;
  public race_id: number;
  public race: Race;
  public spouse_id: number;
  public spouse: NPC;
  public birth_parent_id: number;
  public birting_parent: NPC;
  public parent_id: number;
  public parent: NPC;
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
  public world;
  public events;
  public selectedAttack;
  public desc;
  public notes: string;
  public GP = this.genderPronoun;
  public AGA = this.ageGroupAdjective;
  constructor(data: any = {}, world: World = null) {
    if (!Object.values(data).length) return;
    if (world) {
      this.world = world;
    }
    this.AGA = this.AGA(data);
    Object.assign(this, data);
    console.log(data);
    console.log(world);
    if (!this.notes) {
      this.notes = this.npcDescription(data);
      if (data.features.manner)
        this.notes += "\nManner: " + data.features.manner.text;
      if (data.features.quirk)
        this.notes += "\nQuirk: " + data.features.quirk.text;
    }
  }
  npcDescription(npc) {
    let desc = "..." + this.ageGroupAdjective(npc);
    let f = npc.features;
    console.log(npc);
    desc += f["body extra"] && f["body extra"].text ? " ..." + f.text : "";
    desc += f.clothing.text;
    desc += "... with " + this.facialFeatures(npc);
    desc += f.special.text;
    return desc.toLowerCase();
  }
  public facialFeatures(npc) {
    // skin color
    // skin complexion
    // hair color
    // hair desc
    // eye color
    // eye desc
    // face shape
    let skin =
      npc.features["skin complexion"].text +
      " " +
      npc.features["skin color"].text;
    let hair =
      npc.features["hair description"].text +
      " " +
      npc.features["hair color"].text;
    let eyes =
      npc.features["eye description"].text +
      " " +
      npc.features["eye color"].text;
    let face = npc.features["face shape"].text;
    let r = "";
    if (face && hair !== " ") {
      r = "a " + face + " face framed by " + hair + " hair";
    } else if (face) {
      r = "a " + face + " face";
    } else {
      r = hair + " hair";
    }
    if (eyes !== " " && skin !== " ") {
      r += ", and " + eyes + " eyes set in " + skin + " skin";
    } else if (eyes !== " ") {
      r += ", and " + eyes + " eyes";
    } else {
      r += ", and " + skin + " skin";
    }

    return r;

    // let strings = [];
    // if (skin.trim() !== "skin") strings.push(skin);
    // if (hair.trim() !== "hair") strings.push(hair);
    // if (eyes.trim() !== "eyes") strings.push(eyes);
    // if (face.trim() !== "face") strings.push(face);

    // strings = this.shuffle(strings);
    // if (strings.length === 4) {
    //   r = strings[0] + ', ' + strings[1] + ', and ' + strings[2];
    // } else if (strings.length === 2) {
    //   r = strings[0] + ' and ' + strings[1];
    // } else {
    //   r = strings[0];
    // }
    // r = this.rand(0,1) ? skin + hair +
  }
  public bodyFeatures() {}
  debounce = (func, ms) => {
    let isCooldown = false;

    return function () {
      if (isCooldown) return;
      func.apply(this, arguments);
      isCooldown = true;
      setTimeout(() => (isCooldown = false), ms);
    };
  };

  public genderPronoun(npc, type) {
    if (npc.gender == "Male") {
      return ["he", "him", "his", "man", "boy"][type];
    }
    if (npc.gender == "Female") {
      return ["she", "her", "hers", "woman", "girl"][type];
    }
    return [
      "they",
      "them",
      "theirs",
      this.world.racesOb[npc.race_id].name,
      "child",
    ][type];
  }
  public ageGroupAdjective(npc) {
    let race: Race;
    console.log(npc);
    console.log(this.world);
    if (this.race) {
      race = this.race;
    } else {
      race = this.world.racesOb[npc.race_id];
    }
    if (!race) {
      return "a ";
    }
    if (npc.age < race.adulthood)
      return this.ra([
        "a " +
          npc.features.body.text +
          " " +
          " adolescent " +
          this.genderPronoun(npc, 4),
        "a " +
          npc.features.body.text +
          " " +
          " youthful " +
          this.genderPronoun(npc, 4),
        "a " +
          npc.features.body.text +
          " " +
          " young " +
          this.genderPronoun(npc, 4),
      ]);
    if (npc.age < race.middleAge)
      return "a " + npc.features.body.text + " " + this.genderPronoun(npc, 3);
    if (npc.age < race.oldAge)
      return (
        "a " +
        npc.features.body.text +
        " middle-aged " +
        this.genderPronoun(npc, 3)
      );
    return this.ra([
      "a " +
        npc.features.body.text +
        " " +
        " old " +
        this.genderPronoun(npc, 3),
      "a " +
        npc.features.body.text +
        " " +
        " elderly " +
        this.genderPronoun(npc, 3),
      "a " +
        npc.features.body.text +
        " " +
        " aged " +
        this.genderPronoun(npc, 3),
      "a " +
        npc.features.body.text +
        " " +
        " ancient " +
        this.genderPronoun(npc, 3),
      "a " +
        npc.features.body.text +
        " " +
        " senior " +
        this.genderPronoun(npc, 3),
      "a " +
        npc.features.body.text +
        " " +
        " venerable " +
        this.genderPronoun(npc, 3),
    ]);
  }
  rand(x = 1, y) {
    return x + (crypto.getRandomValues(new Uint32Array(1))[0] % (y - x + 1));
  }
  ra(array) {
    return array[this.rand(0, array.length - 1)];
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

export class POI {
  id: number;
  i: number;
  npcs: NPC[];
  populationRate: number;
  urbanization: number;
  hook: string;
  population: number;
  pop_txt: string;
  biome: number;
  cObject: any;
  capital: number;
  cell: number;
  citadel: number;
  coa: any;
  culture: number;
  elavation: string;
  feature: number;
  plaza: number;
  port: number;
  shanty: number;
  state: number;
  temperature;
  temple: number;
  type: string;
  selectType: string;
  walls: number;
  x: number;
  y: number;
  name: string;

  constructor(data: any = {}) {
    data = !!data ? data : {};
    Object.assign(this, data);
    if (!data.npcs) return;
    this.npcs = data.npcs.map((n) => new NPC(n));
  }
}
