import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageComponent } from "./page.component";
import { CombatComponent } from "./combat/combat.component";
import { StoryComponent } from "./story/story.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { EditWorldsComponent } from "./edit-worlds/edit-worlds.component";
import { EditNpcsComponent } from "./edit-npcs/edit-npcs.component";
import { EditMapsComponent } from "./edit-maps/edit-maps.component";
import { AuthGuard } from "../shared/auth/auth-guard.service";

const routes: Routes = [
  {
    path: "app",
    component: PageComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: {
      title: "Game Master Pro",
    },
    children: [
      {
        path: "welcome",
        component: WelcomeComponent,
        data: {
          title: "Welcome",
        },
      },
    ],
  },
  {
    path: "app/region/:regionId",
    component: PageComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: {
      title: "Game Master Pro",
    },
    children: [
      {
        path: "story",
        component: StoryComponent,
        data: {
          title: "Story",
        },
      },
      {
        path: "edit-npcs",
        component: EditNpcsComponent,
        data: {
          title: "Edit NPCs",
        },
      },
      {
        path: "edit-map",
        component: EditMapsComponent,
        data: {
          title: "Edit Map",
        },
      },
    ],
  },
  {
    path: "app/world/:worldId",
    component: PageComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: {
      title: "Game Master Pro",
    },
    children: [
      {
        path: "combat",
        component: CombatComponent,
        data: {
          title: "Combat",
        },
      },
      {
        path: "edit",
        component: EditWorldsComponent,
        data: {
          title: "Edit Worlds",
        },
      },
      {
        path: "edit-sounds",
        component: EditWorldsComponent,
        data: {
          title: "Edit Sounds",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
