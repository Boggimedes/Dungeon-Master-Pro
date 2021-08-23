import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AgmCoreModule } from "@agm/core";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserModule } from '@angular/platform-browser';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "./app.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { AuthService } from "./shared/auth/auth.service";
import { AuthGuard } from "./shared/auth/auth-guard.service";
import { WINDOW_PROVIDERS } from './shared/services/window.service';
// import { CombatComponent } from './components/combat/combat.component';
// import { SoundComponent } from './components/sound/sound.component';
// import { SpellsComponent } from './components/spells/spells.component';
// import { NpcComponent } from './components/npc/npc.component';
// import { MonstersComponent } from '../../old/monsters/monsters.component';
// import { SoundEditComponent } from './components/sound-edit/sound-edit.component';
// import { CombatBoardComponent } from './page/combat-board/combat-board.component';
// import { CampaignBoardComponent } from '../../old/campaign-board/campaign-board.component';
// import { NpcBoardComponent } from './page/npc-board/npc-board.component';
// import { WorldBoardComponent } from '../../old/world-board/world-board.component';
// import { SoundBoardComponent } from './page/sound-board/sound-board.component';
// import { EditCollectionComponent } from './page/edit-collection/edit-collection.component';
// import { EditEffectComponent } from './page/edit-effect/edit-effect.component';
// import { EditMonsterComponent } from './page/edit-monster/edit-monster.component';
// import { EditSceneComponent } from './page/edit-scene/edit-scene.component';
// import { EditSoundComponent } from './page/edit-sound/edit-sound.component';
// import { EditSpellComponent } from './page/edit-spell/edit-spell.component';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { SignupComponent } from './pages/signup/signup.component';
import { CombatLogComponent } from './main-page/combat/combat-log/combat-log.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResizableModule } from 'angular-resizable-element';

var firebaseConfig = {
  apiKey: "YOUR_API_KEY", //YOUR_API_KEY
  authDomain: "YOUR_AUTH_DOMAIN", //YOUR_AUTH_DOMAIN
  databaseURL: "YOUR_DATABASE_URL", //YOUR_DATABASE_URL
  projectId: "YOUR_PROJECT_ID", //YOUR_PROJECT_ID
  storageBucket: "YOUR_STORAGE_BUCKET", //YOUR_STORAGE_BUCKET
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", //YOUR_MESSAGING_SENDER_ID
  appId: "YOUR_APP_ID", //YOUR_APP_ID
  measurementId: "YOUR_MEASUREMENT_ID" //YOUR_MEASUREMENT_ID
};


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent,
    //  CombatComponent, 
    // SoundComponent, SpellsComponent, NpcComponent, MonstersComponent, SoundEditComponent, 
    // CombatBoardComponent, CampaignBoardComponent, NpcBoardComponent, WorldBoardComponent, 
    // SoundBoardComponent, EditCollectionComponent, EditEffectComponent, EditMonsterComponent, 
    // EditSceneComponent, EditSoundComponent, EditSpellComponent, 
    // SignupComponent, 
    // CombatLogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    ResizableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: "YOUR_GOOGLE_MAP_API_KEY"
    }),
    PerfectScrollbarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    WINDOW_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
