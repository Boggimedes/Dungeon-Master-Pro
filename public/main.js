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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 3984);
/* harmony import */ var _layouts_full_full_layout_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layouts/full/full-layout.component */ 20348);
/* harmony import */ var _layouts_content_content_layout_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layouts/content/content-layout.component */ 11391);
/* harmony import */ var _shared_routes_full_layout_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/routes/full-layout.routes */ 45400);
/* harmony import */ var _shared_routes_content_layout_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/routes/content-layout.routes */ 95180);
/* harmony import */ var _shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/auth/auth-guard.service */ 16929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 74788);








var appRoutes = [
    {
        path: '',
        redirectTo: 'pages/login',
        pathMatch: 'full',
    },
    { path: '', component: _layouts_full_full_layout_component__WEBPACK_IMPORTED_MODULE_0__.FullLayoutComponent, data: { title: 'full Views' }, children: _shared_routes_full_layout_routes__WEBPACK_IMPORTED_MODULE_2__.Full_ROUTES, canActivate: [_shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__.AuthGuard] },
    { path: '', component: _layouts_content_content_layout_component__WEBPACK_IMPORTED_MODULE_1__.ContentLayoutComponent, data: { title: 'content Views' }, children: _shared_routes_content_layout_routes__WEBPACK_IMPORTED_MODULE_3__.CONTENT_ROUTES },
    {
        path: '**',
        redirectTo: 'pages/error'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
    AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
    AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forRoot(appRoutes, { preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_6__.PreloadAllModules, relativeLinkResolution: 'legacy' })], _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule] });
    return AppRoutingModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule] }); })();


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




var AppComponent = /** @class */ (function () {
    function AppComponent(router) {
        this.router = router;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.subscription = this.router.events
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.filter)(function (event) { return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__.NavigationEnd; }))
            .subscribe(function () { return window.scrollTo(0, 0); });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router)); };
    AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "router-outlet");
        } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet], encapsulation: 2 });
    return AppComponent;
}());



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
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ 27094);
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/fire */ 77667);
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/fire/auth */ 2552);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 96797);
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @agm/core */ 66047);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ 58497);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-translate/core */ 75629);
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/http-loader */ 93555);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-spinner */ 79866);
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-perfect-scrollbar */ 5052);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 13190);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/shared.module */ 8421);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ 37355);
/* harmony import */ var _layouts_content_content_layout_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layouts/content/content-layout.component */ 11391);
/* harmony import */ var _layouts_full_full_layout_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layouts/full/full-layout.component */ 20348);
/* harmony import */ var _shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/auth/auth.service */ 6008);
/* harmony import */ var _shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/auth/auth-guard.service */ 16929);
/* harmony import */ var _shared_services_window_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared/services/window.service */ 28370);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 74788);






















var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID" //YOUR_MEASUREMENT_ID
};
var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true,
    wheelPropagation: false
};
function createTranslateLoader(http) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_8__.TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
    AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent] });
    AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({ providers: [
            _shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_5__.AuthService,
            _shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_6__.AuthGuard,
            { provide: ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_10__.PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
            _shared_services_window_service__WEBPACK_IMPORTED_MODULE_7__.WINDOW_PROVIDERS
        ], imports: [[
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule,
                _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
                _angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClientModule,
                _angular_fire__WEBPACK_IMPORTED_MODULE_13__.AngularFireModule.initializeApp(firebaseConfig),
                _angular_fire_auth__WEBPACK_IMPORTED_MODULE_14__.AngularFireAuthModule,
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbModule,
                ngx_spinner__WEBPACK_IMPORTED_MODULE_16__.NgxSpinnerModule,
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslateModule.forRoot({
                    loader: {
                        provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslateLoader,
                        useFactory: createTranslateLoader,
                        deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClient]
                    }
                }),
                _agm_core__WEBPACK_IMPORTED_MODULE_18__.AgmCoreModule.forRoot({
                    apiKey: "YOUR_GOOGLE_MAP_API_KEY"
                }),
                ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_10__.PerfectScrollbarModule
            ]] });
    return AppModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent, _layouts_full_full_layout_component__WEBPACK_IMPORTED_MODULE_4__.FullLayoutComponent, _layouts_content_content_layout_component__WEBPACK_IMPORTED_MODULE_3__.ContentLayoutComponent], imports: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClientModule, _angular_fire__WEBPACK_IMPORTED_MODULE_13__.AngularFireModule, _angular_fire_auth__WEBPACK_IMPORTED_MODULE_14__.AngularFireAuthModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbModule,
        ngx_spinner__WEBPACK_IMPORTED_MODULE_16__.NgxSpinnerModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslateModule, _agm_core__WEBPACK_IMPORTED_MODULE_18__.AgmCoreModule, ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_10__.PerfectScrollbarModule] }); })();


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





var _c0 = ["content-wrapper"];
var ContentLayoutComponent = /** @class */ (function () {
    function ContentLayoutComponent(configService, document, renderer, cdr, customizerService) {
        this.configService = configService;
        this.document = document;
        this.renderer = renderer;
        this.cdr = cdr;
        this.customizerService = customizerService;
        this.config = {};
        this.config = this.configService.templateConf;
        this.renderer.addClass(this.document.body, "auth-page");
    }
    ContentLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layoutSub = this.configService.templateConf$.subscribe(function (templateConf) {
            if (templateConf) {
                _this.config = templateConf;
            }
            _this.loadLayout();
            _this.cdr.markForCheck();
        });
    };
    ContentLayoutComponent.prototype.loadLayout = function () {
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
    };
    ContentLayoutComponent.prototype.removeTransparentBGClasses = function () {
        var _this = this;
        this.customizerService.transparent_colors.forEach(function (_) {
            _this.renderer.removeClass(_this.document.body, _.class);
        });
        this.customizerService.transparent_colors_with_shade.forEach(function (_) {
            _this.renderer.removeClass(_this.document.body, _.class);
        });
    };
    ContentLayoutComponent.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(this.document.body, "auth-page");
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
    };
    ContentLayoutComponent.ɵfac = function ContentLayoutComponent_Factory(t) { return new (t || ContentLayoutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_app_shared_services_config_service__WEBPACK_IMPORTED_MODULE_0__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_app_shared_services_customizer_service__WEBPACK_IMPORTED_MODULE_1__.CustomizerService)); };
    ContentLayoutComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ContentLayoutComponent, selectors: [["app-content-layout"]], viewQuery: function ContentLayoutComponent_Query(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
        } if (rf & 2) {
            var _t = void 0;
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
    return ContentLayoutComponent;
}());



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
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var _angular_app_shared_services_window_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../angular/app/shared/services/window.service */ 28370);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 3984);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 45435);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_app_shared_services_config_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../angular/app/shared/services/config.service */ 47107);
/* harmony import */ var _angular_app_shared_services_layout_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../angular/app/shared/services/layout.service */ 60432);
/* harmony import */ var _angular_app_shared_services_customizer_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../angular/app/shared/services/customizer.service */ 90775);
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-device-detector */ 30730);
/* harmony import */ var _shared_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/navbar/navbar.component */ 96319);
/* harmony import */ var _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/footer/footer.component */ 26590);
/* harmony import */ var _shared_notification_sidebar_notification_sidebar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/notification-sidebar/notification-sidebar.component */ 9856);
/* harmony import */ var _shared_horizontal_menu_horizontal_menu_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/horizontal-menu/horizontal-menu.component */ 83686);
/* harmony import */ var _shared_directives_topmenu_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/directives/topmenu.directive */ 45197);
/* harmony import */ var _shared_directives_sidebar_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/directives/sidebar.directive */ 17618);
/* harmony import */ var _shared_vertical_menu_vertical_menu_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/vertical-menu/vertical-menu.component */ 70644);


















function FullLayoutComponent_app_horizontal_menu_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "app-horizontal-menu", 11);
} }
var _c0 = function (a0) { return { "background-image": a0 }; };
function FullLayoutComponent_div_3_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "div", 14);
} if (rf & 2) {
    var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](1, _c0, "url(" + ctx_r3.bgImage + ")"));
} }
var _c1 = function (a0, a1, a2) { return { "main-menu": a0, "menu-fixed": a1, "menu-native-scroll": a2 }; };
function FullLayoutComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("mouseenter", function FullLayoutComponent_div_3_Template_div_mouseenter_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r5); var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r4.sidebarMouseenter($event); })("mouseleave", function FullLayoutComponent_div_3_Template_div_mouseleave_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r5); var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r6.sidebarMouseleave($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "app-sidebar");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, FullLayoutComponent_div_3_div_2_Template, 1, 3, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction3"](4, _c1, ctx_r1.menuPosition === "Side" || ctx_r1.displayOverlayMenu, ctx_r1.menuPosition === "Side" || ctx_r1.displayOverlayMenu, !ctx_r1.perfectScrollbarEnable));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("data-background-color", (ctx_r1.config == null ? null : ctx_r1.config.layout.variant) === "Transparent" ? "black" : ctx_r1.bgColor)("data-image", ctx_r1.bgImage);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.config == null ? null : ctx_r1.config.layout.sidebar.backgroundImage);
} }
function FullLayoutComponent_button_10_Template(rf, ctx) { if (rf & 1) {
    var _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function FullLayoutComponent_button_10_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r8); var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r7.scrollToTop(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "i", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
var _c2 = function (a0) { return { "show-overlay": a0 }; };
var _c3 = function (a0, a1) { return { "d-none": a0, "d-block": a1 }; };
var FullLayoutComponent = /** @class */ (function () {
    function FullLayoutComponent(configService, layoutService, router, customizerService, document, window, renderer, cdr, deviceService) {
        var _this = this;
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
        this.menuPosition = 'Side';
        this.displayOverlayMenu = false; // Vertical Side menu for screenSize < 1200
        this.config = {};
        this.isMenuCollapsedOnHover = false;
        this.isNavbarSeachTextEmpty = true;
        this.isScrollTopVisible = false;
        this.config = this.configService.templateConf;
        this.innerWidth = window.innerWidth;
        // On toggle sidebar menu
        this.layoutSub = layoutService.toggleSidebar$.subscribe(function (isShow) {
            _this.hideSidebar = !isShow;
            if (_this.hideSidebar) {
                _this.overlayContent = false;
            }
            else {
                _this.overlayContent = true;
            }
            _this.toggleSidebar();
        });
    }
    FullLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.configSub = this.configService.templateConf$.subscribe(function (templateConf) {
            if (templateConf) {
                _this.config = templateConf;
            }
            //load layout
            _this.loadLayout();
            _this.cdr.markForCheck();
        });
        //hide overlay class on router change
        this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.filter)(function (event) { return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_13__.NavigationEnd; })).subscribe(function (routeChange) {
            if (_this.config.layout.menuPosition === "Side" || _this.displayOverlayMenu) { // Vertical Menu
                if (_this.innerWidth < 1200) {
                    _this.layoutService.toggleSidebarSmallScreen(false);
                    _this.overlayContent = false;
                    _this.renderer.removeClass(_this.document.body, "overflow-hidden");
                }
            }
        });
    };
    FullLayoutComponent.prototype.ngAfterViewInit = function () {
        this.setMenuLayout();
    };
    FullLayoutComponent.prototype.ngOnDestroy = function () {
        //Unsubcribe subscriptions
        if (this.configSub) {
            this.configSub.unsubscribe();
        }
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
    };
    //adjust layout
    FullLayoutComponent.prototype.setMenuLayout = function () {
        this.overlayContent = false;
        this.renderer.removeClass(this.document.body, "blank-page");
        if (this.config.layout.menuPosition === "Top") { // Horizontal Menu
            if (this.innerWidth < 1200) { // Screen size < 1200
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
            else { // Screen size > 1200
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
        else if (this.config.layout.menuPosition === "Side") { // Vertical Menu
            if (this.innerWidth < 1200) { // If Screen size < 1200
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
            else { // If Screen size > 1200
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
    };
    FullLayoutComponent.prototype.loadLayout = function () {
        //menu position "SIDE" or "TOP"
        if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != "") {
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
        if (this.config.layout.sidebar.size === 'sidebar-sm') {
            this.renderer.removeClass(this.document.body, "sidebar-lg");
            this.renderer.addClass(this.document.body, "sidebar-sm");
        }
        else if (this.config.layout.sidebar.size === 'sidebar-lg') {
            this.renderer.removeClass(this.document.body, "sidebar-sm");
            this.renderer.addClass(this.document.body, "sidebar-lg");
        }
        else {
            this.renderer.removeClass(this.document.body, "sidebar-sm");
            this.renderer.removeClass(this.document.body, "sidebar-lg");
        }
        if (this.config.layout.menuPosition === "Side") {
            // vertical/Side menu expanded/collapse
            if (this.config.layout.sidebar.collapsed && !this.isSmallScreen) { // collapse side menu
                this.renderer.removeClass(this.document.body, "menu-expanded");
                this.renderer.addClass(this.document.body, "nav-collapsed");
            }
            else { // expand side menu
                this.renderer.removeClass(this.document.body, "nav-collapsed");
                this.renderer.addClass(this.document.body, "menu-expanded");
            }
        }
        //Navbar types
        if (this.config.layout.navbar.type === 'Static') {
            this.renderer.removeClass(this.document.body, "navbar-sticky");
            this.renderer.addClass(this.document.body, "navbar-static");
        }
        else if (this.config.layout.navbar.type === 'Fixed') {
            this.renderer.removeClass(this.document.body, "navbar-static");
            this.renderer.addClass(this.document.body, "navbar-sticky");
        }
    };
    FullLayoutComponent.prototype.toggleSidebar = function () {
        if (this.hideSidebar) { // on sidebar collapse
            this.renderer.removeClass(this.document.body, "menu-expanded");
            this.renderer.removeClass(this.document.body, "vertical-menu");
            this.renderer.removeClass(this.document.body, "menu-open");
            this.renderer.addClass(this.document.body, "vertical-layout");
            this.renderer.addClass(this.document.body, "menu-hide");
            if (this.config.layout.menuPosition === "Top") {
                this.renderer.addClass(this.document.body, "vertical-overlay-menu");
            }
        }
        else { // on sidebar expand
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
    };
    FullLayoutComponent.prototype.isTouchDevice = function () {
        var isMobile = this.deviceService.isMobile();
        var isTablet = this.deviceService.isTablet();
        if (isMobile || isTablet) {
            if (!this.hideSidebar) {
                this.renderer.addClass(this.document.body, "overflow-hidden");
            }
            else {
                this.renderer.removeClass(this.document.body, "overflow-hidden");
            }
        }
    };
    FullLayoutComponent.prototype.hideCompactMenuOnSmallScreen = function () {
        if (this.innerWidth < 1200) {
            var conf = this.config;
            conf.layout.sidebar.collapsed = false;
            this.configService.applyTemplateConfigChange({ layout: conf.layout });
        }
    };
    //Remove transparent layout classes
    FullLayoutComponent.prototype.removeTransparentBGClasses = function () {
        var _this = this;
        this.customizerService.transparent_colors.forEach(function (_) {
            _this.renderer.removeClass(_this.document.body, _.class);
        });
        this.customizerService.transparent_colors_with_shade.forEach(function (_) {
            _this.renderer.removeClass(_this.document.body, _.class);
        });
    };
    FullLayoutComponent.prototype.sidebarMouseenter = function (e) {
        if (this.config.layout.sidebar.collapsed) {
            this.isMenuCollapsedOnHover = false;
            this.layoutService.overlaySidebartoggle(this.isMenuCollapsedOnHover);
        }
    };
    FullLayoutComponent.prototype.sidebarMouseleave = function (e) {
        if (this.config.layout.sidebar.collapsed) {
            this.isMenuCollapsedOnHover = true;
            this.layoutService.overlaySidebartoggle(this.isMenuCollapsedOnHover);
        }
    };
    //scroll to top on click
    FullLayoutComponent.prototype.scrollToTop = function () {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };
    FullLayoutComponent.prototype.onOutsideClick = function (e) {
        if (this.innerWidth < 1200) {
            if (!e.target.classList.contains("toggleSidebarNavbarButton")) {
                this.layoutService.toggleSidebarSmallScreen(false);
            }
        }
    };
    FullLayoutComponent.prototype.onWrapperClick = function () {
        this.isNavbarSeachTextEmpty = true;
    };
    FullLayoutComponent.prototype.checkNavbarSeachTextEmpty = function ($event) {
        this.isNavbarSeachTextEmpty = $event;
    };
    FullLayoutComponent.prototype.onResize = function (event) {
        var _this = this;
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout((function () {
            _this.innerWidth = event.target.innerWidth;
            _this.setMenuLayout();
            _this.hideCompactMenuOnSmallScreen();
        }).bind(this), 500);
    };
    //Add/remove classes on page scroll
    FullLayoutComponent.prototype.onWindowScroll = function () {
        var number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
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
    };
    FullLayoutComponent.ɵfac = function FullLayoutComponent_Factory(t) { return new (t || FullLayoutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_app_shared_services_config_service__WEBPACK_IMPORTED_MODULE_1__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_app_shared_services_layout_service__WEBPACK_IMPORTED_MODULE_2__.LayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_app_shared_services_customizer_service__WEBPACK_IMPORTED_MODULE_3__.CustomizerService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_14__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_app_shared_services_window_service__WEBPACK_IMPORTED_MODULE_0__.WINDOW), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](ngx_device_detector__WEBPACK_IMPORTED_MODULE_15__.DeviceDetectorService)); };
    FullLayoutComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({ type: FullLayoutComponent, selectors: [["app-full-layout"]], hostBindings: function FullLayoutComponent_HostBindings(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("resize", function FullLayoutComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresolveWindow"])("scroll", function FullLayoutComponent_scroll_HostBindingHandler() { return ctx.onWindowScroll(); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresolveWindow"]);
        } }, decls: 14, vars: 10, consts: [[3, "seachTextEmpty"], [1, "wrapper", 3, "ngClass", "click", "resize"], ["appTopMenu", "", 4, "ngIf"], ["appSidebar", "", "class", "app-sidebar", "data-active-color", "white", 3, "ngClass", "mouseenter", "mouseleave", 4, "ngIf"], [1, "main-panel"], [1, "main-content"], [1, "content-overlay"], [1, "content-wrapper"], ["class", "btn btn-primary scroll-top", "type", "button", 3, "click", 4, "ngIf"], [1, "sidenav-overlay", 3, "ngClass", "click"], [1, "drag-target"], ["appTopMenu", ""], ["appSidebar", "", "data-active-color", "white", 1, "app-sidebar", 3, "ngClass", "mouseenter", "mouseleave"], ["class", "sidebar-background", 3, "ngStyle", 4, "ngIf"], [1, "sidebar-background", 3, "ngStyle"], ["type", "button", 1, "btn", "btn-primary", "scroll-top", 3, "click"], [1, "ft-arrow-up"]], template: function FullLayoutComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "app-navbar", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("seachTextEmpty", function FullLayoutComponent_Template_app_navbar_seachTextEmpty_0_listener($event) { return ctx.checkNavbarSeachTextEmpty($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function FullLayoutComponent_Template_div_click_1_listener() { return ctx.onWrapperClick(); })("resize", function FullLayoutComponent_Template_div_resize_1_listener($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresolveWindow"]);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, FullLayoutComponent_app_horizontal_menu_2_Template, 1, 0, "app-horizontal-menu", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](3, FullLayoutComponent_div_3_Template, 3, 8, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](6, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](8, "router-outlet");
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](9, "app-footer");
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](10, FullLayoutComponent_button_10_Template, 2, 0, "button", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](11, "app-notification-sidebar");
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function FullLayoutComponent_Template_div_click_12_listener($event) { return ctx.onOutsideClick($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](13, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](5, _c2, !ctx.isNavbarSeachTextEmpty));
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.menuPosition === "Top" && !ctx.displayOverlayMenu);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.menuPosition === "Side" || ctx.displayOverlayMenu);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.isScrollTopVisible);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction2"](7, _c3, ctx.displayOverlayMenu && ctx.hideSidebar && !ctx.overlayContent, ctx.displayOverlayMenu && !ctx.hideSidebar && ctx.overlayContent && ctx.innerWidth < 1200));
        } }, directives: [_shared_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__.NavbarComponent, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterOutlet, _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_5__.FooterComponent, _shared_notification_sidebar_notification_sidebar_component__WEBPACK_IMPORTED_MODULE_6__.NotificationSidebarComponent, _shared_horizontal_menu_horizontal_menu_component__WEBPACK_IMPORTED_MODULE_7__.HorizontalMenuComponent, _shared_directives_topmenu_directive__WEBPACK_IMPORTED_MODULE_8__.TopMenuDirective, _shared_directives_sidebar_directive__WEBPACK_IMPORTED_MODULE_9__.SidebarDirective, _shared_vertical_menu_vertical_menu_component__WEBPACK_IMPORTED_MODULE_10__.VerticalMenuComponent, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgStyle], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmdWxsLWxheW91dC5jb21wb25lbnQuc2NzcyJ9 */"] });
    return FullLayoutComponent;
}());



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

var customAnimations = [
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



var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var isAuth = this.authService.isAuthenticated();
        if (!isAuth) {
            this.router.navigate(['/pages/login']);
        }
        else {
            return true;
        }
    };
    AuthGuard.ɵfac = function AuthGuard_Factory(t) { return new (t || AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router)); };
    AuthGuard.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AuthGuard, factory: AuthGuard.ɵfac });
    return AuthGuard;
}());



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/auth */ 2552);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 3984);



var AuthService = /** @class */ (function () {
    function AuthService(_firebaseAuth, router) {
        var _this = this;
        this._firebaseAuth = _firebaseAuth;
        this.router = router;
        this.userDetails = null;
        this.user = _firebaseAuth.authState;
        this.user.subscribe(function (user) {
            if (user) {
                _this.userDetails = user;
            }
            else {
                _this.userDetails = null;
            }
        });
    }
    AuthService.prototype.signupUser = function (email, password) {
        //your code for signing up the new user
    };
    AuthService.prototype.signinUser = function (email, password) {
        //your code for checking credentials and getting tokens for for signing in user
        // return this._firebaseAuth.signInWithEmailAndPassword(email, password)
        //uncomment above firebase auth code and remove this temp code
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(true);
            }, 1000);
        });
    };
    AuthService.prototype.logout = function () {
        this._firebaseAuth.signOut();
        this.router.navigate(['YOUR_LOGOUT_URL']);
    };
    AuthService.prototype.isAuthenticated = function () {
        return true;
    };
    AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_fire_auth__WEBPACK_IMPORTED_MODULE_1__.AngularFireAuth), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router)); };
    AuthService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac });
    return AuthService;
}());



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

var AutocompleteContentDirective = /** @class */ (function () {
    function AutocompleteContentDirective(tpl) {
        this.tpl = tpl;
    }
    AutocompleteContentDirective.ɵfac = function AutocompleteContentDirective_Factory(t) { return new (t || AutocompleteContentDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef)); };
    AutocompleteContentDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: AutocompleteContentDirective, selectors: [["", "appAutocompleteContent", ""]] });
    return AutocompleteContentDirective;
}());



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






var _c0 = ["root"];
function AutocompleteComponent_ng_template_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](0);
} }
function AutocompleteComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, AutocompleteComponent_ng_template_0_ng_container_1_Template, 1, 0, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.content ? ctx_r1.content.tpl : null);
} }
var AutocompleteComponent = /** @class */ (function () {
    function AutocompleteComponent() {
    }
    AutocompleteComponent.prototype.optionsClick = function () {
        return this.options.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(function (options) {
            var clicks$ = options.map(function (option) { return option.click$; });
            return rxjs__WEBPACK_IMPORTED_MODULE_4__.merge.apply(void 0, clicks$);
        }));
    };
    AutocompleteComponent.ɵfac = function AutocompleteComponent_Factory(t) { return new (t || AutocompleteComponent)(); };
    AutocompleteComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AutocompleteComponent, selectors: [["app-autocomplete"]], contentQueries: function AutocompleteComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵcontentQuery"](dirIndex, _autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_0__.AutocompleteContentDirective, 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵcontentQuery"](dirIndex, _option_option_component__WEBPACK_IMPORTED_MODULE_1__.OptionComponent, 4);
        } if (rf & 2) {
            var _t = void 0;
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.options = _t);
        } }, viewQuery: function AutocompleteComponent_Query(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
        } if (rf & 2) {
            var _t = void 0;
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.rootTemplate = _t.first);
        } }, exportAs: ["appAutocomplete"], decls: 2, vars: 0, consts: [["root", ""], [1, "autocomplete", "search-list"], [4, "ngTemplateOutlet"]], template: function AutocompleteComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, AutocompleteComponent_ng_template_0_Template, 2, 1, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgTemplateOutlet], styles: [".autocomplete[_ngcontent-%COMP%] {\n  width: 100%;\n  display: block;\n}\n\n.search-list[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background: #FFFFFF;\n  width: 100%;\n  margin-top: 1rem;\n  padding-left: 0;\n  border-radius: 0.267rem;\n  z-index: 1200;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dG9jb21wbGV0ZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsU0FBUztFQUNULE9BQU87RUFDUCxtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLGFBQWE7QUFDZiIsImZpbGUiOiJhdXRvY29tcGxldGUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hdXRvY29tcGxldGUge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5zZWFyY2gtbGlzdCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxMDAlO1xuICBsZWZ0OiAwO1xuICBiYWNrZ3JvdW5kOiAjRkZGRkZGO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgcGFkZGluZy1sZWZ0OiAwO1xuICBib3JkZXItcmFkaXVzOiAwLjI2N3JlbTtcbiAgei1pbmRleDogMTIwMDtcbn1cbiJdfQ== */"] });
    return AutocompleteComponent;
}());



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










var AutocompleteDirective = /** @class */ (function () {
    function AutocompleteDirective(host, ngControl, vcr, overlay, router) {
        this.host = host;
        this.ngControl = ngControl;
        this.vcr = vcr;
        this.overlay = overlay;
        this.router = router;
    }
    Object.defineProperty(AutocompleteDirective.prototype, "control", {
        get: function () {
            return this.ngControl.control;
        },
        enumerable: false,
        configurable: true
    });
    AutocompleteDirective.prototype.ngOnInit = function () {
        var _this = this;
        (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(this.origin, 'focus').pipe((0,ngx_take_until_destroy__WEBPACK_IMPORTED_MODULE_1__.untilDestroyed)(this)).subscribe(function () {
            _this.openDropdown();
            _this.appAutocomplete.optionsClick()
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(_this.overlayRef.detachments()))
                .subscribe(function (value) {
                _this.control.setValue(value);
                _this.close();
            });
        });
        this.router.events.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.filter)(function (event) { return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__.NavigationEnd; })).subscribe(function (routeChange) {
            _this.close();
        });
    };
    AutocompleteDirective.prototype.openDropdown = function () {
        var _this = this;
        this.close();
        this.overlayRef = this.overlay.create({
            width: this.origin.offsetWidth,
            maxHeight: 40 * 3,
            backdropClass: '',
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            positionStrategy: this.getOverlayPosition()
        });
        var template = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__.TemplatePortal(this.appAutocomplete.rootTemplate, this.vcr);
        this.overlayRef.attach(template);
        overlayClickOutside(this.overlayRef, this.origin).subscribe(function () { return _this.close(); });
    };
    AutocompleteDirective.prototype.ngOnDestroy = function () { };
    AutocompleteDirective.prototype.close = function () {
        if (this.overlayRef) {
            this.overlayRef.detach();
        }
        this.overlayRef = null;
    };
    AutocompleteDirective.prototype.getOverlayPosition = function () {
        var positions = [
            new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__.ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
            new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__.ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
        ];
        return this.overlay
            .position()
            .flexibleConnectedTo(this.origin)
            .withPositions(positions)
            .withFlexibleDimensions(false)
            .withPush(false);
    };
    Object.defineProperty(AutocompleteDirective.prototype, "origin", {
        get: function () {
            return this.host.nativeElement;
        },
        enumerable: false,
        configurable: true
    });
    AutocompleteDirective.ɵfac = function AutocompleteDirective_Factory(t) { return new (t || AutocompleteDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControl), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router)); };
    AutocompleteDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineDirective"]({ type: AutocompleteDirective, selectors: [["", "appAutocomplete", ""]], inputs: { appAutocomplete: "appAutocomplete" } });
    return AutocompleteDirective;
}());

function overlayClickOutside(overlayRef, origin) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(document, 'click')
        .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.filter)(function (event) {
        var clickTarget = event.target;
        var notOrigin = clickTarget !== origin; // the input
        var notOverlay = !!overlayRef && (overlayRef.overlayElement.contains(clickTarget) === false); // the autocomplete
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






var publicApi = [
    _autocomplete_component__WEBPACK_IMPORTED_MODULE_0__.AutocompleteComponent,
    _autocomplete_directive__WEBPACK_IMPORTED_MODULE_1__.AutocompleteDirective,
    _autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_2__.AutocompleteContentDirective,
    _option_option_component__WEBPACK_IMPORTED_MODULE_3__.OptionComponent
];
var AutocompleteModule = /** @class */ (function () {
    function AutocompleteModule() {
    }
    AutocompleteModule.ɵfac = function AutocompleteModule_Factory(t) { return new (t || AutocompleteModule)(); };
    AutocompleteModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AutocompleteModule });
    AutocompleteModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
                _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule
            ]] });
    return AutocompleteModule;
}());

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



var _c0 = ["*"];
var OptionComponent = /** @class */ (function () {
    function OptionComponent(host) {
        this.host = host;
    }
    OptionComponent.prototype.ngOnInit = function () {
        this.click$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(this.element, 'click').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.mapTo)(this.value));
    };
    Object.defineProperty(OptionComponent.prototype, "element", {
        get: function () {
            return this.host.nativeElement;
        },
        enumerable: false,
        configurable: true
    });
    OptionComponent.ɵfac = function OptionComponent_Factory(t) { return new (t || OptionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef)); };
    OptionComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: OptionComponent, selectors: [["app-option"]], inputs: { value: "value", url: "url" }, ngContentSelectors: _c0, decls: 2, vars: 0, consts: [[1, "option"]], template: function OptionComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        } }, styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.no-result[_nghost-%COMP%] {\n  pointer-events: none;\n}\n\n.option[_ngcontent-%COMP%] {\n  padding: 0.8rem 1rem;\n  cursor: pointer;\n  display: block;\n}\n\n[_nghost-%COMP%]:first-child   .option[_ngcontent-%COMP%] {\n  border-top-left-radius: 0.35rem;\n  border-top-right-radius: 0.35rem;\n}\n\n[_nghost-%COMP%]:last-child   .option[_ngcontent-%COMP%] {\n  border-bottom-left-radius: 0.35rem;\n  border-bottom-right-radius: 0.35rem;\n}\n\n.option[_ngcontent-%COMP%]:hover {\n  background-color: #F5F5F5;\n}\n\n.first-active-item[_nghost-%COMP%]   .option[_ngcontent-%COMP%] {\n  background-color: #F5F5F5;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9wdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxvQkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSwrQkFBQTtFQUNBLGdDQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQ0FBQTtFQUNBLG1DQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtBQUNGOztBQUdFO0VBQ0UseUJBQUE7QUFBSiIsImZpbGUiOiJvcHRpb24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbjpob3N0Lm5vLXJlc3VsdCB7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbn1cclxuXHJcbi5vcHRpb24ge1xyXG4gIHBhZGRpbmc6IDAuOHJlbSAxcmVtO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuOmhvc3Q6Zmlyc3QtY2hpbGQgLm9wdGlvbiB7XHJcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMC4zNXJlbTtcclxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMC4zNXJlbTtcclxufVxyXG5cclxuOmhvc3Q6bGFzdC1jaGlsZCAub3B0aW9uIHtcclxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwLjM1cmVtO1xyXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwLjM1cmVtO1xyXG59XHJcblxyXG4ub3B0aW9uOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjVGNUY1O1xyXG59XHJcblxyXG46aG9zdC5maXJzdC1hY3RpdmUtaXRlbSB7XHJcbiAgLm9wdGlvbiB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjVGNUY1O1xyXG4gIH1cclxufVxyXG4iXX0= */"], changeDetection: 0 });
    return OptionComponent;
}());



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
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-perfect-scrollbar */ 5052);






var _c0 = ["customizer"];
var _c1 = function (a0) { return { "selected": a0 }; };
function CustomizerComponent_div_68_Template(rf, ctx) { if (rf & 1) {
    var _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_div_68_Template_span_click_1_listener() { var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r9); var color_r7 = restoredCtx.$implicit; var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r8.customizerService.changeSidebarBGColor(color_r7); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    var color_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("", color_r7.class, " d-block rounded");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c1, color_r7.active));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-bg-color", color_r7.code);
} }
function CustomizerComponent_div_70_Template(rf, ctx) { if (rf & 1) {
    var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_div_70_Template_span_click_1_listener() { var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12); var color_r10 = restoredCtx.$implicit; var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r11.customizerService.changeSidebarBGColor(color_r10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    var color_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("", color_r10.class, " d-block rounded");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c1, color_r10.active));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-bg-color", color_r10.code);
} }
function CustomizerComponent_div_77_Template(rf, ctx) { if (rf & 1) {
    var _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_div_77_Template_div_click_1_listener() { var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r15); var color_r13 = restoredCtx.$implicit; var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r14.customizerService.changeSidebarTransparentBGColor(color_r13); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    var color_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("rounded ", color_r13.class, " ct-glass-bg");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c1, color_r13.active));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-bg-image", color_r13.class);
} }
function CustomizerComponent_div_85_Template(rf, ctx) { if (rf & 1) {
    var _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "img", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_div_85_Template_img_click_1_listener() { var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r18); var img_r16 = restoredCtx.$implicit; var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r17.customizerService.changeSidebarBgImage(img_r16); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    var img_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", img_r16.src, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"])("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](2, _c1, img_r16.active));
} }
function CustomizerComponent_div_93_Template(rf, ctx) { if (rf & 1) {
    var _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_div_93_Template_span_click_1_listener() { var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r21); var color_r19 = restoredCtx.$implicit; var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r20.customizerService.changeSidebarTransparentBGColor(color_r19); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    var color_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("", color_r19.class, " d-block rounded  ct-color-bg");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c1, color_r19.active));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-bg-color", color_r19.class);
} }
var _c2 = function (a0) { return { "active": a0 }; };
function CustomizerComponent_div_114_Template(rf, ctx) { if (rf & 1) {
    var _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Sidebar Width");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "label", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "input", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CustomizerComponent_div_114_Template_input_change_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r23); var ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r22.changeSidebarWidth("sidebar-sm"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Small");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "label", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "input", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CustomizerComponent_div_114_Template_input_change_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r23); var ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r24.changeSidebarWidth("sidebar-md"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Medium");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "label", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "input", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CustomizerComponent_div_114_Template_input_change_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r23); var ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r25.changeSidebarWidth("sidebar-lg"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Large");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
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
var _c3 = function (a0) { return { open: a0 }; };
var CustomizerComponent = /** @class */ (function () {
    function CustomizerComponent(renderer, configService, customizerService) {
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
    CustomizerComponent.prototype.ngOnInit = function () {
    };
    CustomizerComponent.prototype.changeSidebarWidth = function (value) {
        this.size = value;
        this.customizerService.changeSidebarWidth(value);
    };
    CustomizerComponent.prototype.toggleCustomizer = function () {
        if (this.isOpen) {
            this.renderer.removeClass(this.customizer.nativeElement, "open");
            this.isOpen = false;
        }
        else {
            this.renderer.addClass(this.customizer.nativeElement, "open");
            this.isOpen = true;
        }
    };
    CustomizerComponent.prototype.closeCustomizer = function () {
        this.renderer.removeClass(this.customizer.nativeElement, "open");
        this.isOpen = false;
    };
    CustomizerComponent.prototype.bgImageDisplay = function (e) {
        if (e.target.checked) {
            this.isBgImageDisplay = true;
        }
        else {
            this.isBgImageDisplay = false;
        }
        //emit event to FUll Layout
        this.customizerService.bgImageDisplay(e);
    };
    CustomizerComponent.prototype.ngOnDestroy = function () {
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
    };
    CustomizerComponent.ɵfac = function CustomizerComponent_Factory(t) { return new (t || CustomizerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_0__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_customizer_service__WEBPACK_IMPORTED_MODULE_1__.CustomizerService)); };
    CustomizerComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: CustomizerComponent, selectors: [["app-customizer"]], viewQuery: function CustomizerComponent_Query(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
        } if (rf & 2) {
            var _t = void 0;
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.customizer = _t.first);
        } }, outputs: { directionEvent: "directionEvent" }, decls: 115, vars: 17, consts: [[1, "customizer", "d-none", "d-lg-none", "d-xl-block", 3, "ngClass"], ["customizer", ""], [1, "customizer-close", 3, "click"], [1, "ft-x", "font-medium-3"], ["id", "customizer-toggle-icon", 1, "customizer-toggle", "bg-primary", 3, "click"], [1, "ft-settings", "font-medium-1", "spinner", "white", "align-middle"], ["data-ps-id", "df6a5ce4-a175-9172-4402-dabd98fc9c0a", 1, "customizer-content", "p-3", "ps-container", "ps-theme-dark", 3, "perfectScrollbar"], [1, "text-uppercase"], [1, "ct-layout"], [1, "mb-3", "d-flex", "align-items-center"], [1, "ft-layout", "font-medium-2", "mr-2"], [1, "layout-switch"], [1, "radio", "radio-sm", "d-inline-block", "light-layout", "mr-3"], ["id", "ll-switch", "type", "radio", "name", "layout-switch", 3, "checked", "click"], ["for", "ll-switch"], [1, "radio", "radio-sm", "d-inline-block", "dark-layout", "mr-3"], ["id", "dl-switch", "type", "radio", "name", "layout-switch", 3, "checked", "click"], ["for", "dl-switch"], [1, "radio", "radio-sm", "d-inline-block", "transparent-layout"], ["id", "tl-switch", "type", "radio", "name", "layout-switch", 3, "checked", "click"], ["for", "tl-switch"], [1, "ct-menu-type"], [1, "ft-credit-card", "font-medium-2", "mr-2"], [1, "menu-switch"], [1, "radio", "radio-sm", "d-inline-block", "menu-side", "mr-3"], ["id", "menu-side", "type", "radio", "name", "menu-switch", 3, "checked", "click"], ["for", "menu-side"], [1, "radio", "radio-sm", "d-inline-block", "menu-top"], ["id", "menu-top", "type", "radio", "name", "menu-switch", 3, "checked", "click"], ["for", "menu-top"], [1, "ct-navbar-type"], [1, "ft-more-horizontal", "font-medium-2", "mr-2"], [1, "navbar-switch"], [1, "radio", "radio-sm", "d-inline-block", "nav-static", "mr-3"], ["id", "nav-static", "type", "radio", "name", "navbar-switch", 3, "checked", "click"], ["for", "nav-static"], [1, "radio", "radio-sm", "d-inline-block", "nav-fixed"], ["id", "nav-fixed", "type", "radio", "name", "navbar-switch", 3, "checked", "click"], ["for", "nav-fixed"], [1, "ct-bg-color"], [1, "sb-options", "d-flex", "align-items-center", "mb-3"], [1, "ft-droplet", "font-medium-2", "mr-2"], [1, "cz-bg-color", "sb-color-options"], [1, "row", "mb-3"], ["class", "col px-2", 4, "ngFor", "ngForOf"], [1, "row"], [1, "tl-bg-img"], [1, "d-flex", "align-items-center", "mb-3"], [1, "ft-star", "font-medium-2", "mr-2"], [1, "cz-tl-bg-image", "row"], ["class", "col-sm-3", 4, "ngFor", "ngForOf"], [1, "ct-bg-image"], [1, "sb-bg-img", "d-flex", "align-items-center", "mb-3"], [1, "ft-sidebar", "font-medium-2", "mr-2"], [1, "cz-bg-image", "row", "sb-bg-img"], ["class", "col-2 px-2", 4, "ngFor", "ngForOf"], [1, "tl-color-option"], [1, "tl-color-options", "d-flex", "align-items-center", "mb-3"], [1, "cz-tl-bg-color"], ["class", "col", 4, "ngFor", "ngForOf"], [1, "ct-bg-image-toggler"], [1, "togglebutton", "toggle-sb-bg-img"], [1, "float-right"], [1, "checkbox"], ["id", "sidebar-bg-img", "type", "checkbox", "checked", "", 1, "cz-bg-image-display", 3, "change"], ["for", "sidebar-bg-img"], [1, "ct-compact-toggler"], [1, "togglebutton"], ["id", "cz-compact-menu", "type", "checkbox", 1, "cz-compact-menu", 3, "checked", "change"], ["for", "cz-compact-menu"], ["class", "ct-sidebar-size", 4, "ngIf"], [1, "col", "px-2"], [2, "width", "30px", "height", "30px", 3, "ngClass", "click"], [1, "col-sm-3"], [3, "ngClass", "click"], [1, "col-2", "px-2"], ["alt", "sidebar bg image", "width", "90", 1, "rounded", 3, "src", "ngClass", "click"], [1, "col"], [1, "ct-sidebar-size"], ["id", "cz-sidebar-width", "data-toggle", "buttons", 1, "cz-sidebar-width", "btn-group", "btn-group-toggle"], [1, "btn", "btn-outline-primary", 3, "ngClass"], ["id", "cz-btn-radio-1", "type", "radio", "name", "cz-btn-radio", "value", "sidebar-sm", 3, "checked", "change"], ["id", "cz-btn-radio-2", "type", "radio", "name", "cz-btn-radio", "value", "sidebar-md", 3, "checked", "change"], ["id", "cz-btn-radio-3", "type", "radio", "name", "cz-btn-radio", "value", "sidebar-lg", 3, "checked", "change"]], template: function CustomizerComponent_Template(rf, ctx) { if (rf & 1) {
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
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](15, _c3, ctx.isOpen));
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
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_4__.PerfectScrollbarDirective, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjdXN0b21pemVyLmNvbXBvbmVudC5zY3NzIn0= */"] });
    return CustomizerComponent;
}());



/***/ }),

/***/ 14572:
/*!****************************************************!*\
  !*** ./angular/app/shared/data/template-search.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LISTITEMS": function() { return /* binding */ LISTITEMS; }
/* harmony export */ });
var LISTITEMS = [
    { "url": "/page", "name": "Page", "icon": "ft-home" },
    { "url": "/pages/login", "name": "Login", "icon": "ft-log-in" },
];


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



var SidebarAnchorToggleDirective = /** @class */ (function () {
    function SidebarAnchorToggleDirective(navlink) {
        this.navlink = navlink;
    }
    SidebarAnchorToggleDirective.prototype.onClick = function () {
        this.navlink.toggle();
    };
    SidebarAnchorToggleDirective.ɵfac = function SidebarAnchorToggleDirective_Factory(t) { return new (t || SidebarAnchorToggleDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_sidebar_link_directive__WEBPACK_IMPORTED_MODULE_0__.SidebarLinkDirective)); };
    SidebarAnchorToggleDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: SidebarAnchorToggleDirective, selectors: [["", "appSidebarAnchorToggle", ""]], hostBindings: function SidebarAnchorToggleDirective_HostBindings(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SidebarAnchorToggleDirective_click_HostBindingHandler($event) { return ctx.onClick($event); });
        } } });
    return SidebarAnchorToggleDirective;
}());



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


var SidebarDropdownDirective = /** @class */ (function () {
    function SidebarDropdownDirective(router) {
        this.router = router;
        this.navlinks = [];
    }
    SidebarDropdownDirective.prototype.ngOnInit = function () {
        //write your code here!
    };
    SidebarDropdownDirective.ɵfac = function SidebarDropdownDirective_Factory(t) { return new (t || SidebarDropdownDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router)); };
    SidebarDropdownDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: SidebarDropdownDirective, selectors: [["", "appSidebarDropdown", ""]] });
    return SidebarDropdownDirective;
}());



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



var SidebarLinkDirective = /** @class */ (function () {
    function SidebarLinkDirective(sideNav) {
        this.sideNav = sideNav;
    }
    Object.defineProperty(SidebarLinkDirective.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (value) {
            this._open = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SidebarLinkDirective.prototype, "sidebarGroupActive", {
        get: function () {
            return this._sidebarGroupActive;
        },
        set: function (value) {
            this._sidebarGroupActive = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SidebarLinkDirective.prototype, "navCollapsedOpen", {
        get: function () {
            return this._navCollapsedOpen;
        },
        set: function (value) {
            this._navCollapsedOpen = value;
        },
        enumerable: false,
        configurable: true
    });
    SidebarLinkDirective.prototype.ngOnInit = function () {
        this.sideNav.addLink(this);
    };
    SidebarLinkDirective.prototype.ngOnDestroy = function () {
    };
    //when side menu (vertical menu) item gets clicked
    SidebarLinkDirective.prototype.toggle = function () {
        this.open = !this.open;
        if (this.open) {
            this.sideNav.closeOtherLinks(this);
        }
        if (!this.open && this.level.toString() === "1" && this.hasSub) {
            this.sidebarGroupActive = false;
        }
    };
    SidebarLinkDirective.ɵfac = function SidebarLinkDirective_Factory(t) { return new (t || SidebarLinkDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_sidebar_directive__WEBPACK_IMPORTED_MODULE_0__.SidebarDirective)); };
    SidebarLinkDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: SidebarLinkDirective, selectors: [["", "appSidebarlink", ""]], hostVars: 6, hostBindings: function SidebarLinkDirective_HostBindings(rf, ctx) { if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("open", ctx.open)("sidebar-group-active", ctx.sidebarGroupActive)("nav-collapsed-open", ctx.navCollapsedOpen);
        } }, inputs: { parent: "parent", level: "level", hasSub: "hasSub", path: "path", open: "open", sidebarGroupActive: "sidebarGroupActive", navCollapsedOpen: "navCollapsedOpen" } });
    return SidebarLinkDirective;
}());



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




var SidebarDirective = /** @class */ (function () {
    function SidebarDirective(cdr, router, configService, layoutService) {
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
    Object.defineProperty(SidebarDirective.prototype, "navExpanded", {
        get: function () {
            return this._navExpanded;
        },
        set: function (value) {
            this._navExpanded = value;
        },
        enumerable: false,
        configurable: true
    });
    SidebarDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.innerWidth = window.innerWidth;
        this.layoutSub = this.configService.templateConf$.subscribe(function (templateConf) {
            if (templateConf) {
                _this.config = templateConf;
            }
            _this.loadLayout();
            _this.cdr.markForCheck();
        });
    };
    SidebarDirective.prototype.ngOnDestroy = function () {
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
    };
    //load layout when changes in the config
    SidebarDirective.prototype.loadLayout = function () {
        this.sidebarExpanded = !this.config.layout.sidebar.collapsed;
        if (this.config.layout.sidebar.collapsed && !this.mouseEnter) {
            this.setSidebarGroupActiveCollapsed();
            this.navExpanded = false;
        }
        else {
            this.setSidebarGroupActive();
            this.navExpanded = true;
        }
    };
    //add menu links to the link list
    SidebarDirective.prototype.addLink = function (link) {
        this.navlinks.push(link);
    };
    //close all other menu items other than active one
    SidebarDirective.prototype.closeOtherLinks = function (openLink) {
        this.navlinks.forEach(function (link) {
            if (link != openLink && (openLink.level.toString() === "1" || link.level === openLink.level)) {
                link.open = false;
                link.sidebarGroupActive = false;
            }
            else if (link === openLink && (openLink.level.toString() === "1") && link.hasSub === true) {
                link.sidebarGroupActive = true;
            }
            else if (link === openLink && (openLink.level.toString() === "1") && link.hasSub === false) {
                link.sidebarGroupActive = false;
                link.open = false;
            }
            else if (link === openLink && openLink.level.toString() != "1" && link.hasSub === false) {
                link.open = false;
                link.sidebarGroupActive = false;
                return;
            }
        });
    };
    SidebarDirective.prototype.ngAfterViewInit = function () {
    };
    // call when sidebar toggle is collapsed but still in expand mode on mouse hover
    SidebarDirective.prototype.setSidebarGroupActive = function () {
        var _this = this;
        if (this.navlinks.length > 0) {
            this.navlinks.forEach(function (link) {
                link.sidebarGroupActive = false;
                link.navCollapsedOpen = false;
            });
            var matched_1 = this.navlinks.find(function (link) { return link.path === _this.router.url; });
            if (matched_1) {
                var parent_1 = this.navlinks.find(function (link) { return link.parent === matched_1.parent && link.level.toString() === "1" && link.hasSub === true; });
                if (parent_1) {
                    parent_1.sidebarGroupActive = true;
                    parent_1.navCollapsedOpen = false;
                    parent_1.open = true;
                }
            }
        }
    };
    // call when sidebar toggle is collapsed and is in collapse mode on mouse out
    SidebarDirective.prototype.setSidebarGroupActiveCollapsed = function () {
        var _this = this;
        this.closeOtherLinks(this.navlinks.find(function (link) { return link.path === _this.router.url; }));
        if (this.navlinks.length > 0) {
            this.navlinks.forEach(function (link) {
                link.sidebarGroupActive = false;
                link.navCollapsedOpen = false;
            });
            var matched_2 = this.navlinks.find(function (link) { return link.path === _this.router.url; });
            if (matched_2) {
                var parent_2 = this.navlinks.find(function (link) { return link.parent === matched_2.parent && link.level.toString() === "1" && link.hasSub === true; });
                if (parent_2) {
                    parent_2.sidebarGroupActive = true;
                    parent_2.navCollapsedOpen = true;
                    parent_2.open = false;
                }
            }
        }
    };
    // mouse enter event of side menu
    SidebarDirective.prototype.onMouseOver = function (e) {
        this.mouseEnter = true;
        if (this.config.layout.sidebar.collapsed) {
            this.setSidebarGroupActive();
            this.navExpanded = true;
        }
    };
    // mouse leave event of side menu
    SidebarDirective.prototype.onMouseOut = function (e) {
        this.mouseEnter = false;
        if (this.config.layout.sidebar.collapsed) {
            this.setSidebarGroupActiveCollapsed();
            this.navExpanded = false;
        }
    };
    SidebarDirective.ɵfac = function SidebarDirective_Factory(t) { return new (t || SidebarDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_0__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService)); };
    SidebarDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({ type: SidebarDirective, selectors: [["", "appSidebar", ""]], hostVars: 2, hostBindings: function SidebarDirective_HostBindings(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("mouseenter", function SidebarDirective_mouseenter_HostBindingHandler($event) { return ctx.onMouseOver($event); })("mouseleave", function SidebarDirective_mouseleave_HostBindingHandler($event) { return ctx.onMouseOut($event); });
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("expanded", ctx.navExpanded);
        } }, inputs: { navExpanded: "navExpanded" } });
    return SidebarDirective;
}());



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


var ToggleFullscreenDirective = /** @class */ (function () {
    function ToggleFullscreenDirective() {
    }
    ToggleFullscreenDirective.prototype.onClick = function () {
        if (screenfull__WEBPACK_IMPORTED_MODULE_0__.isEnabled) {
            screenfull__WEBPACK_IMPORTED_MODULE_0__.toggle();
        }
    };
    ToggleFullscreenDirective.ɵfac = function ToggleFullscreenDirective_Factory(t) { return new (t || ToggleFullscreenDirective)(); };
    ToggleFullscreenDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: ToggleFullscreenDirective, selectors: [["", "appToggleFullscreen", ""]], hostBindings: function ToggleFullscreenDirective_HostBindings(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ToggleFullscreenDirective_click_HostBindingHandler() { return ctx.onClick(); });
        } } });
    return ToggleFullscreenDirective;
}());



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



var TopMenuAnchorToggleDirective = /** @class */ (function () {
    function TopMenuAnchorToggleDirective(navlink) {
        this.navlink = navlink;
    }
    // @HostListener("click", ["$event"])
    // onClick() {
    //   this.navlink.toggle();
    // }
    TopMenuAnchorToggleDirective.prototype.onMouseOver = function (e) {
        this.navlink.openDropdown();
    };
    TopMenuAnchorToggleDirective.ɵfac = function TopMenuAnchorToggleDirective_Factory(t) { return new (t || TopMenuAnchorToggleDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_topmenu_link_directive__WEBPACK_IMPORTED_MODULE_0__.TopMenuLinkDirective)); };
    TopMenuAnchorToggleDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: TopMenuAnchorToggleDirective, selectors: [["", "appTopMenuAnchorToggle", ""]], hostBindings: function TopMenuAnchorToggleDirective_HostBindings(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mouseenter", function TopMenuAnchorToggleDirective_mouseenter_HostBindingHandler($event) { return ctx.onMouseOver($event); });
        } } });
    return TopMenuAnchorToggleDirective;
}());



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


var TopMenuDropdownDirective = /** @class */ (function () {
    function TopMenuDropdownDirective(router) {
        this.router = router;
        this.navlinks = [];
    }
    TopMenuDropdownDirective.prototype.ngOnInit = function () {
        //write your code here!
    };
    TopMenuDropdownDirective.ɵfac = function TopMenuDropdownDirective_Factory(t) { return new (t || TopMenuDropdownDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router)); };
    TopMenuDropdownDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: TopMenuDropdownDirective, selectors: [["", "appTopMenuDropdown", ""]] });
    return TopMenuDropdownDirective;
}());



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



var TopMenuLinkDirective = /** @class */ (function () {
    function TopMenuLinkDirective(topNav) {
        this.topNav = topNav;
    }
    Object.defineProperty(TopMenuLinkDirective.prototype, "show", {
        get: function () {
            return this._show;
        },
        set: function (value) {
            this._show = value;
            if (value) {
                this.topNav.closeOtherLinks(this);
            }
        },
        enumerable: false,
        configurable: true
    });
    TopMenuLinkDirective.prototype.ngOnInit = function () {
        this.topNav.addLink(this);
    };
    TopMenuLinkDirective.prototype.ngOnDestroy = function () {
    };
    // public toggle(): any {
    //   this.show = !this.show;
    // }
    TopMenuLinkDirective.prototype.openDropdown = function () {
        this.show = true;
    };
    TopMenuLinkDirective.ɵfac = function TopMenuLinkDirective_Factory(t) { return new (t || TopMenuLinkDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_topmenu_directive__WEBPACK_IMPORTED_MODULE_0__.TopMenuDirective)); };
    TopMenuLinkDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: TopMenuLinkDirective, selectors: [["", "appTopMenulink", ""]], hostVars: 2, hostBindings: function TopMenuLinkDirective_HostBindings(rf, ctx) { if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("show", ctx.show);
        } }, inputs: { parent: "parent", level: "level", show: "show" } });
    return TopMenuLinkDirective;
}());



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

var TopMenuDirective = /** @class */ (function () {
    function TopMenuDirective() {
        this.navlinks = [];
    }
    TopMenuDirective.prototype.ngOnInit = function () {
    };
    TopMenuDirective.prototype.addLink = function (link) {
        this.navlinks.push(link);
    };
    TopMenuDirective.prototype.closeOtherLinks = function (openLink) {
        this.navlinks.forEach(function (link) {
            if (link != openLink && (openLink.level.toString() === "1" || link.level === openLink.level)) {
                link.show = false;
            }
        });
    };
    TopMenuDirective.prototype.onMouseOut = function (e) {
        this.navlinks.forEach(function (link) {
            link.show = false;
        });
    };
    TopMenuDirective.ɵfac = function TopMenuDirective_Factory(t) { return new (t || TopMenuDirective)(); };
    TopMenuDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: TopMenuDirective, selectors: [["", "appTopMenu", ""]], hostBindings: function TopMenuDirective_HostBindings(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mouseleave", function TopMenuDirective_mouseleave_HostBindingHandler($event) { return ctx.onMouseOut($event); });
        } } });
    return TopMenuDirective;
}());



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


var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
        //Variables
        this.currentDate = new Date();
    }
    FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
    FooterComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 8, vars: 4, consts: [[1, "footer"], [1, "copyright", "clearfix", "text-muted", "m-0"], ["id", "pixinventLink", "href", "https://themeforest.net/user/pixinvent/portfolio?ref=pixinvent"], [1, "d-none", "d-sm-inline-block"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "footer", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "date");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "PIXINVENT");
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
    return FooterComponent;
}());



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










var _c0 = function (a0) { return [a0]; };
function HorizontalMenuComponent_li_3_a_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
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
    var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
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
    var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
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
    var menuSubItem_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
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
    var menuSubItem_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
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
    var menuSubItem_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
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
    var menuSubsubItem_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
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
    var menuSubsubItem_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", "dropdown-item d-flex align-items-center")("href", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](4, _c0, menuSubsubItem_r19.path), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](6, _c0, menuSubsubItem_r19.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](menuSubsubItem_r19.title);
} }
var _c1 = function () { return { exact: true }; };
function HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_li_1_a_1_Template, 4, 8, "a", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_li_1_ng_template_2_Template, 4, 8, "ng-template", null, 25, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    var menuSubsubItem_r19 = ctx.$implicit;
    var _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](3);
    var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4).$implicit;
    var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
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
    var menuSubItem_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
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
    var menuSubItem_r10 = ctx.$implicit;
    var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2).$implicit;
    var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
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
    var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
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
    var menuItem_r1 = ctx.$implicit;
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
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
var _c2 = function (a0, a1) { return { "navbar-sticky": a0, "navbar-fixed": a1 }; };
var HorizontalMenuComponent = /** @class */ (function () {
    function HorizontalMenuComponent(layoutService, configService, cdr, router) {
        this.layoutService = layoutService;
        this.configService = configService;
        this.cdr = cdr;
        this.router = router;
        this.config = {};
        this.level = 0;
        this.transparentBGClass = "";
        this.menuPosition = 'Side';
        this.config = this.configService.templateConf;
    }
    HorizontalMenuComponent.prototype.ngOnInit = function () {
        this.menuItems = _navigation_routes_config__WEBPACK_IMPORTED_MODULE_0__.HROUTES;
    };
    HorizontalMenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.layoutSub = this.configService.templateConf$.subscribe(function (templateConf) {
            if (templateConf) {
                _this.config = templateConf;
            }
            _this.loadLayout();
            _this.cdr.markForCheck();
        });
    };
    HorizontalMenuComponent.prototype.loadLayout = function () {
        if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != "") {
            this.menuPosition = this.config.layout.menuPosition;
        }
        if (this.config.layout.variant === "Transparent") {
            this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
        }
        else {
            this.transparentBGClass = "";
        }
    };
    HorizontalMenuComponent.prototype.ngOnDestroy = function () {
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
    };
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
    return HorizontalMenuComponent;
}());



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
var HROUTES = [
    {
        path: '/page', title: 'Page', icon: 'ft-home', class: 'dropdown nav-item', isExternalLink: false, submenu: []
    },
    {
        path: '', title: 'Menu Levels', icon: 'ft-align-left', class: 'dropdown nav-item has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/YOUR-ROUTE-PATH', title: 'Second Level', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            {
                path: '', title: 'Second Level Child', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
                submenu: [
                    { path: '/YOUR-ROUTE-PATH', title: 'Third Level 1.1', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                    { path: '/YOUR-ROUTE-PATH', title: 'Third Level 1.2', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                ]
            },
        ]
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 24751);
/* harmony import */ var _data_template_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/template-search */ 14572);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 75629);
/* harmony import */ var _services_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/layout.service */ 60432);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 3984);
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/config.service */ 47107);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var ng_click_outside__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-click-outside */ 64623);
/* harmony import */ var _directives_toggle_fullscreen_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../directives/toggle-fullscreen.directive */ 66763);
/* harmony import */ var _components_autocomplete_autocomplete_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/autocomplete/autocomplete.directive */ 344);
/* harmony import */ var _components_autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/autocomplete/autocomplete.component */ 84678);
/* harmony import */ var _components_autocomplete_autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/autocomplete/autocomplete-content.directive */ 33507);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 96797);
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-perfect-scrollbar */ 5052);
/* harmony import */ var _components_autocomplete_option_option_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/autocomplete/option/option.component */ 21979);
/* harmony import */ var _pipes_filter_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../pipes/filter.pipe */ 32677);



















var _c0 = ["search"];
var _c1 = ["searchResults"];
function NavbarComponent_ng_template_21_ng_container_0_app_option_1_Template(rf, ctx) { if (rf & 1) {
    var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "app-option", 109, 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NavbarComponent_ng_template_21_ng_container_0_app_option_1_Template_app_option_click_0_listener() { var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r11); var option_r8 = restoredCtx.$implicit; var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3); return ctx_r10.redirectTo(option_r8.url); })("mouseenter", function NavbarComponent_ng_template_21_ng_container_0_app_option_1_Template_app_option_mouseenter_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r11); var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3); return ctx_r12.removeActiveClass(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "div", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "div", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    var option_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("url", option_r8.url)("value", option_r8.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassMapInterpolate1"]("", option_r8.icon, " mr-2");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](option_r8.name);
} }
function NavbarComponent_ng_template_21_ng_container_0_app_option_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "app-option", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "No results found.");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} }
function NavbarComponent_ng_template_21_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, NavbarComponent_ng_template_21_ng_container_0_app_option_1_Template, 7, 6, "app-option", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, NavbarComponent_ng_template_21_ng_container_0_app_option_2_Template, 2, 0, "app-option", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    var result_r5 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", result_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !result_r5.length);
} }
function NavbarComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](0, NavbarComponent_ng_template_21_ng_container_0_Template, 3, 2, "ng-container", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](1, "filter");
} if (rf & 2) {
    var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](1, 1, ctx_r2.listItems, ctx_r2.control.value));
} }
var _c2 = function () { return ["/"]; };
function NavbarComponent_a_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "a", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "img", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "APEX");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](2, _c2));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("src", ctx_r3.logoUrl, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeUrl"]);
} }
var _c3 = function (a0, a1, a2, a3) { return { "navbar-brand-center": a0, "navbar-static": a1, "navbar-sticky": a2, "fixed-top": a3 }; };
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(translate, layoutService, router, configService, cdr) {
        var _this = this;
        this.translate = translate;
        this.layoutService = layoutService;
        this.router = router;
        this.configService = configService;
        this.cdr = cdr;
        this.currentLang = "en";
        this.selectedLanguageText = "English";
        this.selectedLanguageFlag = "./assets/img/flags/us.png";
        this.toggleClass = "ft-maximize";
        this.placement = "bottom-right";
        this.logoUrl = 'assets/img/logo.png';
        this.menuPosition = 'Side';
        this.isSmallScreen = false;
        this.searchOpenClass = "";
        this.transparentBGClass = "";
        this.hideSidebar = true;
        this.isCollapsed = true;
        this.toggleHideSidebar = new _angular_core__WEBPACK_IMPORTED_MODULE_10__.EventEmitter();
        this.seachTextEmpty = new _angular_core__WEBPACK_IMPORTED_MODULE_10__.EventEmitter();
        this.listItems = [];
        this.control = new _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormControl();
        this.config = {};
        var browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "en");
        this.config = this.configService.templateConf;
        this.innerWidth = window.innerWidth;
        this.layoutSub = layoutService.toggleSidebar$.subscribe(function (isShow) {
            _this.hideSidebar = !isShow;
        });
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.listItems = _data_template_search__WEBPACK_IMPORTED_MODULE_0__.LISTITEMS;
        if (this.innerWidth < 1200) {
            this.isSmallScreen = true;
        }
        else {
            this.isSmallScreen = false;
        }
    };
    NavbarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.configSub = this.configService.templateConf$.subscribe(function (templateConf) {
            if (templateConf) {
                _this.config = templateConf;
            }
            _this.loadLayout();
            _this.cdr.markForCheck();
        });
    };
    NavbarComponent.prototype.ngOnDestroy = function () {
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
        if (this.configSub) {
            this.configSub.unsubscribe();
        }
    };
    NavbarComponent.prototype.onResize = function (event) {
        this.innerWidth = event.target.innerWidth;
        if (this.innerWidth < 1200) {
            this.isSmallScreen = true;
        }
        else {
            this.isSmallScreen = false;
        }
    };
    NavbarComponent.prototype.loadLayout = function () {
        if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != "") {
            this.menuPosition = this.config.layout.menuPosition;
        }
        if (this.config.layout.variant === "Light") {
            this.logoUrl = 'assets/img/logo-dark.png';
        }
        else {
            this.logoUrl = 'assets/img/logo.png';
        }
        if (this.config.layout.variant === "Transparent") {
            this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
        }
        else {
            this.transparentBGClass = "";
        }
    };
    NavbarComponent.prototype.onSearchKey = function (event) {
        if (this.searchResults && this.searchResults.length > 0) {
            this.searchResults.first.host.nativeElement.classList.add('first-active-item');
        }
        if (event.target.value === "") {
            this.seachTextEmpty.emit(true);
        }
        else {
            this.seachTextEmpty.emit(false);
        }
    };
    NavbarComponent.prototype.removeActiveClass = function () {
        if (this.searchResults && this.searchResults.length > 0) {
            this.searchResults.first.host.nativeElement.classList.remove('first-active-item');
        }
    };
    NavbarComponent.prototype.onEscEvent = function () {
        this.control.setValue("");
        this.searchOpenClass = '';
        this.seachTextEmpty.emit(true);
    };
    NavbarComponent.prototype.onEnter = function () {
        if (this.searchResults && this.searchResults.length > 0) {
            var url = this.searchResults.first.url;
            if (url && url != '') {
                this.control.setValue("");
                this.searchOpenClass = '';
                this.router.navigate([url]);
                this.seachTextEmpty.emit(true);
            }
        }
    };
    NavbarComponent.prototype.redirectTo = function (value) {
        this.router.navigate([value]);
        this.seachTextEmpty.emit(true);
    };
    NavbarComponent.prototype.ChangeLanguage = function (language) {
        this.translate.use(language);
        if (language === 'en') {
            this.selectedLanguageText = "English";
            this.selectedLanguageFlag = "./assets/img/flags/us.png";
        }
        else if (language === 'es') {
            this.selectedLanguageText = "Spanish";
            this.selectedLanguageFlag = "./assets/img/flags/es.png";
        }
        else if (language === 'pt') {
            this.selectedLanguageText = "Portuguese";
            this.selectedLanguageFlag = "./assets/img/flags/pt.png";
        }
        else if (language === 'de') {
            this.selectedLanguageText = "German";
            this.selectedLanguageFlag = "./assets/img/flags/de.png";
        }
    };
    NavbarComponent.prototype.ToggleClass = function () {
        if (this.toggleClass === "ft-maximize") {
            this.toggleClass = "ft-minimize";
        }
        else {
            this.toggleClass = "ft-maximize";
        }
    };
    NavbarComponent.prototype.toggleSearchOpenClass = function (display) {
        var _this = this;
        this.control.setValue("");
        if (display) {
            this.searchOpenClass = 'open';
            setTimeout(function () {
                _this.searchElement.nativeElement.focus();
            }, 0);
        }
        else {
            this.searchOpenClass = '';
        }
        this.seachTextEmpty.emit(true);
    };
    NavbarComponent.prototype.toggleNotificationSidebar = function () {
        this.layoutService.toggleNotificationSidebar(true);
    };
    NavbarComponent.prototype.toggleSidebar = function () {
        this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
    };
    NavbarComponent.ɵfac = function NavbarComponent_Factory(t) { return new (t || NavbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_2__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.ChangeDetectorRef)); };
    NavbarComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({ type: NavbarComponent, selectors: [["app-navbar"]], viewQuery: function NavbarComponent_Query(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c0, 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c1, 5);
        } if (rf & 2) {
            var _t = void 0;
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.searchElement = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.searchResults = _t);
        } }, hostBindings: function NavbarComponent_HostBindings(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("resize", function NavbarComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresolveWindow"]);
        } }, outputs: { toggleHideSidebar: "toggleHideSidebar", seachTextEmpty: "seachTextEmpty" }, decls: 224, vars: 20, consts: [[3, "ngClass"], [1, "container-fluid", "navbar-wrapper"], [1, "navbar-header", "d-flex"], ["data-toggle", "collapse", 1, "navbar-toggle", "menu-toggle", "d-xl-none", "d-block", "float-left", "align-items-center", "justify-content-center", 3, "click"], [1, "ft-menu", "font-medium-3"], [1, "navbar-nav", 3, "clickOutside"], [1, "nav-item", "mr-2", "d-none", "d-lg-block"], ["id", "navbar-fullscreen", "href", "javascript:;", "appToggleFullscreen", "", 1, "nav-link", "apptogglefullscreen", 3, "click"], [1, "nav-item", "nav-search"], ["id", "navbar-search", "href", "javascript:", 1, "nav-link", "nav-link-search", 3, "click"], [1, "ft-search", "font-medium-3"], [1, "search-input-icon"], ["type", "text", "placeholder", "Explore Apex...", "tabindex", "0", "autofocus", "", "data-search", "template-search", 1, "input", 3, "formControl", "appAutocomplete", "keyup.enter", "keydown.esc", "keyup"], ["search", ""], [1, "search-input-close", 3, "click"], [1, "ft-x", "font-medium-3"], ["autocomplete", "appAutocomplete"], ["appAutocompleteContent", ""], [1, "navbar-brand-center"], [1, "navbar-header"], [1, "navbar-nav"], [1, "nav-item"], [1, "logo"], ["class", "logo-text", 3, "routerLink", 4, "ngIf"], [1, "navbar-container"], ["id", "navbarSupportedContent", 1, "collapse", "navbar-collapse", "d-block"], ["display", "dynamic", "ngbDropdown", "", 1, "i18n-dropdown", "dropdown", "nav-item", "mr-2"], ["id", "dropdown-flag", "href", "javascript:;", "data-toggle", "dropdown", "ngbDropdownToggle", "", 1, "nav-link", "d-flex", "align-items-center", "dropdown-toggle", "dropdown-language"], ["alt", "flag", 1, "langimg", "selected-flag", 3, "src"], [1, "selected-language", "d-md-flex", "d-none"], ["ngbDropdownMenu", "", "aria-labelledby", "dropdown-flag", 1, "dropdown-menu", "dropdown-menu-right", "text-left"], ["href", "javascript:;", "data-language", "en", 1, "dropdown-item", 3, "click"], ["src", "./assets/img/flags/us.png", "alt", "flag", 1, "langimg", "mr-2"], [1, "font-small-3"], ["href", "javascript:;", "data-language", "es", 1, "dropdown-item", 3, "click"], ["src", "./assets/img/flags/es.png", "alt", "flag", 1, "langimg", "mr-2"], ["href", "javascript:;", "data-language", "pt", 1, "dropdown-item", 3, "click"], ["src", "./assets/img/flags/pt.png", "alt", "flag", 1, "langimg", "mr-2"], ["href", "javascript:;", "data-language", "de", 1, "dropdown-item", 3, "click"], ["src", "./assets/img/flags/de.png", "alt", "flag", 1, "langimg", "mr-2"], ["placement", "bottom-left", "display", "static", "ngbDropdown", "", 1, "dropdown", "nav-item"], ["id", "drp-notification", "href", "javascript:;", "data-toggle", "dropdown", "ngbDropdownToggle", "", 1, "nav-link", "dropdown-toggle", "dropdown-notification", "p-0", "mt-2"], [1, "ft-bell", "font-medium-3"], [1, "notification", "badge", "badge-pill", "badge-danger"], ["ngbDropdownMenu", "", 1, "notification-dropdown", "dropdown-menu", "dropdown-menu-media", "dropdown-menu-right", "m-0", "overflow-hidden"], [1, "dropdown-menu-header"], [1, "dropdown-header", "d-flex", "justify-content-between", "m-0", "px-3", "py-2", "white", "bg-primary"], [1, "d-flex"], [1, "ft-bell", "font-medium-3", "d-flex", "align-items-center", "mr-2"], [1, "noti-title"], [1, "text-bold-400", "cursor-pointer"], [1, "scrollable-container", 3, "perfectScrollbar"], ["href", "javascript:void(0)", 1, "d-flex", "justify-content-between"], [1, "media", "d-flex", "align-items-center"], [1, "media-left"], [1, "mr-3"], ["src", "assets/img/portrait/small/avatar-s-20.png", "alt", "avatar", "height", "45", "width", "45", 1, "avatar"], [1, "media-body"], [1, "m-0"], [1, "grey", "lighten-1", "font-italic", "float-right"], [1, "noti-text"], [1, "noti-text", "font-small-3", "m-0"], ["src", "assets/img/portrait/small/avatar-s-11.png", "alt", "avatar", "height", "45", "width", "45", 1, "avatar"], ["href", "javascript:void(0)", 1, "d-flex", "justify-content-between", "read-notification"], [1, "media", "d-flex", "align-items-center", "py-0", "pr-0"], ["src", "assets/img/icons/sketch-mac-icon.png", "alt", "avatar", "height", "45", "width", "45"], [1, "media-right"], [1, "border-left"], [1, "px-4", "py-2", "border-bottom"], [1, "m-0", "text-bold-600"], [1, "px-4", "py-2", "text-center"], [1, "avatar", "bg-primary", "bg-lighten-3", "mr-3", "p-1"], [1, "avatar-content", "font-medium-2"], [1, "cursor-pointer"], [1, "media", "d-flex", "align-items-center", "justify-content-between"], [1, "custom-switch", "custom-control"], ["type", "checkbox", "id", "custom-switch-1111", "checked", "", 1, "custom-control-input"], ["for", "custom-switch-1111", 1, "custom-control-label", "mr-1"], [1, "d-flex", "justify-content-between", "cursor-pointer", "read-notification"], [1, "avatar", "bg-danger", "bg-lighten-4", "mr-3", "p-1"], [1, "ft-heart", "text-danger"], ["src", "assets/img/portrait/small/avatar-s-6.png", "alt", "avatar", "height", "45", "width", "45", 1, "avatar"], [1, "noti-text", "font-small-3", "text-bold-500", "m-0"], [1, "avatar", "bg-info", "bg-lighten-4", "mr-3", "p-1"], [1, "ft-align-left", "text-info"], ["src", "assets/img/portrait/small/avatar-s-7.png", "alt", "avatar", "height", "45", "width", "45", 1, "avatar"], [1, "dropdown-menu-footer"], [1, "noti-footer", "text-center", "cursor-pointer", "primary", "border-top", "text-bold-400", "py-1"], ["placement", "bottom-left", "display", "static", "ngbDropdown", "", 1, "dropdown", "nav-item", "mr-1"], ["id", "dropdownBasic2", "href", "javascript:;", "data-toggle", "dropdown", "ngbDropdownToggle", "", 1, "nav-link", "dropdown-toggle", "user-dropdown", "d-flex", "align-items-end"], [1, "user", "d-md-flex", "d-none", "mr-2"], [1, "text-right"], [1, "text-right", "text-muted", "font-small-3"], ["src", "assets/img/portrait/small/avatar-s-1.png", "alt", "avatar", "height", "35", "width", "35", 1, "avatar"], ["aria-labelledby", "dropdownBasic2", "ngbDropdownMenu", "", 1, "dropdown-menu", "text-left", "dropdown-menu-right", "m-0", "pb-0"], ["href", "javascript:;", 1, "dropdown-item"], [1, "d-flex", "align-items-center"], [1, "ft-message-square", "mr-2"], [1, "ft-edit", "mr-2"], [1, "ft-mail", "mr-2"], [1, "dropdown-divider"], ["routerLink", "/pages/login", 1, "dropdown-item"], [1, "ft-power", "mr-2"], [1, "nav-item", "d-none", "d-lg-block", "mr-2", "mt-1"], [1, "nav-link", "notification-sidebar-toggle", 3, "click"], [1, "ft-align-right", "font-medium-3"], [4, "ngIf"], [3, "url", "value", "click", "mouseenter", 4, "ngFor", "ngForOf"], ["class", "no-result", 4, "ngIf"], [3, "url", "value", "click", "mouseenter"], ["searchResults", ""], [1, "d-flex", "align-items-center", "justify-content-between", "w-100"], [1, "d-flex", "align-items-center", "justify-content-start"], [1, "no-result"], [1, "logo-text", 3, "routerLink"], [1, "logo-img"], ["alt", "Apex logo", 1, "logo-img", 3, "src"], [1, "text"]], template: function NavbarComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "nav", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NavbarComponent_Template_div_click_3_listener() { return ctx.toggleSidebar(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "i", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "ul", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("clickOutside", function NavbarComponent_Template_ul_clickOutside_5_listener() { return ctx.toggleSearchOpenClass(false); });
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "li", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "a", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_7_listener() { return ctx.ToggleClass(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](8, "i");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "li", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "a", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_10_listener() { return ctx.toggleSearchOpenClass(true); });
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](11, "i", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "div");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](13, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](14, "i", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](15, "input", 12, 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("keyup.enter", function NavbarComponent_Template_input_keyup_enter_15_listener() { return ctx.onEnter(); })("keydown.esc", function NavbarComponent_Template_input_keydown_esc_15_listener() { return ctx.onEscEvent(); })("keyup", function NavbarComponent_Template_input_keyup_15_listener($event) { return ctx.onSearchKey($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](17, "div", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NavbarComponent_Template_div_click_17_listener() { return ctx.toggleSearchOpenClass(false); });
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](18, "i", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](19, "app-autocomplete", null, 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](21, NavbarComponent_ng_template_21_Template, 2, 4, "ng-template", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](22, "div", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](23, "div", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](24, "ul", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](25, "li", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](26, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](27, NavbarComponent_a_27_Template, 5, 3, "a", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](28, "div", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](29, "div", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](30, "ul", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](31, "li", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](32, "a", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](33, "img", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](34, "span", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](35);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](36, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](37, "a", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_37_listener() { return ctx.ChangeLanguage("en"); });
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](38, "img", 32);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](39, "span", 33);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](40, "English");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](41, "a", 34);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_41_listener() { return ctx.ChangeLanguage("es"); });
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](42, "img", 35);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](43, "span", 33);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](44, "Spanish");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](45, "a", 36);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_45_listener() { return ctx.ChangeLanguage("pt"); });
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](46, "img", 37);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](47, "span", 33);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](48, "Portuguese");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](49, "a", 38);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_49_listener() { return ctx.ChangeLanguage("de"); });
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](50, "img", 39);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](51, "span", 33);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](52, "German");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](53, "li", 40);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](54, "a", 41);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](55, "i", 42);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](56, "span", 43);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](57, "4");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](58, "ul", 44);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](59, "li", 45);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](60, "div", 46);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](61, "div", 47);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](62, "i", 48);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](63, "span", 49);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](64, "7 New Notification");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](65, "span", 50);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](66, "Mark all as read");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](67, "li", 51);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](68, "a", 52);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](69, "div", 53);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](70, "div", 54);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](71, "div", 55);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](72, "img", 56);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](73, "div", 57);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](74, "h6", 58);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](75, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](76, "Kate Young");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](77, "small", 59);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](78, "5 mins ago");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](79, "small", 60);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](80, "Commented on your photo");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](81, "h6", 61);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](82, " Great Shot John! Really enjoying the composition on this piece. ");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](83, "a", 52);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](84, "div", 53);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](85, "div", 54);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](86, "div", 55);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](87, "img", 62);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](88, "div", 57);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](89, "h6", 58);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](90, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](91, "Andrew Watts");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](92, "small", 59);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](93, "49 mins ago");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](94, "small", 60);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](95, "Liked your album: UI/UX Inspo");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](96, "a", 63);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](97, "div", 64);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](98, "div", 54);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](99, "div", 55);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](100, "img", 65);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](101, "div", 57);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](102, "h6", 58);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](103, "Update");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](104, "small", 60);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](105, "MyBook v2.0.7");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](106, "div", 66);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](107, "div", 67);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](108, "div", 68);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](109, "h6", 69);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](110, "Update");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](111, "div", 70);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](112, "h6", 58);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](113, "Close");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](114, "a", 63);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](115, "div", 53);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](116, "div", 54);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](117, "div", 71);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](118, "span", 72);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](119, "LD");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](120, "div", 57);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](121, "h6", 58);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](122, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](123, "Registration done");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](124, "small", 59);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](125, "6 hrs ago");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](126, "div", 73);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](127, "div", 74);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](128, "div", 54);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](129, "div", 57);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](130, "h6", 58);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](131, "New Offers");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](132, "div", 66);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](133, "div", 75);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](134, "input", 76);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](135, "label", 77);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](136, "div", 78);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](137, "div", 53);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](138, "div", 54);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](139, "div", 79);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](140, "span", 72);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](141, "i", 80);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](142, "div", 57);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](143, "h6", 58);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](144, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](145, "Application approved");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](146, "small", 59);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](147, "18 hrs ago");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](148, "a", 63);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](149, "div", 53);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](150, "div", 54);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](151, "div", 55);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](152, "img", 81);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](153, "div", 57);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](154, "h6", 58);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](155, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](156, "Anna Lee");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](157, "small", 59);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](158, "27 hrs ago");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](159, "small", 60);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](160, "Commented on your photo");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](161, "h6", 82);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](162, " Woah!Loving these colors! Keep it up ");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](163, "div", 78);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](164, "div", 53);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](165, "div", 54);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](166, "div", 83);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](167, "div", 72);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](168, "i", 84);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](169, "div", 57);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](170, "h6", 58);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](171, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](172, "Report generated");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](173, "small", 59);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](174, "35 hrs ago");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](175, "a", 63);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](176, "div", 53);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](177, "div", 54);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](178, "div", 55);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](179, "img", 85);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](180, "div", 57);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](181, "h6", 58);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](182, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](183, "Oliver Wright");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](184, "small", 59);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](185, "2 days ago");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](186, "small", 60);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](187, "Liked your album: UI/UX Inspo");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](188, "li", 86);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](189, "div", 87);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](190, " Read All Notifications ");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](191, "li", 88);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](192, "a", 89);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](193, "div", 90);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](194, "span", 91);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](195, "John Doe");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](196, "span", 92);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](197, "Available");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](198, "img", 93);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](199, "div", 94);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](200, "a", 95);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](201, "div", 96);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](202, "i", 97);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](203, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](204, "Chat");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](205, "a", 95);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](206, "div", 96);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](207, "i", 98);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](208, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](209, "Edit Profile");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](210, "a", 95);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](211, "div", 96);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](212, "i", 99);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](213, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](214, "My Inbox");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](215, "div", 100);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](216, "a", 101);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](217, "div", 96);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](218, "i", 102);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](219, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](220, "Logout");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](221, "li", 103);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](222, "a", 104);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_222_listener() { return ctx.toggleNotificationSidebar(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](223, "i", 105);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        } if (rf & 2) {
            var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](20);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassMapInterpolate1"]("navbar navbar-expand-lg navbar-light header-navbar ", ctx.transparentBGClass, "");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction4"](15, _c3, ctx.menuPosition === "Top", ctx.menuPosition === "Side" && (ctx.config == null ? null : ctx.config.layout.navbar.type) === "Static", ctx.menuPosition === "Side" && (ctx.config == null ? null : ctx.config.layout.navbar.type) === "Fixed", ctx.isSmallScreen && ctx.menuPosition === "Top"));
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassMapInterpolate1"](" ", ctx.toggleClass, " font-medium-3");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassMapInterpolate1"]("search-input ", ctx.searchOpenClass, "");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("formControl", ctx.control)("appAutocomplete", _r1);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](12);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", (ctx.config == null ? null : ctx.config.layout.menuPosition) === "Top");
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("src", ctx.selectedLanguageFlag, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeUrl"]);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx.selectedLanguageText);
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgClass, ng_click_outside__WEBPACK_IMPORTED_MODULE_3__.ClickOutsideDirective, _directives_toggle_fullscreen_directive__WEBPACK_IMPORTED_MODULE_4__.ToggleFullscreenDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormControlDirective, _components_autocomplete_autocomplete_directive__WEBPACK_IMPORTED_MODULE_5__.AutocompleteDirective, _components_autocomplete_autocomplete_component__WEBPACK_IMPORTED_MODULE_6__.AutocompleteComponent, _components_autocomplete_autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_7__.AutocompleteContentDirective, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbDropdown, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbDropdownToggle, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbDropdownMenu, ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_16__.PerfectScrollbarDirective, _angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterLinkWithHref, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgForOf, _components_autocomplete_option_option_component__WEBPACK_IMPORTED_MODULE_8__.OptionComponent], pipes: [_pipes_filter_pipe__WEBPACK_IMPORTED_MODULE_9__.FilterPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuYXZiYXIuY29tcG9uZW50LnNjc3MifQ== */"] });
    return NavbarComponent;
}());



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _services_layout_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/layout.service */ 60432);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-perfect-scrollbar */ 5052);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 96797);





function NotificationSidebarComponent_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h5", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "System Logs");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "ul", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "li", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "i", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "h6", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "New Update Available");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "1 min ago");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "p", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Android Pie 9.0.0_r52v availabe (658MB).");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Download Now!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](26, "img", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "h6", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "Reminder!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32, "52 min ago");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "p", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "Your meeting is scheduled with Mr. Derrick Walters at 16:00. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "Snooze");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](42, "img", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "h6", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](46, "Recieved a File");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](48, "4 hours ago");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](49, "p", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](50, "Christina Rogers sent you a file for the next conference. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](51, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](53, "img", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](54, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](55, "Diamond.sketch");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](58, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](59, "i", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](60, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](61, "h6", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](62, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](63, "Voice Message");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](64, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](65, "10 hours ago");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](66, "p", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](67, "Natalya Parker sent you a voice message.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](68, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](69, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](70, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](71, "Listen");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](72, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](73, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](74, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](75, "i", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](76, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](77, "h6", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](78, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](79, "Weather Update");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](80, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](81, "Yesterday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](82, "p", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](83, "Hi John! It is a rainy day with 16\u00B0C.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](84, "h5", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](85, "Applications Logs");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](86, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](87, "ul", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](88, "li", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](89, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](90, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](91, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](92, "img", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](93, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](94, "h6", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](95, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](96, "Gmail");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](97, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](98, "Just now");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](99, "p", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](100, "Victoria Hampton sent you a mail and has a file attachment with it.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](101, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](102, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](103, "img", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](104, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](105, "Register.pdf");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](106, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](107, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](108, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](109, "i", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](110, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](111, "h6", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](112, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](113, "MakeMyTrip");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](114, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](115, "7 hours ago");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](116, "p", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](117, "Your next flight for San Francisco will be on 24th March. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](118, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](119, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](120, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](121, "Important");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](122, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](123, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](124, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](125, "img", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](126, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](127, "h6", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](128, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](129, "CNN");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](130, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](131, "16 hours ago");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](132, "p", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](133, "U.S. investigating report says email account linked to CIA Director was hacked.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](134, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](135, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](136, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](137, "Read full article");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](138, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](139, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](140, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](141, "i", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](142, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](143, "h6", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](144, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](145, "Maps");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](146, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](147, "Yesterday");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](148, "p", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](149, "You visited Walmart Supercenter in Chicago.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](150, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](151, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](152, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](153, "Write a Review!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](154, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](155, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](156, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](157, "i", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](158, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](159, "h6", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](160, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](161, "Updates Available");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](162, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](163, "2 days ago");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](164, "p", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](165, "19 app updates found.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function NotificationSidebarComponent_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h5", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "General Settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "ul", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "li", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "input", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "label", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "p", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Use switches when looking for yes or no answers.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "li", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Show recent activity");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](21, "input", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](22, "label", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "p", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "The \"for\" attribute is necessary to bind checkbox with the input.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "li", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "Product Update");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](31, "input", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](32, "label", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "p", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "Message and mail me on weekly product updates.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "li", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "Email on Follow");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](41, "input", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](42, "label", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "p", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](44, "Mail me when someone follows me.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "li", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](48, "Announcements");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](49, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](51, "input", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](52, "label", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](53, "p", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](54, "Receive all the news and announcements from my clients.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](55, "li", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](58, "Date and Time");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](59, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](60, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](61, "input", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](62, "label", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](63, "p", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](64, "Show date and time on top of every page.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](65, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](66, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](67, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](68, "Email on Comments");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](69, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](70, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](71, "input", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](72, "label", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](73, "p", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](74, "Mail me when someone comments on my article.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
var _c0 = function (a0) { return { open: a0 }; };
var NotificationSidebarComponent = /** @class */ (function () {
    function NotificationSidebarComponent(layoutService) {
        var _this = this;
        this.layoutService = layoutService;
        this.isOpen = false;
        this.layoutSub = layoutService.toggleNotiSidebar$.subscribe(function (open) {
            _this.isOpen = open;
        });
    }
    NotificationSidebarComponent.prototype.ngOnInit = function () {
    };
    NotificationSidebarComponent.prototype.ngOnDestroy = function () {
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
    };
    NotificationSidebarComponent.prototype.onClose = function () {
        this.layoutService.toggleNotificationSidebar(false);
    };
    NotificationSidebarComponent.ɵfac = function NotificationSidebarComponent_Factory(t) { return new (t || NotificationSidebarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_layout_service__WEBPACK_IMPORTED_MODULE_0__.LayoutService)); };
    NotificationSidebarComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: NotificationSidebarComponent, selectors: [["app-notification-sidebar"]], decls: 17, vars: 4, consts: [["id", "notification-sidebar", 1, "notification-sidebar", "d-none", "d-sm-none", "d-md-block", 3, "ngClass"], [1, "notification-sidebar-close", 3, "click"], [1, "ft-x", "font-medium-3", "grey", "darken-1"], [1, "side-nav", "notification-sidebar-content", 3, "perfectScrollbar"], [1, "row"], [1, "col-12", "notification-tab-content"], ["ngbNav", "", 1, "nav-tabs"], ["nav", "ngbNav"], ["ngbNavItem", "", 1, "nav-item"], ["ngbNavLink", "", 1, "nav-link"], ["ngbNavContent", ""], [1, "mt-2", 3, "ngbNavOutlet"], ["id", "activity-tab", "role", "tabpanel", "aria-expanded", "true", "aria-labelledby", "base-tab1", 1, "row", "tab-pane"], ["id", "activity", 1, "col-12"], [1, "my-2", "text-bold-500"], ["id", "timeline-1", 1, "timeline-left", "timeline-wrapper", "mb-3"], [1, "timeline"], [1, "timeline-line", "mt-4"], [1, "timeline-item"], [1, "timeline-badge"], ["data-toggle", "tooltip", "data-placement", "right", "title", "Portfolio project work", 1, "bg-primary", "bg-lighten-4"], [1, "ft-download", "primary"], [1, "activity-list-text"], [1, "mb-1"], [1, "float-right", "grey", "font-italic", "font-small-2"], [1, "mt-0", "mb-2", "font-small-3"], [1, "notification-note"], [1, "p-1", "pl-2"], [1, "text-bold-500"], ["src", "assets/img/portrait/small/avatar-s-15.png", "alt", "avatar", "width", "40", 1, "avatar"], ["src", "assets/img/portrait/small/avatar-s-16.png", "alt", "avatar", "width", "40", 1, "avatar"], ["src", "assets/img/icons/sketch-mac-icon.png", "alt", "icon", "width", "20"], [1, "text-bold-500", "ml-2"], [1, "ft-mic", "primary"], [1, "ft-cloud-drizzle", "primary"], ["id", "timeline-2", 1, "timeline-left", "timeline-wrapper"], ["src", "assets/img/portrait/small/avatar-s-26.png", "alt", "avatar", "width", "40", 1, "avatar"], ["src", "assets/img/icons/pdf.png", "alt", "pdf icon", "width", "20"], [1, "ft-droplet", "primary"], ["src", "assets/img/portrait/small/avatar-s-23.png", "alt", "avatar", "width", "40", 1, "avatar"], [1, "ft-map", "primary"], [1, "ft-package", "primary"], ["id", "settings-tab", "aria-labelledby", "base-tab2", 1, "row", "tab-pane"], ["id", "settings", 1, "col-12"], [1, "mt-2", "mb-3"], [1, "list-unstyled", "mb-0", "mx-2"], [1, "mb-3"], [1, "float-right"], [1, "custom-switch"], ["id", "noti-s-switch-1", "type", "checkbox", 1, "custom-control-input"], ["for", "noti-s-switch-1", 1, "custom-control-label"], [1, "font-small-3", "m-0"], [1, "checkbox"], ["id", "noti-s-checkbox-1", "type", "checkbox", "checked", "checked"], ["for", "noti-s-checkbox-1"], ["id", "noti-s-switch-4", "type", "checkbox", "checked", "checked", 1, "custom-control-input"], ["for", "noti-s-switch-4", 1, "custom-control-label"], ["id", "noti-s-switch-3", "type", "checkbox", 1, "custom-control-input"], ["for", "noti-s-switch-3", 1, "custom-control-label"], ["id", "noti-s-checkbox-2", "type", "checkbox", "checked", "checked"], ["for", "noti-s-checkbox-2"], ["id", "noti-s-checkbox-3", "type", "checkbox"], ["for", "noti-s-checkbox-3"], ["id", "noti-s-switch-2", "type", "checkbox", "checked", "checked", 1, "custom-control-input"], ["for", "noti-s-switch-2", 1, "custom-control-label"]], template: function NotificationSidebarComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "aside", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NotificationSidebarComponent_Template_a_click_1_listener() { return ctx.onClose(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "i", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "nav", 6, 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](8, 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "a", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Activity");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, NotificationSidebarComponent_ng_template_11_Template, 166, 0, "ng-template", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](12, 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "a", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Settings");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, NotificationSidebarComponent_ng_template_15_Template, 75, 0, "ng-template", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        } if (rf & 2) {
            var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](2, _c0, ctx.isOpen));
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](16);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngbNavOutlet", _r0);
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_3__.PerfectScrollbarDirective, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__.NgbNav, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__.NgbNavItem, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__.NgbNavLink, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__.NgbNavContent, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__.NgbNavOutlet], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJub3RpZmljYXRpb24tc2lkZWJhci5jb21wb25lbnQuc2NzcyJ9 */"] });
    return NotificationSidebarComponent;
}());



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

var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (items, searchTerm, labelKey) {
        if (!items || !searchTerm) {
            return null;
        }
        return items.filter(function (item) {
            return item[labelKey || 'name']
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) === true;
        }).slice(0, 10);
    };
    FilterPipe.ɵfac = function FilterPipe_Factory(t) { return new (t || FilterPipe)(); };
    FilterPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "filter", type: FilterPipe, pure: true });
    return FilterPipe;
}());



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
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var _filter_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter.pipe */ 32677);
/* harmony import */ var _search_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search.pipe */ 97941);
/* harmony import */ var _short_name_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./short-name.pipe */ 83512);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 74788);





var PipeModule = /** @class */ (function () {
    function PipeModule() {
    }
    PipeModule.ɵfac = function PipeModule_Factory(t) { return new (t || PipeModule)(); };
    PipeModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: PipeModule });
    PipeModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule]] });
    return PipeModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](PipeModule, { declarations: [_filter_pipe__WEBPACK_IMPORTED_MODULE_0__.FilterPipe, _search_pipe__WEBPACK_IMPORTED_MODULE_1__.SearchPipe, _short_name_pipe__WEBPACK_IMPORTED_MODULE_2__.ShortNamePipe], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule], exports: [_filter_pipe__WEBPACK_IMPORTED_MODULE_0__.FilterPipe, _search_pipe__WEBPACK_IMPORTED_MODULE_1__.SearchPipe, _short_name_pipe__WEBPACK_IMPORTED_MODULE_2__.ShortNamePipe] }); })();


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

var SearchPipe = /** @class */ (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (value, keys, term) {
        if (!term)
            return value;
        return (value || []).filter(function (item) { return keys.split(',').some(function (key) { return item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key]); }); });
    };
    SearchPipe.ɵfac = function SearchPipe_Factory(t) { return new (t || SearchPipe)(); };
    SearchPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "search", type: SearchPipe, pure: true });
    return SearchPipe;
}());



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

var ShortNamePipe = /** @class */ (function () {
    function ShortNamePipe() {
    }
    ShortNamePipe.prototype.transform = function (fullName) {
        return fullName
            .split(' ')
            .map(function (n) { return n[0]; })
            .join('');
    };
    ShortNamePipe.ɵfac = function ShortNamePipe_Factory(t) { return new (t || ShortNamePipe)(); };
    ShortNamePipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "shortName", type: ShortNamePipe, pure: true });
    return ShortNamePipe;
}());



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
var CONTENT_ROUTES = [
    {
        path: 'pages',
        loadChildren: function () { return __webpack_require__.e(/*! import() */ "angular_app_pages_content-pages_content-pages_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/content-pages/content-pages.module */ 53310)).then(function (m) { return m.ContentPagesModule; }); }
    }
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
var Full_ROUTES = [
    {
        path: 'page',
        loadChildren: function () { return __webpack_require__.e(/*! import() */ "angular_app_page_page_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../../page/page.module */ 17673)).then(function (m) { return m.PageModule; }); }
    }
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


var ConfigService = /** @class */ (function () {
    function ConfigService() {
        this.templateConf = this.setConfigValue();
        this.templateConfSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(this.templateConf);
        this.templateConf$ = this.templateConfSubject.asObservable();
    }
    // Default configurations for Light layout. Please check *customizer.service.ts* for different colors and bg images options
    ConfigService.prototype.setConfigValue = function () {
        return this.templateConf = {
            layout: {
                variant: "Light",
                menuPosition: "Side",
                customizer: {
                    hidden: true
                },
                navbar: {
                    type: 'Static'
                },
                sidebar: {
                    collapsed: false,
                    size: "sidebar-md",
                    backgroundColor: "man-of-steel",
                    backgroundImage: true,
                    backgroundImageURL: "assets/img/sidebar-bg/01.jpg"
                }
            }
        };
    };
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
    ConfigService.prototype.applyTemplateConfigChange = function (tempConfig) {
        this.templateConf = Object.assign(this.templateConf, tempConfig);
        this.templateConfSubject.next(this.templateConf);
    };
    ConfigService.ɵfac = function ConfigService_Factory(t) { return new (t || ConfigService)(); };
    ConfigService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ConfigService, factory: ConfigService.ɵfac, providedIn: "root" });
    return ConfigService;
}());



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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 74788);
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.service */ 47107);



var CustomizerService = /** @class */ (function () {
    function CustomizerService(config) {
        this.config = config;
        // sidebar BG colors for Light & Dark Layout
        this.light_dark_colors = [
            {
                code: "mint",
                class: "gradient-mint",
                active: false,
                type: 'gradient'
            },
            {
                code: "king-yna",
                class: "gradient-king-yna",
                active: false,
                type: 'gradient'
            },
            {
                code: "ibiza-sunset",
                class: "gradient-ibiza-sunset",
                active: false,
                type: 'gradient'
            },
            {
                code: "flickr",
                class: "gradient-flickr",
                active: false,
                type: 'gradient'
            },
            {
                code: "purple-bliss",
                class: "gradient-purple-bliss",
                active: false,
                type: 'gradient'
            },
            {
                code: "man-of-steel",
                class: "gradient-man-of-steel",
                active: false,
                type: 'gradient'
            },
            {
                code: "purple-love",
                class: "gradient-purple-love",
                active: false,
                type: 'gradient'
            },
            {
                code: "black",
                class: "bg-black",
                active: false,
                type: 'solid'
            },
            {
                code: "white",
                class: "bg-grey",
                active: false,
                type: 'solid'
            },
            {
                code: "primary",
                class: "bg-primary",
                active: false,
                type: 'solid'
            },
            {
                code: "success",
                class: "bg-success",
                active: false,
                type: 'solid'
            },
            {
                code: "warning",
                class: "bg-warning",
                active: false,
                type: 'solid'
            },
            {
                code: "info",
                class: "bg-info",
                active: false,
                type: 'solid'
            },
            {
                code: "danger",
                class: "bg-danger",
                active: false,
                type: 'solid'
            }
        ];
        // sidebar BG colors for Transparent Layout
        this.transparent_colors = [
            {
                class: "bg-glass-hibiscus",
                active: false
            },
            {
                class: "bg-glass-purple-pizzazz",
                active: false
            },
            {
                class: "bg-glass-blue-lagoon",
                active: false
            },
            {
                class: "bg-glass-electric-violet",
                active: false
            },
            {
                class: "bg-glass-portage",
                active: false
            },
            {
                class: "bg-glass-tundora",
                active: false
            }
        ];
        // sidebar BG images for Light & Dark Layout
        this.light_dark_bg_images = [
            {
                src: "assets/img/sidebar-bg/01.jpg",
                active: false
            },
            {
                src: "assets/img/sidebar-bg/02.jpg",
                active: false
            },
            {
                src: "assets/img/sidebar-bg/03.jpg",
                active: false
            },
            {
                src: "assets/img/sidebar-bg/04.jpg",
                active: false
            },
            {
                src: "assets/img/sidebar-bg/05.jpg",
                active: false
            },
            {
                src: "assets/img/sidebar-bg/06.jpg",
                active: false
            },
        ];
        // Background Colors with Shades for Transparent Layout
        this.transparent_colors_with_shade = [
            {
                class: "bg-glass-1",
                active: false
            },
            {
                class: "bg-glass-2",
                active: false
            },
            {
                class: "bg-glass-3",
                active: false
            },
            {
                class: "bg-glass-4",
                active: false
            },
        ];
        this.lightDarkLayoutGradientBGColors = [];
        this.lightDarkLayoutSolidBGColors = [];
        this.transparentLayoutBGColors = [];
        this.transparentLayoutBGColorsWithShades = [];
        this.lightDarkLayoutBGImages = [];
        this.getData();
    }
    CustomizerService.prototype.getData = function () {
        this.lightDarkLayoutGradientBGColors = this.getlightDarkLayoutGradientBGColors();
        this.lightDarkLayoutSolidBGColors = this.getlightDarkLayoutSolidBGColors();
        this.transparentLayoutBGColors = this.getTransparentLayoutBGColors();
        this.transparentLayoutBGColorsWithShades = this.GetTransparentLayoutBGColorsWithShades();
        this.lightDarkLayoutBGImages = this.getLightDarkLayoutBGImages();
    };
    CustomizerService.prototype.getlightDarkLayoutGradientBGColors = function () {
        var _this = this;
        return this.light_dark_colors.filter(function (_) { return _.type === 'gradient'; })
            .map(function (color) {
            color.active = (color.code === _this.config.templateConf.layout.sidebar.backgroundColor);
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, color);
        });
    };
    CustomizerService.prototype.getlightDarkLayoutSolidBGColors = function () {
        var _this = this;
        return this.light_dark_colors.filter(function (_) { return _.type === 'solid'; })
            .map(function (color) {
            color.active = (color.code === _this.config.templateConf.layout.sidebar.backgroundColor);
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, color);
        });
    };
    CustomizerService.prototype.getTransparentLayoutBGColors = function () {
        var _this = this;
        return this.transparent_colors
            .map(function (color) {
            color.active = (color.class === _this.config.templateConf.layout.sidebar.backgroundColor);
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, color);
        });
    };
    CustomizerService.prototype.GetTransparentLayoutBGColorsWithShades = function () {
        var _this = this;
        return this.transparent_colors_with_shade
            .map(function (color) {
            color.active = (color.class === _this.config.templateConf.layout.sidebar.backgroundColor);
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, color);
        });
    };
    CustomizerService.prototype.getLightDarkLayoutBGImages = function () {
        var _this = this;
        return this.light_dark_bg_images
            .map(function (image) {
            image.active = (image.src === _this.config.templateConf.layout.sidebar.backgroundImageURL);
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, image);
        });
    };
    //called when click to change on any Gradient/Solid color for Light & Dark layout in customizer
    CustomizerService.prototype.changeSidebarBGColor = function (color) {
        var conf = this.config.templateConf;
        conf.layout.sidebar.backgroundColor = color.code;
        this.config.applyTemplateConfigChange({ layout: conf.layout });
        this.getData();
    };
    //called when click to change on any Transparent color for Transparent layout in customizer
    CustomizerService.prototype.changeSidebarTransparentBGColor = function (color) {
        var conf = this.config.templateConf;
        conf.layout.sidebar.backgroundColor = color.class;
        conf.layout.sidebar.backgroundImage = false;
        conf.layout.sidebar.backgroundImageURL = '';
        this.config.applyTemplateConfigChange({ layout: conf.layout });
        this.getData();
    };
    //called when click to change on any image for Light & Dark layout in customizer
    CustomizerService.prototype.changeSidebarBgImage = function (image) {
        var conf = this.config.templateConf;
        conf.layout.sidebar.backgroundImageURL = image.src;
        this.config.applyTemplateConfigChange({ layout: conf.layout });
        this.getData();
    };
    CustomizerService.prototype.bgImageDisplay = function (e) {
        var conf = this.config.templateConf;
        if (e.target.checked) {
            conf.layout.sidebar.backgroundImage = true;
        }
        else {
            conf.layout.sidebar.backgroundImage = false;
        }
        this.config.applyTemplateConfigChange({ layout: conf.layout });
    };
    CustomizerService.prototype.toggleCompactMenu = function (e) {
        var conf = this.config.templateConf;
        if (e.target.checked) {
            conf.layout.sidebar.collapsed = true;
        }
        else {
            conf.layout.sidebar.collapsed = false;
        }
        this.config.applyTemplateConfigChange({ layout: conf.layout });
    };
    CustomizerService.prototype.changeSidebarWidth = function (value) {
        var conf = this.config.templateConf;
        conf.layout.sidebar.size = value;
        this.config.applyTemplateConfigChange({ layout: conf.layout });
    };
    CustomizerService.prototype.toggleNavbarType = function (value) {
        var conf = this.config.templateConf;
        conf.layout.navbar.type = value;
        this.config.applyTemplateConfigChange({ layout: conf.layout });
    };
    // position: "Side" for vertical menu and position: "Top" for horizontal menu
    CustomizerService.prototype.toggleMenuPosition = function (position) {
        var conf = this.config.templateConf;
        conf.layout.menuPosition = position;
        this.config.applyTemplateConfigChange({ layout: conf.layout });
    };
    CustomizerService.prototype.switchLayout = function (layout, isBgImageDisplay) {
        var conf = this.config.templateConf;
        if (layout.toLowerCase() === 'light') {
            conf.layout.variant = 'Light';
            conf.layout.sidebar.backgroundImageURL = this.light_dark_bg_images[0].src;
            conf.layout.sidebar.backgroundColor = this.light_dark_colors[5].code;
            conf.layout.sidebar.backgroundImage = isBgImageDisplay;
        }
        else if (layout.toLowerCase() === 'dark') {
            conf.layout.variant = 'Dark';
            conf.layout.sidebar.backgroundImageURL = this.light_dark_bg_images[2].src;
            conf.layout.sidebar.backgroundColor = this.light_dark_colors[7].code;
            conf.layout.sidebar.backgroundImage = isBgImageDisplay;
        }
        else if (layout.toLowerCase() === 'transparent') {
            conf.layout.variant = 'Transparent';
            conf.layout.sidebar.backgroundImageURL = "";
            conf.layout.sidebar.backgroundColor = this.transparent_colors_with_shade[0].class;
        }
        this.config.applyTemplateConfigChange({ layout: conf.layout });
        this.getData();
    };
    CustomizerService.ɵfac = function CustomizerService_Factory(t) { return new (t || CustomizerService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_config_service__WEBPACK_IMPORTED_MODULE_0__.ConfigService)); };
    CustomizerService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: CustomizerService, factory: CustomizerService.ɵfac, providedIn: "root" });
    return CustomizerService;
}());



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


var LayoutService = /** @class */ (function () {
    function LayoutService() {
        this.toggleSidebar = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject(); // small screen
        this.overlaySidebarToggle = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
        this.toggleNotiSidebar = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
        // Observable
        this.toggleSidebar$ = this.toggleSidebar.asObservable();
        this.overlaySidebarToggle$ = this.overlaySidebarToggle.asObservable();
        this.toggleNotiSidebar$ = this.toggleNotiSidebar.asObservable();
    }
    LayoutService.prototype.toggleSidebarSmallScreen = function (toggle) {
        this.toggleSidebar.next(toggle);
    };
    LayoutService.prototype.overlaySidebartoggle = function (toggle) {
        this.overlaySidebarToggle.next(toggle);
    };
    LayoutService.prototype.toggleNotificationSidebar = function (toggle) {
        this.toggleNotiSidebar.next(toggle);
    };
    LayoutService.ɵfac = function LayoutService_Factory(t) { return new (t || LayoutService)(); };
    LayoutService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: LayoutService, factory: LayoutService.ɵfac, providedIn: 'root' });
    return LayoutService;
}());



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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 74788);




/* Create a new injection token for injecting the window into a component. */
var WINDOW = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('WindowToken');
/* Define abstract class for obtaining reference to the global window object. */
var WindowRef = /** @class */ (function () {
    function WindowRef() {
    }
    Object.defineProperty(WindowRef.prototype, "nativeWindow", {
        get: function () {
            throw new Error('Not implemented.');
        },
        enumerable: false,
        configurable: true
    });
    return WindowRef;
}());

/* Define class that implements the abstract class and returns the native window object. */
var BrowserWindowRef = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(BrowserWindowRef, _super);
    function BrowserWindowRef() {
        return _super.call(this) || this;
    }
    Object.defineProperty(BrowserWindowRef.prototype, "nativeWindow", {
        get: function () {
            return window;
        },
        enumerable: false,
        configurable: true
    });
    BrowserWindowRef.ɵfac = function BrowserWindowRef_Factory(t) { return new (t || BrowserWindowRef)(); };
    BrowserWindowRef.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: BrowserWindowRef, factory: BrowserWindowRef.ɵfac });
    return BrowserWindowRef;
}(WindowRef));

/* Create an factory function that returns the native window object. */
function windowFactory(browserWindowRef, platformId) {
    if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_2__.isPlatformBrowser)(platformId)) {
        return browserWindowRef.nativeWindow;
    }
    return new Object();
}
/* Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class. */
var browserWindowProvider = {
    provide: WindowRef,
    useClass: BrowserWindowRef
};
/* Create an injectable provider that uses the windowFactory function for returning the native window object. */
var windowProvider = {
    provide: WINDOW,
    useFactory: windowFactory,
    deps: [WindowRef, _angular_core__WEBPACK_IMPORTED_MODULE_0__.PLATFORM_ID]
};
/* Create an array of providers. */
var WINDOW_PROVIDERS = [
    browserWindowProvider,
    windowProvider
];


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
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 3984);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/forms */ 24751);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/cdk/overlay */ 933);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 96797);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ngx-translate/core */ 75629);
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ngx-perfect-scrollbar */ 5052);
/* harmony import */ var ng_click_outside__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ng-click-outside */ 64623);
/* harmony import */ var _components_autocomplete_autocomplete_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/autocomplete/autocomplete.module */ 31977);
/* harmony import */ var _angular_app_shared_pipes_pipe_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../angular/app/shared/pipes/pipe.module */ 86088);
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 74788);










//COMPONENTS






//DIRECTIVES










var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
    SharedModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineNgModule"]({ type: SharedModule });
    SharedModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineInjector"]({ imports: [[
                _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule,
                _angular_common__WEBPACK_IMPORTED_MODULE_20__.CommonModule,
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__.NgbModule,
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__.TranslateModule,
                _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormsModule,
                _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_24__.OverlayModule,
                _angular_forms__WEBPACK_IMPORTED_MODULE_23__.ReactiveFormsModule,
                ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_25__.PerfectScrollbarModule,
                ng_click_outside__WEBPACK_IMPORTED_MODULE_0__.ClickOutsideModule,
                _components_autocomplete_autocomplete_module__WEBPACK_IMPORTED_MODULE_1__.AutocompleteModule,
                _angular_app_shared_pipes_pipe_module__WEBPACK_IMPORTED_MODULE_2__.PipeModule
            ], _angular_common__WEBPACK_IMPORTED_MODULE_20__.CommonModule,
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__.NgbModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__.TranslateModule] });
    return SharedModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵsetNgModuleScope"](SharedModule, { declarations: [_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__.FooterComponent,
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
        _directives_topmenu_directive__WEBPACK_IMPORTED_MODULE_14__.TopMenuDirective], imports: [_angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule,
        _angular_common__WEBPACK_IMPORTED_MODULE_20__.CommonModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__.NgbModule,
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__.TranslateModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormsModule,
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_24__.OverlayModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_23__.ReactiveFormsModule,
        ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_25__.PerfectScrollbarModule,
        ng_click_outside__WEBPACK_IMPORTED_MODULE_0__.ClickOutsideModule,
        _components_autocomplete_autocomplete_module__WEBPACK_IMPORTED_MODULE_1__.AutocompleteModule,
        _angular_app_shared_pipes_pipe_module__WEBPACK_IMPORTED_MODULE_2__.PipeModule], exports: [_angular_common__WEBPACK_IMPORTED_MODULE_20__.CommonModule,
        _footer_footer_component__WEBPACK_IMPORTED_MODULE_3__.FooterComponent,
        _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__.NavbarComponent,
        _vertical_menu_vertical_menu_component__WEBPACK_IMPORTED_MODULE_6__.VerticalMenuComponent,
        _horizontal_menu_horizontal_menu_component__WEBPACK_IMPORTED_MODULE_5__.HorizontalMenuComponent,
        _customizer_customizer_component__WEBPACK_IMPORTED_MODULE_7__.CustomizerComponent,
        _notification_sidebar_notification_sidebar_component__WEBPACK_IMPORTED_MODULE_8__.NotificationSidebarComponent,
        _directives_toggle_fullscreen_directive__WEBPACK_IMPORTED_MODULE_9__.ToggleFullscreenDirective,
        _directives_sidebar_directive__WEBPACK_IMPORTED_MODULE_13__.SidebarDirective,
        _directives_topmenu_directive__WEBPACK_IMPORTED_MODULE_14__.TopMenuDirective,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__.NgbModule,
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__.TranslateModule] }); })();


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
var ROUTES = [
    {
        path: '/page', title: 'Page', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '', title: 'Menu Levels', icon: 'ft-align-left', class: 'has-sub', badge: '3', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            { path: '/YOUR-ROUTE-PATH', title: 'Second Level', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            {
                path: '', title: 'Second Level Child', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
                submenu: [
                    { path: '/YOUR-ROUTE-PATH', title: 'Third Level 1.1', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                    { path: '/YOUR-ROUTE-PATH', title: 'Third Level 1.2', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                ]
            },
        ]
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
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-perfect-scrollbar */ 5052);
/* harmony import */ var _directives_sidebar_dropdown_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../directives/sidebar-dropdown.directive */ 77663);
/* harmony import */ var _directives_sidebar_link_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../directives/sidebar-link.directive */ 92489);
/* harmony import */ var _directives_sidebar_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../directives/sidebar-anchor-toggle.directive */ 60252);














var _c0 = ["toggleIcon"];
var _c1 = function () { return ["/page"]; };
var _c2 = function (a0, a1) { return { "ft-toggle-left": a0, "ft-toggle-right": a1 }; };
function VerticalMenuComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
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
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function VerticalMenuComponent_div_0_Template_a_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r4); var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r3.toggleSidebar(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "i", 12, 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "a", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function VerticalMenuComponent_div_0_Template_a_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r4); var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r5.CloseSidebar(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](11, "i", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](3, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("src", ctx_r0.logoUrl, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction2"](4, _c2, ctx_r0.config.layout.sidebar.collapsed, !ctx_r0.config.layout.sidebar.collapsed));
} }
var _c3 = function (a0) { return [a0]; };
function VerticalMenuComponent_li_4_a_1_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
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
    var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
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
    var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
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
    var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
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
    var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
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
    var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
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
    var menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
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
    var menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
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
    var menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
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
    var menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
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
    var menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
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
    var menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
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
    var menuSubsubItem_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
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
    var menuSubsubItem_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
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
    var menuSubsubItem_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
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
    var menuSubsubItem_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("routerLink", menuSubsubItem_r36.path);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](6, _c3, menuSubsubItem_r36.icon));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, menuSubsubItem_r36.title));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubsubItem_r36.badge && menuSubsubItem_r36.badge != "");
} }
var _c4 = function () { return { exact: true }; };
function VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "li", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_a_1_Template, 6, 8, "a", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_ng_template_2_Template, 6, 8, "ng-template", null, 35, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    var menuSubsubItem_r36 = ctx.$implicit;
    var _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](3);
    var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4).$implicit;
    var ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
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
    var menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", menuSubItem_r21.submenu);
} }
var _c5 = function (a0) { return { "has-sub": a0 }; };
function VerticalMenuComponent_li_4_ul_4_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "li", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, VerticalMenuComponent_li_4_ul_4_li_1_a_1_Template, 6, 7, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, VerticalMenuComponent_li_4_ul_4_li_1_a_2_Template, 6, 8, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, VerticalMenuComponent_li_4_ul_4_li_1_a_3_Template, 6, 8, "a", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, VerticalMenuComponent_li_4_ul_4_li_1_ul_4_Template, 2, 1, "ul", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    var menuSubItem_r21 = ctx.$implicit;
    var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
    var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
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
    var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", menuItem_r6.submenu);
} }
var _c6 = function () { return { exact: false }; };
function VerticalMenuComponent_li_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "li", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, VerticalMenuComponent_li_4_a_1_Template, 6, 7, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, VerticalMenuComponent_li_4_a_2_Template, 6, 8, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, VerticalMenuComponent_li_4_a_3_Template, 6, 10, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, VerticalMenuComponent_li_4_ul_4_Template, 2, 1, "ul", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    var menuItem_r6 = ctx.$implicit;
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
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
var VerticalMenuComponent = /** @class */ (function () {
    function VerticalMenuComponent(router, translate, layoutService, configService, cdr, deviceService) {
        this.router = router;
        this.translate = translate;
        this.layoutService = layoutService;
        this.configService = configService;
        this.cdr = cdr;
        this.deviceService = deviceService;
        this.level = 0;
        this.logoUrl = 'assets/img/logo.png';
        this.config = {};
        this.perfectScrollbarEnable = true;
        this.collapseSidebar = false;
        this.fireRefreshEventOnWindow = function () {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("resize", true, false);
            window.dispatchEvent(evt);
        };
        this.config = this.configService.templateConf;
        this.innerWidth = window.innerWidth;
        this.isTouchDevice();
    }
    VerticalMenuComponent.prototype.ngOnInit = function () {
        this.menuItems = _vertical_menu_routes_config__WEBPACK_IMPORTED_MODULE_0__.ROUTES;
    };
    VerticalMenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.configSub = this.configService.templateConf$.subscribe(function (templateConf) {
            if (templateConf) {
                _this.config = templateConf;
            }
            _this.loadLayout();
            _this.cdr.markForCheck();
        });
        this.layoutSub = this.layoutService.overlaySidebarToggle$.subscribe(function (collapse) {
            if (_this.config.layout.menuPosition === "Side") {
                _this.collapseSidebar = collapse;
            }
        });
    };
    VerticalMenuComponent.prototype.onWindowResize = function (event) {
        var _this = this;
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout((function () {
            _this.innerWidth = event.target.innerWidth;
            _this.loadLayout();
        }).bind(this), 500);
    };
    VerticalMenuComponent.prototype.loadLayout = function () {
        if (this.config.layout.menuPosition === "Top") { // Horizontal Menu
            if (this.innerWidth < 1200) { // Screen size < 1200
                this.menuItems = _horizontal_menu_navigation_routes_config__WEBPACK_IMPORTED_MODULE_1__.HROUTES;
            }
        }
        else if (this.config.layout.menuPosition === "Side") { // Vertical Menu{
            this.menuItems = _vertical_menu_routes_config__WEBPACK_IMPORTED_MODULE_0__.ROUTES;
        }
        if (this.config.layout.sidebar.backgroundColor === 'white') {
            this.logoUrl = 'assets/img/logo-dark.png';
        }
        else {
            this.logoUrl = 'assets/img/logo.png';
        }
        if (this.config.layout.sidebar.collapsed) {
            this.collapseSidebar = true;
        }
        else {
            this.collapseSidebar = false;
        }
    };
    VerticalMenuComponent.prototype.toggleSidebar = function () {
        var _this = this;
        var conf = this.config;
        conf.layout.sidebar.collapsed = !this.config.layout.sidebar.collapsed;
        this.configService.applyTemplateConfigChange({ layout: conf.layout });
        setTimeout(function () {
            _this.fireRefreshEventOnWindow();
        }, 300);
    };
    VerticalMenuComponent.prototype.CloseSidebar = function () {
        this.layoutService.toggleSidebarSmallScreen(false);
    };
    VerticalMenuComponent.prototype.isTouchDevice = function () {
        var isMobile = this.deviceService.isMobile();
        var isTablet = this.deviceService.isTablet();
        if (isMobile || isTablet) {
            this.perfectScrollbarEnable = false;
        }
        else {
            this.perfectScrollbarEnable = true;
        }
    };
    VerticalMenuComponent.prototype.ngOnDestroy = function () {
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
        if (this.configSub) {
            this.configSub.unsubscribe();
        }
    };
    VerticalMenuComponent.ɵfac = function VerticalMenuComponent_Factory(t) { return new (t || VerticalMenuComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_layout_service__WEBPACK_IMPORTED_MODULE_3__.LayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_4__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](ngx_device_detector__WEBPACK_IMPORTED_MODULE_11__.DeviceDetectorService)); };
    VerticalMenuComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: VerticalMenuComponent, selectors: [["app-sidebar"]], viewQuery: function VerticalMenuComponent_Query(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5);
        } if (rf & 2) {
            var _t = void 0;
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
    return VerticalMenuComponent;
}());



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
var environment = {
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
//# sourceMappingURL=main.js.map