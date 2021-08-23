import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { CombatComponent } from './combat/combat.component';
import { StoryComponent } from './story/story.component';


const routes: Routes = [
  {
    path: 'app',
    component: PageComponent,
    data: {
      title: 'Game Master Pro'
    },
    children: [
      {
        path: 'combat',
        component: CombatComponent,
        data: {
          title: 'Combat'
        }
      },
      {
        path: 'story',
        component: StoryComponent,
        data: {
          title: 'Story'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule { }
