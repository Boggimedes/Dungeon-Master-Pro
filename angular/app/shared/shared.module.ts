import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OverlayModule } from "@angular/cdk/overlay";
import { MatMenuModule } from "@angular/material/menu";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ClickOutsideModule } from "ng-click-outside";

import { AutocompleteModule } from "./components/autocomplete/autocomplete.module";
import { PipeModule } from "../../../angular/app/shared/pipes/pipe.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

//COMPONENTS
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HorizontalMenuComponent } from "./horizontal-menu/horizontal-menu.component";
import { VerticalMenuComponent } from "./vertical-menu/vertical-menu.component";
import { CustomizerComponent } from "./customizer/customizer.component";
import { NotificationSidebarComponent } from "./notification-sidebar/notification-sidebar.component";
// import { ContextMenuComponent } from './components/context-menu-component/context-menu.component';

//DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { SidebarLinkDirective } from "./directives/sidebar-link.directive";
import { SidebarDropdownDirective } from "./directives/sidebar-dropdown.directive";
import { SidebarAnchorToggleDirective } from "./directives/sidebar-anchor-toggle.directive";
import { SidebarDirective } from "./directives/sidebar.directive";
import { TopMenuDirective } from "./directives/topmenu.directive";
import { TopMenuLinkDirective } from "./directives/topmenu-link.directive";
import { TopMenuDropdownDirective } from "./directives/topmenu-dropdown.directive";
import { TopMenuAnchorToggleDirective } from "./directives/topmenu-anchor-toggle.directive";
import { NpcSelectorComponent } from "./components/npc-selector/npc-selector.component";
import { CoaComponent } from "./components/coa/coa.component";

@NgModule({
  exports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    CustomizerComponent,
    NotificationSidebarComponent,
    ToggleFullscreenDirective,
    SidebarDirective,
    TopMenuDirective,
    NgbModule,
    TranslateModule,
    MatMenuModule,
    PipeModule,
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    TranslateModule,
    FormsModule,
    FontAwesomeModule,
    OverlayModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    AutocompleteModule,
    PipeModule,
    MatMenuModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    CustomizerComponent,
    NotificationSidebarComponent,
    ToggleFullscreenDirective,
    SidebarLinkDirective,
    SidebarDropdownDirective,
    SidebarAnchorToggleDirective,
    SidebarDirective,
    TopMenuLinkDirective,
    TopMenuDropdownDirective,
    TopMenuAnchorToggleDirective,
    TopMenuDirective,
    NpcSelectorComponent,
    CoaComponent,
    // ContextMenuComponent,
  ],
  providers: [],
})
export class SharedModule {}
