import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { PageRoutingModule } from "./page-routing.module";
import { SharedModule } from "../shared/shared.module";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PageComponent } from "./page.component";
import { CombatComponent } from "./combat/combat.component"
import { StoryComponent } from "./story/story.component"
import { CombatLogComponent } from "./combat/combat-log/combat-log.component"
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap/";
import { FormsModule } from '@angular/forms';
import { FreeDraggingDirective } from "../shared/directives/free-dragging.directive";
import { FreeDraggingHandleDirective } from '../shared/directives/free-dragging-handle.directive';
import { EditSoundsComponent } from './edit-sounds/edit-sounds.component';
import { EditMonstersComponent } from './edit-monsters/edit-monsters.component';
import { EditSpellsComponent } from './edit-spells/edit-spells.component';
import { EditWorldsComponent } from './edit-worlds/edit-worlds.component';
import { EditNpcsComponent } from './edit-npcs/edit-npcs.component';

@NgModule({
  imports: [
    
    CommonModule,
    PageRoutingModule,
    SharedModule,
    NgbModule,
    NgbDropdownModule,
    FormsModule,
    PerfectScrollbarModule,
    FontAwesomeModule,
  ],
  exports: [NgbDropdownModule, FreeDraggingDirective,
    FreeDraggingHandleDirective,],
  declarations: [
    FreeDraggingDirective, 
    FreeDraggingHandleDirective,
    PageComponent,
    StoryComponent,
    CombatComponent,
    CombatLogComponent,
    EditSoundsComponent,
    EditMonstersComponent,
    EditSpellsComponent,
    EditWorldsComponent,
    EditNpcsComponent,
  ],
  providers: [],
})
export class PageModule { }