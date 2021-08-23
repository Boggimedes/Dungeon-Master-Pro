import { Directive, HostListener, ChangeDetectorRef, OnInit, OnDestroy, HostBinding, Input } from '@angular/core';
import { TopMenuLinkDirective } from '../shared/directives/topmenu-link.directive';
import { Subscription } from 'rxjs';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { Multiattack, Attack } from './attacks';


export class Combatant {

  public name: string;
  public id: number = null;
  public armor_class: number;
  public hit_points: string;
  public initiative: string = null;
  public str: number = 0;
  public dex: number = 0;
  public con: number = 0;
  public int: number = 0;
  public wis: number = 0;
  public cha: number = 0;
  public damage: number;
  public str_save: number = 0;
  public dex_save: number = 0;
  public con_save: number = 0;
  public int_save: number = 0;
  public wis_save: number = 0;
  public cha_save: number = 0;
  public skills: [];
  public selectedAttack: {};
  public selectedSkill: {};
  public legendary: string;
  public legendary_actions: [];
  public attacks: Attack[] = [];
  public multiattacks: Multiattack[] = [];
  private _spellcasting: {};
  public caster_level: Number;
  public spells: [];
  public rangedSpell: Number;
  public senses: string = '';
  public meleeSpell: Number;
  public editable: boolean = false;
  public set spellcasting(value) {
    this._spellcasting = value;
    if (!value) return;
    this.caster_level = value.caster_level;
    this.spells = value.spells;
    this.rangedSpell = value.ranged_spell;
    this.meleeSpell = value.melee_spell;
  };
  public image: string = null;
  public persistentEffect;
  public turn;
  public special;
  public desc;
  public size: string = "Unknown"; 
  
  constructor(private data: any) {
    console.log(typeof data.multiattacks);
    console.log(data.multiattacks);
  if (data.multiattacks) {
      let attackNames;
      let attacks: [Attack];
      let multiattack: Multiattack;

      console.log(typeof data.attacks);
      console.log(data.attacks);
      attacks = data.attacks.map((a) => new Attack(a));
      if (typeof data.attacks !== 'object')  attacks = data.attacks.map((a) => new Attack(a));
      for (let i = 0; i < data.multiattacks.length; i++) {
        if (typeof data.multiattacks[i].attacks !== 'string') continue;
        attackNames = data.multiattacks[i].attacks.split(',');
        multiattack = new Multiattack(data.multiattacks[i]);
        multiattack.attacks = [];
        for (let k = 0; k < attackNames.length; k++) {
          for (let r = 0; r < attacks.length; r++) {
            if (attacks[r].name.toLowerCase() == attackNames[k].toLowerCase()) multiattack.attacks.push(new Attack(attacks[r]));
          }
          data.multiattacks[i] = multiattack;
        }
      }
      data.attacks = attacks;
    }
    Object.assign(this, data);
  }

}
