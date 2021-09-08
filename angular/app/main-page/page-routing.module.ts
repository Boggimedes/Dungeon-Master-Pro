import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageComponent } from "./page.component";
import { CombatComponent } from "./combat/combat.component";
import { StoryComponent } from "./story/story.component";
import { EditWorldsComponent } from "./edit-worlds/edit-worlds.component";
import { EditNpcsComponent } from "./edit-npcs/edit-npcs.component";

const routes: Routes = [
	{
		path: "app",
		component: PageComponent,
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
				path: "story",
				component: StoryComponent,
				data: {
					title: "Story",
				},
			},
			{
				path: "edit-worlds",
				component: EditWorldsComponent,
				data: {
					title: "Edit Worlds",
				},
			},
			{
				path: "world/:worldId/edit",
				component: EditWorldsComponent,
				data: {
					title: "Edit Worlds",
				},
			},
			{
				path: "region/:regionId/edit-npcs",
				component: EditNpcsComponent,
				data: {
					title: "Edit NPCs",
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
