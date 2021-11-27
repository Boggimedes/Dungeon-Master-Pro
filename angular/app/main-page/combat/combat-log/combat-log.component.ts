import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CombatService } from "../../../shared/services/combat.service";
@Component({
  selector: "app-combat-log",
  templateUrl: "./combat-log.component.html",
  styleUrls: ["./combat-log.component.scss"],
})
export class CombatLogComponent implements OnInit {
  @Output() lastDmg: EventEmitter<any> = new EventEmitter();
  public combatLog = [];
  public isCollapsed = [];
  constructor(private combatService: CombatService) {
    if (this.combatLog == []) this.combatLog = combatService.combatLog;
    this.combatLog = JSON.parse(localStorage.getItem("combatLog"));
  }
  findSum(str) {
    // A temporary string
    let temp = "0";

    // holds sum of all numbers
    // present in the string
    let sum = 0;

    // read each character in input string
    for (let i = 0; i < str.length; i++) {
      let ch = str[i];

      // if current character is a digit
      if (parseInt(ch, 10) > 0) temp += ch;
      // if current character is an alphabet
      else {
        // increment sum by number found earlier
        // (if any)
        sum += parseInt(temp);

        // reset temporary string to empty
        temp = "0";
      }
    }

    // atoi(temp.c_str()) takes care of trailing
    // numbers
    return sum + parseInt(temp);
  }
  ngOnInit(): void {
    this.combatService.combatLogChannel$.subscribe((attack: any) => {
      if (this.combatLog == null) this.combatLog = [];
      if (attack.clear) {
        this.combatLog = [];
        return;
      }
      if (!Object.values(attack).length) return;
      if (typeof attack.multiattack !== "undefined") {
        let dmg = 0;
        attack.multiattack.forEach(
          (ma) => (dmg = dmg + this.findSum(ma.damage.join(" ")))
        );
        console.log(dmg);
        this.combatService.lastDmg = dmg;
      } else this.combatService.lastDmg = this.findSum(attack.damage.join(" "));
      if (attack) this.combatLog.unshift(attack);
      this.combatLog = this.combatLog.slice(0, 30);
      localStorage.setItem("combatLog", JSON.stringify(this.combatLog));
    });
  }
}
