(self["webpackChunkapex_admin"] = self["webpackChunkapex_admin"] || []).push([["main"],{

/***/ 98255:
/*!*******************************************************!*\
  !*** ./$_lazy_route_resources/ lazy namespace object ***!
  \*******************************************************/
/***/ (function(module) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 98255;
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ 13190:
/*!*******************************************!*\
  !*** ./angular/app/app-routing.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": function() { return /* binding */ AppRoutingModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 3984);
/* harmony import */ var _layouts_full_full_layout_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layouts/full/full-layout.component */ 20348);
/* harmony import */ var _layouts_content_content_layout_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layouts/content/content-layout.component */ 11391);
/* harmony import */ var _shared_routes_full_layout_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/routes/full-layout.routes */ 45400);
/* harmony import */ var _shared_routes_content_layout_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/routes/content-layout.routes */ 95180);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 74788);







const appRoutes = [
    {
        path: "",
        component: _layouts_full_full_layout_component__WEBPACK_IMPORTED_MODULE_0__.FullLayoutComponent,
        data: { title: "full Views" },
        children: _shared_routes_full_layout_routes__WEBPACK_IMPORTED_MODULE_2__.Full_ROUTES,
    },
    {
        path: "",
        component: _layouts_content_content_layout_component__WEBPACK_IMPORTED_MODULE_1__.ContentLayoutComponent,
        data: { title: "content Views" },
        children: _shared_routes_content_layout_routes__WEBPACK_IMPORTED_MODULE_3__.CONTENT_ROUTES,
    },
    {
        path: "**",
        redirectTo: "error",
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forRoot(appRoutes, {
                preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_5__.PreloadAllModules,
                relativeLinkResolution: "legacy",
            }),
        ], _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] }); })();


/***/ }),

/***/ 37355:
/*!**************************************!*\
  !*** ./angular/app/app.component.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": function() { return /* binding */ AppComponent; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 3984);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ 45435);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 74788);




class AppComponent {
    constructor(router) {
        this.router = router;
        console.log("App Construct");
    }
    ngOnInit() {
        this.subscription = this.router.events
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.filter)((event) => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__.NavigationEnd))
            .subscribe(() => window.scrollTo(0, 0));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router)); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet], encapsulation: 2 });


/***/ }),

/***/ 28981:
/*!****************************************!*\
  !*** ./angular/app/app.initializer.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appInitializer": function() { return /* binding */ appInitializer; }
/* harmony export */ });
function appInitializer(authService) {
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        console.log("refresh");
        authService.refreshToken()
            .subscribe()
            .add(resolve);
    });
}


/***/ }),

/***/ 42573:
/*!***********************************!*\
  !*** ./angular/app/app.module.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTranslateLoader": function() { return /* binding */ createTranslateLoader; },
/* harmony export */   "AppModule": function() { return /* binding */ AppModule; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser/animations */ 27094);
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/fire */ 77667);
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/fire/auth */ 2552);
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @agm/core */ 66047);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common/http */ 58497);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ngx-translate/core */ 75629);
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/http-loader */ 93555);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-spinner */ 79866);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser */ 91211);
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ngx-quill */ 67185);
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-perfect-scrollbar */ 99904);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 13190);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/shared.module */ 8421);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ 37355);
/* harmony import */ var _app_initializer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.initializer */ 28981);
/* harmony import */ var _layouts_content_content_layout_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layouts/content/content-layout.component */ 11391);
/* harmony import */ var _layouts_full_full_layout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./layouts/full/full-layout.component */ 20348);
/* harmony import */ var _shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/auth/auth.service */ 6008);
/* harmony import */ var _shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared/auth/auth-guard.service */ 16929);
/* harmony import */ var _shared_services_window_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shared/services/window.service */ 28370);
/* harmony import */ var _shared_auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shared/auth/auth.interceptor */ 43209);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 54163);
/* harmony import */ var angular_resizable_element__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! angular-resizable-element */ 72146);
/* harmony import */ var _shared_services_world_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shared/services/world.service */ 40653);
/* harmony import */ var _shared_services_story_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shared/services/story.service */ 43235);





















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










var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID", //YOUR_MEASUREMENT_ID
};
const DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true,
    wheelPropagation: false,
};
function createTranslateLoader(http) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_12__.TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({ providers: [
        {
            provide: _angular_core__WEBPACK_IMPORTED_MODULE_13__.APP_INITIALIZER,
            useFactory: _app_initializer__WEBPACK_IMPORTED_MODULE_3__.appInitializer,
            multi: true,
            deps: [_shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_6__.AuthService],
        },
        {
            provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HTTP_INTERCEPTORS,
            useClass: _shared_auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_9__.AuthInterceptor,
            multi: true,
        },
        _shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_6__.AuthService,
        _shared_services_world_service__WEBPACK_IMPORTED_MODULE_10__.WorldService,
        _shared_services_story_service__WEBPACK_IMPORTED_MODULE_11__.StoryService,
        _shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_7__.AuthGuard,
        {
            provide: ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_15__.PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        },
        _shared_services_window_service__WEBPACK_IMPORTED_MODULE_8__.WINDOW_PROVIDERS,
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__.BrowserModule,
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__.BrowserAnimationsModule,
            _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClientModule,
            _angular_fire__WEBPACK_IMPORTED_MODULE_18__.AngularFireModule.initializeApp(firebaseConfig),
            _angular_fire_auth__WEBPACK_IMPORTED_MODULE_19__.AngularFireAuthModule,
            ngx_spinner__WEBPACK_IMPORTED_MODULE_20__.NgxSpinnerModule,
            _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_21__.FontAwesomeModule,
            angular_resizable_element__WEBPACK_IMPORTED_MODULE_22__.ResizableModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__.TranslateModule.forRoot({
                loader: {
                    provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__.TranslateLoader,
                    useFactory: createTranslateLoader,
                    deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClient],
                },
            }),
            _agm_core__WEBPACK_IMPORTED_MODULE_24__.AgmCoreModule.forRoot({
                apiKey: "YOUR_GOOGLE_MAP_API_KEY",
            }),
            ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_15__.PerfectScrollbarModule,
            ngx_quill__WEBPACK_IMPORTED_MODULE_25__.QuillModule.forRoot(),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent,
        _layouts_full_full_layout_component__WEBPACK_IMPORTED_MODULE_5__.FullLayoutComponent,
        _layouts_content_content_layout_component__WEBPACK_IMPORTED_MODULE_4__.ContentLayoutComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_16__.BrowserModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__.BrowserAnimationsModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClientModule, _angular_fire__WEBPACK_IMPORTED_MODULE_18__.AngularFireModule, _angular_fire_auth__WEBPACK_IMPORTED_MODULE_19__.AngularFireAuthModule,
        ngx_spinner__WEBPACK_IMPORTED_MODULE_20__.NgxSpinnerModule,
        _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_21__.FontAwesomeModule,
        angular_resizable_element__WEBPACK_IMPORTED_MODULE_22__.ResizableModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__.TranslateModule, _agm_core__WEBPACK_IMPORTED_MODULE_24__.AgmCoreModule, ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_15__.PerfectScrollbarModule, ngx_quill__WEBPACK_IMPORTED_MODULE_25__.QuillModule] }); })();


/***/ }),

/***/ 11391:
/*!*****************************************************************!*\
  !*** ./angular/app/layouts/content/content-layout.component.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContentLayoutComponent": function() { return /* binding */ ContentLayoutComponent; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_app_shared_services_config_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../angular/app/shared/services/config.service */ 47107);
/* harmony import */ var _angular_app_shared_services_customizer_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../angular/app/shared/services/customizer.service */ 90775);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 3984);





const _c0 = ["content-wrapper"];
class ContentLayoutComponent {
    constructor(configService, document, renderer, cdr, customizerService) {
        this.configService = configService;
        this.document = document;
        this.renderer = renderer;
        this.cdr = cdr;
        this.customizerService = customizerService;
        this.config = {};
        this.config = this.configService.templateConf;
        this.renderer.addClass(this.document.body, "auth-page");
    }
    ngOnInit() {
        this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
            if (templateConf) {
                this.config = templateConf;
            }
            this.loadLayout();
            this.cdr.markForCheck();
        });
    }
    loadLayout() {
        this.removeTransparentBGClasses();
        if (this.config.layout.variant === "Light") {
            this.renderer.removeClass(this.document.body, "layout-dark");
            this.renderer.removeClass(this.document.body, "layout-transparent");
        }
        else if (this.config.layout.variant === "Dark") {
            this.renderer.removeClass(this.document.body, "layout-transparent");
            this.renderer.addClass(this.document.body, "layout-dark");
        }
        else if (this.config.layout.variant === "Transparent") {
            this.renderer.addClass(this.document.body, "layout-dark");
            this.renderer.addClass(this.document.body, "layout-transparent");
            this.renderer.addClass(this.document.body, this.config.layout.sidebar.backgroundColor);
        }
        this.renderer.removeClass(this.document.body, "menu-expanded");
        this.renderer.removeClass(this.document.body, "navbar-static");
        this.renderer.removeClass(this.document.body, "menu-open");
        this.renderer.addClass(this.document.body, "blank-page");
    }
    removeTransparentBGClasses() {
        this.customizerService.transparent_colors.forEach((_) => {
            this.renderer.removeClass(this.document.body, _.class);
        });
        this.customizerService.transparent_colors_with_shade.forEach((_) => {
            this.renderer.removeClass(this.document.body, _.class);
        });
    }
    ngOnDestroy() {
        this.renderer.removeClass(this.document.body, "auth-page");
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
    }
}
ContentLayoutComponent.ɵfac = function ContentLayoutComponent_Factory(t) { return new (t || ContentLayoutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_app_shared_services_config_service__WEBPACK_IMPORTED_MODULE_0__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_app_shared_services_customizer_service__WEBPACK_IMPORTED_MODULE_1__.CustomizerService)); };
ContentLayoutComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ContentLayoutComponent, selectors: [["app-content-layout"]], viewQuery: function ContentLayoutComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.wrapper = _t.first);
    } }, decls: 6, vars: 0, consts: [[1, "wrapper"], [1, "main-panel"], [1, "main-content"], [1, "content-overlay"], [1, "content-wrapper", "p-0"]], template: function ContentLayoutComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterOutlet], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb250ZW50LWxheW91dC5jb21wb25lbnQuc2NzcyJ9 */"], changeDetection: 0 });


/***/ }),

/***/ 20348:
/*!***********************************************************!*\
  !*** ./angular/app/layouts/full/full-layout.component.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FullLayoutComponent": function() { return /* binding */ FullLayoutComponent; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var _angular_app_shared_services_window_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../angular/app/shared/services/window.service */ 28370);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 3984);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 45435);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_app_shared_services_config_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../angular/app/shared/services/config.service */ 47107);
/* harmony import */ var _angular_app_shared_services_layout_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../angular/app/shared/services/layout.service */ 60432);
/* harmony import */ var _angular_app_shared_services_customizer_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../angular/app/shared/services/customizer.service */ 90775);
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-device-detector */ 30730);
/* harmony import */ var _shared_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/navbar/navbar.component */ 96319);
/* harmony import */ var _shared_notification_sidebar_notification_sidebar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/notification-sidebar/notification-sidebar.component */ 9856);
/* harmony import */ var _shared_directives_sidebar_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/directives/sidebar.directive */ 17618);
/* harmony import */ var _shared_vertical_menu_vertical_menu_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/vertical-menu/vertical-menu.component */ 70644);















const _c0 = function (a0) { return { "background-image": a0 }; };
function FullLayoutComponent_div_2_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "div", 11);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](1, _c0, "url(" + ctx_r2.bgImage + ")"));
} }
const _c1 = function (a0, a1, a2) { return { "main-menu": a0, "menu-fixed": a1, "menu-native-scroll": a2 }; };
function FullLayoutComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("mouseenter", function FullLayoutComponent_div_2_Template_div_mouseenter_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r3.sidebarMouseenter($event); })("mouseleave", function FullLayoutComponent_div_2_Template_div_mouseleave_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r4); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r5.sidebarMouseleave($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "app-sidebar");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, FullLayoutComponent_div_2_div_2_Template, 1, 3, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction3"](4, _c1, ctx_r0.menuPosition === "Side" || ctx_r0.displayOverlayMenu, ctx_r0.menuPosition === "Side" || ctx_r0.displayOverlayMenu, !ctx_r0.perfectScrollbarEnable));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("data-background-color", (ctx_r0.config == null ? null : ctx_r0.config.layout.variant) === "Transparent" ? "black" : ctx_r0.bgColor)("data-image", ctx_r0.bgImage);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.config == null ? null : ctx_r0.config.layout.sidebar.backgroundImage);
} }
function FullLayoutComponent_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function FullLayoutComponent_button_7_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r6.scrollToTop(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
const _c2 = function (a0) { return { "show-overlay": a0 }; };
const _c3 = function (a0, a1) { return { "d-none": a0, "d-block": a1 }; };
class FullLayoutComponent {
    constructor(configService, layoutService, router, customizerService, document, window, renderer, cdr, deviceService) {
        this.configService = configService;
        this.layoutService = layoutService;
        this.router = router;
        this.customizerService = customizerService;
        this.document = document;
        this.window = window;
        this.renderer = renderer;
        this.cdr = cdr;
        this.deviceService = deviceService;
        this.hideSidebar = true;
        this.overlayContent = false;
        this.isSmallScreen = false;
        this.menuPosition = "Side";
        this.displayOverlayMenu = false; // Vertical Side menu for screenSize < 1200
        this.config = {};
        this.isMenuCollapsedOnHover = false;
        this.isNavbarSeachTextEmpty = true;
        this.isScrollTopVisible = false;
        this.config = this.configService.templateConf;
        this.innerWidth = window.innerWidth;
        // On toggle sidebar menu
        this.layoutSub = layoutService.toggleSidebar$.subscribe((isShow) => {
            this.hideSidebar = !isShow;
            if (this.hideSidebar) {
                this.overlayContent = false;
            }
            else {
                this.overlayContent = true;
            }
            this.toggleSidebar();
        });
    }
    ngOnInit() {
        this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
            if (templateConf) {
                this.config = templateConf;
            }
            //load layout
            this.loadLayout();
            this.cdr.markForCheck();
        });
        //hide overlay class on router change
        this.router.events
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.filter)((event) => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_10__.NavigationEnd))
            .subscribe((routeChange) => {
            if (this.config.layout.menuPosition === "Side" ||
                this.displayOverlayMenu) {
                // Vertical Menu
                if (this.innerWidth < 1200) {
                    this.layoutService.toggleSidebarSmallScreen(false);
                    this.overlayContent = false;
                    this.renderer.removeClass(this.document.body, "overflow-hidden");
                }
            }
        });
    }
    ngAfterViewInit() {
        this.setMenuLayout();
    }
    ngOnDestroy() {
        //Unsubcribe subscriptions
        if (this.configSub) {
            this.configSub.unsubscribe();
        }
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
    }
    //adjust layout
    setMenuLayout() {
        this.overlayContent = false;
        this.renderer.removeClass(this.document.body, "blank-page");
        if (this.config.layout.menuPosition === "Top") {
            // Horizontal Menu
            if (this.innerWidth < 1200) {
                // Screen size < 1200
                this.displayOverlayMenu = true;
                this.hideSidebar = true;
                this.renderer.removeClass(this.document.body, "horizontal-menu");
                this.renderer.removeClass(this.document.body, "menu-open");
                this.renderer.addClass(this.document.body, "horizontal-layout");
                this.renderer.addClass(this.document.body, "horizontal-menu-padding");
                this.renderer.addClass(this.document.body, "vertical-layout");
                this.renderer.addClass(this.document.body, "vertical-overlay-menu");
                this.renderer.addClass(this.document.body, "fixed-navbar");
                this.renderer.addClass(this.document.body, "menu-hide");
            }
            else {
                // Screen size > 1200
                this.displayOverlayMenu = false;
                this.hideSidebar = false;
                this.renderer.setAttribute(this.document.body, "data-menu", "horizontal-menu");
                this.renderer.removeClass(this.document.body, "vertical-layout");
                this.renderer.removeClass(this.document.body, "vertical-overlay-menu");
                this.renderer.removeClass(this.document.body, "fixed-navbar");
                this.renderer.removeClass(this.document.body, "menu-hide");
                this.renderer.removeClass(this.document.body, "vertical-menu");
                this.renderer.addClass(this.document.body, "horizontal-menu");
                this.renderer.addClass(this.document.body, "horizontal-layout");
                this.renderer.addClass(this.document.body, "horizontal-menu-padding");
            }
        }
        else if (this.config.layout.menuPosition === "Side") {
            // Vertical Menu
            if (this.innerWidth < 1200) {
                // If Screen size < 1200
                this.displayOverlayMenu = true;
                this.renderer.removeClass(this.document.body, "horizontal-layout");
                this.renderer.removeClass(this.document.body, "horizontal-menu");
                this.renderer.removeClass(this.document.body, "horizontal-menu-padding");
                this.renderer.removeClass(this.document.body, "menu-expanded");
                this.renderer.removeClass(this.document.body, "vertical-menu");
                this.renderer.removeClass(this.document.body, "menu-open");
                this.renderer.removeClass(this.document.body, "nav-collapsed");
                this.renderer.addClass(this.document.body, "vertical-layout");
                this.renderer.addClass(this.document.body, "menu-hide");
            }
            else {
                // If Screen size > 1200
                this.displayOverlayMenu = false;
                this.renderer.removeClass(this.document.body, "horizontal-layout");
                this.renderer.removeClass(this.document.body, "horizontal-menu");
                this.renderer.removeClass(this.document.body, "horizontal-menu-padding");
                this.renderer.setAttribute(this.document.body, "data-menu", "vertical-menu");
                this.renderer.addClass(this.document.body, "vertical-layout");
                if (!this.config.layout.sidebar.collapsed) {
                    this.renderer.addClass(this.document.body, "menu-expanded");
                    this.renderer.addClass(this.document.body, "menu-open");
                }
                this.renderer.addClass(this.document.body, "vertical-menu");
                this.renderer.removeClass(this.document.body, "menu-hide");
                this.renderer.removeClass(this.document.body, "vertical-overlay-menu");
            }
        }
    }
    loadLayout() {
        //menu position "SIDE" or "TOP"
        if (this.config.layout.menuPosition &&
            this.config.layout.menuPosition.toString().trim() != "") {
            this.menuPosition = this.config.layout.menuPosition;
        }
        //Hide/show sidebar menu background image
        if (!this.config.layout.sidebar.backgroundImage) {
            this.bgImage = "";
        }
        else {
            this.bgImage = this.config.layout.sidebar.backgroundImageURL;
        }
        //Set sidebar menu background color
        if (!this.config.layout.sidebar.backgroundColor) {
            this.bgColor = this.customizerService.light_dark_colors[7].code;
        }
        else {
            this.bgColor = this.config.layout.sidebar.backgroundColor;
        }
        //toggle side menu
        if (this.config.layout.menuPosition === "Side") {
            if (this.config.layout.sidebar.collapsed) {
                this.isMenuCollapsedOnHover = true;
            }
            else {
                this.isMenuCollapsedOnHover = true;
            }
            this.toggleSidebar();
        }
        this.removeTransparentBGClasses();
        // Layout variants
        if (this.config.layout.variant === "Light") {
            this.renderer.removeClass(this.document.body, "layout-dark");
            this.renderer.removeClass(this.document.body, "layout-transparent");
        }
        else if (this.config.layout.variant === "Dark") {
            this.renderer.removeClass(this.document.body, "layout-transparent");
            this.renderer.addClass(this.document.body, "layout-dark");
        }
        else if (this.config.layout.variant === "Transparent") {
            this.renderer.addClass(this.document.body, "layout-dark");
            this.renderer.addClass(this.document.body, "layout-transparent");
            this.renderer.addClass(this.document.body, this.bgColor);
            this.bgImage = "";
        }
        this.setMenuLayout();
        // For Sidebar width
        if (this.config.layout.sidebar.size === "sidebar-sm") {
            this.renderer.removeClass(this.document.body, "sidebar-lg");
            this.renderer.addClass(this.document.body, "sidebar-sm");
        }
        else if (this.config.layout.sidebar.size === "sidebar-lg") {
            this.renderer.removeClass(this.document.body, "sidebar-sm");
            this.renderer.addClass(this.document.body, "sidebar-lg");
        }
        else {
            this.renderer.removeClass(this.document.body, "sidebar-sm");
            this.renderer.removeClass(this.document.body, "sidebar-lg");
        }
        if (this.config.layout.menuPosition === "Side") {
            // vertical/Side menu expanded/collapse
            if (this.config.layout.sidebar.collapsed && !this.isSmallScreen) {
                // collapse side menu
                this.renderer.removeClass(this.document.body, "menu-expanded");
                this.renderer.addClass(this.document.body, "nav-collapsed");
            }
            else {
                // expand side menu
                this.renderer.removeClass(this.document.body, "nav-collapsed");
                this.renderer.addClass(this.document.body, "menu-expanded");
            }
        }
        //Navbar types
        if (this.config.layout.navbar.type === "Static") {
            this.renderer.removeClass(this.document.body, "navbar-sticky");
            this.renderer.addClass(this.document.body, "navbar-static");
        }
        else if (this.config.layout.navbar.type === "Fixed") {
            this.renderer.removeClass(this.document.body, "navbar-static");
            this.renderer.addClass(this.document.body, "navbar-sticky");
        }
    }
    toggleSidebar() {
        if (this.hideSidebar) {
            // on sidebar collapse
            this.renderer.removeClass(this.document.body, "menu-expanded");
            this.renderer.removeClass(this.document.body, "vertical-menu");
            this.renderer.removeClass(this.document.body, "menu-open");
            this.renderer.addClass(this.document.body, "vertical-layout");
            this.renderer.addClass(this.document.body, "menu-hide");
            if (this.config.layout.menuPosition === "Top") {
                this.renderer.addClass(this.document.body, "vertical-overlay-menu");
            }
        }
        else {
            // on sidebar expand
            this.renderer.addClass(this.document.body, "vertical-layout");
            this.renderer.addClass(this.document.body, "menu-expanded");
            this.renderer.addClass(this.document.body, "vertical-menu");
            if (this.config.layout.sidebar.collapsed) {
                this.renderer.removeClass(this.document.body, "menu-open");
            }
            else {
                this.renderer.addClass(this.document.body, "menu-open");
            }
            this.renderer.removeClass(this.document.body, "menu-hide");
        }
        this.isTouchDevice();
    }
    isTouchDevice() {
        const isMobile = this.deviceService.isMobile();
        const isTablet = this.deviceService.isTablet();
        if (isMobile || isTablet) {
            if (!this.hideSidebar) {
                this.renderer.addClass(this.document.body, "overflow-hidden");
            }
            else {
                this.renderer.removeClass(this.document.body, "overflow-hidden");
            }
        }
    }
    hideCompactMenuOnSmallScreen() {
        if (this.innerWidth < 1200) {
            let conf = this.config;
            conf.layout.sidebar.collapsed = false;
            this.configService.applyTemplateConfigChange({
                layout: conf.layout,
            });
        }
    }
    //Remove transparent layout classes
    removeTransparentBGClasses() {
        this.customizerService.transparent_colors.forEach((_) => {
            this.renderer.removeClass(this.document.body, _.class);
        });
        this.customizerService.transparent_colors_with_shade.forEach((_) => {
            this.renderer.removeClass(this.document.body, _.class);
        });
    }
    sidebarMouseenter(e) {
        if (this.config.layout.sidebar.collapsed) {
            this.isMenuCollapsedOnHover = false;
            this.layoutService.overlaySidebartoggle(this.isMenuCollapsedOnHover);
        }
    }
    sidebarMouseleave(e) {
        if (this.config.layout.sidebar.collapsed) {
            this.isMenuCollapsedOnHover = true;
            this.layoutService.overlaySidebartoggle(this.isMenuCollapsedOnHover);
        }
    }
    //scroll to top on click
    scrollToTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
    onOutsideClick(e) {
        if (this.innerWidth < 1200) {
            if (!e.target.classList.contains("toggleSidebarNavbarButton")) {
                this.layoutService.toggleSidebarSmallScreen(false);
            }
        }
    }
    onWrapperClick() {
        this.isNavbarSeachTextEmpty = true;
    }
    checkNavbarSeachTextEmpty($event) {
        this.isNavbarSeachTextEmpty = $event;
    }
    onResize(event) {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout((() => {
            this.innerWidth = event.target.innerWidth;
            this.setMenuLayout();
            this.hideCompactMenuOnSmallScreen();
        }).bind(this), 500);
    }
    //Add/remove classes on page scroll
    onWindowScroll() {
        let number = this.window.pageYOffset ||
            this.document.documentElement.scrollTop ||
            this.document.body.scrollTop ||
            0;
        if (number > 60) {
            this.renderer.addClass(this.document.body, "navbar-scrolled");
        }
        else {
            this.renderer.removeClass(this.document.body, "navbar-scrolled");
        }
        if (number > 400) {
            this.isScrollTopVisible = true;
        }
        else {
            this.isScrollTopVisible = false;
        }
        if (number > 20) {
            this.renderer.addClass(this.document.body, "page-scrolled");
        }
        else {
            this.renderer.removeClass(this.document.body, "page-scrolled");
        }
    }
}
FullLayoutComponent.ɵfac = function FullLayoutComponent_Factory(t) { return new (t || FullLayoutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_app_shared_services_config_service__WEBPACK_IMPORTED_MODULE_1__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_app_shared_services_layout_service__WEBPACK_IMPORTED_MODULE_2__.LayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_app_shared_services_customizer_service__WEBPACK_IMPORTED_MODULE_3__.CustomizerService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_11__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_app_shared_services_window_service__WEBPACK_IMPORTED_MODULE_0__.WINDOW), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](ngx_device_detector__WEBPACK_IMPORTED_MODULE_12__.DeviceDetectorService)); };
FullLayoutComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: FullLayoutComponent, selectors: [["app-full-layout"]], hostBindings: function FullLayoutComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("resize", function FullLayoutComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"])("scroll", function FullLayoutComponent_scroll_HostBindingHandler() { return ctx.onWindowScroll(); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"]);
    } }, decls: 11, vars: 9, consts: [[3, "seachTextEmpty"], [1, "wrapper", 3, "ngClass", "click", "resize"], ["appSidebar", "", "class", "app-sidebar", "data-active-color", "white", 3, "ngClass", "mouseenter", "mouseleave", 4, "ngIf"], [1, "main-panel"], [1, "main-content"], [1, "content-overlay"], ["class", "btn btn-primary scroll-top", "type", "button", 3, "click", 4, "ngIf"], [1, "sidenav-overlay", 3, "ngClass", "click"], [1, "drag-target"], ["appSidebar", "", "data-active-color", "white", 1, "app-sidebar", 3, "ngClass", "mouseenter", "mouseleave"], ["class", "sidebar-background", 3, "ngStyle", 4, "ngIf"], [1, "sidebar-background", 3, "ngStyle"], ["type", "button", 1, "btn", "btn-primary", "scroll-top", 3, "click"], [1, "ft-arrow-up"]], template: function FullLayoutComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "app-navbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("seachTextEmpty", function FullLayoutComponent_Template_app_navbar_seachTextEmpty_0_listener($event) { return ctx.checkNavbarSeachTextEmpty($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function FullLayoutComponent_Template_div_click_1_listener() { return ctx.onWrapperClick(); })("resize", function FullLayoutComponent_Template_div_resize_1_listener($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, FullLayoutComponent_div_2_Template, 3, 8, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, FullLayoutComponent_button_7_Template, 2, 0, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "app-notification-sidebar");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function FullLayoutComponent_Template_div_click_9_listener($event) { return ctx.onOutsideClick($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](4, _c2, !ctx.isNavbarSeachTextEmpty));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.menuPosition === "Side" || ctx.displayOverlayMenu);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.isScrollTopVisible);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction2"](6, _c3, ctx.displayOverlayMenu && ctx.hideSidebar && !ctx.overlayContent, ctx.displayOverlayMenu && !ctx.hideSidebar && ctx.overlayContent && ctx.innerWidth < 1200));
    } }, directives: [_shared_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__.NavbarComponent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterOutlet, _shared_notification_sidebar_notification_sidebar_component__WEBPACK_IMPORTED_MODULE_5__.NotificationSidebarComponent, _shared_directives_sidebar_directive__WEBPACK_IMPORTED_MODULE_6__.SidebarDirective, _shared_vertical_menu_vertical_menu_component__WEBPACK_IMPORTED_MODULE_7__.VerticalMenuComponent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgStyle], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmdWxsLWxheW91dC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ 60221:
/*!****************************************!*\
  !*** ./angular/app/models/campaign.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Campaign": function() { return /* binding */ Campaign; },
/* harmony export */   "PlotPoint": function() { return /* binding */ PlotPoint; }
/* harmony export */ });
class Campaign {
    constructor(data = {}) {
        data = !!data ? data : {};
        Object.assign(this, data);
    }
}
class PlotPoint {
    constructor(data = {}) {
        data = !!data ? data : {};
        Object.assign(this, data);
    }
}


/***/ }),

/***/ 53113:
/*!****************************************!*\
  !*** ./angular/app/models/game-map.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameMap": function() { return /* binding */ GameMap; },
/* harmony export */   "MapItem": function() { return /* binding */ MapItem; }
/* harmony export */ });
class GameMap {
    constructor(data = {}) {
        data = !!data ? data : {};
        Object.assign(this, data);
    }
}
class MapItem {
    constructor(data = {}) {
        data = !!data ? data : {};
        Object.assign(this, data);
    }
}


/***/ }),

/***/ 27284:
/*!**************************************!*\
  !*** ./angular/app/models/region.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Region": function() { return /* binding */ Region; }
/* harmony export */ });
class Region {
    constructor(data = {}) {
        this.feature_types = {};
        this.prof_balance = [];
        this.racial_balance = [];
        this.linked = false;
        data = !!data ? data : {};
        Object.assign(this, data);
    }
}


/***/ }),

/***/ 53187:
/*!*************************************!*\
  !*** ./angular/app/models/world.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "World": function() { return /* binding */ World; },
/* harmony export */   "NPC": function() { return /* binding */ NPC; },
/* harmony export */   "POI": function() { return /* binding */ POI; }
/* harmony export */ });
/* harmony import */ var _region__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./region */ 27284);

class World {
    constructor(data = {}) {
        this.racesOb = {};
        if (!Object.values(data).length)
            return;
        data = !!data ? data : {};
        Object.assign(this, data);
        if (typeof this.regions != "undefined") {
            this.regions = this.regions.map((r) => new _region__WEBPACK_IMPORTED_MODULE_0__.Region(r));
        }
        console.log(data);
        if (data.races) {
            for (let i = 0; i < data.races.length; i++) {
                this.racesOb[data.races[i].id] = data.races[i];
            }
        }
    }
}
class NPC {
    constructor(data = {}, world = null) {
        this.alive = 1;
        this.GP = this.genderPronoun;
        this.AGA = this.ageGroupAdjective;
        this.debounce = (func, ms) => {
            let isCooldown = false;
            return function () {
                if (isCooldown)
                    return;
                func.apply(this, arguments);
                isCooldown = true;
                setTimeout(() => (isCooldown = false), ms);
            };
        };
        if (!Object.values(data).length)
            return;
        if (world) {
            this.world = world;
        }
        this.AGA = this.AGA(data);
        Object.assign(this, data);
        console.log(data);
        console.log(world);
        if (!this.notes) {
            this.notes = this.npcDescription(data);
            if (data.features.manner)
                this.notes += "\nManner: " + data.features.manner.text;
            if (data.features.quirk)
                this.notes += "\nQuirk: " + data.features.quirk.text;
        }
    }
    npcDescription(npc) {
        let desc = "..." + this.ageGroupAdjective(npc);
        let f = npc.features;
        console.log(npc);
        desc += f["body extra"] && f["body extra"].text ? " ..." + f.text : "";
        desc += f.clothing.text;
        desc += "... with " + this.facialFeatures(npc);
        desc += f.special.text;
        return desc.toLowerCase();
    }
    facialFeatures(npc) {
        // skin color
        // skin complexion
        // hair color
        // hair desc
        // eye color
        // eye desc
        // face shape
        let skin = npc.features["skin complexion"].text +
            " " +
            npc.features["skin color"].text;
        let hair = npc.features["hair description"].text +
            " " +
            npc.features["hair color"].text;
        let eyes = npc.features["eye description"].text +
            " " +
            npc.features["eye color"].text;
        let face = npc.features["face shape"].text;
        let r = "";
        if (face && hair !== " ") {
            r = "a " + face + " face framed by " + hair + " hair";
        }
        else if (face) {
            r = "a " + face + " face";
        }
        else {
            r = hair + " hair";
        }
        if (eyes !== " " && skin !== " ") {
            r += ", and " + eyes + " eyes set in " + skin + " skin";
        }
        else if (eyes !== " ") {
            r += ", and " + eyes + " eyes";
        }
        else {
            r += ", and " + skin + " skin";
        }
        return r;
        // let strings = [];
        // if (skin.trim() !== "skin") strings.push(skin);
        // if (hair.trim() !== "hair") strings.push(hair);
        // if (eyes.trim() !== "eyes") strings.push(eyes);
        // if (face.trim() !== "face") strings.push(face);
        // strings = this.shuffle(strings);
        // if (strings.length === 4) {
        //   r = strings[0] + ', ' + strings[1] + ', and ' + strings[2];
        // } else if (strings.length === 2) {
        //   r = strings[0] + ' and ' + strings[1];
        // } else {
        //   r = strings[0];
        // }
        // r = this.rand(0,1) ? skin + hair +
    }
    bodyFeatures() { }
    genderPronoun(npc, type) {
        if (npc.gender == "Male") {
            return ["he", "him", "his", "man", "boy"][type];
        }
        if (npc.gender == "Female") {
            return ["she", "her", "hers", "woman", "girl"][type];
        }
        return [
            "they",
            "them",
            "theirs",
            this.world.racesOb[npc.race_id].name,
            "child",
        ][type];
    }
    ageGroupAdjective(npc) {
        let race;
        console.log(npc);
        console.log(this.world);
        if (this.race || npc.race) {
            race = this.race ? this.race : npc.race;
        }
        else {
            race = this.world.racesOb[npc.race_id];
        }
        if (!race) {
            return "a ";
        }
        if (npc.age < race.adulthood)
            return this.ra([
                "a " +
                    npc.features.body.text +
                    " " +
                    " adolescent " +
                    this.genderPronoun(npc, 4),
                "a " +
                    npc.features.body.text +
                    " " +
                    " youthful " +
                    this.genderPronoun(npc, 4),
                "a " +
                    npc.features.body.text +
                    " " +
                    " young " +
                    this.genderPronoun(npc, 4),
            ]);
        if (npc.age < race.middleAge)
            return "a " + npc.features.body.text + " " + this.genderPronoun(npc, 3);
        if (npc.age < race.oldAge)
            return ("a " +
                npc.features.body.text +
                " middle-aged " +
                this.genderPronoun(npc, 3));
        return this.ra([
            "a " +
                npc.features.body.text +
                " " +
                " old " +
                this.genderPronoun(npc, 3),
            "a " +
                npc.features.body.text +
                " " +
                " elderly " +
                this.genderPronoun(npc, 3),
            "a " +
                npc.features.body.text +
                " " +
                " aged " +
                this.genderPronoun(npc, 3),
            "a " +
                npc.features.body.text +
                " " +
                " ancient " +
                this.genderPronoun(npc, 3),
            "a " +
                npc.features.body.text +
                " " +
                " senior " +
                this.genderPronoun(npc, 3),
            "a " +
                npc.features.body.text +
                " " +
                " venerable " +
                this.genderPronoun(npc, 3),
        ]);
    }
    rand(x = 1, y) {
        return x + (crypto.getRandomValues(new Uint32Array(1))[0] % (y - x + 1));
    }
    ra(array) {
        return array[this.rand(0, array.length - 1)];
    }
}
class POI {
    constructor(data = {}) {
        data = !!data ? data : {};
        Object.assign(this, data);
        if (!data.npcs)
            return;
        this.npcs = data.npcs.map((n) => new NPC(n));
    }
}


/***/ }),

/***/ 56681:
/*!************************************************************!*\
  !*** ./angular/app/shared/animations/custom-animations.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customAnimations": function() { return /* binding */ customAnimations; }
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 56083);

const customAnimations = [
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('slideInOut', [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('1', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ height: '*' })),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('0', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ height: '0px' })),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('1 <=> 0', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)(200))
    ])
];


/***/ }),

/***/ 16929:
/*!*******************************************************!*\
  !*** ./angular/app/shared/auth/auth-guard.service.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthGuard": function() { return /* binding */ AuthGuard; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.service */ 6008);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 3984);



class AuthGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(route, state) {
        let isAuth = this.authService.isLoggedIn();
        console.log(isAuth);
        if (!isAuth) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
        else {
            return true;
        }
    }
    canLoad(route, state) {
        let isAuth = this.authService.isLoggedIn();
        if (!isAuth) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
        else {
            return true;
        }
    }
}
AuthGuard.ɵfac = function AuthGuard_Factory(t) { return new (t || AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router)); };
AuthGuard.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AuthGuard, factory: AuthGuard.ɵfac });


/***/ }),

/***/ 43209:
/*!*****************************************************!*\
  !*** ./angular/app/shared/auth/auth.interceptor.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthInterceptor": function() { return /* binding */ AuthInterceptor; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.service */ 6008);


class AuthInterceptor {
    constructor(authService) {
        this.authService = authService;
    }
    intercept(req, next) {
        const accessToken = this.authService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + accessToken
            }
        });
        return next.handle(req);
    }
}
AuthInterceptor.ɵfac = function AuthInterceptor_Factory(t) { return new (t || AuthInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService)); };
AuthInterceptor.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AuthInterceptor, factory: AuthInterceptor.ɵfac });


/***/ }),

/***/ 6008:
/*!*************************************************!*\
  !*** ./angular/app/shared/auth/auth.service.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": function() { return /* binding */ AuthService; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 26215);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 88002);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 78345);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/auth */ 2552);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 58497);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 3984);






class AuthService {
    constructor(_firebaseAuth, http, router) {
        this._firebaseAuth = _firebaseAuth;
        this.http = http;
        this.router = router;
        this.userDetails = null;
        this.userSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject([]);
        this.user$ = this.userSource.asObservable();
        this.issuer = {
            login: "http://127.0.0.1:8000/api/auth/login",
            register: "http://127.0.0.1:8000/api/auth/register",
            refresh: "http://127.0.0.1:8000/api/auth/refresh",
        };
        this.refreshToken = () => {
            console.log("refresh");
            return this.http
                .post(`/api/auth/refresh`, {}, { withCredentials: true })
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)((data) => {
                this.setToken(data.access_token);
                this.startRefreshTokenTimer(data.access_token);
                this.userSource.next(data.user);
                return data;
            }));
        };
        this.user = _firebaseAuth.authState;
        this.user.subscribe((user) => {
            if (user) {
                this.userDetails = user;
            }
            else {
                this.userDetails = null;
            }
        });
    }
    setToken(token) {
        localStorage.setItem("auth_token", token);
    }
    getToken() {
        return localStorage.getItem("auth_token");
    }
    updateUser(user) {
        this.userSource.next(user);
    }
    // Verify the token
    isValidToken() {
        const token = this.getToken();
        if (token) {
            const payload = this.payload(token);
            if (payload) {
                return Object.values(this.issuer).indexOf(payload.iss) > -1
                    ? true
                    : false;
            }
        }
        else {
            return false;
        }
    }
    payload(token) {
        const jwtPayload = token.split(".")[1];
        return JSON.parse(atob(jwtPayload));
    }
    // User state based on valid token
    isLoggedIn() {
        return this.isValidToken();
    }
    // Remove token
    removeToken() {
        localStorage.removeItem("auth_token");
    }
    startRefreshTokenTimer(token) {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(token.split(".")[1]));
        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - 120 * 1000;
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }
    stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
    signupUser(value) {
        //your code for signing up the new user
        console.log(value);
        const body = {
            email: value.email,
            password: value.password,
        };
        const call = this.http.post("/api/auth/register", value).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.share)());
        return call;
    }
    signinUser(email, password) {
        //your code for checking credentials and getting tokens for for signing in user
        // return this._firebaseAuth.signInWithEmailAndPassword(email, password)
        const body = {
            email: email,
            password: password,
        };
        const call = this.http.post("/api/auth/login", body).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.share)());
        call.subscribe((data) => this.userSource.next(data.user));
        return call;
    }
    logout() {
        // this._firebaseAuth.signOut();
        this.router.navigate(["/logout"]);
    }
    isAuthenticated() {
        return true;
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__.AngularFireAuth), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router)); };
AuthService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac });


/***/ }),

/***/ 33507:
/*!**************************************************************************************!*\
  !*** ./angular/app/shared/components/autocomplete/autocomplete-content.directive.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AutocompleteContentDirective": function() { return /* binding */ AutocompleteContentDirective; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 74788);

class AutocompleteContentDirective {
    constructor(tpl) {
        this.tpl = tpl;
    }
}
AutocompleteContentDirective.ɵfac = function AutocompleteContentDirective_Factory(t) { return new (t || AutocompleteContentDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef)); };
AutocompleteContentDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: AutocompleteContentDirective, selectors: [["", "appAutocompleteContent", ""]] });


/***/ }),

/***/ 84678:
/*!******************************************************************************!*\
  !*** ./angular/app/shared/components/autocomplete/autocomplete.component.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AutocompleteComponent": function() { return /* binding */ AutocompleteComponent; }
/* harmony export */ });
/* harmony import */ var _autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./autocomplete-content.directive */ 33507);
/* harmony import */ var _option_option_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./option/option.component */ 21979);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 43190);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 66682);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 12057);






const _c0 = ["root"];
function AutocompleteComponent_ng_template_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](0);
} }
function AutocompleteComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, AutocompleteComponent_ng_template_0_ng_container_1_Template, 1, 0, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.content ? ctx_r1.content.tpl : null);
} }
class AutocompleteComponent {
    optionsClick() {
        return this.options.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)((options) => {
            const clicks$ = options.map((option) => option.click$);
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.merge)(...clicks$);
        }));
    }
}
AutocompleteComponent.ɵfac = function AutocompleteComponent_Factory(t) { return new (t || AutocompleteComponent)(); };
AutocompleteComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AutocompleteComponent, selectors: [["app-autocomplete"]], contentQueries: function AutocompleteComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵcontentQuery"](dirIndex, _autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_0__.AutocompleteContentDirective, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵcontentQuery"](dirIndex, _option_option_component__WEBPACK_IMPORTED_MODULE_1__.OptionComponent, 4);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.options = _t);
    } }, viewQuery: function AutocompleteComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.rootTemplate = _t.first);
    } }, exportAs: ["appAutocomplete"], decls: 2, vars: 0, consts: [["root", ""], [1, "autocomplete", "search-list"], [4, "ngTemplateOutlet"]], template: function AutocompleteComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, AutocompleteComponent_ng_template_0_Template, 2, 1, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgTemplateOutlet], styles: [".autocomplete[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  display: block;\r\n}\r\n\r\n.search-list[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 100%;\r\n  left: 0;\r\n  background: #ffffff;\r\n  width: 100%;\r\n  margin-top: 1rem;\r\n  padding-left: 0;\r\n  border-radius: 0.267rem;\r\n  z-index: 1200;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dG9jb21wbGV0ZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsU0FBUztFQUNULE9BQU87RUFDUCxtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLGFBQWE7QUFDZiIsImZpbGUiOiJhdXRvY29tcGxldGUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hdXRvY29tcGxldGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4uc2VhcmNoLWxpc3Qge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDEwMCU7XHJcbiAgbGVmdDogMDtcclxuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbi10b3A6IDFyZW07XHJcbiAgcGFkZGluZy1sZWZ0OiAwO1xyXG4gIGJvcmRlci1yYWRpdXM6IDAuMjY3cmVtO1xyXG4gIHotaW5kZXg6IDEyMDA7XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ 344:
/*!******************************************************************************!*\
  !*** ./angular/app/shared/components/autocomplete/autocomplete.directive.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AutocompleteDirective": function() { return /* binding */ AutocompleteDirective; },
/* harmony export */   "overlayClickOutside": function() { return /* binding */ overlayClickOutside; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 22759);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/overlay */ 933);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/portal */ 2414);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 46782);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 45435);
/* harmony import */ var ngx_take_until_destroy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-take-until-destroy */ 71363);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 3984);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 24751);










class AutocompleteDirective {
    constructor(host, ngControl, vcr, overlay, router) {
        this.host = host;
        this.ngControl = ngControl;
        this.vcr = vcr;
        this.overlay = overlay;
        this.router = router;
    }
    get control() {
        return this.ngControl.control;
    }
    ngOnInit() {
        (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(this.origin, "focus")
            .pipe((0,ngx_take_until_destroy__WEBPACK_IMPORTED_MODULE_1__.untilDestroyed)(this))
            .subscribe(() => {
            this.openDropdown();
            this.appAutocomplete
                .optionsClick()
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this.overlayRef.detachments()))
                .subscribe((value) => {
                this.control.setValue(value);
                this.close();
            });
        });
        this.router.events
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.filter)((event) => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__.NavigationEnd))
            .subscribe((routeChange) => {
            this.close();
        });
    }
    openDropdown() {
        this.close();
        this.overlayRef = this.overlay.create({
            width: this.origin.offsetWidth,
            maxHeight: 40 * 3,
            backdropClass: "",
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            positionStrategy: this.getOverlayPosition(),
        });
        const template = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__.TemplatePortal(this.appAutocomplete.rootTemplate, this.vcr);
        this.overlayRef.attach(template);
        overlayClickOutside(this.overlayRef, this.origin).subscribe(() => this.close());
    }
    ngOnDestroy() { }
    close() {
        if (this.overlayRef) {
            this.overlayRef.detach();
        }
        this.overlayRef = null;
    }
    getOverlayPosition() {
        const positions = [
            new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__.ConnectionPositionPair({ originX: "start", originY: "bottom" }, { overlayX: "start", overlayY: "top" }),
            new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__.ConnectionPositionPair({ originX: "start", originY: "top" }, { overlayX: "start", overlayY: "bottom" }),
        ];
        return this.overlay
            .position()
            .flexibleConnectedTo(this.origin)
            .withPositions(positions)
            .withFlexibleDimensions(false)
            .withPush(false);
    }
    get origin() {
        return this.host.nativeElement;
    }
}
AutocompleteDirective.ɵfac = function AutocompleteDirective_Factory(t) { return new (t || AutocompleteDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControl), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router)); };
AutocompleteDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineDirective"]({ type: AutocompleteDirective, selectors: [["", "appAutocomplete", ""]], inputs: { appAutocomplete: "appAutocomplete" } });
function overlayClickOutside(overlayRef, origin) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(document, "click").pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.filter)((event) => {
        const clickTarget = event.target;
        const notOrigin = clickTarget !== origin; // the input
        const notOverlay = !!overlayRef &&
            overlayRef.overlayElement.contains(clickTarget) === false; // the autocomplete
        return notOrigin && notOverlay;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(overlayRef.detachments()));
}


/***/ }),

/***/ 31977:
/*!***************************************************************************!*\
  !*** ./angular/app/shared/components/autocomplete/autocomplete.module.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AutocompleteModule": function() { return /* binding */ AutocompleteModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var _autocomplete_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./autocomplete.component */ 84678);
/* harmony import */ var _autocomplete_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./autocomplete.directive */ 344);
/* harmony import */ var _autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./autocomplete-content.directive */ 33507);
/* harmony import */ var _option_option_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./option/option.component */ 21979);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 74788);






const publicApi = [
    _autocomplete_component__WEBPACK_IMPORTED_MODULE_0__.AutocompleteComponent,
    _autocomplete_directive__WEBPACK_IMPORTED_MODULE_1__.AutocompleteDirective,
    _autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_2__.AutocompleteContentDirective,
    _option_option_component__WEBPACK_IMPORTED_MODULE_3__.OptionComponent,
];
class AutocompleteModule {
}
AutocompleteModule.ɵfac = function AutocompleteModule_Factory(t) { return new (t || AutocompleteModule)(); };
AutocompleteModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AutocompleteModule });
AutocompleteModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AutocompleteModule, { declarations: [_autocomplete_component__WEBPACK_IMPORTED_MODULE_0__.AutocompleteComponent,
        _autocomplete_directive__WEBPACK_IMPORTED_MODULE_1__.AutocompleteDirective,
        _autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_2__.AutocompleteContentDirective,
        _option_option_component__WEBPACK_IMPORTED_MODULE_3__.OptionComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule], exports: [_autocomplete_component__WEBPACK_IMPORTED_MODULE_0__.AutocompleteComponent,
        _autocomplete_directive__WEBPACK_IMPORTED_MODULE_1__.AutocompleteDirective,
        _autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_2__.AutocompleteContentDirective,
        _option_option_component__WEBPACK_IMPORTED_MODULE_3__.OptionComponent] }); })();


/***/ }),

/***/ 21979:
/*!*******************************************************************************!*\
  !*** ./angular/app/shared/components/autocomplete/option/option.component.ts ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OptionComponent": function() { return /* binding */ OptionComponent; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 22759);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 96736);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 74788);



const _c0 = ["*"];
class OptionComponent {
    constructor(host) {
        this.host = host;
    }
    ngOnInit() {
        this.click$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(this.element, 'click').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.mapTo)(this.value));
    }
    get element() {
        return this.host.nativeElement;
    }
}
OptionComponent.ɵfac = function OptionComponent_Factory(t) { return new (t || OptionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef)); };
OptionComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: OptionComponent, selectors: [["app-option"]], inputs: { value: "value", url: "url" }, ngContentSelectors: _c0, decls: 2, vars: 0, consts: [[1, "option"]], template: function OptionComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } }, styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.no-result[_nghost-%COMP%] {\n  pointer-events: none;\n}\n\n.option[_ngcontent-%COMP%] {\n  padding: 0.8rem 1rem;\n  cursor: pointer;\n  display: block;\n  color: black;\n}\n\n[_nghost-%COMP%]:first-child   .option[_ngcontent-%COMP%] {\n  border-top-left-radius: 0.35rem;\n  border-top-right-radius: 0.35rem;\n}\n\n[_nghost-%COMP%]:last-child   .option[_ngcontent-%COMP%] {\n  border-bottom-left-radius: 0.35rem;\n  border-bottom-right-radius: 0.35rem;\n}\n\n.option[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n\n.first-active-item[_nghost-%COMP%]   .option[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9wdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxvQkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsK0JBQUE7RUFDQSxnQ0FBQTtBQUNGOztBQUVBO0VBQ0Usa0NBQUE7RUFDQSxtQ0FBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7QUFDRjs7QUFHRTtFQUNFLHlCQUFBO0FBQUoiLCJmaWxlIjoib3B0aW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG46aG9zdC5uby1yZXN1bHQge1xyXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG59XHJcblxyXG4ub3B0aW9uIHtcclxuICBwYWRkaW5nOiAwLjhyZW0gMXJlbTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG59XHJcblxyXG46aG9zdDpmaXJzdC1jaGlsZCAub3B0aW9uIHtcclxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwLjM1cmVtO1xyXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwLjM1cmVtO1xyXG59XHJcblxyXG46aG9zdDpsYXN0LWNoaWxkIC5vcHRpb24ge1xyXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDAuMzVyZW07XHJcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDAuMzVyZW07XHJcbn1cclxuXHJcbi5vcHRpb246aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbn1cclxuXHJcbjpob3N0LmZpcnN0LWFjdGl2ZS1pdGVtIHtcclxuICAub3B0aW9uIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"], changeDetection: 0 });


/***/ }),

/***/ 7191:
/*!************************************************************!*\
  !*** ./angular/app/shared/components/coa/coa.component.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CoaComponent": function() { return /* binding */ CoaComponent; }
/* harmony export */ });
/* harmony import */ var C_gmp_Dungeon_Master_Pro_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ 16304);
/* harmony import */ var _shared_configs_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/configs/const */ 33009);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 74788);



class CoaComponent {
  constructor() {
    this.ordinaries = [];

    this.getElTransform = (c, p) => {
      const s = (c.size || 1) * this.sizeModifier;
      const sx = c.sinister ? -s : s;
      const sy = c.reversed ? -s : s;
      let [x, y] = this.positions[p];
      x = x - 100 * (sx - 1);
      y = y - 100 * (sy - 1);
      const scale = c.sinister || c.reversed ? `${sx} ${sy}` : s;
      return `translate(${x} ${y}) scale(${scale})`;
    };
  }

  ngOnInit() {
    console.log(this.coa);
    this.shield = this.coa.shield;
    this.division = this.coa.division;
    this.ordinaries = this.coa.ordinaries ? this.coa.ordinaries : [];
    this.charges = this.coa.charges ? this.coa.charges : [];
    this.ordinariesRegular = this.ordinaries.filter(o => !o.above);
    this.ordinariesAboveCharges = this.ordinaries.filter(o => o.above);
    this.shieldPath = _shared_configs_const__WEBPACK_IMPORTED_MODULE_1__.shieldPaths[this.shield];
    this.tDiv = this.division ? this.division.t.includes("-") ? this.division.t.split("-")[1] : this.division.t : null;
    this.positions = _shared_configs_const__WEBPACK_IMPORTED_MODULE_1__.shieldPositions[this.shield];
    this.sizeModifier = _shared_configs_const__WEBPACK_IMPORTED_MODULE_1__.shieldSize[this.shield] || 1;
    this.viewBox = _shared_configs_const__WEBPACK_IMPORTED_MODULE_1__.shieldBox[this.shield] || "0 0 200 200";
    const shieldClip = `<clipPath id="${this.shield}_${this.id}"><path d="${this.shieldPath}"/></clipPath>`;
    const divisionClip = this.division ? `<clipPath id="divisionClip_${this.id}">${this.getTemplate(this.division.division, this.division.line)}</clipPath>` : "";
    const loadedCharges = this.getCharges(this.coa, this.id, this.shieldPath);
    const loadedPatterns = this.getPatterns(this.coa, this.id);
    const blacklight = `<radialGradient id="backlight_${this.id}" cx="100%" cy="100%" r="150%"><stop stop-color="#fff" stop-opacity=".3" offset="0"/><stop stop-color="#fff" stop-opacity=".15" offset=".25"/><stop stop-color="#000" stop-opacity="0" offset="1"/></radialGradient>`;
    const field = `<rect x="0" y="0" width="200" height="200" fill="${this.clr(this.coa.t1)}"/>`;
    const divisionGroup = this.division ? this.templateDivision() : "";
    const overlay = `<path d="${this.shieldPath}" fill="url(#backlight_${this.id})" stroke="#333"/>`;
    this.svg = `<svg id="${this.id}" width="200" height="200" viewBox="${this.viewBox}">
          <defs>${shieldClip}${divisionClip}${loadedCharges}${loadedPatterns}${blacklight}</defs>
          <g clip-path="url(#${this.shield}_${this.id})">${field}${divisionGroup}${this.templateAboveAll()}</g>
          ${overlay}</svg>`;
  }

  templateDivision() {
    let svg = ""; // In field part

    for (const ordinary of this.ordinariesRegular) {
      if (ordinary.divided === "field") svg += this.templateOrdinary(ordinary, ordinary.t);else if (ordinary.divided === "counter") svg += this.templateOrdinary(ordinary, this.tDiv);
    }

    for (const charge of this.charges) {
      if (charge.divided === "field") svg += this.templateCharge(charge, charge.t);else if (charge.divided === "counter") svg += this.templateCharge(charge, this.tDiv);
    }

    for (const ordinary of this.ordinariesAboveCharges) {
      if (ordinary.divided === "field") svg += this.templateOrdinary(ordinary, ordinary.t);else if (ordinary.divided === "counter") svg += this.templateOrdinary(ordinary, this.tDiv);
    } // In division part


    svg += `<g clip-path="url(#divisionClip_${this.id})"><rect x="0" y="0" width="200" height="200" fill="${this.clr(this.division.t)}"/>`;

    for (const ordinary of this.ordinariesRegular) {
      if (ordinary.divided === "division") svg += this.templateOrdinary(ordinary, ordinary.t);else if (ordinary.divided === "counter") svg += this.templateOrdinary(ordinary, this.coa.t1);
    }

    for (const charge of this.charges) {
      if (charge.divided === "division") svg += this.templateCharge(charge, charge.t);else if (charge.divided === "counter") svg += this.templateCharge(charge, this.coa.t1);
    }

    for (const ordinary of this.ordinariesAboveCharges) {
      if (ordinary.divided === "division") svg += this.templateOrdinary(ordinary, ordinary.t);else if (ordinary.divided === "counter") svg += this.templateOrdinary(ordinary, this.coa.t1);
    }

    return svg += `</g>`;
  }

  templateAboveAll() {
    let svg = "";
    this.ordinariesRegular.filter(o => !o.divided).forEach(ordinary => {
      svg += this.templateOrdinary(ordinary, ordinary.t);
    });
    this.charges.filter(o => !o.divided || !this.division).forEach(charge => {
      svg += this.templateCharge(charge, charge.t);
    });
    this.ordinariesAboveCharges.filter(o => !o.divided).forEach(ordinary => {
      svg += this.templateOrdinary(ordinary, ordinary.t);
    });
    return svg;
  }

  templateOrdinary(ordinary, tincture) {
    const fill = this.clr(tincture);
    let svg = `<g fill="${fill}" stroke="none">`;
    if (ordinary.ordinary === "bordure") svg += `<path d="${this.shieldPath}" fill="none" stroke="${fill}" stroke-width="16.7%"/>`;else if (ordinary.ordinary === "orle") svg += `<path d="${this.shieldPath}" fill="none" stroke="${fill}" stroke-width="5%" transform="scale(.85)" transform-origin="center">`;else svg += this.getTemplate(ordinary.ordinary, ordinary.line);
    return svg + `</g>`;
  }

  templateCharge(charge, tincture) {
    const fill = this.clr(tincture);
    const chargePositions = [...new Set(charge.p)].filter(position => this.positions[position]);
    let svg = "";
    svg += `<g fill="${fill}" stroke="#000">`;

    for (const p of chargePositions) {
      const transform = this.getElTransform(charge, p);
      svg += `<use href="#${charge.charge}_${this.id}" transform="${transform}"></use>`;
    }

    return svg + `</g>`;
  }

  getCharges(coa, id, shieldPath) {
    var _this = this;

    return (0,C_gmp_Dungeon_Master_Pro_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)(function* () {
      let charges = coa.charges ? coa.charges.map(charge => charge.charge) : []; // add charges async

      if (_this.semy(coa.t1)) charges.push(_this.semy(coa.t1)); // add field semy charge

      if (_this.semy(coa.division?.t)) charges.push(_this.semy(coa.division.t)); // add division semy charge

      const uniqueCharges = [...new Set(charges)];
      const fetchedCharges = yield Promise.all(uniqueCharges.map( /*#__PURE__*/function () {
        var _ref = (0,C_gmp_Dungeon_Master_Pro_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)(function* (charge) {
          if (charge === "inescutcheon") return `<g id="inescutcheon_${id}"><path transform="translate(66 66) scale(.34)" d="${shieldPath}"/></g>`;
          const fetched = yield fetchCharge(charge, id);
          return fetched;
        });

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()));
      return fetchedCharges.join("");
    })();
  }

  getPatterns(coa, id) {
    const isPattern = string => string.includes("-");

    let patternsToAdd = [];
    if (coa.t1.includes("-")) patternsToAdd.push(coa.t1); // add field pattern

    if (coa.division && isPattern(coa.division.t)) patternsToAdd.push(coa.division.t); // add division pattern

    if (this.ordinaries) this.ordinaries.filter(ordinary => isPattern(ordinary.t)).forEach(ordinary => patternsToAdd.push(ordinary.t)); // add ordinaries pattern

    if (coa.charges) coa.charges.filter(charge => isPattern(charge.t)).forEach(charge => patternsToAdd.push(charge.t)); // add charges pattern

    if (!patternsToAdd.length) return "";
    return [...new Set(patternsToAdd)].map(patternString => {
      const [pattern, t1, t2, size] = patternString.split("-");
      const charge = this.semy(patternString);
      if (charge) return _shared_configs_const__WEBPACK_IMPORTED_MODULE_1__.patterns.semy(patternString, this.clr(t1), this.clr(t2), this.getSizeMod(size), charge + "_" + id);
      return _shared_configs_const__WEBPACK_IMPORTED_MODULE_1__.patterns[pattern](patternString, this.clr(t1), this.clr(t2), this.getSizeMod(size), charge);
    }).join("");
  }

  getSizeMod(size) {
    if (size === "small") return 0.8;
    if (size === "smaller") return 0.5;
    if (size === "smallest") return 0.25;
    if (size === "big") return 1.6;
    return 1;
  }

  getTemplate(id, line) {
    const linedId = id + "Lined";
    if (!line || line === "straight" || !_shared_configs_const__WEBPACK_IMPORTED_MODULE_1__.templates[linedId]) return _shared_configs_const__WEBPACK_IMPORTED_MODULE_1__.templates[id];
    const linePath = _shared_configs_const__WEBPACK_IMPORTED_MODULE_1__.shieldLines[line];
    return _shared_configs_const__WEBPACK_IMPORTED_MODULE_1__.templates[linedId](linePath);
  }

  semy(string) {
    const isSemy = /^semy/.test(string);
    if (!isSemy) return false;
    return string.match(/semy_of_(.*?)-/)[1];
  }

  clr(tincture) {
    if (_shared_configs_const__WEBPACK_IMPORTED_MODULE_1__.shieldColors[tincture]) return _shared_configs_const__WEBPACK_IMPORTED_MODULE_1__.shieldColors[tincture];
    return `url(#${tincture})`;
  }

}

CoaComponent.ɵfac = function CoaComponent_Factory(t) {
  return new (t || CoaComponent)();
};

CoaComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: CoaComponent,
  selectors: [["app-coa"]],
  inputs: {
    coa: "coa",
    id: "id"
  },
  decls: 1,
  vars: 1,
  consts: [[3, "innerHTML"]],
  template: function CoaComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "div", 0);
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", ctx.svg, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
    }
  },
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb2EuY29tcG9uZW50LnNjc3MifQ== */"]
});
const url = location.hostname ? "./charges/" : "http://armoria.herokuapp.com/charges/"; // on local machine fetch files from server

function fetchCharge(_x2, _x3) {
  return _fetchCharge.apply(this, arguments);
}

function _fetchCharge() {
  _fetchCharge = (0,C_gmp_Dungeon_Master_Pro_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)(function* (charge, id) {
    const fetched = fetch(url + charge + ".svg").then(res => {
      if (res.ok) return res.text();else throw new Error("Cannot fetch charge");
    }).then(text => {
      const html = document.createElement("html");
      html.innerHTML = text;
      const g = html.querySelector("g");
      g.setAttribute("id", charge + "_" + id);
      return g.outerHTML;
    }).catch(err => console.error(err));
    return fetched;
  });
  return _fetchCharge.apply(this, arguments);
}

/***/ }),

/***/ 90081:
/*!******************************************************************************!*\
  !*** ./angular/app/shared/components/npc-selector/npc-selector.component.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NpcSelectorComponent": function() { return /* binding */ NpcSelectorComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _models_region__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/region */ 27284);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ 49976);
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-perfect-scrollbar */ 99904);
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngneat/until-destroy */ 36857);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _services_story_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/story.service */ 43235);
/* harmony import */ var _shared_services_world_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/services/world.service */ 40653);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 96797);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 54163);














function NpcSelectorComponent_ng_container_13_ng_template_2_tr_14_fa_icon_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "fa-icon", 14);
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", ctx_r6.faSkull);
} }
function NpcSelectorComponent_ng_container_13_ng_template_2_tr_14_fa_icon_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "fa-icon", 14);
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("icon", ctx_r7.faInfinity);
} }
function NpcSelectorComponent_ng_container_13_ng_template_2_tr_14_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NpcSelectorComponent_ng_container_13_ng_template_2_tr_14_Template_tr_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r9); const npc_r4 = restoredCtx.$implicit; const i_r5 = restoredCtx.index; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3); return ctx_r8.selectNpc(npc_r4, i_r5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "td", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, NpcSelectorComponent_ng_container_13_ng_template_2_tr_14_fa_icon_10_Template, 1, 1, "fa-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, NpcSelectorComponent_ng_container_13_ng_template_2_tr_14_fa_icon_11_Template, 1, 1, "fa-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const npc_r4 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("selected", (ctx_r3.selectedNPC == null ? null : ctx_r3.selectedNPC.id) == (npc_r4 == null ? null : npc_r4.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](npc_r4.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](npc_r4.age);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](npc_r4.race.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](npc_r4.profession == null ? null : npc_r4.profession.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", npc_r4.alive == 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", npc_r4.alive == 2);
} }
const _c0 = function () { return {}; };
function NpcSelectorComponent_ng_container_13_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "perfect-scrollbar", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "table", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "thead");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Age");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Race");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Profession");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](12, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, NpcSelectorComponent_ng_container_13_ng_template_2_tr_14_Template, 12, 8, "tr", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const group_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("config", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](2, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", group_r1[1]);
} }
function NpcSelectorComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ngb-panel", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, NpcSelectorComponent_ng_container_13_ng_template_2_Template, 15, 3, "ng-template", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const group_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("title", group_r1[0]);
} }
let NpcSelectorComponent = class NpcSelectorComponent {
    constructor(storyService, worldService) {
        this.storyService = storyService;
        this.worldService = worldService;
        this.faInfinity = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faInfinity;
        this.faSkull = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faSkull;
        this.faRandom = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faRandom;
        this.lifeValues = ["Dead", "Alive", "Immortal", "Undead"];
        this.grouping = ["age", "race", "profession", "lineage"];
        this.npcGroups = [];
        this.lockedFeatures = [];
        this.featuresArray = [];
        this.selectedRegion = new _models_region__WEBPACK_IMPORTED_MODULE_0__.Region();
        this.selectNpc = (npc, i) => {
            this.npcI = i;
            console.log(i);
            console.log(npc);
            this.worldService.getNpc(npc.id);
        };
        this.groupNpcsBy = (group) => {
            let groupObject;
            switch (group) {
                case "age":
                    groupObject = this.groupBy(this.npcs, (npc) => this.ageGroup(npc));
                    this.groupedNpcs = Array.from(groupObject).sort();
                    break;
                case "race":
                    groupObject = this.groupBy(this.npcs, (npc) => npc.race.name);
                    this.groupedNpcs = Array.from(groupObject).sort();
                    break;
                case "profession":
                    groupObject = this.groupBy(this.npcs, (npc) => npc.profession ? npc.profession.name : "None");
                    this.groupedNpcs = Array.from(groupObject).sort();
                    break;
                case "lineage":
                    groupObject = this.groupBy(this.npcs, (npc) => {
                        if (!npc.features.lineage)
                            return "None";
                        let name = npc.features.lineage["text"];
                        return this.upperFirst(name);
                    });
                    this.groupedNpcs = Array.from(groupObject).sort();
                    break;
            }
        };
        this.findRace = (raceId) => {
            return this.selectedWorld.races.find((r) => r.id == raceId);
        };
        this.findProfession = (professionId) => {
            return this.selectedWorld.professions.find((p) => p.id == professionId);
        };
    }
    upperFirst(name, empty = "None") {
        return name ? name.charAt(0).toUpperCase() + name.slice(1) : empty;
    }
    groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            }
            else {
                collection.push(item);
            }
        });
        return map;
    }
    ageGroup(npc) {
        if (npc.age < npc.race.adulthood)
            return "Youth";
        if (npc.age < npc.race.middle_age)
            return "Adult";
        if (npc.age < npc.race.old_age)
            return "Middle Aged";
        return "Old Age & Venerable";
    }
    ngOnInit() {
        this.worldService.selectedRegion$
            .pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_5__.untilDestroyed)(this))
            .subscribe((region) => {
            if (!Object.values(region).length)
                return;
            console.log(region);
            if (typeof region.id == "undefined")
                return;
            console.log(region.id);
            this.selectedRegion = region;
            console.log(region);
            this.worldService
                .getNpcList(region.id)
                .subscribe((data) => {
                this.npcs = data.npcs;
            });
        });
        this.worldService.selectedWorld$
            .pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_5__.untilDestroyed)(this))
            .subscribe((world) => {
            if (!Object.values(world).length)
                return;
            console.log(world);
            if (!world)
                return;
            this.selectedWorld = world;
        });
        this.worldService.selectedNPC$
            .pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_5__.untilDestroyed)(this))
            .subscribe((npc) => {
            if (!Object.values(npc).length)
                return;
            this.selectedNPC = npc;
            console.log(npc);
            console.log(this.npcI);
            if (!this.npcI)
                return;
            this.npcs[this.npcI] = npc;
        });
    }
};
NpcSelectorComponent.ɵfac = function NpcSelectorComponent_Factory(t) { return new (t || NpcSelectorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_story_service__WEBPACK_IMPORTED_MODULE_1__.StoryService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_shared_services_world_service__WEBPACK_IMPORTED_MODULE_2__.WorldService)); };
NpcSelectorComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: NpcSelectorComponent, selectors: [["app-npc-selector"]], viewQuery: function NpcSelectorComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_6__.PerfectScrollbarComponent, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.componentRef = _t.first);
    } }, decls: 14, vars: 2, consts: [[1, "btn-group", "btn-group-sm", 2, "z-index", "1000"], [1, "btn", "btn-light"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click"], [1, "npc-groups"], [3, "closeOthers"], [4, "ngFor", "ngForOf"], [3, "title"], ["ngbPanelContent", ""], ["fxFlex", "auto", 1, "scroll-container", "table-fixed-head", 2, "position", "relative", "max-height", "30vh", 3, "config"], [1, "table", "table-sm", "pb-0", 2, "font-size", "larger"], [3, "selected", "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "text-capitalize"], [3, "icon", 4, "ngIf"], [3, "icon"]], template: function NpcSelectorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Group By:");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NpcSelectorComponent_Template_button_click_3_listener() { return ctx.groupNpcsBy("age"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, " Age ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NpcSelectorComponent_Template_button_click_5_listener() { return ctx.groupNpcsBy("race"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, " Race ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NpcSelectorComponent_Template_button_click_7_listener() { return ctx.groupNpcsBy("profession"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, " Profession ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NpcSelectorComponent_Template_button_click_9_listener() { return ctx.groupNpcsBy("lineage"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, " Lineage ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "ngb-accordion", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, NpcSelectorComponent_ng_container_13_Template, 3, 1, "ng-container", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("closeOthers", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.groupedNpcs);
    } }, directives: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__.NgbAccordion, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__.NgbPanel, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__.NgbPanelContent, ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_6__.PerfectScrollbarComponent, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_9__.FaIconComponent], styles: ["[_nghost-%COMP%]     .card-body {\n  padding: 0px;\n}\n\n.selected[_ngcontent-%COMP%] {\n  background-color: yellow;\n  color: black;\n  font-weight: 400;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wYy1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7QUFDRjs7QUFDQTtFQUNFLHdCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FBRUYiLCJmaWxlIjoibnBjLXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3QgOjpuZy1kZWVwIC5jYXJkLWJvZHkge1xyXG4gIHBhZGRpbmc6IDBweDtcclxufVxyXG4uc2VsZWN0ZWQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcclxuICBjb2xvcjogYmxhY2s7XHJcbiAgZm9udC13ZWlnaHQ6IDQwMDtcclxufVxyXG4iXX0= */"] });
NpcSelectorComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_5__.UntilDestroy)()
], NpcSelectorComponent);



/***/ }),

/***/ 33009:
/*!*********************************************!*\
  !*** ./angular/app/shared/configs/const.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shieldColors": function() { return /* binding */ shieldColors; },
/* harmony export */   "shieldPositions": function() { return /* binding */ shieldPositions; },
/* harmony export */   "shieldSize": function() { return /* binding */ shieldSize; },
/* harmony export */   "shieldBox": function() { return /* binding */ shieldBox; },
/* harmony export */   "shieldPaths": function() { return /* binding */ shieldPaths; },
/* harmony export */   "shieldLines": function() { return /* binding */ shieldLines; },
/* harmony export */   "templates": function() { return /* binding */ templates; },
/* harmony export */   "patterns": function() { return /* binding */ patterns; },
/* harmony export */   "tinctures": function() { return /* binding */ tinctures; },
/* harmony export */   "charges": function() { return /* binding */ charges; },
/* harmony export */   "positions": function() { return /* binding */ positions; },
/* harmony export */   "divisions": function() { return /* binding */ divisions; },
/* harmony export */   "ordinaries": function() { return /* binding */ ordinaries; },
/* harmony export */   "shields": function() { return /* binding */ shields; },
/* harmony export */   "adjForms": function() { return /* binding */ adjForms; },
/* harmony export */   "innColors": function() { return /* binding */ innColors; },
/* harmony export */   "animals": function() { return /* binding */ animals; },
/* harmony export */   "adjectives": function() { return /* binding */ adjectives; },
/* harmony export */   "methods": function() { return /* binding */ methods; },
/* harmony export */   "courses": function() { return /* binding */ courses; },
/* harmony export */   "types": function() { return /* binding */ types; },
/* harmony export */   "drinks": function() { return /* binding */ drinks; },
/* harmony export */   "monsterAdjectives": function() { return /* binding */ monsterAdjectives; },
/* harmony export */   "subjects": function() { return /* binding */ subjects; },
/* harmony export */   "species": function() { return /* binding */ species; },
/* harmony export */   "modusOperandi": function() { return /* binding */ modusOperandi; },
/* harmony export */   "icons": function() { return /* binding */ icons; },
/* harmony export */   "typedIcons": function() { return /* binding */ typedIcons; },
/* harmony export */   "climates": function() { return /* binding */ climates; },
/* harmony export */   "climateNames": function() { return /* binding */ climateNames; },
/* harmony export */   "colors": function() { return /* binding */ colors; },
/* harmony export */   "lines": function() { return /* binding */ lines; }
/* harmony export */ });
let P = (probability) => {
    if (probability >= 1)
        return true;
    if (probability <= 0)
        return false;
    return Math.random() < probability;
};
const shieldColors = {
    argent: "#fafafa",
    or: "#ffe066",
    gules: "#d7374a",
    sable: "#333333",
    azure: "#377cd7",
    vert: "#26c061",
    purpure: "#522d5b",
    murrey: "#85185b",
    sanguine: "#b63a3a",
    tenné: "#cc7f19",
};
const shieldPositions = {
    // shield-specific position: [x, y] (relative to center)
    heater: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-32.25, 37.5],
        h: [0, 50],
        i: [32.25, 37.5],
        y: [-50, -50],
        z: [0, 62.5],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-30, 30],
        n: [0, 42.5],
        o: [30, 30],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.2, -66.6],
        B: [-22, -66.6],
        C: [22, -66.6],
        D: [66.2, -66.6],
        K: [-66.2, -20],
        E: [66.2, -20],
        J: [-55.5, 26],
        F: [55.5, 26],
        I: [-33, 62],
        G: [33, 62],
        H: [0, 89.5],
    },
    spanish: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-43.75, 50],
        h: [0, 50],
        i: [43.75, 50],
        y: [-50, -50],
        z: [0, 50],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 37.5],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.2, -66.6],
        B: [-22, -66.6],
        C: [22, -66.6],
        D: [66.2, -66.6],
        K: [-66.4, -20],
        E: [66.4, -20],
        J: [-66.4, 26],
        F: [66.4, 26],
        I: [-49, 70],
        G: [49, 70],
        H: [0, 92],
    },
    french: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-43.75, 50],
        h: [0, 50],
        i: [43.75, 50],
        y: [-50, -50],
        z: [0, 65],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 37.5],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.2, -66.6],
        B: [-22, -66.6],
        C: [22, -66.6],
        D: [66.2, -66.6],
        K: [-66.4, -20],
        E: [66.4, -20],
        J: [-66.4, 26],
        F: [66.4, 26],
        I: [-65.4, 70],
        G: [65.4, 70],
        H: [0, 89],
    },
    horsehead: {
        a: [-43.75, -47.5],
        b: [0, -50],
        c: [43.75, -47.5],
        d: [-35, 0],
        e: [0, 0],
        f: [35, 0],
        h: [0, 50],
        y: [-50, -50],
        z: [0, 55],
        j: [-35, -35],
        k: [0, -40],
        l: [35, -35],
        m: [-30, 30],
        n: [0, 40],
        o: [30, 30],
        p: [-27.5, 0],
        q: [27.5, 0],
        A: [-71, -52],
        B: [-24, -73],
        C: [24, -73],
        D: [71, -52],
        K: [-62, -16],
        E: [62, -16],
        J: [-39, 20],
        F: [39, 20],
        I: [-33.5, 60],
        G: [33.5, 60],
        H: [0, 91.5],
    },
    horsehead2: {
        a: [-37.5, -47.5],
        b: [0, -50],
        c: [37.5, -47.5],
        d: [-35, 0],
        e: [0, 0],
        f: [35, 0],
        g: [-35, 47.5],
        h: [0, 50],
        i: [35, 47.5],
        y: [-50, -50],
        z: [0, 55],
        j: [-30, -30],
        k: [0, -40],
        l: [30, -30],
        m: [-30, 30],
        n: [0, 40],
        o: [30, 30],
        p: [-27.5, 0],
        q: [27.5, 0],
        A: [-49, -39],
        B: [-22, -70],
        C: [22, -70],
        D: [49, -39],
        K: [-51, -2],
        E: [51, -2],
        J: [-38.5, 31],
        F: [38.5, 31],
        I: [-35, 67],
        G: [35, 67],
        H: [0, 85],
    },
    polish: {
        a: [-35, -50],
        b: [0, -50],
        c: [35, -50],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-37.5, 50],
        h: [0, 50],
        i: [37.5, 50],
        y: [-50, -50],
        z: [0, 65],
        j: [-27.5, -27.5],
        k: [0, -45],
        l: [27.5, -27.5],
        m: [-27.5, 27.5],
        n: [0, 45],
        o: [27.5, 27.5],
        p: [-32.5, 0],
        q: [32.5, 0],
        A: [-48, -52],
        B: [-23, -80],
        C: [23, -80],
        D: [48, -52],
        K: [-47, -10],
        E: [47, -10],
        J: [-62, 32],
        F: [62, 32],
        I: [-37, 68],
        G: [37, 68],
        H: [0, 86],
    },
    hessen: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-43.75, 50],
        h: [0, 50],
        i: [43.75, 50],
        y: [-50, -50],
        z: [0, 52.5],
        j: [-40, -40],
        k: [0, -40],
        l: [40, -40],
        m: [-40, 40],
        n: [0, 40],
        o: [40, 40],
        p: [-40, 0],
        q: [40, 0],
        A: [-69, -64],
        B: [-22, -76],
        C: [22, -76],
        D: [69, -64],
        K: [-66.4, -20],
        E: [66.4, -20],
        J: [-62, 26],
        F: [62, 26],
        I: [-46, 70],
        G: [46, 70],
        H: [0, 91.5],
    },
    swiss: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-32, 37.5],
        h: [0, 50],
        i: [32, 37.5],
        y: [-50, -50],
        z: [0, 62.5],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-32, 32.5],
        n: [0, 42.5],
        o: [32, 32.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.2, -66.6],
        B: [-22, -66],
        C: [22, -66],
        D: [66.2, -66.6],
        K: [-63, -20],
        E: [63, -20],
        J: [-50, 26],
        F: [50, 26],
        I: [-29, 62],
        G: [29, 62],
        H: [0, 89.5],
    },
    boeotian: {
        a: [-37.5, -47.5],
        b: [0, -47.5],
        c: [37.5, -47.5],
        d: [-25, 0],
        e: [0, 0],
        f: [25, 0],
        g: [-37.5, 47.5],
        h: [0, 47.5],
        i: [37.5, 47.5],
        y: [-48, -48],
        z: [0, 60],
        j: [-32.5, -37.5],
        k: [0, -45],
        l: [32.5, -37.5],
        m: [-32.5, 37.5],
        n: [0, 45],
        o: [32.5, 37.5],
        p: [-20, 0],
        q: [20, 0],
        A: [-45, -55],
        B: [-20, -77],
        C: [20, -77],
        D: [45, -55],
        K: [-59, -25],
        E: [59, -25],
        J: [-58, 27],
        F: [58, 27],
        I: [-39, 63],
        G: [39, 63],
        H: [0, 81],
    },
    roman: {
        a: [-40, -52.5],
        b: [0, -52.5],
        c: [40, -52.5],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-40, 52.5],
        h: [0, 52.5],
        i: [40, 52.5],
        y: [-42.5, -52.5],
        z: [0, 65],
        j: [-30, -37.5],
        k: [0, -37.5],
        l: [30, -37.5],
        m: [-30, 37.5],
        n: [0, 37.5],
        o: [30, 37.5],
        p: [-30, 0],
        q: [30, 0],
        A: [-51.5, -65],
        B: [-17, -75],
        C: [17, -75],
        D: [51.5, -65],
        K: [-51.5, -21],
        E: [51.5, -21],
        J: [-51.5, 21],
        F: [51.5, 21],
        I: [-51.5, 65],
        G: [51.5, 65],
        H: [-17, 75],
        L: [17, 75],
    },
    kite: {
        b: [0, -65],
        e: [0, -15],
        h: [0, 35],
        z: [0, 35],
        k: [0, -50],
        n: [0, 20],
        p: [-20, -15],
        q: [20, -15],
        A: [-38, -52],
        B: [-29, -78],
        C: [29, -78],
        D: [38, -52],
        K: [-33, -20],
        E: [33, -20],
        J: [-25, 11],
        F: [25, 11],
        I: [-15, 42],
        G: [15, 42],
        H: [0, 73],
        L: [0, -91],
    },
    oldFrench: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-37.5, 50],
        h: [0, 50],
        i: [37.5, 50],
        y: [-50, -50],
        z: [0, 62.5],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 45],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.2, -66.6],
        B: [-22, -66.6],
        C: [22, -66.6],
        D: [66.2, -66.6],
        K: [-66.2, -20],
        E: [66.2, -20],
        J: [-64, 26],
        F: [64, 26],
        I: [-45, 62],
        G: [45, 62],
        H: [0, 91],
    },
    renaissance: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-41.5, 0],
        e: [0, 0],
        f: [41.5, 0],
        g: [-43.75, 50],
        h: [0, 50],
        i: [43.75, 50],
        y: [-50, -50],
        z: [0, 62.5],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 37.5],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-61, -55],
        B: [-23, -67],
        C: [23, -67],
        D: [61, -55],
        K: [-55, -11],
        E: [55, -11],
        J: [-65, 31],
        F: [65, 31],
        I: [-45, 76],
        G: [45, 76],
        H: [0, 87],
    },
    baroque: {
        a: [-43.75, -45],
        b: [0, -45],
        c: [43.75, -45],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-43.75, 50],
        h: [0, 50],
        i: [43.75, 50],
        y: [-50, -50],
        z: [0, 60],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 37.5],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-65, -54.5],
        B: [-22, -65],
        C: [22, -65],
        D: [65, -54.5],
        K: [-58.5, -15],
        E: [58.5, -15],
        J: [-65, 31],
        F: [66, 31],
        I: [-35, 73],
        G: [35, 73],
        H: [0, 89],
    },
    targe: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-43.75, 50],
        h: [0, 50],
        i: [43.75, 50],
        y: [-50, -50],
        z: [0, 50],
        j: [-40, -40],
        k: [0, -40],
        l: [40, -40],
        m: [-40, 40],
        n: [0, 40],
        o: [40, 40],
        p: [-32.5, 0],
        q: [32.5, 0],
        A: [-66.2, -60],
        B: [-22, -77],
        C: [22, -86],
        D: [60, -66.6],
        K: [-28, -20],
        E: [57, -20],
        J: [-61, 26],
        F: [61, 26],
        I: [-49, 63],
        G: [49, 59],
        H: [0, 80],
    },
    targe2: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-43.75, 50],
        h: [0, 50],
        i: [43.75, 50],
        y: [-50, -50],
        z: [0, 60],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 37.5],
        o: [37.5, 37.5],
        p: [-32.5, 0],
        q: [32.5, 0],
        A: [-55, -59],
        B: [-15, -59],
        C: [24, -79],
        D: [51, -58],
        K: [-40, -14],
        E: [51, -14],
        J: [-64, 26],
        F: [62, 26],
        I: [-46, 66],
        G: [48, 67],
        H: [0, 83],
    },
    pavise: {
        a: [-40, -52.5],
        b: [0, -52.5],
        c: [40, -52.5],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-40, 52.5],
        h: [0, 52.5],
        i: [40, 52.5],
        y: [-42.5, -52.5],
        z: [0, 60],
        j: [-30, -35],
        k: [0, -37.5],
        l: [30, -35],
        m: [-30, 35],
        n: [0, 37.5],
        o: [30, 35],
        p: [-30, 0],
        q: [30, 0],
        A: [-57, -55],
        B: [-22, -74],
        C: [22, -74],
        D: [57, -55],
        K: [-54, -11],
        E: [54, -11],
        J: [-50, 36],
        F: [50, 36],
        I: [-46, 81],
        G: [46, 81],
        H: [0, 81],
    },
    wedged: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.75, 0],
        e: [0, 0],
        f: [43.75, 0],
        g: [-32.25, 37.5],
        h: [0, 50],
        i: [32.25, 37.5],
        y: [-50, -50],
        z: [0, 62.5],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-32.5, 32.5],
        n: [0, 42.5],
        o: [32.5, 32.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66, -53],
        B: [-22, -72.5],
        C: [22, -72.5],
        D: [66, -53],
        K: [-62.6, -13],
        E: [62.6, -13],
        J: [-50, 26],
        F: [50, 26],
        I: [-27, 62],
        G: [27, 62],
        H: [0, 87],
    },
    flag: {
        a: [-60, -40],
        b: [0, -40],
        c: [60, -40],
        d: [-60, 0],
        e: [0, 0],
        f: [60, 0],
        g: [-60, 40],
        h: [0, 40],
        i: [60, 40],
        y: [-60, -42.5],
        z: [0, 40],
        j: [-45, -30],
        k: [0, -30],
        l: [45, -30],
        m: [-45, 30],
        n: [0, 30],
        o: [45, 30],
        p: [-45, 0],
        q: [45, 0],
        A: [-81, -51],
        B: [-27, -51],
        C: [27, -51],
        D: [81, -51],
        K: [-81, -17],
        E: [81, -17],
        J: [-81, 17],
        F: [81, 17],
        I: [-81, 51],
        G: [81, 51],
        H: [-27, 51],
        L: [27, 51],
    },
    pennon: {
        a: [-75, -40],
        d: [-75, 0],
        e: [-25, 0],
        f: [25, 0],
        g: [-75, 40],
        y: [-70, -42.5],
        j: [-60, -30],
        m: [-60, 30],
        p: [-60, 0],
        q: [5, 0],
        A: [-81, -48],
        B: [-43, -36],
        C: [-4.5, -24],
        D: [33, -12],
        E: [72, 0],
        F: [33, 12],
        G: [-4.5, 24],
        H: [-43, 36],
        I: [-81, 48],
        J: [-81, 17],
        K: [-81, -17],
    },
    guidon: {
        a: [-60, -40],
        b: [0, -40],
        c: [60, -40],
        d: [-60, 0],
        e: [0, 0],
        g: [-60, 40],
        h: [0, 40],
        i: [60, 40],
        y: [-60, -42.5],
        z: [0, 40],
        j: [-45, -30],
        k: [0, -30],
        l: [45, -30],
        m: [-45, 30],
        n: [0, 30],
        o: [45, 30],
        p: [-45, 0],
        A: [-81, -51],
        B: [-27, -51],
        C: [27, -51],
        D: [78, -51],
        K: [-81, -17],
        E: [40.5, -17],
        J: [-81, 17],
        F: [40.5, 17],
        I: [-81, 51],
        G: [78, 51],
        H: [-27, 51],
        L: [27, 51],
    },
    banner: {
        a: [-50, -50],
        b: [0, -50],
        c: [50, -50],
        d: [-50, 0],
        e: [0, 0],
        f: [50, 0],
        g: [-50, 40],
        h: [0, 40],
        i: [50, 40],
        y: [-50, -50],
        z: [0, 40],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 27.5],
        n: [0, 27.5],
        o: [37.5, 27.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.5, -66.5],
        B: [-22, -66.5],
        C: [22, -66.5],
        D: [66.5, -66.5],
        K: [-66.5, -20],
        E: [66.5, -20],
        J: [-66.5, 26],
        F: [66.5, 26],
        I: [-66.5, 66.5],
        G: [66.5, 66.5],
        H: [-25, 75],
        L: [25, 75],
    },
    dovetail: {
        a: [-49.75, -50],
        b: [0, -50],
        c: [49.75, -50],
        d: [-49.75, 0],
        e: [0, 0],
        f: [49.75, 0],
        g: [-49.75, 50],
        i: [49.75, 50],
        y: [-50, -50],
        z: [0, 40],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 32.5],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.5, -66.5],
        B: [-22, -66.5],
        C: [22, -66.5],
        D: [66.5, -66.5],
        K: [-66.5, -16.5],
        E: [66.5, -16.5],
        J: [-66.5, 34.5],
        F: [66.5, 34.5],
        I: [-66.5, 84.5],
        G: [66.5, 84.5],
        H: [-25, 64],
        L: [25, 64],
    },
    gonfalon: {
        a: [-49.75, -50],
        b: [0, -50],
        c: [49.75, -50],
        d: [-49.75, 0],
        e: [0, 0],
        f: [49.75, 0],
        g: [-49.75, 50],
        h: [0, 50],
        i: [49.75, 50],
        y: [-50, -50],
        z: [0, 50],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 37.5],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.5, -66.5],
        B: [-22, -66.5],
        C: [22, -66.5],
        D: [66.5, -66.5],
        K: [-66.5, -20],
        E: [66.5, -20],
        J: [-66.5, 26],
        F: [66.5, 26],
        I: [-40, 63],
        G: [40, 63],
        H: [0, 88],
    },
    pennant: {
        a: [-45, -50],
        b: [0, -50],
        c: [45, -50],
        e: [0, 0],
        h: [0, 50],
        y: [-50, -50],
        z: [0, 50],
        j: [-32.5, -37.5],
        k: [0, -37.5],
        l: [32.5, -37.5],
        n: [0, 37.5],
        A: [-60, -76],
        B: [-22, -76],
        C: [22, -76],
        D: [60, -76],
        K: [-46, -38],
        E: [46, -38],
        J: [-31, 0],
        F: [31, 0],
        I: [-16, 38],
        G: [16, 38],
        H: [0, 76],
    },
    round: {
        a: [-40, -40],
        b: [0, -40],
        c: [40, -40],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-40, 40],
        h: [0, 40],
        i: [40, 40],
        y: [-48, -48],
        z: [0, 57.5],
        j: [-35.5, -35.5],
        k: [0, -37.5],
        l: [35.5, -35.5],
        m: [-35.5, 35.5],
        n: [0, 37.5],
        o: [35.5, 35.5],
        p: [-36.5, 0],
        q: [36.5, 0],
        A: [-59, -48],
        B: [-23, -73],
        C: [23, -73],
        D: [59, -48],
        K: [-76, -10],
        E: [76, -10],
        J: [-70, 31],
        F: [70, 31],
        I: [-42, 64],
        G: [42, 64],
        H: [0, 77],
    },
    oval: {
        a: [-37.5, -50],
        b: [0, -50],
        c: [37.5, -50],
        d: [-43, 0],
        e: [0, 0],
        f: [43, 0],
        g: [-37.5, 50],
        h: [0, 50],
        i: [37.5, 50],
        y: [-48, -48],
        z: [0, 60],
        j: [-35.5, -37.5],
        k: [0, -37.5],
        l: [35.5, -37.5],
        m: [-35.5, 37.5],
        n: [0, 50],
        o: [35.5, 37.5],
        p: [-36.5, 0],
        q: [36.5, 0],
        A: [-48, -48],
        B: [-23, -78],
        C: [23, -78],
        D: [48, -48],
        K: [-59, -10],
        E: [59, -10],
        J: [-55, 31],
        F: [55, 31],
        I: [-36, 68],
        G: [36, 68],
        H: [0, 85],
    },
    vesicaPiscis: {
        a: [-32, -37],
        b: [0, -50],
        c: [32, -37],
        d: [-32, 0],
        e: [0, 0],
        f: [32, 0],
        g: [-32, 37],
        h: [0, 50],
        i: [32, 37],
        y: [-50, -50],
        z: [0, 62],
        j: [-27.5, -27.5],
        k: [0, -37],
        l: [27.5, -27.5],
        m: [-27.5, 27.5],
        n: [0, 42],
        o: [27.5, 27.5],
        p: [-27.5, 0],
        q: [27.5, 0],
        A: [-45, -32],
        B: [-29, -63],
        C: [29, -63],
        D: [45, -32],
        K: [-50, 0],
        E: [50, 0],
        J: [-45, 32],
        F: [45, 32],
        I: [-29, 63],
        G: [29, 63],
        H: [0, 89],
        L: [0, -89],
    },
    square: {
        a: [-49.75, -50],
        b: [0, -50],
        c: [49.75, -50],
        d: [-49.75, 0],
        e: [0, 0],
        f: [49.75, 0],
        g: [-49.75, 50],
        h: [0, 50],
        i: [49.75, 50],
        y: [-50, -50],
        z: [0, 50],
        j: [-37.5, -37.5],
        k: [0, -37.5],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 37.5],
        o: [37.5, 37.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-66.5, -66.5],
        B: [-22, -66.5],
        C: [22, -66.5],
        D: [66.5, -66.5],
        K: [-66.5, -20],
        E: [66.5, -20],
        J: [-66.5, 26],
        F: [66.5, 26],
        I: [-66.5, 66.5],
        G: [66.5, 66.5],
        H: [-22, 66.5],
        L: [22, 66.5],
    },
    diamond: {
        a: [-32, -37],
        b: [0, -50],
        c: [32, -37],
        d: [-43, 0],
        e: [0, 0],
        f: [43, 0],
        g: [-32, 37],
        h: [0, 50],
        i: [32, 37],
        y: [-50, -50],
        z: [0, 62],
        j: [-27.5, -27.5],
        k: [0, -37],
        l: [27.5, -27.5],
        m: [-27.5, 27.5],
        n: [0, 42],
        o: [27.5, 27.5],
        p: [-37, 0],
        q: [37, 0],
        A: [-43, -28],
        B: [-22, -56],
        C: [22, -56],
        D: [43, -28],
        K: [-63, 0],
        E: [63, 0],
        J: [-42, 28],
        F: [42, 28],
        I: [-22, 56],
        G: [22, 56],
        H: [0, 83],
        L: [0, -82],
    },
    no: {
        a: [-66.5, -66.5],
        b: [0, -66.5],
        c: [66.5, -66.5],
        d: [-66.5, 0],
        e: [0, 0],
        f: [66.5, 0],
        g: [-66.5, 66.5],
        h: [0, 66.5],
        i: [66.5, 66.5],
        y: [-50, -50],
        z: [0, 75],
        j: [-50, -50],
        k: [0, -50],
        l: [50, -50],
        m: [-50, 50],
        n: [0, 50],
        o: [50, 50],
        p: [-50, 0],
        q: [50, 0],
        A: [-91.5, -91.5],
        B: [-30.5, -91.5],
        C: [30.5, -91.5],
        D: [91.5, -91.5],
        K: [-91.5, -30.5],
        E: [91.5, -30.5],
        J: [-91.5, 30.5],
        F: [91.5, 30.5],
        I: [-91.5, 91.5],
        G: [91.5, 91.5],
        H: [-30.5, 91.5],
        L: [30.5, 91.5],
    },
    fantasy1: {
        a: [-45, -45],
        b: [0, -50],
        c: [45, -45],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-36, 42.5],
        h: [0, 50],
        i: [36, 42.5],
        y: [-50, -50],
        z: [0, 60],
        j: [-37, -37],
        k: [0, -40],
        l: [37, -37],
        m: [-32, 32],
        n: [0, 40],
        o: [32, 32],
        p: [-28.5, 0],
        q: [28.5, 0],
        A: [-66, -55],
        B: [-22, -67],
        C: [22, -67],
        D: [66, -55],
        K: [-53, -20],
        E: [53, -20],
        J: [-46, 26],
        F: [46, 26],
        I: [-29, 62],
        G: [29, 62],
        H: [0, 84],
    },
    fantasy2: {
        a: [-45, -45],
        b: [0, -45],
        c: [45, -45],
        d: [-35, 0],
        e: [0, 0],
        f: [35, 0],
        g: [-36, 42.5],
        h: [0, 45],
        i: [36, 42.5],
        y: [-50, -50],
        z: [0, 55],
        j: [-32.5, -32.5],
        k: [0, -40],
        l: [32.5, -32.5],
        m: [-30, 30],
        n: [0, 40],
        o: [30, 30],
        p: [-27.5, 0],
        q: [27.5, 0],
        A: [-58, -35],
        B: [-44, -67],
        C: [44, -67],
        D: [58, -35],
        K: [-39, -5],
        E: [39, -5],
        J: [-57, 26],
        F: [57, 26],
        I: [-32, 58],
        G: [32, 58],
        H: [0, 83],
        L: [0, -72],
    },
    fantasy3: {
        a: [-40, -45],
        b: [0, -50],
        c: [40, -45],
        d: [-35, 0],
        e: [0, 0],
        f: [35, 0],
        g: [-36, 42.5],
        h: [0, 50],
        i: [36, 42.5],
        y: [-50, -50],
        z: [0, 55],
        j: [-32.5, -32.5],
        k: [0, -40],
        l: [32.5, -32.5],
        m: [-30, 30],
        n: [0, 40],
        o: [30, 30],
        p: [-27.5, 0],
        q: [27.5, 0],
        A: [-56, -42],
        B: [-22, -72],
        C: [22, -72],
        D: [56, -42],
        K: [-37, -11],
        E: [37, -11],
        J: [-60, 20],
        F: [60, 20],
        I: [-34, 56],
        G: [34, 56],
        H: [0, 83],
    },
    fantasy4: {
        a: [-50, -45],
        b: [0, -50],
        c: [50, -45],
        d: [-45, 0],
        e: [0, 0],
        f: [45, 0],
        g: [-40, 45],
        h: [0, 50],
        i: [40, 45],
        y: [-50, -50],
        z: [0, 62.5],
        j: [-37.5, -37.5],
        k: [0, -45],
        l: [37.5, -37.5],
        m: [-37.5, 37.5],
        n: [0, 45],
        o: [37.5, 37.5],
        p: [-35, 0],
        q: [35, 0],
        A: [-75, -56],
        B: [-36, -61],
        C: [36, -61],
        D: [75, -56],
        K: [-67, -12],
        E: [67, -12],
        J: [-63, 32],
        F: [63, 32],
        I: [-42, 75],
        G: [42, 75],
        H: [0, 91.5],
        L: [0, -79],
    },
    fantasy5: {
        a: [-45, -50],
        b: [0, -50],
        c: [45, -50],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-30, 45],
        h: [0, 50],
        i: [30, 45],
        y: [-50, -50],
        z: [0, 60],
        j: [-37, -37],
        k: [0, -40],
        l: [37, -37],
        m: [-32, 32],
        n: [0, 40],
        o: [32, 32],
        p: [-28.5, 0],
        q: [28.5, 0],
        A: [-61, -67],
        B: [-22, -76],
        C: [22, -76],
        D: [61, -67],
        K: [-58, -25],
        E: [58, -25],
        J: [-48, 20],
        F: [48, 20],
        I: [-28.5, 60],
        G: [28.5, 60],
        H: [0, 89],
    },
    noldor: {
        b: [0, -65],
        e: [0, -15],
        h: [0, 35],
        z: [0, 35],
        k: [0, -50],
        n: [0, 30],
        p: [-20, -15],
        q: [20, -15],
        A: [-34, -47],
        B: [-20, -68],
        C: [20, -68],
        D: [34, -47],
        K: [-18, -20],
        E: [18, -20],
        J: [-26, 11],
        F: [26, 11],
        I: [-14, 43],
        G: [14, 43],
        H: [0, 74],
        L: [0, -85],
    },
    gondor: {
        a: [-32.5, -50],
        b: [0, -50],
        c: [32.5, -50],
        d: [-32.5, 0],
        e: [0, 0],
        f: [32.5, 0],
        g: [-32.5, 50],
        h: [0, 50],
        i: [32.5, 50],
        y: [-42.5, -52.5],
        z: [0, 65],
        j: [-25, -37.5],
        k: [0, -37.5],
        l: [25, -37.5],
        m: [-25, 30],
        n: [0, 37.5],
        o: [25, 30],
        p: [-25, 0],
        q: [25, 0],
        A: [-42, -52],
        B: [-17, -75],
        C: [17, -75],
        D: [42, -52],
        K: [-42, -15],
        E: [42, -15],
        J: [-42, 22],
        F: [42, 22],
        I: [-26, 60],
        G: [26, 60],
        H: [0, 87],
    },
    easterling: {
        a: [-40, -47.5],
        b: [0, -47.5],
        c: [40, -47.5],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-40, 47.5],
        h: [0, 47.5],
        i: [40, 47.5],
        y: [-42.5, -52.5],
        z: [0, 65],
        j: [-30, -37.5],
        k: [0, -37.5],
        l: [30, -37.5],
        m: [-30, 37.5],
        n: [0, 37.5],
        o: [30, 37.5],
        p: [-30, 0],
        q: [30, 0],
        A: [-52, -72],
        B: [0, -65],
        D: [52, -72],
        K: [-52, -24],
        E: [52, -24],
        J: [-52, 24],
        F: [52, 24],
        I: [-52, 72],
        G: [52, 72],
        H: [0, 65],
    },
    erebor: {
        a: [-40, -40],
        b: [0, -55],
        c: [40, -40],
        d: [-40, 0],
        e: [0, 0],
        f: [40, 0],
        g: [-40, 40],
        h: [0, 55],
        i: [40, 40],
        y: [-50, -50],
        z: [0, 50],
        j: [-35, -35],
        k: [0, -45],
        l: [35, -35],
        m: [-35, 35],
        n: [0, 45],
        o: [35, 35],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-47, -46],
        B: [-22, -81],
        C: [22, -81],
        D: [47, -46],
        K: [-66.5, 0],
        E: [66.5, 0],
        J: [-47, 46],
        F: [47, 46],
        I: [-22, 81],
        G: [22, 81],
    },
    ironHills: {
        a: [-43.75, -50],
        b: [0, -50],
        c: [43.75, -50],
        d: [-43.25, 0],
        e: [0, 0],
        f: [43.25, 0],
        g: [-42.5, 42.5],
        h: [0, 50],
        i: [42.5, 42.5],
        y: [-50, -50],
        z: [0, 62.5],
        j: [-32.5, -32.5],
        k: [0, -40],
        l: [32.5, -32.5],
        m: [-32.5, 32.5],
        n: [0, 40],
        o: [32.5, 32.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-61, -67],
        B: [-22, -74],
        C: [22, -74],
        D: [61, -67],
        K: [-59, -20],
        E: [59, -20],
        J: [-57, 26],
        F: [57, 26],
        I: [-33, 64],
        G: [33, 64],
        H: [0, 88],
    },
    urukHai: {
        a: [-40, -45],
        b: [0, -45],
        c: [40, -45],
        d: [-36, 0],
        e: [0, 0],
        f: [36, 0],
        g: [-32.25, 40],
        h: [0, 40],
        i: [32.25, 40],
        y: [-50, -50],
        z: [0, 40],
        j: [-32.5, -32.5],
        k: [0, -37.5],
        l: [32.5, -32.5],
        m: [-27.5, 27.5],
        n: [0, 32.5],
        o: [27.5, 27.5],
        p: [-37.5, 0],
        q: [37.5, 0],
        A: [-31, -79],
        B: [-1, -90],
        C: [31, -74],
        D: [61, -57],
        K: [-55, -19],
        E: [53, -19],
        J: [-45, 19],
        F: [45, 19],
        I: [-33, 57],
        G: [35, 57],
        H: [0, 57],
        L: [-39, -50],
    },
    moriaOrc: {
        a: [-37.5, -37.5],
        b: [0, -37.5],
        c: [37.5, -37.5],
        d: [-37.5, 0],
        e: [0, 0],
        f: [37.5, 0],
        g: [-37.5, 37.5],
        h: [0, 37.5],
        i: [37.5, 37.5],
        y: [-50, -50],
        z: [0, 40],
        j: [-30, -30],
        k: [0, -30],
        l: [30, -30],
        m: [-30, 30],
        n: [0, 30],
        o: [30, 30],
        p: [-30, 0],
        q: [30, 0],
        A: [-48, -48],
        B: [-16, -50],
        C: [16, -46],
        D: [39, -61],
        K: [-52, -19],
        E: [52, -26],
        J: [-42, 9],
        F: [52, 9],
        I: [-31, 40],
        G: [40, 43],
        H: [4, 47],
    },
};
const shieldSize = {
    horsehead: 0.9,
    horsehead2: 0.9,
    polish: 0.85,
    swiss: 0.95,
    boeotian: 0.75,
    roman: 0.95,
    kite: 0.65,
    targe2: 0.9,
    pavise: 0.9,
    wedged: 0.95,
    flag: 0.7,
    pennon: 0.5,
    guidon: 0.65,
    banner: 0.8,
    dovetail: 0.8,
    pennant: 0.6,
    oval: 0.95,
    vesicaPiscis: 0.8,
    diamond: 0.8,
    no: 1.2,
    fantasy1: 0.8,
    fantasy2: 0.7,
    fantasy3: 0.7,
    fantasy5: 0.9,
    noldor: 0.5,
    gondor: 0.75,
    easterling: 0.8,
    erebor: 0.9,
    urukHai: 0.8,
    moriaOrc: 0.7,
};
const shieldBox = {
    heater: "0 10 200 200",
    spanish: "0 10 200 200",
    french: "0 10 200 200",
    horsehead: "0 10 200 200",
    horsehead2: "0 10 200 200",
    polish: "0 0 200 200",
    hessen: "0 5 200 200",
    swiss: "0 10 200 200",
    boeotian: "0 0 200 200",
    roman: "0 0 200 200",
    kite: "0 0 200 200",
    oldFrench: "0 10 200 200",
    renaissance: "0 5 200 200",
    baroque: "0 10 200 200",
    targe: "0 0 200 200",
    targe2: "0 0 200 200",
    pavise: "0 0 200 200",
    wedged: "0 10 200 200",
    flag: "0 0 200 200",
    pennon: "2.5 0 200 200",
    guidon: "2.5 0 200 200",
    banner: "0 10 200 200",
    dovetail: "0 10 200 200",
    gonfalon: "0 10 200 200",
    pennant: "0 0 200 200",
    round: "0 0 200 200",
    oval: "0 0 200 200",
    vesicaPiscis: "0 0 200 200",
    square: "0 0 200 200",
    diamond: "0 0 200 200",
    no: "0 0 200 200",
    fantasy1: "0 0 200 200",
    fantasy2: "0 5 200 200",
    fantasy3: "0 5 200 200",
    fantasy4: "0 5 200 200",
    fantasy5: "0 0 200 200",
    noldor: "0 0 200 200",
    gondor: "0 5 200 200",
    easterling: "0 0 200 200",
    erebor: "0 0 200 200",
    ironHills: "0 5 200 200",
    urukHai: "0 0 200 200",
    moriaOrc: "0 0 200 200",
};
const shieldPaths = {
    heater: "m25,25 h150 v50 a150,150,0,0,1,-75,125 a150,150,0,0,1,-75,-125 z",
    spanish: "m25,25 h150 v100 a75,75,0,0,1,-150,0 z",
    french: "m 25,25 h 150 v 139.15 c 0,41.745 -66,18.15 -75,36.3 -9,-18.15 -75,5.445 -75,-36.3 v 0 z",
    horsehead: "m 20,40 c 0,60 40,80 40,100 0,10 -4,15 -0.35,30 C 65,185.7 81,200 100,200 c 19.1,0 35.3,-14.6 40.5,-30.4 C 144.2,155 140,150 140,140 140,120 180,100 180,40 142.72,40 150,15 100,15 55,15 55,40 20,40 Z",
    horsehead2: "M60 20c-5 20-10 35-35 55 25 35 35 65 30 100 20 0 35 10 45 26 10-16 30-26 45-26-5-35 5-65 30-100a87 87 0 01-35-55c-25 3-55 3-80 0z",
    polish: "m 90.3,6.3 c -12.7,0 -20.7,10.9 -40.5,14 0,11.8 -4.9,23.5 -11.4,31.1 0,0 12.7,6 12.7,19.3 C 51.1,90.8 30,90.8 30,90.8 c 0,0 -3.6,7.4 -3.6,22.4 0,34.3 23.1,60.2 40.7,68.2 17.6,8 27.7,11.4 32.9,18.6 5.2,-7.3 15.3,-10.7 32.8,-18.6 17.6,-8 40.7,-33.9 40.7,-68.2 0,-15 -3.6,-22.4 -3.6,-22.4 0,0 -21.1,0 -21.1,-20.1 0,-13.3 12.7,-19.3 12.7,-19.3 C 155.1,43.7 150.2,32.1 150.2,20.3 130.4,17.2 122.5,6.3 109.7,6.3 102.5,6.3 100,10 100,10 c 0,0 -2.5,-3.7 -9.7,-3.7 z",
    hessen: "M170 20c4 5 8 13 15 20 0 0-10 0-10 15 0 100-15 140-75 145-65-5-75-45-75-145 0-15-10-15-10-15l15-20c0 15 10-5 70-5s70 20 70 5z",
    swiss: "m 25,20 c -0.1,0 25.2,8.5 37.6,8.5 C 75.1,28.5 99.1,20 100,20 c 0.6,0 24.9,8.5 37.3,8.5 C 149.8,28.5 174.4,20 175,20 l -0.3,22.6 C 173.2,160.3 100,200 100,200 100,200 26.5,160.9 25.2,42.6 Z",
    boeotian: "M150 115c-5 0-10-5-10-15s5-15 10-15c10 0 7 10 15 10 10 0 0-30 0-30-10-25-30-55-65-55S45 40 35 65c0 0-10 30 0 30 8 0 5-10 15-10 5 0 10 5 10 15s-5 15-10 15c-10 0-7-10-15-10-10 0 0 30 0 30 10 25 30 55 65 55s55-30 65-55c0 0 10-30 0-30-8 0-5 10-15 10z",
    roman: "m 160,170 c -40,20 -80,20 -120,0 V 30 C 80,10 120,10 160,30 Z",
    kite: "m 53.3,46.4 c 0,4.1 1,12.3 1,12.3 7.1,55.7 45.7,141.3 45.7,141.3 0,0 38.6,-85.6 45.7,-141.2 0,0 1,-8.1 1,-12.3 C 146.7,20.9 125.8,0.1 100,0.1 74.2,0.1 53.3,20.9 53.3,46.4 Z",
    oldFrench: "m25,25 h150 v75 a100,100,0,0,1,-75,100 a100,100,0,0,1,-75,-100 z",
    renaissance: "M 25,33.9 C 33.4,50.3 36.2,72.9 36.2,81.7 36.2,109.9 25,122.6 25,141 c 0,29.4 24.9,44.1 40.2,47.7 15.3,3.7 29.3,0 34.8,11.3 5.5,-11.3 19.6,-7.6 34.8,-11.3 C 150.1,185 175,170.3 175,141 c 0,-18.4 -11.2,-31.1 -11.2,-59.3 0,-8.8 2.8,-31.3 11.2,-47.7 L 155.7,14.4 C 138.2,21.8 119.3,25.7 100,25.7 c -19.3,0 -38.2,-3.9 -55.7,-11.3 z",
    baroque: "m 100,25 c 18,0 50,2 75,14 v 37 l -2.7,3.2 c -4.9,5.4 -6.6,9.6 -6.7,16.2 0,6.5 2,11.6 6.9,17.2 l 2.8,3.1 v 10.2 c 0,17.7 -2.2,27.7 -7.8,35.9 -5,7.3 -11.7,11.3 -32.3,19.4 -12.6,5 -20.2,8.8 -28.6,14.5 C 103.3,198 100,200 100,200 c 0,0 -2.8,-2.3 -6.4,-4.7 C 85.6,189.8 78,186 65,180.9 32.4,168.1 26.9,160.9 25.8,129.3 L 25,116 l 3.3,-3.3 c 4.8,-5.2 7,-10.7 7,-17.3 0,-6.8 -1.8,-11.1 -6.5,-16.1 L 25,76 V 39 C 50,27 82,25 100,25 Z",
    targe: "m 20,35 c 15,0 115,-60 155,-10 -5,10 -15,15 -10,50 5,45 10,70 -10,90 C 125,195 75,195 50,175 25,150 30,130 35,85 50,95 65,85 65,70 65,50 50,45 40,50 30,55 27,65 30,70 23,73 20,70 14,70 11,60 20,45 20,35 Z",
    targe2: "m 84,32.2 c 6.2,-1 19.5,-31.4 94.1,-20.2 -30.57,33.64 -21.66,67.37 -11.2,95 20.2,69.5 -41.17549,84.7 -66.88,84.7 C 74.32,191.7071 8.38,168.95 32,105.9 36.88,92.88 31,89 31,82.6 35.15,82.262199 56.79,86.17 56.5,69.8 56.20,52.74 42.2,47.9 25.9,55.2 25.9,51.4 39.8,6.7 84,32.2 Z",
    pavise: "M95 7L39.9 37.3a10 10 0 00-5.1 9.5L46 180c.4 5.2 3.7 10 9 10h90c5.3 0 9.6-4.8 10-10l10.6-133.2a10 10 0 00-5-9.5L105 7c-4.2-2.3-6.2-2.3-10 0z",
    wedged: "m 51.2,19 h 96.4 c 3.1,12.7 10.7,20.9 26.5,20.8 C 175.7,94.5 165.3,144.3 100,200 43.5,154.2 22.8,102.8 25.1,39.7 37,38.9 47.1,34.7 51.2,19 Z",
    round: "m 185,100 a 85,85 0 0 1 -85,85 85,85 0 0 1 -85,-85 85,85 0 0 1 85,-85 85,85 0 0 1 85,85",
    oval: "m 32.3,99.5 a 67.7,93.7 0 1 1 0,1.3 z",
    vesicaPiscis: "M 100,0 C 63.9,20.4 41,58.5 41,100 c 0,41.5 22.9,79.6 59,100 36.1,-20.4 59,-58.5 59,-100 C 159,58.5 136.1,20.4 100,0 Z",
    square: "M 25,25 H 175 V 175 H 25 Z",
    diamond: "M 25,100 100,200 175,100 100,0 Z",
    no: "m0,0 h200 v200 h-200 z",
    flag: "M 10,40 h180 v120 h-180 Z",
    pennon: "M 10,40 l190,60 -190,60 Z",
    guidon: "M 10,40 h190 l-65,60 65,60 h-190 Z",
    banner: "m 25,25 v 170 l 25,-40 25,40 25,-40 25,40 25,-40 25,40 V 25 Z",
    dovetail: "m 25,25 v 175 l 75,-40 75,40 V 25 Z",
    gonfalon: "m 25,25 v 125 l 75,50 75,-50 V 25 Z",
    pennant: "M 25,15 100,200 175,15 Z",
    fantasy1: "M 100,5 C 85,30 40,35 15,40 c 40,35 20,90 40,115 15,25 40,30 45,45 5,-15 30,-20 45,-45 20,-25 0,-80 40,-115 C 160,35 115,30 100,5 Z",
    fantasy2: "m 152,21 c 0,0 -27,14 -52,-4 C 75,35 48,21 48,21 50,45 30,55 30,75 60,75 60,115 32,120 c 3,40 53,50 68,80 15,-30 65,-40 68,-80 -28,-5 -28,-45 2,-45 C 170,55 150,45 152,21 Z",
    fantasy3: "M 167,67 C 165,0 35,0 33,67 c 32,-7 27,53 -3,43 -5,45 60,65 70,90 10,-25 75,-47.51058 70,-90 -30,10 -35,-50 -3,-43 z",
    fantasy4: "M100 9C55 48 27 27 13 39c23 50 3 119 49 150 14 9 28 11 38 11s27-4 38-11c55-39 24-108 49-150-14-12-45 7-87-30z",
    fantasy5: "M 100,0 C 75,25 30,25 30,25 c 0,69 20,145 70,175 50,-30 71,-106 70,-175 0,0 -45,0 -70,-25 z",
    noldor: "m 55,75 h 2 c 3,-25 38,-10 3,20 15,50 30,75 40,105 10,-30 25,-55 40,-105 -35,-30 0,-45 3,-20 h 2 C 150,30 110,20 100,0 90,20 50,30 55,75 Z",
    gondor: "m 100,200 c 15,-15 38,-35 45,-60 h 5 V 30 h -5 C 133,10 67,10 55,30 h -5 v 110 h 5 c 7,25 30,45 45,60 z",
    easterling: "M 160,185 C 120,170 80,170 40,185 V 15 c 40,15 80,15 120,0 z",
    erebor: "M25 135 V60 l22-13 16-37 h75 l15 37 22 13 v75l-22 18-16 37 H63l-16-37z",
    ironHills: "m 30,25 60,-10 10,10 10,-10 60,10 -5,125 -65,50 -65,-50 z",
    urukHai: "M 30,60 C 40,60 60,50 60,20 l -5,-3 45,-17 75,40 -5,5 -35,155 -5,-35 H 70 v 35 z",
    moriaOrc: "M45 35c5 3 7 10 13 9h19c4-2 7-4 9-9 6 1 9 9 16 11 7-2 14 0 21 0 6-3 6-10 10-15 2-5 1-10-2-15-2-4-5-14-4-16 3 6 7 11 12 14 7 3 3 12 7 16 3 6 4 12 9 18 2 4 6 8 5 14 0 6-1 12 3 18-3 6-2 13-1 20 1 6-2 12-1 18 0 6-3 13 0 18 8 4 0 8-5 7-4 3-9 3-13 9-5 5-5 13-8 19 0 6 0 15-7 16-1 6-7 6-10 12-1-6 0-6-2-9l2-19c2-4 5-12-3-12-4-5-11-5-15 1l-13-18c-3-4-2 9-3 12 2 2-4-6-7-5-8-2-8 7-11 11-2 4-5 10-8 9 3-10 3-16 1-23-1-4 2-9-4-11 0-6 1-13-2-19-4-2-9-6-13-7V91c4-7-5-13 0-19-3-7 2-11 2-18-1-6 1-12 3-17v-1z",
};
const shieldLines = {
    straight: "m 0,100 v15 h 200 v -15 z",
    engrailed: "m 0,95 a 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 v 20 H 0 Z",
    invecked: "M0,102.5 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 v12.5 H0 z",
    embattled: "M 0,105 H 2.5 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 2.5 v 10 H 0 Z",
    wavy: "m 200,115 v -15 c -8.9,3.5 -16,3.1 -25,0 -8.9,-3.5 -16,-3.1 -25,0 -8.9,3.5 -16,3.2 -25,0 -8.9,-3.5 -16,-3.2 -25,0 -8.9,3.5 -16,3.1 -25,0 -8.9,-3.5 -16,-3.1 -25,0 -8.9,3.5 -16,3.2 -25,0 -8.9,-3.5 -16,-3.2 -25,0 v 15 z",
    raguly: "m 200,95 h -3 l -5,10 h -10 l 5,-10 h -10 l -5,10 h -10 l 5,-10 h -10 l -5,10 h -10 l 5,-10 h -10 l -5,10 h -10 l 5,-10 h -10 l -5,10 h -10 l 5,-10 H 97 l -5,10 H 82 L 87,95 H 77 l -5,10 H 62 L 67,95 H 57 l -5,10 H 42 L 47,95 H 37 l -5,10 H 22 L 27,95 H 17 l -5,10 H 2 L 7,95 H 0 v 20 h 200 z",
    dancetty: "m 0,105 10,-15 15,20 15,-20 15,20 15,-20 15,20 15,-20 15,20 15,-20 15,20 15,-20 15,20 15,-20 10,15 v 10 H 0 Z",
    dentilly: "M 180,105 170,95 v 10 L 160,95 v 10 L 150,95 v 10 L 140,95 v 10 L 130,95 v 10 L 120,95 v 10 L 110,95 v 10 L 100,95 v 10 L 90,95 v 10 L 80,95 v 10 L 70,95 v 10 L 60,95 v 10 L 50,95 v 10 L 40,95 v 10 L 30,95 v 10 L 20,95 v 10 L 10,95 v 10 L 0,95 v 20 H 200 V 105 L 190,95 v 10 L 180,95 Z",
    angled: "m 0,95 h 100 v 10 h 100 v 10 H 0 Z",
    urdy: "m 200,90 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,6 -5,-6 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,6 -5,-6 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 L 0,90 v 25 h 200",
    indented: "m 100,95 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 v 20 H 0 V 95 l 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 z",
    bevilled: "m 0,92.5 h 110 l -20,15 H 200 V 115 H 0 Z",
    nowy: "m 0,95 h 80 c 0,0 0.1,20.1 20,20 19.9,-0.1 20,-20 20,-20 h 80 v 20 H 0 Z",
    nowyReversed: "m 200,105 h -80 c 0,0 -0.1,-20.1 -20,-20 -19.9,0.1 -20,20 -20,20 H 0 v 10 h 200 z",
    potenty: "m 3,95 v 5 h 5 v 5 H 0 v 10 h 200 l 0.5,-10 H 193 v -5 h 5 v -5 h -15 v 5 h 5 v 5 h -15 v -5 h 5 v -5 h -15 v 5 h 5 v 5 h -15 v -5 h 5 v -5 h -15 v 5 h 5 v 5 h -15 v -5 h 5 v -5 h -15 v 5 h 5 v 5 h -15 v -5 h 5 v -5 h -15 v 5 h 5 v 5 H 100.5 93 v -5 h 5 V 95 H 83 v 5 h 5 v 5 H 73 v -5 h 5 V 95 H 63 v 5 h 5 v 5 H 53 v -5 h 5 V 95 H 43 v 5 h 5 v 5 H 33 v -5 h 5 V 95 H 23 v 5 h 5 v 5 H 13 v -5 h 5 v -5 z",
    potentyDexter: "m 200,105 h -2 v -10 0 0 h -10 v 5 h 5 v 5 H 183 V 95 h -10 v 5 h 5 v 5 H 168 V 95 h -10 v 5 h 5 v 5 H 153 V 95 h -10 v 5 h 5 v 5 H 138 V 95 h -10 v 5 h 5 v 5 H 123 V 95 h -10 v 5 h 5 v 5 h -10 v 0 0 -10 H 98 v 5 h 5 v 5 H 93 V 95 H 83 v 5 h 5 v 5 H 78 V 95 H 68 v 5 h 5 v 5 H 63 V 95 H 53 v 5 h 5 v 5 H 48 V 95 H 38 v 5 h 5 v 5 H 33 V 95 H 23 v 5 h 5 v 5 H 18 V 95 H 8 v 5 h 5 v 5 H 3 V 95 H 0 v 20 h 200 z",
    potentySinister: "m 2.5,95 v 10 H 0 v 10 h 202.5 v -15 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 z",
    embattledGhibellin: "M 200,200 V 100 l -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 v 15 h 200",
    embattledNotched: "m 200,105 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 H 90 V 95 l -5,5 -5,-5 v 10 H 75 V 95 l -5,5 -5,-5 v 10 H 60 V 95 l -5,5 -5,-5 v 10 H 45 V 95 l -5,5 -5,-5 v 10 H 30 V 95 l -5,5 -5,-5 v 10 H 15 V 95 l -5,5 -5,-5 v 10 H 0 v 10 h 200",
    embattledGrady: "m 0,95 v 20 H 200 V 95 h -2.5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 z",
    dovetailed: "m 200,95 h -7 l 4,10 h -14 l 4,-10 h -14 l 4,10 h -14 l 4,-10 h -14 l 4,10 h -14 l 4,-10 h -14 l 4,10 h -14 l 4,-10 h -14 l 4,10 h -14 l 4,-10 H 93 l 4,10 H 83 L 87,95 H 73 l 4,10 H 63 L 67,95 H 53 l 4,10 H 43 L 47,95 H 33 l 4,10 H 23 L 27,95 H 13 l 4,10 H 3 L 7,95 H 0 v 20 h 200",
    dovetailedIndented: "m 200,100 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 v 15 h 200",
    nebuly: "m 13.1,89.8 c -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.2,4.5 -7.3,4.5 -0.5,0 -2.2,-0.2 -2.2,-0.2 V 115 h 200 v -10.1 c -3.7,-0.2 -6.7,-2.2 -6.7,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.8,-1.9 1.8,-3.1 0,-2.5 -3.2,-4.5 -7.2,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.8,-1.9 1.8,-3.1 0,-2.5 -3.2,-4.5 -7.2,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 -1.5,4.1 -4.2,4.4 -8.8,4.5 -4.7,-0.1 -8.7,-1.5 -8.9,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 z",
    rayonne: "M0 115l-.1-6 .2.8c1.3-1 2.3-2.5 2.9-4.4.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4A9 9 0 015.5 90c-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 2.1 3.1 3.1 4.6 1 1.6 2.4 3.1 2.7 4.8.3 1.7.3 3.3 0 5.2 1.3-1 2.6-2.7 3.2-4.6.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.75 2.79 2.72 4.08 4.45 5.82L200 115z",
    seaWaves: "m 28.83,94.9 c -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.44,-3.6 3.6,-3.6 0.7,0 1.36,0.17 1.93,0.48 -0.33,-2.03 -2.19,-3.56 -4.45,-3.56 -4.24,0 -6.91,3.13 -8.5,5.13 V 115 h 200 v -14.89 c -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.2,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.21,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.21,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.2,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.44,-3.6 3.6,-3.6 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.21,-3.55 -4.46,-3.55 -4.25,0 -6.6,3.09 -8.19,5.09 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.21,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.2,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.2,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.21,-3.55 -4.46,-3.55 z",
    dragonTeeth: "M 9.4,85 C 6.5,88.1 4.1,92.9 3,98.8 1.9,104.6 2.3,110.4 3.8,115 2.4,113.5 0,106.6 0,109.3 v 5.7 h 200 v -5.7 c -1.1,-2.4 -2,-5.1 -2.6,-8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -1.4,-1.5 -2.8,-3.9 -3.8,-6.1 -1.1,-2.4 -2.3,-6.1 -2.6,-7.7 -0.2,-5.9 0.2,-11.7 1.7,-16.3 -3,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.8 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1,-5.8 -0.7,-11.6 0.9,-16.2 -3,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.8 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.8 -0.7,-11.6 0.9,-16.2 -3,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.8 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 C 63,95.4 63.4,89.6 64.9,85 c -2.9,3.1 -5.3,7.9 -6.3,13.8 -1.1,5.8 -0.7,11.6 0.8,16.2 -3,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.8 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1,5.8 -0.6,11.6 0.9,16.2 -3,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.8 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1,5.8 -0.7,11.6 0.9,16.2 -3,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.8 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.8 -0.7,11.6 0.9,16.2 -3,-3.1 -5.3,-7.9 -6.4,-13.8 C 18.6,95.4 19,89.6 20.5,85 17.6,88.1 15.2,92.9 14.1,98.8 13,104.6 13.4,110.4 14.9,115 12,111.9 9.6,107.1 8.6,101.2 7.5,95.4 7.9,89.6 9.4,85 Z",
    firTrees: "m 3.9,90 -4,7 2,-0.5 L 0,100 v 15 h 200 v -15 l -1.9,-3.5 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4.1,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4.1,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 z",
    flechy: "m 0,100 h 85 l 15,-15 15,15 h 85 v 15 H 0 Z",
    barby: "m 0,100 h 85 l 15,15 15,-15 h 85 v 15 H 0 Z",
    enclavy: "M 0,100 H 85 V 85 h 30 v 15 h 85 v 15 H 0 Z",
    escartely: "m 0,100 h 85 v 15 h 30 v -15 h 85 v 15 H 0 Z",
    arched: "m 100,95 c 40,-0.2 100,20 100,20 H 0 c 0,0 60,-19.8 100,-20 z",
    archedReversed: "m 0,85 c 0,0 60,20.2 100,20 40,-0.2 100,-20 100,-20 v 30 H 0 Z",
};
const templates = {
    // straight divisions
    perFess: `<rect x="0" y="100" width="200" height="100"/>`,
    perPale: `<rect x="100" y="0" width="100" height="200"/>`,
    perBend: `<polygon points="0,0 200,200 0,200"/>`,
    perBendSinister: `<polygon points="200,0 0,200 200,200"/>`,
    perChevron: `<polygon points="0,200 100,100 200,200"/>`,
    perChevronReversed: `<polygon points="0,0 100,100 200,0"/>`,
    perCross: `<rect x="100" y="0" width="100" height="100"/><rect x="0" y="100" width="100" height="100"/>`,
    perPile: `<polygon points="0,0 15,0 100,200 185,0 200,0 200,200 0,200"/>`,
    perSaltire: `<polygon points="0,0 0,200 200,0 200,200"/>`,
    gyronny: `<polygon points="0,0 200,200 200,100 0,100"/><polygon points="200,0 0,200 100,200 100,0"/>`,
    chevronny: `<path d="M0,80 100,-15 200,80 200,120 100,25 0,120z M0,160 100,65 200,160 200,200 100,105 0,200z M0,240 100,145 200,240 0,240z"/>`,
    // lined divisions
    perFessLined: (line) => `<path d="${line}"/><rect x="0" y="115" width="200" height="85" shape-rendering="crispedges"/>`,
    perPaleLined: (line) => `<path d="${line}" transform="rotate(-90 100 100)"/><rect x="115" y="0" width="85" height="200" shape-rendering="crispedges"/>`,
    perBendLined: (line) => `<path d="${line}" transform="translate(-10 -10) rotate(45 110 110) scale(1.1)"/><rect x="0" y="115" width="200" height="85" transform="translate(-10 -10) rotate(45 110 110) scale(1.1)" shape-rendering="crispedges"/>`,
    perBendSinisterLined: (line) => `<path d="${line}" transform="translate(-10 -10) rotate(-45 110 110) scale(1.1)"/><rect x="0" y="115" width="200" height="85" transform="translate(-10 -10) rotate(-45 110 110) scale(1.1)" shape-rendering="crispedges"/>`,
    perChevronLined: (line) => `<rect x="15" y="115" width="200" height="200" transform="translate(70 70) rotate(45 100 100)"/><path d="${line}" transform="translate(129 71) rotate(-45 -100 100) scale(-1 1)"/><path d="${line}" transform="translate(71 71) rotate(45 100 100)"/>`,
    perChevronReversedLined: (line) => `<rect x="15" y="115" width="200" height="200" transform="translate(-70 -70) rotate(225.001 100 100)"/><path d="${line}" transform="translate(-70.7 -70.7) rotate(225 100 100) scale(1 1)"/><path d="${line}" transform="translate(270.7 -70.7) rotate(-225 -100 100) scale(-1 1)"/>`,
    perCrossLined: (line) => `<rect x="100" y="0" width="100" height="92.5"/><rect x="0" y="107.5" width="100" height="92.5"/><path d="${line}" transform="translate(0 50) scale(.5001)"/><path d="${line}" transform="translate(200 150) scale(-.5)"/>`,
    perPileLined: (line) => `<path d="${line}" transform="translate(161.66 10) rotate(66.66 -100 100) scale(-1 1)"/><path d="${line}" transform="translate(38.33 10) rotate(-66.66 100 100)"/><polygon points="-2.15,0 84.15,200 115.85,200 202.15,0 200,200 0,200"/>`,
    // straight ordinaries
    fess: `<rect x="0" y="75" width="200" height="50"/>`,
    pale: `<rect x="75" y="0" width="50" height="200"/>`,
    bend: `<polygon points="35,0 200,165 200,200 165,200 0,35 0,0"/>`,
    bendSinister: `<polygon points="0,165 165,0 200,0 200,35 35,200 0,200"/>`,
    chief: `<rect width="200" height="75"/>`,
    bar: `<rect x="0" y="87.5" width="200" height="25"/>`,
    gemelle: `<rect x="0" y="76" width="200" height="16"/><rect x="0" y="108" width="200" height="16"/>`,
    fessCotissed: `<rect x="0" y="67" width="200" height="8"/><rect x="0" y="83" width="200" height="34"/><rect x="0" y="125" width="200" height="8"/>`,
    fessDoubleCotissed: `<rect x="0" y="60" width="200" height="7.5"/><rect x="0" y="72.5" width="200" height="7.5"/><rect x="0" y="85" width="200" height="30"/><rect x="0" y="120" width="200" height="7.5"/><rect x="0" y="132.5" width="200" height="7.5"/>`,
    bendlet: `<polygon points="22,0 200,178 200,200 178,200 0,22 0,0"/>`,
    bendletSinister: `<polygon points="0,178 178,0 200,0 200,22 22,200 0,200"/>`,
    terrace: `<rect x="0" y="145" width="200" height="55"/>`,
    cross: `<polygon points="85,0 85,85 0,85 0,115 85,115 85,200 115,200 115,115 200,115 200,85 115,85 115,0"/>`,
    crossParted: `<path d="M 80 0 L 80 80 L 0 80 L 0 95 L 80 95 L 80 105 L 0 105 L 0 120 L 80 120 L 80 200 L 95 200 L 95 120 L 105 120 L 105 200 L 120 200 L 120 120 L 200 120 L 200 105 L 120 105 L 120 95 L 200 95 L 200 80 L 120 80 L 120 0 L 105 0 L 105 80 L 95 80 L 95 0 L 80 0 z M 95 95 L 105 95 L 105 105 L 95 105 L 95 95 z"/>`,
    saltire: `<path d="M 0,21 79,100 0,179 0,200 21,200 100,121 179,200 200,200 200,179 121,100 200,21 200,0 179,0 100,79 21,0 0,0 Z"/>`,
    saltireParted: `<path d="M 7 0 L 89 82 L 82 89 L 0 7 L 0 28 L 72 100 L 0 172 L 0 193 L 82 111 L 89 118 L 7 200 L 28 200 L 100 128 L 172 200 L 193 200 L 111 118 L 118 111 L 200 193 L 200 172 L 128 100 L 200 28 L 200 7 L 118 89 L 111 82 L 193 0 L 172 0 L 100 72 L 28 0 L 7 0 z M 100 93 L 107 100 L 100 107 L 93 100 L 100 93 z"/>`,
    mount: `<path d="m0,250 a100,100,0,0,1,200,0"/>`,
    point: `<path d="M0,200 Q80,180 100,135 Q120,180 200,200"/>`,
    flaunches: `<path d="M0,0 q120,100 0,200 M200,0 q-120,100 0,200"/>`,
    gore: `<path d="M20,0 Q30,75 100,100 Q80,150 100,200 L0,200 L0,0 Z"/>`,
    pall: `<polygon points="0,0 30,0 100,70 170,0 200,0 200,30 122,109 122,200 78,200 78,109 0,30"/>`,
    pallReversed: `<polygon points="0,200 0,170 78,91 78,0 122,0 122,91 200,170 200,200 170,200 100,130 30,200"/>`,
    chevron: `<polygon points="0,125 100,60 200,125 200,165 100,100 0,165"/>`,
    chevronReversed: `<polygon points="0,75 100,140 200,75 200,35 100,100 0,35"/>`,
    gyron: `<polygon points="0,0 100,100 0,100"/>`,
    quarter: `<rect width="50%" height="50%"/>`,
    canton: `<rect width="37.5%" height="37.5%"/>`,
    pile: `<polygon points="70,0 100,175 130,0"/>`,
    pileInBend: `<polygon points="200,200 200,144 25,25 145,200"/>`,
    pileInBendSinister: `<polygon points="0,200 0,144 175,25 55,200"/>`,
    piles: `<polygon points="46,0 75,175 103,0"/><polygon points="95,0 125,175 154,0"/>`,
    pilesInPoint: `<path d="M15,0 100,200 60,0Z M80,0 100,200 120,0Z M140,0 100,200 185,0Z"/>`,
    label: `<path d="m 46,54.8 6.6,-15.6 95.1,0 5.9,15.5 -16.8,0.1 4.5,-11.8 L 104,43 l 4.3,11.9 -16.8,0 4.3,-11.8 -37.2,0 4.5,11.8 -16.9,0 z"/>`,
    // lined ordinaries
    fessLined: (line) => `<path d="${line}" transform="translate(0 -25)"/><path d="${line}" transform="translate(0 25) rotate(180 100 100)"/><rect x="0" y="88" width="200" height="24" stroke="none"/>`,
    paleLined: (line) => `<path d="${line}" transform="rotate(-90 100 100) translate(0 -25)"/><path d="${line}" transform="rotate(90 100 100) translate(0 -25)"/><rect x="88" y="0" width="24" height="200" stroke="none"/>`,
    bendLined: (line) => `<path d="${line}" transform="translate(8 -18) rotate(45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(-28 18) rotate(225 110 100) scale(1.1 1)"/><rect x="0" y="88" width="200" height="24" transform="translate(-10 0) rotate(45 110 100) scale(1.1 1)" stroke="none"/>`,
    bendSinisterLined: (line) => `<path d="${line}" transform="translate(-28 -18) rotate(-45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(8 18) rotate(-225 110 100) scale(1.1 1)"/><rect x="0" y="88" width="200" height="24" transform="translate(-10 0) rotate(-45 110 100) scale(1.1 1)" stroke="none"/>`,
    chiefLined: (line) => `<path d="${line}" transform="translate(0,-25) rotate(180.00001 100 100)"/><rect width="200" height="62" stroke="none"/>`,
    barLined: (line) => `<path d="${line}" transform="translate(0,-12.5)"/><path d="${line}" transform="translate(0,12.5) rotate(180.00001 100 100)"/><rect x="0" y="94" width="200" height="12" stroke="none"/>`,
    gemelleLined: (line) => `<path d="${line}" transform="translate(0,-22.5)"/><path d="${line}" transform="translate(0,22.5) rotate(180.00001 100 100)"/>`,
    fessCotissedLined: (line) => `<path d="${line}" transform="translate(0 15) scale(1 .5)"/><path d="${line}" transform="translate(0 85) rotate(180 100 50) scale(1 .5)"/><rect x="0" y="80" width="200" height="40"/>`,
    fessDoubleCotissedLined: (line) => `<rect x="0" y="85" width="200" height="30"/><rect x="0" y="72.5" width="200" height="7.5"/><rect x="0" y="120" width="200" height="7.5"/><path d="${line}" transform="translate(0 10) scale(1 .5)"/><path d="${line}" transform="translate(0 90) rotate(180 100 50) scale(1 .5)"/>`,
    bendletLined: (line) => `<path d="${line}" transform="translate(2 -12) rotate(45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(-22 12) rotate(225 110 100) scale(1.1 1)"/><rect x="0" y="94" width="200" height="12" transform="translate(-10 0) rotate(45 110 100) scale(1.1 1)" stroke="none"/>`,
    bendletSinisterLined: (line) => `<path d="${line}" transform="translate(-22 -12) rotate(-45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(2 12) rotate(-225 110 100) scale(1.1 1)"/><rect x="0" y="94" width="200" height="12" transform="translate(-10 0) rotate(-45 110 100) scale(1.1 1)" stroke="none"/>`,
    terraceLined: (line) => `<path d="${line}" transform="translate(0,50)"/><rect x="0" y="164" width="200" height="36" stroke="none"/>`,
    crossLined: (line) => `<path d="${line}" transform="translate(0,-14.5)"/><path d="${line}" transform="rotate(180 100 100) translate(0,-14.5)"/><path d="${line}" transform="rotate(-90 100 100) translate(0,-14.5)"/><path d="${line}" transform="rotate(-270 100 100) translate(0,-14.5)"/>`,
    crossPartedLined: (line) => `<path d="${line}" transform="translate(0,-20)"/><path d="${line}" transform="rotate(180 100 100) translate(0,-20)"/><path d="${line}" transform="rotate(-90 100 100) translate(0,-20)"/><path d="${line}" transform="rotate(-270 100 100) translate(0,-20)"/>`,
    saltireLined: (line) => `<path d="${line}" transform="translate(0 -10) rotate(45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(-20 10) rotate(225 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(-20 -10) rotate(-45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(0 10) rotate(-225 110 100) scale(1.1 1)"/>`,
    saltirePartedLined: (line) => `<path d="${line}" transform="translate(3 -13) rotate(45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(-23 13) rotate(225 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(-23 -13) rotate(-45 110 100) scale(1.1 1)"/><path d="${line}" transform="translate(3 13) rotate(-225 110 100) scale(1.1 1)"/>`,
};
const patterns = {
    semy: (p, c1, c2, size, chargeId) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 200 200" stroke="#000"><rect width="200" height="200" fill="${c1}" stroke="none"/><g fill="${c2}"><use transform="translate(-100 -50)" href="#${chargeId}"/><use transform="translate(100 -50)" href="#${chargeId}"/><use transform="translate(0 50)" href="#${chargeId}"/></g></pattern>`,
    vair: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.25}" viewBox="0 0 25 50" stroke="#000" stroke-width=".2"><rect width="25" height="25" fill="${c1}" stroke="none"/><path d="m12.5,0 l6.25,6.25 v12.5 l6.25,6.25 h-25 l6.25,-6.25 v-12.5 z" fill="${c2}"/><rect x="0" y="25" width="25" height="25" fill="${c2}" stroke="none"/><path d="m25,25 l-6.25,6.25 v12.5 l-6.25,6.25 l-6.25,-6.25 v-12.5 l-6.25,-6.25 z" fill="${c1}"/><path d="M0 50 h25" fill="none"/></pattern>`,
    counterVair: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.25}" viewBox="0 0 25 50" stroke="#000" stroke-width=".2"><rect width="25" height="50" fill="${c2}" stroke="none"/><path d="m 12.5,0 6.25,6.25 v 12.5 L 25,25 18.75,31.25 v 12.5 L 12.5,50 6.25,43.75 V 31.25 L 0,25 6.25,18.75 V 6.25 Z" fill="${c1}"/></pattern>`,
    vairInPale: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 25 25"><rect width="25" height="25" fill="${c1}"/><path d="m12.5,0 l6.25,6.25 v12.5 l6.25,6.25 h-25 l6.25,-6.25 v-12.5 z" fill="${c2}" stroke="#000" stroke-width=".2"/></pattern>`,
    vairEnPointe: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.25}" viewBox="0 0 25 50"><rect width="25" height="25" fill="${c2}"/><path d="m12.5,0 l6.25,6.25 v12.5 l6.25,6.25 h-25 l6.25,-6.25 v-12.5 z" fill="${c1}"/><rect x="0" y="25" width="25" height="25" fill="${c1}" stroke-width="1" stroke="${c1}"/><path d="m12.5,25 l6.25,6.25 v12.5 l6.25,6.25 h-25 l6.25,-6.25 v-12.5 z" fill="${c2}"/></pattern>`,
    vairAncien: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 100 100"><rect width="100" height="100" fill="${c1}"/><path fill="${c2}" stroke="none" d="m 0,90 c 10,0 25,-5 25,-40 0,-25 10,-40 25,-40 15,0 25,15 25,40 0,35 15,40 25,40 v 10 H 0 Z"/><path fill="none" stroke="#000" d="M 0,90 c 10,0 25,-5 25,-40 0,-35 15,-40 25,-40 10,0 25,5 25,40 0,35 15,40 25,40 M0,100 h100"/></pattern>`,
    potent: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 200 200" stroke="#000"><rect width="200" height="100" fill="${c1}" stroke="none"/><rect y="100" width="200" height="100" fill="${c2}" stroke="none"/><path d="m25 50h50v-50h50v50h50v50h-150z" fill="${c2}"/><path d="m25 100v50h50v50h50v-50h50v-50z" fill="${c1}"/><path d="m0 0h200 M0 100h200" fill="none"/></pattern>`,
    counterPotent: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 200 200" stroke="none"><rect width="200" height="200" fill="${c1}"/><path d="m25 50h50v-50h50v50h50v100h-50v50h-50v-50h-50v-50z" fill="${c2}"/><path d="m0 0h200 M0 100h200 M0 200h200"/></pattern>`,
    potentInPale: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.0625}" viewBox="0 0 200 100" stroke-width="1"><rect width="200" height="100" fill="${c1}" stroke="none"/><path d="m25 50h50v-50h50v50h50v50h-150z" fill="${c2}" stroke="#000"/><path d="m0 0h200 M0 100h200" fill="none" stroke="#000"/></pattern>`,
    potentEnPointe: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 200 200" stroke="none"><rect width="200" height="200" fill="${c1}"/><path d="m0 0h25v50h50v50h50v-50h50v-50h25v100h-25v50h-50v50h-50v-50h-50v-50h-25v-100" fill="${c2}"/></pattern>`,
    ermine: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 200 200" fill="${c2}"><rect width="200" height="200" fill="${c1}"/><g stroke="none" fill="${c2}"><g transform="translate(-100 -50)"><path d="m100 81.1c-4.25 17.6-12.7 29.8-21.2 38.9 3.65-0.607 7.9-3.04 11.5-5.47-2.42 4.86-4.86 8.51-7.3 12.7 1.82-0.607 6.07-4.86 12.7-10.9 1.21 8.51 2.42 17.6 4.25 23.6 1.82-5.47 3.04-15.2 4.25-23.6 3.65 3.65 7.3 7.9 12.7 10.9l-7.9-13.3c3.65 1.82 7.9 4.86 11.5 6.07-9.11-9.11-17-21.2-20.6-38.9z"/><path d="m82.4 81.7c-0.607-0.607-6.07 2.42-9.72-4.25 7.9 6.68 15.2-7.3 21.8 1.82 1.82 4.25-6.68 10.9-12.1 2.42z"/><path d="m117 81.7c0.607-1.21 6.07 2.42 9.11-4.86-7.3 7.3-15.2-7.3-21.2 2.42-1.82 4.25 6.68 10.9 12.1 2.42z"/><path d="m101 66.5c-1.02-0.607 3.58-4.25-3.07-8.51 5.63 7.9-10.2 10.9-1.54 17.6 3.58 2.42 12.2-2.42 4.6-9.11z"/></g><g transform="translate(100 -50)"><path d="m100 81.1c-4.25 17.6-12.7 29.8-21.2 38.9 3.65-0.607 7.9-3.04 11.5-5.47-2.42 4.86-4.86 8.51-7.3 12.7 1.82-0.607 6.07-4.86 12.7-10.9 1.21 8.51 2.42 17.6 4.25 23.6 1.82-5.47 3.04-15.2 4.25-23.6 3.65 3.65 7.3 7.9 12.7 10.9l-7.9-13.3c3.65 1.82 7.9 4.86 11.5 6.07-9.11-9.11-17-21.2-20.6-38.9z"/><path d="m82.4 81.7c-0.607-0.607-6.07 2.42-9.72-4.25 7.9 6.68 15.2-7.3 21.8 1.82 1.82 4.25-6.68 10.9-12.1 2.42z"/><path d="m117 81.7c0.607-1.21 6.07 2.42 9.11-4.86-7.3 7.3-15.2-7.3-21.2 2.42-1.82 4.25 6.68 10.9 12.1 2.42z"/><path d="m101 66.5c-1.02-0.607 3.58-4.25-3.07-8.51 5.63 7.9-10.2 10.9-1.54 17.6 3.58 2.42 12.2-2.42 4.6-9.11z"/></g><g transform="translate(0 50)"><path d="m100 81.1c-4.25 17.6-12.7 29.8-21.2 38.9 3.65-0.607 7.9-3.04 11.5-5.47-2.42 4.86-4.86 8.51-7.3 12.7 1.82-0.607 6.07-4.86 12.7-10.9 1.21 8.51 2.42 17.6 4.25 23.6 1.82-5.47 3.04-15.2 4.25-23.6 3.65 3.65 7.3 7.9 12.7 10.9l-7.9-13.3c3.65 1.82 7.9 4.86 11.5 6.07-9.11-9.11-17-21.2-20.6-38.9z"/><path d="m82.4 81.7c-0.607-0.607-6.07 2.42-9.72-4.25 7.9 6.68 15.2-7.3 21.8 1.82 1.82 4.25-6.68 10.9-12.1 2.42z"/><path d="m117 81.7c0.607-1.21 6.07 2.42 9.11-4.86-7.3 7.3-15.2-7.3-21.2 2.42-1.82 4.25 6.68 10.9 12.1 2.42z"/><path d="m101 66.5c-1.02-0.607 3.58-4.25-3.07-8.51 5.63 7.9-10.2 10.9-1.54 17.6 3.58 2.42 12.2-2.42 4.6-9.11z"/></g></g></pattern>`,
    chequy: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.25}" height="${size * 0.25}" viewBox="0 0 50 50" fill="${c2}"><rect width="50" height="50"/><rect width="25" height="25" fill="${c1}"/><rect x="25" y="25" width="25" height="25" fill="${c1}"/></pattern>`,
    lozengy: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 50 50"><rect width="50" height="50" fill="${c1}"/><polygon points="25,0 50,25 25,50 0,25" fill="${c2}"/></pattern>`,
    fusily: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.25}" viewBox="0 0 50 100"><rect width="50" height="100" fill="${c2}"/><polygon points="25,0 50,50 25,100 0,50" fill="${c1}"/></pattern>`,
    pally: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.5}" height="${size * 0.125}" viewBox="0 0 100 25"><rect width="100" height="25" fill="${c2}"/><rect x="25" y="0" width="25" height="25" fill="${c1}"/><rect x="75" y="0" width="25" height="25" fill="${c1}"/></pattern>`,
    barry: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.5}" viewBox="0 0 25 100"><rect width="25" height="100" fill="${c2}"/><rect x="0" y="25" width="25" height="25" fill="${c1}"/><rect x="0" y="75" width="25" height="25" fill="${c1}"/></pattern>`,
    gemelles: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 50 50"><rect width="50" height="50" fill="${c1}"/><rect y="5" width="50" height="10" fill="${c2}"/><rect y="40" width="50" height="10" fill="${c2}"/></pattern>`,
    bendy: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 100 100"><rect width="100" height="100" fill="${c1}"/><polygon points="0,25 75,100 25,100 0,75" fill="${c2}"/><polygon points="25,0 75,0 100,25 100,75" fill="${c2}"/></pattern>`,
    bendySinister: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 100 100"><rect width="100" height="100" fill="${c2}"/><polygon points="0,25 25,0 75,0 0,75" fill="${c1}"/><polygon points="25,100 100,25 100,75 75,100" fill="${c1}"/></pattern>`,
    palyBendy: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.6258}" height="${size * 0.3576}" viewBox="0 0 175 100"><rect y="0" x="0" width="175" height="100" fill="${c2}"/><g fill="${c1}"><path d="m0 20 35 30v50l-35-30z"/><path d="m35 0 35 30v50l-35-30z"/><path d="m70 0h23l12 10v50l-35-30z"/><path d="m70 80 23 20h-23z"/><path d="m105 60 35 30v10h-35z"/><path d="m105 0h35v40l-35-30z"/><path d="m 140,40 35,30 v 30 h -23 l -12,-10z"/><path d="M 175,0 V 20 L 152,0 Z"/></g></pattern>`,
    barryBendy: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.3572}" height="${size * 0.6251}" viewBox="0 0 100 175"><rect width="100" height="175" fill="${c2}"/><g fill="${c1}"><path d="m20 0 30 35h50l-30-35z"/><path d="m0 35 30 35h50l-30-35z"/><path d="m0 70v23l10 12h50l-30-35z"/><path d="m80 70 20 23v-23z"/><path d="m60 105 30 35h10v-35z"/><path d="m0 105v35h40l-30-35z"/><path d="m 40,140 30,35 h 30 v -23 l -10,-12 z"/><path d="m0 175h20l-20-23z"/></g></pattern>`,
    pappellony: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 100 100"><rect width="100" height="100" fill="${c1}"/><circle cx="0" cy="51" r="45" stroke="${c2}" fill="${c1}" stroke-width="10"/><circle cx="100" cy="51" r="45" stroke="${c2}" fill="${c1}" stroke-width="10"/><circle cx="50" cy="1" r="45" stroke="${c2}" fill="${c1}" stroke-width="10"/></pattern>`,
    pappellony2: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 100 100" stroke="#000" stroke-width="2"><rect width="100" height="100" fill="${c1}" stroke="none"/><circle cy="50" r="49" fill="${c2}"/><circle cx="100" cy="50" r="49" fill="${c2}"/><circle cx="50" cy="0" r="49" fill="${c1}"/></pattern>`,
    scaly: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 100 100" stroke="#000"><rect width="100" height="100" fill="${c1}" stroke="none"/><path d="M 0,84 C -40,84 -50,49 -50,49 -50,79 -27,99 0,99 27,99 50,79 50,49 50,49 40,84 0,84 Z" fill="${c2}"/><path d="M 100,84 C 60,84 50,49 50,49 c 0,30 23,50 50,50 27,0 50,-20 50,-50 0,0 -10,35 -50,35 z" fill="${c2}"/><path d="M 50,35 C 10,35 0,0 0,0 0,30 23,50 50,50 77,50 100,30 100,0 100,0 90,35 50,35 Z" fill="${c2}"/></pattern>`,
    plumetty: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.25}" viewBox="0 0 50 100" stroke-width=".8"><rect width="50" height="100" fill="${c2}" stroke="none"/><path fill="${c1}" stroke="none" d="M 25,100 C 44,88 49.5,74 50,50 33.5,40 25,25 25,4e-7 25,25 16.5,40 0,50 0.5,74 6,88 25,100 Z"/><path fill="none" stroke="${c2}" d="m17 40c5.363 2.692 10.7 2.641 16 0m-19 7c7.448 4.105 14.78 3.894 22 0m-27 7c6-2 10.75 3.003 16 3 5.412-0.0031 10-5 16-3m-35 9c4-7 12 3 19 2 7 1 15-9 19-2m-35 6c6-2 11 3 16 3s10-5 16-3m-30 7c8 0 8 3 14 3s7-3 14-3m-25 8c7.385 4.048 14.72 3.951 22 0m-19 8c5.455 2.766 10.78 2.566 16 0m-8 6v-78"/><g fill="none" stroke="${c1}"><path d="m42 90c2.678 1.344 5.337 2.004 8 2m-11 5c3.686 2.032 7.344 3.006 10.97 3m0.0261-1.2e-4v-30"/><path d="m0 92c2.689 0.0045 5.328-0.6687 8-2m-8 10c3.709-0.0033 7.348-1.031 11-3m-11 3v-30"/><path d="m0 7c5.412-0.0031 10-5 16-3m-16 11c7 1 15-9 19-2m-19 9c5 0 10-5 16-3m-16 10c6 0 7-3 14-3m-14.02 11c3.685-0.002185 7.357-1.014 11.02-3m-11 10c2.694-0.01117 5.358-0.7036 7.996-2m-8 6v-48"/><path d="m34 4c6-2 10.75 3.003 16 3m-19 6c4-7 12 3 19 2m-16 4c6-2 11 3 16 3m-14 4c8 0 8 3 14 3m-11 5c3.641 1.996 7.383 2.985 11 3m-8 5c2.762 1.401 5.303 2.154 8.002 2.112m-0.00154 3.888v-48"/></g></pattern>`,
    masoned: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.125}" height="${size * 0.125}" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" fill="${c1}"/><rect width="100" height="50" stroke="${c2}" stroke-width="4"/><line x1="50" y1="50" x2="50" y2="100" stroke="${c2}" stroke-width="5"/></pattern>`,
    fretty: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.2}" height="${size * 0.2}" viewBox="0 0 140 140" stroke="#000" stroke-width="2"><rect width="140" height="140" fill="${c1}" stroke="none"/><path d="m-15 5 150 150 20-20-150-150z" fill="${c2}"/><path d="m10 150 140-140-20-20-140 140z" fill="${c2}" stroke="none"/><path d="m0 120 20 20 120-120-20-20z" fill="none"/></pattern>`,
    grillage: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.25}" height="${size * 0.25}" viewBox="0 0 200 200" stroke="#000" stroke-width="2"><rect width="200" height="200" fill="${c1}" stroke="none"/><path d="m205 65v-30h-210v30z" fill="${c2}"/><path d="m65-5h-30v210h30z" fill="${c2}"/><path d="m205 165v-30h-210v30z" fill="${c2}"/><path d="m165,65h-30v140h30z" fill="${c2}"/><path d="m 165,-5h-30v40h30z" fill="${c2}"/></pattern>`,
    chainy: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.167}" height="${size * 0.167}" viewBox="0 0 200 200" stroke="#000" stroke-width="2"><rect x="-6.691e-6" width="200" height="200" fill="${c1}" stroke="none"/><path d="m155-5-20-20-160 160 20 20z" fill="${c2}"/><path d="m45 205 160-160 20 20-160 160z" fill="${c2}"/><path d="m45-5 20-20 160 160-20 20-160-160" fill="${c2}"/><path d="m-5 45-20 20 160 160 20-20-160-160" fill="${c2}"/></pattern>`,
    maily: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.167}" height="${size * 0.167}" viewBox="0 0 200 200" stroke="#000" stroke-width="1.2"><path fill="${c1}" stroke="none" d="M0 0h200v200H0z"/><g fill="${c2}"><path d="m80-2c-5.27e-4 2.403-0.1094 6.806-0.3262 9.199 5.014-1.109 10.1-1.768 15.19-2.059 0.09325-1.712 0.1401-5.426 0.1406-7.141z"/><path d="m100 5a95 95 0 0 0-95 95 95 95 0 0 0 95 95 95 95 0 0 0 95-95 95 95 0 0 0-95-95zm0 15a80 80 0 0 1 80 80 80 80 0 0 1-80 80 80 80 0 0 1-80-80 80 80 0 0 1 80-80z"/><path d="m92.8 20.33c-5.562 0.4859-11.04 1.603-16.34 3.217-7.793 25.31-27.61 45.12-52.91 52.91-5.321 1.638-10.8 2.716-16.34 3.217-2.394 0.2168-6.796 0.3256-9.199 0.3262v15c1.714-4.79e-4 5.429-0.04737 7.141-0.1406 5.109-0.2761 10.19-0.9646 15.19-2.059 36.24-7.937 64.54-36.24 72.47-72.47z"/><path d="m202 80c-2.403-5.31e-4 -6.806-0.1094-9.199-0.3262 1.109 5.014 1.768 10.1 2.059 15.19 1.712 0.09326 5.426 0.1401 7.141 0.1406z"/><path d="m179.7 92.8c-0.4859-5.562-1.603-11.04-3.217-16.34-25.31-7.793-45.12-27.61-52.91-52.91-1.638-5.321-2.716-10.8-3.217-16.34-0.2168-2.394-0.3256-6.796-0.3262-9.199h-15c4.8e-4 1.714 0.0474 5.429 0.1406 7.141 0.2761 5.109 0.9646 10.19 2.059 15.19 7.937 36.24 36.24 64.54 72.47 72.47z"/><path d="m120 202c5.3e-4 -2.403 0.1094-6.806 0.3262-9.199-5.014 1.109-10.1 1.768-15.19 2.059-0.0933 1.712-0.1402 5.426-0.1406 7.141z"/><path d="m107.2 179.7c5.562-0.4859 11.04-1.603 16.34-3.217 7.793-25.31 27.61-45.12 52.91-52.91 5.321-1.638 10.8-2.716 16.34-3.217 2.394-0.2168 6.796-0.3256 9.199-0.3262v-15c-1.714 4.7e-4 -5.429 0.0474-7.141 0.1406-5.109 0.2761-10.19 0.9646-15.19 2.059-36.24 7.937-64.54 36.24-72.47 72.47z"/><path d="m -2,120 c 2.403,5.4e-4 6.806,0.1094 9.199,0.3262 -1.109,-5.014 -1.768,-10.1 -2.059,-15.19 -1.712,-0.0933 -5.426,-0.1402 -7.141,-0.1406 z"/><path d="m 20.33,107.2 c 0.4859,5.562 1.603,11.04 3.217,16.34 25.31,7.793 45.12,27.61 52.91,52.91 1.638,5.321 2.716,10.8 3.217,16.34 0.2168,2.394 0.3256,6.796 0.3262,9.199 L 95,202 c -4.8e-4,-1.714 -0.0472,-5.44 -0.1404,-7.152 -0.2761,-5.109 -0.9646,-10.19 -2.059,-15.19 -7.937,-36.24 -36.24,-64.54 -72.47,-72.47 z"/></g></pattern>`,
    honeycombed: (p, c1, c2, size) => `<pattern id="${p}" width="${size * 0.143}" height="${size * 0.24514}" viewBox="0 0 70 120"><rect width="70" height="120" fill="${c1}"/><path d="M 70,0 V 20 L 35,40 m 35,80 V 100 L 35,80 M 0,120 V 100 L 35,80 V 40 L 0,20 V 0" stroke="${c2}" fill="none" stroke-width="3"/></pattern>`,
};
const tinctures = {
    field: { metals: 3, colours: 4, stains: +P(0.03), patterns: 1 },
    division: { metals: 5, colours: 8, stains: +P(0.03), patterns: 1 },
    charge: { metals: 2, colours: 3, stains: +P(0.05), patterns: 0 },
    metals: { argent: 3, or: 2 },
    colours: { gules: 5, azure: 4, sable: 3, purpure: 3, vert: 2 },
    stains: { murrey: 1, sanguine: 1, tenné: 1 },
    patterns: {
        semy: 8,
        ermine: 6,
        vair: 4,
        counterVair: 1,
        vairInPale: 1,
        vairEnPointe: 2,
        vairAncien: 2,
        potent: 2,
        counterPotent: 1,
        potentInPale: 1,
        potentEnPointe: 1,
        chequy: 8,
        lozengy: 5,
        fusily: 2,
        pally: 8,
        barry: 10,
        gemelles: 1,
        bendy: 8,
        bendySinister: 4,
        palyBendy: 2,
        barryBendy: 1,
        pappellony: 2,
        pappellony2: 3,
        scaly: 1,
        plumetty: 1,
        masoned: 6,
        fretty: 3,
        grillage: 1,
        chainy: 1,
        maily: 2,
        honeycombed: 1,
    },
};
const charges = {
    // categories selection
    types: {
        conventional: 30,
        crosses: 10,
        animals: 2,
        animalHeads: 1,
        birds: 2,
        fantastic: 3,
        plants: 1,
        agriculture: 1,
        arms: 3,
        bodyparts: 1,
        people: 1,
        architecture: 1,
        miscellaneous: 3,
        inescutcheon: 3,
    },
    single: {
        conventional: 12,
        crosses: 8,
        plants: 2,
        animals: 10,
        animalHeads: 2,
        birds: 4,
        fantastic: 7,
        agriculture: 1,
        arms: 6,
        bodyparts: 1,
        people: 2,
        architecture: 1,
        miscellaneous: 10,
        inescutcheon: 5,
    },
    semy: { conventional: 12, crosses: 3, plants: 1 },
    // generic categories
    conventional: {
        lozenge: 2,
        fusil: 4,
        mascle: 4,
        rustre: 2,
        lozengeFaceted: 3,
        lozengePloye: 1,
        roundel: 4,
        roundel2: 3,
        annulet: 4,
        mullet: 5,
        mulletPierced: 1,
        mulletFaceted: 1,
        mullet4: 3,
        mullet6: 4,
        mullet6Pierced: 1,
        mullet6Faceted: 1,
        mullet7: 1,
        mullet8: 1,
        mullet10: 1,
        estoile: 1,
        compassRose: 1,
        billet: 5,
        delf: 0,
        triangle: 3,
        trianglePierced: 1,
        goutte: 4,
        heart: 4,
        pique: 2,
        carreau: 1,
        trefle: 2,
        fleurDeLis: 6,
        sun: 3,
        sunInSplendour: 1,
        crescent: 5,
        fountain: 1,
    },
    crosses: {
        crossHummetty: 15,
        crossVoided: 1,
        crossPattee: 2,
        crossPatteeAlisee: 1,
        crossFormee: 1,
        crossFormee2: 2,
        crossPotent: 2,
        crossJerusalem: 1,
        crosslet: 1,
        crossClechy: 3,
        crossBottony: 1,
        crossFleury: 3,
        crossPatonce: 1,
        crossPommy: 1,
        crossGamma: 1,
        crossArrowed: 1,
        crossFitchy: 1,
        crossCercelee: 1,
        crossMoline: 2,
        crossFourchy: 1,
        crossAvellane: 1,
        crossErminee: 1,
        crossBiparted: 1,
        crossMaltese: 3,
        crossTemplar: 2,
        crossCeltic: 1,
        crossCeltic2: 1,
        crossTriquetra: 1,
        crossCarolingian: 1,
        crossOccitan: 1,
        crossSaltire: 3,
        crossBurgundy: 1,
        crossLatin: 3,
        crossPatriarchal: 1,
        crossOrthodox: 1,
        crossCalvary: 1,
        crossDouble: 1,
        crossTau: 1,
        crossSantiago: 1,
        crossAnkh: 1,
    },
    animals: {
        lionRampant: 5,
        lionPassant: 2,
        lionPassantGuardant: 1,
        wolfRampant: 1,
        wolfPassant: 1,
        wolfStatant: 1,
        greyhoundCourant: 1,
        boarRampant: 1,
        horseRampant: 2,
        horseSalient: 1,
        bearRampant: 2,
        bearPassant: 1,
        bullPassant: 1,
        goat: 1,
        lamb: 1,
        elephant: 1,
        camel: 1,
    },
    animalHeads: {
        wolfHeadErased: 1,
        bullHeadCaboshed: 1,
        deerHeadCaboshed: 1,
        lionHeadCaboshed: 2,
    },
    fantastic: {
        dragonPassant: 2,
        dragonRampant: 2,
        wyvern: 1,
        wyvernWithWingsDisplayed: 1,
        griffinPassant: 1,
        griffinRampant: 1,
        eagleTwoHeards: 2,
        unicornRampant: 1,
        pegasus: 1,
        serpent: 1,
    },
    birds: {
        eagle: 9,
        raven: 1,
        cock: 3,
        parrot: 1,
        swan: 2,
        swanErased: 1,
        heron: 1,
        owl: 1,
    },
    plants: { tree: 1, oak: 1, cinquefoil: 1, rose: 1 },
    agriculture: { garb: 1, rake: 1 },
    arms: {
        sword: 5,
        sabre: 1,
        sabresCrossed: 1,
        hatchet: 2,
        axe: 2,
        lochaberAxe: 1,
        mallet: 1,
        bowWithArrow: 2,
        bow: 1,
        arrow: 1,
        arrowsSheaf: 1,
        helmet: 2,
    },
    bodyparts: { hand: 4, head: 1, headWreathed: 1 },
    people: { cavalier: 3, monk: 1, angel: 2 },
    architecture: { tower: 1, castle: 1 },
    miscellaneous: {
        crown: 3,
        orb: 1,
        chalice: 1,
        key: 1,
        buckle: 1,
        bugleHorn: 1,
        bugleHorn2: 1,
        bell: 2,
        pot: 1,
        bucket: 1,
        horseshoe: 3,
        attire: 1,
        stagsAttires: 1,
        ramsHorn: 1,
        cowHorns: 2,
        wing: 1,
        wingSword: 1,
        lute: 1,
        harp: 1,
        wheel: 2,
        crosier: 1,
        fasces: 1,
        log: 1,
    },
    // selection based on culture type:
    Naval: {
        anchor: 3,
        boat: 1,
        lymphad: 2,
        armillarySphere: 1,
        escallop: 1,
        dolphin: 1,
    },
    Highland: {
        tower: 1,
        raven: 1,
        wolfHeadErased: 1,
        wolfPassant: 1,
        goat: 1,
        axe: 1,
    },
    River: {
        tower: 1,
        garb: 1,
        rake: 1,
        boat: 1,
        pike: 2,
        bullHeadCaboshed: 1,
    },
    Lake: { cancer: 2, escallop: 1, pike: 2, heron: 1, boat: 1, boat2: 2 },
    Nomadic: {
        pot: 1,
        buckle: 1,
        wheel: 2,
        sabre: 2,
        sabresCrossed: 1,
        bow: 2,
        arrow: 1,
        horseRampant: 1,
        horseSalient: 1,
        crescent: 1,
        camel: 3,
    },
    Hunting: {
        bugleHorn: 2,
        bugleHorn2: 1,
        stagsAttires: 2,
        attire: 2,
        hatchet: 1,
        bowWithArrow: 1,
        arrowsSheaf: 1,
        deerHeadCaboshed: 1,
        wolfStatant: 1,
        oak: 1,
    },
    // selection based on type
    City: { key: 3, bell: 2, lute: 1, tower: 1, castle: 1, mallet: 1 },
    Capital: { crown: 4, orb: 1, lute: 1, castle: 3, tower: 1 },
    Сathedra: {
        chalice: 1,
        orb: 1,
        crosier: 2,
        lamb: 1,
        monk: 2,
        angel: 3,
        crossLatin: 2,
        crossPatriarchal: 1,
        crossOrthodox: 1,
        crossCalvary: 1,
    },
    // specific cases
    natural: { fountain: "azure", garb: "or", raven: "sable" },
    sinister: [
        // charges that can be sinister
        "crossGamma",
        "lionRampant",
        "lionPassant",
        "wolfRampant",
        "wolfPassant",
        "wolfStatant",
        "wolfHeadErased",
        "greyhoundСourant",
        "boarRampant",
        "horseRampant",
        "horseSalient",
        "bullPassant",
        "bearRampant",
        "bearPassant",
        "goat",
        "lamb",
        "elephant",
        "eagle",
        "raven",
        "cock",
        "parrot",
        "swan",
        "swanErased",
        "heron",
        "pike",
        "dragonPassant",
        "dragonRampant",
        "wyvern",
        "wyvernWithWingsDisplayed",
        "griffinPassant",
        "griffinRampant",
        "unicornRampant",
        "pegasus",
        "serpent",
        "hatchet",
        "lochaberAxe",
        "hand",
        "wing",
        "wingSword",
        "lute",
        "harp",
        "bow",
        "head",
        "headWreathed",
        "knight",
        "lymphad",
        "log",
        "crosier",
        "dolphin",
        "sabre",
        "monk",
        "owl",
        "axe",
        "camel",
        "fasces",
        "lionPassantGuardant",
        "helmet",
    ],
    reversed: [
        // charges that can be reversed
        "goutte",
        "mullet",
        "mullet7",
        "crescent",
        "crossTau",
        "cancer",
        "sword",
        "sabresCrossed",
        "hand",
        "horseshoe",
        "bowWithArrow",
        "arrow",
        "arrowsSheaf",
        "rake",
        "crossTriquetra",
        "crossLatin",
        "crossTau",
    ],
};
const positions = {
    conventional: {
        e: 20,
        abcdefgzi: 3,
        beh: 3,
        behdf: 2,
        acegi: 1,
        kn: 3,
        bhdf: 1,
        jeo: 1,
        abc: 3,
        jln: 6,
        jlh: 3,
        kmo: 2,
        jleh: 1,
        def: 3,
        abcpqh: 4,
        ABCDEFGHIJKL: 1,
    },
    complex: {
        e: 40,
        beh: 1,
        kn: 1,
        jeo: 1,
        abc: 2,
        jln: 7,
        jlh: 2,
        def: 1,
        abcpqh: 1,
    },
    divisions: {
        perPale: { e: 15, pq: 5, jo: 2, jl: 2, ABCDEFGHIJKL: 1 },
        perFess: {
            e: 12,
            kn: 4,
            jkl: 2,
            gizgiz: 1,
            jlh: 3,
            kmo: 1,
            ABCDEFGHIJKL: 1,
        },
        perBend: { e: 5, lm: 5, bcfdgh: 1 },
        perBendSinister: { e: 1, jo: 1 },
        perCross: { e: 4, jlmo: 1, j: 1, jo: 2, jl: 1 },
        perChevron: { e: 1, jlh: 1, dfk: 1, dfbh: 2, bdefh: 1 },
        perChevronReversed: { e: 1, mok: 2, dfh: 2, dfbh: 1, bdefh: 1 },
        perSaltire: {
            bhdf: 8,
            e: 3,
            abcdefgzi: 1,
            bh: 1,
            df: 1,
            ABCDEFGHIJKL: 1,
        },
        perPile: { ee: 3, be: 2, abceh: 1, abcabc: 1, jleh: 1 },
    },
    ordinariesOn: {
        pale: { ee: 12, beh: 10, kn: 3, bb: 1 },
        fess: { ee: 1, def: 3 },
        bar: { defdefdef: 1 },
        fessCotissed: { ee: 1, def: 3 },
        fessDoubleCotissed: { ee: 1, defdef: 3 },
        bend: { ee: 2, jo: 1, joe: 1 },
        bendSinister: { ee: 1, lm: 1, lem: 4 },
        bendlet: { joejoejoe: 1 },
        bendletSinister: { lemlemlem: 1 },
        bordure: { ABCDEFGHIJKL: 1 },
        chief: { abc: 5, bbb: 1 },
        quarter: { jjj: 1 },
        canton: { yyyy: 1 },
        cross: { eeee: 1, behdfbehdf: 3, behbehbeh: 2 },
        crossParted: { e: 5, ee: 1 },
        saltire: { ee: 5, jlemo: 1 },
        saltireParted: { e: 5, ee: 1 },
        pall: { ee: 1, jleh: 5, jlhh: 3 },
        pallReversed: { ee: 1, bemo: 5 },
        pile: { bbb: 1 },
        pileInBend: { eeee: 1, eeoo: 1 },
        pileInBendSinister: { eeee: 1, eemm: 1 },
    },
    ordinariesOff: {
        pale: { yyy: 1 },
        fess: { abc: 3, abcz: 1 },
        bar: { abc: 2, abcgzi: 1, jlh: 5, bgi: 2, ach: 1 },
        gemelle: { abc: 1 },
        bend: { ccg: 2, ccc: 1 },
        bendSinister: { aai: 2, aaa: 1 },
        bendlet: { ccg: 2, ccc: 1 },
        bendletSinister: { aai: 2, aaa: 1 },
        bordure: { e: 4, jleh: 2, kenken: 1, peqpeq: 1 },
        orle: { e: 4, jleh: 1, kenken: 1, peqpeq: 1 },
        chief: { emo: 2, emoz: 1, ez: 2 },
        terrace: { e: 5, def: 1, bdf: 3 },
        mount: { e: 5, def: 1, bdf: 3 },
        point: { e: 2, def: 1, bdf: 3, acbdef: 1 },
        flaunches: { e: 3, kn: 1, beh: 3 },
        gyron: { bh: 1 },
        quarter: { e: 1 },
        canton: { e: 5, beh: 1, def: 1, bdefh: 1, kn: 1 },
        cross: { acgi: 1 },
        pall: { BCKFEILGJbdmfo: 1 },
        pallReversed: { aczac: 1 },
        chevron: { ach: 3, hhh: 1 },
        chevronReversed: { bbb: 1 },
        pile: { acdfgi: 1, acac: 1 },
        pileInBend: { cg: 1 },
        pileInBendSinister: { ai: 1 },
        label: { defgzi: 2, eh: 3, defdefhmo: 1, egiegi: 1, pqn: 5 },
    },
    // charges
    inescutcheon: { e: 4, jln: 1 },
    mascle: {
        e: 15,
        abcdefgzi: 3,
        beh: 3,
        bdefh: 4,
        acegi: 1,
        kn: 3,
        joe: 2,
        abc: 3,
        jlh: 8,
        jleh: 1,
        df: 3,
        abcpqh: 4,
        pqe: 3,
        eknpq: 3,
    },
    lionRampant: {
        e: 10,
        def: 2,
        abc: 2,
        bdefh: 1,
        kn: 1,
        jlh: 2,
        abcpqh: 1,
    },
    lionPassant: { e: 10, def: 1, abc: 1, bdefh: 1, jlh: 1, abcpqh: 1 },
    wolfPassant: { e: 10, def: 1, abc: 1, bdefh: 1, jlh: 1, abcpqh: 1 },
    greyhoundСourant: { e: 10, def: 1, abc: 1, bdefh: 1, jlh: 1, abcpqh: 1 },
    griffinRampant: {
        e: 10,
        def: 2,
        abc: 2,
        bdefh: 1,
        kn: 1,
        jlh: 2,
        abcpqh: 1,
    },
    griffinPassant: { e: 10, def: 1, abc: 1, bdefh: 1, jlh: 1, abcpqh: 1 },
    boarRampant: { e: 12, beh: 1, kn: 1, jln: 2 },
    eagle: { e: 15, beh: 1, kn: 1, abc: 1, jlh: 2, def: 2, pq: 1 },
    raven: { e: 15, beh: 1, kn: 1, jeo: 1, abc: 3, jln: 3, def: 1 },
    wyvern: { e: 10, jln: 1 },
    garb: {
        e: 1,
        def: 3,
        abc: 2,
        beh: 1,
        kn: 1,
        jln: 3,
        jleh: 1,
        abcpqh: 1,
        joe: 1,
        lme: 1,
    },
    crown: {
        e: 10,
        abcdefgzi: 1,
        beh: 3,
        behdf: 2,
        acegi: 1,
        kn: 1,
        pq: 2,
        abc: 1,
        jln: 4,
        jleh: 1,
        def: 2,
        abcpqh: 3,
    },
    hand: { e: 10, jln: 2, kn: 1, jeo: 1, abc: 2, pqe: 1 },
    armillarySphere: { e: 1 },
    tree: { e: 1 },
    lymphad: { e: 1 },
    head: { e: 1 },
    headWreathed: { e: 1 },
    cavalier: { e: 1 },
    angel: { e: 1 },
};
const divisionLines = {
    straight: 50,
    wavy: 8,
    engrailed: 4,
    invecked: 3,
    rayonne: 3,
    embattled: 1,
    raguly: 1,
    urdy: 1,
    dancetty: 1,
    indented: 2,
    dentilly: 1,
    bevilled: 1,
    angled: 1,
    flechy: 1,
    barby: 1,
    enclavy: 1,
    escartely: 1,
    arched: 2,
    archedReversed: 1,
    nowy: 1,
    nowyReversed: 1,
    embattledGhibellin: 1,
    embattledNotched: 1,
    embattledGrady: 1,
    dovetailedIndented: 1,
    dovetailed: 1,
    potenty: 1,
    potentyDexter: 1,
    potentySinister: 1,
    nebuly: 2,
    seaWaves: 1,
    dragonTeeth: 1,
    firTrees: 1,
};
const divisions = {
    variants: {
        perPale: 5,
        perFess: 5,
        perBend: 2,
        perBendSinister: 1,
        perChevron: 1,
        perChevronReversed: 1,
        perCross: 5,
        perPile: 1,
        perSaltire: 1,
        gyronny: 1,
        chevronny: 1,
    },
    perPale: divisionLines,
    perFess: divisionLines,
    perBend: divisionLines,
    perBendSinister: divisionLines,
    perChevron: divisionLines,
    perChevronReversed: divisionLines,
    perCross: {
        straight: 20,
        wavy: 5,
        engrailed: 4,
        invecked: 3,
        rayonne: 1,
        embattled: 1,
        raguly: 1,
        urdy: 1,
        indented: 2,
        dentilly: 1,
        bevilled: 1,
        angled: 1,
        embattledGhibellin: 1,
        embattledGrady: 1,
        dovetailedIndented: 1,
        dovetailed: 1,
        potenty: 1,
        potentyDexter: 1,
        potentySinister: 1,
        nebuly: 1,
    },
    perPile: divisionLines,
};
const ordinaries = {
    lined: {
        pale: 7,
        fess: 5,
        bend: 3,
        bendSinister: 2,
        chief: 5,
        bar: 2,
        gemelle: 1,
        fessCotissed: 1,
        fessDoubleCotissed: 1,
        bendlet: 2,
        bendletSinister: 1,
        terrace: 3,
        cross: 6,
        crossParted: 1,
        saltire: 2,
        saltireParted: 1,
    },
    straight: {
        bordure: 8,
        orle: 4,
        mount: 1,
        point: 2,
        flaunches: 1,
        gore: 1,
        gyron: 1,
        quarter: 1,
        canton: 2,
        pall: 3,
        pallReversed: 2,
        chevron: 4,
        chevronReversed: 3,
        pile: 2,
        pileInBend: 2,
        pileInBendSinister: 1,
        piles: 1,
        pilesInPoint: 2,
        label: 1,
    },
};
const shields = {
    types: {
        basic: 10,
        regional: 2,
        historical: 1,
        specific: 1,
        banner: 1,
        simple: 2,
        fantasy: 1,
        middleEarth: 0,
    },
    basic: { heater: 12, spanish: 6, french: 1 },
    regional: { horsehead: 1, horsehead2: 1, polish: 1, hessen: 1, swiss: 1 },
    historical: {
        boeotian: 1,
        roman: 2,
        kite: 1,
        oldFrench: 5,
        renaissance: 2,
        baroque: 2,
    },
    specific: { targe: 1, targe2: 0, pavise: 5, wedged: 10 },
    banner: {
        flag: 1,
        pennon: 0,
        guidon: 0,
        banner: 0,
        dovetail: 1,
        gonfalon: 5,
        pennant: 0,
    },
    simple: {
        round: 12,
        oval: 6,
        vesicaPiscis: 1,
        square: 1,
        diamond: 2,
        no: 0,
    },
    fantasy: {
        fantasy1: 2,
        fantasy2: 2,
        fantasy3: 1,
        fantasy4: 1,
        fantasy5: 3,
    },
    middleEarth: {
        noldor: 1,
        gondor: 1,
        easterling: 1,
        erebor: 1,
        ironHills: 1,
        urukHai: 1,
        moriaOrc: 1,
    },
};
const adjForms = [
    "Empire",
    "Sultanate",
    "Khaganate",
    "Shogunate",
    "Caliphate",
    "Despotate",
    "Theocracy",
    "Oligarchy",
    "Union",
    "Confederation",
    "Trade Company",
    "League",
    "Tetrarchy",
    "Triumvirate",
    "Diarchy",
    "Horde",
    "Marches",
];
const innColors = [
    "Dark",
    "Light",
    "Bright",
    "Golden",
    "White",
    "Black",
    "Red",
    "Pink",
    "Purple",
    "Blue",
    "Green",
    "Yellow",
    "Amber",
    "Orange",
    "Brown",
    "Grey",
];
const animals = [
    "Antelope",
    "Ape",
    "Badger",
    "Bear",
    "Beaver",
    "Bison",
    "Boar",
    "Buffalo",
    "Cat",
    "Crane",
    "Crocodile",
    "Crow",
    "Deer",
    "Dog",
    "Eagle",
    "Elk",
    "Fox",
    "Goat",
    "Goose",
    "Hare",
    "Hawk",
    "Heron",
    "Horse",
    "Hyena",
    "Ibis",
    "Jackal",
    "Jaguar",
    "Lark",
    "Leopard",
    "Lion",
    "Mantis",
    "Marten",
    "Moose",
    "Mule",
    "Narwhal",
    "Owl",
    "Panther",
    "Rat",
    "Raven",
    "Rook",
    "Scorpion",
    "Shark",
    "Sheep",
    "Snake",
    "Spider",
    "Swan",
    "Tiger",
    "Turtle",
    "Wolf",
    "Wolverine",
    "Camel",
    "Falcon",
    "Hound",
    "Ox",
];
const adjectives = [
    "New",
    "Good",
    "High",
    "Old",
    "Great",
    "Big",
    "Major",
    "Happy",
    "Main",
    "Huge",
    "Far",
    "Beautiful",
    "Fair",
    "Prime",
    "Ancient",
    "Golden",
    "Proud",
    "Lucky",
    "Fat",
    "Honest",
    "Giant",
    "Distant",
    "Friendly",
    "Loud",
    "Hungry",
    "Magical",
    "Superior",
    "Peaceful",
    "Frozen",
    "Divine",
    "Favorable",
    "Brave",
    "Sunny",
    "Flying",
];
const methods = [
    "Boiled",
    "Grilled",
    "Roasted",
    "Spit-roasted",
    "Stewed",
    "Stuffed",
    "Jugged",
    "Mashed",
    "Baked",
    "Braised",
    "Poached",
    "Marinated",
    "Pickled",
    "Smoked",
    "Dried",
    "Dry-aged",
    "Corned",
    "Fried",
    "Pan-fried",
    "Deep-fried",
    "Dressed",
    "Steamed",
    "Cured",
    "Syrupped",
    "Flame-Broiled",
];
const courses = [
    "beef",
    "pork",
    "bacon",
    "chicken",
    "lamb",
    "chevon",
    "hare",
    "rabbit",
    "hart",
    "deer",
    "antlers",
    "bear",
    "buffalo",
    "badger",
    "beaver",
    "turkey",
    "pheasant",
    "duck",
    "goose",
    "teal",
    "quail",
    "pigeon",
    "seal",
    "carp",
    "bass",
    "pike",
    "catfish",
    "sturgeon",
    "escallop",
    "pie",
    "cake",
    "pottage",
    "pudding",
    "onions",
    "carrot",
    "potato",
    "beet",
    "garlic",
    "cabbage",
    "eggplant",
    "eggs",
    "broccoli",
    "zucchini",
    "pepper",
    "olives",
    "pumpkin",
    "spinach",
    "peas",
    "chickpea",
    "beans",
    "rice",
    "pasta",
    "bread",
    "apples",
    "peaches",
    "pears",
    "melon",
    "oranges",
    "mango",
    "tomatoes",
    "cheese",
    "corn",
    "rat tails",
    "pig ears",
];
const types = [
    "hot",
    "cold",
    "fire",
    "ice",
    "smoky",
    "misty",
    "shiny",
    "sweet",
    "bitter",
    "salty",
    "sour",
    "sparkling",
    "smelly",
];
const drinks = [
    "wine",
    "brandy",
    "jinn",
    "whisky",
    "rom",
    "beer",
    "cider",
    "mead",
    "liquor",
    "spirit",
    "vodka",
    "tequila",
    "absinthe",
    "nectar",
    "milk",
    "kvass",
    "kumis",
    "tea",
    "water",
    "juice",
    "sap",
];
const monsterAdjectives = [
    "great",
    "big",
    "huge",
    "prime",
    "golden",
    "proud",
    "lucky",
    "fat",
    "giant",
    "hungry",
    "magical",
    "superior",
    "terrifying",
    "horrifying",
    "feared",
];
const subjects = [
    "Locals",
    "Elders",
    "Inscriptions",
    "Tipplers",
    "Legends",
    "Whispers",
    "Rumors",
    "Journeying folk",
    "Tales",
];
const species = [
    "Ogre",
    "Troll",
    "Cyclops",
    "Giant",
    "Monster",
    "Beast",
    "Dragon",
    "Undead",
    "Ghoul",
    "Vampire",
    "Hag",
    "Banshee",
    "Bearded Devil",
    "Roc",
    "Hydra",
    "Warg",
];
const modusOperandi = [
    "steals cattle at night",
    "prefers eating children",
    "doesn't mind of human flesh",
    "keeps the region at bay",
    "eats kids whole",
    "abducts young women",
    "terrorizes the region",
    "harasses travelers in the area",
    "snatches people from homes",
    "attacks anyone who dares to approach its lair",
    "attacks unsuspecting victims",
];
const icons = [
    "🐴",
    "🏇",
    "🎎",
    "👥",
    "🏴‍☠️",
    "⚔️",
    "🏹",
    "🗡️",
    "🍻",
    "🍺",
    "🛌",
    "🏯",
    "🗝️",
    "🕳️",
    "icon-dungeon",
    "icon-ruins",
    "⛏️",
    "💎",
    "🌋",
    "icon-lighthouse",
    "💀",
    "☠️",
    "🐉",
    "🦑",
    "icon-dragon",
    "icon-hag",
    "icon-devil",
    "icon-banshee",
    "icon-giant",
    "icon-beast",
    "icon-hydra",
    "icon-warg",
    "📍",
    "🚩",
    "🏳️",
    "🏴",
    "☣️",
    "☢️",
    "🔎",
    "💣",
    "🌊",
    "🎯",
    "⚓",
    "🔮",
    "📯",
    "⚒️",
    "🛡️",
    "👑",
    "⚜️",
    "🕸️",
    "🔪",
    "🐾",
    "🎪",
    "🏰",
    "🎭",
    "🙏",
    "🎲",
    "💍",
    "⚗️",
    "📕",
    "📜",
    "🔔",
    "🔥",
    "⚡",
    "❄️",
    "🧱",
    "⏳",
];
const typedIcons = [
    { icon: "🐴", type: "Party" },
    { icon: "🏇", type: "Party" },
    { icon: "🎎", type: "Party" },
    { icon: "👥", type: "Party" },
    { icon: "🏴‍☠️", type: "Pirates" },
    { icon: "⚔️", type: "Brigands" },
    { icon: "🏹", type: "Brigands" },
    { icon: "🗡️", type: "Brigands" },
    { icon: "🍻", type: "Tavern" },
    { icon: "🍺", type: "Tavern" },
    { icon: "🛌", type: "Inn" },
    { icon: "🏯", type: "Inn" },
    { icon: "🗝️", type: "Dungeon" },
    { icon: "🕳️", type: "Dungeon" },
    { icon: "icon-dungeon", type: "Dungeon" },
    { icon: "icon-ruins", type: "Ruins" },
    { icon: "⛏️", type: "Mine" },
    { icon: "💎", type: "Mine" },
    { icon: "🌋", type: "Volcano" },
    { icon: "icon-lighthouse", type: "Lighthouse" },
    { icon: "💀", type: "Monster" },
    { icon: "☠️", type: "Monster" },
    { icon: "🐉", type: "Monster" },
    { icon: "🦑", type: "Monster" },
    { icon: "icon-dragon", type: "Dragon" },
    { icon: "icon-hag", type: "Hag" },
    { icon: "icon-devil", type: "Devil" },
    { icon: "icon-banshee", type: "Banshee" },
    { icon: "icon-giant", type: "Giant" },
    { icon: "icon-beast", type: "Beast" },
    { icon: "icon-hydra", type: "Hydra" },
    { icon: "icon-warg", type: "Warg" },
    { icon: "📍", type: "Marker" },
    { icon: "🚩", type: "Marker" },
    { icon: "🏳️", type: "Marker" },
    { icon: "🏴", type: "Marker" },
    { icon: "☣️", type: "Marker" },
    { icon: "☢️", type: "Marker" },
    { icon: "🔎", type: "Marker" },
    { icon: "💣", type: "Marker" },
    { icon: "🌊", type: "Marker" },
    { icon: "🎯", type: "Marker" },
    { icon: "⚓", type: "Marker" },
    { icon: "🔮", type: "Marker" },
    { icon: "📯", type: "Marker" },
    { icon: "⚒️", type: "Marker" },
    { icon: "🛡️", type: "Marker" },
    { icon: "👑", type: "Marker" },
    { icon: "⚜️", type: "Marker" },
    { icon: "🕸️", type: "Marker" },
    { icon: "🔪", type: "Marker" },
    { icon: "🐾", type: "Marker" },
    { icon: "🎪", type: "Marker" },
    { icon: "🏰", type: "Marker" },
    { icon: "🎭", type: "Marker" },
    { icon: "🙏", type: "Marker" },
    { icon: "🎲", type: "Marker" },
    { icon: "💍", type: "Marker" },
    { icon: "⚗️", type: "Marker" },
    { icon: "📕", type: "Marker" },
    { icon: "📜", type: "Marker" },
    { icon: "🔔", type: "Marker" },
    { icon: "🔥", type: "Marker" },
    { icon: "⚡", type: "Marker" },
    { icon: "❄️", type: "Marker" },
    { icon: "🧱", type: "Marker" },
    { icon: "⏳", type: "Marker" },
];
const climates = [
    [-15, 10, -8, 5],
    [-20, 20, -11, 11],
    [-25, 25, -14, 14],
    [-15, 15, -8, 8],
    [-15, 15, -8, 8],
    [-20, 15, -11, 8],
    [-15, 15, -8, 8],
    [-20, 15, -11, 8],
    [-15, 15, -8, 8],
    [-15, 15, -8, 8],
    [-25, 25, -14, 14],
    [-25, 25, -14, 14],
    [-15, 10, -8, 5],
];
const climateNames = [
    "Marine",
    "Hot desert",
    "Cold desert",
    "Savanna",
    "Grassland",
    "Tropical seasonal forest",
    "Temperate deciduous forest",
    "Tropical rainforest",
    "Temperate rainforest",
    "Taiga",
    "Tundra",
    "Glacier",
    "Wetland",
];
const colors = {
    argent: "#fafafa",
    or: "#ffe066",
    gules: "#d7374a",
    sable: "#333333",
    azure: "#377cd7",
    vert: "#26c061",
    purpure: "#522d5b",
    murrey: "#85185b",
    sanguine: "#b63a3a",
    tenné: "#cc7f19",
};
const lines = {
    straight: "m 0,100 v15 h 200 v -15 z",
    engrailed: "m 0,95 a 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 6.25,6.25 0 0 0 12.5,0 v 20 H 0 Z",
    invecked: "M0,102.5 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 a6.25,6.25,0,0,1,12.5,0 v12.5 H0 z",
    embattled: "M 0,105 H 2.5 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 15 V 95 h 15 v 10 h 2.5 v 10 H 0 Z",
    wavy: "m 200,115 v -15 c -8.9,3.5 -16,3.1 -25,0 -8.9,-3.5 -16,-3.1 -25,0 -8.9,3.5 -16,3.2 -25,0 -8.9,-3.5 -16,-3.2 -25,0 -8.9,3.5 -16,3.1 -25,0 -8.9,-3.5 -16,-3.1 -25,0 -8.9,3.5 -16,3.2 -25,0 -8.9,-3.5 -16,-3.2 -25,0 v 15 z",
    raguly: "m 200,95 h -3 l -5,10 h -10 l 5,-10 h -10 l -5,10 h -10 l 5,-10 h -10 l -5,10 h -10 l 5,-10 h -10 l -5,10 h -10 l 5,-10 h -10 l -5,10 h -10 l 5,-10 H 97 l -5,10 H 82 L 87,95 H 77 l -5,10 H 62 L 67,95 H 57 l -5,10 H 42 L 47,95 H 37 l -5,10 H 22 L 27,95 H 17 l -5,10 H 2 L 7,95 H 0 v 20 h 200 z",
    dancetty: "m 0,105 10,-15 15,20 15,-20 15,20 15,-20 15,20 15,-20 15,20 15,-20 15,20 15,-20 15,20 15,-20 10,15 v 10 H 0 Z",
    dentilly: "M 180,105 170,95 v 10 L 160,95 v 10 L 150,95 v 10 L 140,95 v 10 L 130,95 v 10 L 120,95 v 10 L 110,95 v 10 L 100,95 v 10 L 90,95 v 10 L 80,95 v 10 L 70,95 v 10 L 60,95 v 10 L 50,95 v 10 L 40,95 v 10 L 30,95 v 10 L 20,95 v 10 L 10,95 v 10 L 0,95 v 20 H 200 V 105 L 190,95 v 10 L 180,95 Z",
    angled: "m 0,95 h 100 v 10 h 100 v 10 H 0 Z",
    urdy: "m 200,90 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,6 -5,-6 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,6 -5,-6 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 l -5,-5 -5,5 v 10 l -5,5 -5,-5 V 95 L 0,90 v 25 h 200",
    indented: "m 100,95 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 v 20 H 0 V 95 l 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 5,-10 5,10 z",
    bevilled: "m 0,92.5 h 110 l -20,15 H 200 V 115 H 0 Z",
    nowy: "m 0,95 h 80 c 0,0 0.1,20.1 20,20 19.9,-0.1 20,-20 20,-20 h 80 v 20 H 0 Z",
    nowyReversed: "m 200,105 h -80 c 0,0 -0.1,-20.1 -20,-20 -19.9,0.1 -20,20 -20,20 H 0 v 10 h 200 z",
    potenty: "m 3,95 v 5 h 5 v 5 H 0 v 10 h 200 l 0.5,-10 H 193 v -5 h 5 v -5 h -15 v 5 h 5 v 5 h -15 v -5 h 5 v -5 h -15 v 5 h 5 v 5 h -15 v -5 h 5 v -5 h -15 v 5 h 5 v 5 h -15 v -5 h 5 v -5 h -15 v 5 h 5 v 5 h -15 v -5 h 5 v -5 h -15 v 5 h 5 v 5 H 100.5 93 v -5 h 5 V 95 H 83 v 5 h 5 v 5 H 73 v -5 h 5 V 95 H 63 v 5 h 5 v 5 H 53 v -5 h 5 V 95 H 43 v 5 h 5 v 5 H 33 v -5 h 5 V 95 H 23 v 5 h 5 v 5 H 13 v -5 h 5 v -5 z",
    potentyDexter: "m 200,105 h -2 v -10 0 0 h -10 v 5 h 5 v 5 H 183 V 95 h -10 v 5 h 5 v 5 H 168 V 95 h -10 v 5 h 5 v 5 H 153 V 95 h -10 v 5 h 5 v 5 H 138 V 95 h -10 v 5 h 5 v 5 H 123 V 95 h -10 v 5 h 5 v 5 h -10 v 0 0 -10 H 98 v 5 h 5 v 5 H 93 V 95 H 83 v 5 h 5 v 5 H 78 V 95 H 68 v 5 h 5 v 5 H 63 V 95 H 53 v 5 h 5 v 5 H 48 V 95 H 38 v 5 h 5 v 5 H 33 V 95 H 23 v 5 h 5 v 5 H 18 V 95 H 8 v 5 h 5 v 5 H 3 V 95 H 0 v 20 h 200 z",
    potentySinister: "m 2.5,95 v 10 H 0 v 10 h 202.5 v -15 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 h -10 v 10 h -10 v -5 h 5 v -5 z",
    embattledGhibellin: "M 200,200 V 100 l -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 -5,-5 v 10 l -5,-5 -5,5 V 95 l -5,5 v 15 h 200",
    embattledNotched: "m 200,105 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 h -5 V 95 l -5,5 -5,-5 v 10 H 90 V 95 l -5,5 -5,-5 v 10 H 75 V 95 l -5,5 -5,-5 v 10 H 60 V 95 l -5,5 -5,-5 v 10 H 45 V 95 l -5,5 -5,-5 v 10 H 30 V 95 l -5,5 -5,-5 v 10 H 15 V 95 l -5,5 -5,-5 v 10 H 0 v 10 h 200",
    embattledGrady: "m 0,95 v 20 H 200 V 95 h -2.5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 5 h -5 v -5 h -5 v -5 z",
    dovetailed: "m 200,95 h -7 l 4,10 h -14 l 4,-10 h -14 l 4,10 h -14 l 4,-10 h -14 l 4,10 h -14 l 4,-10 h -14 l 4,10 h -14 l 4,-10 h -14 l 4,10 h -14 l 4,-10 H 93 l 4,10 H 83 L 87,95 H 73 l 4,10 H 63 L 67,95 H 53 l 4,10 H 43 L 47,95 H 33 l 4,10 H 23 L 27,95 H 13 l 4,10 H 3 L 7,95 H 0 v 20 h 200",
    dovetailedIndented: "m 200,100 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 -7,-5 4,10 -7,-5 -7,5 4,-10 -7,5 v 15 h 200",
    nebuly: "m 13.1,89.8 c -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.2,4.5 -7.3,4.5 -0.5,0 -2.2,-0.2 -2.2,-0.2 V 115 h 200 v -10.1 c -3.7,-0.2 -6.7,-2.2 -6.7,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.8,-1.9 1.8,-3.1 0,-2.5 -3.2,-4.5 -7.2,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.8,-1.9 1.8,-3.1 0,-2.5 -3.2,-4.5 -7.2,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 -1.5,4.1 -4.2,4.4 -8.8,4.5 -4.7,-0.1 -8.7,-1.5 -8.9,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 -4.1,0 -7.3,2 -7.3,4.5 0,1.2 0.7,2.3 1.8,3.1 1.2,0.7 1.9,1.8 1.9,3 0,2.5 -3.3,4.5 -7.3,4.5 -4,0 -7.3,-2 -7.3,-4.5 0,-1.2 0.7,-2.3 1.9,-3 1.2,-0.8 1.9,-1.9 1.9,-3.1 0,-2.5 -3.3,-4.5 -7.3,-4.5 z",
    rayonne: "M0 115l-.1-6 .2.8c1.3-1 2.3-2.5 2.9-4.4.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4A9 9 0 015.5 90c-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 2.1 3.1 3.1 4.6 1 1.6 2.4 3.1 2.7 4.8.3 1.7.3 3.3 0 5.2 1.3-1 2.6-2.7 3.2-4.6.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.5 2 1.7 3.6 3.1 4.6a9 9 0 013.1 4.6c.5 2 .4 3.9-.3 5.4a9 9 0 003.1-4.6c.5-2 .4-3.9-.3-5.4-.7-1.5-.8-3.4-.3-5.4.5-2 1.7-3.6 3.1-4.6-.7 1.5-.8 3.4-.3 5.4.75 2.79 2.72 4.08 4.45 5.82L200 115z",
    seaWaves: "m 28.83,94.9 c -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.44,-3.6 3.6,-3.6 0.7,0 1.36,0.17 1.93,0.48 -0.33,-2.03 -2.19,-3.56 -4.45,-3.56 -4.24,0 -6.91,3.13 -8.5,5.13 V 115 h 200 v -14.89 c -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.2,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.21,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.21,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.2,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.44,-3.6 3.6,-3.6 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.21,-3.55 -4.46,-3.55 -4.25,0 -6.6,3.09 -8.19,5.09 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.21,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.2,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.2,-3.55 -4.46,-3.55 -4.25,0 -7.16,3.17 -8.75,5.18 -1.59,2.01 -4.5,5.18 -8.75,5.18 -2.16,0 -3.91,-1.63 -3.91,-3.64 0,-2.01 1.75,-3.64 3.91,-3.64 0.7,0 1.36,0.17 1.93,0.48 -0.34,-2.01 -2.21,-3.55 -4.46,-3.55 z",
    dragonTeeth: "M 9.4,85 C 6.5,88.1 4.1,92.9 3,98.8 1.9,104.6 2.3,110.4 3.8,115 2.4,113.5 0,106.6 0,109.3 v 5.7 h 200 v -5.7 c -1.1,-2.4 -2,-5.1 -2.6,-8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.9 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.9 -0.7,11.6 0.8,16.2 -1.4,-1.5 -2.8,-3.9 -3.8,-6.1 -1.1,-2.4 -2.3,-6.1 -2.6,-7.7 -0.2,-5.9 0.2,-11.7 1.7,-16.3 -3,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.8 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1,-5.8 -0.7,-11.6 0.9,-16.2 -3,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.8 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.8 -0.7,-11.6 0.9,-16.2 -3,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.8 -0.7,11.6 0.8,16.2 -2.9,-3.1 -5.3,-7.9 -6.4,-13.8 C 63,95.4 63.4,89.6 64.9,85 c -2.9,3.1 -5.3,7.9 -6.3,13.8 -1.1,5.8 -0.7,11.6 0.8,16.2 -3,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.8 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1,5.8 -0.6,11.6 0.9,16.2 -3,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.8 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1,5.8 -0.7,11.6 0.9,16.2 -3,-3.1 -5.3,-7.9 -6.4,-13.8 -1.1,-5.8 -0.7,-11.6 0.8,-16.2 -2.9,3.1 -5.3,7.9 -6.4,13.8 -1.1,5.8 -0.7,11.6 0.9,16.2 -3,-3.1 -5.3,-7.9 -6.4,-13.8 C 18.6,95.4 19,89.6 20.5,85 17.6,88.1 15.2,92.9 14.1,98.8 13,104.6 13.4,110.4 14.9,115 12,111.9 9.6,107.1 8.6,101.2 7.5,95.4 7.9,89.6 9.4,85 Z",
    firTrees: "m 3.9,90 -4,7 2,-0.5 L 0,100 v 15 h 200 v -15 l -1.9,-3.5 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4.1,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4.1,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 -4,-7 -4,7 2,-0.5 -4,7 2,-0.5 -4,7 -4,-7 2,0.5 -4,-7 2,0.5 z",
    flechy: "m 0,100 h 85 l 15,-15 15,15 h 85 v 15 H 0 Z",
    barby: "m 0,100 h 85 l 15,15 15,-15 h 85 v 15 H 0 Z",
    enclavy: "M 0,100 H 85 V 85 h 30 v 15 h 85 v 15 H 0 Z",
    escartely: "m 0,100 h 85 v 15 h 30 v -15 h 85 v 15 H 0 Z",
    arched: "m 100,95 c 40,-0.2 100,20 100,20 H 0 c 0,0 60,-19.8 100,-20 z",
    archedReversed: "m 0,85 c 0,0 60,20.2 100,20 40,-0.2 100,-20 100,-20 v 30 H 0 Z",
};


/***/ }),

/***/ 7114:
/*!***************************************************************!*\
  !*** ./angular/app/shared/customizer/customizer.component.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomizerComponent": function() { return /* binding */ CustomizerComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/config.service */ 47107);
/* harmony import */ var _services_customizer_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/customizer.service */ 90775);
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-perfect-scrollbar */ 99904);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 12057);






const _c0 = ["customizer"];
const _c1 = function (a0) { return { "selected": a0 }; };
function CustomizerComponent_div_68_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_div_68_Template_span_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r9); const color_r7 = restoredCtx.$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r8.customizerService.changeSidebarBGColor(color_r7); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const color_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("", color_r7.class, " d-block rounded");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c1, color_r7.active));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-bg-color", color_r7.code);
} }
function CustomizerComponent_div_70_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_div_70_Template_span_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12); const color_r10 = restoredCtx.$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r11.customizerService.changeSidebarBGColor(color_r10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const color_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("", color_r10.class, " d-block rounded");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c1, color_r10.active));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-bg-color", color_r10.code);
} }
function CustomizerComponent_div_77_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_div_77_Template_div_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r15); const color_r13 = restoredCtx.$implicit; const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r14.customizerService.changeSidebarTransparentBGColor(color_r13); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const color_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("rounded ", color_r13.class, " ct-glass-bg");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c1, color_r13.active));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-bg-image", color_r13.class);
} }
function CustomizerComponent_div_85_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "img", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_div_85_Template_img_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r18); const img_r16 = restoredCtx.$implicit; const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r17.customizerService.changeSidebarBgImage(img_r16); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const img_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", img_r16.src, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"])("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](2, _c1, img_r16.active));
} }
function CustomizerComponent_div_93_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_div_93_Template_span_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r21); const color_r19 = restoredCtx.$implicit; const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r20.customizerService.changeSidebarTransparentBGColor(color_r19); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const color_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("", color_r19.class, " d-block rounded  ct-color-bg");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c1, color_r19.active));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-bg-color", color_r19.class);
} }
const _c2 = function (a0) { return { "active": a0 }; };
function CustomizerComponent_div_114_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Sidebar Width");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "label", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "input", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CustomizerComponent_div_114_Template_input_change_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r23); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r22.changeSidebarWidth("sidebar-sm"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Small");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "label", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "input", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CustomizerComponent_div_114_Template_input_change_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r23); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r24.changeSidebarWidth("sidebar-md"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Medium");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "label", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "input", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CustomizerComponent_div_114_Template_input_change_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r23); const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r25.changeSidebarWidth("sidebar-lg"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Large");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](6, _c2, ctx_r6.size === "sidebar-sm"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx_r6.size === "sidebar-sm");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](8, _c2, ctx_r6.size === "sidebar-md"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx_r6.size === "sidebar-md");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](10, _c2, ctx_r6.size === "sidebar-lg"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx_r6.size === "sidebar-lg");
} }
class CustomizerComponent {
    constructor(renderer, configService, customizerService) {
        this.renderer = renderer;
        this.configService = configService;
        this.customizerService = customizerService;
        this.isBgImageDisplay = true;
        this.isOpen = true;
        this.config = {};
        this.directionEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
        this.config = this.configService.templateConf;
        this.isOpen = !this.config.layout.customizer.hidden;
        if (this.config.layout.sidebar.size) {
            this.size = this.config.layout.sidebar.size;
        }
    }
    ngOnInit() {
    }
    changeSidebarWidth(value) {
        this.size = value;
        this.customizerService.changeSidebarWidth(value);
    }
    toggleCustomizer() {
        if (this.isOpen) {
            this.renderer.removeClass(this.customizer.nativeElement, "open");
            this.isOpen = false;
        }
        else {
            this.renderer.addClass(this.customizer.nativeElement, "open");
            this.isOpen = true;
        }
    }
    closeCustomizer() {
        this.renderer.removeClass(this.customizer.nativeElement, "open");
        this.isOpen = false;
    }
    bgImageDisplay(e) {
        if (e.target.checked) {
            this.isBgImageDisplay = true;
        }
        else {
            this.isBgImageDisplay = false;
        }
        //emit event to FUll Layout
        this.customizerService.bgImageDisplay(e);
    }
    ngOnDestroy() {
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
    }
}
CustomizerComponent.ɵfac = function CustomizerComponent_Factory(t) { return new (t || CustomizerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_0__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_customizer_service__WEBPACK_IMPORTED_MODULE_1__.CustomizerService)); };
CustomizerComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: CustomizerComponent, selectors: [["app-customizer"]], viewQuery: function CustomizerComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.customizer = _t.first);
    } }, outputs: { directionEvent: "directionEvent" }, decls: 115, vars: 16, consts: [[1, "customizer", "d-none", "d-lg-none", "d-xl-block"], ["customizer", ""], [1, "customizer-close", 3, "click"], [1, "ft-x", "font-medium-3"], ["id", "customizer-toggle-icon", 1, "customizer-toggle", "bg-primary", 3, "click"], [1, "ft-settings", "font-medium-1", "spinner", "white", "align-middle"], ["data-ps-id", "df6a5ce4-a175-9172-4402-dabd98fc9c0a", 1, "customizer-content", "p-3", "ps-container", "ps-theme-dark", 3, "perfectScrollbar"], [1, "text-uppercase"], [1, "ct-layout"], [1, "mb-3", "d-flex", "align-items-center"], [1, "ft-layout", "font-medium-2", "mr-2"], [1, "layout-switch"], [1, "radio", "radio-sm", "d-inline-block", "light-layout", "mr-3"], ["id", "ll-switch", "type", "radio", "name", "layout-switch", 3, "checked", "click"], ["for", "ll-switch"], [1, "radio", "radio-sm", "d-inline-block", "dark-layout", "mr-3"], ["id", "dl-switch", "type", "radio", "name", "layout-switch", 3, "checked", "click"], ["for", "dl-switch"], [1, "radio", "radio-sm", "d-inline-block", "transparent-layout"], ["id", "tl-switch", "type", "radio", "name", "layout-switch", 3, "checked", "click"], ["for", "tl-switch"], [1, "ct-menu-type"], [1, "ft-credit-card", "font-medium-2", "mr-2"], [1, "menu-switch"], [1, "radio", "radio-sm", "d-inline-block", "menu-side", "mr-3"], ["id", "menu-side", "type", "radio", "name", "menu-switch", 3, "checked", "click"], ["for", "menu-side"], [1, "radio", "radio-sm", "d-inline-block", "menu-top"], ["id", "menu-top", "type", "radio", "name", "menu-switch", 3, "checked", "click"], ["for", "menu-top"], [1, "ct-navbar-type"], [1, "ft-more-horizontal", "font-medium-2", "mr-2"], [1, "navbar-switch"], [1, "radio", "radio-sm", "d-inline-block", "nav-static", "mr-3"], ["id", "nav-static", "type", "radio", "name", "navbar-switch", 3, "checked", "click"], ["for", "nav-static"], [1, "radio", "radio-sm", "d-inline-block", "nav-fixed"], ["id", "nav-fixed", "type", "radio", "name", "navbar-switch", 3, "checked", "click"], ["for", "nav-fixed"], [1, "ct-bg-color"], [1, "sb-options", "d-flex", "align-items-center", "mb-3"], [1, "ft-droplet", "font-medium-2", "mr-2"], [1, "cz-bg-color", "sb-color-options"], [1, "row", "mb-3"], ["class", "col px-2", 4, "ngFor", "ngForOf"], [1, "row"], [1, "tl-bg-img"], [1, "d-flex", "align-items-center", "mb-3"], [1, "ft-star", "font-medium-2", "mr-2"], [1, "cz-tl-bg-image", "row"], ["class", "col-sm-3", 4, "ngFor", "ngForOf"], [1, "ct-bg-image"], [1, "sb-bg-img", "d-flex", "align-items-center", "mb-3"], [1, "ft-sidebar", "font-medium-2", "mr-2"], [1, "cz-bg-image", "row", "sb-bg-img"], ["class", "col-2 px-2", 4, "ngFor", "ngForOf"], [1, "tl-color-option"], [1, "tl-color-options", "d-flex", "align-items-center", "mb-3"], [1, "cz-tl-bg-color"], ["class", "col", 4, "ngFor", "ngForOf"], [1, "ct-bg-image-toggler"], [1, "togglebutton", "toggle-sb-bg-img"], [1, "float-right"], [1, "checkbox"], ["id", "sidebar-bg-img", "type", "checkbox", "checked", "", 1, "cz-bg-image-display", 3, "change"], ["for", "sidebar-bg-img"], [1, "ct-compact-toggler"], [1, "togglebutton"], ["id", "cz-compact-menu", "type", "checkbox", 1, "cz-compact-menu", 3, "checked", "change"], ["for", "cz-compact-menu"], ["class", "ct-sidebar-size", 4, "ngIf"], [1, "col", "px-2"], [2, "width", "30px", "height", "30px", 3, "ngClass", "click"], [1, "col-sm-3"], [3, "ngClass", "click"], [1, "col-2", "px-2"], ["alt", "sidebar bg image", "width", "90", 1, "rounded", 3, "src", "ngClass", "click"], [1, "col"], [1, "ct-sidebar-size"], ["id", "cz-sidebar-width", "data-toggle", "buttons", 1, "cz-sidebar-width", "btn-group", "btn-group-toggle"], [1, "btn", "btn-outline-primary", 3, "ngClass"], ["id", "cz-btn-radio-1", "type", "radio", "name", "cz-btn-radio", "value", "sidebar-sm", 3, "checked", "change"], ["id", "cz-btn-radio-2", "type", "radio", "name", "cz-btn-radio", "value", "sidebar-md", 3, "checked", "change"], ["id", "cz-btn-radio-3", "type", "radio", "name", "cz-btn-radio", "value", "sidebar-lg", 3, "checked", "change"]], template: function CustomizerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_a_click_2_listener() { return ctx.closeCustomizer(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "i", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_a_click_4_listener() { return ctx.toggleCustomizer(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "i", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "h4", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Theme Customizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Customize & Preview in Real Time");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "h6", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](14, "i", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Layout Options");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_input_click_19_listener() { return ctx.customizerService.switchLayout("light", ctx.isBgImageDisplay); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "label", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Light");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_input_click_23_listener() { return ctx.customizerService.switchLayout("dark", ctx.isBgImageDisplay); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "label", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "Dark");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_input_click_27_listener() { return ctx.customizerService.switchLayout("transparent", ctx.isBgImageDisplay); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "label", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](29, "Transparent");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](31, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "h6", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](33, "i", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35, "Navigation Options");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](38, "input", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_input_click_38_listener() { return ctx.customizerService.toggleMenuPosition("Side"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "label", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40, "Vertical");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "input", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_input_click_42_listener() { return ctx.customizerService.toggleMenuPosition("Top"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "label", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](44, "Horizontal");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](46, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](47, "h6", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](48, "i", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](49, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](50, "Navbar Type");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](51, "div", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](52, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](53, "input", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_input_click_53_listener() { return ctx.customizerService.toggleNavbarType("Static"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](54, "label", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](55, "Static");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](56, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](57, "input", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_input_click_57_listener() { return ctx.customizerService.toggleNavbarType("Fixed"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](58, "label", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](59, "Fixed");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](60, "div", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](61, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](62, "h6", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](63, "i", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](64, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](65, "Sidebar Color Options");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](66, "div", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](67, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](68, CustomizerComponent_div_68_Template, 2, 7, "div", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](69, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](70, CustomizerComponent_div_70_Template, 2, 7, "div", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](71, "div", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](72, "h6", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](73, "i", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](74, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](75, "Background Colors with Shades");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](76, "div", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](77, CustomizerComponent_div_77_Template, 2, 7, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](78, "div", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](79, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](80, "h6", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](81, "i", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](82, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](83, "Sidebar Bg Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](84, "div", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](85, CustomizerComponent_div_85_Template, 2, 4, "div", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](86, "div", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](87, "h6", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](88, "i", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](89, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](90, "Background Colors");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](91, "div", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](92, "div", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](93, CustomizerComponent_div_93_Template, 2, 7, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](94, "div", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](95, "div", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](96, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](97, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](98, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](99, "Sidebar Bg Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](100, "div", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](101, "div", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](102, "input", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CustomizerComponent_Template_input_change_102_listener($event) { return ctx.bgImageDisplay($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](103, "label", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](104, "div", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](105, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](106, "div", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](107, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](108, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](109, "Compact Menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](110, "div", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](111, "div", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](112, "input", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CustomizerComponent_Template_input_change_112_listener($event) { return ctx.customizerService.toggleCompactMenu($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](113, "label", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](114, CustomizerComponent_div_114_Template, 17, 12, "div", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("open", ctx.isOpen);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx.config.layout.variant === "Light");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx.config.layout.variant === "Dark");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx.config.layout.variant === "Transparent");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx.config.layout.menuPosition === "Side");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx.config.layout.menuPosition === "Top");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx.config.layout.navbar.type === "Static");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx.config.layout.navbar.type === "Fixed");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.customizerService.lightDarkLayoutGradientBGColors);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.customizerService.lightDarkLayoutSolidBGColors);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.customizerService.transparentLayoutBGColorsWithShades);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.customizerService.lightDarkLayoutBGImages);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.customizerService.transparentLayoutBGColors);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", ctx.config.layout.sidebar.collapsed);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.config.layout.sidebar.collapsed);
    } }, directives: [ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_3__.PerfectScrollbarDirective, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjdXN0b21pemVyLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 60252:
/*!**************************************************************************!*\
  !*** ./angular/app/shared/directives/sidebar-anchor-toggle.directive.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SidebarAnchorToggleDirective": function() { return /* binding */ SidebarAnchorToggleDirective; }
/* harmony export */ });
/* harmony import */ var _sidebar_link_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar-link.directive */ 92489);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 74788);



class SidebarAnchorToggleDirective {
    constructor(navlink) {
        this.navlink = navlink;
    }
    onClick() {
        this.navlink.toggle();
    }
}
SidebarAnchorToggleDirective.ɵfac = function SidebarAnchorToggleDirective_Factory(t) { return new (t || SidebarAnchorToggleDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_sidebar_link_directive__WEBPACK_IMPORTED_MODULE_0__.SidebarLinkDirective)); };
SidebarAnchorToggleDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: SidebarAnchorToggleDirective, selectors: [["", "appSidebarAnchorToggle", ""]], hostBindings: function SidebarAnchorToggleDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SidebarAnchorToggleDirective_click_HostBindingHandler($event) { return ctx.onClick($event); });
    } } });


/***/ }),

/***/ 77663:
/*!*********************************************************************!*\
  !*** ./angular/app/shared/directives/sidebar-dropdown.directive.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SidebarDropdownDirective": function() { return /* binding */ SidebarDropdownDirective; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 3984);


class SidebarDropdownDirective {
    constructor(router) {
        this.router = router;
        this.navlinks = [];
    }
    ngOnInit() {
        //write your code here!
    }
}
SidebarDropdownDirective.ɵfac = function SidebarDropdownDirective_Factory(t) { return new (t || SidebarDropdownDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router)); };
SidebarDropdownDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: SidebarDropdownDirective, selectors: [["", "appSidebarDropdown", ""]] });


/***/ }),

/***/ 92489:
/*!*****************************************************************!*\
  !*** ./angular/app/shared/directives/sidebar-link.directive.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SidebarLinkDirective": function() { return /* binding */ SidebarLinkDirective; }
/* harmony export */ });
/* harmony import */ var _sidebar_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar.directive */ 17618);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 74788);



class SidebarLinkDirective {
    constructor(sideNav) {
        this.sideNav = sideNav;
    }
    get open() {
        return this._open;
    }
    set open(value) {
        this._open = value;
    }
    get sidebarGroupActive() {
        return this._sidebarGroupActive;
    }
    set sidebarGroupActive(value) {
        this._sidebarGroupActive = value;
    }
    get navCollapsedOpen() {
        return this._navCollapsedOpen;
    }
    set navCollapsedOpen(value) {
        this._navCollapsedOpen = value;
    }
    ngOnInit() {
        this.sideNav.addLink(this);
    }
    ngOnDestroy() { }
    //when side menu (vertical menu) item gets clicked
    toggle() {
        this.open = !this.open;
        if (this.open) {
            this.sideNav.closeOtherLinks(this);
        }
        if (!this.open && this.level.toString() === "1" && this.hasSub) {
            this.sidebarGroupActive = false;
        }
    }
}
SidebarLinkDirective.ɵfac = function SidebarLinkDirective_Factory(t) { return new (t || SidebarLinkDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_sidebar_directive__WEBPACK_IMPORTED_MODULE_0__.SidebarDirective)); };
SidebarLinkDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: SidebarLinkDirective, selectors: [["", "appSidebarlink", ""]], hostVars: 6, hostBindings: function SidebarLinkDirective_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("open", ctx.open)("sidebar-group-active", ctx.sidebarGroupActive)("nav-collapsed-open", ctx.navCollapsedOpen);
    } }, inputs: { parent: "parent", level: "level", hasSub: "hasSub", path: "path", open: "open", sidebarGroupActive: "sidebarGroupActive", navCollapsedOpen: "navCollapsedOpen" } });


/***/ }),

/***/ 17618:
/*!************************************************************!*\
  !*** ./angular/app/shared/directives/sidebar.directive.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SidebarDirective": function() { return /* binding */ SidebarDirective; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3984);
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/config.service */ 47107);
/* harmony import */ var _services_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/layout.service */ 60432);




class SidebarDirective {
    constructor(cdr, router, configService, layoutService) {
        this.cdr = cdr;
        this.router = router;
        this.configService = configService;
        this.layoutService = layoutService;
        this.navlinks = [];
        this.config = {};
        this.mouseEnter = false;
        this.sidebarExpanded = true;
        this.config = this.configService.templateConf;
        this.sidebarExpanded = !this.config.layout.sidebar.collapsed;
    }
    get navExpanded() {
        return this._navExpanded;
    }
    set navExpanded(value) {
        this._navExpanded = value;
    }
    ngOnInit() {
        this.innerWidth = window.innerWidth;
        this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
            if (templateConf) {
                this.config = templateConf;
            }
            this.loadLayout();
            this.cdr.markForCheck();
        });
    }
    ngOnDestroy() {
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
    }
    //load layout when changes in the config
    loadLayout() {
        this.sidebarExpanded = !this.config.layout.sidebar.collapsed;
        if (this.config.layout.sidebar.collapsed && !this.mouseEnter) {
            this.setSidebarGroupActiveCollapsed();
            this.navExpanded = false;
        }
        else {
            this.setSidebarGroupActive();
            this.navExpanded = true;
        }
    }
    //add menu links to the link list
    addLink(link) {
        this.navlinks.push(link);
    }
    //close all other menu items other than active one
    closeOtherLinks(openLink) {
        this.navlinks.forEach((link) => {
            if (link != openLink &&
                (openLink.level.toString() === "1" || link.level === openLink.level)) {
                link.open = false;
                link.sidebarGroupActive = false;
            }
            else if (link === openLink &&
                openLink.level.toString() === "1" &&
                link.hasSub === true) {
                link.sidebarGroupActive = true;
            }
            else if (link === openLink &&
                openLink.level.toString() === "1" &&
                link.hasSub === false) {
                link.sidebarGroupActive = false;
                link.open = false;
            }
            else if (link === openLink &&
                openLink.level.toString() != "1" &&
                link.hasSub === false) {
                link.open = false;
                link.sidebarGroupActive = false;
                return;
            }
        });
    }
    ngAfterViewInit() { }
    // call when sidebar toggle is collapsed but still in expand mode on mouse hover
    setSidebarGroupActive() {
        if (this.navlinks.length > 0) {
            this.navlinks.forEach((link) => {
                link.sidebarGroupActive = false;
                link.navCollapsedOpen = false;
            });
            let matched = this.navlinks.find((link) => link.path === this.router.url);
            if (matched) {
                let parent = this.navlinks.find((link) => link.parent === matched.parent &&
                    link.level.toString() === "1" &&
                    link.hasSub === true);
                if (parent) {
                    parent.sidebarGroupActive = true;
                    parent.navCollapsedOpen = false;
                    parent.open = true;
                }
            }
        }
    }
    // call when sidebar toggle is collapsed and is in collapse mode on mouse out
    setSidebarGroupActiveCollapsed() {
        this.closeOtherLinks(this.navlinks.find((link) => link.path === this.router.url));
        if (this.navlinks.length > 0) {
            this.navlinks.forEach((link) => {
                link.sidebarGroupActive = false;
                link.navCollapsedOpen = false;
            });
            let matched = this.navlinks.find((link) => link.path === this.router.url);
            if (matched) {
                let parent = this.navlinks.find((link) => link.parent === matched.parent &&
                    link.level.toString() === "1" &&
                    link.hasSub === true);
                if (parent) {
                    parent.sidebarGroupActive = true;
                    parent.navCollapsedOpen = true;
                    parent.open = false;
                }
            }
        }
    }
    // mouse enter event of side menu
    onMouseOver(e) {
        this.mouseEnter = true;
        if (this.config.layout.sidebar.collapsed) {
            this.setSidebarGroupActive();
            this.navExpanded = true;
        }
    }
    // mouse leave event of side menu
    onMouseOut(e) {
        this.mouseEnter = false;
        if (this.config.layout.sidebar.collapsed) {
            this.setSidebarGroupActiveCollapsed();
            this.navExpanded = false;
        }
    }
}
SidebarDirective.ɵfac = function SidebarDirective_Factory(t) { return new (t || SidebarDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_0__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService)); };
SidebarDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({ type: SidebarDirective, selectors: [["", "appSidebar", ""]], hostVars: 2, hostBindings: function SidebarDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("mouseenter", function SidebarDirective_mouseenter_HostBindingHandler($event) { return ctx.onMouseOver($event); })("mouseleave", function SidebarDirective_mouseleave_HostBindingHandler($event) { return ctx.onMouseOut($event); });
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("expanded", ctx.navExpanded);
    } }, inputs: { navExpanded: "navExpanded" } });


/***/ }),

/***/ 66763:
/*!**********************************************************************!*\
  !*** ./angular/app/shared/directives/toggle-fullscreen.directive.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToggleFullscreenDirective": function() { return /* binding */ ToggleFullscreenDirective; }
/* harmony export */ });
/* harmony import */ var screenfull__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! screenfull */ 79305);
/* harmony import */ var screenfull__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(screenfull__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 74788);


class ToggleFullscreenDirective {
    onClick() {
        if (screenfull__WEBPACK_IMPORTED_MODULE_0__.isEnabled) {
            screenfull__WEBPACK_IMPORTED_MODULE_0__.toggle();
        }
    }
}
ToggleFullscreenDirective.ɵfac = function ToggleFullscreenDirective_Factory(t) { return new (t || ToggleFullscreenDirective)(); };
ToggleFullscreenDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: ToggleFullscreenDirective, selectors: [["", "appToggleFullscreen", ""]], hostBindings: function ToggleFullscreenDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ToggleFullscreenDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } } });


/***/ }),

/***/ 24378:
/*!**************************************************************************!*\
  !*** ./angular/app/shared/directives/topmenu-anchor-toggle.directive.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TopMenuAnchorToggleDirective": function() { return /* binding */ TopMenuAnchorToggleDirective; }
/* harmony export */ });
/* harmony import */ var _topmenu_link_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./topmenu-link.directive */ 78819);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 74788);



class TopMenuAnchorToggleDirective {
    constructor(navlink) {
        this.navlink = navlink;
    }
    // @HostListener("click", ["$event"])
    // onClick() {
    //   this.navlink.toggle();
    // }
    onMouseOver(e) {
        this.navlink.openDropdown();
    }
}
TopMenuAnchorToggleDirective.ɵfac = function TopMenuAnchorToggleDirective_Factory(t) { return new (t || TopMenuAnchorToggleDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_topmenu_link_directive__WEBPACK_IMPORTED_MODULE_0__.TopMenuLinkDirective)); };
TopMenuAnchorToggleDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: TopMenuAnchorToggleDirective, selectors: [["", "appTopMenuAnchorToggle", ""]], hostBindings: function TopMenuAnchorToggleDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mouseenter", function TopMenuAnchorToggleDirective_mouseenter_HostBindingHandler($event) { return ctx.onMouseOver($event); });
    } } });


/***/ }),

/***/ 20154:
/*!*********************************************************************!*\
  !*** ./angular/app/shared/directives/topmenu-dropdown.directive.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TopMenuDropdownDirective": function() { return /* binding */ TopMenuDropdownDirective; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 3984);


class TopMenuDropdownDirective {
    constructor(router) {
        this.router = router;
        this.navlinks = [];
    }
    ngOnInit() {
        //write your code here!
    }
}
TopMenuDropdownDirective.ɵfac = function TopMenuDropdownDirective_Factory(t) { return new (t || TopMenuDropdownDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router)); };
TopMenuDropdownDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: TopMenuDropdownDirective, selectors: [["", "appTopMenuDropdown", ""]] });


/***/ }),

/***/ 78819:
/*!*****************************************************************!*\
  !*** ./angular/app/shared/directives/topmenu-link.directive.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TopMenuLinkDirective": function() { return /* binding */ TopMenuLinkDirective; }
/* harmony export */ });
/* harmony import */ var _topmenu_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./topmenu.directive */ 45197);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 74788);



class TopMenuLinkDirective {
    constructor(topNav) {
        this.topNav = topNav;
    }
    get show() {
        return this._show;
    }
    set show(value) {
        this._show = value;
        if (value) {
            this.topNav.closeOtherLinks(this);
        }
    }
    ngOnInit() {
        this.topNav.addLink(this);
    }
    ngOnDestroy() { }
    // public toggle(): any {
    //   this.show = !this.show;
    // }
    openDropdown() {
        this.show = true;
    }
}
TopMenuLinkDirective.ɵfac = function TopMenuLinkDirective_Factory(t) { return new (t || TopMenuLinkDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_topmenu_directive__WEBPACK_IMPORTED_MODULE_0__.TopMenuDirective)); };
TopMenuLinkDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: TopMenuLinkDirective, selectors: [["", "appTopMenulink", ""]], hostVars: 2, hostBindings: function TopMenuLinkDirective_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("show", ctx.show);
    } }, inputs: { parent: "parent", level: "level", show: "show" } });


/***/ }),

/***/ 45197:
/*!************************************************************!*\
  !*** ./angular/app/shared/directives/topmenu.directive.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TopMenuDirective": function() { return /* binding */ TopMenuDirective; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 74788);

class TopMenuDirective {
    constructor() {
        this.navlinks = [];
    }
    ngOnInit() { }
    addLink(link) {
        this.navlinks.push(link);
    }
    closeOtherLinks(openLink) {
        this.navlinks.forEach((link) => {
            if (link != openLink &&
                (openLink.level.toString() === "1" || link.level === openLink.level)) {
                link.show = false;
            }
        });
    }
    onMouseOut(e) {
        this.navlinks.forEach((link) => {
            link.show = false;
        });
    }
}
TopMenuDirective.ɵfac = function TopMenuDirective_Factory(t) { return new (t || TopMenuDirective)(); };
TopMenuDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: TopMenuDirective, selectors: [["", "appTopMenu", ""]], hostBindings: function TopMenuDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mouseleave", function TopMenuDirective_mouseleave_HostBindingHandler($event) { return ctx.onMouseOut($event); });
    } } });


/***/ }),

/***/ 26590:
/*!*******************************************************!*\
  !*** ./angular/app/shared/footer/footer.component.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FooterComponent": function() { return /* binding */ FooterComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 12057);


class FooterComponent {
    constructor() {
        //Variables
        this.currentDate = new Date();
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 8, vars: 4, consts: [[1, "footer"], [1, "copyright", "clearfix", "text-muted", "m-0"], ["id", "pixinventLink", "href", "https://bwa-designs.com"], [1, "d-none", "d-sm-inline-block"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "footer", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "date");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "BWA Designs");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, ", All rights reserved.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Copyright \u00A9 ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](3, 1, ctx.currentDate, "yyyy"), " ");
    } }, pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.DatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb290ZXIuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 83686:
/*!*************************************************************************!*\
  !*** ./angular/app/shared/horizontal-menu/horizontal-menu.component.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HorizontalMenuComponent": function() { return /* binding */ HorizontalMenuComponent; }
/* harmony export */ });
/* harmony import */ var _navigation_routes_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigation-routes.config */ 83155);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _services_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/layout.service */ 60432);
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/config.service */ 47107);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 3984);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var _directives_topmenu_dropdown_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../directives/topmenu-dropdown.directive */ 20154);
/* harmony import */ var _directives_topmenu_link_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../directives/topmenu-link.directive */ 78819);
/* harmony import */ var _directives_topmenu_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../directives/topmenu-anchor-toggle.directive */ 24378);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 75629);










const _c0 = function (a0) { return [a0]; };
function HorizontalMenuComponent_li_3_a_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](4, _c0, menuItem_r1.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 2, menuItem_r1.title));
} }
function HorizontalMenuComponent_li_3_a_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("routerLink", menuItem_r1.path);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](5, _c0, menuItem_r1.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 3, menuItem_r1.title));
} }
function HorizontalMenuComponent_li_3_a_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("href", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](5, _c0, menuItem_r1.path), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](7, _c0, menuItem_r1.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 3, menuItem_r1.title));
} }
function HorizontalMenuComponent_li_3_ul_4_li_1_a_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubItem_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", "dropdown-toggle dropdown-item d-flex align-items-center");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](5, _c0, menuSubItem_r10.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 3, menuSubItem_r10.title));
} }
function HorizontalMenuComponent_li_3_ul_4_li_1_a_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubItem_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("routerLink", menuSubItem_r10.path);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", "dropdown-item d-flex align-items-center");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](6, _c0, menuSubItem_r10.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 4, menuSubItem_r10.title));
} }
function HorizontalMenuComponent_li_3_ul_4_li_1_a_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubItem_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("href", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](6, _c0, menuSubItem_r10.path), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"])("ngClass", "dropdown-item d-flex align-items-center");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](8, _c0, menuSubItem_r10.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 4, menuSubItem_r10.title));
} }
function HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_li_1_a_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubsubItem_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", "dropdown-item d-flex align-items-center")("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](4, _c0, menuSubsubItem_r19.path));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](6, _c0, menuSubsubItem_r19.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](menuSubsubItem_r19.title);
} }
function HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_li_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubsubItem_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", "dropdown-item d-flex align-items-center")("href", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](4, _c0, menuSubsubItem_r19.path), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](6, _c0, menuSubsubItem_r19.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](menuSubsubItem_r19.title);
} }
const _c1 = function () { return { exact: true }; };
function HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_li_1_a_1_Template, 4, 8, "a", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_li_1_ng_template_2_Template, 4, 8, "ng-template", null, 25, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubsubItem_r19 = ctx.$implicit;
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](3);
    const menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4).$implicit;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("level", ctx_r18.level + 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("parent", menuItem_r1.title)("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](5, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !menuSubsubItem_r19.isExternalLink)("ngIfElse", _r21);
} }
function HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ul", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_li_1_Template, 4, 6, "li", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubItem_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", menuSubItem_r10.submenu);
} }
function HorizontalMenuComponent_li_3_ul_4_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HorizontalMenuComponent_li_3_ul_4_li_1_a_1_Template, 5, 7, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, HorizontalMenuComponent_li_3_ul_4_li_1_a_2_Template, 5, 8, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, HorizontalMenuComponent_li_3_ul_4_li_1_a_3_Template, 5, 10, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_Template, 2, 1, "ul", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubItem_r10 = ctx.$implicit;
    const menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2).$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("level", ctx_r9.level + 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("parent", menuItem_r1.title)("routerLinkActive", menuSubItem_r10.submenu.length != 0 ? "active" : "active")("ngClass", menuSubItem_r10.class === "dropdown-item" ? "" : "has-sub dropdown dropdown-submenu");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("data-menu", menuSubItem_r10.class === "dropdown-item" ? "" : "dropdown-submenu");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuSubItem_r10.submenu.length > 0 && !menuSubItem_r10.isExternalLink);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuSubItem_r10.submenu.length === 0 && !menuSubItem_r10.isExternalLink);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuSubItem_r10.isExternalLink);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuSubItem_r10.submenu.length > 0);
} }
function HorizontalMenuComponent_li_3_ul_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ul", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HorizontalMenuComponent_li_3_ul_4_li_1_Template, 5, 9, "li", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", menuItem_r1.submenu);
} }
function HorizontalMenuComponent_li_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HorizontalMenuComponent_li_3_a_1_Template, 5, 6, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, HorizontalMenuComponent_li_3_a_2_Template, 5, 7, "a", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, HorizontalMenuComponent_li_3_a_3_Template, 5, 9, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, HorizontalMenuComponent_li_3_ul_4_Template, 2, 1, "ul", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuItem_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("level", ctx_r0.level + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("parent", menuItem_r1.title)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](10, _c0, menuItem_r1.class))("routerLinkActive", menuItem_r1.submenu.length != 0 ? "active" : "active")("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](12, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("data-menu", menuItem_r1.class === "dropdown nav-item" ? "dropdown" : null);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuItem_r1.submenu.length > 0 && !menuItem_r1.isExternalLink);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuItem_r1.submenu.length === 0 && !menuItem_r1.isExternalLink);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuItem_r1.isExternalLink);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuItem_r1.submenu.length > 0);
} }
const _c2 = function (a0, a1) { return { "navbar-sticky": a0, "navbar-fixed": a1 }; };
class HorizontalMenuComponent {
    constructor(layoutService, configService, cdr, router) {
        this.layoutService = layoutService;
        this.configService = configService;
        this.cdr = cdr;
        this.router = router;
        this.config = {};
        this.level = 0;
        this.transparentBGClass = "";
        this.menuPosition = "Side";
        this.config = this.configService.templateConf;
    }
    ngOnInit() {
        this.menuItems = _navigation_routes_config__WEBPACK_IMPORTED_MODULE_0__.HROUTES;
    }
    ngAfterViewInit() {
        this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
            if (templateConf) {
                this.config = templateConf;
            }
            this.loadLayout();
            this.cdr.markForCheck();
        });
    }
    loadLayout() {
        if (this.config.layout.menuPosition &&
            this.config.layout.menuPosition.toString().trim() != "") {
            this.menuPosition = this.config.layout.menuPosition;
        }
        if (this.config.layout.variant === "Transparent") {
            this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
        }
        else {
            this.transparentBGClass = "";
        }
    }
    ngOnDestroy() {
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
    }
}
HorizontalMenuComponent.ɵfac = function HorizontalMenuComponent_Factory(t) { return new (t || HorizontalMenuComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_2__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router)); };
HorizontalMenuComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: HorizontalMenuComponent, selectors: [["app-horizontal-menu"]], decls: 4, vars: 8, consts: [["role", "navigation", "data-menu", "menu-wrapper", "data-nav", "brand-center", 3, "ngClass"], ["data-menu", "menu-container", 1, "navbar-container", "main-menu-content", "center-layout"], ["appTopMenuDropdown", "", "id", "main-menu-navigation", "data-menu", "menu-navigation", 1, "navigation-main", "nav", "navbar-nav"], ["appTopMenulink", "", 3, "parent", "level", "ngClass", "routerLinkActive", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["appTopMenulink", "", 3, "parent", "level", "ngClass", "routerLinkActive", "routerLinkActiveOptions"], ["appTopMenuAnchorToggle", "", "data-toggle", "dropdown", "class", "dropdown-toggle nav-link d-flex align-items-center", 4, "ngIf"], ["appTopMenuAnchorToggle", "", "data-toggle", "dropdown", "class", "nav-link d-flex align-items-center", 3, "routerLink", 4, "ngIf"], ["target", "_blank", "data-toggle", "dropdown", "class", "nav-link d-flex align-items-center", 3, "href", 4, "ngIf"], ["appTopMenuDropdown", "", "class", "dropdown-menu", 4, "ngIf"], ["appTopMenuAnchorToggle", "", "data-toggle", "dropdown", 1, "dropdown-toggle", "nav-link", "d-flex", "align-items-center"], [3, "ngClass"], ["appTopMenuAnchorToggle", "", "data-toggle", "dropdown", 1, "nav-link", "d-flex", "align-items-center", 3, "routerLink"], ["target", "_blank", "data-toggle", "dropdown", 1, "nav-link", "d-flex", "align-items-center", 3, "href"], ["appTopMenuDropdown", "", 1, "dropdown-menu"], ["appTopMenulink", "", 3, "parent", "level", "routerLinkActive", "ngClass", 4, "ngFor", "ngForOf"], ["appTopMenulink", "", 3, "parent", "level", "routerLinkActive", "ngClass"], ["appTopMenuAnchorToggle", "", 3, "ngClass", 4, "ngIf"], ["appTopMenuAnchorToggle", "", 3, "routerLink", "ngClass", 4, "ngIf"], [3, "href", "ngClass", 4, "ngIf"], ["appTopMenuAnchorToggle", "", 3, "ngClass"], ["appTopMenuAnchorToggle", "", 3, "routerLink", "ngClass"], [3, "href", "ngClass"], ["appTopMenulink", "", "data-menu", "", "data-toggle", "dropdown", "routerLinkActive", "active", 3, "parent", "level", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["appTopMenulink", "", "data-menu", "", "data-toggle", "dropdown", "routerLinkActive", "active", 3, "parent", "level", "routerLinkActiveOptions"], ["appTopMenuAnchorToggle", "", "data-toggle", "dropdown", 3, "ngClass", "routerLink", 4, "ngIf", "ngIfElse"], ["externalSubSubLinkBlock", ""], ["appTopMenuAnchorToggle", "", "data-toggle", "dropdown", 3, "ngClass", "routerLink"], [1, ""], ["data-toggle", "dropdown", "target", "_blank", 3, "ngClass", "href"]], template: function HorizontalMenuComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, HorizontalMenuComponent_li_3_Template, 5, 13, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassMapInterpolate1"]("header-navbar navbar-expand-sm navbar navbar-horizontal navbar-fixed navbar-light navbar-shadow menu-border navbar-brand-center  ", ctx.transparentBGClass, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction2"](5, _c2, ctx.menuPosition === "Top" && (ctx.config == null ? null : ctx.config.layout.navbar.type) === "Static", ctx.menuPosition === "Top" && (ctx.config == null ? null : ctx.config.layout.navbar.type) === "Fixed"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.menuItems);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass, _directives_topmenu_dropdown_directive__WEBPACK_IMPORTED_MODULE_3__.TopMenuDropdownDirective, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _directives_topmenu_link_directive__WEBPACK_IMPORTED_MODULE_4__.TopMenuLinkDirective, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLinkActive, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _directives_topmenu_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_5__.TopMenuAnchorToggleDirective, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLinkWithHref], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob3Jpem9udGFsLW1lbnUuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 83155:
/*!************************************************************************!*\
  !*** ./angular/app/shared/horizontal-menu/navigation-routes.config.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HROUTES": function() { return /* binding */ HROUTES; }
/* harmony export */ });
const HROUTES = [
    {
        path: "/page",
        title: "Page",
        icon: "ft-home",
        class: "dropdown nav-item",
        isExternalLink: false,
        submenu: [],
    },
    {
        path: "",
        title: "Menu Levels",
        icon: "ft-align-left",
        class: "dropdown nav-item has-sub",
        badge: "",
        badgeClass: "",
        isExternalLink: false,
        submenu: [
            {
                path: "/YOUR-ROUTE-PATH",
                title: "Second Level",
                icon: "ft-arrow-right submenu-icon",
                class: "dropdown-item",
                badge: "",
                badgeClass: "",
                isExternalLink: false,
                submenu: [],
            },
            {
                path: "",
                title: "Second Level Child",
                icon: "ft-arrow-right submenu-icon",
                class: "has-sub",
                badge: "",
                badgeClass: "",
                isExternalLink: false,
                submenu: [
                    {
                        path: "/YOUR-ROUTE-PATH",
                        title: "Third Level 1.1",
                        icon: "ft-arrow-right submenu-icon",
                        class: "dropdown-item",
                        badge: "",
                        badgeClass: "",
                        isExternalLink: false,
                        submenu: [],
                    },
                    {
                        path: "/YOUR-ROUTE-PATH",
                        title: "Third Level 1.2",
                        icon: "ft-arrow-right submenu-icon",
                        class: "dropdown-item",
                        badge: "",
                        badgeClass: "",
                        isExternalLink: false,
                        submenu: [],
                    },
                ],
            },
        ],
    },
];


/***/ }),

/***/ 96319:
/*!*******************************************************!*\
  !*** ./angular/app/shared/navbar/navbar.component.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavbarComponent": function() { return /* binding */ NavbarComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 24751);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ 49976);
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ 51903);
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngneat/until-destroy */ 36857);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 75629);
/* harmony import */ var _services_layout_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/layout.service */ 60432);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ 3984);
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/config.service */ 47107);
/* harmony import */ var _shared_services_world_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/world.service */ 40653);
/* harmony import */ var _shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../shared/auth/auth.service */ 6008);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var ng_click_outside__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-click-outside */ 64623);
/* harmony import */ var _directives_toggle_fullscreen_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../directives/toggle-fullscreen.directive */ 66763);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 96797);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 54163);
/* harmony import */ var _components_autocomplete_autocomplete_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/autocomplete/autocomplete.directive */ 344);
/* harmony import */ var _components_autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/autocomplete/autocomplete.component */ 84678);
/* harmony import */ var _components_autocomplete_autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/autocomplete/autocomplete-content.directive */ 33507);
/* harmony import */ var _components_autocomplete_option_option_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/autocomplete/option/option.component */ 21979);
/* harmony import */ var _pipes_filter_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../pipes/filter.pipe */ 32677);

































const _c0 = ["search"];
const _c1 = ["searchResults"];
function NavbarComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "a", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const world_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate1"]("routerLink", "/app/world/", world_r13.id, "/edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", world_r13.name, " ");
} }
function NavbarComponent_li_16_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "a", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NavbarComponent_li_16_ng_container_4_Template_a_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r17); const campaign_r15 = restoredCtx.$implicit; const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2); return ctx_r16.setCampaign(campaign_r15); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const campaign_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", campaign_r15.name, " ");
} }
function NavbarComponent_li_16_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "li", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](4, NavbarComponent_li_16_ng_container_4_Template, 3, 1, "ng-container", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "a", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NavbarComponent_li_16_Template_a_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r19); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r18.newCampaign(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6, " +Add Campaign ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r1.selectedCampaign ? ctx_r1.selectedCampaign.name : "All Campaigns", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r1.campaigns);
} }
function NavbarComponent_li_17_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "a", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NavbarComponent_li_17_ng_container_4_Template_a_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r23); const region_r21 = restoredCtx.$implicit; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2); return ctx_r22.setRegion(region_r21); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const region_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", region_r21.name, " ");
} }
function NavbarComponent_li_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "li", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](4, NavbarComponent_li_17_ng_container_4_Template, 3, 1, "ng-container", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r2.selectedRegion ? ctx_r2.selectedRegion.name : "Select Region", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r2.regions);
} }
function NavbarComponent_li_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "a", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](3, "fa-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5, " Story");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate1"]("routerLink", "/app/region/", ctx_r3.selectedRegion.id, "/story");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("icon", ctx_r3.faBookOpen);
} }
function NavbarComponent_li_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "fa-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "a", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, "Combat");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("icon", ctx_r4.faFistRaised);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate1"]("routerLink", "/app/world/", ctx_r4.selectedWorld.id, "/combat");
} }
function NavbarComponent_a_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "a", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "fa-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, " World");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate1"]("routerLink", "/app/world/", ctx_r5.selectedWorld.id, "/edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("icon", ctx_r5.faGlobe);
} }
function NavbarComponent_a_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "a", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "fa-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, " Monsters");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate1"]("routerLink", "/app/world/", ctx_r6.selectedWorld.id, "/edit-monsters");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("icon", ctx_r6.faDragon);
} }
function NavbarComponent_a_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "a", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "fa-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, " Spells");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate1"]("routerLink", "/app/world/", ctx_r7.selectedWorld.id, "/edit-spells");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("icon", ctx_r7.faHatWizard);
} }
function NavbarComponent_a_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "a", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "fa-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, " NPCs");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate1"]("routerLink", "/app/region/", ctx_r8.selectedRegion.id, "/edit-npcs");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("icon", ctx_r8.faUserFriends);
} }
function NavbarComponent_a_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "a", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "fa-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, " Map");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate1"]("href", "/app/region/", ctx_r9.selectedRegion.id, "/edit-map", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("icon", ctx_r9.faMap);
} }
function NavbarComponent_ng_template_49_ng_container_0_app_option_1_fa_icon_7_Template(rf, ctx) { if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "fa-icon", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NavbarComponent_ng_template_49_ng_container_0_app_option_1_fa_icon_7_Template_fa_icon_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r33); const option_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit; const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3); return ctx_r31.redirectTo(option_r28.alt_url); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("icon", ctx_r30.faPencilAlt);
} }
function NavbarComponent_ng_template_49_ng_container_0_app_option_1_Template(rf, ctx) { if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "app-option", 49, 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("mouseenter", function NavbarComponent_ng_template_49_ng_container_0_app_option_1_Template_app_option_mouseenter_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r35); const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3); return ctx_r34.removeActiveClass(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NavbarComponent_ng_template_49_ng_container_0_app_option_1_Template_i_click_4_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r35); const option_r28 = restoredCtx.$implicit; const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3); return ctx_r36.redirectTo(option_r28.url); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NavbarComponent_ng_template_49_ng_container_0_app_option_1_Template_span_click_5_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r35); const option_r28 = restoredCtx.$implicit; const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3); return ctx_r37.redirectTo(option_r28.url); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, NavbarComponent_ng_template_49_ng_container_0_app_option_1_fa_icon_7_Template, 1, 1, "fa-icon", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r28 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("url", option_r28.url)("value", option_r28.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMapInterpolate1"]("", option_r28.icon, " mr-2");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](option_r28.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", option_r28.alt_url);
} }
function NavbarComponent_ng_template_49_ng_container_0_app_option_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "app-option", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "No results found.");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function NavbarComponent_ng_template_49_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, NavbarComponent_ng_template_49_ng_container_0_app_option_1_Template, 8, 7, "app-option", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, NavbarComponent_ng_template_49_ng_container_0_app_option_2_Template, 2, 0, "app-option", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const result_r25 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", result_r25);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !result_r25.length);
} }
function NavbarComponent_ng_template_49_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, NavbarComponent_ng_template_49_ng_container_0_Template, 3, 2, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](1, "filter");
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](1, 1, ctx_r12.listItems, ctx_r12.control.value));
} }
const _c2 = function (a0, a1, a2, a3) { return { "navbar-brand-center": a0, "navbar-static": a1, "navbar-sticky": a2, "fixed-top": a3 }; };
let NavbarComponent = class NavbarComponent {
    constructor(translate, layoutService, router, configService, cdr, worldService, authService) {
        this.translate = translate;
        this.layoutService = layoutService;
        this.router = router;
        this.configService = configService;
        this.cdr = cdr;
        this.worldService = worldService;
        this.authService = authService;
        this.currentLang = "en";
        this.selectedLanguageText = "English";
        this.selectedLanguageFlag = "./assets/img/flags/us.png";
        this.toggleClass = "ft-maximize";
        this.placement = "bottom-right";
        this.logoUrl = "assets/img/logo.png";
        this.menuPosition = "Side";
        this.faCaretSquareLeft = _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_12__.faCaretSquareLeft;
        this.isSmallScreen = false;
        this.searchOpenClass = "";
        this.transparentBGClass = "";
        this.hideSidebar = true;
        this.isCollapsed = true;
        this.faHatWizard = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_13__.faHatWizard;
        this.faFistRaised = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_13__.faFistRaised;
        this.faPencilAlt = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_13__.faPencilAlt;
        this.faUserFriends = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_13__.faUserFriends;
        this.faMap = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_13__.faMap;
        this.faCaretSquareDown = _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_12__.faCaretSquareDown;
        this.faSlidersH = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_13__.faSlidersH;
        this.faBookOpen = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_13__.faBookOpen;
        this.faGlobe = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_13__.faGlobe;
        this.toggleHideSidebar = new _angular_core__WEBPACK_IMPORTED_MODULE_11__.EventEmitter();
        this.seachTextEmpty = new _angular_core__WEBPACK_IMPORTED_MODULE_11__.EventEmitter();
        this.listItems = [];
        this.control = new _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormControl();
        this.faDragon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_13__.faDragon;
        this.config = {};
        this.newWorld = () => this.worldService.createWorld().subscribe((world) => {
            this.worlds.push(world);
        });
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "en");
        this.config = this.configService.templateConf;
        this.innerWidth = window.innerWidth;
        this.layoutSub = layoutService.toggleSidebar$.subscribe((isShow) => {
            this.hideSidebar = !isShow;
        });
    }
    ngOnInit() {
        // this.listItems = LISTITEMS;
        this.worldService.selectedRegion$
            .pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_15__.untilDestroyed)(this))
            .subscribe((region) => {
            console.log("navbar");
            console.log(region);
            this.selectedRegion = region;
        });
        this.worldService.selectedWorld$
            .pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_15__.untilDestroyed)(this))
            .subscribe((world) => {
            this.selectedWorld = world;
            console.log("navbar");
            console.log(world);
            if (this.user) {
                this.regions = this.user.search_list.filter((w) => w.type == "region" && w.world_id == world.id);
                this.worlds = this.user.search_list.filter((w) => w.type == "world");
                console.log(this.regions);
                console.log(this.worlds);
                console.log(this.user);
            }
        });
        this.authService.user$.pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_15__.untilDestroyed)(this)).subscribe((user) => {
            this.user = user;
            this.listItems = user.search_list;
            this.worlds = this.user.search_list.filter((w) => w.type == "world");
            if (this.selectedWorld)
                this.regions = this.user.search_list.filter((w) => w.type == "region" && w.world_id == this.selectedWorld.id);
            console.log(this.regions);
            console.log(this.worlds);
            console.log(this.user);
        });
        if (this.innerWidth < 1200) {
            this.isSmallScreen = true;
        }
        else {
            this.isSmallScreen = false;
        }
    }
    ngAfterViewInit() {
        this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
            if (templateConf) {
                this.config = templateConf;
            }
            this.loadLayout();
            this.cdr.markForCheck();
        });
    }
    ngOnDestroy() {
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
        if (this.configSub) {
            this.configSub.unsubscribe();
        }
    }
    onResize(event) {
        this.innerWidth = event.target.innerWidth;
        if (this.innerWidth < 1200) {
            this.isSmallScreen = true;
        }
        else {
            this.isSmallScreen = false;
        }
    }
    loadLayout() {
        if (this.config.layout.menuPosition &&
            this.config.layout.menuPosition.toString().trim() != "") {
            this.menuPosition = this.config.layout.menuPosition;
        }
        if (this.config.layout.variant === "Light") {
            this.logoUrl = "assets/img/logo-dark.png";
        }
        else {
            this.logoUrl = "assets/img/logo.png";
        }
        if (this.config.layout.variant === "Transparent") {
            this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
        }
        else {
            this.transparentBGClass = "";
        }
    }
    onSearchKey(event) {
        if (this.searchResults && this.searchResults.length > 0) {
            this.searchResults.first.host.nativeElement.classList.add("first-active-item");
        }
        if (event.target.value === "") {
            this.seachTextEmpty.emit(true);
        }
        else {
            this.seachTextEmpty.emit(false);
        }
    }
    removeActiveClass() {
        if (this.searchResults && this.searchResults.length > 0) {
            this.searchResults.first.host.nativeElement.classList.remove("first-active-item");
        }
    }
    onEscEvent() {
        this.control.setValue("");
        this.searchOpenClass = "";
        this.seachTextEmpty.emit(true);
    }
    onEnter() {
        if (this.searchResults && this.searchResults.length > 0) {
            let url = this.searchResults.first.url;
            if (url && url != "") {
                this.control.setValue("");
                this.searchOpenClass = "";
                this.router.navigate([url]);
                this.seachTextEmpty.emit(true);
            }
        }
    }
    redirectTo(value) {
        this.router.navigate([value]);
        this.seachTextEmpty.emit(true);
    }
    ChangeLanguage(language) {
        this.translate.use(language);
        if (language === "en") {
            this.selectedLanguageText = "English";
            this.selectedLanguageFlag = "./assets/img/flags/us.png";
        }
        else if (language === "es") {
            this.selectedLanguageText = "Spanish";
            this.selectedLanguageFlag = "./assets/img/flags/es.png";
        }
        else if (language === "pt") {
            this.selectedLanguageText = "Portuguese";
            this.selectedLanguageFlag = "./assets/img/flags/pt.png";
        }
        else if (language === "de") {
            this.selectedLanguageText = "German";
            this.selectedLanguageFlag = "./assets/img/flags/de.png";
        }
    }
    ToggleClass() {
        if (this.toggleClass === "ft-maximize") {
            this.toggleClass = "ft-minimize";
        }
        else {
            this.toggleClass = "ft-maximize";
        }
    }
    toggleSearchOpenClass(display) {
        this.control.setValue("");
        if (display) {
            this.searchOpenClass = "open";
            setTimeout(() => {
                this.searchElement.nativeElement.focus();
            }, 0);
        }
        else {
            this.searchOpenClass = "";
        }
        this.seachTextEmpty.emit(true);
    }
    toggleNotificationSidebar() {
        this.layoutService.toggleNotificationSidebar(true);
    }
    toggleSidebar() {
        this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
    }
    setWorld(world) {
        this.worldService.getWorld(world.id);
    }
    setRegion(region) {
        this.worldService.getRegion(region.id);
    }
};
NavbarComponent.ɵfac = function NavbarComponent_Factory(t) { return new (t || NavbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_services_layout_service__WEBPACK_IMPORTED_MODULE_0__.LayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_17__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_1__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_world_service__WEBPACK_IMPORTED_MODULE_2__.WorldService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService)); };
NavbarComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({ type: NavbarComponent, selectors: [["app-navbar"]], viewQuery: function NavbarComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c1, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.searchElement = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.searchResults = _t);
    } }, hostBindings: function NavbarComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("resize", function NavbarComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresolveWindow"]);
    } }, outputs: { toggleHideSidebar: "toggleHideSidebar", seachTextEmpty: "seachTextEmpty" }, decls: 57, vars: 31, consts: [[3, "ngClass"], [1, "container-fluid", "navbar-wrapper"], [1, "navbar-header", "d-flex"], ["data-toggle", "collapse", 1, "navbar-toggle", "menu-toggle", "d-xl-none", "d-block", "float-left", "align-items-center", "justify-content-center", 3, "click"], [1, "ft-menu", "font-medium-3"], [1, "navbar-nav", 3, "clickOutside"], [1, "nav-item", "mr-2", "d-none", "d-lg-block"], ["id", "navbar-fullscreen", "routerLink", "javascript:;", "appToggleFullscreen", "", 1, "nav-link", "apptogglefullscreen", 3, "click"], ["ngbDropdown", "", 1, "dropdown", "nav-item", "px-2"], ["href", "javascript:;", "data-toggle", "dropdown", "ngbDropdownToggle", "", 1, "nav-link", "dropdown-toggle"], ["ngbDropdownMenu", "", 1, "dropdown-menu", "text-left", "dropdown-menu-right", "m-0", "pb-0", 2, "font-size", "1.5rem"], [4, "ngFor", "ngForOf"], [3, "click"], ["class", "dropdown nav-item px-2", "ngbDropdown", "", 4, "ngIf"], [4, "ngIf"], ["placement", "bottom-left", "display", "static", "ngbDropdown", "", 1, "dropdown", "nav-item", "px-2"], ["id", "dropdownBasic2", "href", "javascript:;", "data-toggle", "dropdown", "ngbDropdownToggle", "", 1, "nav-link", "dropdown-toggle", "user-dropdown", "d-flex", "align-items-end"], [1, "user", "d-md-flex", "d-none", "mr-2"], [3, "icon"], [1, "pl-2"], ["aria-labelledby", "dropdownBasic2", "ngbDropdownMenu", "", 1, "dropdown-menu", "text-left", "dropdown-menu-right", "m-0", "pb-0", 2, "font-size", "1.5rem"], ["class", "dropdown-item", 3, "routerLink", 4, "ngIf"], ["routerLink", "/app/edit-sounds", 1, "dropdown-item"], [1, "d-flex", "align-items-center"], ["class", "dropdown-item", 3, "href", 4, "ngIf"], [1, "nav-item", "nav-search"], ["id", "navbar-search", "href", "javascript:", 1, "nav-link", "nav-link-search", 3, "click"], [1, "ft-search", "font-medium-3"], [1, "search-input-icon"], ["type", "text", "placeholder", "Search regions and worlds...", "tabindex", "0", "autofocus", "", "data-search", "template-search", 1, "input", 3, "formControl", "appAutocomplete", "keyup.enter", "keydown.esc", "keyup"], ["search", ""], [1, "search-input-close", 3, "click"], [1, "ft-x", "font-medium-3"], ["autocomplete", "appAutocomplete"], ["appAutocompleteContent", ""], [1, "navbar-container"], ["id", "navbarSupportedContent", 1, "collapse", "navbar-collapse", "d-block"], [1, "navbar-nav"], [1, "nav-item"], [1, "text-right", "mb-0"], ["ngbDropdownItem", "", 1, "dropdown-item", 3, "routerLink"], ["ngbDropdownItem", "", 1, "dropdown-item", 3, "click"], [1, "nav-link", 3, "routerLink"], [1, "d-flex", "align-items-center", "px-2"], [1, "d-flex", "align-items-center", "px-3"], [1, "dropdown-item", 3, "routerLink"], [1, "dropdown-item", 3, "href"], [3, "url", "value", "mouseenter", 4, "ngFor", "ngForOf"], ["class", "no-result", 4, "ngIf"], [3, "url", "value", "mouseenter"], ["searchResults", ""], [1, "d-flex", "align-items-center", "justify-content-between", "w-100"], [1, "d-flex", "align-items-center", "justify-content-start"], ["class", "ml-3 cursor-pointer", 3, "icon", "click", 4, "ngIf"], [1, "ml-3", "cursor-pointer", 3, "icon", "click"], [1, "no-result"]], template: function NavbarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NavbarComponent_Template_div_click_3_listener() { return ctx.toggleSidebar(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "i", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "ul", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("clickOutside", function NavbarComponent_Template_ul_clickOutside_5_listener() { return ctx.toggleSearchOpenClass(false); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_7_listener() { return ctx.ToggleClass(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](8, "i");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "li", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](13, NavbarComponent_ng_container_13_Template, 3, 2, "ng-container", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](14, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_14_listener() { return ctx.newWorld(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](15, " +Add World ");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](16, NavbarComponent_li_16_Template, 7, 2, "li", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](17, NavbarComponent_li_17_Template, 5, 2, "li", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](18, NavbarComponent_li_18_Template, 6, 2, "li", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](19, NavbarComponent_li_19_Template, 5, 2, "li", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](20, "li", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](21, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](22, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](23, "fa-icon", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](24, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](25, "Edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](26, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](27, NavbarComponent_a_27_Template, 5, 2, "a", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](28, NavbarComponent_a_28_Template, 5, 2, "a", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](29, NavbarComponent_a_29_Template, 5, 2, "a", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](30, NavbarComponent_a_30_Template, 5, 2, "a", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](31, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](32, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](33, "fa-icon", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](34, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](35, " Sounds");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](36, NavbarComponent_a_36_Template, 5, 2, "a", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](37, "li", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](38, "a", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_38_listener() { return ctx.toggleSearchOpenClass(true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](39, "i", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](40, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](41, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](42, "i", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](43, "input", 29, 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("keyup.enter", function NavbarComponent_Template_input_keyup_enter_43_listener() { return ctx.onEnter(); })("keydown.esc", function NavbarComponent_Template_input_keydown_esc_43_listener() { return ctx.onEscEvent(); })("keyup", function NavbarComponent_Template_input_keyup_43_listener($event) { return ctx.onSearchKey($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](45, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NavbarComponent_Template_div_click_45_listener() { return ctx.toggleSearchOpenClass(false); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](46, "i", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](47, "app-autocomplete", null, 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](49, NavbarComponent_ng_template_49_Template, 2, 4, "ng-template", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](50, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](51, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](52, "ul", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](53, "li", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](54, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_54_listener() { return ctx.toggleNotificationSidebar(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](55, "h2", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](56, "fa-icon", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](48);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMapInterpolate1"]("navbar navbar-expand-lg navbar-light header-navbar ", ctx.transparentBGClass, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction4"](26, _c2, ctx.menuPosition === "Top", ctx.menuPosition === "Side" && (ctx.config == null ? null : ctx.config.layout.navbar.type) === "Static", ctx.menuPosition === "Side" && (ctx.config == null ? null : ctx.config.layout.navbar.type) === "Fixed", ctx.isSmallScreen && ctx.menuPosition === "Top"));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMapInterpolate1"](" ", ctx.toggleClass, " font-medium-3");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx.selectedWorld ? ctx.selectedWorld.name : "Select World", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx.worlds);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.selectedWorld);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.selectedWorld);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.selectedRegion);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.selectedWorld);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("icon", ctx.faPencilAlt);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.selectedWorld);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.selectedWorld);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.selectedWorld);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.selectedRegion);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("icon", ctx.faSlidersH);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.selectedRegion);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMapInterpolate1"]("search-input ", ctx.searchOpenClass, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("formControl", ctx.control)("appAutocomplete", _r11);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("icon", ctx.faCaretSquareDown);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_18__.NgClass, ng_click_outside__WEBPACK_IMPORTED_MODULE_4__.ClickOutsideDirective, _angular_router__WEBPACK_IMPORTED_MODULE_17__.RouterLinkWithHref, _directives_toggle_fullscreen_directive__WEBPACK_IMPORTED_MODULE_5__.ToggleFullscreenDirective, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_19__.NgbDropdown, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_19__.NgbDropdownToggle, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_19__.NgbDropdownMenu, _angular_common__WEBPACK_IMPORTED_MODULE_18__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_18__.NgIf, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_20__.FaIconComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormControlDirective, _components_autocomplete_autocomplete_directive__WEBPACK_IMPORTED_MODULE_6__.AutocompleteDirective, _components_autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_7__.AutocompleteComponent, _components_autocomplete_autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_8__.AutocompleteContentDirective, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_19__.NgbDropdownItem, _components_autocomplete_option_option_component__WEBPACK_IMPORTED_MODULE_9__.OptionComponent], pipes: [_pipes_filter_pipe__WEBPACK_IMPORTED_MODULE_10__.FilterPipe], styles: [".side-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  top: 6vh;\n  display: flex;\n  border: 0px !important;\n  align-items: center;\n  justify-content: center;\n  font-size: 4rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFFBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtBQUNGIiwiZmlsZSI6Im5hdmJhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zaWRlLXRvZ2dsZSB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIHRvcDogNnZoO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYm9yZGVyOiAwcHggIWltcG9ydGFudDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogNHJlbTtcclxufVxyXG4iXX0= */"] });
NavbarComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__decorate)([
    (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_15__.UntilDestroy)()
], NavbarComponent);



/***/ }),

/***/ 9856:
/*!***********************************************************************************!*\
  !*** ./angular/app/shared/notification-sidebar/notification-sidebar.component.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationSidebarComponent": function() { return /* binding */ NotificationSidebarComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _configs_const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../configs/const */ 33009);
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngneat/until-destroy */ 36857);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _services_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/layout.service */ 60432);
/* harmony import */ var _services_story_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/story.service */ 43235);
/* harmony import */ var _services_world_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/world.service */ 40653);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-perfect-scrollbar */ 99904);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 96797);
/* harmony import */ var _components_npc_selector_npc_selector_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/npc-selector/npc-selector.component */ 90081);
/* harmony import */ var _pipes_safe_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pipes/safe-html */ 29593);












function NotificationSidebarComponent_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "app-npc-selector", 208);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("emitNpc", function NotificationSidebarComponent_ng_template_11_Template_app_npc_selector_emitNpc_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r5.select($event, false, "npc"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function NotificationSidebarComponent_ng_template_15_ng_container_4_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 219);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function NotificationSidebarComponent_ng_template_15_ng_container_4_div_2_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13); const icon_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r11.select(icon_r8, false, "icon"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const icon_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngbTooltip", "Add " + icon_r8.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", icon_r8.icon, " ");
} }
function NotificationSidebarComponent_ng_template_15_ng_container_4_img_3_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "img", 220);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function NotificationSidebarComponent_ng_template_15_ng_container_4_img_3_Template_img_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r17); const icon_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit; const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r15.select(icon_r8, false, "icon"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const icon_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate1"]("src", "/assets/img/svg/", icon_r8.icon, ".svg", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngbTooltip", "Add " + icon_r8.type);
} }
const _c0 = function (a0) { return { "bg-primary": a0 }; };
function NotificationSidebarComponent_ng_template_15_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 216);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, NotificationSidebarComponent_ng_template_15_ng_container_4_div_2_Template, 2, 2, "div", 217);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, NotificationSidebarComponent_ng_template_15_ng_container_4_img_3_Template, 1, 2, "img", 218);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const icon_r8 = ctx.$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](3, _c0, icon_r8.icon == ctx_r7.selected.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", icon_r8.icon.substr(0, 4) !== "icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", icon_r8.icon.substr(0, 4) == "icon");
} }
function NotificationSidebarComponent_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 209);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Encounters or points of interest.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 210);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, NotificationSidebarComponent_ng_template_15_ng_container_4_Template, 4, 5, "ng-container", 211);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 212);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "input", 213);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 214);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function NotificationSidebarComponent_ng_template_15_Template_div_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r19.addIcon(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "button", 215);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, " add ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r2.icons);
} }
function NotificationSidebarComponent_ng_template_19_div_0_div_1_label_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const state_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](state_r23.form);
} }
function NotificationSidebarComponent_ng_template_19_div_0_div_1_div_13_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 232);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function NotificationSidebarComponent_ng_template_19_div_0_div_1_div_13_button_1_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r31); const state_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2).$implicit; const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3); return ctx_r29.select(state_r23, false, "state"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " Select ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function NotificationSidebarComponent_ng_template_19_div_0_div_1_div_13_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 232);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function NotificationSidebarComponent_ng_template_19_div_0_div_1_div_13_button_2_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r33); const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](5); return ctx_r32.select({}); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " Deselect ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function NotificationSidebarComponent_ng_template_19_div_0_div_1_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 230);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, NotificationSidebarComponent_ng_template_19_div_0_div_1_div_13_button_1_Template, 2, 0, "button", 231);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, NotificationSidebarComponent_ng_template_19_div_0_div_1_div_13_button_2_Template, 2, 0, "button", 231);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "button", 232);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function NotificationSidebarComponent_ng_template_19_div_0_div_1_div_13_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r36); const state_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit; const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3); return ctx_r34.selectCapital(state_r23.capital); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, " Capital ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "button", 232);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function NotificationSidebarComponent_ng_template_19_div_0_div_1_div_13_Template_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r36); const state_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit; const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3); return ctx_r37.zoomTo(state_r23, 3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, " Zoom To ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const state_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r25.selected.i != state_r23.i);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r25.selected.i == state_r23.i);
} }
const _c1 = function () { return {}; };
function NotificationSidebarComponent_ng_template_19_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 224);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "div", 225);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "safe");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 226);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "h4", 227);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, NotificationSidebarComponent_ng_template_19_div_0_div_1_label_6_Template, 2, 1, "label", 228);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "Population");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, NotificationSidebarComponent_ng_template_19_div_0_div_1_div_13_Template, 7, 2, "div", 229);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const state_r23 = ctx.$implicit;
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassMapInterpolate1"]("card ", ctx_r22.selected.i == state_r23.i ? "selected" : "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](14, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 12, state_r23.coa_svg), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", state_r23.fullName ? state_r23.fullName : "Neutral", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", state_r23.form);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", state_r23.area_txt, " Acres | ", state_r23.burgs, " Cities");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("Rural ", state_r23.rural_txt, ", Urban ", state_r23.urban_txt, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", state_r23.i > 0);
} }
function NotificationSidebarComponent_ng_template_19_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 222);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, NotificationSidebarComponent_ng_template_19_div_0_div_1_Template, 14, 15, "div", 223);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r21.selectedRegion.states);
} }
function NotificationSidebarComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, NotificationSidebarComponent_ng_template_19_div_0_Template, 2, 1, "div", 221);
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.selectedRegion);
} }
const _c2 = function (a0) { return { selected: a0 }; };
function NotificationSidebarComponent_ng_template_23_ng_container_13_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "tr", 224);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "td", 235);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function NotificationSidebarComponent_ng_template_23_ng_container_13_tr_1_Template_td_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r46); const burg_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit; const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r44.select(burg_r41); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "td", 236);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function NotificationSidebarComponent_ng_template_23_ng_container_13_tr_1_Template_td_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r46); const burg_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit; const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r47.zoomTo(burg_r41); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const burg_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](5, _c2, burg_r41 == ctx_r43.selected));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", burg_r41.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r43.mapData.states[burg_r41.state] == null ? null : ctx_r43.mapData.states[burg_r41.state].name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r43.mapData.cultures[burg_r41.culture] == null ? null : ctx_r43.mapData.cultures[burg_r41.culture].name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](burg_r41.pop_txt);
} }
function NotificationSidebarComponent_ng_template_23_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, NotificationSidebarComponent_ng_template_23_ng_container_13_tr_1_Template, 10, 7, "tr", 234);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const isFirst_r42 = ctx.first;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !isFirst_r42);
} }
function NotificationSidebarComponent_ng_template_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "table", 233);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "thead");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "State");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "Culture");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "Pop.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](11, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, NotificationSidebarComponent_ng_template_23_ng_container_13_Template, 2, 1, "ng-container", 211);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r4.mapData.burgs);
} }
const _c3 = function (a0) { return { open: a0 }; };
let NotificationSidebarComponent = class NotificationSidebarComponent {
    constructor(layoutService, storyService, worldService) {
        this.layoutService = layoutService;
        this.storyService = storyService;
        this.worldService = worldService;
        this.isOpen = false;
        this.customIcons = [];
        this.mapData = {};
        this.selected = {};
        this.selectedRegion = {};
        this.abbreviateNumber = {};
        this.groupBy = (list, keyGetter) => {
            const map = new Map();
            list.forEach((item) => {
                const key = keyGetter(item);
                const collection = map.get(key);
                if (!collection) {
                    map.set(key, [item]);
                }
                else {
                    collection.push(item);
                }
            });
            return map;
        };
        this.layoutSub = layoutService.toggleNotiSidebar$.subscribe((open) => {
            this.isOpen = open;
        });
    }
    get icons() {
        if (localStorage.getItem("customIcons"))
            this.customIcons = JSON.parse(localStorage.getItem("customIcons"));
        return [..._configs_const__WEBPACK_IMPORTED_MODULE_0__.typedIcons, ...this.customIcons];
    }
    ngOnInit() {
        this.abbreviateNumber = this.storyService.abbreviateNumber;
        if (localStorage.getItem("customIcons"))
            this.customIcons = JSON.parse(localStorage.getItem("customIcons"));
        this.worldService.selectedRegion$
            .pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_7__.untilDestroyed)(this))
            .subscribe((region) => {
            if (!region.id)
                return;
            this.selectedRegion = region;
        });
        this.storyService.data$
            .pipe((0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_7__.untilDestroyed)(this))
            .subscribe((data) => {
            if (!Object.values(data).length)
                return;
            this.mapData = data;
            this.mapData.burgs.map((b) => {
                b.pop_txt = this.abbreviateNumber(b.population * this.mapData.populationRate);
            });
            this.selectedRegion.states.map((state) => {
                state.urban_txt = this.abbreviateNumber(state.urban * this.mapData.populationRate);
                state.area_txt = this.abbreviateNumber(state.area);
                state.rural_txt = this.abbreviateNumber(state.rural * this.mapData.populationRate);
            });
        });
    }
    ngOnDestroy() {
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
    }
    onClose() {
        this.layoutService.toggleNotificationSidebar(false);
    }
    addIcon() {
        let customIcons = [];
        if (localStorage.getItem("customIcons"))
            customIcons = JSON.parse(localStorage.getItem("customIcons"));
        let newIcon = document.getElementById("addIconInput")
            .value;
        if (newIcon) {
            customIcons.push(newIcon);
            localStorage.setItem("customIcons", JSON.stringify(customIcons));
            // this.drawIcons();
        }
    }
    selectCapital(capitalI) {
        this.select({ i: capitalI, population: 1 }, true, "burg");
    }
    zoomTo(item, z = 5, d = 1200) {
        let { x, y } = item;
        this.storyService.zoomTo(x, y, z, d);
    }
    select(object, zoomTo = false, selectType = "burg") {
        console.log(object);
        if (this.selected == object || !Object.values(object).length) {
            this.selected = {};
            this.storyService.select({}, null);
            return;
        }
        this.selected = object;
        if (zoomTo)
            this.zoomTo(object);
        console.log(selectType);
        this.storyService.select(object, selectType);
    }
};
NotificationSidebarComponent.ɵfac = function NotificationSidebarComponent_Factory(t) { return new (t || NotificationSidebarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_story_service__WEBPACK_IMPORTED_MODULE_2__.StoryService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_world_service__WEBPACK_IMPORTED_MODULE_3__.WorldService)); };
NotificationSidebarComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: NotificationSidebarComponent, selectors: [["app-notification-sidebar"]], decls: 402, vars: 4, consts: [["id", "notification-sidebar", 1, "notification-sidebar", "d-none", "d-sm-none", "d-md-block", 3, "ngClass"], [1, "notification-sidebar-close", 3, "click"], [1, "ft-x", "font-medium-3", "grey", "darken-1"], [1, "side-nav", "notification-sidebar-content", 3, "perfectScrollbar"], [1, "row"], [1, "col-12", "notification-tab-content"], ["ngbNav", "", 1, "nav-tabs"], ["nav", "ngbNav"], ["ngbNavItem", "", 1, "nav-item"], ["ngbNavLink", "", 1, "nav-link"], ["ngbNavContent", ""], [1, "mt-2", 3, "ngbNavOutlet"], ["id", "defElements", "width", "0", "height", "0", 2, "position", "absolute"], ["id", "end-arrow", "viewBox", "0 -5 10 10", "refX", "6", "markerWidth", "7", "markerHeight", "7", "orient", "auto"], ["d", "M0,-5L10,0L0,5", "fill", "#000"], ["id", "end-arrow-small", "viewBox", "0 -5 10 10", "refX", "6", "markerWidth", "2", "markerHeight", "2", "orient", "auto"], ["d", "M0,-5L10,0L0,5", "fill", "#555"], ["id", "icon-dragon", "x", "0px", "y", "0px", "width", "260px", "height", "174px", "viewBox", "0 0 260 174"], ["d", "M252.59,84.22c-22.12,3.78-38.96,23.03-38.96,46.23c0,2.63,0.23,5.21,0.65,7.73c-1.7-0.12-3.42-0.19-5.15-0.19\n c-25.16,0-42.24,13.63-49.13,34.01h-60c-6.64-20.38-23.97-34.01-49.13-34.01c-1.73,0-3.45,0.07-5.15,0.19\n c0.42-2.52,0.65-5.1,0.65-7.73c0-23.2-16.84-42.45-38.96-46.23c11.11-9.31,18.18-23.28,18.18-38.91c0-18.03-9.41-33.87-23.59-42.85\n C5.24,2.15,8.53,2,11.85,2C42.9,2,70.8,15.46,90.03,36.88C83.73,46.99,80,59.56,80,73.18c0,20.74,8.188,39.615,21.83,49.92\n c4.51,3.407,9.144,2.374,11.898-0.304c2.828-2.75,2.825-7.778-0.338-11.076c-9.915-10.34-14.48-15.96-14.16-30.52\n c0.11-5.28,2.14-10.29,5.05-14.55c-1.57-0.17-3.21-0.77-4.71-2.18c-4.75-4.48-3.92-11.86-3.87-12.23c4.32,5.28,11.4,7.23,17.7,5.17\n c0.15-0.11,0.3-0.21,0.45-0.32c-9.93-7.24-7.53-18.66-7.44-19.07c3.48,8.62,11.88,14.03,20.89,13.97\n c9.81-1.18,17.33,2.83,17.33,2.83s2.12-4.22,2.12-10.55c0,0,5.25,5.09,9.08,13.76c2.64,5.97,3.05,11.89,6.44,15.88l4.89,4.69\n c1.27,1.21,1.29,3.24,0.03,4.47l-6.09,6.02l0.61-5.18L149.5,77.8c1.35,3.36,5.1,11.59,5.1,11.59l3.78,1.63l-4.74,1.77\n c-1.74,0.64-3.69,0.14-4.9-1.26c-2.83-3.3-11.76-13.79-12.23-14.36c-3.13-3.83-10.09-4.53-13.21,1.61c-2.2,4.34,0.67,8.25,1.87,9.63\n c5.84,6.72,26.51,15.42,37.9,30.18c10.44-11.07,17.03-27.31,17.03-45.41c0-13.66-3.75-26.25-10.07-36.37\n C189.26,15.44,217.13,2,248.15,2c3.32,0,6.61,0.15,9.85,0.46c-14.18,8.98-23.59,24.82-23.59,42.85\n C234.41,60.94,241.48,74.91,252.59,84.22z"], ["width", "512px", "height", "512px", "viewBox", "0 0 512 512", "id", "icon-undead"], ["fill", "#000", "d", "M244 439.765l-22.63 3 8.5-148.15a68.48 68.48 0 0 0 22.33 6.7l-7.94 138.45zm28.5 7l4.37 1.32 18.3.65v-153.58a70.07 70.07 0 0 1-22.68 6.29v145.35zm-255.26 45.6h473.52l-56.07-32.23-37.84-9.11-46.68-19.3-36.71 34.72-39.41-1.4-27.86-8.41-41.34 5.41-25-15.92-10.78-18.22L85 447.515l-55.34 20.32zm148.05-334.53c-3.757-4.877-10.72-5.866-15.686-2.227-4.966 3.638-6.122 10.575-2.604 15.627l12 16.45 16.21-16.32zm35.71 48.72l-15.6-21.29-16.17 16.3 15.19 20.8 15.37-14.81a8.55 8.55 0 0 1 1.21-1zm25.67 35L211 220.285l-16.44 15.88 16.67 22.76c2.46-6.81 7.9-12.78 15.42-17.32zm-24.9-146.42c-2.193-5.775-8.606-8.733-14.422-6.651-5.817 2.081-8.897 8.436-6.928 14.291l14.23 39.78 20.64-9.62zm16.83 114.35l10.91 30.48a67.76 67.76 0 0 1 21.67-6.74l-11.43-31.86zm2.4-60.42l-20.64 9.62 12.46 34.83 21.18-8.15zm30 32.69l22.62-1.87-1.72-38.52-22.64 1.26zm.75 17l1.51 34.25a83.52 83.52 0 0 1 22.72.42l-1.61-36.54zm17.36-120.58c-.433-6.13-5.672-10.8-11.812-10.53-6.14.272-10.947 5.385-10.838 11.53l2.05 46.5 22.64-1.31zm82.54 20.19c1.945-5.83-1.109-12.149-6.886-14.247-5.777-2.098-12.174.788-14.424 6.507L318 124.575l21.15 8.2zm-18.29 50.4l-21.15-8.2-15.62 43 21.41 7.45zm-55 85.06a63.82 63.82 0 0 1 21.28 7.84l12.59-34.67-21.42-7.45zm106.42-21c5.037-3.722 6.102-10.823 2.38-15.86-3.722-5.037-10.823-6.102-15.86-2.38l-27.18 20.08 14.41 17.55zm-68.65 50.72l28.7-21.21-14.41-17.55-26.69 19.72c6.79 5.16 11.27 11.71 12.38 19.01zm-53 21.46c20.78 0 36.31-9.38 36.31-17.76s-15.53-17.76-36.31-17.76-36.31 9.38-36.31 17.76 15.47 17.72 36.26 17.72z"], ["id", "icon-hag", "x", "0px", "y", "0px", "viewBox", "0 0 511.999 511.999"], ["d", "M145.552,152.522h-42.3L40.819,90.089c-2.919-2.919-4.378-6.747-4.378-10.575\n c0-3.828,1.459-7.656,4.378-10.575c5.838-5.838,15.312-5.838,21.15,0L145.552,152.522z", 2, "fill", "#f7b239"], ["d", "M428.911,417.769l24.487,85.258h-32.299l-34.739-44.74\n  C402.437,446.922,416.781,433.249,428.911,417.769z", 2, "fill", "#808080"], ["d", "M153.567,458.287l-34.739,44.74H86.529l24.487-85.258\n  C123.146,433.249,137.489,446.922,153.567,458.287z", 2, "fill", "#808080"], ["d", "M297.477,205.158v61.009c0,11.891-9.642,21.533-21.533,21.533c-5.945,0-11.329-2.404-15.228-6.304\n s-6.304-9.283-6.304-15.228v-37.084c0-11.891-9.642-21.533-21.533-21.533c-5.945,0-11.329,2.404-15.228,6.304\n c-3.9,3.9-6.304,9.283-6.304,15.228v5.981c0,11.891-9.642,21.533-21.533,21.533c-5.945,0-11.329-2.404-15.228-6.304\n c-3.9-3.9-6.304-9.283-6.304-15.228v-29.907v-52.636h129.196V205.158z", 2, "fill", "#9ad14b"], ["d", "M168.281,152.522v52.636H90.668c-0.754,0-1.507-0.036-2.249-0.096\n c-6.376-0.538-12.106-3.35-16.365-7.608c-4.761-4.761-7.704-11.341-7.704-18.614c0-14.535,11.783-26.318,26.318-26.318h12.585h42.3\n C145.552,152.522,168.281,152.522,168.281,152.522z", 2, "fill", "#b3b3b3"], ["d", "M106.04,197.454c-4.761-4.761-7.704-11.341-7.704-18.614c0-14.535,11.783-26.318,26.318-26.318\n h-21.401H90.668c-14.535,0-26.318,11.783-26.318,26.318c0,7.273,2.943,13.853,7.704,18.614c4.259,4.259,9.989,7.07,16.365,7.608\n c0.742,0.06,1.495,0.096,2.249,0.096h33.986c-0.754,0-1.507-0.036-2.249-0.096C116.028,204.524,110.298,201.712,106.04,197.454z", 2, "fill", "#999999"], ["d", "M467.861,160.226c4.761,4.761,7.704,11.341,7.704,18.614c0,13.769-10.575,25.074-24.057,26.222\n c-0.742,0.06-1.495,0.096-2.261,0.096h-151.77v-52.636h151.77C456.508,152.522,463.088,155.465,467.861,160.226z", 2, "fill", "#b3b3b3"], ["d", "M471.809,293.358c0,46.941-16.018,90.138-42.898,124.411c-12.13,15.48-26.473,29.153-42.551,40.517\n c-32.897,23.255-73.056,36.917-116.396,36.917s-83.499-13.661-116.396-36.917c-16.078-11.364-30.421-25.038-42.551-40.517\n c-26.88-34.273-42.898-77.47-42.898-124.411c0-23.112,3.876-45.326,11.042-65.998c2.644-7.656,5.742-15.097,9.259-22.298\n c0.742,0.06,1.495,0.096,2.249,0.096h77.613v29.907c0,5.945,2.404,11.329,6.304,15.228c3.9,3.9,9.283,6.304,15.228,6.304\n c11.891,0,21.533-9.642,21.533-21.533v-5.981c0-5.945,2.404-11.329,6.304-15.228s9.283-6.304,15.228-6.304\n c11.891,0,21.533,9.642,21.533,21.533v37.084c0,5.945,2.404,11.329,6.304,15.228c3.9,3.9,9.283,6.304,15.228,6.304\n c11.891,0,21.533-9.642,21.533-21.533v-61.009h151.77c0.766,0,1.519-0.036,2.261-0.096c3.517,7.201,6.603,14.642,9.247,22.286\n C467.921,248.032,471.809,270.246,471.809,293.358z", 2, "fill", "#cccccc"], ["d", "M451.508,205.062c-0.742,0.06-1.495,0.096-2.261,0.096h-151.77v24.846h151.77\n  c0.766,0,1.519-0.036,2.261-0.096c3.29-0.275,6.412-1.172,9.247-2.56C458.111,219.704,455.025,212.263,451.508,205.062z", 2, "fill", "#b3b3b3"], ["d", "M172.025,417.769c-26.88-34.273-42.898-77.47-42.898-124.411c0-22.132,3.571-43.429,10.159-63.354\n  h28.995v-24.846h-18.899H90.668c-0.754,0-1.507-0.036-2.249-0.096l0,0l0,0c-0.011,0.022-0.02,0.043-0.03,0.065\n  c-0.83,1.702-1.635,3.419-2.418,5.148c-0.325,0.718-0.63,1.445-0.947,2.168c-0.459,1.047-0.922,2.092-1.365,3.149\n  c-0.333,0.794-0.647,1.596-0.969,2.395c-0.409,1.014-0.821,2.028-1.213,3.05c-0.292,0.761-0.571,1.529-0.854,2.294\n  c-0.409,1.107-0.816,2.213-1.207,3.328c-0.083,0.236-0.173,0.467-0.255,0.702c0.005,0.002,0.01,0.004,0.013,0.006\n  c-7.158,20.679-11.055,42.879-11.055,65.992c0,46.941,16.018,90.138,42.898,124.411c12.13,15.48,26.473,29.153,42.551,40.517\n  c32.897,23.255,73.056,36.917,116.396,36.917c10.37,0,20.555-0.791,30.505-2.299c-31.635-4.796-60.866-16.927-85.892-34.617\n  C198.499,446.922,184.156,433.249,172.025,417.769z", 2, "fill", "#b3b3b3"], ["d", "M464.011,210.881c12.103-5.6,20.523-17.852,20.523-32.039c0-9.433-3.669-18.296-10.34-24.966\n c-6.674-6.657-15.535-10.324-24.949-10.324H149.265L68.311,62.597c-4.519-4.519-10.528-7.009-16.92-7.009\n c-6.39,0-12.399,2.489-16.919,7.008c-4.519,4.519-7.008,10.528-7.008,16.919c0,6.392,2.489,12.4,7.008,16.919l48.071,48.071\n c-15.555,3.68-27.168,17.672-27.168,34.336c0,9.433,3.669,18.296,10.332,24.958c2.999,2.999,6.445,5.384,10.187,7.109\n c-11.113,26.028-16.752,53.711-16.752,82.451c0,47.28,15.646,90.973,42.031,126.177l-23.268,81.014\n c-0.778,2.708-0.238,5.625,1.457,7.875s4.348,3.574,7.167,3.574h32.299c2.771,0,5.387-1.281,7.087-3.469l29.645-38.177\n c32.973,21.386,72.26,33.823,114.403,33.823c42.144,0,81.433-12.439,114.406-33.826l29.645,38.18c1.7,2.189,4.315,3.469,7.087,3.469\n h32.299c2.817,0,5.471-1.323,7.167-3.574c1.695-2.25,2.233-5.167,1.457-7.875l-23.27-81.019\n c26.382-35.204,42.027-78.896,42.027-126.173C480.776,264.611,475.132,236.92,464.011,210.881z M461.515,166.572\n c3.273,3.273,5.076,7.63,5.076,12.269c0,9.564-7.782,17.346-17.346,17.346H306.447v-34.692h142.798\n C453.874,161.495,458.236,163.3,461.515,166.572z M232.876,198.579c-16.821,0-30.505,13.684-30.505,30.505v5.981\n c0,6.926-5.634,12.561-12.561,12.561s-12.561-5.634-12.561-12.561v-73.57h111.252v104.673c0,6.926-5.634,12.561-12.561,12.561\n c-6.926,0-12.562-5.634-12.562-12.561v-37.084C263.38,212.263,249.696,198.579,232.876,198.579z M45.408,79.516\n c0-1.598,0.622-3.101,1.753-4.231c2.333-2.332,6.128-2.333,8.462,0l68.266,68.267h-16.924L47.161,83.747\n C46.03,82.616,45.408,81.114,45.408,79.516z M90.665,161.495h68.642v34.692H90.665c-4.639,0-8.997-1.803-12.27-5.076\n s-5.076-7.631-5.076-12.27C73.319,169.277,81.1,161.495,90.665,161.495z M114.433,494.056H98.437l16.618-57.86\n c7.946,8.609,16.595,16.557,25.861,23.752L114.433,494.056z M77.085,293.359c0-27.705,5.712-54.329,16.981-79.228h65.239v20.935\n c0,16.821,13.684,30.505,30.505,30.505s30.505-13.684,30.505-30.505v-5.981c0-6.926,5.634-12.561,12.561-12.561\n s12.561,5.634,12.561,12.561v37.084c0,16.821,13.685,30.505,30.505,30.505s30.505-13.684,30.505-30.505v-52.037H445.85\n c11.27,24.901,16.982,51.525,16.982,79.228c0,106.351-86.523,192.873-192.873,192.873S77.085,399.71,77.085,293.359z\n M441.485,494.056h-15.995l-26.485-34.11c9.266-7.194,17.915-15.142,25.861-23.753L441.485,494.056z", 2, "fill", "#333333"], ["d", "M257.395,117.832c0,4.955,4.016,8.972,8.972,8.972s8.972-4.017,8.972-8.972\n  c0-7.361,1.306-10.661,2.96-14.841c1.977-4.997,4.218-10.661,4.218-21.443s-2.241-16.446-4.217-21.444\n  c-1.654-4.18-2.961-7.481-2.961-14.844c0-7.362,1.306-10.663,2.96-14.843c1.977-4.998,4.218-10.662,4.218-21.444\n  c0-4.955-4.016-8.972-8.972-8.972s-8.972,4.017-8.972,8.972c0,7.362-1.306,10.663-2.961,14.844\n  c-1.976,4.998-4.217,10.662-4.217,21.444s2.241,16.447,4.218,21.444c1.653,4.18,2.96,7.481,2.96,14.843\n  c0,7.361-1.306,10.661-2.96,14.841C259.636,101.387,257.395,107.051,257.395,117.832z", 2, "fill", "#9ad14b"], ["d", "M193.994,117.832c0,4.955,4.017,8.972,8.972,8.972c4.955,0,8.972-4.017,8.972-8.972\n  c0-7.361,1.306-10.661,2.96-14.841c1.977-4.997,4.218-10.661,4.218-21.443s-2.241-16.446-4.218-21.444\n  c-1.653-4.18-2.96-7.481-2.96-14.844c0-4.955-4.017-8.972-8.972-8.972c-4.955,0-8.972,4.017-8.972,8.972\n  c0,10.782,2.241,16.447,4.218,21.444c1.653,4.18,2.96,7.481,2.96,14.843c0,7.361-1.306,10.661-2.96,14.841\n  C196.235,101.387,193.994,107.051,193.994,117.832z", 2, "fill", "#9ad14b"], ["d", "M320.797,117.832c0,4.955,4.016,8.972,8.972,8.972s8.972-4.017,8.972-8.972\n  c0-7.361,1.306-10.661,2.96-14.841c1.977-4.997,4.218-10.661,4.218-21.443s-2.241-16.446-4.217-21.444\n  c-1.654-4.18-2.961-7.481-2.961-14.844c0-4.955-4.016-8.972-8.972-8.972s-8.972,4.017-8.972,8.972\n  c0,10.782,2.241,16.447,4.217,21.444c1.654,4.18,2.961,7.481,2.961,14.843c0,7.361-1.306,10.661-2.96,14.841\n  C323.038,101.387,320.797,107.051,320.797,117.832z", 2, "fill", "#9ad14b"], ["id", "icon-devil", "x", "0px", "y", "0px", "viewBox", "0 0 512.001 512.001"], ["d", "M306.297,301.13c8.183,19.09,30.295,27.934,49.384,19.751c19.09-8.17,27.934-30.282,19.764-49.371\n L306.297,301.13z M287.713,367.166c-9.324,0.571-20.153,1.932-31.708,1.932h-0.013c-11.542,0-22.371-1.362-31.708-1.932\n c-19.038-1.193-31.838,0.895-31.838,24.446c0,29.491,20.101,54.299,47.348,61.458c5.174,1.362,10.595,2.088,16.198,2.088\n c5.602,0,11.036-0.726,16.224-2.088c27.247-7.172,47.322-31.968,47.322-61.458C319.538,368.061,306.738,365.973,287.713,367.166z\n M205.7,301.13l-69.149-29.62c-8.183,19.09,0.674,41.201,19.764,49.371C175.405,329.064,197.517,320.22,205.7,301.13z\n M428.772,284.323v43.925c0,2.788-0.065,5.564-0.195,8.326c-2.646,55.804-31.773,104.67-75.075,134.329\n c-0.376,0.272-0.765,0.519-1.141,0.778c-27.519,18.519-60.667,29.335-96.357,29.335s-68.837-10.816-96.37-29.335\n c-0.363-0.259-0.752-0.506-1.128-0.778c-43.315-29.659-72.443-78.525-75.088-134.329c-0.13-2.762-0.195-5.538-0.195-8.326v-43.925\n v-52.212v-48.334c0-8.118,0.558-16.107,1.647-23.927c9.298,7.146,19.738,13.708,31.462,19.401\n c28.751,13.954,62.197-7.172,62.197-39.126v-0.506c0-20.218-14.019-37.531-33.679-42.278c-11.412-2.762-22.124-6.225-32.123-10.167\n c31.06-45.961,83.634-76.178,143.277-76.178c47.711,0,90.91,19.336,122.164,50.603c7.82,7.82,14.888,16.379,21.1,25.574v0.013\n c-9.999,3.942-20.711,7.392-32.123,10.154c-19.66,4.747-33.679,22.06-33.679,42.278v0.506c0,31.955,33.446,53.08,62.197,39.126\n c11.737-5.693,22.176-12.255,31.462-19.401c1.089,7.82,1.647,15.809,1.647,23.927v48.334L428.772,284.323L428.772,284.323z", 2, "fill", "#f95428"], ["d", "M212.791,471.68c-0.363-0.259-0.752-0.519-1.128-0.791c-43.302-29.646-72.443-78.525-75.088-134.316\n c-0.13-2.762-0.195-5.538-0.195-8.326V284.31v-52.199v-21.256v-27.078c0-48.088,19.647-91.597,51.356-122.916\n c25.236-24.931,58.116-42.147,94.809-47.82c-8.659-1.344-17.517-2.044-26.539-2.044c-47.335,0-90.223,19.038-121.425,49.864\n c-31.708,31.319-51.356,74.829-51.356,122.916v27.078v21.256v52.199v43.938c0,2.788,0.065,5.564,0.195,8.326\n c2.646,55.791,31.786,104.669,75.088,134.316c0.376,0.272,0.765,0.532,1.128,0.791c27.532,18.519,60.68,29.335,96.37,29.335\n c9.039,0,17.914-0.7,26.578-2.037C257.041,495.035,233.349,485.508,212.791,471.68z", 2, "fill", "#e54728"], ["d", "M178.531,139.619v0.506c0,7.963-2.075,15.251-5.641,21.489\n  c-10.738,18.817-34.963,28.116-56.556,17.637c-11.724-5.693-22.163-12.255-31.462-19.401C12.208,103.981,9.731,12.125,9.731,12.125\n  s0,0.013,0.026,0.039c1.089,1.465,36.39,48.814,102.971,75.01c9.999,3.942,20.711,7.405,32.123,10.167\n  C164.511,102.088,178.531,119.401,178.531,139.619z", 2, "fill", "#fcd69a"], ["d", "M502.279,12.125c0,0-2.49,91.857-75.153,147.725c-9.286,7.146-19.725,13.708-31.462,19.401\n  c-28.751,13.954-62.197-7.172-62.197-39.126v-0.506c0-20.218,14.019-37.531,33.679-42.278c11.412-2.762,22.124-6.212,32.123-10.154\n  v-0.013C466.926,60.562,502.279,12.125,502.279,12.125z", 2, "fill", "#fcd69a"], ["d", "M172.889,161.614c-10.738,18.817-34.963,28.116-56.556,17.637\n  c-11.724-5.693-22.163-12.255-31.462-19.401C12.208,103.981,9.731,12.125,9.731,12.125s0,0.013,0.026,0.039\n  C10.743,14.563,57.313,125.626,172.889,161.614z", 2, "fill", "#d3a562"], ["d", "M339.121,161.614c10.738,18.817,34.963,28.116,56.556,17.637\n  c11.724-5.693,22.163-12.255,31.462-19.401c72.663-55.869,75.14-147.725,75.14-147.725s0,0.013-0.026,0.039\n  C501.267,14.563,454.697,125.626,339.121,161.614z", 2, "fill", "#d3a562"], ["d", "M375.446,271.51c8.17,19.09-0.674,41.201-19.764,49.371c-19.09,8.183-41.201-0.661-49.384-19.751\n  L375.446,271.51z", 2, "fill", "#f2f2f2"], ["d", "M136.551,271.51l69.149,29.62c-8.183,19.09-30.295,27.934-49.384,19.751\n  C137.226,312.711,128.368,290.599,136.551,271.51z", 2, "fill", "#f2f2f2"], ["d", "M287.713,367.166c19.025-1.193,31.825,0.895,31.825,24.446c0,29.491-20.075,54.286-47.322,61.458\n c-5.187,1.362-10.621,2.088-16.224,2.088c-5.602,0-11.023-0.726-16.198-2.088c-27.247-7.159-47.348-31.968-47.348-61.458\n c0-23.551,12.8-25.639,31.838-24.446c9.337,0.571,20.166,1.932,31.708,1.932h0.013C267.56,369.098,278.389,367.736,287.713,367.166z\n ", 2, "fill", "#666666"], ["d", "M83.224,328.247c0,2.788,0.065,5.564,0.195,8.326c-22.63-6.601-39.165-27.506-39.165-52.263\n  c0-24.679,16.444-45.546,38.971-52.199v52.212V328.247z", 2, "fill", "#e54728"], ["d", "M428.772,232.111c22.526,6.653,38.971,27.519,38.971,52.199c0,24.757-16.535,45.662-39.165,52.263\n  c0.13-2.762,0.195-5.538,0.195-8.326v-43.925L428.772,232.111L428.772,232.111z", 2, "fill", "#e54728"], ["d", "M224.284,408.652c-5.372,0-9.726-4.355-9.726-9.726v-31.76c0-5.372,4.355-9.765,9.726-9.765\n  c5.372,0,9.726,4.316,9.726,9.688v31.838C234.01,404.298,229.655,408.652,224.284,408.652z", 2, "fill", "#f2f2f2"], ["d", "M256.005,408.652c-5.372,0-9.726-4.355-9.726-9.726v-29.828c0-5.372,4.355-9.726,9.726-9.726\n  s9.726,4.355,9.726,9.726v29.828C265.731,404.298,261.376,408.652,256.005,408.652z", 2, "fill", "#f2f2f2"], ["d", "M287.713,408.652c-5.372,0-9.726-4.355-9.726-9.726v-31.76c0-5.372,4.355-9.765,9.726-9.765\n  c5.372,0,9.726,4.316,9.726,9.688v31.838C297.44,404.298,293.085,408.652,287.713,408.652z", 2, "fill", "#f2f2f2"], ["d", "M239.794,462.796c-5.372,0-9.726-4.355-9.726-9.726v-26.91c0-5.372,4.355-9.726,9.726-9.726\n  c5.372,0,9.726,4.355,9.726,9.726v26.91C249.521,458.441,245.166,462.796,239.794,462.796z", 2, "fill", "#f2f2f2"], ["d", "M272.216,462.796c-5.372,0-9.726-4.355-9.726-9.726v-26.91c0-5.372,4.355-9.726,9.726-9.726\n  s9.726,4.355,9.726,9.726v26.91C281.942,458.441,277.587,462.796,272.216,462.796z", 2, "fill", "#f2f2f2"], ["d", "M147.974,237.971l5.602-2.4c3.949-1.694,8.465-0.824,11.503,2.215l33.139,33.139\n  c5.829,5.829,13.486,8.743,21.143,8.743c7.657,0,15.315-2.914,21.143-8.743c3.798-3.798,3.798-9.957,0-13.754\n  c-3.799-3.798-9.957-3.798-13.755,0c-4.075,4.073-10.702,4.073-14.776,0l-33.139-33.139c-8.694-8.695-21.616-11.183-32.921-6.34\n  l-5.601,2.4c-4.938,2.115-7.225,7.834-5.108,12.771C137.319,237.802,143.038,240.088,147.974,237.971z", 2, "fill", "#333333"], ["d", "M292.633,279.668c7.657,0,15.315-2.914,21.143-8.743l33.139-33.139\n  c3.037-3.039,7.553-3.909,11.503-2.215l5.601,2.4c4.937,2.116,10.655-0.17,12.771-5.108c2.116-4.937-0.171-10.655-5.108-12.771\n  l-5.601-2.4c-11.303-4.844-24.227-2.355-32.922,6.34L300.02,257.17c-4.075,4.073-10.702,4.073-14.776,0\n  c-3.799-3.798-9.957-3.798-13.755,0c-3.798,3.798-3.798,9.957,0,13.754C277.319,276.754,284.977,279.668,292.633,279.668z", 2, "fill", "#333333"], ["d", "M496.836,80.342C511,43.699,511.963,13.643,511.997,12.383c0.115-4.251-2.55-8.079-6.574-9.458\n  c-4.024-1.38-8.48,0.022-10.997,3.451c-0.375,0.511-32.215,43.105-91.72,68.835c-5.373-7.247-11.287-14.119-17.659-20.49\n  C350.591,20.248,304.763,1.265,256.004,1.265c-58.046,0-112.291,27.506-146.701,73.947C49.794,49.482,17.952,6.888,17.584,6.386\n  C15.073,2.946,10.62,1.54,6.586,2.913c-4.031,1.375-6.698,5.212-6.583,9.468c0.034,1.262,0.997,31.317,15.162,67.959\n  c13.114,33.928,33.327,62.258,59.404,83.651c-0.705,6.535-1.074,13.162-1.074,19.778V225.3\n  c-23.266,9.973-38.968,33.268-38.968,59.01c0,26.009,15.993,49.47,39.631,59.285c4.581,54.333,33.283,104.082,78.762,135.265\n  c0.246,0.176,0.497,0.346,0.744,0.514l0.309,0.211c0.077,0.054,0.153,0.108,0.231,0.161\n  c30.143,20.275,65.344,30.991,101.798,30.991c36.46,0,71.658-10.717,101.888-31.061l0.318-0.214c0.294-0.196,0.587-0.394,0.878-0.6\n  c45.472-31.186,74.169-80.933,78.748-135.264c23.638-9.815,39.632-33.276,39.632-59.285c0-25.741-15.702-49.038-38.969-59.01\n  v-41.528c0-6.614-0.368-13.24-1.073-19.772C463.506,142.606,483.72,114.274,496.836,80.342z M488.109,41.984\n  c-8.205,36.433-31.413,96.796-96.698,128.511c-10.414,5.059-22.51,4.398-32.362-1.768c-9.929-6.215-15.857-16.907-15.857-28.6\n  v-0.504c0-15.601,10.789-29.103,26.237-32.833C425.77,93.186,465.531,63.365,488.109,41.984z M33.553,73.955\n  c-4.539-11.634-7.626-22.621-9.72-32.026c22.569,21.384,62.348,51.245,118.737,64.862c15.448,3.73,26.237,17.231,26.237,32.833\n  v0.504c0,11.694-5.928,22.384-15.857,28.6c-9.851,6.165-21.949,6.825-32.362,1.768C80.17,150.86,50.887,118.379,33.553,73.955z\n  M53.98,284.311c0-14.952,7.602-28.716,19.515-36.91v73.825C61.578,313.034,53.98,299.278,53.98,284.311z M458.014,284.311\n  c0,14.968-7.598,28.724-19.516,36.915V247.4C450.412,255.593,458.014,269.358,458.014,284.311z M419.045,183.772v144.47\n  c0,53.834-26.557,104.162-71.039,134.631c-0.07,0.048-0.139,0.096-0.207,0.145c-0.128,0.092-0.261,0.179-0.39,0.266l-0.477,0.323\n  c-26.909,18.107-58.35,27.678-90.927,27.678c-32.534,0-63.944-9.547-90.845-27.614c-0.2-0.141-0.405-0.28-0.611-0.419\n  c-0.112-0.077-0.227-0.152-0.338-0.232c-0.069-0.051-0.137-0.099-0.209-0.147c-44.49-30.463-71.051-80.793-71.051-134.63v-144.47\n  c0-2.131,0.052-4.26,0.134-6.388c6.089,3.865,12.424,7.412,19.005,10.61c7.356,3.574,15.239,5.346,23.101,5.346\n  c9.75,0,19.463-2.727,28.082-8.122c15.647-9.794,24.988-26.649,24.988-45.088v-0.504c0-24.618-16.911-45.896-41.123-51.742\n  c-6.53-1.577-12.825-3.399-18.885-5.42c30.854-38.869,77.723-61.743,127.752-61.743c43.561,0,84.505,16.959,115.287,47.754\n  c4.412,4.412,8.575,9.095,12.463,13.989c-6.06,2.021-12.357,3.844-18.886,5.421c-24.214,5.846-41.125,27.125-41.125,51.742v0.504\n  c0,18.439,9.341,35.294,24.988,45.088c8.62,5.396,18.332,8.122,28.083,8.122c7.859,0,15.745-1.771,23.101-5.346\n  c6.579-3.197,12.911-6.741,18.998-10.604C418.993,179.516,419.045,181.644,419.045,183.772z", 2, "fill", "#333333"], ["d", "M359.509,329.827c23.992-10.278,35.15-38.158,24.872-62.149c-2.115-4.938-7.833-7.225-12.77-5.111\n  l-69.141,29.618c-2.372,1.015-4.242,2.932-5.2,5.326c-0.407,1.017-0.624,2.084-0.674,3.159h-0.012\n  c-0.083,1.775-1.277,43.813,64.971,73.414c1.289,0.576,2.637,0.848,3.962,0.848c3.719,0,7.27-2.145,8.886-5.761\n  c2.19-4.905-0.008-10.656-4.913-12.848c-16.87-7.537-28.413-15.684-36.319-23.338c2.555,0.425,5.147,0.668,7.763,0.668\n  C347.143,333.651,353.451,332.422,359.509,329.827z M368.721,284.967c0.534,11.294-5.884,22.272-16.872,26.98\n  c-6.847,2.932-14.425,3.023-21.339,0.257c-3.783-1.513-7.118-3.784-9.844-6.65L368.721,284.967z", 2, "fill", "#333333"], ["d", "M319.893,364.839c-10.187-9.367-25.064-8.113-42.285-6.662c-6.943,0.585-14.125,1.189-21.611,1.189\n  c-7.485,0-14.667-0.604-21.611-1.189c-17.224-1.451-32.099-2.704-42.285,6.662c-6.309,5.8-9.375,14.555-9.375,26.767\n  c0,40.402,32.87,73.273,73.273,73.273s73.273-32.87,73.273-73.273C329.27,379.394,326.203,370.638,319.893,364.839z\n  M281.941,438.741v-12.586c0-5.372-4.355-9.726-9.726-9.726s-9.726,4.355-9.726,9.726v18.865c-2.129,0.257-4.293,0.406-6.491,0.406\n  c-2.194,0-4.352-0.148-6.478-0.403v-18.867c0-5.372-4.355-9.726-9.726-9.726c-5.372,0-9.726,4.355-9.726,9.726v12.594\n  c-16.61-9.173-27.889-26.863-27.889-47.143c0-4.382,0.536-10.1,3.088-12.446c1.764-1.621,5.08-2.305,9.295-2.481v22.242\n  c0,5.372,4.355,9.726,9.726,9.726c5.372,0,9.726-4.355,9.726-9.726v-21.254c3.856,0.324,7.97,0.654,12.264,0.879v20.375\n  c0,5.372,4.355,9.726,9.726,9.726c5.372,0,9.726-4.355,9.726-9.726v-20.376c4.29-0.224,8.4-0.555,12.251-0.878v21.254\n  c0,5.372,4.355,9.726,9.726,9.726s9.726-4.355,9.726-9.726v-22.244c4.216,0.176,7.532,0.862,9.295,2.483\n  c2.552,2.346,3.088,8.064,3.088,12.446C309.817,411.88,298.543,429.566,281.941,438.741z", 2, "fill", "#333333"], ["d", "M243.353,294.524c0-5.372-4.355-9.726-9.726-9.726c-5.372,0-9.726,4.355-9.726,9.726v31.328\n  c0,15.263,12.416,27.679,27.679,27.679h8.837c15.263,0,27.679-12.416,27.679-27.679v-31.328c0-5.372-4.355-9.726-9.726-9.726\n  c-5.372,0-9.726,4.355-9.726,9.726v31.328c0,4.536-3.69,8.226-8.226,8.226h-8.837c-4.536,0-8.226-3.69-8.226-8.226V294.524z", 2, "fill", "#333333"], ["d", "M215.409,300.669c-0.001-0.03-0.012-0.058-0.014-0.088c-0.058-1.044-0.276-2.08-0.672-3.07\n  c-0.958-2.395-2.828-4.311-5.2-5.326l-69.141-29.618c-4.937-2.114-10.655,0.172-12.77,5.111\n  c-4.979,11.622-5.133,24.487-0.436,36.226c4.699,11.738,13.686,20.944,25.308,25.923c6.059,2.595,12.364,3.824,18.574,3.824\n  c2.565,0,5.11-0.231,7.618-0.641c-7.902,7.67-19.41,15.822-36.173,23.311c-4.905,2.192-7.104,7.943-4.913,12.848\n  c1.616,3.616,5.165,5.761,8.886,5.761c1.325,0,2.674-0.272,3.962-0.848C216.688,344.481,215.494,302.444,215.409,300.669z\n  M160.145,311.946c-10.99-4.708-17.406-15.684-16.872-26.98l48.056,20.586c-2.726,2.866-6.063,5.136-9.844,6.65\n  C174.57,314.97,166.991,314.879,160.145,311.946z", 2, "fill", "#333333"], ["id", "icon-banshee", "viewBox", "0 0 511.999 511.999"], ["d", "M385.711,204.678c18.259,6.857,31.279,24.503,31.279,45.12c0,26.573-21.612,48.185-48.173,48.185\n v5.932c0,24.618-19.958,44.577-44.577,44.577l-11.957,102.81c-2.463,31.314-30.77,55.342-62.789,51.642\n c-26.989-3.111-47.711-25.474-49.85-52.556l-11.887-101.897c-12.303,0-23.451-4.995-31.51-13.055\n c-8.071-8.071-13.055-19.207-13.055-31.522v-5.932c-26.573,0-48.185-21.612-48.185-48.185c0-20.618,13.02-38.263,31.279-45.12\n v-0.012v-66.293c0-71.635,58.071-129.706,129.706-129.706c71.647,0,129.718,58.071,129.718,129.706V204.678z M388.082,249.798\n c0-10.638-8.626-19.276-19.265-19.276c-31.88,0-57.817-25.937-57.817-57.817c0-10.638-8.638-19.265-19.276-19.265\n c-10.65,0-19.276,8.626-19.276,19.265c0,53.134,43.236,96.369,96.369,96.369C379.455,269.074,388.082,260.448,388.082,249.798z\n M294.418,346.121c0.139-1.341,0.208-2.683,0.208-4.001c0-21.034-17.091-38.552-38.622-38.552\n c-22.896,0-40.761,19.785-38.414,42.553l10.349,100.752c1.469,14.385,13.599,25.324,28.064,25.324\n c14.466,0,26.584-10.939,28.064-25.324L294.418,346.121z M260.237,281.204c13.772,0,22.375-14.905,15.495-26.827l-19.727-34.17\n l-19.727,34.17c-6.88,11.922,1.723,26.827,15.483,26.827H260.237z M239.55,172.705c0-10.638-8.626-19.265-19.276-19.265\n c-10.638,0-19.265,8.626-19.265,19.265c0,31.88-25.937,57.817-57.817,57.817c-10.65,0-19.276,8.638-19.276,19.276\n c0,10.65,8.626,19.276,19.276,19.276C196.326,269.074,239.55,225.839,239.55,172.705z", 2, "fill", "#e6e6e6"], ["d", "M271.037,502.944c-17.275,0-21.78-25.474-23.127-52.556l-34.874-101.897\n c-7.746,0-14.764-4.995-19.838-13.055c-5.081-8.071-8.219-19.207-8.219-31.522l0,0c0-3.038-1.978-5.8-4.919-6.565\n c-14.398-3.743-25.416-23.639-25.416-47.552c0-20.618,8.197-16.698,19.692-23.555l0,0v-87.87c0-71.635,36.56-129.705,81.659-129.706\n h-0.001c-71.635,0-129.706,58.071-129.706,129.706v66.293v0.012c-18.259,6.857-31.279,24.503-31.279,45.12\n c0,26.573,21.612,48.185,48.185,48.185v5.932c0,12.315,4.984,23.451,13.055,31.522c8.06,8.06,19.207,13.055,31.51,13.055\n l11.887,101.897c2.139,27.081,22.861,49.445,49.85,52.556c2.055,0.237,35.712,0.357,37.731,0.371\n C286.001,503.294,298.264,502.944,271.037,502.944z", 2, "fill", "#b3b3b3"], ["d", "M294.626,342.12c0,1.318-0.069,2.66-0.208,4.001l-10.349,100.752\n  c-1.48,14.385-13.599,25.324-28.064,25.324c-14.466,0-26.596-10.939-28.064-25.324l-10.349-100.752\n  c-2.347-22.768,15.518-42.553,38.414-42.553C277.536,303.568,294.626,321.086,294.626,342.12z", 2, "fill", "#666666"], ["d", "M275.732,254.377c6.88,11.922-1.723,26.827-15.495,26.827h-8.476\n  c-13.76,0-22.364-14.905-15.483-26.827l19.727-34.17L275.732,254.377z", 2, "fill", "#666666"], ["d", "M368.817,230.522c10.638,0,19.265,8.638,19.265,19.276c0,10.65-8.626,19.276-19.265,19.276\n  c-53.134,0-96.369-43.235-96.369-96.369c0-10.638,8.626-19.265,19.276-19.265c10.638,0,19.276,8.626,19.276,19.265\n  C311,204.585,336.937,230.522,368.817,230.522z", 2, "fill", "#666666"], ["d", "M220.274,153.44c10.65,0,19.276,8.626,19.276,19.265c0,53.134-43.224,96.369-96.358,96.369\n  c-10.65,0-19.276-8.626-19.276-19.276c0-10.638,8.626-19.276,19.276-19.276c31.88,0,57.817-25.937,57.817-57.817\n  C201.009,162.067,209.635,153.44,220.274,153.44z", 2, "fill", "#666666"], ["d", "M368.811,221.855c-27.099,0-49.144-22.046-49.144-49.144c0-15.409-12.536-27.945-27.945-27.945\n  c-15.409,0-27.945,12.536-27.945,27.945c0,57.916,47.118,105.034,105.034,105.034c15.409,0,27.945-12.536,27.945-27.945\n  S384.221,221.855,368.811,221.855z M368.811,260.399c-48.351,0-87.689-39.337-87.689-87.689c0-5.844,4.755-10.6,10.6-10.6\n  s10.6,4.755,10.6,10.6c0,36.663,29.827,66.489,66.489,66.489c5.845,0,10.6,4.755,10.6,10.6\n  C379.411,255.644,374.657,260.399,368.811,260.399z", 2, "fill", "#333333"], ["d", "M220.278,133.202c11.121,0,21.797,4.75,29.292,13.033c1.644,1.817,3.98,2.854,6.43,2.854\n  c2.45,0,4.786-1.036,6.43-2.854c7.494-8.283,18.171-13.033,29.292-13.033c4.79,0,8.673-3.883,8.673-8.673s-3.883-8.673-8.673-8.673\n  c-13.048,0-25.666,4.536-35.723,12.66c-10.056-8.123-22.675-12.66-35.723-12.66c-4.79,0-8.673,3.883-8.673,8.673\n  S215.489,133.202,220.278,133.202z", 2, "fill", "#333333"], ["d", "M394.386,199.047v-60.668C394.386,62.077,332.304,0,255.995,0\n  c-76.302,0-138.379,62.077-138.379,138.379v60.667c-18.536,9.378-31.281,28.599-31.281,50.753c0,28.416,20.953,52.029,48.22,56.199\n  c0.996,25.777,20.406,46.914,45.416,50.594l11.037,94.643c2.556,31.42,26.711,56.779,57.495,60.327\n  c2.531,0.291,5.057,0.436,7.565,0.436c14.988,0,29.394-5.161,41.211-14.887c13.611-11.203,22.219-27.583,23.636-44.964\n  l11.112-95.555c25.009-3.682,44.418-24.817,45.414-50.593c27.269-4.17,48.222-27.783,48.222-56.2\n  C425.665,227.646,412.921,208.425,394.386,199.047z M368.811,289.308c-4.79,0-8.673,3.883-8.673,8.673v5.938\n  c0,19.794-16.103,35.897-35.897,35.897c-4.402,0-8.106,3.298-8.615,7.671L303.67,450.299c-0.013,0.106-0.023,0.213-0.031,0.32\n  c-1.007,12.774-7.343,24.839-17.381,33.101c-10.125,8.335-22.824,12.103-35.767,10.612c-22.621-2.608-40.371-21.376-42.204-44.628\n  c-0.009-0.108-0.02-0.216-0.031-0.323l-11.884-101.898c-0.51-4.372-4.214-7.668-8.615-7.668c-19.794,0-35.897-16.103-35.897-35.897\n  v-5.939c0-4.79-3.883-8.673-8.673-8.673c-21.784,0-39.507-17.723-39.507-39.509c0-21.784,17.723-39.509,39.507-39.509\n  c4.79,0,8.673-3.883,8.673-8.673s-3.883-8.673-8.673-8.673c-2.795,0-5.54,0.212-8.227,0.602v-55.169\n  c0-66.738,54.296-121.034,121.034-121.034c66.745,0,121.045,54.296,121.045,121.034v55.17c-2.689-0.392-5.434-0.602-8.23-0.602\n  c-4.79,0-8.673,3.883-8.673,8.673s3.883,8.673,8.673,8.673c21.785,0,39.509,17.723,39.509,39.509\n  C408.32,271.585,390.597,289.308,368.811,289.308z", 2, "fill", "#333333"], ["d", "M248.224,172.711c0-15.409-12.536-27.945-27.945-27.945s-27.945,12.536-27.945,27.945\n  c0,27.099-22.046,49.144-49.144,49.144c-15.409,0-27.944,12.536-27.944,27.945s12.536,27.945,27.944,27.945\n  C201.105,277.744,248.224,230.627,248.224,172.711z M143.189,260.399c-5.844,0-10.599-4.755-10.599-10.6\n  c0-5.844,4.755-10.6,10.599-10.6c36.663,0,66.489-29.827,66.489-66.489c0-5.844,4.755-10.6,10.6-10.6c5.845,0,10.6,4.755,10.6,10.6\n  C230.879,221.063,191.541,260.399,143.189,260.399z", 2, "fill", "#333333"], ["d", "M256,294.893c-13.358,0-26.154,5.687-35.104,15.605c-8.95,9.917-13.301,23.225-11.937,36.515\n  l10.347,100.745c1.939,18.881,17.714,33.119,36.693,33.119s34.755-14.238,36.694-33.119l10.347-100.745\n  c1.364-13.289-2.986-26.598-11.936-36.515C282.154,300.581,269.359,294.893,256,294.893z M285.786,345.24l-10.347,100.745\n  c-1.027,10.002-9.385,17.545-19.439,17.545c-10.054,0-18.411-7.543-19.439-17.545L226.214,345.24\n  c-0.876-8.538,1.807-16.75,7.558-23.121c5.75-6.371,13.645-9.881,22.228-9.881c8.584,0,16.478,3.509,22.228,9.881\n  C283.979,328.49,286.664,336.701,285.786,345.24z", 2, "fill", "#333333"], ["d", "M256,211.538c-3.099,0-5.961,1.654-7.51,4.336l-19.726,34.166c-4.8,8.314-4.8,18.24,0,26.554\n  c4.8,8.313,13.396,13.277,22.996,13.277h8.479c9.6,0,18.196-4.963,22.996-13.277c4.8-8.314,4.8-18.24,0-26.554l-19.726-34.166\n  C261.961,213.191,259.099,211.538,256,211.538z M268.216,258.712c2.399,4.156,0.799,7.825,0,9.209\n  c-0.799,1.384-3.176,4.605-7.975,4.605h-8.479c-4.799,0-7.176-3.22-7.975-4.605c-0.799-1.384-2.399-5.053,0-9.209l12.216-21.158\n  L268.216,258.712z", 2, "fill", "#333333"], ["id", "icon-waterfall", "x", "0px", "y", "0px", "viewBox", "0 0 512 512"], ["d", "M445.217,489.739H66.783c-24.588,0-44.522-19.934-44.522-44.522V66.783\n c0-24.588,19.933-44.522,44.522-44.522h378.435c24.588,0,44.522,19.933,44.522,44.522v378.435\n C489.739,469.806,469.806,489.739,445.217,489.739z", 2, "fill", "#ffcd69"], ["d", "M217.043,0c52.251,0,94.609,42.358,94.609,94.609s-42.358,94.609-94.609,94.609\n s-94.609-42.358-94.609-94.609S164.793,0,217.043,0z", 2, "fill", "#ffff81"], ["d", "M217.043,44.522c27.662,0,50.087,22.424,50.087,50.087s-22.424,50.087-50.087,50.087\n s-50.087-22.424-50.087-50.087S189.381,44.522,217.043,44.522z", 2, "fill", "#fff145"], ["d", "M512,38.957v406.261H356.174V100.174c0-24.588,19.934-44.522,44.522-44.522h16.696\n c9.22,0,16.696-7.475,16.696-16.696l0,0C434.087,17.441,451.528,0,473.043,0l0,0C494.559,0,512,17.441,512,38.957z M111.304,55.652\n H94.609c-9.22,0-16.696-7.475-16.696-16.696l0,0C77.913,17.441,60.472,0,38.957,0l0,0C17.441,0,0,17.441,0,38.957v406.261h155.826\n V100.174C155.826,75.586,135.893,55.652,111.304,55.652z", 2, "fill", "#7f932a"], ["d", "M512,217.043v128H367.304V161.391c0-21.515,17.441-38.957,38.957-38.957l0,0\n c21.515,0,38.957,17.441,38.957,38.957v28.399c7.071-7.219,16.923-11.704,27.826-11.704l0,0\n C494.559,178.087,512,195.528,512,217.043z M131.772,171.944c-4.971-15.793-19.729-27.248-37.163-27.248l0,0\n c-5.994,0-11.669,1.357-16.741,3.774c-0.936-20.683-17.997-37.166-38.911-37.166l0,0C17.441,111.304,0,128.746,0,150.261v306.087\n h155.826v-244.87C155.826,194.272,146.059,179.356,131.772,171.944z", 2, "fill", "#9fba41"], ["d", "M512,317.217v139.13H356.174v-77.913c0-17.207,9.767-32.122,24.054-39.534\n c4.971-15.793,19.729-27.248,37.163-27.248l0,0c5.994,0,11.669,1.357,16.741,3.774c0.936-20.683,17.997-37.166,38.911-37.166l0,0\n C494.559,278.261,512,295.702,512,317.217z M105.739,211.478L105.739,211.478c-21.515,0-38.957,17.441-38.957,38.957v50.66\n c-7.071-7.219-16.923-11.704-27.826-11.704l0,0C17.441,289.391,0,306.833,0,328.348v116.87h77.913h66.783V250.435\n C144.696,228.92,127.254,211.478,105.739,211.478z", 2, "fill", "#606d11"], ["d", "M512,450.783L512,450.783c0,33.81-27.408,61.217-61.217,61.217H61.217\n C27.408,512,0,484.592,0,450.783l0,0c0-33.81,27.408-61.217,61.217-61.217h389.565C484.592,389.565,512,416.973,512,450.783z", 2, "fill", "#91c1a4"], ["d", "M389.565,144.696v289.391h-66.783H256h-66.783h-66.783V144.696c0-18.442,14.949-33.391,33.391-33.391\n s33.391,14.949,33.391,33.391c0-18.442,14.949-33.391,33.391-33.391S256,126.254,256,144.696c0-18.442,14.949-33.391,33.391-33.391\n s33.391,14.949,33.391,33.391c0-18.442,14.949-33.391,33.391-33.391S389.565,126.254,389.565,144.696z", 2, "fill", "#a9d5bb"], ["d", "M256,144.696v289.391h-66.783V144.696c0-18.442,14.949-33.391,33.391-33.391S256,126.254,256,144.696\n z M356.174,111.304c-18.442,0-33.391,14.949-33.391,33.391v289.391h66.783V144.696C389.565,126.254,374.616,111.304,356.174,111.304\n z", 2, "fill", "#c7faff"], ["d", "M80.696,434.087c0-4.61,3.738-8.348,8.348-8.348h333.913c4.61,0,8.348,3.738,8.348,8.348\n s-3.738,8.348-8.348,8.348H89.043C84.433,442.435,80.696,438.697,80.696,434.087z M345.043,459.13H166.957\n c-4.61,0-8.348,3.738-8.348,8.348s3.738,8.348,8.348,8.348h178.087c4.61,0,8.348-3.738,8.348-8.348S349.654,459.13,345.043,459.13z\n M122.435,459.13H66.783c-4.61,0-8.348,3.738-8.348,8.348s3.738,8.348,8.348,8.348h55.652c4.61,0,8.348-3.738,8.348-8.348\n S127.045,459.13,122.435,459.13z M445.217,459.13h-55.652c-4.61,0-8.348,3.738-8.348,8.348s3.738,8.348,8.348,8.348h55.652\n c4.61,0,8.348-3.738,8.348-8.348S449.828,459.13,445.217,459.13z", 2, "fill", "#eaffff"], ["width", "512px", "height", "512px", "viewBox", "0 0 512 512", "id", "icon-giant"], ["fill", "#000", "d", "M357.796 17.533a64.331 64.331 0 0 0-2.058.003c-2.574.046-5.301.247-8.203.621-4.663 3.477-4.538 13.246-8.952 18.954-9.888-2.176-17.187 5.81-16.779 13.777l13.6 8.93c-13.526 22.345-33.82 39.466-39.022 63-16.566-2.885-38.03-4.903-54.232-3.256-.317.713-.632 1.426-.967 2.137-7.961 16.865-19.716 30.123-33.039 38.064-13.323 7.941-28.946 10.586-42.514 4.098-12.117-5.795-19.646-17.476-22.757-30.885-28.118-3.618-60.113 34.404-89.708 60.709-19.094 27.134 4.077 80.52-2.126 98.36-3.741 10.756 4.885 33.1 20.544 36.263 15.336 3.098 26.122-9.397 33.727-21.799 2.006-3.27-25.782-19.36-27.326-28.098-1.844-10.43-.717-41.722 2.525-60.271 18.983-1.913 35.11-17.272 44.768-25.108 8.071 36.793 14.738 80.07 29.758 117.065-8.645 51.14-18.984 98.52-16.819 150.85l-44.894 7.75c-4.62 7.753-6.843 16.91-.02 25.365 0 0 74.398.412 77.207.412 1.673-.32 2.503-20.515 1.455-30.611 2.354-31.588 22.146-69.96 38.055-102.399 27.546-37.452 63.778-46.092 93.254-86.709 29.25 22.461 46.953 45.293 59.545 77.008 28.265-35.233 33.557-36.365 63.638-55.832-1.861-8.516-2.47-17.504-14.537-22.193-20.54 7.464-11.65 1.68-39.459 18.836-14.72-21.902-29.08-50.748-57.85-62.114-3.86-.917-45.101 11.195-76.636 38.158 4.707-23.282 9.712-56.212 11.414-87.923 20.94-4.93 45.912-20.178 65.79-28.711 36.293-29.313 30.23-54.157 42.88-83.47l7.45-1.99c8.9-14.321 14.563-28.469 16.894-42.79-6.779-3.49-14.48-6.059-24.606-6.201zM209.613 50.449c-5.176-.044-10.926 1.668-16.985 5.279-9.693 5.778-19.438 16.398-26.007 30.314-6.57 13.916-8.595 28.229-6.922 39.442 1.672 11.213 6.592 18.74 13.615 22.1 7.023 3.358 15.93 2.441 25.623-3.337 9.693-5.778 19.439-16.398 26.008-30.314 6.569-13.916 8.594-28.229 6.922-39.442-1.673-11.213-6.595-18.739-13.618-22.097-2.633-1.26-5.531-1.92-8.636-1.945zm240.683 286.748c-3.779.138-7.868 1.97-11.93 5.83-4.022 3.899-7.021 9.026-9.044 15.04-2.023 6.015-3.23 12.023-1.899 17.495 3.899 16.016-2.949 1.262-3.861-5.362-.577-4.372-.545-9.899-1.203-17.808l-17.938 1.492c.386 4.632.489 8.563.73 12.451l-16.394 1.125c5.088 21.17 3.951 49.462 33.041 47.12-7.946 22.393-21.154 45.923-36.644 71.36l15.373 9.362c8.272-13.583 16.136-26.867 22.998-40.012 4.99 14.721 13.158 27.42 19.707 39.594l15.851-8.527c-8.94-16.62-18.234-31.036-21.162-47.25 5.111-16.052 10.005-32.737 11.55-49.875 7.515-3.86 12.499-12.384 14.83-19.149 2.022-6.014 2.736-11.925 1.898-17.494-2.602-9.75-8.688-15.657-15.903-15.392z"], ["id", "icon-beast", "x", "0px", "y", "0px", "viewBox", "0 0 479.236 479.236", "width", "512", "height", "512"], ["d", "M198.806,478.434c-3.463,0.737-77.256,8.957-95.171-49.265S155.019,270.177,276.002,260.1   c120.983-10.077,171.368,66.06,176.966,127.641c5.598,61.581-32.47,77.256-97.453,64.057   C262.249,432.855,251.43,467.237,198.806,478.434z", 2, "fill", "#836f5a"], ["d", "M452.968,386.84c-2.609-28.694-14.947-60.544-39.614-85.364   c7.294,15.529,11.443,31.699,12.832,46.975c5.598,61.581-32.47,77.256-97.453,64.057c-93.266-18.944-104.085,15.438-156.709,26.635   c-2.479,0.527-40.995,4.885-69.257-14.036c0.264,1.065,0.548,2.121,0.868,3.16c17.914,58.222,91.708,50.002,95.171,49.265   c52.624-11.197,63.443-45.578,156.709-26.635C420.498,464.096,458.566,448.421,452.968,386.84z", 2, "fill", "#564a3d"], ["transform", "matrix(0.9777 -0.2101 0.2101 0.9777 -50.7469 21.3489)", "cx", "75.084", "cy", "249.464", "rx", "38.628", "ry", "49.825", 2, "fill", "#836f5a"], ["d", "M112.844,241.262c-0.951-4.424-2.337-8.606-4.07-12.496c0.096,21.637-11.292,40.019-28.72,43.765   s-35.363-8.333-44.166-28.098c0.019,4.259,0.474,8.641,1.425,13.065c5.783,26.903,27.379,45.078,48.236,40.595   S118.627,268.165,112.844,241.262z", 2, "fill", "#564a3d"], ["transform", "matrix(0.9777 -0.2101 0.2101 0.9777 -33.7986 42.6936)", "cx", "183.995", "cy", "180.386", "rx", "43.018", "ry", "55.487", 2, "fill", "#836f5a"], ["d", "M226.053,171.68c-3.655-17.006-12.987-30.872-24.619-38.778   c6.024,7.543,10.634,17.059,12.952,27.846c6.44,29.96-7.169,58.295-30.397,63.288c-10.044,2.159-20.238-0.408-29.099-6.43   c10.707,13.407,25.901,20.557,40.766,17.362C218.883,229.975,232.493,201.64,226.053,171.68z", 2, "fill", "#564a3d"], ["transform", "matrix(0.9916 -0.1297 0.1297 0.9916 -18.7384 41.8566)", "cx", "311.958", "cy", "164.781", "rx", "43.018", "ry", "55.487", 2, "fill", "#836f5a"], ["d", "M354.613,159.867c-2.198-16.806-10.014-31.077-20.541-39.964c2.692,5.959,4.617,12.567,5.541,19.631   c3.975,30.386-11.9,57.517-35.457,60.598c-10.528,1.377-20.804-2.293-29.311-9.474c8.888,19.674,26.229,32.173,44.311,29.808   C342.713,217.384,358.588,190.253,354.613,159.867z", 2, "fill", "#564a3d"], ["transform", "matrix(0.998 0.0631 -0.0631 0.998 13.7266 -27.1125)", "cx", "436.362", "cy", "203.891", "rx", "39.856", "ry", "51.408", 2, "fill", "#836f5a"], ["d", "M463.063,164.736c3.391,8.175,5.06,17.71,4.423,27.789c-1.79,28.335-21.05,50.18-43.018,48.792   c-9.066-0.573-17.171-5.02-23.445-12.03c6.142,14.808,17.958,25.136,32.112,26.03c21.968,1.388,41.228-20.457,43.018-48.792   C477.204,189.884,471.99,174.712,463.063,164.736z", 2, "fill", "#564a3d"], ["d", "M16.781,180.578L2.967,103.352c-0.174-0.97,1.013-1.58,1.701-0.874l54.717,56.221   c0.469,0.482,0.338,1.28-0.26,1.587l-40.903,21.006C17.624,181.599,16.899,181.24,16.781,180.578z", 2, "fill", "#836f5a"], ["d", "M133.62,101.727l-3.42-78.377c-0.043-0.985,1.215-1.431,1.802-0.64l46.754,62.998   c0.401,0.54,0.165,1.313-0.469,1.538l-43.333,15.379C134.32,102.85,133.649,102.398,133.62,101.727z", 2, "fill", "#836f5a"], ["d", "M415.774,114.93l24.502-74.527c0.308-0.937,1.642-0.91,1.912,0.039l21.47,75.457   c0.184,0.647-0.31,1.287-0.982,1.273l-45.972-0.93C416.031,116.228,415.564,115.569,415.774,114.93z", 2, "fill", "#836f5a"], ["d", "M276.454,77.171l17.835-76.398c0.224-0.96,1.555-1.051,1.908-0.13l28.04,73.27   c0.24,0.628-0.195,1.309-0.866,1.355l-45.875,3.128C276.825,78.441,276.301,77.825,276.454,77.171z", 2, "fill", "#836f5a"], ["id", "icon-hydra", "width", "512px", "height", "512px", "viewBox", "0 0 512 512"], ["fill", "#000", "d", "M345.594 20.28c-11.443.087-23.37 1.194-36.094 3.845 33.485 7.004 54.532 21.844 65.844 39.22-15.476-2.647-30.64-4.472-45.47-5.532L311 40.374l-19.28 16.438c-7.537.167-14.98.55-22.314 1.156L239.97 41.78l-14.907 22.814c-8.1 1.775-16.05 3.846-23.844 6.22l-29.47-14.97-11.313 30.75c-8.783 4.197-17.31 8.868-25.593 13.937l-32.688-5.31-.47 29.03c-6.313 5.248-12.44 10.808-18.374 16.656H48l3.563 36.656c-4.38 5.908-8.603 12.045-12.688 18.375L18.47 192.25v39.5c-.012.02-.022.042-.032.063V493.28h18.5c23.523-92.965 94.565-130.4 168.968-85.25 42.127 25.566 93.783 62.296 149.063 41.158-.9 7.955-3.276 15.623-6.908 22.562l95.344 19.188c2.99-7.75 5.584-15.712 7.625-23.563-3.557 2.29-10.352 4.79-19.78 3.313-41.302-6.47-33.15-54.034-.53-58.407 10.915-1.456 21.15 3.22 27.56 11.25l18.283-38.874c-68.1 6.078-129.61-30.834-197.47-16.687 35.468 7.415 56.983 23.64 67.75 42.342-7.332.564-14.425.598-21.28.157l-10.813-10.25-13.625 6.436c-5.98-1.52-11.737-3.448-17.313-5.75l-7.718-15.47-10.906 5.97c-7.152-4.38-13.924-9.414-20.344-15.062l-1.813-26.75-19.436 5.03c-7.508-7.63-15.15-13.68-22.875-18.343l-1.282-19.75-23.875 9.408c-11.712-2.7-23.455-2.622-35.063-.25 44.223-90.392 134.06-92.4 180.813-64.563-5.227 5.68-11.388 10.355-18.125 13.78l66.562 70.908c6.928-4.58 13.63-9.564 19.844-14.782-4.228-.204-14.15-5.01-17.47-8.06-34.53-31.74 7.1-63.854 32.876-48.626 9.484 5.603 15.366 14.898 15.938 25.156l34.75-23.875c-59.015-34.522-85.098-97.445-148.594-125.25 23.092 24.968 31.707 49.115 30.97 69.75-8.93-6.752-18.606-12.1-28.845-16.188l-13.845-21.25-18.188 12.75c-5.18-.755-10.455-1.246-15.78-1.5l-19.094-18.093-15.25 19.687c-7.918 1.068-15.884 2.592-23.844 4.564l-15.75-13-9.75 20.812c-6.988 2.552-13.936 5.42-20.782 8.594l-23.594-8.28-8.625 25.874c-12.263 7.768-23.966 16.49-34.876 26.062C124.307 122.443 296.518 88.99 384.938 108.562c-1.12 6.798-3.333 13.35-6.47 19.344l95.344 19.188c2.99-7.75 5.585-15.71 7.625-23.563-3.558 2.29-7.502 5.33-11.968 4.72-46.308-6.31-43.81-54.725-8.345-59.813 10.903-1.57 21.15 3.193 27.563 11.22 1-10.184 1.808-35.654 2.187-45.907-55.332 4.938-95.695-13.84-145.28-13.47z"], ["id", "icon-warg", "x", "0px", "y", "0px", "viewBox", "0 0 476.399 476.399"], ["id", "SVGID_1_", "gradientUnits", "userSpaceOnUse", "x1", "46.6623", "y1", "218.2638", "x2", "46.6623", "y2", "239.0038"], ["offset", "0", 2, "stop-color", "#ffffff"], ["offset", "0.1483", 2, "stop-color", "#f3f3f3"], ["offset", "0.4168", 2, "stop-color", "#d3d3d3"], ["offset", "0.7721", 2, "stop-color", "#a0a0a0"], ["offset", "1", 2, "stop-color", "#7b7b7b"], ["d", "M49.664,236.014c-0.37,0.22-0.74,0.42-1.1,0.66c-1.28,0.82-2.54,1.6-3.78,2.33\n  c-1.22-4.73-2.18-12.5,1.23-20.74C47.124,225.564,48.664,232.134,49.664,236.014z", 2, "fill", "url(#SVGID_1_)"], ["id", "SVGID_2_", "gradientUnits", "userSpaceOnUse", "x1", "30.3603", "y1", "219.2538", "x2", "30.3603", "y2", "246.4338"], ["d", "M24.324,219.254c3.43,9.93,8.8,18.94,12.17,24.08c-3.25,1.45-6.28,2.5-9.03,3.1\n  C25.454,238.354,23.804,227.634,24.324,219.254z", 2, "fill", "url(#SVGID_2_)"], ["id", "SVGID_3_", "gradientUnits", "userSpaceOnUse", "x1", "24.4287", "y1", "140.2138", "x2", "24.4287", "y2", "122.0938"], ["offset", "0.2343", 2, "stop-color", "#fcfcfc"], ["offset", "0.4049", 2, "stop-color", "#f3f3f3"], ["offset", "0.5551", 2, "stop-color", "#e3e3e3"], ["offset", "0.6937", 2, "stop-color", "#cccccc"], ["offset", "0.8243", 2, "stop-color", "#b0b0b0"], ["offset", "0.9473", 2, "stop-color", "#8c8c8c"], ["d", "M23.674,122.094l4.15,4.26c-0.34,2.02-0.85,5.38-1.32,9.71l-0.64-0.86\n  c-0.37,0.27-1.8,1.45-4.83,5.01C21.604,134.344,22.664,127.684,23.674,122.094z", 2, "fill", "url(#SVGID_3_)"], ["id", "SVGID_4_", "gradientUnits", "userSpaceOnUse", "x1", "39.8637", "y1", "156.1238", "x2", "39.8637", "y2", "132.9538"], ["d", "M46.294,140.144c-2.14,2.71-7.71,9.75-12.86,15.98c-0.01-9.35,0.8-17.64,1.51-23.17\n  C38.484,135.774,42.284,138.184,46.294,140.144z", 2, "fill", "url(#SVGID_4_)"], ["id", "SVGID_5_", "gradientUnits", "userSpaceOnUse", "x1", "57.9937", "y1", "160.5438", "x2", "57.9937", "y2", "143.3338"], ["d", "M63.454,145.574c-4.1,4.42-7.81,9.8-10.92,14.97l1.66-17.21\n  C57.204,144.324,60.304,145.064,63.454,145.574z", 2, "fill", "url(#SVGID_5_)"], ["id", "SVGID_6_", "gradientUnits", "userSpaceOnUse", "x1", "75.5137", "y1", "153.6788", "x2", "63.5537", "y2", "153.6788"], ["offset", "0", 2, "stop-color", "#000000"], ["offset", "1", 2, "stop-color", "#ff0000"], ["d", "M75.514,146.324l-5.27,13.46c-0.16,0.4-0.24,0.83-0.26,1.25c-2.5-1.18-4.67-2.12-6.43-2.84\n  c3.33-4.75,7.06-9.09,10.93-11.85C74.834,146.334,75.174,146.334,75.514,146.324z", 2, "fill", "url(#SVGID_6_)"], ["id", "SVGID_7_", "gradientUnits", "userSpaceOnUse", "x1", "88.2887", "y1", "153.8038", "x2", "88.2887", "y2", "145.3745"], ["d", "M95.394,147.714l-14.21,6.09l3.19-8.16l2.54-0.22\n  C89.954,145.154,92.954,146.004,95.394,147.714z", 2, "fill", "url(#SVGID_7_)"], ["id", "SVGID_8_", "gradientUnits", "userSpaceOnUse", "x1", "106.7737", "y1", "165.9438", "x2", "106.7737", "y2", "156.4338"], ["d", "M111.464,160.764l-9.38,5.18l1.53-9.51C105.904,158.434,108.594,159.904,111.464,160.764z", 2, "fill", "url(#SVGID_8_)"], ["id", "SVGID_9_", "gradientUnits", "userSpaceOnUse", "x1", "127.0237", "y1", "190.5613", "x2", "137.4437", "y2", "190.5613"], ["d", "M134.894,186.454c0.56,2.31,1.41,4.54,2.55,6.61c-2.62,1.01-6.36,1.98-10.42,1.46\n  C130.324,191.924,132.904,189.124,134.894,186.454z", 2, "fill", "url(#SVGID_9_)"], ["id", "SVGID_10_", "gradientUnits", "userSpaceOnUse", "x1", "168.026", "y1", "222.7508", "x2", "114.1337", "y2", "222.7508"], ["d", "M167.044,206.274c2.03,10.15,0.92,18.01-3.39,24.01c-5.95,8.29-18.57,13.43-37.51,15.28\n  c-4.22,0.42-8.22,0.46-12.01,0.25c5.53-3.68,9.69-9.14,11.85-15.77c3.13-9.61,1.39-20.17-4.66-28.25\n  c-0.13-0.19-0.28-0.36-0.42-0.54c2.88,1.03,5.72,1.44,8.37,1.44c5.57-0.01,10.37-1.76,13.28-3.13c0.33,0.3,0.66,0.58,1.01,0.86\n  c5.34,4.31,12.02,6.24,18.82,5.42C163.964,205.654,165.564,205.794,167.044,206.274z", 2, "fill", "url(#SVGID_10_)"], ["id", "SVGID_11_", "gradientUnits", "userSpaceOnUse", "x1", "95.9587", "y1", "229.4238", "x2", "95.9587", "y2", "269.7337"], ["d", "M57.814,261.984c-7.33-5.27-16.29-7.62-25.23-6.61c-4.48,0.5-9.54,0.6-13.93-0.47\n  c1.08,0.1,2.24,0.17,3.51,0.17c8.37,0,18.71-3.93,30.74-11.68c7.41-4.78,16.67-5.01,24.16-0.6c3.72,2.19,8.29,4.46,13.66,6.39\n  c1.16,0.41,6.04,1.91,7.25,2.22c8.26,2.11,17.97,3.2,28.95,2.13c21.63-2.12,35.78-8.2,43.23-18.59c1.24-1.72,2.27-3.57,3.11-5.52\n  c-1.68,9.03-5.86,17.52-12.24,24.43c-9.83,10.65-23.78,16.42-38.26,15.84c-8.3-0.33-16.58-2.55-23.93-6.4l-9.1-4.78\n  c-7.24-3.79-15.87-2.35-22.03,3.02C64.934,263.934,60.794,264.134,57.814,261.984z", 2, "fill", "url(#SVGID_11_)"], ["id", "SVGID_12_", "gradientUnits", "userSpaceOnUse", "x1", "95.5237", "y1", "165.4338", "x2", "76.7037", "y2", "165.4338"], ["d", "M95.524,156.364l-2.65,16.42c-0.09,0.58-0.05,1.17,0.1,1.72\n  c-5.77-4.11-11.35-7.45-16.27-10.08L95.524,156.364z", 2, "fill", "url(#SVGID_12_)"], ["id", "SVGID_13_", "gradientUnits", "userSpaceOnUse", "x1", "133.3437", "y1", "177.4338", "x2", "96.9237", "y2", "177.4338"], ["d", "M132.994,168.504l0.35,3.86c-0.73,2.45-4.5,13.03-17.04,19.59\n  c-0.74,0.39-1.32,0.99-1.69,1.7c-5.67-6.29-11.73-11.68-17.69-16.24c0.63-0.02,1.26-0.18,1.83-0.49l28.43-15.71\n  c0.8,0.27,1.58,0.65,2.28,1.15C131.484,163.794,132.774,166.034,132.994,168.504z", 2, "fill", "url(#SVGID_13_)"], ["id", "SVGID_14_", "gradientUnits", "userSpaceOnUse", "x1", "173.2937", "y1", "143.7088", "x2", "179.3537", "y2", "143.7088"], ["d", "M179.354,141.294c-0.96,1.68-1.93,3.65-2.72,5.72c-0.32-0.49-0.64-1-0.94-1.54\n  c-1.01-1.75-1.8-3.5-2.4-5.07C175.304,140.784,177.324,141.074,179.354,141.294z", 2, "fill", "url(#SVGID_14_)"], ["id", "SVGID_15_", "gradientUnits", "userSpaceOnUse", "x1", "183.1237", "y1", "148.6836", "x2", "203.8533", "y2", "148.6836"], ["d", "M203.764,139.994c0.31,4.83-0.05,11.59-3.25,15.03c-1.77,1.91-4.39,2.65-8.02,2.24\n  c-3.48-0.39-6.6-1.54-9.37-3.43c0.27-3.65,3.18-8.95,5.39-12.12C193.624,141.644,198.724,141.074,203.764,139.994z", 2, "fill", "url(#SVGID_15_)"], ["id", "SVGID_16_", "gradientUnits", "userSpaceOnUse", "x1", "150.1037", "y1", "110.6144", "x2", "167.7737", "y2", "110.6144"], ["offset", "0", 2, "stop-color", "#999999"], ["offset", "1", 2, "stop-color", "#656565"], ["d", "M167.774,109.074l-15.21,4.18c-0.69-1.2-1.5-2.33-2.46-3.34\n  C155.734,107.654,161.954,107.364,167.774,109.074z", 2, "fill", "url(#SVGID_16_)"], ["id", "SVGID_17_", "gradientUnits", "userSpaceOnUse", "x1", "33.8563", "y1", "70.2179", "x2", "33.8563", "y2", "102.6238"], ["offset", "0.0126", 2, "stop-color", "#919191"], ["offset", "1", 2, "stop-color", "#000000"], ["d", "M40.034,73.224l4.63,8.09c-2.45,14.6-14.26,19.65-20.53,21.31l-0.9-7.89\n  c-0.93-8.17,1.68-16.38,7.17-22.52c1.29-1.45,3.14-2.17,5.08-1.96C37.414,70.454,39.074,71.544,40.034,73.224z", 2, "fill", "url(#SVGID_17_)"], ["id", "SVGID_18_", "gradientUnits", "userSpaceOnUse", "x1", "388.4137", "y1", "134.1915", "x2", "264.8837", "y2", "134.1915"], ["offset", "0.3425", 2, "stop-color", "#222222"], ["d", "M376.394,138.534c3.26,4.11,6.61,8.32,12.02,11.58c-9.92,6.02-23.88,6.56-27.31,6.6\n  c-8.35-3.61-14.62-6.13-17.16-7.13c-7.96-10.96-20.68-17.47-34.29-17.47h-14.03c-9.13-7.79-19.57-13.71-30.74-17.57\n  c18-2.76,46.84-5.23,73.16,1.12C363.004,121.694,370.124,130.644,376.394,138.534z", 2, "fill", "url(#SVGID_18_)"], ["id", "SVGID_19_", "gradientUnits", "userSpaceOnUse", "x1", "115.8498", "y1", "47.1628", "x2", "314.4037", "y2", "391.0682"], ["offset", "0", 2, "stop-color", "#666666"], ["d", "M460.594,279.654l-45.28-0.61c-1.72-0.01-3.29,1.08-3.84,2.73\n  c-0.56,1.65,0.02,3.47,1.43,4.5l33.29,24.36l-83.5,2.67c-1.01,0.03-2.01,0.38-2.74,1.08c-1.44,1.38-1.63,3.49-0.64,5.06\n  l21.21,33.45l-79.26-39.92c-1.43-0.72-3.15-0.52-4.37,0.51c-1.23,1.03-1.72,2.69-1.25,4.22l11.13,36.71l-29.79-26.4\n  c-1.19-1.06-2.9-1.31-4.34-0.64s-2.35,2.13-2.32,3.72l0.54,24.72l-8.78-9.2c-0.89-0.93-2.16-1.47-3.44-1.31\n  c-2.11,0.25-3.58,2.02-3.55,4.02l0.6,48.02l-25.33-35.91c-0.7-0.98-1.8-1.6-3-1.68c-1.19-0.09-2.37,0.38-3.19,1.26l-23.62,25.33\n  l1.58-25.26c0.09-1.58-0.66-3.14-2.05-3.89c-1.98-1.07-4.35-0.34-5.41,1.52c-0.07,0.11-5.79,9.93-15.23,13.49\n  c2.74-12.6,0.04-24.79-8.04-36.32c-25.85-36.88-99.18-55.32-113.43-55.32c-15.23,0-38.98-2.88-46.76-19.87\n  c5.65,2.73,13.18,3.65,22.27,2.63c6.96-0.79,13.94,1.05,19.66,5.16c6.05,4.35,14.46,3.89,20-1.09c3.59-3.23,8.88-3.89,13.15-1.65\n  l8.82,4.63c8.4,4.41,17.85,6.94,27.33,7.32c16.82,0.65,33.03-6.04,44.46-18.41c11.23-12.16,16.63-28.49,14.89-44.92\n  c-0.5-4.68-2.58-9.13-6.14-12.21c-4.02-3.49-9.22-5-14.46-4.22c-1.88,0.28-3.81,0.31-5.64-0.2c-7.72-2.16-12.64-8.2-13.29-15.37\n  l-1.27-14.27c-0.33-3.61-1.71-7.09-4.13-9.79c-4.19-4.65-10.45-6.48-16.31-5.02c-4.74,1.18-9.83-0.47-12.97-4.2l-3.59-4.27\n  c-4.36-5.19-11.01-7.95-17.76-7.36l-8.37,0.72c-16.01,1.38-31.65-4.43-42.87-15.93l-6.04-6.19c-1.52-1.57-2.7-3.45-3.46-5.49\n  c9.75-2.37,23.45-9.89,26.84-26.73c1.99-0.07,3.99,0.83,5.3,2.72c0.48,0.69,0.72,1.51,0.87,2.34c1.31,7.13,6.72,12.77,13.8,14.38\n  l40.84,9.3c7.25,1.65,14.93,1.68,22.2,0.09c2.71-0.59,5.45-0.01,7.7,1.64c2.11,1.55,3.43,3.96,3.82,6.56l3.06,20.48\n  c0.33,2.18,2.36,3.69,4.55,3.36c2.18-0.33,3.69-2.37,3.36-4.55l-0.67-4.47c0.27,0.17,0.55,0.32,0.86,0.42l4.86,1.62\n  c0.42,0.14,0.83,0.26,1.25,0.39c2.38,9.75,10.37,25.2,27.48,27.1c0.93,0.11,1.82,0.15,2.66,0.15c6.18,0,9.96-2.58,12.12-4.91\n  c0.36-0.4,0.7-0.82,1.03-1.26c9.63,5.25,26.22,7.3,28.36,7.54c0.15,0.02,0.3,0.03,0.46,0.03c2,0,3.73-1.51,3.97-3.54\n  c0.25-2.2-1.33-4.18-3.52-4.44c-7.41-0.85-19.98-3.37-25.92-6.85c0.63-2.43,1-5.15,1.06-8.17c0.05-2.2-0.07-4.22-0.22-5.82\n  c4.96-1.12,10.12,0.83,13.09,5.05c4.88,6.93,12.79,10.98,21.15,10.98c1.01,0,2.02-0.06,3.04-0.18c2.19-0.26,3.76-2.25,3.5-4.44\n  c-0.25-2.19-2.24-3.77-4.44-3.51c-6.52,0.77-12.93-2.09-16.71-7.46c-5.18-7.35-14.41-10.49-23-7.82\n  c-14.05,4.37-28.87,4.22-42.83-0.43l-4.86-1.62c-1.58-0.52-3.25-0.01-4.28,1.18l-1.32-8.8l51.71-14.2c2.2-0.61,3.67,0.6,4.2,1.15\n  c0.52,0.55,1.68,2.06,0.99,4.23c-0.38,1.21-0.17,2.54,0.59,3.57c0.75,1.03,1.95,1.64,3.22,1.64h18.03\n  c21.3,0,41.82,7.75,57.79,21.83c0.74,0.65,1.68,1,2.65,1h15.52c11.38,0,22,5.61,28.41,15.01c0.45,0.66,1.1,1.18,1.85,1.47\n  c0.72,0.28,68.23,26.75,96.5,50.81c-28.01,13.19-52,17.85-71.39,13.87c-1.46-0.3-2.97,0.23-3.91,1.39\n  c-12,14.77-34.19,12.17-47.32,8.93l14.53-2.46c1.81-0.31,3.18-1.81,3.32-3.64c0.14-1.83-0.98-3.52-2.72-4.1\n  c-0.09-0.03-3.97-1.34-9.42-3.83c15.36,2.02,29.42,1.75,30.33,1.73c1.84-0.05,3.41-1.33,3.82-3.13c0.4-1.79-0.47-3.63-2.12-4.45\n  l-42.6-21.28l18.56-1.96c4.59,0.64,9.36,0.48,14.14-0.59l9.67-2.17c20.68-4.65,41.94,4.41,52.92,22.52\n  c0.75,1.24,2.07,1.92,3.42,1.92c0.71,0,1.43-0.18,2.07-0.58c1.89-1.14,2.5-3.6,1.35-5.49c-12.76-21.05-37.48-31.57-61.51-26.18\n  l-9.68,2.17c-14.39,3.24-28.83-3.83-35.11-17.16c-4.42-9.39-12.57-16.78-22.36-20.25l-20.45-7.27c-2.08-0.74-4.37,0.35-5.11,2.43\n  c-0.74,2.08,0.35,4.37,2.43,5.11l20.45,7.27c7.79,2.76,14.28,8.64,17.8,16.12c3.12,6.61,7.84,11.99,13.52,15.84l-16.57,1.74\n  c-1.76,0.19-3.2,1.52-3.51,3.27c-0.32,1.75,0.55,3.5,2.14,4.29l38.55,19.26c-10.95-0.78-24.66-2.59-34.44-6.73\n  c-1.82-0.77-3.94-0.09-4.97,1.6c-1.03,1.7-0.67,3.89,0.85,5.16c6.59,5.49,14.11,9.76,20.33,12.79l-26.82,4.55\n  c-2.17,0.37-3.64,2.44-3.27,4.61c0.33,1.96,2.02,3.34,3.94,3.34c0.22,0,0.45-0.02,0.67-0.06l8.84-1.5\n  c1.42,0.53,2.76,0.97,3.45,1.26c0.46,0.18,11.36,4.61,24.92,5.99c2.62,0.26,5.16,0.39,7.61,0.39c13.99,0,25.25-4.28,32.97-12.58\n  c14.49,2.48,31.07,0.73,49.51-5.15l18.79,11.66l-14.78,2.68c-1.21,0.22-2.31,0.92-2.91,1.99c-0.99,1.79-0.49,3.93,1.03,5.12\n  L460.594,279.654z M280.084,301.784c1.1-1.92,0.43-4.37-1.49-5.46c-1.91-1.1-4.36-0.43-5.45,1.48c-0.1,0.17-8.18,14.19-19.08,24.7\n  c-0.59-12.02-6.35-23.2-6.66-23.8c-0.69-1.32-2.05-2.14-3.54-2.15h-0.01c-1.48,0-2.84,0.82-3.53,2.13\n  c-0.48,0.89-9.55,18.25-11.29,38.27c-9.56-20.07-13.16-50.94-13.2-51.31c-0.25-2.2-2.23-3.77-4.43-3.53\n  c-2.19,0.25-3.77,2.23-3.52,4.43c0.22,1.98,5.67,48.7,22.35,66.95c0.78,0.85,1.86,1.31,2.96,1.31c0.56,0,1.13-0.12,1.67-0.37\n  c1.58-0.73,2.51-2.4,2.29-4.13c-1.83-14.7,2.9-30.26,6.53-39.52c1.86,5.73,3.45,13.43,1.65,19.91c-0.45,1.63,0.16,3.36,1.54,4.34\n  c1.38,0.97,3.22,0.98,4.61,0.01C267.264,324.004,279.564,302.684,280.084,301.784z", 2, "fill", "url(#SVGID_19_)"], ["d", "M278.594,296.324c1.92,1.09,2.59,3.54,1.49,5.46c-0.52,0.9-12.82,22.22-28.6,33.26c-1.39,0.97-3.23,0.96-4.61-0.01\n  c-1.38-0.98-1.99-2.71-1.54-4.34c1.8-6.48,0.21-14.18-1.65-19.91c-3.63,9.26-8.36,24.82-6.53,39.52c0.22,1.73-0.71,3.4-2.29,4.13\n  c-0.54,0.25-1.11,0.37-1.67,0.37c-1.1,0-2.18-0.46-2.96-1.31c-16.68-18.25-22.13-64.97-22.35-66.95c-0.25-2.2,1.33-4.18,3.52-4.43\n  c2.2-0.24,4.18,1.33,4.43,3.53c0.04,0.37,3.64,31.24,13.2,51.31c1.74-20.02,10.81-37.38,11.29-38.27c0.69-1.31,2.05-2.13,3.53-2.13\n  h0.01c1.49,0.01,2.85,0.83,3.54,2.15c0.31,0.6,6.07,11.78,6.66,23.8c10.9-10.51,18.98-24.53,19.08-24.7\n  C274.234,295.894,276.684,295.224,278.594,296.324z"], ["d", "M474.864,280.654l-45.54-35.62l16.23-2.94c1.28-0.24,2.43-1.01,3-2.18c0.94-1.92,0.24-4.12-1.47-5.18l-22.15-13.74\n  c6.53-2.5,13.25-5.46,20.2-8.92c0.7-0.35,1.32-0.86,1.73-1.53c0.99-1.66,0.68-3.67-0.59-4.93c-15.17-15.17-46.42-31.3-70.65-42.43\n  c7.74-1.56,16.77-4.71,23.12-11.01c0.67-0.67,1.14-1.56,1.22-2.5c0.18-1.89-0.95-3.56-2.63-4.17c-7.23-2.58-10.52-6.71-14.68-11.94\n  c-6.72-8.47-15.09-19.01-42.73-25.68c-41.58-10.03-87.5,0.55-94.11,2.18c-4-0.51-8.05-0.78-12.12-0.78h-13.74\n  c-0.32-2.59-1.46-5.04-3.33-6.99c-3.12-3.23-7.74-4.51-12.08-3.32l-24.79,6.81l-2.86-1.55c-11.02-5.99-24.25-5.61-34.9,0.85\n  c-2.71-0.74-5.58-0.84-8.36-0.23c-6.13,1.33-12.6,1.31-18.72-0.09l-40.83-9.29c-3.97-0.91-7.01-4.09-7.73-8.09\n  c-0.74-4.17-3.29-7.74-6.99-9.79c-2.65-1.47-5.64-2.04-8.56-1.66l-3.6-6.3c-2.35-4.1-6.51-6.98-11.23-7.37\n  c-4.39-0.36-8.58,1.31-11.54,4.62c-7,7.84-10.33,18.32-9.15,28.76l1.39,12.18c0.15,1.38,0.44,2.73,0.84,4.05\n  c-1.14,5.41-6.01,29.51-4.68,40.48c0.13,1.1,0.63,2.15,1.49,2.85c0.77,0.63,1.65,0.9,2.51,0.9c1.25,0,2.46-0.59,3.22-1.63\n  c2.27-3.08,4.1-5.45,5.58-7.28c-0.28,5.9-0.32,12.56,0.15,19.51c0.08,1.25,0.69,2.45,1.72,3.16c1.72,1.17,3.94,0.84,5.25-0.62\n  c3.33-3.69,8.16-9.57,12.32-14.74l-2.49,25.97c-0.18,1.85,0.84,3.69,2.59,4.32c0.46,0.16,0.92,0.24,1.37,0.24\n  c1.58,0,3.06-0.95,3.69-2.46c0.07-0.16,3.59-8.54,8.92-17.51c8.99,3.57,36.79,16.16,55.77,41.52c4.49,6,5.78,13.84,3.45,20.99\n  c-2.27,6.97-7.54,12.19-14.45,14.31c-0.04,0.02-0.08,0.03-0.12,0.04c-3.42,1.03-7.09,0.9-10.45-0.31\n  c-4.81-1.72-8.9-3.76-12.23-5.72c-7.37-4.34-16.01-5.33-24.01-3.07c-1.48-5.95-3.83-16.72-4.32-26.6\n  c-0.08-1.63-1.15-3.05-2.68-3.58c-1.54-0.53-3.25-0.08-4.33,1.14c-6.59,7.53-9.23,15.38-9.93,22.31c-3.22-6.6-6.11-14.3-6.69-21.51\n  c-0.12-1.56-1.14-2.9-2.6-3.44c-1.46-0.54-3.11-0.18-4.21,0.93c-9.81,9.8-5.47,34.25-2.99,44.87c-2.83-0.28-3.48-0.93-3.51-0.96\n  c-0.27-0.29-0.13-1.97-0.06-2.88c0.22-2.84,0.65-8.12-4.79-10.84c-3.85-1.92-6.47-0.66-7.69,0.26c-4.23,3.2-3.52,11.2-2.66,15.92\n  c0.23,25.5,21.08,40.12,57.32,40.12c11.9,0,82.71,17.43,106.88,51.91c8.01,11.43,9.7,23.08,5.15,35.61\n  c-0.45,1.26-0.25,2.66,0.55,3.74c0.79,1.07,2.09,1.69,3.41,1.62c8.19-0.41,14.75-4.51,19.42-8.77l-1.51,24.17\n  c-0.08,1.33,0.42,2.67,1.46,3.5c1.7,1.36,4.06,1.12,5.45-0.38l27.88-29.89l29.92,42.41c0.76,1.08,1.99,1.7,3.27,1.7\n  c0.41,0,0.83-0.07,1.23-0.2c1.67-0.54,2.79-2.1,2.77-3.85l-0.64-50.75l8.89,9.3c0.89,0.94,2.17,1.48,3.45,1.32\n  c2.12-0.27,3.58-2.06,3.53-4.07l-0.56-25.86l33.53,29.71c1.54,1.37,3.93,1.36,5.48-0.16c1.08-1.07,1.4-2.69,0.96-4.14l-12.49-41.17\n  l83.84,42.24c1.87,0.94,4.19,0.3,5.28-1.59c0.76-1.32,0.63-2.97-0.18-4.25l-25.12-39.64l88.23-2.82c1.71-0.05,3.19-1.18,3.69-2.81\n  c0.51-1.64-0.08-3.41-1.46-4.41l-32.55-23.82l44.61,0.59h0.04c1.12,0,2.21-0.43,2.95-1.26\n  C476.984,284.684,476.634,282.034,474.864,280.654z M338.044,115.664c24.96,6.03,32.08,14.98,38.35,22.87\n  c3.26,4.11,6.61,8.32,12.02,11.58c-9.92,6.02-23.88,6.56-27.31,6.6c-8.35-3.61-14.62-6.13-17.16-7.13\n  c-7.96-10.96-20.68-17.47-34.29-17.47h-14.03c-9.13-7.79-19.57-13.71-30.74-17.57C282.884,111.784,311.724,109.314,338.044,115.664\n  z M167.774,109.074l-15.21,4.18c-0.69-1.2-1.5-2.33-2.46-3.34C155.734,107.654,161.954,107.364,167.774,109.074z M30.404,72.214\n  c1.29-1.45,3.14-2.17,5.08-1.96c1.93,0.2,3.59,1.29,4.55,2.97l4.63,8.09c-2.45,14.6-14.26,19.65-20.53,21.31l-0.9-7.89\n  C22.304,86.564,24.914,78.354,30.404,72.214z M21.034,140.214c0.57-5.87,1.63-12.53,2.64-18.12l4.15,4.26\n  c-0.292,1.735-0.709,4.464-1.119,7.941l-1.481,1.409l0.017,0.022C24.507,136.382,23.177,137.696,21.034,140.214z M33.434,156.124\n  c-0.01-9.35,0.8-17.64,1.51-23.17c3.54,2.82,7.34,5.23,11.35,7.19C44.154,142.854,38.584,149.894,33.434,156.124z M52.534,160.544\n  l1.66-17.21c3.01,0.99,6.11,1.73,9.26,2.24C59.354,149.994,55.644,155.374,52.534,160.544z M70.244,159.784\n  c-0.16,0.4-0.24,0.83-0.26,1.25c-2.5-1.18-4.67-2.12-6.43-2.84c3.33-4.75,7.06-9.09,10.93-11.85c0.35-0.01,0.69-0.01,1.03-0.02\n  L70.244,159.784z M92.974,174.504c-5.77-4.11-11.35-7.45-16.27-10.08l18.82-8.06l-2.65,16.42\n  C92.784,173.364,92.824,173.954,92.974,174.504z M81.184,153.804l3.19-8.16l2.54-0.22c3.04-0.27,6.04,0.58,8.48,2.29\n  L81.184,153.804z M116.304,191.954c-0.74,0.39-1.32,0.99-1.69,1.7c-5.67-6.29-11.73-11.68-17.69-16.24\n  c0.63-0.02,1.26-0.18,1.83-0.49l28.43-15.71c0.8,0.27,1.58,0.65,2.28,1.15c2.02,1.43,3.31,3.67,3.53,6.14l0.35,3.86\n  C132.614,174.814,128.844,185.394,116.304,191.954z M102.084,165.944l1.53-9.51c2.29,2,4.98,3.47,7.85,4.33L102.084,165.944z\n  M134.894,186.454c0.56,2.31,1.41,4.54,2.55,6.61c-2.62,1.01-6.36,1.98-10.42,1.46\n  C130.324,191.924,132.904,189.124,134.894,186.454z M125.984,230.044c3.13-9.61,1.39-20.17-4.66-28.25\n  c-0.13-0.19-0.28-0.36-0.42-0.54c2.88,1.03,5.72,1.44,8.37,1.44c5.57-0.01,10.37-1.76,13.28-3.13c0.33,0.3,0.66,0.58,1.01,0.86\n  c5.34,4.31,12.02,6.24,18.82,5.42c1.58-0.19,3.18-0.05,4.66,0.43c2.03,10.15,0.92,18.01-3.39,24.01\n  c-5.95,8.29-18.57,13.43-37.51,15.28c-4.22,0.42-8.22,0.46-12.01,0.25C119.664,242.134,123.824,236.674,125.984,230.044z\n  M46.014,218.264c1.11,7.3,2.65,13.87,3.65,17.75c-0.37,0.22-0.74,0.42-1.1,0.66c-1.28,0.82-2.54,1.6-3.78,2.33\n  C43.564,234.274,42.604,226.504,46.014,218.264z M24.324,219.254c3.43,9.93,8.8,18.94,12.17,24.08c-3.25,1.45-6.28,2.5-9.03,3.1\n  C25.454,238.354,23.804,227.634,24.324,219.254z M22.164,255.074c8.37,0,18.71-3.93,30.74-11.68c7.41-4.78,16.67-5.01,24.16-0.6\n  c3.72,2.19,8.29,4.46,13.66,6.39c1.16,0.41,6.04,1.91,7.25,2.22c8.26,2.11,17.97,3.2,28.95,2.13c21.63-2.12,35.78-8.2,43.23-18.59\n  c1.24-1.72,2.27-3.57,3.11-5.52c-1.68,9.03-5.86,17.52-12.24,24.43c-9.83,10.65-23.78,16.42-38.26,15.84\n  c-8.3-0.33-16.58-2.55-23.93-6.4l-9.1-4.78c-7.24-3.79-15.87-2.35-22.03,3.02c-2.77,2.4-6.91,2.6-9.89,0.45\n  c-7.33-5.27-16.29-7.62-25.23-6.61c-4.48,0.5-9.54,0.6-13.93-0.47C19.734,255.004,20.894,255.074,22.164,255.074z M415.314,279.044\n  c-1.72-0.01-3.29,1.08-3.84,2.73c-0.56,1.65,0.02,3.47,1.43,4.5l33.29,24.36l-83.5,2.67c-1.01,0.03-2.01,0.38-2.74,1.08\n  c-1.44,1.38-1.63,3.49-0.64,5.06l21.21,33.45l-79.26-39.92c-1.43-0.72-3.15-0.52-4.37,0.51c-1.23,1.03-1.72,2.69-1.25,4.22\n  l11.13,36.71l-29.79-26.4c-1.19-1.06-2.9-1.31-4.34-0.64s-2.35,2.13-2.32,3.72l0.54,24.72l-8.78-9.2\n  c-0.89-0.93-2.16-1.47-3.44-1.31c-2.11,0.25-3.58,2.02-3.55,4.02l0.6,48.02l-25.33-35.91c-0.7-0.98-1.8-1.6-3-1.68\n  c-1.19-0.09-2.37,0.38-3.19,1.26l-23.62,25.33l1.58-25.26c0.09-1.58-0.66-3.14-2.05-3.89c-1.98-1.07-4.35-0.34-5.41,1.52\n  c-0.07,0.11-5.79,9.93-15.23,13.49c2.74-12.6,0.04-24.79-8.04-36.32c-25.85-36.88-99.18-55.32-113.43-55.32\n  c-15.23,0-38.98-2.88-46.76-19.87c5.65,2.73,13.18,3.65,22.27,2.63c6.96-0.79,13.94,1.05,19.66,5.16c6.05,4.35,14.46,3.89,20-1.09\n  c3.59-3.23,8.88-3.89,13.15-1.65l8.82,4.63c8.4,4.41,17.85,6.94,27.33,7.32c16.82,0.65,33.03-6.04,44.46-18.41\n  c11.23-12.16,16.63-28.49,14.89-44.92c-0.5-4.68-2.58-9.13-6.14-12.21c-4.02-3.49-9.22-5-14.46-4.22c-1.88,0.28-3.81,0.31-5.64-0.2\n  c-7.72-2.16-12.64-8.2-13.29-15.37l-1.27-14.27c-0.33-3.61-1.71-7.09-4.13-9.79c-4.19-4.65-10.45-6.48-16.31-5.02\n  c-4.74,1.18-9.83-0.47-12.97-4.2l-3.59-4.27c-4.36-5.19-11.01-7.95-17.76-7.36l-8.37,0.72c-16.01,1.38-31.65-4.43-42.87-15.93\n  l-6.04-6.19c-1.52-1.57-2.7-3.45-3.46-5.49c9.75-2.37,23.45-9.89,26.84-26.73c1.99-0.07,3.99,0.83,5.3,2.72\n  c0.48,0.69,0.72,1.51,0.87,2.34c1.31,7.13,6.72,12.77,13.8,14.38l40.84,9.3c7.25,1.65,14.93,1.68,22.2,0.09\n  c2.71-0.59,5.45-0.01,7.7,1.64c2.11,1.55,3.43,3.96,3.82,6.56l3.06,20.48c0.33,2.18,2.36,3.69,4.55,3.36\n  c2.18-0.33,3.69-2.37,3.36-4.55l-0.67-4.47c0.27,0.17,0.55,0.32,0.86,0.42l4.86,1.62c0.42,0.14,0.83,0.26,1.25,0.39\n  c2.38,9.75,10.37,25.2,27.48,27.1c0.93,0.11,1.82,0.15,2.66,0.15c6.18,0,9.96-2.58,12.12-4.91c0.36-0.4,0.7-0.82,1.03-1.26\n  c9.63,5.25,26.22,7.3,28.36,7.54c0.15,0.02,0.3,0.03,0.46,0.03c2,0,3.73-1.51,3.97-3.54c0.25-2.2-1.33-4.18-3.52-4.44\n  c-7.41-0.85-19.98-3.37-25.92-6.85c0.63-2.43,1-5.15,1.06-8.17c0.05-2.2-0.07-4.22-0.22-5.82c4.96-1.12,10.12,0.83,13.09,5.05\n  c4.88,6.93,12.79,10.98,21.15,10.98c1.01,0,2.02-0.06,3.04-0.18c2.19-0.26,3.76-2.25,3.5-4.44c-0.25-2.19-2.24-3.77-4.44-3.51\n  c-6.52,0.77-12.93-2.09-16.71-7.46c-5.18-7.35-14.41-10.49-23-7.82c-14.05,4.37-28.87,4.22-42.83-0.43l-4.86-1.62\n  c-1.58-0.52-3.25-0.01-4.28,1.18l-1.32-8.8l51.71-14.2c2.2-0.61,3.67,0.6,4.2,1.15c0.52,0.55,1.68,2.06,0.99,4.23\n  c-0.38,1.21-0.17,2.54,0.59,3.57c0.75,1.03,1.95,1.64,3.22,1.64h18.03c21.3,0,41.82,7.75,57.79,21.83c0.74,0.65,1.68,1,2.65,1\n  h15.52c11.38,0,22,5.61,28.41,15.01c0.45,0.66,1.1,1.18,1.85,1.47c0.72,0.28,68.23,26.75,96.5,50.81\n  c-28.01,13.19-52,17.85-71.39,13.87c-1.46-0.3-2.97,0.23-3.91,1.39c-12,14.77-34.19,12.17-47.32,8.93l14.53-2.46\n  c1.81-0.31,3.18-1.81,3.32-3.64c0.14-1.83-0.98-3.52-2.72-4.1c-0.09-0.03-3.97-1.34-9.42-3.83c15.36,2.02,29.42,1.75,30.33,1.73\n  c1.84-0.05,3.41-1.33,3.82-3.13c0.4-1.79-0.47-3.63-2.12-4.45l-42.6-21.28l18.56-1.96c4.59,0.64,9.36,0.48,14.14-0.59l9.67-2.17\n  c20.68-4.65,41.94,4.41,52.92,22.52c0.75,1.24,2.07,1.92,3.42,1.92c0.71,0,1.43-0.18,2.07-0.58c1.89-1.14,2.5-3.6,1.35-5.49\n  c-12.76-21.05-37.48-31.57-61.51-26.18l-9.68,2.17c-14.39,3.24-28.83-3.83-35.11-17.16c-4.42-9.39-12.57-16.78-22.36-20.25\n  l-20.45-7.27c-2.08-0.74-4.37,0.35-5.11,2.43c-0.74,2.08,0.35,4.37,2.43,5.11l20.45,7.27c7.79,2.76,14.28,8.64,17.8,16.12\n  c3.12,6.61,7.84,11.99,13.52,15.84l-16.57,1.74c-1.76,0.19-3.2,1.52-3.51,3.27c-0.32,1.75,0.55,3.5,2.14,4.29l38.55,19.26\n  c-10.95-0.78-24.66-2.59-34.44-6.73c-1.82-0.77-3.94-0.09-4.97,1.6c-1.03,1.7-0.67,3.89,0.85,5.16\n  c6.59,5.49,14.11,9.76,20.33,12.79l-26.82,4.55c-2.17,0.37-3.64,2.44-3.27,4.61c0.33,1.96,2.02,3.34,3.94,3.34\n  c0.22,0,0.45-0.02,0.67-0.06l8.84-1.5c1.42,0.53,2.76,0.97,3.45,1.26c0.46,0.18,11.36,4.61,24.92,5.99\n  c2.62,0.26,5.16,0.39,7.61,0.39c13.99,0,25.25-4.28,32.97-12.58c14.49,2.48,31.07,0.73,49.51-5.15l18.79,11.66l-14.78,2.68\n  c-1.21,0.22-2.31,0.92-2.91,1.99c-0.99,1.79-0.49,3.93,1.03,5.12l43.22,33.81L415.314,279.044z M173.294,140.404\n  c2.01,0.38,4.03,0.67,6.06,0.89c-0.96,1.68-1.93,3.65-2.72,5.72c-0.32-0.49-0.64-1-0.94-1.54\n  C174.684,143.724,173.894,141.974,173.294,140.404z M183.124,153.834c0.27-3.65,3.18-8.95,5.39-12.12\n  c5.11-0.07,10.21-0.64,15.25-1.72c0.31,4.83-0.05,11.59-3.25,15.03c-1.77,1.91-4.39,2.65-8.02,2.24\n  C189.014,156.874,185.894,155.724,183.124,153.834z"], ["width", "32px", "height", "32px", "id", "icon-dungeon", "viewBox", "0 0 32 32"], ["d", "M 16 5 C 14.962 5 13.959859 5.1547344 13.005859 5.4277344 L 14.447266 9.1796875 C 14.947266 9.0656875 15.466 9 16 9 C 16.534 9 17.052734 9.0656875 17.552734 9.1796875 L 18.994141 5.4277344 C 18.040141 5.1557344 17.038 5 16 5 z M 11.140625 6.1523438 C 9.640625 6.8983437 8.3334531 7.9741094 7.3144531 9.2871094 L 10.699219 11.441406 C 10.794906 11.330431 10.897782 11.225936 11 11.121094 L 11 11.130859 C 11.03 11.080859 11.080859 11.03 11.130859 11 L 11.113281 11 C 11.550813 10.571578 12.042212 10.198893 12.580078 9.8964844 L 11.140625 6.1523438 z M 20.859375 6.1523438 L 19.419922 9.8984375 C 19.955179 10.199772 20.440888 10.574268 20.876953 11 L 20.869141 11 C 20.919141 11.03 20.97 11.080859 21 11.130859 L 21 11.115234 C 21.166599 11.285851 21.325854 11.463392 21.474609 11.650391 L 24.939453 9.6289062 C 23.888453 8.1609063 22.488375 6.9623437 20.859375 6.1523438 z M 6.234375 10.970703 C 5.451375 12.481703 5 14.189 5 16 L 9 16 C 9 14.976 9.2270469 14.005906 9.6230469 13.128906 L 6.234375 10.970703 z M 16 11 C 15.66 11 15.32 11.029609 15 11.099609 L 15 25 L 17 25 L 17 11.099609 C 16.68 11.029609 16.34 11 16 11 z M 25.949219 11.353516 L 22.484375 13.375 C 22.813375 14.187 23 15.072 23 16 L 27 16 C 27 14.34 26.615219 12.768516 25.949219 11.353516 z M 13 12 C 11.79 12.91 11 14.37 11 16 L 11 25 L 13 25 L 13 12 z M 19 12 L 19 25 L 21 25 L 21 16 C 21 14.37 20.21 12.91 19 12 z M 5 18 L 5 22 L 9 22 L 9 18 L 5 18 z M 23 18 L 23 22 L 27 22 L 27 18 L 23 18 z M 5 24 L 5 27 L 9 27 L 9 24 L 5 24 z M 23 24 L 23 27 L 27 27 L 27 24 L 23 24 z"], ["id", "icon-lighthouse", "viewBox", "0 0 397.902 397.902"], ["x", "0.399", "y", "379.903", "width", "397.105", "height", "17.999", 2, "fill", "#b3b3b3"], ["points", "246.194,379.9 44.904,379.9 47.074,355.6 53.774,280.84 59.534,216.4 66.224,141.63 \n 68.794,112.89 69.634,103.56 221.464,103.56 222.294,112.89 225.794,151.97 231.174,212.09 237.414,281.85 242.794,341.96 \t", 2, "fill", "#e6e6e6"], ["points", "145.547,0 145.547,0 80.138,26.28 210.956,26.28 \t", 2, "fill", "#f93030"], ["x", "92.547", "y", "26.28", "width", "106", "height", "51", 2, "fill", "#e6e6e6"], ["points", "242.794,341.96 144.894,379.9 44.904,379.9 47.074,355.6 237.414,281.85 \t", 2, "fill", "#f93030"], ["points", "231.174,212.09 53.774,280.84 59.534,216.4 225.794,151.97 \t", 2, "fill", "#f93030"], ["points", "164.464,103.56 66.224,141.63 69.634,103.56 \t", 2, "fill", "#f93030"], ["x", "198.044", "y", "273.41", "width", "146.99", "height", "106.49", 2, "fill", "#c69c6d"], ["x", "97.214", "y", "33.946", "width", "12.667", "height", "34.667", 2, "fill", "#2d4151"], ["x", "119.881", "y", "33.946", "width", "51.333", "height", "34.667", 2, "fill", "#2d4151"], ["x", "181.214", "y", "33.946", "width", "12.667", "height", "34.667", 2, "fill", "#2d4151"], ["points", "222.294,112.89 68.794,112.89 69.634,103.56 \n 221.464,103.56 \t", 2, "opacity", "0.34", "fill", "#2d4151", "enable-background", "new"], ["d", "M122.954,321.61v58.29h-55.33v-58.29c0-7.59,3.05-14.46,8-19.46c5.01-5.06,11.97-8.2,19.66-8.2\n C110.564,293.95,122.954,306.33,122.954,321.61z", 2, "fill", "#2d4151"], ["d", "M99.944,294.35c-5.82,0.98-11.02,3.79-14.99,7.8c-4.95,5-8,11.87-8,19.46v58.29h-9.33v-58.29\n c0-7.59,3.05-14.46,8-19.46c5.01-5.06,11.97-8.2,19.66-8.2C96.874,293.95,98.434,294.08,99.944,294.35z", 2, "fill", "#b3b3b3"], ["x", "276.786", "y", "293.946", "width", "55.333", "height", "85.957", 2, "fill", "#a67c52"], ["x", "281.786", "y", "298.946", "width", "45.333", "height", "80.957", 2, "fill", "#936134"], ["x", "285.954", "y", "337.28", "width", "15", "height", "6", 2, "fill", "#c69c6d"], ["x", "216.954", "y", "293.946", "width", "38.332", "height", "56.833", 2, "fill", "#a67c52"], ["x", "221.954", "y", "298.946", "width", "28.332", "height", "46.833", 2, "fill", "#2d4151"], ["x", "233.62", "y", "296.446", "width", "5", "height", "51.833", 2, "fill", "#a67c52"], ["x", "219.204", "y", "319.863", "width", "34.5", "height", "5", 2, "fill", "#a67c52"], ["x", "198.044", "y", "273.41", "width", "146.99", "height", "4.25", 2, "fill", "#b78b5e"], ["x", "292.953", "y", "308.28", "width", "23", "height", "9", 2, "fill", "#2d4151"], ["x", "92.547", "y", "26.28", "width", "106", "height", "6", 2, "opacity", "0.34", "fill", "#2d4151", "enable-background", "new"], ["d", "M122.856,66.558h45.409V40.582\n C168.264,40.582,160.972,63.376,122.856,66.558z", 2, "opacity", "0.2", "fill", "#fcfafa", "enable-background", "new"], ["x", "55.888", "y", "75.869", "width", "179.319", "height", "29.101", 2, "fill", "#b3b3b3"], ["d", "M67.647,97.935V82.83h1.888v13.416h7.925v1.689C77.46,97.935,67.647,97.935,67.647,97.935z", 2, "fill", "#ffffff"], ["d", "M82.901,97.935V82.83h1.888v15.105H82.901z", 2, "fill", "#ffffff"], ["d", "M90.678,90.383c0-2.369,0.58-4.273,1.739-5.714c1.176-1.424,2.733-2.137,4.671-2.137\n c1.441,0,2.716,0.447,3.826,1.342c1.109,0.911,1.789,2.07,2.037,3.478l-1.888,0.199c-0.166-0.96-0.63-1.755-1.392-2.385\n c-0.745-0.629-1.606-0.944-2.583-0.944c-1.375,0-2.468,0.563-3.28,1.689c-0.828,1.11-1.242,2.601-1.242,4.472\n c0,1.822,0.414,3.288,1.242,4.397c0.812,1.093,1.905,1.64,3.28,1.64c1.258,0,2.269-0.43,3.031-1.292\n c0.762-0.845,1.143-1.979,1.143-3.403h-4.174v-1.864h6.062v7.702h-1.342l-0.273-1.615c-0.481,0.696-1.127,1.234-1.938,1.615\n c-0.779,0.364-1.615,0.546-2.509,0.546c-1.938,0-3.495-0.704-4.671-2.112C91.257,94.59,90.678,92.718,90.678,90.383z", 2, "fill", "#ffffff"], ["d", "M109.212,97.935V82.83h1.888v6.236h7.553V82.83h1.888v15.105h-1.888v-7.18H111.1v7.18H109.212z", 2, "fill", "#ffffff"], ["d", "M125.982,84.519V82.83h11.329v1.689h-4.745v13.416h-1.888V84.519H125.982z", 2, "fill", "#ffffff"], ["d", "M142.728,97.935V82.83h1.888v6.236h7.553V82.83h1.888v15.105h-1.888v-7.18h-7.553v7.18H142.728z", 2, "fill", "#ffffff"], ["d", "M159.92,90.383c0-2.369,0.621-4.273,1.863-5.714c1.243-1.424,2.89-2.137,4.944-2.137\n s3.693,0.712,4.919,2.137c1.242,1.441,1.863,3.346,1.863,5.714c0,2.335-0.621,4.207-1.863,5.615\n c-1.226,1.408-2.866,2.112-4.919,2.112c-2.054,0-3.702-0.704-4.944-2.112C160.541,94.59,159.92,92.718,159.92,90.383z\n M161.808,90.383c0,1.822,0.447,3.288,1.342,4.397c0.895,1.093,2.087,1.64,3.578,1.64c1.474,0,2.658-0.546,3.553-1.64\n c0.895-1.109,1.342-2.575,1.342-4.397c0-1.872-0.447-3.362-1.342-4.472c-0.895-1.126-2.079-1.689-3.553-1.689\n c-1.491,0-2.683,0.563-3.578,1.689C162.255,87.02,161.808,88.511,161.808,90.383z", 2, "fill", "#ffffff"], ["d", "M179.175,93.413V82.83h1.888v10.583c0,0.895,0.389,1.632,1.167,2.211\n c0.729,0.53,1.599,0.795,2.609,0.795s1.88-0.265,2.609-0.795c0.778-0.58,1.167-1.317,1.167-2.211V82.83h1.888v10.583\n c0,1.375-0.58,2.51-1.739,3.404c-1.093,0.861-2.401,1.292-3.925,1.292s-2.833-0.431-3.925-1.292\n C179.754,95.923,179.175,94.788,179.175,93.413z", 2, "fill", "#ffffff"], ["d", "M195.994,92.842h1.888c0,1.143,0.348,2.054,1.043,2.733c0.679,0.696,1.59,1.043,2.733,1.043\n s2.054-0.256,2.732-0.77c0.696-0.513,1.044-1.201,1.044-2.062c0-0.778-0.406-1.399-1.217-1.863\n c-0.596-0.332-1.45-0.597-2.559-0.795c-1.474-0.265-2.692-0.753-3.652-1.466c-1.093-0.828-1.64-1.847-1.64-3.056\n c0-1.226,0.48-2.211,1.441-2.957c0.96-0.746,2.244-1.118,3.851-1.118c1.606,0,2.89,0.439,3.851,1.317s1.441,2.046,1.441,3.503\n h-1.889c-0.166-0.944-0.555-1.706-1.167-2.286c-0.629-0.563-1.375-0.845-2.236-0.845c-1.027,0-1.855,0.215-2.484,0.646\n c-0.613,0.431-0.919,1.011-0.919,1.739c0,0.762,0.356,1.4,1.068,1.913c0.596,0.447,1.375,0.754,2.335,0.919\n c1.64,0.282,2.923,0.712,3.851,1.292c1.209,0.729,1.813,1.689,1.813,2.882c0,1.424-0.514,2.559-1.54,3.403\n c-1.044,0.862-2.418,1.292-4.124,1.292s-3.081-0.497-4.124-1.491C196.507,95.823,195.994,94.499,195.994,92.842z", 2, "fill", "#ffffff"], ["d", "M213.062,97.935V82.83h10.386v1.789h-8.497v4.621h7.553v1.789h-7.553v5.118h8.497v1.789h-10.386\n V97.935z", 2, "fill", "#ffffff"], ["points", "366.784,274.91 176.304,274.91 271.544,236.64 \t", 2, "fill", "#a67c52"], ["points", "366.784,274.91 271.544,274.91 271.544,236.64 \t", 2, "fill", "#936134"], ["id", "icon-ruins", "viewBox", "0 0 256 256"], ["d", "M171.762,234.229c-2.674,0-5.235-1.07-7.114-2.973s-2.918-4.478-2.885-7.15\n c0.244-19.819-2.767-31.968-5.667-34.868c-4.387-4.388-11.915-7.824-17.139-7.824c-1.811,0-3.118,0.39-3.886,1.157\n c-2.309,2.309-5.313,15.472-3.547,40.967c0.191,2.766-0.773,5.487-2.665,7.514c-1.891,2.027-4.539,3.178-7.311,3.178H40.886\n c-3.207,0-6.313-0.229-8.746-0.645c-10.157-1.734-11.254-8.314-11.254-11.063V104.476c0-3.274-2.029-9.257-4.02-11.856l-2.223-2.901\n C9.925,83.559,6.5,73.457,6.5,65.698V42.105c0-11.028,8.208-20,18.296-20c7.855,0,12.943,6.554,15.712,13.245\n c1.979-7.587,9.437-13.245,18.308-13.245c8.02,0,13.296,6.804,16.169,13.629c1.869-7.788,9.399-13.629,18.378-13.629\n c13.035,0,18.823,17.774,18.823,24.529c0,0.194,0.037,0.417,0.089,0.626c0.526,0.519,1.001,1.098,1.415,1.732\n c2.068,3.172,2.8,7.318-0.35,17.221c6.431,2.854,12.902,8.97,15.601,14.818c3.161,6.854,4.056,11.595,2.753,15.362\n c-0.122,1.165-0.257,3.255-0.351,5.299c0.76,0.031,1.481,0.066,2.119,0.103c6.6,0.382,9.598,5.786,11.024,9.881\n c0.559-2.191,1.633-4.348,3.695-6.409c2.635-2.631,5.784-3.91,9.63-3.91c0.598,0,1.287,0.034,2.112,0.083\n c0.828,0.05,1.685,0.101,2.812,0.101c11.97,0,17.817,15.208,18.677,22.962c0.012,0.009,0.022,0.018,0.034,0.027\n c3.426,0.451,6.494,2.136,8.608,4.776c2.414,3.013,3.307,6.938,2.45,10.768c-0.188,0.89-0.65,4.799-0.982,9.675l9.345-3.397\n c2.142-0.779,4.372-1.174,6.629-1.174c5.024,0,9.77,1.998,13.019,5.481c3.09,3.312,4.614,7.68,4.292,12.301\n c-0.303,4.353-2.751,12.689-4.203,17.329c0.625,2.739,1.917,6.568,3.15,9.285c0.119-0.053,0.235-0.104,0.346-0.153\n c3.438-1.521,6.993-3.095,10.856-3.095c5.995,0,10.837,3.924,12.05,9.764l0.211,1.021c1.104,5.317,1.9,9.111,2.003,9.572\n l-0.085,0.02c0.35,1.627,0.354,3.209,0.357,4.457c0.004,1.395,0.007,3.315,0.007,5.428c0,9.728-8.972,17.641-20,17.641H171.762z", 1, "st0"], ["d", "M188.531,111.542c-0.058,0-0.104,0.141-0.104,0.312c0,0.172,0.047,0.414,0.104,0.156\n S188.589,111.542,188.531,111.542z", 1, "st1"], ["d", "M239.479,208.938c-0.012-0.006-0.936-4.417-2.054-9.802l-0.209-1.012c-1.118-5.385-11.66,3.083-16.466,2.751\n s-9.785-15.828-10.417-21.292c0,0,4.188-12.854,4.499-17.316c0.382-5.487-5.378-8.396-10.546-6.517l-14.205,5.166\n c-5.168,1.879-9.147-1.076-8.843-6.567l0.164-2.938c0.305-5.491,0.91-11.575,1.345-13.519s-1.02-3.511-3.231-3.482\n c-2.211,0.028-7.99-3.994-7.99-8.064c0-4.071-3.955-14.803-8.789-14.803c-4.833,0-5.926-0.757-7.486,0.801\n c-1.287,1.286-1.371,2.532-1.371,6.514s-2.545,14.704-5.654,14.981s-11.245-3.701-11.245-7.609s-1.843-14.319-4.095-14.45\n c-2.251-0.13-5.796-0.237-7.876-0.237c-2.081,0-3.783-2.56-3.783-5.689s0.408-11.911,0.906-12.561s-0.523-4.282-2.271-8.071\n c-1.748-3.789-6.707-8.313-11.02-10.055s-6.585-7.109-5.048-11.928c1.537-4.818,2.132-8.833,1.323-8.919\n c-0.809-0.087-2.93-3.69-2.93-7.685s-3.971-14.529-8.823-14.529s-8.823,3.331-8.823,7.402c0,4.071-2.545,15.03-5.655,15.307\n c-3.11,0.277-11.246-3.834-11.246-7.905s-3.97-14.804-8.823-14.804s-8.823,3.269-8.823,7.265s-2.544,14.755-5.655,15.032\n c-3.11,0.277-11.246-3.772-11.246-7.767s-3.733-14.529-8.296-14.529c-4.563,0-8.296,4.5-8.296,10v23.593\n c0,5.5,2.737,13.572,6.082,17.938l2.223,2.901c3.345,4.366,6.082,12.438,6.082,17.938c0,0,0,19.728,0,34.591\n c0,27.25,0,71.747,0,71.747c0,5.5,0,10.769,0,11.708s4.5,1.708,10,1.708h42.577c5.5,0,14.5,0,20,0h4.704c5.5,0,10.438,0,10.974,0\n c0.209,0,1.091,0,2.408,0c-0.918-13.25-1.711-40.567,6.452-48.729c8.721-8.721,26.446-2.054,35.167,6.667\n c7.919,7.919,8.739,30.349,8.595,42.063h25.492c5.5,0,11.405,0,13.123,0s7.623,0,13.123,0h6c5.5,0,10-3.438,10-7.641\n S239.49,208.943,239.479,208.938z M89.602,184.022c0,5.5-4.5,10-10,10h-3.96c-5.5,0-10-4.5-10-10v-12.771\n c0-5.5,1.839-14.107,4.087-19.127c0,0,1.277-2.852,7.894-2.852c6.616,0,7.893,2.852,7.893,2.852\n c2.248,5.02,4.086,13.627,4.086,19.127V184.022z M89.602,118.167c0,5.5-4.5,10-10,10h-3.96c-5.5,0-10-4.5-10-10v-12.771\n c0-5.5,1.839-14.107,4.086-19.127c0,0,1.277-2.853,7.894-2.853c6.616,0,7.894,2.853,7.894,2.853\n c2.248,5.02,4.086,13.627,4.086,19.127V118.167z M200.88,207.738l-0.382,0.958c-2.033,5.11-4.925,6.624-6.426,3.362\n c-1.501-3.261-5.975-7.728-9.941-9.926c-3.966-2.198-4.031-7.182-0.146-11.073l1.661-1.664c3.886-3.892,9.732-3.451,12.991,0.979\n l0.013,0.018C201.909,194.821,202.913,202.628,200.88,207.738z", 1, "st1"], [3, "emitNpc"], [1, "p-1"], [1, "row", 2, "overflow", "auto", "font-size", "2rem"], [4, "ngFor", "ngForOf"], [1, "input-group", "mb-3"], ["type", "text", "placeholder", "enter unicode for new symbol", "id", "addIconInput", 1, "form-control"], [1, "input-group-append", 3, "click"], ["id", "basic-addon2", 1, "input-group-text"], [1, "col-2", "px-2", "text-center", 3, "ngClass"], ["container", "body", 3, "ngbTooltip", "click", 4, "ngIf"], ["container", "body", "class", "img-fluid", 3, "ngbTooltip", "src", "click", 4, "ngIf"], ["container", "body", 3, "ngbTooltip", "click"], ["container", "body", 1, "img-fluid", 3, "ngbTooltip", "src", "click"], ["class", "", 4, "ngIf"], [1, ""], [3, "class", "ngClass", 4, "ngFor", "ngForOf"], [3, "ngClass"], [2, "width", "100px", "height", "100px", "position", "absolute", "right", "0", 3, "innerHTML"], [1, "d-flex", "flex-column", "card-body", 2, "font-size", "1.1rem"], [2, "max-width", "90%"], [4, "ngIf"], ["class", "btn-group", 4, "ngIf"], [1, "btn-group"], ["type", "button", "class", "btn btn-primary", 3, "click", 4, "ngIf"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "table", "table-striped"], [3, "ngClass", 4, "ngIf"], [1, "cursor-pointer", 3, "click"], [1, "icon-dot-circled", "cursor-pointer", 3, "click"]], template: function NotificationSidebarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "aside", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function NotificationSidebarComponent_Template_a_click_1_listener() { return ctx.onClose(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "nav", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](8, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "NPCs");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, NotificationSidebarComponent_ng_template_11_Template, 1, 0, "ng-template", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](12, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, "Map Markers");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, NotificationSidebarComponent_ng_template_15_Template, 10, 1, "ng-template", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](16, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18, "Politics");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](19, NotificationSidebarComponent_ng_template_19_Template, 1, 1, "ng-template", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](20, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](22, "Cities");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](23, NotificationSidebarComponent_ng_template_23_Template, 14, 1, "ng-template", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](24, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "svg", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "defs");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](27, "marker", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](28, "path", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "marker", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](30, "path", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](31, "symbol", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](32, "path", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](33, "symbol", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](34, "path", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](35, "symbol", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](36, "path", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](37, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](38, "path", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](39, "path", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](40, "path", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](41, "path", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](42, "path", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](43, "path", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](44, "path", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](45, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](46, "path", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](47, "path", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](48, "path", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](49, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](50, "path", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](51, "path", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](52, "path", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](53, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](54, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](55, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](56, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](57, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](58, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](59, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](60, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](61, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](62, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](63, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](64, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](65, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](66, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](67, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](68, "symbol", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](69, "path", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](70, "path", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](71, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](72, "path", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](73, "path", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](74, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](75, "path", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](76, "path", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](77, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](78, "path", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](79, "path", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](80, "path", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](81, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](82, "path", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](83, "path", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](84, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](85, "path", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](86, "path", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](87, "path", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](88, "path", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](89, "path", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](90, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](91, "path", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](92, "path", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](93, "path", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](94, "path", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](95, "path", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](96, "path", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](97, "path", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](98, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](99, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](100, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](101, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](102, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](103, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](104, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](105, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](106, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](107, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](108, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](109, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](110, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](111, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](112, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](113, "symbol", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](114, "path", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](115, "path", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](116, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](117, "path", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](118, "path", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](119, "path", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](120, "path", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](121, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](122, "path", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](123, "path", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](124, "path", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](125, "path", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](126, "path", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](127, "path", 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](128, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](129, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](130, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](131, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](132, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](133, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](134, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](135, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](136, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](137, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](138, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](139, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](140, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](141, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](142, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](143, "symbol", 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](144, "path", 74);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](145, "path", 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](146, "path", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](147, "path", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](148, "path", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](149, "path", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](150, "path", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](151, "path", 81);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](152, "path", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](153, "path", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](154, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](155, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](156, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](157, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](158, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](159, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](160, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](161, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](162, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](163, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](164, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](165, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](166, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](167, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](168, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](169, "symbol", 84);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](170, "path", 85);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](171, "symbol", 86);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](172, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](173, "path", 87);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](174, "path", 88);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](175, "ellipse", 89);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](176, "path", 90);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](177, "ellipse", 91);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](178, "path", 92);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](179, "ellipse", 93);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](180, "path", 94);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](181, "ellipse", 95);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](182, "path", 96);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](183, "path", 97);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](184, "path", 98);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](185, "path", 99);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](186, "path", 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](187, "symbol", 101);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](188, "path", 102);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](189, "symbol", 103);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](190, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](191, "linearGradient", 104);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](192, "stop", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](193, "stop", 106);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](194, "stop", 107);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](195, "stop", 108);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](196, "stop", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](197, "path", 110);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](198, "linearGradient", 111);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](199, "stop", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](200, "stop", 106);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](201, "stop", 107);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](202, "stop", 108);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](203, "stop", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](204, "path", 112);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](205, "linearGradient", 113);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](206, "stop", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](207, "stop", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](208, "stop", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](209, "stop", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](210, "stop", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](211, "stop", 118);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](212, "stop", 119);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](213, "stop", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](214, "path", 120);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](215, "linearGradient", 121);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](216, "stop", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](217, "stop", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](218, "stop", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](219, "stop", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](220, "stop", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](221, "stop", 118);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](222, "stop", 119);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](223, "stop", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](224, "path", 122);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](225, "linearGradient", 123);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](226, "stop", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](227, "stop", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](228, "stop", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](229, "stop", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](230, "stop", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](231, "stop", 118);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](232, "stop", 119);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](233, "stop", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](234, "path", 124);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](235, "linearGradient", 125);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](236, "stop", 126);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](237, "stop", 127);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](238, "path", 128);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](239, "linearGradient", 129);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](240, "stop", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](241, "stop", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](242, "stop", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](243, "stop", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](244, "stop", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](245, "stop", 118);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](246, "stop", 119);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](247, "stop", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](248, "path", 130);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](249, "linearGradient", 131);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](250, "stop", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](251, "stop", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](252, "stop", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](253, "stop", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](254, "stop", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](255, "stop", 118);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](256, "stop", 119);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](257, "stop", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](258, "path", 132);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](259, "linearGradient", 133);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](260, "stop", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](261, "stop", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](262, "stop", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](263, "stop", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](264, "stop", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](265, "stop", 118);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](266, "stop", 119);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](267, "stop", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](268, "path", 134);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](269, "linearGradient", 135);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](270, "stop", 126);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](271, "stop", 127);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](272, "path", 136);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](273, "linearGradient", 137);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](274, "stop", 126);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](275, "stop", 127);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](276, "path", 138);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](277, "linearGradient", 139);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](278, "stop", 126);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](279, "stop", 127);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](280, "path", 140);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](281, "linearGradient", 141);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](282, "stop", 126);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](283, "stop", 127);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](284, "path", 142);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](285, "linearGradient", 143);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](286, "stop", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](287, "stop", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](288, "stop", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](289, "stop", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](290, "stop", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](291, "stop", 118);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](292, "stop", 119);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](293, "stop", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](294, "path", 144);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](295, "linearGradient", 145);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](296, "stop", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](297, "stop", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](298, "stop", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](299, "stop", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](300, "stop", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](301, "stop", 118);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](302, "stop", 119);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](303, "stop", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](304, "path", 146);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](305, "linearGradient", 147);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](306, "stop", 148);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](307, "stop", 149);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](308, "path", 150);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](309, "linearGradient", 151);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](310, "stop", 152);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](311, "stop", 153);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](312, "path", 154);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](313, "linearGradient", 155);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](314, "stop", 156);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](315, "stop", 149);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](316, "path", 157);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](317, "linearGradient", 158);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](318, "stop", 159);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](319, "stop", 156);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](320, "stop", 149);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](321, "path", 160);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](322, "path", 161);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](323, "path", 162);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](324, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](325, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](326, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](327, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](328, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](329, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](330, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](331, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](332, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](333, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](334, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](335, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](336, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](337, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](338, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](339, "symbol", 163);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](340, "path", 164);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](341, "symbol", 165);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](342, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](343, "rect", 166);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](344, "polygon", 167);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](345, "polygon", 168);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](346, "rect", 169);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](347, "polygon", 170);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](348, "polygon", 171);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](349, "polygon", 172);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](350, "rect", 173);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](351, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](352, "rect", 174);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](353, "rect", 175);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](354, "rect", 176);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](355, "polygon", 177);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](356, "path", 178);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](357, "path", 179);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](358, "rect", 180);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](359, "rect", 181);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](360, "rect", 182);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](361, "rect", 183);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](362, "rect", 184);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](363, "rect", 185);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](364, "rect", 186);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](365, "rect", 187);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](366, "rect", 188);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](367, "rect", 189);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](368, "path", 190);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](369, "rect", 191);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](370, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](371, "path", 192);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](372, "path", 193);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](373, "path", 194);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](374, "path", 195);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](375, "path", 196);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](376, "path", 197);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](377, "path", 198);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](378, "path", 199);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](379, "path", 200);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](380, "path", 201);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](381, "polygon", 202);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](382, "polygon", 203);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](383, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](384, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](385, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](386, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](387, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](388, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](389, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](390, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](391, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](392, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](393, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](394, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](395, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](396, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](397, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](398, "symbol", 204);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](399, "path", 205);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](400, "path", 206);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](401, "path", 207);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](2, _c3, ctx.isOpen));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngbNavOutlet", _r0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass, ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_9__.PerfectScrollbarDirective, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__.NgbNav, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__.NgbNavItem, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__.NgbNavLink, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__.NgbNavContent, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__.NgbNavOutlet, _components_npc_selector_npc_selector_component__WEBPACK_IMPORTED_MODULE_4__.NpcSelectorComponent, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__.NgbTooltip], pipes: [_pipes_safe_html__WEBPACK_IMPORTED_MODULE_5__.SafeHtml], styles: [".st0[_ngcontent-%COMP%] {\n  fill: #d1d1d1;\n}\n\n.st1[_ngcontent-%COMP%] {\n  fill: #454545;\n}\n\n.selected[_ngcontent-%COMP%] {\n  background-color: lightyellow !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbi1zaWRlYmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtBQUNGOztBQUVBO0VBQ0Usd0NBQUE7QUFDRiIsImZpbGUiOiJub3RpZmljYXRpb24tc2lkZWJhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zdDAge1xyXG4gIGZpbGw6ICNkMWQxZDE7XHJcbn1cclxuXHJcbi5zdDEge1xyXG4gIGZpbGw6ICM0NTQ1NDU7XHJcbn1cclxuXHJcbi5zZWxlY3RlZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHR5ZWxsb3cgIWltcG9ydGFudDtcclxufVxyXG4iXX0= */"] });
NotificationSidebarComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_7__.UntilDestroy)()
], NotificationSidebarComponent);



/***/ }),

/***/ 32677:
/*!*************************************************!*\
  !*** ./angular/app/shared/pipes/filter.pipe.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilterPipe": function() { return /* binding */ FilterPipe; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 74788);

class FilterPipe {
    transform(items, searchTerm, labelKey) {
        if (!items || !searchTerm) {
            return null;
        }
        return items.filter(item => item[labelKey || 'name']
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) === true).slice(0, 10);
    }
}
FilterPipe.ɵfac = function FilterPipe_Factory(t) { return new (t || FilterPipe)(); };
FilterPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "filter", type: FilterPipe, pure: true });


/***/ }),

/***/ 15623:
/*!***************************************************!*\
  !*** ./angular/app/shared/pipes/order-by.pipe.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OrderByPipe": function() { return /* binding */ OrderByPipe; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 74788);

class OrderByPipe {
    transform(array, field) {
        array.sort((a, b) => {
            if (a[field] < b[field]) {
                return -1;
            }
            else if (a[field] > b[field]) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return array;
    }
}
OrderByPipe.ɵfac = function OrderByPipe_Factory(t) { return new (t || OrderByPipe)(); };
OrderByPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "orderBy", type: OrderByPipe, pure: true });


/***/ }),

/***/ 86088:
/*!*************************************************!*\
  !*** ./angular/app/shared/pipes/pipe.module.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PipeModule": function() { return /* binding */ PipeModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var _filter_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter.pipe */ 32677);
/* harmony import */ var _search_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search.pipe */ 97941);
/* harmony import */ var _short_name_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./short-name.pipe */ 83512);
/* harmony import */ var _order_by_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./order-by.pipe */ 15623);
/* harmony import */ var _safe_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./safe-html */ 29593);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 74788);







class PipeModule {
}
PipeModule.ɵfac = function PipeModule_Factory(t) { return new (t || PipeModule)(); };
PipeModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: PipeModule });
PipeModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](PipeModule, { declarations: [_filter_pipe__WEBPACK_IMPORTED_MODULE_0__.FilterPipe, _search_pipe__WEBPACK_IMPORTED_MODULE_1__.SearchPipe, _short_name_pipe__WEBPACK_IMPORTED_MODULE_2__.ShortNamePipe, _order_by_pipe__WEBPACK_IMPORTED_MODULE_3__.OrderByPipe, _safe_html__WEBPACK_IMPORTED_MODULE_4__.SafeHtml], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule], exports: [_filter_pipe__WEBPACK_IMPORTED_MODULE_0__.FilterPipe, _search_pipe__WEBPACK_IMPORTED_MODULE_1__.SearchPipe, _short_name_pipe__WEBPACK_IMPORTED_MODULE_2__.ShortNamePipe, _order_by_pipe__WEBPACK_IMPORTED_MODULE_3__.OrderByPipe, _safe_html__WEBPACK_IMPORTED_MODULE_4__.SafeHtml] }); })();


/***/ }),

/***/ 29593:
/*!***********************************************!*\
  !*** ./angular/app/shared/pipes/safe-html.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SafeHtml": function() { return /* binding */ SafeHtml; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 91211);


class SafeHtml {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
SafeHtml.ɵfac = function SafeHtml_Factory(t) { return new (t || SafeHtml)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.DomSanitizer, 16)); };
SafeHtml.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "safe", type: SafeHtml, pure: true });


/***/ }),

/***/ 97941:
/*!*************************************************!*\
  !*** ./angular/app/shared/pipes/search.pipe.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SearchPipe": function() { return /* binding */ SearchPipe; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 74788);

class SearchPipe {
    transform(value, keys, term) {
        if (!term)
            return value;
        return (value || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
    }
}
SearchPipe.ɵfac = function SearchPipe_Factory(t) { return new (t || SearchPipe)(); };
SearchPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "search", type: SearchPipe, pure: true });


/***/ }),

/***/ 83512:
/*!*****************************************************!*\
  !*** ./angular/app/shared/pipes/short-name.pipe.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShortNamePipe": function() { return /* binding */ ShortNamePipe; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 74788);

class ShortNamePipe {
    transform(fullName) {
        return fullName
            .split(' ')
            .map((n) => n[0])
            .join('');
    }
}
ShortNamePipe.ɵfac = function ShortNamePipe_Factory(t) { return new (t || ShortNamePipe)(); };
ShortNamePipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "shortName", type: ShortNamePipe, pure: true });


/***/ }),

/***/ 95180:
/*!************************************************************!*\
  !*** ./angular/app/shared/routes/content-layout.routes.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONTENT_ROUTES": function() { return /* binding */ CONTENT_ROUTES; }
/* harmony export */ });
//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...
const CONTENT_ROUTES = [
    {
        path: "",
        loadChildren: () => __webpack_require__.e(/*! import() */ "angular_app_pages_content-pages_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/content-pages.module */ 7263)).then((m) => m.ContentPagesModule),
    },
];


/***/ }),

/***/ 45400:
/*!*********************************************************!*\
  !*** ./angular/app/shared/routes/full-layout.routes.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Full_ROUTES": function() { return /* binding */ Full_ROUTES; }
/* harmony export */ });
//Route for content layout with sidebar, navbar and footer.
const Full_ROUTES = [
    {
        path: "",
        loadChildren: () => __webpack_require__.e(/*! import() */ "angular_app_main-page_page_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../../main-page/page.module */ 39045)).then((m) => m.PageModule),
    },
];


/***/ }),

/***/ 47107:
/*!*******************************************************!*\
  !*** ./angular/app/shared/services/config.service.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigService": function() { return /* binding */ ConfigService; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 26215);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 74788);


class ConfigService {
    constructor() {
        this.templateConf = this.setConfigValue();
        this.templateConfSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(this.templateConf);
        this.templateConf$ = this.templateConfSubject.asObservable();
    }
    // Default configurations for Light layout. Please check *customizer.service.ts* for different colors and bg images options
    setConfigValue() {
        return (this.templateConf = {
            layout: {
                variant: "Dark",
                menuPosition: "Top",
                customizer: {
                    hidden: true,
                },
                navbar: {
                    type: "Static",
                },
                sidebar: {
                    collapsed: false,
                    size: "sidebar-md",
                    backgroundColor: "man-of-steel",
                    backgroundImage: true,
                    backgroundImageURL: "assets/img/sidebar-bg/01.jpg",
                },
            },
        });
    }
    // Default configurations for Dark layout. Please check *customizer.service.ts* for different colors and bg images options
    // setConfigValue() {
    //   return this.templateConf = {
    //     layout: {
    //       variant: "Dark",
    //       menuPosition: "Side",
    //       customizer: {
    //         hidden: true
    //       },
    //       navbar: {
    //         type: 'Static'
    //       },
    //       sidebar: {
    //         collapsed: false,
    //         size: "sidebar-md",
    //         backgroundColor: "black",
    //         backgroundImage: true,
    //         backgroundImageURL: "assets/img/sidebar-bg/01.jpg"
    //       }
    //     }
    //   };
    // }
    // Default configurations for Transparent layout. Please check *customizer.service.ts* for different colors and bg images options
    // setConfigValue() {
    //   return this.templateConf = {
    //     layout: {
    //       variant: "Transparent",
    //       menuPosition: "Side",
    //       customizer: {
    //         hidden: true
    //       },
    //       navbar: {
    //         type: 'Static'
    //       },
    //       sidebar: {
    //         collapsed: false,
    //         size: "sidebar-md",
    //         backgroundColor: "bg-glass-1",
    //         backgroundImage: true,
    //         backgroundImageURL: ""
    //       }
    //     }
    //   };
    // }
    applyTemplateConfigChange(tempConfig) {
        this.templateConf = Object.assign(this.templateConf, tempConfig);
        this.templateConfSubject.next(this.templateConf);
    }
}
ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(); };
ConfigService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ConfigService, factory: ConfigService.ɵfac, providedIn: "root" });


/***/ }),

/***/ 90775:
/*!***********************************************************!*\
  !*** ./angular/app/shared/services/customizer.service.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomizerService": function() { return /* binding */ CustomizerService; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.service */ 47107);


class CustomizerService {
    constructor(config) {
        this.config = config;
        // sidebar BG colors for Light & Dark Layout
        this.light_dark_colors = [
            {
                code: "mint",
                class: "gradient-mint",
                active: false,
                type: "gradient",
            },
            {
                code: "king-yna",
                class: "gradient-king-yna",
                active: false,
                type: "gradient",
            },
            {
                code: "ibiza-sunset",
                class: "gradient-ibiza-sunset",
                active: false,
                type: "gradient",
            },
            {
                code: "flickr",
                class: "gradient-flickr",
                active: false,
                type: "gradient",
            },
            {
                code: "purple-bliss",
                class: "gradient-purple-bliss",
                active: false,
                type: "gradient",
            },
            {
                code: "man-of-steel",
                class: "gradient-man-of-steel",
                active: false,
                type: "gradient",
            },
            {
                code: "purple-love",
                class: "gradient-purple-love",
                active: false,
                type: "gradient",
            },
            {
                code: "black",
                class: "bg-black",
                active: false,
                type: "solid",
            },
            {
                code: "white",
                class: "bg-grey",
                active: false,
                type: "solid",
            },
            {
                code: "primary",
                class: "bg-primary",
                active: false,
                type: "solid",
            },
            {
                code: "success",
                class: "bg-success",
                active: false,
                type: "solid",
            },
            {
                code: "warning",
                class: "bg-warning",
                active: false,
                type: "solid",
            },
            {
                code: "info",
                class: "bg-info",
                active: false,
                type: "solid",
            },
            {
                code: "danger",
                class: "bg-danger",
                active: false,
                type: "solid",
            },
        ];
        // sidebar BG colors for Transparent Layout
        this.transparent_colors = [
            {
                class: "bg-glass-hibiscus",
                active: false,
            },
            {
                class: "bg-glass-purple-pizzazz",
                active: false,
            },
            {
                class: "bg-glass-blue-lagoon",
                active: false,
            },
            {
                class: "bg-glass-electric-violet",
                active: false,
            },
            {
                class: "bg-glass-portage",
                active: false,
            },
            {
                class: "bg-glass-tundora",
                active: false,
            },
        ];
        // sidebar BG images for Light & Dark Layout
        this.light_dark_bg_images = [
            {
                src: "assets/img/sidebar-bg/01.jpg",
                active: false,
            },
            {
                src: "assets/img/sidebar-bg/02.jpg",
                active: false,
            },
            {
                src: "assets/img/sidebar-bg/03.jpg",
                active: false,
            },
            {
                src: "assets/img/sidebar-bg/04.jpg",
                active: false,
            },
            {
                src: "assets/img/sidebar-bg/05.jpg",
                active: false,
            },
            {
                src: "assets/img/sidebar-bg/06.jpg",
                active: false,
            },
        ];
        // Background Colors with Shades for Transparent Layout
        this.transparent_colors_with_shade = [
            {
                class: "bg-glass-1",
                active: false,
            },
            {
                class: "bg-glass-2",
                active: false,
            },
            {
                class: "bg-glass-3",
                active: false,
            },
            {
                class: "bg-glass-4",
                active: false,
            },
        ];
        this.lightDarkLayoutGradientBGColors = [];
        this.lightDarkLayoutSolidBGColors = [];
        this.transparentLayoutBGColors = [];
        this.transparentLayoutBGColorsWithShades = [];
        this.lightDarkLayoutBGImages = [];
        this.getData();
    }
    getData() {
        this.lightDarkLayoutGradientBGColors =
            this.getlightDarkLayoutGradientBGColors();
        this.lightDarkLayoutSolidBGColors = this.getlightDarkLayoutSolidBGColors();
        this.transparentLayoutBGColors = this.getTransparentLayoutBGColors();
        this.transparentLayoutBGColorsWithShades =
            this.GetTransparentLayoutBGColorsWithShades();
        this.lightDarkLayoutBGImages = this.getLightDarkLayoutBGImages();
    }
    getlightDarkLayoutGradientBGColors() {
        return this.light_dark_colors
            .filter((_) => _.type === "gradient")
            .map((color) => {
            color.active =
                color.code ===
                    this.config.templateConf.layout.sidebar.backgroundColor;
            return { ...color };
        });
    }
    getlightDarkLayoutSolidBGColors() {
        return this.light_dark_colors
            .filter((_) => _.type === "solid")
            .map((color) => {
            color.active =
                color.code ===
                    this.config.templateConf.layout.sidebar.backgroundColor;
            return { ...color };
        });
    }
    getTransparentLayoutBGColors() {
        return this.transparent_colors.map((color) => {
            color.active =
                color.class === this.config.templateConf.layout.sidebar.backgroundColor;
            return { ...color };
        });
    }
    GetTransparentLayoutBGColorsWithShades() {
        return this.transparent_colors_with_shade.map((color) => {
            color.active =
                color.class === this.config.templateConf.layout.sidebar.backgroundColor;
            return { ...color };
        });
    }
    getLightDarkLayoutBGImages() {
        return this.light_dark_bg_images.map((image) => {
            image.active =
                image.src ===
                    this.config.templateConf.layout.sidebar.backgroundImageURL;
            return { ...image };
        });
    }
    //called when click to change on any Gradient/Solid color for Light & Dark layout in customizer
    changeSidebarBGColor(color) {
        let conf = this.config.templateConf;
        conf.layout.sidebar.backgroundColor = color.code;
        this.config.applyTemplateConfigChange({ layout: conf.layout });
        this.getData();
    }
    //called when click to change on any Transparent color for Transparent layout in customizer
    changeSidebarTransparentBGColor(color) {
        let conf = this.config.templateConf;
        conf.layout.sidebar.backgroundColor = color.class;
        conf.layout.sidebar.backgroundImage = false;
        conf.layout.sidebar.backgroundImageURL = "";
        this.config.applyTemplateConfigChange({ layout: conf.layout });
        this.getData();
    }
    //called when click to change on any image for Light & Dark layout in customizer
    changeSidebarBgImage(image) {
        let conf = this.config.templateConf;
        conf.layout.sidebar.backgroundImageURL = image.src;
        this.config.applyTemplateConfigChange({ layout: conf.layout });
        this.getData();
    }
    bgImageDisplay(e) {
        let conf = this.config.templateConf;
        if (e.target.checked) {
            conf.layout.sidebar.backgroundImage = true;
        }
        else {
            conf.layout.sidebar.backgroundImage = false;
        }
        this.config.applyTemplateConfigChange({ layout: conf.layout });
    }
    toggleCompactMenu(e) {
        let conf = this.config.templateConf;
        if (e.target.checked) {
            conf.layout.sidebar.collapsed = true;
        }
        else {
            conf.layout.sidebar.collapsed = false;
        }
        this.config.applyTemplateConfigChange({ layout: conf.layout });
    }
    changeSidebarWidth(value) {
        let conf = this.config.templateConf;
        conf.layout.sidebar.size = value;
        this.config.applyTemplateConfigChange({ layout: conf.layout });
    }
    toggleNavbarType(value) {
        let conf = this.config.templateConf;
        conf.layout.navbar.type = value;
        this.config.applyTemplateConfigChange({ layout: conf.layout });
    }
    // position: "Side" for vertical menu and position: "Top" for horizontal menu
    toggleMenuPosition(position) {
        let conf = this.config.templateConf;
        conf.layout.menuPosition = position;
        this.config.applyTemplateConfigChange({ layout: conf.layout });
    }
    switchLayout(layout, isBgImageDisplay) {
        let conf = this.config.templateConf;
        if (layout.toLowerCase() === "light") {
            conf.layout.variant = "Light";
            conf.layout.sidebar.backgroundImageURL = this.light_dark_bg_images[0].src;
            conf.layout.sidebar.backgroundColor = this.light_dark_colors[5].code;
            conf.layout.sidebar.backgroundImage = isBgImageDisplay;
        }
        else if (layout.toLowerCase() === "dark") {
            conf.layout.variant = "Dark";
            conf.layout.sidebar.backgroundImageURL = this.light_dark_bg_images[2].src;
            conf.layout.sidebar.backgroundColor = this.light_dark_colors[7].code;
            conf.layout.sidebar.backgroundImage = isBgImageDisplay;
        }
        else if (layout.toLowerCase() === "transparent") {
            conf.layout.variant = "Transparent";
            conf.layout.sidebar.backgroundImageURL = "";
            conf.layout.sidebar.backgroundColor =
                this.transparent_colors_with_shade[0].class;
        }
        this.config.applyTemplateConfigChange({ layout: conf.layout });
        this.getData();
    }
}
CustomizerService.ɵfac = function CustomizerService_Factory(t) { return new (t || CustomizerService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_config_service__WEBPACK_IMPORTED_MODULE_0__.ConfigService)); };
CustomizerService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CustomizerService, factory: CustomizerService.ɵfac, providedIn: "root" });


/***/ }),

/***/ 60432:
/*!*******************************************************!*\
  !*** ./angular/app/shared/services/layout.service.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LayoutService": function() { return /* binding */ LayoutService; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 79765);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 74788);


class LayoutService {
    constructor() {
        this.toggleSidebar = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject(); // small screen
        this.overlaySidebarToggle = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
        this.toggleNotiSidebar = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
        // Observable
        this.toggleSidebar$ = this.toggleSidebar.asObservable();
        this.overlaySidebarToggle$ = this.overlaySidebarToggle.asObservable();
        this.toggleNotiSidebar$ = this.toggleNotiSidebar.asObservable();
    }
    toggleSidebarSmallScreen(toggle) {
        this.toggleSidebar.next(toggle);
    }
    overlaySidebartoggle(toggle) {
        this.overlaySidebarToggle.next(toggle);
    }
    toggleNotificationSidebar(toggle) {
        this.toggleNotiSidebar.next(toggle);
    }
}
LayoutService.ɵfac = function LayoutService_Factory(t) { return new (t || LayoutService)(); };
LayoutService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: LayoutService, factory: LayoutService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 43235:
/*!******************************************************!*\
  !*** ./angular/app/shared/services/story.service.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StoryService": function() { return /* binding */ StoryService; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 26215);
/* harmony import */ var _models_campaign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/campaign */ 60221);
/* harmony import */ var _models_game_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/game-map */ 53113);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 58497);





class StoryService {
    constructor(http) {
        this.http = http;
        this.features = [];
        this.religions = [];
        this.markers = [];
        this.urbanization = 1;
        this.populationRate = 1000;
        this.campaignListSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject([]);
        this.campaignList$ = this.campaignListSource.asObservable();
        this.dataSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject({});
        this.data$ = this.dataSource.asObservable();
        this.zoomSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject({});
        this.zoom$ = this.zoomSource.asObservable();
        this.campaignSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(new _models_campaign__WEBPACK_IMPORTED_MODULE_0__.Campaign());
        this.campaign$ = this.campaignSource.asObservable();
        this.mapSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(new _models_game_map__WEBPACK_IMPORTED_MODULE_1__.GameMap());
        this.map$ = this.mapSource.asObservable();
        this.selectedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject({});
        this.selected$ = this.selectedSource.asObservable();
        this.getCampaigns = () => {
            this.http
                .get("/api/campaigns")
                .subscribe((data) => this.campaignListSource.next(data.campaigns));
        };
        this.getCampaign = (id) => {
            this.http
                .get("/api/campaign/" + id)
                .subscribe((data) => this.campaignSource.next(data.campaign));
        };
        this.updateCampaign = (campaign) => {
            this.http
                .put("/api/campaign/" + campaign.id, campaign)
                .subscribe((data) => this.campaignSource.next(data.campaign));
        };
        this.select = (item, type) => {
            let data = this.dataSource.getValue();
            let selected = {};
            if (typeof item !== "object") {
                if (typeof item.length != "undefined" && item.length > 3) {
                    item = { i: item.replace("marker", "") };
                }
                else {
                    item = { i: item };
                }
            }
            if (type == "marker") {
                const note = data.notes.find((note) => note.id === "marker" + item.i);
                selected = { ...data.markers[item.i], ...item };
                console.log(selected);
            }
            if (type == "npc") {
                selected = item;
            }
            if (type == "burg") {
                selected = { ...data.burgs[item.i], ...item };
                selected.elevation = this.getHeight(data.cells.h[selected.cell], false, data.heightExponent);
                if (selected.cell) {
                    const temperature = data.cells.temp[data.cells.g[selected.cell]];
                    selected.temperature = this.convertTemperature(temperature);
                    selected.biome = data.cells.biome[selected.cell];
                    selected.biome = data.cells.biome[selected.cell];
                }
            }
            selected.selectType = type;
            if (selected.culture)
                selected.cObject = data.cultures[selected.culture];
            if (selected?.npcs)
                selected.npcs = selected.npcs;
            this.selectedSource.next(selected);
        };
        this.setData = (data, cells) => {
            let settings = data[1].split("|");
            // this.features = JSON.parse(data[12]);
            // this.markers = data[35] ? JSON.parse(data[35]) : [];
            // this.religions = data[29]
            //   ? JSON.parse(data[29])
            //   : [{ i: 0, name: "No religion" }];
            let newData = {
                states: JSON.parse(data[14]),
                burgs: JSON.parse(data[15]),
                populationRate: settings[12],
                urbanization: settings[13],
                cultures: JSON.parse(data[13]),
                notes: JSON.parse(data[4]),
                markers: data[35] ? JSON.parse(data[35]) : [],
                cells: cells,
                heightExponent: settings[4],
            };
            this.dataSource.next(newData);
        };
        this.getMap = (id) => {
            let cId = this.campaignSource.getValue()
                ? this.campaignSource.getValue().id
                : null;
            this.http
                .post("/api/map/" + id, { campaignId: cId })
                .subscribe((data) => {
                this.mapSource.next(data.map);
            });
        };
        this.getHeight = (h, abs = false, heightExponent) => {
            const unit = "ft"; //this.heightUnit.value;
            let unitRatio = 3.281; // default calculations are in feet
            // if (unit === "m") unitRatio = 1;
            // // if meter
            // else if (unit === "f") unitRatio = 0.5468; // if fathom
            let height = -990;
            if (h >= 20)
                height = Math.pow(h - 18, heightExponent);
            else if (h < 20 && h > 0)
                height = ((h - 20) / h) * 50;
            if (abs)
                height = Math.abs(height);
            return Math.round(height * unitRatio) + " " + unit;
        };
        this.convertTemperature = (c) => {
            return Math.round((c * 9) / 5 + 32) + "°F";
        };
        this.updateCampaignPOI = (poi, campaign) => {
            return this.http.put("/api/campaign-poi/" + campaign.id + "/" + poi.region_id, poi);
        };
        this.updateCampaignNPC = (npc, campaign) => {
            return this.http.put("/api/campaign-npc/" + campaign.id + "/" + npc.id, npc);
        };
        this.resetCampaignPOI = (poi, campaign) => {
            return this.http.delete("/api/campaign-poi/" + campaign.id + "/" + poi.region_id);
        };
        this.resetCampaignNPC = (npc, campaign) => {
            return this.http.delete("/api/campaign-npc/" + campaign.id + "/" + npc.id);
        };
        // return random value from the array
        this.ra = (array) => {
            return array[this.rand(0, array.length - 1)];
        };
        // probability shorthand
        this.P = (probability) => {
            if (probability >= 1)
                return true;
            if (probability <= 0)
                return false;
            return Math.random() < probability;
        };
        this.each = (n) => {
            return (i) => i % n === 0;
        };
        // probability shorthand for floats
        this.Pint = (float) => {
            return ~~float + +this.P(float % 1);
        };
    }
    zoomTo(x, y, z, d) {
        this.zoomSource.next({ x, y, z, d });
    }
    // random number in a range
    rand(x = 1, y) {
        return x + (crypto.getRandomValues(new Uint32Array(1))[0] % (y - x + 1));
    }
    abbreviateNumber(value) {
        let newValue = parseInt(value, 10);
        value = parseInt(value, 10);
        if (value >= 1000) {
            var suffixes = ["", "k", "m", "b", "t"];
            var suffixNum = Math.floor(("" + value).length / 3);
            var shortValue = "";
            for (var precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat((suffixNum != 0
                    ? value / Math.pow(1000, suffixNum)
                    : value).toPrecision(precision));
                var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
                if (dotLessShortValue.length <= 2) {
                    break;
                }
            }
            if (shortValue % 1 != 0)
                shortValue = shortValue.toFixed(1);
            if (shortValue < 1) {
                shortValue = shortValue * 1000;
                suffixNum -= 1;
            }
            newValue = shortValue + suffixes[suffixNum];
        }
        return newValue;
    }
}
StoryService.ɵfac = function StoryService_Factory(t) { return new (t || StoryService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient)); };
StoryService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: StoryService, factory: StoryService.ɵfac, providedIn: "root" });


/***/ }),

/***/ 28370:
/*!*******************************************************!*\
  !*** ./angular/app/shared/services/window.service.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WINDOW": function() { return /* binding */ WINDOW; },
/* harmony export */   "WindowRef": function() { return /* binding */ WindowRef; },
/* harmony export */   "BrowserWindowRef": function() { return /* binding */ BrowserWindowRef; },
/* harmony export */   "windowFactory": function() { return /* binding */ windowFactory; },
/* harmony export */   "browserWindowProvider": function() { return /* binding */ browserWindowProvider; },
/* harmony export */   "windowProvider": function() { return /* binding */ windowProvider; },
/* harmony export */   "WINDOW_PROVIDERS": function() { return /* binding */ WINDOW_PROVIDERS; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 74788);



/* Create a new injection token for injecting the window into a component. */
const WINDOW = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("WindowToken");
/* Define abstract class for obtaining reference to the global window object. */
class WindowRef {
    get nativeWindow() {
        throw new Error("Not implemented.");
    }
}
/* Define class that implements the abstract class and returns the native window object. */
class BrowserWindowRef extends WindowRef {
    constructor() {
        super();
    }
    get nativeWindow() {
        return window;
    }
}
BrowserWindowRef.ɵfac = function BrowserWindowRef_Factory(t) { return new (t || BrowserWindowRef)(); };
BrowserWindowRef.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: BrowserWindowRef, factory: BrowserWindowRef.ɵfac });
/* Create an factory function that returns the native window object. */
function windowFactory(browserWindowRef, platformId) {
    if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_1__.isPlatformBrowser)(platformId)) {
        return browserWindowRef.nativeWindow;
    }
    return new Object();
}
/* Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class. */
const browserWindowProvider = {
    provide: WindowRef,
    useClass: BrowserWindowRef,
};
/* Create an injectable provider that uses the windowFactory function for returning the native window object. */
const windowProvider = {
    provide: WINDOW,
    useFactory: windowFactory,
    deps: [WindowRef, _angular_core__WEBPACK_IMPORTED_MODULE_0__.PLATFORM_ID],
};
/* Create an array of providers. */
const WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];


/***/ }),

/***/ 40653:
/*!******************************************************!*\
  !*** ./angular/app/shared/services/world.service.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldService": function() { return /* binding */ WorldService; }
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 78345);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 88229);
/* harmony import */ var _models_world__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/world */ 53187);
/* harmony import */ var _models_region__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/region */ 27284);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 58497);







class WorldService {
    constructor(http) {
        this.http = http;
        this.npcsSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject();
        this.npcs$ = this.npcsSource.asObservable();
        this.selectedNPCSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject();
        this.selectedNPC$ = this.selectedNPCSource.asObservable();
        this.selectedWorldSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject();
        this.selectedWorld$ = this.selectedWorldSource.asObservable();
        this.selectedRegionSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject();
        this.selectedRegion$ = this.selectedRegionSource.asObservable();
        this.getWorld = (id) => {
            console.log("Get World");
            this.http
                .get("/api/world/" + id)
                .subscribe((data) => this.selectedWorldSource.next(new _models_world__WEBPACK_IMPORTED_MODULE_0__.World(data)));
        };
        this.updateWorld = (world) => {
            world = { name: world.name, id: world.id };
            this.http.put("/api/world/" + world.id, world).subscribe();
        };
        this.getWorldFromRegion = (id) => {
            console.log("Get World FR");
            this.http.get("/api/world/fr/" + id).subscribe((data) => {
                console.log(data);
                console.log(new _models_world__WEBPACK_IMPORTED_MODULE_0__.World(data));
                this.selectedWorldSource.next(new _models_world__WEBPACK_IMPORTED_MODULE_0__.World(data));
            });
        };
        this.getRegion = (id) => {
            this.http.get("/api/region/" + id).subscribe((data) => {
                this.getWorldFromRegion(data.region.id);
                this.selectedRegionSource.next(new _models_region__WEBPACK_IMPORTED_MODULE_1__.Region(data.region));
            });
        };
        this.getNpc = (npcId) => {
            this.http
                .get("/api/npc/" + npcId)
                .subscribe((data) => this.selectNpc(data.npc));
        };
        this.getNpcs = (regionId) => {
            return this.http.get("/api/region/" + regionId + "/npcs");
        };
        this.getNpcList = (regionId) => {
            return this.http.get("/api/region/" + regionId + "/npc-list");
        };
        this.getAspects = () => {
            return this.http.get("/api/aspects");
        };
        this.updateNpc = (params) => {
            return this.http
                .put("/api/npc/" + params.id, params)
                .subscribe((data) => this.selectNpc(data.npc));
        };
        this.addNpc = (params) => {
            return this.http.post("/api/npcs/npc/add", params);
        };
        this.createWorld = (world = null) => {
            return this.http.post("/api/world/create", world);
        };
        this.deleteWorld = (id) => {
            return this.http.delete("/api/world/" + id);
        };
        this.deleteNpc = (params) => {
            return this.http.post("/api/npcs/npc/delete", params);
        };
        this.seedRegion = (region) => {
            const call = this.http
                .get("/api/region/" + region.id + "/seed")
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.share)());
            return call;
        };
        this.saveRegion = (region) => {
            console.log(region.feature_types.body);
            const call = this.http
                .put("/api/region/" + region.id, region)
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.share)());
            return call;
        };
        this.generateFeatures = (npcId, lockedFeatures) => {
            return this.http
                .put("/api/npc/" + npcId + "/generate-features", {
                locked_features: lockedFeatures,
            })
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.share)());
        };
        this.ageRegion = (region, years) => {
            const call = this.http
                .get("/api/region/" + region.id + "/age/" + years)
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.share)());
            return call;
        };
        this.clearRegion = (region) => {
            const call = this.http
                .get("/api/region/" + region.id + "/clear")
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.share)());
            return call;
        };
        this.addRegion = (world, region = null) => {
            const call = this.http
                .post("/api/world/" + world.id + "/region/add", { region: region })
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.share)());
            return call;
        };
        this.deleteRegion = (region) => {
            const call = this.http.delete("/api/region/" + region.id).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.share)());
            return call;
        };
        this.updateBurg = (region, burg) => {
            const call = this.http
                .put("/api/region/" + region.id + "/burg", burg)
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.share)());
            return call;
        };
        this.updatePOI = (poi, region) => {
            const call = this.http
                .put("/api/region/" + region.id + "/poi", { poi })
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.share)());
            call.subscribe();
            return call;
        };
        this.updateSVG = (svg, region) => {
            const call = this.http
                .put("/api/region/" + region.id + "/svg", { svg })
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.share)());
            call.subscribe();
            return call;
        };
        this.getPOI = (poi, region) => {
            let type = poi.selectType == "burg" ? "burgs" : "poi";
            const call = this.http
                .get("/api/region/" + region.id + "/" + type + "/" + poi.i)
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.share)());
            return call;
        };
        this.createPOI = (poi, svg, region) => {
            const call = this.http
                .post("/api/region/" + region.id + "/create-poi", { poi, svg })
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.share)());
            call.subscribe();
            return call;
        };
        this.attachNPC = (npc, poi) => {
            const call = this.http.post("/api/region/" +
                npc.region_id +
                "/" +
                poi.selectType +
                "/" +
                poi.i +
                "/" +
                npc.id, {});
            return call;
        };
        this.detachNPC = (npc, poi) => {
            const call = this.http.delete("/api/region/" +
                npc.region_id +
                "/" +
                poi.type +
                "/" +
                poi.i +
                "/" +
                npc.id, {});
            return call;
        };
        this.addDescriptive = (descriptive, world) => {
            this.http.post("/api/world/" + world.id + "/descriptive", descriptive);
        };
        this.saveDescriptive = (descriptive, world) => {
            return this.http.post("/api/world/" +
                world.id +
                "/race" +
                (descriptive.id ? "/" + descriptive.id : ""), descriptive);
        };
        this.saveRace = (race, world) => {
            return this.http.post("/api/world/" + world.id + "/race" + (race.id ? "/" + race.id : ""), race);
        };
        this.deleteDescriptive = (descriptive) => {
            this.http.delete("/api/descriptive/" + descriptive.id, descriptive);
        };
        this.deleteRace = (race) => {
            this.http.delete("/api/race/" + race.id, race);
        };
        this.copyFromWorld = (source, target) => {
            return this.http.get("/api/copy-world/" + target.id + "/" + source.id);
        };
        this.copyFromRegion = (source, target) => {
            return this.http.get("/api/copy-region/" + target.id + "/" + source.id);
        };
    }
    selectNpc(npc) {
        {
            console.log(npc);
            var ordering = {}, // map for efficient lookup of sortIndex
            sortOrder = [
                "face shape",
                "skin complexion",
                "skin color",
                "hair description",
                "hair color",
                "eye description",
                "eye color",
                "clothing",
                "body",
                "body extra",
                "special",
            ];
            for (var i = 0; i < sortOrder.length; i++)
                ordering[sortOrder[i]] = i;
            npc.featuresArray = Object.values(npc.features).sort(function (a, b) {
                return (ordering[a.name] - ordering[b.name] || a.name.localeCompare(b.name));
            });
            if (npc.events)
                npc.events = npc.events.sort((a, b) => (a.age > b.age ? 1 : -1));
            console.log(npc);
            this.selectedNPCSource.next(new _models_world__WEBPACK_IMPORTED_MODULE_0__.NPC(npc));
        }
    }
}
WorldService.ɵfac = function WorldService_Factory(t) { return new (t || WorldService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient)); };
WorldService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: WorldService, factory: WorldService.ɵfac, providedIn: "root" });


/***/ }),

/***/ 8421:
/*!*********************************************!*\
  !*** ./angular/app/shared/shared.module.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedModule": function() { return /* binding */ SharedModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/router */ 3984);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/forms */ 24751);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/cdk/overlay */ 933);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/menu */ 23021);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 96797);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ngx-translate/core */ 75629);
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ngx-perfect-scrollbar */ 99904);
/* harmony import */ var ng_click_outside__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ng-click-outside */ 64623);
/* harmony import */ var _components_autocomplete_autocomplete_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/autocomplete/autocomplete.module */ 31977);
/* harmony import */ var _angular_app_shared_pipes_pipe_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../angular/app/shared/pipes/pipe.module */ 86088);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 54163);
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footer/footer.component */ 26590);
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navbar/navbar.component */ 96319);
/* harmony import */ var _horizontal_menu_horizontal_menu_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./horizontal-menu/horizontal-menu.component */ 83686);
/* harmony import */ var _vertical_menu_vertical_menu_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vertical-menu/vertical-menu.component */ 70644);
/* harmony import */ var _customizer_customizer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./customizer/customizer.component */ 7114);
/* harmony import */ var _notification_sidebar_notification_sidebar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./notification-sidebar/notification-sidebar.component */ 9856);
/* harmony import */ var _directives_toggle_fullscreen_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./directives/toggle-fullscreen.directive */ 66763);
/* harmony import */ var _directives_sidebar_link_directive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./directives/sidebar-link.directive */ 92489);
/* harmony import */ var _directives_sidebar_dropdown_directive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./directives/sidebar-dropdown.directive */ 77663);
/* harmony import */ var _directives_sidebar_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./directives/sidebar-anchor-toggle.directive */ 60252);
/* harmony import */ var _directives_sidebar_directive__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./directives/sidebar.directive */ 17618);
/* harmony import */ var _directives_topmenu_directive__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./directives/topmenu.directive */ 45197);
/* harmony import */ var _directives_topmenu_link_directive__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./directives/topmenu-link.directive */ 78819);
/* harmony import */ var _directives_topmenu_dropdown_directive__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./directives/topmenu-dropdown.directive */ 20154);
/* harmony import */ var _directives_topmenu_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./directives/topmenu-anchor-toggle.directive */ 24378);
/* harmony import */ var _components_npc_selector_npc_selector_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/npc-selector/npc-selector.component */ 90081);
/* harmony import */ var _components_coa_coa_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/coa/coa.component */ 7191);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 74788);












//COMPONENTS






// import { ContextMenuComponent } from './components/context-menu-component/context-menu.component';
//DIRECTIVES












class SharedModule {
}
SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
SharedModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineNgModule"]({ type: SharedModule });
SharedModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_21__.RouterModule,
            _angular_common__WEBPACK_IMPORTED_MODULE_22__.CommonModule,
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_23__.NgbModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__.TranslateModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_25__.FormsModule,
            _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_26__.FontAwesomeModule,
            _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_27__.OverlayModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_25__.ReactiveFormsModule,
            ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_28__.PerfectScrollbarModule,
            ng_click_outside__WEBPACK_IMPORTED_MODULE_0__.ClickOutsideModule,
            _components_autocomplete_autocomplete_module__WEBPACK_IMPORTED_MODULE_1__.AutocompleteModule,
            _angular_app_shared_pipes_pipe_module__WEBPACK_IMPORTED_MODULE_2__.PipeModule,
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_29__.MatMenuModule,
        ], _angular_common__WEBPACK_IMPORTED_MODULE_22__.CommonModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_23__.NgbModule,
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__.TranslateModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_29__.MatMenuModule,
        _angular_app_shared_pipes_pipe_module__WEBPACK_IMPORTED_MODULE_2__.PipeModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵsetNgModuleScope"](SharedModule, { declarations: [_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__.FooterComponent,
        _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__.NavbarComponent,
        _vertical_menu_vertical_menu_component__WEBPACK_IMPORTED_MODULE_6__.VerticalMenuComponent,
        _horizontal_menu_horizontal_menu_component__WEBPACK_IMPORTED_MODULE_5__.HorizontalMenuComponent,
        _customizer_customizer_component__WEBPACK_IMPORTED_MODULE_7__.CustomizerComponent,
        _notification_sidebar_notification_sidebar_component__WEBPACK_IMPORTED_MODULE_8__.NotificationSidebarComponent,
        _directives_toggle_fullscreen_directive__WEBPACK_IMPORTED_MODULE_9__.ToggleFullscreenDirective,
        _directives_sidebar_link_directive__WEBPACK_IMPORTED_MODULE_10__.SidebarLinkDirective,
        _directives_sidebar_dropdown_directive__WEBPACK_IMPORTED_MODULE_11__.SidebarDropdownDirective,
        _directives_sidebar_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_12__.SidebarAnchorToggleDirective,
        _directives_sidebar_directive__WEBPACK_IMPORTED_MODULE_13__.SidebarDirective,
        _directives_topmenu_link_directive__WEBPACK_IMPORTED_MODULE_15__.TopMenuLinkDirective,
        _directives_topmenu_dropdown_directive__WEBPACK_IMPORTED_MODULE_16__.TopMenuDropdownDirective,
        _directives_topmenu_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_17__.TopMenuAnchorToggleDirective,
        _directives_topmenu_directive__WEBPACK_IMPORTED_MODULE_14__.TopMenuDirective,
        _components_npc_selector_npc_selector_component__WEBPACK_IMPORTED_MODULE_18__.NpcSelectorComponent,
        _components_coa_coa_component__WEBPACK_IMPORTED_MODULE_19__.CoaComponent], imports: [_angular_router__WEBPACK_IMPORTED_MODULE_21__.RouterModule,
        _angular_common__WEBPACK_IMPORTED_MODULE_22__.CommonModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_23__.NgbModule,
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__.TranslateModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_25__.FormsModule,
        _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_26__.FontAwesomeModule,
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_27__.OverlayModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_25__.ReactiveFormsModule,
        ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_28__.PerfectScrollbarModule,
        ng_click_outside__WEBPACK_IMPORTED_MODULE_0__.ClickOutsideModule,
        _components_autocomplete_autocomplete_module__WEBPACK_IMPORTED_MODULE_1__.AutocompleteModule,
        _angular_app_shared_pipes_pipe_module__WEBPACK_IMPORTED_MODULE_2__.PipeModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_29__.MatMenuModule], exports: [_angular_common__WEBPACK_IMPORTED_MODULE_22__.CommonModule,
        _footer_footer_component__WEBPACK_IMPORTED_MODULE_3__.FooterComponent,
        _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__.NavbarComponent,
        _vertical_menu_vertical_menu_component__WEBPACK_IMPORTED_MODULE_6__.VerticalMenuComponent,
        _horizontal_menu_horizontal_menu_component__WEBPACK_IMPORTED_MODULE_5__.HorizontalMenuComponent,
        _customizer_customizer_component__WEBPACK_IMPORTED_MODULE_7__.CustomizerComponent,
        _notification_sidebar_notification_sidebar_component__WEBPACK_IMPORTED_MODULE_8__.NotificationSidebarComponent,
        _directives_toggle_fullscreen_directive__WEBPACK_IMPORTED_MODULE_9__.ToggleFullscreenDirective,
        _directives_sidebar_directive__WEBPACK_IMPORTED_MODULE_13__.SidebarDirective,
        _directives_topmenu_directive__WEBPACK_IMPORTED_MODULE_14__.TopMenuDirective,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_23__.NgbModule,
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__.TranslateModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_29__.MatMenuModule,
        _angular_app_shared_pipes_pipe_module__WEBPACK_IMPORTED_MODULE_2__.PipeModule] }); })();


/***/ }),

/***/ 14958:
/*!*************************************************************************!*\
  !*** ./angular/app/shared/vertical-menu/vertical-menu-routes.config.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ROUTES": function() { return /* binding */ ROUTES; }
/* harmony export */ });
//Sidebar menu Routes and data
const ROUTES = [
    {
        path: "/page",
        title: "Page",
        icon: "ft-home",
        class: "",
        badge: "",
        badgeClass: "",
        isExternalLink: false,
        submenu: [],
    },
    {
        path: "",
        title: "Menu Levels",
        icon: "ft-align-left",
        class: "has-sub",
        badge: "3",
        badgeClass: "badge badge-pill badge-danger float-right mr-1 mt-1",
        isExternalLink: false,
        submenu: [
            {
                path: "/YOUR-ROUTE-PATH",
                title: "Second Level",
                icon: "ft-arrow-right submenu-icon",
                class: "",
                badge: "",
                badgeClass: "",
                isExternalLink: false,
                submenu: [],
            },
            {
                path: "",
                title: "Second Level Child",
                icon: "ft-arrow-right submenu-icon",
                class: "has-sub",
                badge: "",
                badgeClass: "",
                isExternalLink: false,
                submenu: [
                    {
                        path: "/YOUR-ROUTE-PATH",
                        title: "Third Level 1.1",
                        icon: "ft-arrow-right submenu-icon",
                        class: "",
                        badge: "",
                        badgeClass: "",
                        isExternalLink: false,
                        submenu: [],
                    },
                    {
                        path: "/YOUR-ROUTE-PATH",
                        title: "Third Level 1.2",
                        icon: "ft-arrow-right submenu-icon",
                        class: "",
                        badge: "",
                        badgeClass: "",
                        isExternalLink: false,
                        submenu: [],
                    },
                ],
            },
        ],
    },
];


/***/ }),

/***/ 70644:
/*!*********************************************************************!*\
  !*** ./angular/app/shared/vertical-menu/vertical-menu.component.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VerticalMenuComponent": function() { return /* binding */ VerticalMenuComponent; }
/* harmony export */ });
/* harmony import */ var _vertical_menu_routes_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vertical-menu-routes.config */ 14958);
/* harmony import */ var _horizontal_menu_navigation_routes_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../horizontal-menu/navigation-routes.config */ 83155);
/* harmony import */ var _animations_custom_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animations/custom-animations */ 56681);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 3984);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 75629);
/* harmony import */ var _services_layout_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/layout.service */ 60432);
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/config.service */ 47107);
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-device-detector */ 30730);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-perfect-scrollbar */ 99904);
/* harmony import */ var _directives_sidebar_dropdown_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../directives/sidebar-dropdown.directive */ 77663);
/* harmony import */ var _directives_sidebar_link_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../directives/sidebar-link.directive */ 92489);
/* harmony import */ var _directives_sidebar_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../directives/sidebar-anchor-toggle.directive */ 60252);














const _c0 = ["toggleIcon"];
const _c1 = function () { return ["/page"]; };
const _c2 = function (a0, a1) { return { "ft-toggle-left": a0, "ft-toggle-right": a1 }; };
function VerticalMenuComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "img", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "APEX");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function VerticalMenuComponent_div_0_Template_a_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r3.toggleSidebar(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "i", 12, 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "a", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function VerticalMenuComponent_div_0_Template_a_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r4); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r5.CloseSidebar(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](11, "i", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](3, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("src", ctx_r0.logoUrl, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction2"](4, _c2, ctx_r0.config.layout.sidebar.collapsed, !ctx_r0.config.layout.sidebar.collapsed));
} }
const _c3 = function (a0) { return [a0]; };
function VerticalMenuComponent_li_4_a_1_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuItem_r6.badgeClass));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuItem_r6.badge);
} }
function VerticalMenuComponent_li_4_a_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_a_1_span_5_Template, 2, 4, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](5, _c3, menuItem_r6.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 3, menuItem_r6.title));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuItem_r6.badge && menuItem_r6.badge != "");
} }
function VerticalMenuComponent_li_4_a_2_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuItem_r6.badgeClass));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuItem_r6.badge);
} }
function VerticalMenuComponent_li_4_a_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_a_2_span_5_Template, 2, 4, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("routerLink", menuItem_r6.path);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](6, _c3, menuItem_r6.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, menuItem_r6.title));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuItem_r6.badge && menuItem_r6.badge != "");
} }
function VerticalMenuComponent_li_4_a_3_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuItem_r6.badgeClass));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuItem_r6.badge);
} }
function VerticalMenuComponent_li_4_a_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_a_3_span_5_Template, 2, 4, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("href", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](6, _c3, menuItem_r6.path), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](8, _c3, menuItem_r6.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, menuItem_r6.title));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuItem_r6.badge && menuItem_r6.badge != "");
} }
function VerticalMenuComponent_li_4_ul_4_li_1_a_1_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuSubItem_r21.badgeClass));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuSubItem_r21.badge);
} }
function VerticalMenuComponent_li_4_ul_4_li_1_a_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_ul_4_li_1_a_1_span_5_Template, 2, 4, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](5, _c3, menuSubItem_r21.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 3, menuSubItem_r21.title));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubItem_r21.badge && menuSubItem_r21.badge != "");
} }
function VerticalMenuComponent_li_4_ul_4_li_1_a_2_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuSubItem_r21.badgeClass));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuSubItem_r21.badge);
} }
function VerticalMenuComponent_li_4_ul_4_li_1_a_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_ul_4_li_1_a_2_span_5_Template, 2, 4, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("routerLink", menuSubItem_r21.path);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](6, _c3, menuSubItem_r21.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, menuSubItem_r21.title));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubItem_r21.badge && menuSubItem_r21.badge != "");
} }
function VerticalMenuComponent_li_4_ul_4_li_1_a_3_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuSubItem_r21.badgeClass));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuSubItem_r21.badge);
} }
function VerticalMenuComponent_li_4_ul_4_li_1_a_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_ul_4_li_1_a_3_span_5_Template, 2, 4, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("routerLink", menuSubItem_r21.path);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](6, _c3, menuSubItem_r21.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, menuSubItem_r21.title));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubItem_r21.badge && menuSubItem_r21.badge != "");
} }
function VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_a_1_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubsubItem_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuSubsubItem_r36.badgeClass));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuSubsubItem_r36.badge);
} }
function VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_a_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_a_1_span_5_Template, 2, 4, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubsubItem_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("routerLink", menuSubsubItem_r36.path);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](6, _c3, menuSubsubItem_r36.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, menuSubsubItem_r36.title));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubsubItem_r36.badge && menuSubsubItem_r36.badge != "");
} }
function VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_ng_template_2_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubsubItem_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuSubsubItem_r36.badgeClass));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuSubsubItem_r36.badge);
} }
function VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_ng_template_2_span_5_Template, 2, 4, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubsubItem_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("routerLink", menuSubsubItem_r36.path);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](6, _c3, menuSubsubItem_r36.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, menuSubsubItem_r36.title));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubsubItem_r36.badge && menuSubsubItem_r36.badge != "");
} }
const _c4 = function () { return { exact: true }; };
function VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "li", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_a_1_Template, 6, 8, "a", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_ng_template_2_Template, 6, 8, "ng-template", null, 35, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubsubItem_r36 = ctx.$implicit;
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](3);
    const menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4).$implicit;
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("level", ctx_r35.level + 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("parent", menuItem_r6.title)("hasSub", false)("path", menuSubsubItem_r36.path)("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](8, _c4))("ngClass", ctx_r35.config.layout.menuPosition === "Side" ? menuSubsubItem_r36.class : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !menuSubsubItem_r36.isExternalLink)("ngIfElse", _r38);
} }
function VerticalMenuComponent_li_4_ul_4_li_1_ul_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ul", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_Template, 4, 9, "li", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", menuSubItem_r21.submenu);
} }
const _c5 = function (a0) { return { "has-sub": a0 }; };
function VerticalMenuComponent_li_4_ul_4_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "li", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, VerticalMenuComponent_li_4_ul_4_li_1_a_1_Template, 6, 7, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, VerticalMenuComponent_li_4_ul_4_li_1_a_2_Template, 6, 8, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, VerticalMenuComponent_li_4_ul_4_li_1_a_3_Template, 6, 8, "a", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, VerticalMenuComponent_li_4_ul_4_li_1_ul_4_Template, 2, 1, "ul", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuSubItem_r21 = ctx.$implicit;
    const menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("level", ctx_r20.level + 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("parent", menuItem_r6.title)("hasSub", menuSubItem_r21.class.includes("has-sub") ? true : false)("path", menuSubItem_r21.path)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](10, _c5, menuSubItem_r21.class.includes("has-sub") ? true : false))("routerLinkActive", menuSubItem_r21.submenu.length != 0 ? "open" : "active");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubItem_r21.submenu.length > 0 && !menuSubItem_r21.isExternalLink);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubItem_r21.submenu.length === 0 && !menuSubItem_r21.isExternalLink);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubItem_r21.isExternalLink);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubItem_r21.submenu.length > 0);
} }
function VerticalMenuComponent_li_4_ul_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ul", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, VerticalMenuComponent_li_4_ul_4_li_1_Template, 5, 12, "li", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", menuItem_r6.submenu);
} }
const _c6 = function () { return { exact: false }; };
function VerticalMenuComponent_li_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "li", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, VerticalMenuComponent_li_4_a_1_Template, 6, 7, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, VerticalMenuComponent_li_4_a_2_Template, 6, 8, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, VerticalMenuComponent_li_4_a_3_Template, 6, 10, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, VerticalMenuComponent_li_4_ul_4_Template, 2, 1, "ul", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menuItem_r6 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("level", ctx_r1.level + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("parent", menuItem_r6.title)("path", menuItem_r6.path)("hasSub", menuItem_r6.class.includes("has-sub") ? true : false)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](11, _c5, menuItem_r6.class.includes("has-sub") ? true : false))("routerLinkActive", menuItem_r6.submenu.length != 0 ? "open" : "active")("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](13, _c6));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuItem_r6.submenu.length > 0 && !menuItem_r6.isExternalLink);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuItem_r6.submenu.length === 0 && !menuItem_r6.isExternalLink);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuItem_r6.isExternalLink);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuItem_r6.submenu.length > 0);
} }
class VerticalMenuComponent {
    constructor(router, translate, layoutService, configService, cdr, deviceService) {
        this.router = router;
        this.translate = translate;
        this.layoutService = layoutService;
        this.configService = configService;
        this.cdr = cdr;
        this.deviceService = deviceService;
        this.level = 0;
        this.logoUrl = "assets/img/logo.png";
        this.config = {};
        this.perfectScrollbarEnable = true;
        this.collapseSidebar = false;
        this.fireRefreshEventOnWindow = function () {
            const evt = document.createEvent("HTMLEvents");
            evt.initEvent("resize", true, false);
            window.dispatchEvent(evt);
        };
        this.config = this.configService.templateConf;
        this.innerWidth = window.innerWidth;
        this.isTouchDevice();
    }
    ngOnInit() {
        this.menuItems = _vertical_menu_routes_config__WEBPACK_IMPORTED_MODULE_0__.ROUTES;
    }
    ngAfterViewInit() {
        this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
            if (templateConf) {
                this.config = templateConf;
            }
            this.loadLayout();
            this.cdr.markForCheck();
        });
        this.layoutSub = this.layoutService.overlaySidebarToggle$.subscribe((collapse) => {
            if (this.config.layout.menuPosition === "Side") {
                this.collapseSidebar = collapse;
            }
        });
    }
    onWindowResize(event) {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout((() => {
            this.innerWidth = event.target.innerWidth;
            this.loadLayout();
        }).bind(this), 500);
    }
    loadLayout() {
        if (this.config.layout.menuPosition === "Top") {
            // Horizontal Menu
            if (this.innerWidth < 1200) {
                // Screen size < 1200
                this.menuItems = _horizontal_menu_navigation_routes_config__WEBPACK_IMPORTED_MODULE_1__.HROUTES;
            }
        }
        else if (this.config.layout.menuPosition === "Side") {
            // Vertical Menu{
            this.menuItems = _vertical_menu_routes_config__WEBPACK_IMPORTED_MODULE_0__.ROUTES;
        }
        if (this.config.layout.sidebar.backgroundColor === "white") {
            this.logoUrl = "assets/img/logo-dark.png";
        }
        else {
            this.logoUrl = "assets/img/logo.png";
        }
        if (this.config.layout.sidebar.collapsed) {
            this.collapseSidebar = true;
        }
        else {
            this.collapseSidebar = false;
        }
    }
    toggleSidebar() {
        let conf = this.config;
        conf.layout.sidebar.collapsed = !this.config.layout.sidebar.collapsed;
        this.configService.applyTemplateConfigChange({ layout: conf.layout });
        setTimeout(() => {
            this.fireRefreshEventOnWindow();
        }, 300);
    }
    CloseSidebar() {
        this.layoutService.toggleSidebarSmallScreen(false);
    }
    isTouchDevice() {
        const isMobile = this.deviceService.isMobile();
        const isTablet = this.deviceService.isTablet();
        if (isMobile || isTablet) {
            this.perfectScrollbarEnable = false;
        }
        else {
            this.perfectScrollbarEnable = true;
        }
    }
    ngOnDestroy() {
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
        if (this.configSub) {
            this.configSub.unsubscribe();
        }
    }
}
VerticalMenuComponent.ɵfac = function VerticalMenuComponent_Factory(t) { return new (t || VerticalMenuComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_layout_service__WEBPACK_IMPORTED_MODULE_3__.LayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_4__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](ngx_device_detector__WEBPACK_IMPORTED_MODULE_11__.DeviceDetectorService)); };
VerticalMenuComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: VerticalMenuComponent, selectors: [["app-sidebar"]], viewQuery: function VerticalMenuComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.toggleIcon = _t.first);
    } }, hostBindings: function VerticalMenuComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("resize", function VerticalMenuComponent_resize_HostBindingHandler($event) { return ctx.onWindowResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"]);
    } }, decls: 5, vars: 3, consts: [["class", "sidebar-header", 4, "ngIf"], [1, "sidebar-content", "main-menu-content", 3, "perfectScrollbar", "disabled"], [1, "nav-container"], ["appSidebarDropdown", "", 1, "navigation"], ["appSidebarlink", "", 3, "parent", "path", "level", "hasSub", "ngClass", "routerLinkActive", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], [1, "sidebar-header"], [1, "logo", "clearfix"], [1, "logo-text", "float-left", 3, "routerLink"], [1, "logo-img"], ["alt", "Apex logo", 3, "src"], [1, "text", "align-middle"], ["id", "sidebarToggle", "href", "javascript:;", 1, "nav-toggle", "d-none", "d-lg-none", "d-xl-block", 3, "click"], [1, "toggle-icon", 3, "ngClass"], ["toggleIcon", ""], ["id", "sidebarClose", "href", "javascript:;", 1, "nav-close", "d-block", "d-lg-block", "d-xl-none", 3, "click"], [1, "ft-x"], ["appSidebarlink", "", 3, "parent", "path", "level", "hasSub", "ngClass", "routerLinkActive", "routerLinkActiveOptions"], ["appSidebarAnchorToggle", "", 4, "ngIf"], ["appSidebarAnchorToggle", "", 3, "routerLink", 4, "ngIf"], ["target", "_blank", 3, "href", 4, "ngIf"], ["appSidebarDropdown", "", "class", "menu-content", 4, "ngIf"], ["appSidebarAnchorToggle", ""], [3, "ngClass"], [1, "menu-title"], [3, "ngClass", 4, "ngIf"], ["appSidebarAnchorToggle", "", 3, "routerLink"], ["target", "_blank", 3, "href"], ["appSidebarDropdown", "", 1, "menu-content"], ["appSidebarlink", "", 3, "parent", "hasSub", "path", "level", "ngClass", "routerLinkActive", 4, "ngFor", "ngForOf"], ["appSidebarlink", "", 3, "parent", "hasSub", "path", "level", "ngClass", "routerLinkActive"], ["target", "_blank", 3, "routerLink", 4, "ngIf"], ["target", "_blank", 3, "routerLink"], ["appSidebarlink", "", "routerLinkActive", "active", 3, "parent", "hasSub", "path", "level", "routerLinkActiveOptions", "ngClass", 4, "ngFor", "ngForOf"], ["appSidebarlink", "", "routerLinkActive", "active", 3, "parent", "hasSub", "path", "level", "routerLinkActiveOptions", "ngClass"], ["appSidebarAnchorToggle", "", 3, "routerLink", 4, "ngIf", "ngIfElse"], ["externalSubSubLinkBlock", ""]], template: function VerticalMenuComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, VerticalMenuComponent_div_0_Template, 12, 7, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ul", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, VerticalMenuComponent_li_4_Template, 5, 14, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (ctx.config == null ? null : ctx.config.layout.menuPosition) === "Side");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx.perfectScrollbarEnable);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx.menuItems);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_13__.PerfectScrollbarDirective, _directives_sidebar_dropdown_directive__WEBPACK_IMPORTED_MODULE_5__.SidebarDropdownDirective, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLinkWithHref, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgClass, _directives_sidebar_link_directive__WEBPACK_IMPORTED_MODULE_6__.SidebarLinkDirective, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLinkActive, _directives_sidebar_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_7__.SidebarAnchorToggleDirective], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe], encapsulation: 2, data: { animation: _animations_custom_animations__WEBPACK_IMPORTED_MODULE_2__.customAnimations } });


/***/ }),

/***/ 34139:
/*!*********************************************!*\
  !*** ./angular/environments/environment.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": function() { return /* binding */ environment; }
/* harmony export */ });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const environment = {
    production: false
};


/***/ }),

/***/ 9022:
/*!*************************!*\
  !*** ./angular/main.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 91211);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 42573);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 34139);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendor"], function() { return __webpack_exec__(9022); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main-esnext.js.map