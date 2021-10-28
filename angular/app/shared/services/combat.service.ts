import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Attack } from "../../models/attacks";
import { Multiattack } from "../../models/attacks";
import { HttpClient } from "@angular/common/http";
import { Combatant } from "../../models/combatant";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";

@Injectable({
  providedIn: "root",
})
export class CombatService {
  private combatLogSource = new BehaviorSubject({});
  public combatLogChannel$ = this.combatLogSource.asObservable();
  private combatantsSource = new BehaviorSubject<Combatant[]>([]);
  public combatants$ = this.combatantsSource.asObservable();
  public combatLog = [];
  public recentMonsters = [];
  public groups = [];
  public diceBagQuick = [];
  public favoriteMonsters = [];
  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private http: HttpClient
  ) {
    if (localStorage.getItem("groups"))
      this.groups = JSON.parse(localStorage.getItem("groups"));
    if (localStorage.getItem("combatants")) {
      let combatants = JSON.parse(localStorage.getItem("combatants"));
      for (let i = 0; i < combatants.length; i++) {
        combatants[i] = new Combatant(combatants[i]);
      }

      this.combatantsSource.next(combatants);
    }
    if (localStorage.getItem("recentMonsters"))
      this.recentMonsters = JSON.parse(localStorage.getItem("recentMonsters"));
    if (localStorage.getItem("favoriteMonsters"))
      this.favoriteMonsters = JSON.parse(
        localStorage.getItem("favoriteMonsters")
      );
    if (localStorage.getItem("diceBagQuick"))
      this.diceBagQuick = JSON.parse(localStorage.getItem("diceBagQuick"));
    console.log(this.diceBagQuick);
    console.log(!this.diceBagQuick);
    if (!this.diceBagQuick.length)
      this.diceBagQuick = [
        {
          name: "d4",
          roll: "1d4",
        },
        {
          name: "d6",
          roll: "1d6",
        },
        {
          name: "d8",
          roll: "1d8",
        },
        {
          name: "d10",
          roll: "1d10",
        },
        {
          name: "d12",
          roll: "1d12",
        },
        {
          name: "d20",
          roll: "1d20",
        },
        {
          name: "d100",
          roll: "1d100",
        },
        {
          name: "6d6",
          roll: "6d6",
        },
        {
          name: "2d20",
          roll: "1d20 | 1d20",
        },
      ];
  }
  public clearLog = () => {
    this.combatLogSource.next({ clear: true });
  };
  public clearCombatants = () => {
    this.combatantsSource.next([]);
  };

  public startCombat = () => {
    let combatants = this.combatLogSource.getValue();
    for (let i in combatants) {
      combatants[i].turn = 1;
    }
  };

  public storageSave = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  public multiattack = (combatant, multi, adv) => {
    let attacks = multi.attacks.split(",");
    for (let i = 0; i < attacks.length; i++) {
      this.combatTurn(combatant, multi, adv);
    }
  };
  public spell = (combatant, spell, adv) => {
    // let attacks = multi.attacks.split(',');
    // for (let i = 0; i < attacks.length;i++) {
    // 	this.combatTurn(combatant, multi, null, adv);
    // }
  };

  combatTurn = (
    combatant: string | Combatant = null,
    attack: string | Attack | Multiattack = null,
    adv: string = null
  ) => {
    let damage = null;
    let log: any = {};
    let actor;
    console.log(actor);
    console.log(attack);
    console.log(attack instanceof String);
    console.log(typeof attack);

    if (typeof combatant == "string") {
      actor = combatant;
    } else {
      actor = combatant.name;
    }
    if (attack == null) {
      attack = new Attack({
        bonus: "+0",
        name: "Straight d20" + adv,
      });
    }
    if (attack instanceof Multiattack) {
      let multi = [];
      for (let i = 0; i < attack.attacks.length; i++) {
        multi.push(this.processAttack(combatant, attack.attacks[i], adv));
      }
      log.multiattack = multi;
      log.actor = actor;
      log.name = attack.name;
    }
    if (attack instanceof Attack) {
      log = this.processAttack(combatant, attack, adv);
      log.actor = actor;
      log.name = attack.name;
      console.log(actor);
      console.log(attack);
    }
    if (typeof attack == "string") {
      log = {
        actor: actor,
        name: attack,
        dice: this.rollDice(attack),
      };
    }
    this.combatLogSource.next(log);
  };
  castSpell = (spellId: Number, combatant, adv) => {
    this.http.get("/api/spell/" + spellId).subscribe((spell: any) => {
      let damage = spell.damage;
      let attack = spell.attack;
      if (typeof damage == "undefined") damage = "";
      if (typeof attack == "undefined") attack = "";
      else {
        attack = attack.replace("melee", combatant.melee_spell);
        attack = attack.replace("ranged", combatant.ranged_spell);
      }
      if (damage.substring(0, 8) == "#summon#") {
        let summon = damage.substring(8);
        summon = summon.replace("#init#", 0);
        summon = summon.replace("#meleespell#", combatant.melee_spell);
        summon = summon.replace("#rangedspell#", combatant.ranged_spell);
        summon = JSON.parse(summon);

        let combatants = this.combatantsSource.getValue();
        combatants.push(summon);
        combatants[combatants.length - 1].initiative = combatant.init;
        this.order(combatants);
      } else {
        damage = damage.replace("{level}", combatant.caster_level);
        let preCalc = damage.match(/\{.*?\}/g);
        if (preCalc == null) preCalc = [];
        for (let i = 0; i < preCalc.length; i++) {
          damage = damage.replace(
            preCalc[i],
            Math.round(eval(preCalc[i].slice(1, -1)))
          );
        }
      }
      let combattxt = new Attack({
        name: spell.name,
        bonus: attack,
        damage: damage,
        special: combatant.spell.shorttext,
      });
      this.combatTurn(combatant.name, combattxt, adv);
    });
  };

  private processAttack(
    combatant: string | Combatant,
    attack: Attack,
    adv: string
  ) {
    let damage = null;
    let log: any = {};
    damage = this.attribReplace(combatant, attack.damage);
    attack.bonus = this.attribReplace(combatant, attack.bonus);
    if (!damage) damage = attack.damage;
    let AC;
    if (attack.bonus) {
      if (
        attack.bonus.substr(0, 1) != "+" &&
        attack.bonus.substr(0, 1) != "-"
      ) {
        attack.bonus = "+" + attack.bonus;
      }
    } else attack.bonus = "+0";
    if (attack.bonus == "+") attack.bonus = "";
    switch (adv) {
      case "a":
        AC = eval(
          Math.max(this.getRandomInt(1, 20), this.getRandomInt(1, 20)) +
            attack.bonus
        );
        break;
      case "d":
        AC = eval(
          Math.min(this.getRandomInt(1, 20), this.getRandomInt(1, 20)) +
            attack.bonus
        );
        break;
      default:
        AC = this.getRandomInt(1, 20) + attack.bonus;
        break;
    }
    log = {
      name: attack.name,
      damage: this.rollDice(damage),
      thac0: eval(AC),
      special: attack.special,
    };
    if (log.damage != null) log.damage = log.damage.split("{tooltip}");

    if (log.special != null) log.special = log.special.split("{tooltip}");

    return log;
  }

  public getRandomInt = (x, y) =>
    x + (crypto.getRandomValues(new Uint32Array(1))[0] % (y - x + 1));

  // public getRandomInt = (min, max) => {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };

  public addCombatant = (combatant: Combatant) => {
    let combatants = this.combatantsSource.getValue();
    combatants.push(new Combatant(combatant));
    this.storageSave("combatants", combatants);
    this.combatantsSource.next(combatants);
  };
  public attribReplace = (combatant, roll) => {
    let reg: any;
    let vMatch: string;
    let value: number;
    let attrib;
    if (!roll) return;
    reg =
      /\{(str|STR|Str|dex|DEX|Dex|con|Con|CON|int|Int|INT|wis|Wis|WIS|cha|Cha|CHA)\}/g;
    vMatch = roll.match(reg);
    if (vMatch == null) return roll;
    for (let r = 0; r < vMatch.length; r++) {
      attrib = vMatch[r].replace("{", "").replace("}", "");
      value = combatant[attrib] ? combatant[attrib] : 0;
      console.log(value);
      roll = roll.replace(vMatch[r], value);
    }
    reg =
      /\{(str.5|STR.5|Str.5|dex.5|DEX.5|Dex.5|con.5|Con.5|CON.5|int.5|Int.5|INT.5|wis.5|Wis.5|WIS.5|cha.5|Cha.5|CHA.5)\}/g;
    vMatch = roll.match(reg);
    if (vMatch == null) return roll;
    for (let r = 0; r < vMatch.length; r++) {
      attrib = vMatch[r].replace("{", "").replace(".5}", "");
      value = combatant[attrib] ? combatant[attrib] : 0;

      roll = roll.replace(vMatch[r], Math.floor(value * 0.5));
    }
    return roll;
  };
  public rollDice = (roll) => {
    if (
      roll == "-" ||
      roll == "" ||
      roll == [] ||
      roll == null ||
      typeof roll == undefined
    ) {
      return "";
    }

    let result = 0;
    let reg = /[0-9]+d[0-9]+/g;
    let vMatch;
    let tRoll;
    let rollStr;
    rollStr = String(roll);
    vMatch = rollStr.match(reg);
    if (vMatch == null) {
      vMatch = [];
    }
    for (let r = 0; r < vMatch.length; r++) {
      tRoll = vMatch[r].split("d");
      console.log(tRoll);
      result = 0;
      for (let i = 0; i < tRoll[0]; i++) {
        result = result + this.getRandomInt(1, tRoll[1]);
      }
      rollStr = rollStr.replace(vMatch[r], result);
      console.log(rollStr);
      console.log(result);
    }
    reg = /[0-9\+-]{3,10}/g;
    vMatch = rollStr.match(reg);
    console.log(vMatch);
    if (vMatch == null) {
      roll = rollStr;
    } else {
      for (let r = 0; r < vMatch.length; r++) {
        rollStr = rollStr.replace(vMatch[r], eval(vMatch[r]));
      }
    }
    return rollStr;
  };
  public order = (combatants = this.combatantsSource.getValue()) => {
    combatants.sort((a: any, b: any) => {
      if (a["turn"] < b["turn"]) {
        return -1;
      } else if (a["turn"] > b["turn"]) {
        return 1;
      } else {
        if (a["-init"] < b["-init"]) {
          return -1;
        } else if (a["-init"] > b["-init"]) {
          return 1;
        } else {
          if (a["name"] < b["name"]) {
            return -1;
          } else if (a["name"] > b["name"]) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    });
    this.combatantsSource.next(combatants);
  };
  public endTurn = (index) => {
    let combatants = this.combatantsSource.getValue();
    combatants[index].turn += 1;
    let first = combatants[0];
    this.order(combatants);
    combatants = this.combatantsSource.getValue();
    if (first != combatants[0] && combatants[0].persistentEffect) {
      let combatant = combatants[0];
      for (let i = 0; i < combatant.persistentEffect.length; i++) {
        combatant.persistentEffect[i].duration--;

        if (
          combatant.persistentEffect[i].duration %
            combatant.persistentEffect[i].frequency ==
          0
        ) {
          let hpChange = "";
          if (typeof combatant.persistentEffect[i].hit_points != "undefined") {
            this.rollDice(combatant.persistentEffect[i].hit_points);
            combatant.hit_points = eval(combatant.hit_points + hpChange);
            hpChange = " (HP: " + hpChange + ")";
          }
          if (combatant.persistentEffect[i].duration == 0)
            hpChange = hpChange + " <-Effect Ends";
          this.combatTurn(
            combatant.name,
            combatant.persistentEffect[i].name,
            combatant.persistentEffect[i].effect + hpChange
          );
        }
        if (combatant.persistentEffect[i].duration == 0)
          combatant.persistentEffect.splice(i, 1);
      }
      combatants[0] = combatant;
      this.order(combatants);
    }
  };
  public removeCombatant = ($index) => {
    let combatants = this.combatantsSource.getValue();
    combatants.splice($index, 1);
    this.combatantsSource.next(combatants);
  };
}
