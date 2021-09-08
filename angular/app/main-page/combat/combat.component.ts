import {
	Component,
	OnInit,
	ViewChild,
	HostListener,
	ElementRef,
	AfterViewInit,
} from "@angular/core";
import { CombatService } from "../../shared/services/combat.service";
import { WorldService } from "../../shared/services/world.service";
import { MonsterService } from "../../shared/services/monster.service";
import { Combatant } from "../../models/combatant";
import { PagerInfo } from "../../models/pager";
import { ContextMenuItem } from "../../models/context-menu-item";
import { Attack } from "../../models/attacks";
import { MatMenuTrigger } from "@angular/material/menu";
import { Subscription, Observable, Subject, fromEvent } from "rxjs";
import {
	filter,
	debounceTime,
	distinctUntilChanged,
	tap,
} from "rxjs/operators";
import {
	PerfectScrollbarConfigInterface,
	PerfectScrollbarComponent,
} from "ngx-perfect-scrollbar";
import { faPiedPiperAlt } from "@fortawesome/free-brands-svg-icons";
import { faBookDead } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-combat",
	templateUrl: "./combat.component.html",
	styleUrls: ["./combat.component.scss"],
})
export class CombatComponent implements OnInit {
	subject = new Subject();
	@ViewChild(PerfectScrollbarComponent, { static: false })
	componentRef?: PerfectScrollbarComponent;
	@ViewChild("input") input: ElementRef;
	public config: PerfectScrollbarConfigInterface = {};
	combatLog = "";
	status = {
		isopen: false,
	};
	@ViewChild(MatMenuTrigger)
	combatMenu: MatMenuTrigger;
	faBookDead = faBookDead;
	faHeart = faHeart;
	fasHeart = fasHeart;
	faPiedPiperAlt = faPiedPiperAlt;
	@ViewChild(MatMenuTrigger)
	diceMenu: MatMenuTrigger;
	combatantsSubscription: Subscription;
	@ViewChild(MatMenuTrigger)
	hitpointsMenu: MatMenuTrigger;
	combatSide = "monsters";
	public page: number = 1;
	public pageSize: number = 9;
	contextMenuPosition = { x: "0px", y: "0px" };
	_selectedRow = null;
	get selectedRow() {
		return this._selectedRow;
	}
	set selectedRow(value) {
		this.selectedCombatant = this.combatants[value];
		this._selectedRow = value;
		this.selectedAttack = this.selectedCombatant.selectedAttack;
		this.senses = "";
		this.senses = this.selectedCombatant.senses
			.replace("darkvision", "<strong>Darkvision</strong>")
			.replace(
				"passive Perception",
				"<strong>Passive Perception</strong>"
			);
		this.special = this.selectedCombatant.special;
		this.desc = this.selectedCombatant.desc;
	}
	selectedCombatant: Combatant = new Combatant({});
	recentMonsters = [];
	favoriteMonsters: any;
	groups;
	senses;
	desc;
	combatants: Combatant[] = [];
	diceBagQuick;
	slider;
	new: any = { name: "", ac: "", initiative: "", attack: "", damage: "" };
	diceOptions;
	combatOptions;
	hpOptions;
	currentTurn = 0;
	menuTopLeftPosition = { x: "0", y: "0" };
	hitPointsOptions;
	isDisplayContextMenu: boolean;
	rightClickMenuItems: Array<ContextMenuItem> = [];
	rightClickMenuPositionX: number;
	rightClickMenuPositionY: number;
	menuOptions;
	world = { advDisAdv: true };
	qEntry;
	cButtonHelp;
	selectedAttack;
	selectedSkill;
	effect;
	diceBagHelp;
	message;
	roll;
	group;
	member;
	pushGroup;
	persistent;
	freeRoll;
	special;
	addCombatant;
	attackFunction;
	multiattack;
	castSpell;
	combatTurn;
	monsters: [];
	monsterSearch: string;
	pagerInfo: PagerInfo;
	viewFavorites: boolean = true;
	displayContextMenu(event, menu, item) {
		console.log(event);
		console.log(menu);
		console.log(item);

		this.isDisplayContextMenu = true;

		this.rightClickMenuItems = menu;

		this.rightClickMenuPositionX = event.clientX;
		this.rightClickMenuPositionY = event.clientY;
	}

	getRightClickMenuStyle() {
		return {
			position: "fixed",
			left: `${this.rightClickMenuPositionX}px`,
			top: `${this.rightClickMenuPositionY}px`,
		};
	}

	@HostListener("document:click")
	documentClick(): void {
		this.isDisplayContextMenu = false;
	}

	setCombatPage(value) {
		console.log(value);
		this.combatSide = value;
	}

	constructor(
		private combatService: CombatService,
		private worldService: WorldService,
		private monsterService: MonsterService
	) {
		this.diceBagQuick = this.combatService.diceBagQuick;
		this.recentMonsters = this.combatService.recentMonsters;
		this.favoriteMonsters = this.combatService.favoriteMonsters;
		this.addCombatant = this.combatService.addCombatant;
		this.combatTurn = this.combatService.combatTurn;
		this.castSpell = this.combatService.castSpell;
	}
	allMonsters() {
		this.monsterSearch = "";
		this.monsterService.getMonsters("", 1).subscribe((result: any) => {
			this.pagerInfo = new PagerInfo(result);
			this.monsters = result.data;
			this.viewFavorites = false;
		});
	}
	changePage = (page: number) => {
		this.monsterService
			.getMonsters(this.monsterSearch, page)
			.subscribe((result: any) => {
				this.pagerInfo = new PagerInfo(result);
				this.monsters = result.data;
				this.viewFavorites = false;
			});
	};
	ngAfterViewInit() {
		// server-side search
		fromEvent(this.input.nativeElement, "keyup")
			.pipe(
				filter(Boolean),
				debounceTime(1250),
				distinctUntilChanged(),
				tap((text) => {
					this.monsterService
						.getMonsters(this.input.nativeElement.value, 1)
						.subscribe((result: any) => {
							this.pagerInfo = new PagerInfo(result);
							this.monsters = result.data;
							this.viewFavorites = false;
						});
				})
			)
			.subscribe();
	}
	removeCombatant() {}
	favorite(monster) {
		this.favoriteMonsters.push(monster);
		this.combatService.storageSave(
			"favoriteMonsters",
			this.favoriteMonsters
		);
	}
	unFavorite(monster) {
		this.favoriteMonsters = this.favoriteMonsters.filter(function (obj) {
			return obj.id !== monster.id;
		});
		this.combatService.storageSave(
			"favoriteMonsters",
			this.favoriteMonsters
		);
	}
	isFavorite(monster) {
		for (let i = 0; i < this.favoriteMonsters.length; i++) {
			if (this.favoriteMonsters[i].id == monster.id) return true;
		}
	}
	deathCheck = (hp, index) => {
		if (hp < 0) {
			this.combatants.splice(index, 1);
		}
	};
	clearCombat = function () {
		this.combatService.clearCombatants();
		this.combatService.clearLog();
	};
	updateCombatant = (event, key) => {
		this.combatants[this.selectedRow][key] = event.target.value;
		this.combatService.order(this.combatants);
	};
	loadCombatant = (combatant, order = true) => {
		if (!this.new.str) this.new.str = 0;
		if (!this.new.dex) this.new.dex = 0;
		combatant = new Combatant(combatant);
		console.log(combatant);
		let recentExists = false;
		for (let i = 0; i < this.recentMonsters.length; i++) {
			if (this.recentMonsters[i].id == combatant.id) recentExists = true;
		}
		if (!recentExists && combatant.id !== null) {
			this.recentMonsters.push(combatant);
			this.combatService.storageSave(
				"recentMonsters",
				this.recentMonsters
			);
		}
		if (this.recentMonsters.length > 5)
			this.recentMonsters.splice(0, this.recentMonsters.length - 5);

		let count = this.combatants.reduce(function (n, c) {
			return (
				n +
				(c.name.substring(0, combatant.name.length) === combatant.name
					? 1
					: 0)
			);
		}, 0);
		combatant["name"] =
			combatant.name + (count == 0 ? "" : " " + (count + 1));
		combatant["hp"] = eval(
			this.combatService.rollDice(combatant.hit_points)
		);
		if (combatant.initiative != null) {
			combatant["initiative"] = eval(
				this.combatService.rollDice("1d20+" + combatant.initiative)
			);
		}
		combatant["turn"] = this.currentTurn;
		combatant["armor_class"] = eval(
			this.combatService.rollDice(combatant.armor_class)
		);

		if (combatant.attacks == null || !combatant.attacks.length) {
			combatant.attacks = [
				{
					name: "Generic 1d6",
					type: "attack",
					bonus: combatant["attack"] ? "+" + combatant["attack"] : "",
					damage: "1d6+{str} {tooltip}(ex: Shortsword, Mace, Spear){tooltip}",
				},
				{
					name: "Generic 1d8",
					type: "attack",
					bonus: "+" + combatant["attack"],
					damage: "1d8+{str} {tooltip}(ex: Katana, Quarterstaff, Scythe){tooltip}",
				},
				{
					name: "Generic 1d10",
					type: "attack",
					bonus: "+" + combatant["attack"],
					damage: "1d10+{str} {tooltip}(ex: Bastard Sword, Glaive){tooltip}",
				},
				{
					name: "Generic 1d12",
					type: "attack",
					bonus: "+" + combatant["attack"],
					damage: "1d12+{str.5}+{str} {tooltip}(ex: GreatAxe, GreatSword, Maul){tooltip}",
				},
			];
			combatant.selectedAttack = combatant.attacks[0];
		}
		console.log(combatant);
		this.combatService.addCombatant(combatant);
	};
	addGroup = function (group) {
		console.log(group);
		for (let i = 0; i < group.group.length; i++) {
			this.loadCombatant(group.group[i]);
		}
	};
	startCombat = function () {
		this.combatService.startCombat();
	};

	// preAction = function(scope) {
	//     console.log(scope);
	//     console.log( this.combatants[this.selectedRow]);
	//     if (typeof scope.subsubitem != "undefined") {
	//         scope.$parent.svisible = false;
	//         scope.$parent.$parent.visible = false;
	//         this.Ui.turnOff('combatantDropdown');
	//         this.combatants[this.selectedRow].selectedAttack = scope.subsubitem;
	//         this.combatants[this.selectedRow].casterLevel = scope.$parent.$parent.attack.cl
	//         this.combatants[this.selectedRow].subitem = scope.subitem;
	//         let objectData = {
	//             "where": [{
	//                 "name": scope.subsubitem.name
	//             }]
	//         };
	//         this.combatService.getSpells(objectData).then(
	//             function(response) {
	//                 this.combatants[this.selectedRow].spell = response.data;
	//                 this.combatants[this.selectedRow].spell.fulltext = $sce.trustAsHtml(this.combatants[this.selectedRow].spell.fulltext);
	//             },
	//             function(err) {
	//         if(err.status == 401){console.log(15);this.Ui.turnOn('login');}
	//                 console.log(err);
	//             });
	//     } else if (typeof scope.subitem != "undefined") {
	//         scope.$parent.visible = false;
	//         this.Ui.turnOff('combatantDropdown');
	//         this.combatants[this.selectedRow].selectedAttack = scope.subitem;
	//         console.log(scope.subitem);
	//     } else {
	//         this.Ui.turnOff('combatantDropdown');
	//         //scope.attack.submenu = null
	//         this.combatants[this.selectedRow].selectedAttack = scope.attack;
	//         console.log(scope.attack);
	//     }
	// }

	addDie = (die) => {
		this.diceBagQuick.push({
			name: die.name,
			roll: die.roll,
		});
		this.new.roll = "";
		this.new.name = "";
	};
	onContextMenu(event: MouseEvent, item, index) {
		event.preventDefault();
		this.contextMenuPosition.x = event.clientX + "px";
		this.contextMenuPosition.y = event.clientY + "px";
	}
	openCombatMenu(event: MouseEvent, combatant, index) {
		this.onContextMenu(event, combatant, index);
		this.combatMenu.menuData = { item: combatant };
		this.combatMenu.menu.focusFirstItem("mouse");
		this.combatMenu.openMenu();
	}

	openDiceMenu(event: MouseEvent, die, index) {
		this.onContextMenu(event, die, index);
		this.diceMenu.menuData = { item: die };
		this.diceMenu.menu.focusFirstItem("mouse");
		this.diceMenu.openMenu();
	}

	openHitpointsMenu(event: MouseEvent, combatant, index) {
		this.onContextMenu(event, combatant, index);
		this.hitpointsMenu.menuData = { item: combatant };
		this.hitpointsMenu.menu.focusFirstItem("mouse");
		this.hitpointsMenu.openMenu();
	}
	onContextMenuAction1(item) {
		alert(`Click on Action 1 for ${item.name}`);
	}

	onContextMenuAction2(item) {
		alert(`Click on Action 2 for ${item.name}`);
	}
	ngOnInit(): void {
		this.combatantsSubscription = this.combatService.combatants$.subscribe(
			(combatants) => {
				this.combatants = combatants;
			}
		);

		//     this.diceOptions = [
		//         ['Edit', (index) => {
		//             this.new.roll = this.diceBagQuick[index].roll;
		//             this.new.name = this.diceBagQuick[index].name;
		//             this.diceBagQuick.splice(index, 1);
		//         }],
		//         null, ['Remove', (index) => {
		//             this.diceBagQuick.splice(index, 1);
		//         }]
		//     ];

		//     this.combatOptions = [
		//         {text: 'Remove', handler: (index) => {
		//             this.combatService.removeCombatant(index);
		//         }, subMenu: null},
		//         {text: 'Roll Init', handler: (index, combatant) => {
		//             let combatants = this.combatants;
		//             this.combatants[index].initiative = eval(this.combatService.rollDice("1d20+" + combatant.dex));
		//             this.combatService.order(this.combatants);
		//         }, subMenu: null},
		//         {text: 'Roll Save', handler: (index) => {
		//         }, subMenu: [
		//         {text: 'Str', handler: (index, combatant) => {
		//             this.combatService.combatTurn(combatant.name, new Attack({name: "Str Save", damage: "1d20+"+combatant.str_save}));
		//         }},
		//         {text: 'Dex', handler: (index, combatant) => {
		//             this.combatService.combatTurn(combatant.name, new Attack({name: "Dex Save", damage: "1d20+"+combatant.dex_save}));
		//         }},
		//         {text: 'Con', handler: (index, combatant) => {
		//             this.combatService.combatTurn(combatant.name, new Attack({name: "Con Save", damage: "1d20+"+combatant.con_save}));
		//         }},
		//         {text: 'Int', handler: (index, combatant) => {
		//             this.combatService.combatTurn(combatant.name, new Attack({name: "Int Save", damage: "1d20+"+combatant.int_save}));
		//         }},
		//         {text: 'Wis', handler: (index, combatant) => {
		//             this.combatService.combatTurn(combatant.name, new Attack({name: "Wis Save", damage: "1d20+"+combatant.wis_save}));
		//         }},
		//         {text: 'Cha', handler: (index, combatant) => {
		//             this.combatService.combatTurn(combatant.name, new Attack({name: "Cha Save", damage: "1d20+"+combatant.cha_save}));
		//         }}
		//     ]},
		//         {text: 'Roll Save for All', handler: ()=> {
		//         },  [
		//         {text: 'Str', handler: () => {
		//             for (let i = 0; i < this.combatants.length; i++) {
		//                 let combatant = this.combatants[i];
		//                 if(typeof combatant.str_save=="undefined") continue;
		//                  this.combatService.combatTurn(combatant.name, new Attack({name: "Str Save", damage: "1d20+"+combatant.str_save}));
		//            }
		//         }},
		//         {text: 'Dex', handler: () => {
		//             for (let i = 0; i < this.combatants.length; i++) {
		//                 let combatant = this.combatants[i];
		//                 if(typeof combatant.dex_save=="undefined") continue;
		//                  this.combatService.diceBag(combatant.name, new Attack({name: "Dex Save", damage: "1d20+"+combatant.dex_save}));
		//            }
		//         }},
		//         {text: 'Con', handler: () => {
		//             for (let i = 0; i < this.combatants.length; i++) {
		//                 let combatant = this.combatants[i];
		//                 if(typeof combatant.con_save=="undefined") continue;
		//                  this.combatService.diceBag(combatant.name, new Attack({name: "Con Save", damage: "1d20+"+combatant.con_save}));
		//            }
		//         }},
		//         {text: 'Int', handler: () => {
		//             for (let i = 0; i < this.combatants.length; i++) {
		//                 let combatant = this.combatants[i];
		//                 if(typeof combatant.int_save=="undefined") continue;
		//                  this.combatService.diceBag(combatant.name, new Attack({name: "Int Save", damage: "1d20+"+combatant.int_save}));
		//            }
		//         }},
		//         {text: 'Wis', handler: () => {
		//             for (let i = 0; i < this.combatants.length; i++) {
		//                 let combatant = this.combatants[i];
		//                 if(typeof combatant.wis_save=="undefined") continue;
		//                  this.combatService.diceBag(combatant.name, new Attack({name: "Wis Save", damage: "1d20+"+combatant.wis_save}));
		//            }
		//         }},
		//         {text: 'Cha', handler: () => {
		//             for (let i = 0; i < this.combatants.length; i++) {
		//                 let combatant = this.combatants[i];
		//                 if(typeof combatant.cha_save=="undefined") continue;
		//                  this.combatService.diceBag(combatant.name, new Attack({name: "Cha Save", damage: "1d20+"+combatant.cha_save}));
		//            }
		//         }}
		//     ]
		// ],
		//         {text: 'Add Persistent Effect', function(index, combatant) {
		//             if(combatant.persistentEffect) combatant.pE = [];
		//         }, null],
		//         {text: 'Save Board to Group', function(index, combatant) {
		//             let groupName=prompt("Group Name","");
		//             let group = JSON.parse(JSON.stringify(this.combatants));
		//             if(groupName!=null && groupName!="") this.groups.push({"name":groupName,"group":group});
		//         }, null]
		//     ];

		//     this.hitPointsOptions = [
		//         {text: '25', function(index, combatant) {
		//             combatant.hit_points -= 25;
		//         }, "stay"],
		//         ['15', function(index, combatant) {
		//             combatant.hit_points -= 15;
		//         }, "stay"],
		//         ['5', function(index, combatant) {
		//             combatant.hit_points -= 5;
		//         }, "stay"],
		//         ['25', function(index, combatant) {
		//             combatant.hit_points += 25;
		//         }, "stay"],
		//         ['15', function(index, combatant) {
		//             combatant.hit_points += 15;
		//         }, "stay"],
		//         ['5', function(index, combatant) {
		//             combatant.hit_points += 5;
		//         }, "stay"],
		//         ' '
		//     ];
	}

	ngOnDestroy() {
		if (this.combatantsSubscription)
			this.combatantsSubscription.unsubscribe();
	}
}
