import { Component, OnInit } from "@angular/core";
import { CombatService } from "../../../shared/services/combat.service";
@Component({
	selector: "app-combat-log",
	templateUrl: "./combat-log.component.html",
	styleUrls: ["./combat-log.component.scss"],
})
export class CombatLogComponent implements OnInit {
	public combatLog = [];
	public isCollapsed = [];
	constructor(private combatService: CombatService) {
		if (this.combatLog == []) this.combatLog = combatService.combatLog;
	}

	ngOnInit(): void {
		this.combatService.combatLogChannel$.subscribe((attack: any) => {
			if (attack.clear) {
				this.combatLog = [];
				return;
			}
			console.log(attack);
			if (attack) this.combatLog.unshift(attack);
			this.combatLog = this.combatLog.slice(0, 30);
		});
	}
}
