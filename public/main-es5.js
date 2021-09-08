(function () {
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkapex_admin"] = self["webpackChunkapex_admin"] || []).push([["main"], {
    /***/
    98255: function _(module) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = 98255;
      module.exports = webpackEmptyAsyncContext;
      /***/
    },

    /***/
    13190: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppRoutingModule": function AppRoutingModule() {
          return (
            /* binding */
            _AppRoutingModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/router */
      3984);
      /* harmony import */


      var _layouts_full_full_layout_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./layouts/full/full-layout.component */
      20348);
      /* harmony import */


      var _layouts_content_content_layout_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./layouts/content/content-layout.component */
      11391);
      /* harmony import */


      var _shared_routes_full_layout_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./shared/routes/full-layout.routes */
      45400);
      /* harmony import */


      var _shared_routes_content_layout_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./shared/routes/content-layout.routes */
      95180);
      /* harmony import */


      var _shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./shared/auth/auth-guard.service */
      16929);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var appRoutes = [{
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
      }, {
        path: "",
        component: _layouts_full_full_layout_component__WEBPACK_IMPORTED_MODULE_0__.FullLayoutComponent,
        data: {
          title: "full Views"
        },
        children: _shared_routes_full_layout_routes__WEBPACK_IMPORTED_MODULE_2__.Full_ROUTES,
        canActivate: [_shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_4__.AuthGuard]
      }, {
        path: "",
        component: _layouts_content_content_layout_component__WEBPACK_IMPORTED_MODULE_1__.ContentLayoutComponent,
        data: {
          title: "content Views"
        },
        children: _shared_routes_content_layout_routes__WEBPACK_IMPORTED_MODULE_3__.CONTENT_ROUTES
      }, {
        path: "**",
        redirectTo: "error"
      }];

      var _AppRoutingModule = function _AppRoutingModule() {
        _classCallCheck(this, _AppRoutingModule);
      };

      _AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
        return new (t || _AppRoutingModule)();
      };

      _AppRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
        type: _AppRoutingModule
      });
      _AppRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forRoot(appRoutes, {
          preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_6__.PreloadAllModules,
          relativeLinkResolution: "legacy"
        })], _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](_AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    37355: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppComponent": function AppComponent() {
          return (
            /* binding */
            _AppComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      3984);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs/operators */
      45435);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _AppComponent = /*#__PURE__*/function () {
        function _AppComponent(router) {
          _classCallCheck(this, _AppComponent);

          this.router = router;
        }

        _createClass(_AppComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.subscription = this.router.events.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.filter)(function (event) {
              return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__.NavigationEnd;
            })).subscribe(function () {
              return window.scrollTo(0, 0);
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.subscription) {
              this.subscription.unsubscribe();
            }
          }
        }]);

        return _AppComponent;
      }();

      _AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || _AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router));
      };

      _AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _AppComponent,
        selectors: [["app-root"]],
        decls: 1,
        vars: 0,
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "router-outlet");
          }
        },
        directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
        encapsulation: 2
      });
      /***/
    },

    /***/
    42573: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "createTranslateLoader": function createTranslateLoader() {
          return (
            /* binding */
            _createTranslateLoader
          );
        },

        /* harmony export */
        "AppModule": function AppModule() {
          return (
            /* binding */
            _AppModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @angular/platform-browser/animations */
      27094);
      /* harmony import */


      var _angular_fire__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @angular/fire */
      77667);
      /* harmony import */


      var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! @angular/fire/auth */
      2552);
      /* harmony import */


      var _agm_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! @agm/core */
      66047);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/common/http */
      58497);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! @ngx-translate/core */
      75629);
      /* harmony import */


      var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ngx-translate/http-loader */
      93555);
      /* harmony import */


      var ngx_spinner__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! ngx-spinner */
      79866);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/platform-browser */
      91211);
      /* harmony import */


      var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ngx-perfect-scrollbar */
      99904);
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./app-routing.module */
      13190);
      /* harmony import */


      var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./shared/shared.module */
      8421);
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app.component */
      37355);
      /* harmony import */


      var _layouts_content_content_layout_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./layouts/content/content-layout.component */
      11391);
      /* harmony import */


      var _layouts_full_full_layout_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./layouts/full/full-layout.component */
      20348);
      /* harmony import */


      var _shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./shared/auth/auth.service */
      6008);
      /* harmony import */


      var _shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./shared/auth/auth-guard.service */
      16929);
      /* harmony import */


      var _shared_services_window_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./shared/services/window.service */
      28370);
      /* harmony import */


      var _shared_auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./shared/auth/auth.interceptor */
      43209);
      /* harmony import */


      var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @fortawesome/angular-fontawesome */
      54163);
      /* harmony import */


      var angular_resizable_element__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! angular-resizable-element */
      72146);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/core */
      74788); // import { CombatComponent } from './components/combat/combat.component';
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
        measurementId: "YOUR_MEASUREMENT_ID" //YOUR_MEASUREMENT_ID

      };
      var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
        suppressScrollX: true,
        wheelPropagation: false
      };

      function _createTranslateLoader(http) {
        return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_9__.TranslateHttpLoader(http, "./assets/i18n/", ".json");
      }

      var _AppModule = function _AppModule() {
        _classCallCheck(this, _AppModule);
      };

      _AppModule.ɵfac = function AppModule_Factory(t) {
        return new (t || _AppModule)();
      };

      _AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({
        type: _AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent]
      });
      _AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({
        providers: [{
          provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HTTP_INTERCEPTORS,
          useClass: _shared_auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_8__.AuthInterceptor,
          multi: true
        }, _shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_5__.AuthService, _shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_6__.AuthGuard, {
          provide: ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_12__.PERFECT_SCROLLBAR_CONFIG,
          useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }, _shared_services_window_service__WEBPACK_IMPORTED_MODULE_7__.WINDOW_PROVIDERS],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_13__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__.BrowserAnimationsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClientModule, _angular_fire__WEBPACK_IMPORTED_MODULE_15__.AngularFireModule.initializeApp(firebaseConfig), _angular_fire_auth__WEBPACK_IMPORTED_MODULE_16__.AngularFireAuthModule, ngx_spinner__WEBPACK_IMPORTED_MODULE_17__.NgxSpinnerModule, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_18__.FontAwesomeModule, angular_resizable_element__WEBPACK_IMPORTED_MODULE_19__.ResizableModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__.TranslateModule.forRoot({
          loader: {
            provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__.TranslateLoader,
            useFactory: _createTranslateLoader,
            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClient]
          }
        }), _agm_core__WEBPACK_IMPORTED_MODULE_21__.AgmCoreModule.forRoot({
          apiKey: "YOUR_GOOGLE_MAP_API_KEY"
        }), ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_12__.PerfectScrollbarModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](_AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent, _layouts_full_full_layout_component__WEBPACK_IMPORTED_MODULE_4__.FullLayoutComponent, _layouts_content_content_layout_component__WEBPACK_IMPORTED_MODULE_3__.ContentLayoutComponent],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_13__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__.BrowserAnimationsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClientModule, _angular_fire__WEBPACK_IMPORTED_MODULE_15__.AngularFireModule, _angular_fire_auth__WEBPACK_IMPORTED_MODULE_16__.AngularFireAuthModule, ngx_spinner__WEBPACK_IMPORTED_MODULE_17__.NgxSpinnerModule, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_18__.FontAwesomeModule, angular_resizable_element__WEBPACK_IMPORTED_MODULE_19__.ResizableModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__.TranslateModule, _agm_core__WEBPACK_IMPORTED_MODULE_21__.AgmCoreModule, ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_12__.PerfectScrollbarModule]
        });
      })();
      /***/

    },

    /***/
    11391: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ContentLayoutComponent": function ContentLayoutComponent() {
          return (
            /* binding */
            _ContentLayoutComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      12057);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _angular_app_shared_services_config_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../angular/app/shared/services/config.service */
      47107);
      /* harmony import */


      var _angular_app_shared_services_customizer_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../angular/app/shared/services/customizer.service */
      90775);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      3984);

      var _c0 = ["content-wrapper"];

      var _ContentLayoutComponent = /*#__PURE__*/function () {
        function _ContentLayoutComponent(configService, document, renderer, cdr, customizerService) {
          _classCallCheck(this, _ContentLayoutComponent);

          this.configService = configService;
          this.document = document;
          this.renderer = renderer;
          this.cdr = cdr;
          this.customizerService = customizerService;
          this.config = {};
          this.config = this.configService.templateConf;
          this.renderer.addClass(this.document.body, "auth-page");
        }

        _createClass(_ContentLayoutComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            this.layoutSub = this.configService.templateConf$.subscribe(function (templateConf) {
              if (templateConf) {
                _this.config = templateConf;
              }

              _this.loadLayout();

              _this.cdr.markForCheck();
            });
          }
        }, {
          key: "loadLayout",
          value: function loadLayout() {
            this.removeTransparentBGClasses();

            if (this.config.layout.variant === "Light") {
              this.renderer.removeClass(this.document.body, "layout-dark");
              this.renderer.removeClass(this.document.body, "layout-transparent");
            } else if (this.config.layout.variant === "Dark") {
              this.renderer.removeClass(this.document.body, "layout-transparent");
              this.renderer.addClass(this.document.body, "layout-dark");
            } else if (this.config.layout.variant === "Transparent") {
              this.renderer.addClass(this.document.body, "layout-dark");
              this.renderer.addClass(this.document.body, "layout-transparent");
              this.renderer.addClass(this.document.body, this.config.layout.sidebar.backgroundColor);
            }

            this.renderer.removeClass(this.document.body, "menu-expanded");
            this.renderer.removeClass(this.document.body, "navbar-static");
            this.renderer.removeClass(this.document.body, "menu-open");
            this.renderer.addClass(this.document.body, "blank-page");
          }
        }, {
          key: "removeTransparentBGClasses",
          value: function removeTransparentBGClasses() {
            var _this2 = this;

            this.customizerService.transparent_colors.forEach(function (_) {
              _this2.renderer.removeClass(_this2.document.body, _["class"]);
            });
            this.customizerService.transparent_colors_with_shade.forEach(function (_) {
              _this2.renderer.removeClass(_this2.document.body, _["class"]);
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.renderer.removeClass(this.document.body, "auth-page");

            if (this.layoutSub) {
              this.layoutSub.unsubscribe();
            }
          }
        }]);

        return _ContentLayoutComponent;
      }();

      _ContentLayoutComponent.ɵfac = function ContentLayoutComponent_Factory(t) {
        return new (t || _ContentLayoutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_app_shared_services_config_service__WEBPACK_IMPORTED_MODULE_0__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_3__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_app_shared_services_customizer_service__WEBPACK_IMPORTED_MODULE_1__.CustomizerService));
      };

      _ContentLayoutComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _ContentLayoutComponent,
        selectors: [["app-content-layout"]],
        viewQuery: function ContentLayoutComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.wrapper = _t.first);
          }
        },
        decls: 6,
        vars: 0,
        consts: [[1, "wrapper"], [1, "main-panel"], [1, "main-content"], [1, "content-overlay"], [1, "content-wrapper", "p-0"]],
        template: function ContentLayoutComponent_Template(rf, ctx) {
          if (rf & 1) {
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
          }
        },
        directives: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterOutlet],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb250ZW50LWxheW91dC5jb21wb25lbnQuc2NzcyJ9 */"],
        changeDetection: 0
      });
      /***/
    },

    /***/
    20348: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FullLayoutComponent": function FullLayoutComponent() {
          return (
            /* binding */
            _FullLayoutComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/common */
      12057);
      /* harmony import */


      var _angular_app_shared_services_window_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../angular/app/shared/services/window.service */
      28370);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/router */
      3984);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! rxjs/operators */
      45435);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _angular_app_shared_services_config_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../angular/app/shared/services/config.service */
      47107);
      /* harmony import */


      var _angular_app_shared_services_layout_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../../angular/app/shared/services/layout.service */
      60432);
      /* harmony import */


      var _angular_app_shared_services_customizer_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../angular/app/shared/services/customizer.service */
      90775);
      /* harmony import */


      var ngx_device_detector__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ngx-device-detector */
      30730);
      /* harmony import */


      var _shared_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../shared/navbar/navbar.component */
      96319);
      /* harmony import */


      var _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../shared/footer/footer.component */
      26590);
      /* harmony import */


      var _shared_notification_sidebar_notification_sidebar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../shared/notification-sidebar/notification-sidebar.component */
      9856);
      /* harmony import */


      var _shared_directives_sidebar_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../shared/directives/sidebar.directive */
      17618);
      /* harmony import */


      var _shared_vertical_menu_vertical_menu_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../shared/vertical-menu/vertical-menu.component */
      70644);

      var _c0 = function _c0(a0) {
        return {
          "background-image": a0
        };
      };

      function FullLayoutComponent_div_2_div_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "div", 12);
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](1, _c0, "url(" + ctx_r2.bgImage + ")"));
        }
      }

      var _c1 = function _c1(a0, a1, a2) {
        return {
          "main-menu": a0,
          "menu-fixed": a1,
          "menu-native-scroll": a2
        };
      };

      function FullLayoutComponent_div_2_Template(rf, ctx) {
        if (rf & 1) {
          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("mouseenter", function FullLayoutComponent_div_2_Template_div_mouseenter_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r4);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r3.sidebarMouseenter($event);
          })("mouseleave", function FullLayoutComponent_div_2_Template_div_mouseleave_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r4);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r5.sidebarMouseleave($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-sidebar");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, FullLayoutComponent_div_2_div_2_Template, 1, 3, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction3"](4, _c1, ctx_r0.menuPosition === "Side" || ctx_r0.displayOverlayMenu, ctx_r0.menuPosition === "Side" || ctx_r0.displayOverlayMenu, !ctx_r0.perfectScrollbarEnable));

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("data-background-color", (ctx_r0.config == null ? null : ctx_r0.config.layout.variant) === "Transparent" ? "black" : ctx_r0.bgColor)("data-image", ctx_r0.bgImage);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r0.config == null ? null : ctx_r0.config.layout.sidebar.backgroundImage);
        }
      }

      function FullLayoutComponent_button_9_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "button", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function FullLayoutComponent_button_9_Template_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r6.scrollToTop();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "i", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }
      }

      var _c2 = function _c2(a0) {
        return {
          "show-overlay": a0
        };
      };

      var _c3 = function _c3(a0, a1) {
        return {
          "d-none": a0,
          "d-block": a1
        };
      };

      var _FullLayoutComponent = /*#__PURE__*/function () {
        function _FullLayoutComponent(configService, layoutService, router, customizerService, document, window, renderer, cdr, deviceService) {
          var _this3 = this;

          _classCallCheck(this, _FullLayoutComponent);

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
          this.innerWidth = window.innerWidth; // On toggle sidebar menu

          this.layoutSub = layoutService.toggleSidebar$.subscribe(function (isShow) {
            _this3.hideSidebar = !isShow;

            if (_this3.hideSidebar) {
              _this3.overlayContent = false;
            } else {
              _this3.overlayContent = true;
            }

            _this3.toggleSidebar();
          });
        }

        _createClass(_FullLayoutComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this4 = this;

            this.configSub = this.configService.templateConf$.subscribe(function (templateConf) {
              if (templateConf) {
                _this4.config = templateConf;
              } //load layout


              _this4.loadLayout();

              _this4.cdr.markForCheck();
            }); //hide overlay class on router change

            this.router.events.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.filter)(function (event) {
              return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_11__.NavigationEnd;
            })).subscribe(function (routeChange) {
              if (_this4.config.layout.menuPosition === "Side" || _this4.displayOverlayMenu) {
                // Vertical Menu
                if (_this4.innerWidth < 1200) {
                  _this4.layoutService.toggleSidebarSmallScreen(false);

                  _this4.overlayContent = false;

                  _this4.renderer.removeClass(_this4.document.body, "overflow-hidden");
                }
              }
            });
          }
        }, {
          key: "ngAfterViewInit",
          value: function ngAfterViewInit() {
            this.setMenuLayout();
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            //Unsubcribe subscriptions
            if (this.configSub) {
              this.configSub.unsubscribe();
            }

            if (this.layoutSub) {
              this.layoutSub.unsubscribe();
            }
          } //adjust layout

        }, {
          key: "setMenuLayout",
          value: function setMenuLayout() {
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
              } else {
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
            } else if (this.config.layout.menuPosition === "Side") {
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
              } else {
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
        }, {
          key: "loadLayout",
          value: function loadLayout() {
            //menu position "SIDE" or "TOP"
            if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != "") {
              this.menuPosition = this.config.layout.menuPosition;
            } //Hide/show sidebar menu background image


            if (!this.config.layout.sidebar.backgroundImage) {
              this.bgImage = "";
            } else {
              this.bgImage = this.config.layout.sidebar.backgroundImageURL;
            } //Set sidebar menu background color


            if (!this.config.layout.sidebar.backgroundColor) {
              this.bgColor = this.customizerService.light_dark_colors[7].code;
            } else {
              this.bgColor = this.config.layout.sidebar.backgroundColor;
            } //toggle side menu


            if (this.config.layout.menuPosition === "Side") {
              if (this.config.layout.sidebar.collapsed) {
                this.isMenuCollapsedOnHover = true;
              } else {
                this.isMenuCollapsedOnHover = true;
              }

              this.toggleSidebar();
            }

            this.removeTransparentBGClasses(); // Layout variants

            if (this.config.layout.variant === "Light") {
              this.renderer.removeClass(this.document.body, "layout-dark");
              this.renderer.removeClass(this.document.body, "layout-transparent");
            } else if (this.config.layout.variant === "Dark") {
              this.renderer.removeClass(this.document.body, "layout-transparent");
              this.renderer.addClass(this.document.body, "layout-dark");
            } else if (this.config.layout.variant === "Transparent") {
              this.renderer.addClass(this.document.body, "layout-dark");
              this.renderer.addClass(this.document.body, "layout-transparent");
              this.renderer.addClass(this.document.body, this.bgColor);
              this.bgImage = "";
            }

            this.setMenuLayout(); // For Sidebar width

            if (this.config.layout.sidebar.size === "sidebar-sm") {
              this.renderer.removeClass(this.document.body, "sidebar-lg");
              this.renderer.addClass(this.document.body, "sidebar-sm");
            } else if (this.config.layout.sidebar.size === "sidebar-lg") {
              this.renderer.removeClass(this.document.body, "sidebar-sm");
              this.renderer.addClass(this.document.body, "sidebar-lg");
            } else {
              this.renderer.removeClass(this.document.body, "sidebar-sm");
              this.renderer.removeClass(this.document.body, "sidebar-lg");
            }

            if (this.config.layout.menuPosition === "Side") {
              // vertical/Side menu expanded/collapse
              if (this.config.layout.sidebar.collapsed && !this.isSmallScreen) {
                // collapse side menu
                this.renderer.removeClass(this.document.body, "menu-expanded");
                this.renderer.addClass(this.document.body, "nav-collapsed");
              } else {
                // expand side menu
                this.renderer.removeClass(this.document.body, "nav-collapsed");
                this.renderer.addClass(this.document.body, "menu-expanded");
              }
            } //Navbar types


            if (this.config.layout.navbar.type === "Static") {
              this.renderer.removeClass(this.document.body, "navbar-sticky");
              this.renderer.addClass(this.document.body, "navbar-static");
            } else if (this.config.layout.navbar.type === "Fixed") {
              this.renderer.removeClass(this.document.body, "navbar-static");
              this.renderer.addClass(this.document.body, "navbar-sticky");
            }
          }
        }, {
          key: "toggleSidebar",
          value: function toggleSidebar() {
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
            } else {
              // on sidebar expand
              this.renderer.addClass(this.document.body, "vertical-layout");
              this.renderer.addClass(this.document.body, "menu-expanded");
              this.renderer.addClass(this.document.body, "vertical-menu");

              if (this.config.layout.sidebar.collapsed) {
                this.renderer.removeClass(this.document.body, "menu-open");
              } else {
                this.renderer.addClass(this.document.body, "menu-open");
              }

              this.renderer.removeClass(this.document.body, "menu-hide");
            }

            this.isTouchDevice();
          }
        }, {
          key: "isTouchDevice",
          value: function isTouchDevice() {
            var isMobile = this.deviceService.isMobile();
            var isTablet = this.deviceService.isTablet();

            if (isMobile || isTablet) {
              if (!this.hideSidebar) {
                this.renderer.addClass(this.document.body, "overflow-hidden");
              } else {
                this.renderer.removeClass(this.document.body, "overflow-hidden");
              }
            }
          }
        }, {
          key: "hideCompactMenuOnSmallScreen",
          value: function hideCompactMenuOnSmallScreen() {
            if (this.innerWidth < 1200) {
              var conf = this.config;
              conf.layout.sidebar.collapsed = false;
              this.configService.applyTemplateConfigChange({
                layout: conf.layout
              });
            }
          } //Remove transparent layout classes

        }, {
          key: "removeTransparentBGClasses",
          value: function removeTransparentBGClasses() {
            var _this5 = this;

            this.customizerService.transparent_colors.forEach(function (_) {
              _this5.renderer.removeClass(_this5.document.body, _["class"]);
            });
            this.customizerService.transparent_colors_with_shade.forEach(function (_) {
              _this5.renderer.removeClass(_this5.document.body, _["class"]);
            });
          }
        }, {
          key: "sidebarMouseenter",
          value: function sidebarMouseenter(e) {
            if (this.config.layout.sidebar.collapsed) {
              this.isMenuCollapsedOnHover = false;
              this.layoutService.overlaySidebartoggle(this.isMenuCollapsedOnHover);
            }
          }
        }, {
          key: "sidebarMouseleave",
          value: function sidebarMouseleave(e) {
            if (this.config.layout.sidebar.collapsed) {
              this.isMenuCollapsedOnHover = true;
              this.layoutService.overlaySidebartoggle(this.isMenuCollapsedOnHover);
            }
          } //scroll to top on click

        }, {
          key: "scrollToTop",
          value: function scrollToTop() {
            window.scroll({
              top: 0,
              left: 0,
              behavior: "smooth"
            });
          }
        }, {
          key: "onOutsideClick",
          value: function onOutsideClick(e) {
            if (this.innerWidth < 1200) {
              if (!e.target.classList.contains("toggleSidebarNavbarButton")) {
                this.layoutService.toggleSidebarSmallScreen(false);
              }
            }
          }
        }, {
          key: "onWrapperClick",
          value: function onWrapperClick() {
            this.isNavbarSeachTextEmpty = true;
          }
        }, {
          key: "checkNavbarSeachTextEmpty",
          value: function checkNavbarSeachTextEmpty($event) {
            this.isNavbarSeachTextEmpty = $event;
          }
        }, {
          key: "onResize",
          value: function onResize(event) {
            var _this6 = this;

            if (this.resizeTimeout) {
              clearTimeout(this.resizeTimeout);
            }

            this.resizeTimeout = setTimeout(function () {
              _this6.innerWidth = event.target.innerWidth;

              _this6.setMenuLayout();

              _this6.hideCompactMenuOnSmallScreen();
            }.bind(this), 500);
          } //Add/remove classes on page scroll

        }, {
          key: "onWindowScroll",
          value: function onWindowScroll() {
            var number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;

            if (number > 60) {
              this.renderer.addClass(this.document.body, "navbar-scrolled");
            } else {
              this.renderer.removeClass(this.document.body, "navbar-scrolled");
            }

            if (number > 400) {
              this.isScrollTopVisible = true;
            } else {
              this.isScrollTopVisible = false;
            }

            if (number > 20) {
              this.renderer.addClass(this.document.body, "page-scrolled");
            } else {
              this.renderer.removeClass(this.document.body, "page-scrolled");
            }
          }
        }]);

        return _FullLayoutComponent;
      }();

      _FullLayoutComponent.ɵfac = function FullLayoutComponent_Factory(t) {
        return new (t || _FullLayoutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_app_shared_services_config_service__WEBPACK_IMPORTED_MODULE_1__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_app_shared_services_layout_service__WEBPACK_IMPORTED_MODULE_2__.LayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_app_shared_services_customizer_service__WEBPACK_IMPORTED_MODULE_3__.CustomizerService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_12__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_app_shared_services_window_service__WEBPACK_IMPORTED_MODULE_0__.WINDOW), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](ngx_device_detector__WEBPACK_IMPORTED_MODULE_13__.DeviceDetectorService));
      };

      _FullLayoutComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
        type: _FullLayoutComponent,
        selectors: [["app-full-layout"]],
        hostBindings: function FullLayoutComponent_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("resize", function FullLayoutComponent_resize_HostBindingHandler($event) {
              return ctx.onResize($event);
            }, false, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresolveWindow"])("scroll", function FullLayoutComponent_scroll_HostBindingHandler() {
              return ctx.onWindowScroll();
            }, false, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresolveWindow"]);
          }
        },
        decls: 13,
        vars: 9,
        consts: [[3, "seachTextEmpty"], [1, "wrapper", 3, "ngClass", "click", "resize"], ["appSidebar", "", "class", "app-sidebar", "data-active-color", "white", 3, "ngClass", "mouseenter", "mouseleave", 4, "ngIf"], [1, "main-panel"], [1, "main-content"], [1, "content-overlay"], [1, "content-wrapper"], ["class", "btn btn-primary scroll-top", "type", "button", 3, "click", 4, "ngIf"], [1, "sidenav-overlay", 3, "ngClass", "click"], [1, "drag-target"], ["appSidebar", "", "data-active-color", "white", 1, "app-sidebar", 3, "ngClass", "mouseenter", "mouseleave"], ["class", "sidebar-background", 3, "ngStyle", 4, "ngIf"], [1, "sidebar-background", 3, "ngStyle"], ["type", "button", 1, "btn", "btn-primary", "scroll-top", 3, "click"], [1, "ft-arrow-up"]],
        template: function FullLayoutComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-navbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("seachTextEmpty", function FullLayoutComponent_Template_app_navbar_seachTextEmpty_0_listener($event) {
              return ctx.checkNavbarSeachTextEmpty($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function FullLayoutComponent_Template_div_click_1_listener() {
              return ctx.onWrapperClick();
            })("resize", function FullLayoutComponent_Template_div_resize_1_listener($event) {
              return ctx.onResize($event);
            }, false, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresolveWindow"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, FullLayoutComponent_div_2_Template, 3, 8, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](7, "router-outlet");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](8, "app-footer");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](9, FullLayoutComponent_button_9_Template, 2, 0, "button", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](10, "app-notification-sidebar");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function FullLayoutComponent_Template_div_click_11_listener($event) {
              return ctx.onOutsideClick($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](12, "div", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](4, _c2, !ctx.isNavbarSeachTextEmpty));

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.menuPosition === "Side" || ctx.displayOverlayMenu);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.isScrollTopVisible);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction2"](6, _c3, ctx.displayOverlayMenu && ctx.hideSidebar && !ctx.overlayContent, ctx.displayOverlayMenu && !ctx.hideSidebar && ctx.overlayContent && ctx.innerWidth < 1200));
          }
        },
        directives: [_shared_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__.NavbarComponent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterOutlet, _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_5__.FooterComponent, _shared_notification_sidebar_notification_sidebar_component__WEBPACK_IMPORTED_MODULE_6__.NotificationSidebarComponent, _shared_directives_sidebar_directive__WEBPACK_IMPORTED_MODULE_7__.SidebarDirective, _shared_vertical_menu_vertical_menu_component__WEBPACK_IMPORTED_MODULE_8__.VerticalMenuComponent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgStyle],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmdWxsLWxheW91dC5jb21wb25lbnQuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    27284: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "Region": function Region() {
          return (
            /* binding */
            _Region
          );
        }
        /* harmony export */

      });

      var _Region = function _Region() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, _Region);

        this.feature_types = [];
        this.prof_balance = [];
        this.racial_balance = [];
        this.linked = false;
        data = !!data ? data : {};
        if (data.feature_types == null) data.feature_types = [];
        Object.assign(this, data);
      };
      /***/

    },

    /***/
    53187: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "World": function World() {
          return (
            /* binding */
            _World
          );
        },

        /* harmony export */
        "Npc": function Npc() {
          return (
            /* binding */
            _Npc
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _region__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./region */
      27284);

      var _World = function _World() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, _World);

        data = !!data ? data : {};
        Object.assign(this, data);

        if (typeof this.regions != "undefined") {
          console.log(this.regions);
          this.regions = this.regions.map(function (r) {
            return new _region__WEBPACK_IMPORTED_MODULE_0__.Region(r);
          });
        }
      };

      var _Npc = function _Npc() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, _Npc);

        this.alive = 1;
        data = !!data ? data : {};
        Object.assign(this, data);
      };
      /***/

    },

    /***/
    56681: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "customAnimations": function customAnimations() {
          return (
            /* binding */
            _customAnimations
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/animations */
      56083);

      var _customAnimations = [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('slideInOut', [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('1', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        height: '*'
      })), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('0', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        height: '0px'
      })), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('1 <=> 0', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)(200))])];
      /***/
    },

    /***/
    16929: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AuthGuard": function AuthGuard() {
          return (
            /* binding */
            _AuthGuard
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _services_token_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../services/token.service */
      80723);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      3984);

      var _AuthGuard = /*#__PURE__*/function () {
        function _AuthGuard(tokenService, router) {
          _classCallCheck(this, _AuthGuard);

          this.tokenService = tokenService;
          this.router = router;
        }

        _createClass(_AuthGuard, [{
          key: "canActivate",
          value: function canActivate(route, state) {
            var isAuth = this.tokenService.isLoggedIn();

            if (!isAuth) {
              this.router.navigate(['/login']);
            } else {
              return true;
            }
          }
        }, {
          key: "canLoad",
          value: function canLoad(route, state) {
            var isAuth = this.tokenService.isLoggedIn();

            if (!isAuth) {
              this.router.navigate(['/login']);
            } else {
              return true;
            }
          }
        }]);

        return _AuthGuard;
      }();

      _AuthGuard.ɵfac = function AuthGuard_Factory(t) {
        return new (t || _AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_token_service__WEBPACK_IMPORTED_MODULE_0__.TokenService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
      };

      _AuthGuard.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _AuthGuard,
        factory: _AuthGuard.ɵfac
      });
      /***/
    },

    /***/
    43209: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AuthInterceptor": function AuthInterceptor() {
          return (
            /* binding */
            _AuthInterceptor
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _services_token_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../services/token.service */
      80723);

      var _AuthInterceptor = /*#__PURE__*/function () {
        function _AuthInterceptor(tokenService) {
          _classCallCheck(this, _AuthInterceptor);

          this.tokenService = tokenService;
        }

        _createClass(_AuthInterceptor, [{
          key: "intercept",
          value: function intercept(req, next) {
            var accessToken = this.tokenService.getToken();
            req = req.clone({
              setHeaders: {
                Authorization: "Bearer " + accessToken
              }
            });
            return next.handle(req);
          }
        }]);

        return _AuthInterceptor;
      }();

      _AuthInterceptor.ɵfac = function AuthInterceptor_Factory(t) {
        return new (t || _AuthInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_token_service__WEBPACK_IMPORTED_MODULE_0__.TokenService));
      };

      _AuthInterceptor.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _AuthInterceptor,
        factory: _AuthInterceptor.ɵfac
      });
      /***/
    },

    /***/
    6008: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AuthService": function AuthService() {
          return (
            /* binding */
            _AuthService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs/operators */
      78345);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/fire/auth */
      2552);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common/http */
      58497);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      3984);

      var _AuthService = /*#__PURE__*/function () {
        function _AuthService(_firebaseAuth, http, router) {
          var _this7 = this;

          _classCallCheck(this, _AuthService);

          this._firebaseAuth = _firebaseAuth;
          this.http = http;
          this.router = router;
          this.userDetails = null;
          this.user = _firebaseAuth.authState;
          this.user.subscribe(function (user) {
            if (user) {
              _this7.userDetails = user;
            } else {
              _this7.userDetails = null;
            }
          });
        }

        _createClass(_AuthService, [{
          key: "signupUser",
          value: function signupUser(value) {
            //your code for signing up the new user
            console.log(value);
            var body = {
              email: value.email,
              password: value.password
            };
            var call = this.http.post('/api/auth/register', value).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.share)());
            return call;
          }
        }, {
          key: "signinUser",
          value: function signinUser(email, password) {
            //your code for checking credentials and getting tokens for for signing in user
            // return this._firebaseAuth.signInWithEmailAndPassword(email, password)
            var body = {
              email: email,
              password: password
            };
            var call = this.http.post('/api/auth/login', body).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.share)());
            return call;
          }
        }, {
          key: "logout",
          value: function logout() {
            // this._firebaseAuth.signOut();
            this.router.navigate(['/logout']);
          }
        }, {
          key: "isAuthenticated",
          value: function isAuthenticated() {
            return true;
          }
        }]);

        return _AuthService;
      }();

      _AuthService.ɵfac = function AuthService_Factory(t) {
        return new (t || _AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__.AngularFireAuth), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
      };

      _AuthService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _AuthService,
        factory: _AuthService.ɵfac
      });
      /***/
    },

    /***/
    33507: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AutocompleteContentDirective": function AutocompleteContentDirective() {
          return (
            /* binding */
            _AutocompleteContentDirective
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _AutocompleteContentDirective = function _AutocompleteContentDirective(tpl) {
        _classCallCheck(this, _AutocompleteContentDirective);

        this.tpl = tpl;
      };

      _AutocompleteContentDirective.ɵfac = function AutocompleteContentDirective_Factory(t) {
        return new (t || _AutocompleteContentDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef));
      };

      _AutocompleteContentDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
        type: _AutocompleteContentDirective,
        selectors: [["", "appAutocompleteContent", ""]]
      });
      /***/
    },

    /***/
    84678: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AutocompleteComponent": function AutocompleteComponent() {
          return (
            /* binding */
            _AutocompleteComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./autocomplete-content.directive */
      33507);
      /* harmony import */


      var _option_option_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./option/option.component */
      21979);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      43190);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs */
      66682);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      12057);

      var _c0 = ["root"];

      function AutocompleteComponent_ng_template_0_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](0);
        }
      }

      function AutocompleteComponent_ng_template_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, AutocompleteComponent_ng_template_0_ng_container_1_Template, 1, 0, "ng-container", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.content ? ctx_r1.content.tpl : null);
        }
      }

      var _AutocompleteComponent = /*#__PURE__*/function () {
        function _AutocompleteComponent() {
          _classCallCheck(this, _AutocompleteComponent);
        }

        _createClass(_AutocompleteComponent, [{
          key: "optionsClick",
          value: function optionsClick() {
            return this.options.changes.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(function (options) {
              var clicks$ = options.map(function (option) {
                return option.click$;
              });
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_4__.merge).apply(void 0, _toConsumableArray(clicks$));
            }));
          }
        }]);

        return _AutocompleteComponent;
      }();

      _AutocompleteComponent.ɵfac = function AutocompleteComponent_Factory(t) {
        return new (t || _AutocompleteComponent)();
      };

      _AutocompleteComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _AutocompleteComponent,
        selectors: [["app-autocomplete"]],
        contentQueries: function AutocompleteComponent_ContentQueries(rf, ctx, dirIndex) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵcontentQuery"](dirIndex, _autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_0__.AutocompleteContentDirective, 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵcontentQuery"](dirIndex, _option_option_component__WEBPACK_IMPORTED_MODULE_1__.OptionComponent, 4);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.options = _t);
          }
        },
        viewQuery: function AutocompleteComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.rootTemplate = _t.first);
          }
        },
        exportAs: ["appAutocomplete"],
        decls: 2,
        vars: 0,
        consts: [["root", ""], [1, "autocomplete", "search-list"], [4, "ngTemplateOutlet"]],
        template: function AutocompleteComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, AutocompleteComponent_ng_template_0_Template, 2, 1, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgTemplateOutlet],
        styles: [".autocomplete[_ngcontent-%COMP%] {\n  width: 100%;\n  display: block;\n}\n\n.search-list[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background: #ffffff;\n  width: 100%;\n  margin-top: 1rem;\n  padding-left: 0;\n  border-radius: 0.267rem;\n  z-index: 1200;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dG9jb21wbGV0ZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsU0FBUztFQUNULE9BQU87RUFDUCxtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLGFBQWE7QUFDZiIsImZpbGUiOiJhdXRvY29tcGxldGUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hdXRvY29tcGxldGUge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5zZWFyY2gtbGlzdCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxMDAlO1xuICBsZWZ0OiAwO1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgcGFkZGluZy1sZWZ0OiAwO1xuICBib3JkZXItcmFkaXVzOiAwLjI2N3JlbTtcbiAgei1pbmRleDogMTIwMDtcbn1cbiJdfQ== */"]
      });
      /***/
    },

    /***/
    344: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AutocompleteDirective": function AutocompleteDirective() {
          return (
            /* binding */
            _AutocompleteDirective
          );
        },

        /* harmony export */
        "overlayClickOutside": function overlayClickOutside() {
          return (
            /* binding */
            _overlayClickOutside
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      22759);
      /* harmony import */


      var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/cdk/overlay */
      933);
      /* harmony import */


      var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/cdk/portal */
      2414);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      46782);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      45435);
      /* harmony import */


      var ngx_take_until_destroy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ngx-take-until-destroy */
      71363);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      3984);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/forms */
      24751);

      var _AutocompleteDirective = /*#__PURE__*/function () {
        function _AutocompleteDirective(host, ngControl, vcr, overlay, router) {
          _classCallCheck(this, _AutocompleteDirective);

          this.host = host;
          this.ngControl = ngControl;
          this.vcr = vcr;
          this.overlay = overlay;
          this.router = router;
        }

        _createClass(_AutocompleteDirective, [{
          key: "control",
          get: function get() {
            return this.ngControl.control;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this8 = this;

            (0, rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(this.origin, "focus").pipe((0, ngx_take_until_destroy__WEBPACK_IMPORTED_MODULE_1__.untilDestroyed)(this)).subscribe(function () {
              _this8.openDropdown();

              _this8.appAutocomplete.optionsClick().pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(_this8.overlayRef.detachments())).subscribe(function (value) {
                _this8.control.setValue(value);

                _this8.close();
              });
            });
            this.router.events.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.filter)(function (event) {
              return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__.NavigationEnd;
            })).subscribe(function (routeChange) {
              _this8.close();
            });
          }
        }, {
          key: "openDropdown",
          value: function openDropdown() {
            var _this9 = this;

            this.close();
            this.overlayRef = this.overlay.create({
              width: this.origin.offsetWidth,
              maxHeight: 40 * 3,
              backdropClass: "",
              scrollStrategy: this.overlay.scrollStrategies.reposition(),
              positionStrategy: this.getOverlayPosition()
            });
            var template = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__.TemplatePortal(this.appAutocomplete.rootTemplate, this.vcr);
            this.overlayRef.attach(template);

            _overlayClickOutside(this.overlayRef, this.origin).subscribe(function () {
              return _this9.close();
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {}
        }, {
          key: "close",
          value: function close() {
            if (this.overlayRef) {
              this.overlayRef.detach();
            }

            this.overlayRef = null;
          }
        }, {
          key: "getOverlayPosition",
          value: function getOverlayPosition() {
            var positions = [new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__.ConnectionPositionPair({
              originX: "start",
              originY: "bottom"
            }, {
              overlayX: "start",
              overlayY: "top"
            }), new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__.ConnectionPositionPair({
              originX: "start",
              originY: "top"
            }, {
              overlayX: "start",
              overlayY: "bottom"
            })];
            return this.overlay.position().flexibleConnectedTo(this.origin).withPositions(positions).withFlexibleDimensions(false).withPush(false);
          }
        }, {
          key: "origin",
          get: function get() {
            return this.host.nativeElement;
          }
        }]);

        return _AutocompleteDirective;
      }();

      _AutocompleteDirective.ɵfac = function AutocompleteDirective_Factory(t) {
        return new (t || _AutocompleteDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControl), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_6__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
      };

      _AutocompleteDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineDirective"]({
        type: _AutocompleteDirective,
        selectors: [["", "appAutocomplete", ""]],
        inputs: {
          appAutocomplete: "appAutocomplete"
        }
      });

      function _overlayClickOutside(overlayRef, origin) {
        return (0, rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(document, "click").pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.filter)(function (event) {
          var clickTarget = event.target;
          var notOrigin = clickTarget !== origin; // the input

          var notOverlay = !!overlayRef && overlayRef.overlayElement.contains(clickTarget) === false; // the autocomplete

          return notOrigin && notOverlay;
        }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(overlayRef.detachments()));
      }
      /***/

    },

    /***/
    31977: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AutocompleteModule": function AutocompleteModule() {
          return (
            /* binding */
            _AutocompleteModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      12057);
      /* harmony import */


      var _autocomplete_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./autocomplete.component */
      84678);
      /* harmony import */


      var _autocomplete_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./autocomplete.directive */
      344);
      /* harmony import */


      var _autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./autocomplete-content.directive */
      33507);
      /* harmony import */


      var _option_option_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./option/option.component */
      21979);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var publicApi = [_autocomplete_component__WEBPACK_IMPORTED_MODULE_0__.AutocompleteComponent, _autocomplete_directive__WEBPACK_IMPORTED_MODULE_1__.AutocompleteDirective, _autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_2__.AutocompleteContentDirective, _option_option_component__WEBPACK_IMPORTED_MODULE_3__.OptionComponent];

      var _AutocompleteModule = function _AutocompleteModule() {
        _classCallCheck(this, _AutocompleteModule);
      };

      _AutocompleteModule.ɵfac = function AutocompleteModule_Factory(t) {
        return new (t || _AutocompleteModule)();
      };

      _AutocompleteModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
        type: _AutocompleteModule
      });
      _AutocompleteModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](_AutocompleteModule, {
          declarations: [_autocomplete_component__WEBPACK_IMPORTED_MODULE_0__.AutocompleteComponent, _autocomplete_directive__WEBPACK_IMPORTED_MODULE_1__.AutocompleteDirective, _autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_2__.AutocompleteContentDirective, _option_option_component__WEBPACK_IMPORTED_MODULE_3__.OptionComponent],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule],
          exports: [_autocomplete_component__WEBPACK_IMPORTED_MODULE_0__.AutocompleteComponent, _autocomplete_directive__WEBPACK_IMPORTED_MODULE_1__.AutocompleteDirective, _autocomplete_content_directive__WEBPACK_IMPORTED_MODULE_2__.AutocompleteContentDirective, _option_option_component__WEBPACK_IMPORTED_MODULE_3__.OptionComponent]
        });
      })();
      /***/

    },

    /***/
    21979: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "OptionComponent": function OptionComponent() {
          return (
            /* binding */
            _OptionComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      22759);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      96736);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _c0 = ["*"];

      var _OptionComponent = /*#__PURE__*/function () {
        function _OptionComponent(host) {
          _classCallCheck(this, _OptionComponent);

          this.host = host;
        }

        _createClass(_OptionComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.click$ = (0, rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(this.element, 'click').pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.mapTo)(this.value));
          }
        }, {
          key: "element",
          get: function get() {
            return this.host.nativeElement;
          }
        }]);

        return _OptionComponent;
      }();

      _OptionComponent.ɵfac = function OptionComponent_Factory(t) {
        return new (t || _OptionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef));
      };

      _OptionComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _OptionComponent,
        selectors: [["app-option"]],
        inputs: {
          value: "value",
          url: "url"
        },
        ngContentSelectors: _c0,
        decls: 2,
        vars: 0,
        consts: [[1, "option"]],
        template: function OptionComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }
        },
        styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.no-result[_nghost-%COMP%] {\n  pointer-events: none;\n}\n\n.option[_ngcontent-%COMP%] {\n  padding: 0.8rem 1rem;\n  cursor: pointer;\n  display: block;\n}\n\n[_nghost-%COMP%]:first-child   .option[_ngcontent-%COMP%] {\n  border-top-left-radius: 0.35rem;\n  border-top-right-radius: 0.35rem;\n}\n\n[_nghost-%COMP%]:last-child   .option[_ngcontent-%COMP%] {\n  border-bottom-left-radius: 0.35rem;\n  border-bottom-right-radius: 0.35rem;\n}\n\n.option[_ngcontent-%COMP%]:hover {\n  background-color: #F5F5F5;\n}\n\n.first-active-item[_nghost-%COMP%]   .option[_ngcontent-%COMP%] {\n  background-color: #F5F5F5;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9wdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxvQkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSwrQkFBQTtFQUNBLGdDQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQ0FBQTtFQUNBLG1DQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtBQUNGOztBQUdFO0VBQ0UseUJBQUE7QUFBSiIsImZpbGUiOiJvcHRpb24uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbjpob3N0Lm5vLXJlc3VsdCB7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbn1cclxuXHJcbi5vcHRpb24ge1xyXG4gIHBhZGRpbmc6IDAuOHJlbSAxcmVtO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuOmhvc3Q6Zmlyc3QtY2hpbGQgLm9wdGlvbiB7XHJcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMC4zNXJlbTtcclxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMC4zNXJlbTtcclxufVxyXG5cclxuOmhvc3Q6bGFzdC1jaGlsZCAub3B0aW9uIHtcclxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwLjM1cmVtO1xyXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwLjM1cmVtO1xyXG59XHJcblxyXG4ub3B0aW9uOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjVGNUY1O1xyXG59XHJcblxyXG46aG9zdC5maXJzdC1hY3RpdmUtaXRlbSB7XHJcbiAgLm9wdGlvbiB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjVGNUY1O1xyXG4gIH1cclxufVxyXG4iXX0= */"],
        changeDetection: 0
      });
      /***/
    },

    /***/
    7114: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CustomizerComponent": function CustomizerComponent() {
          return (
            /* binding */
            _CustomizerComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _services_config_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../services/config.service */
      47107);
      /* harmony import */


      var _services_customizer_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../services/customizer.service */
      90775);
      /* harmony import */


      var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ngx-perfect-scrollbar */
      99904);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      12057);

      var _c0 = ["customizer"];

      var _c1 = function _c1(a0) {
        return {
          "selected": a0
        };
      };

      function CustomizerComponent_div_68_Template(rf, ctx) {
        if (rf & 1) {
          var _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 71);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 72);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_div_68_Template_span_click_1_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r9);

            var color_r7 = restoredCtx.$implicit;

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r8.customizerService.changeSidebarBGColor(color_r7);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var color_r7 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("", color_r7["class"], " d-block rounded");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c1, color_r7.active));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-bg-color", color_r7.code);
        }
      }

      function CustomizerComponent_div_70_Template(rf, ctx) {
        if (rf & 1) {
          var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 71);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 72);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_div_70_Template_span_click_1_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12);

            var color_r10 = restoredCtx.$implicit;

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r11.customizerService.changeSidebarBGColor(color_r10);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var color_r10 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("", color_r10["class"], " d-block rounded");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c1, color_r10.active));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-bg-color", color_r10.code);
        }
      }

      function CustomizerComponent_div_77_Template(rf, ctx) {
        if (rf & 1) {
          var _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 73);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 74);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_div_77_Template_div_click_1_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r15);

            var color_r13 = restoredCtx.$implicit;

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r14.customizerService.changeSidebarTransparentBGColor(color_r13);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var color_r13 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("rounded ", color_r13["class"], " ct-glass-bg");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c1, color_r13.active));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-bg-image", color_r13["class"]);
        }
      }

      function CustomizerComponent_div_85_Template(rf, ctx) {
        if (rf & 1) {
          var _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 75);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "img", 76);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_div_85_Template_img_click_1_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r18);

            var img_r16 = restoredCtx.$implicit;

            var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r17.customizerService.changeSidebarBgImage(img_r16);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var img_r16 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", img_r16.src, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"])("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](2, _c1, img_r16.active));
        }
      }

      function CustomizerComponent_div_93_Template(rf, ctx) {
        if (rf & 1) {
          var _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 77);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 72);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_div_93_Template_span_click_1_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r21);

            var color_r19 = restoredCtx.$implicit;

            var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r20.customizerService.changeSidebarTransparentBGColor(color_r19);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var color_r19 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("", color_r19["class"], " d-block rounded  ct-color-bg");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c1, color_r19.active));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-bg-color", color_r19["class"]);
        }
      }

      var _c2 = function _c2(a0) {
        return {
          "active": a0
        };
      };

      function CustomizerComponent_div_114_Template(rf, ctx) {
        if (rf & 1) {
          var _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 78);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "hr");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Sidebar Width");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 79);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "label", 80);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "input", 81);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CustomizerComponent_div_114_Template_input_change_6_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r23);

            var ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r22.changeSidebarWidth("sidebar-sm");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Small");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "label", 80);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "input", 82);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CustomizerComponent_div_114_Template_input_change_10_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r23);

            var ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r24.changeSidebarWidth("sidebar-md");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Medium");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "label", 80);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "input", 83);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CustomizerComponent_div_114_Template_input_change_14_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r23);

            var ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r25.changeSidebarWidth("sidebar-lg");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Large");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
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
        }
      }

      var _CustomizerComponent = /*#__PURE__*/function () {
        function _CustomizerComponent(renderer, configService, customizerService) {
          _classCallCheck(this, _CustomizerComponent);

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

        _createClass(_CustomizerComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "changeSidebarWidth",
          value: function changeSidebarWidth(value) {
            this.size = value;
            this.customizerService.changeSidebarWidth(value);
          }
        }, {
          key: "toggleCustomizer",
          value: function toggleCustomizer() {
            if (this.isOpen) {
              this.renderer.removeClass(this.customizer.nativeElement, "open");
              this.isOpen = false;
            } else {
              this.renderer.addClass(this.customizer.nativeElement, "open");
              this.isOpen = true;
            }
          }
        }, {
          key: "closeCustomizer",
          value: function closeCustomizer() {
            this.renderer.removeClass(this.customizer.nativeElement, "open");
            this.isOpen = false;
          }
        }, {
          key: "bgImageDisplay",
          value: function bgImageDisplay(e) {
            if (e.target.checked) {
              this.isBgImageDisplay = true;
            } else {
              this.isBgImageDisplay = false;
            } //emit event to FUll Layout


            this.customizerService.bgImageDisplay(e);
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.layoutSub) {
              this.layoutSub.unsubscribe();
            }
          }
        }]);

        return _CustomizerComponent;
      }();

      _CustomizerComponent.ɵfac = function CustomizerComponent_Factory(t) {
        return new (t || _CustomizerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_0__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_customizer_service__WEBPACK_IMPORTED_MODULE_1__.CustomizerService));
      };

      _CustomizerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _CustomizerComponent,
        selectors: [["app-customizer"]],
        viewQuery: function CustomizerComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.customizer = _t.first);
          }
        },
        outputs: {
          directionEvent: "directionEvent"
        },
        decls: 115,
        vars: 16,
        consts: [[1, "customizer", "d-none", "d-lg-none", "d-xl-block"], ["customizer", ""], [1, "customizer-close", 3, "click"], [1, "ft-x", "font-medium-3"], ["id", "customizer-toggle-icon", 1, "customizer-toggle", "bg-primary", 3, "click"], [1, "ft-settings", "font-medium-1", "spinner", "white", "align-middle"], ["data-ps-id", "df6a5ce4-a175-9172-4402-dabd98fc9c0a", 1, "customizer-content", "p-3", "ps-container", "ps-theme-dark", 3, "perfectScrollbar"], [1, "text-uppercase"], [1, "ct-layout"], [1, "mb-3", "d-flex", "align-items-center"], [1, "ft-layout", "font-medium-2", "mr-2"], [1, "layout-switch"], [1, "radio", "radio-sm", "d-inline-block", "light-layout", "mr-3"], ["id", "ll-switch", "type", "radio", "name", "layout-switch", 3, "checked", "click"], ["for", "ll-switch"], [1, "radio", "radio-sm", "d-inline-block", "dark-layout", "mr-3"], ["id", "dl-switch", "type", "radio", "name", "layout-switch", 3, "checked", "click"], ["for", "dl-switch"], [1, "radio", "radio-sm", "d-inline-block", "transparent-layout"], ["id", "tl-switch", "type", "radio", "name", "layout-switch", 3, "checked", "click"], ["for", "tl-switch"], [1, "ct-menu-type"], [1, "ft-credit-card", "font-medium-2", "mr-2"], [1, "menu-switch"], [1, "radio", "radio-sm", "d-inline-block", "menu-side", "mr-3"], ["id", "menu-side", "type", "radio", "name", "menu-switch", 3, "checked", "click"], ["for", "menu-side"], [1, "radio", "radio-sm", "d-inline-block", "menu-top"], ["id", "menu-top", "type", "radio", "name", "menu-switch", 3, "checked", "click"], ["for", "menu-top"], [1, "ct-navbar-type"], [1, "ft-more-horizontal", "font-medium-2", "mr-2"], [1, "navbar-switch"], [1, "radio", "radio-sm", "d-inline-block", "nav-static", "mr-3"], ["id", "nav-static", "type", "radio", "name", "navbar-switch", 3, "checked", "click"], ["for", "nav-static"], [1, "radio", "radio-sm", "d-inline-block", "nav-fixed"], ["id", "nav-fixed", "type", "radio", "name", "navbar-switch", 3, "checked", "click"], ["for", "nav-fixed"], [1, "ct-bg-color"], [1, "sb-options", "d-flex", "align-items-center", "mb-3"], [1, "ft-droplet", "font-medium-2", "mr-2"], [1, "cz-bg-color", "sb-color-options"], [1, "row", "mb-3"], ["class", "col px-2", 4, "ngFor", "ngForOf"], [1, "row"], [1, "tl-bg-img"], [1, "d-flex", "align-items-center", "mb-3"], [1, "ft-star", "font-medium-2", "mr-2"], [1, "cz-tl-bg-image", "row"], ["class", "col-sm-3", 4, "ngFor", "ngForOf"], [1, "ct-bg-image"], [1, "sb-bg-img", "d-flex", "align-items-center", "mb-3"], [1, "ft-sidebar", "font-medium-2", "mr-2"], [1, "cz-bg-image", "row", "sb-bg-img"], ["class", "col-2 px-2", 4, "ngFor", "ngForOf"], [1, "tl-color-option"], [1, "tl-color-options", "d-flex", "align-items-center", "mb-3"], [1, "cz-tl-bg-color"], ["class", "col", 4, "ngFor", "ngForOf"], [1, "ct-bg-image-toggler"], [1, "togglebutton", "toggle-sb-bg-img"], [1, "float-right"], [1, "checkbox"], ["id", "sidebar-bg-img", "type", "checkbox", "checked", "", 1, "cz-bg-image-display", 3, "change"], ["for", "sidebar-bg-img"], [1, "ct-compact-toggler"], [1, "togglebutton"], ["id", "cz-compact-menu", "type", "checkbox", 1, "cz-compact-menu", 3, "checked", "change"], ["for", "cz-compact-menu"], ["class", "ct-sidebar-size", 4, "ngIf"], [1, "col", "px-2"], [2, "width", "30px", "height", "30px", 3, "ngClass", "click"], [1, "col-sm-3"], [3, "ngClass", "click"], [1, "col-2", "px-2"], ["alt", "sidebar bg image", "width", "90", 1, "rounded", 3, "src", "ngClass", "click"], [1, "col"], [1, "ct-sidebar-size"], ["id", "cz-sidebar-width", "data-toggle", "buttons", 1, "cz-sidebar-width", "btn-group", "btn-group-toggle"], [1, "btn", "btn-outline-primary", 3, "ngClass"], ["id", "cz-btn-radio-1", "type", "radio", "name", "cz-btn-radio", "value", "sidebar-sm", 3, "checked", "change"], ["id", "cz-btn-radio-2", "type", "radio", "name", "cz-btn-radio", "value", "sidebar-md", 3, "checked", "change"], ["id", "cz-btn-radio-3", "type", "radio", "name", "cz-btn-radio", "value", "sidebar-lg", 3, "checked", "change"]],
        template: function CustomizerComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0, 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "a", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_a_click_2_listener() {
              return ctx.closeCustomizer();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "i", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "a", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_a_click_4_listener() {
              return ctx.toggleCustomizer();
            });

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

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_input_click_19_listener() {
              return ctx.customizerService.switchLayout("light", ctx.isBgImageDisplay);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "label", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Light");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "div", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "input", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_input_click_23_listener() {
              return ctx.customizerService.switchLayout("dark", ctx.isBgImageDisplay);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "label", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "Dark");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "input", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_input_click_27_listener() {
              return ctx.customizerService.switchLayout("transparent", ctx.isBgImageDisplay);
            });

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

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_input_click_38_listener() {
              return ctx.customizerService.toggleMenuPosition("Side");
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "label", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40, "Vertical");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "div", 27);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "input", 28);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_input_click_42_listener() {
              return ctx.customizerService.toggleMenuPosition("Top");
            });

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

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_input_click_53_listener() {
              return ctx.customizerService.toggleNavbarType("Static");
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](54, "label", 35);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](55, "Static");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](56, "div", 36);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](57, "input", 37);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CustomizerComponent_Template_input_click_57_listener() {
              return ctx.customizerService.toggleNavbarType("Fixed");
            });

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

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CustomizerComponent_Template_input_change_102_listener($event) {
              return ctx.bgImageDisplay($event);
            });

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

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CustomizerComponent_Template_input_change_112_listener($event) {
              return ctx.customizerService.toggleCompactMenu($event);
            });

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
          }

          if (rf & 2) {
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
          }
        },
        directives: [ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_3__.PerfectScrollbarDirective, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjdXN0b21pemVyLmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    14572: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LISTITEMS": function LISTITEMS() {
          return (
            /* binding */
            _LISTITEMS
          );
        }
        /* harmony export */

      });

      var _LISTITEMS = [{
        "url": "/page",
        "name": "Page",
        "icon": "ft-home"
      }, {
        "url": "/pages/login",
        "name": "Login",
        "icon": "ft-log-in"
      }];
      /***/
    },

    /***/
    60252: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SidebarAnchorToggleDirective": function SidebarAnchorToggleDirective() {
          return (
            /* binding */
            _SidebarAnchorToggleDirective
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _sidebar_link_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./sidebar-link.directive */
      92489);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _SidebarAnchorToggleDirective = /*#__PURE__*/function () {
        function _SidebarAnchorToggleDirective(navlink) {
          _classCallCheck(this, _SidebarAnchorToggleDirective);

          this.navlink = navlink;
        }

        _createClass(_SidebarAnchorToggleDirective, [{
          key: "onClick",
          value: function onClick() {
            this.navlink.toggle();
          }
        }]);

        return _SidebarAnchorToggleDirective;
      }();

      _SidebarAnchorToggleDirective.ɵfac = function SidebarAnchorToggleDirective_Factory(t) {
        return new (t || _SidebarAnchorToggleDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_sidebar_link_directive__WEBPACK_IMPORTED_MODULE_0__.SidebarLinkDirective));
      };

      _SidebarAnchorToggleDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
        type: _SidebarAnchorToggleDirective,
        selectors: [["", "appSidebarAnchorToggle", ""]],
        hostBindings: function SidebarAnchorToggleDirective_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SidebarAnchorToggleDirective_click_HostBindingHandler($event) {
              return ctx.onClick($event);
            });
          }
        }
      });
      /***/
    },

    /***/
    77663: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SidebarDropdownDirective": function SidebarDropdownDirective() {
          return (
            /* binding */
            _SidebarDropdownDirective
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      3984);

      var _SidebarDropdownDirective = /*#__PURE__*/function () {
        function _SidebarDropdownDirective(router) {
          _classCallCheck(this, _SidebarDropdownDirective);

          this.router = router;
          this.navlinks = [];
        }

        _createClass(_SidebarDropdownDirective, [{
          key: "ngOnInit",
          value: function ngOnInit() {//write your code here!
          }
        }]);

        return _SidebarDropdownDirective;
      }();

      _SidebarDropdownDirective.ɵfac = function SidebarDropdownDirective_Factory(t) {
        return new (t || _SidebarDropdownDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router));
      };

      _SidebarDropdownDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
        type: _SidebarDropdownDirective,
        selectors: [["", "appSidebarDropdown", ""]]
      });
      /***/
    },

    /***/
    92489: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SidebarLinkDirective": function SidebarLinkDirective() {
          return (
            /* binding */
            _SidebarLinkDirective
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _sidebar_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./sidebar.directive */
      17618);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _SidebarLinkDirective = /*#__PURE__*/function () {
        function _SidebarLinkDirective(sideNav) {
          _classCallCheck(this, _SidebarLinkDirective);

          this.sideNav = sideNav;
        }

        _createClass(_SidebarLinkDirective, [{
          key: "open",
          get: function get() {
            return this._open;
          },
          set: function set(value) {
            this._open = value;
          }
        }, {
          key: "sidebarGroupActive",
          get: function get() {
            return this._sidebarGroupActive;
          },
          set: function set(value) {
            this._sidebarGroupActive = value;
          }
        }, {
          key: "navCollapsedOpen",
          get: function get() {
            return this._navCollapsedOpen;
          },
          set: function set(value) {
            this._navCollapsedOpen = value;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            this.sideNav.addLink(this);
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {} //when side menu (vertical menu) item gets clicked

        }, {
          key: "toggle",
          value: function toggle() {
            this.open = !this.open;

            if (this.open) {
              this.sideNav.closeOtherLinks(this);
            }

            if (!this.open && this.level.toString() === "1" && this.hasSub) {
              this.sidebarGroupActive = false;
            }
          }
        }]);

        return _SidebarLinkDirective;
      }();

      _SidebarLinkDirective.ɵfac = function SidebarLinkDirective_Factory(t) {
        return new (t || _SidebarLinkDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_sidebar_directive__WEBPACK_IMPORTED_MODULE_0__.SidebarDirective));
      };

      _SidebarLinkDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
        type: _SidebarLinkDirective,
        selectors: [["", "appSidebarlink", ""]],
        hostVars: 6,
        hostBindings: function SidebarLinkDirective_HostBindings(rf, ctx) {
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("open", ctx.open)("sidebar-group-active", ctx.sidebarGroupActive)("nav-collapsed-open", ctx.navCollapsedOpen);
          }
        },
        inputs: {
          parent: "parent",
          level: "level",
          hasSub: "hasSub",
          path: "path",
          open: "open",
          sidebarGroupActive: "sidebarGroupActive",
          navCollapsedOpen: "navCollapsedOpen"
        }
      });
      /***/
    },

    /***/
    17618: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SidebarDirective": function SidebarDirective() {
          return (
            /* binding */
            _SidebarDirective
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      3984);
      /* harmony import */


      var _services_config_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../services/config.service */
      47107);
      /* harmony import */


      var _services_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../services/layout.service */
      60432);

      var _SidebarDirective = /*#__PURE__*/function () {
        function _SidebarDirective(cdr, router, configService, layoutService) {
          _classCallCheck(this, _SidebarDirective);

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

        _createClass(_SidebarDirective, [{
          key: "navExpanded",
          get: function get() {
            return this._navExpanded;
          },
          set: function set(value) {
            this._navExpanded = value;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this10 = this;

            this.innerWidth = window.innerWidth;
            this.layoutSub = this.configService.templateConf$.subscribe(function (templateConf) {
              if (templateConf) {
                _this10.config = templateConf;
              }

              _this10.loadLayout();

              _this10.cdr.markForCheck();
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.layoutSub) {
              this.layoutSub.unsubscribe();
            }
          } //load layout when changes in the config

        }, {
          key: "loadLayout",
          value: function loadLayout() {
            this.sidebarExpanded = !this.config.layout.sidebar.collapsed;

            if (this.config.layout.sidebar.collapsed && !this.mouseEnter) {
              this.setSidebarGroupActiveCollapsed();
              this.navExpanded = false;
            } else {
              this.setSidebarGroupActive();
              this.navExpanded = true;
            }
          } //add menu links to the link list

        }, {
          key: "addLink",
          value: function addLink(link) {
            this.navlinks.push(link);
          } //close all other menu items other than active one

        }, {
          key: "closeOtherLinks",
          value: function closeOtherLinks(openLink) {
            this.navlinks.forEach(function (link) {
              if (link != openLink && (openLink.level.toString() === "1" || link.level === openLink.level)) {
                link.open = false;
                link.sidebarGroupActive = false;
              } else if (link === openLink && openLink.level.toString() === "1" && link.hasSub === true) {
                link.sidebarGroupActive = true;
              } else if (link === openLink && openLink.level.toString() === "1" && link.hasSub === false) {
                link.sidebarGroupActive = false;
                link.open = false;
              } else if (link === openLink && openLink.level.toString() != "1" && link.hasSub === false) {
                link.open = false;
                link.sidebarGroupActive = false;
                return;
              }
            });
          }
        }, {
          key: "ngAfterViewInit",
          value: function ngAfterViewInit() {} // call when sidebar toggle is collapsed but still in expand mode on mouse hover

        }, {
          key: "setSidebarGroupActive",
          value: function setSidebarGroupActive() {
            var _this11 = this;

            if (this.navlinks.length > 0) {
              this.navlinks.forEach(function (link) {
                link.sidebarGroupActive = false;
                link.navCollapsedOpen = false;
              });
              var matched = this.navlinks.find(function (link) {
                return link.path === _this11.router.url;
              });

              if (matched) {
                var parent = this.navlinks.find(function (link) {
                  return link.parent === matched.parent && link.level.toString() === "1" && link.hasSub === true;
                });

                if (parent) {
                  parent.sidebarGroupActive = true;
                  parent.navCollapsedOpen = false;
                  parent.open = true;
                }
              }
            }
          } // call when sidebar toggle is collapsed and is in collapse mode on mouse out

        }, {
          key: "setSidebarGroupActiveCollapsed",
          value: function setSidebarGroupActiveCollapsed() {
            var _this12 = this;

            this.closeOtherLinks(this.navlinks.find(function (link) {
              return link.path === _this12.router.url;
            }));

            if (this.navlinks.length > 0) {
              this.navlinks.forEach(function (link) {
                link.sidebarGroupActive = false;
                link.navCollapsedOpen = false;
              });
              var matched = this.navlinks.find(function (link) {
                return link.path === _this12.router.url;
              });

              if (matched) {
                var parent = this.navlinks.find(function (link) {
                  return link.parent === matched.parent && link.level.toString() === "1" && link.hasSub === true;
                });

                if (parent) {
                  parent.sidebarGroupActive = true;
                  parent.navCollapsedOpen = true;
                  parent.open = false;
                }
              }
            }
          } // mouse enter event of side menu

        }, {
          key: "onMouseOver",
          value: function onMouseOver(e) {
            this.mouseEnter = true;

            if (this.config.layout.sidebar.collapsed) {
              this.setSidebarGroupActive();
              this.navExpanded = true;
            }
          } // mouse leave event of side menu

        }, {
          key: "onMouseOut",
          value: function onMouseOut(e) {
            this.mouseEnter = false;

            if (this.config.layout.sidebar.collapsed) {
              this.setSidebarGroupActiveCollapsed();
              this.navExpanded = false;
            }
          }
        }]);

        return _SidebarDirective;
      }();

      _SidebarDirective.ɵfac = function SidebarDirective_Factory(t) {
        return new (t || _SidebarDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_0__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService));
      };

      _SidebarDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({
        type: _SidebarDirective,
        selectors: [["", "appSidebar", ""]],
        hostVars: 2,
        hostBindings: function SidebarDirective_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("mouseenter", function SidebarDirective_mouseenter_HostBindingHandler($event) {
              return ctx.onMouseOver($event);
            })("mouseleave", function SidebarDirective_mouseleave_HostBindingHandler($event) {
              return ctx.onMouseOut($event);
            });
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("expanded", ctx.navExpanded);
          }
        },
        inputs: {
          navExpanded: "navExpanded"
        }
      });
      /***/
    },

    /***/
    66763: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ToggleFullscreenDirective": function ToggleFullscreenDirective() {
          return (
            /* binding */
            _ToggleFullscreenDirective
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var screenfull__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! screenfull */
      79305);
      /* harmony import */


      var screenfull__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(screenfull__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _ToggleFullscreenDirective = /*#__PURE__*/function () {
        function _ToggleFullscreenDirective() {
          _classCallCheck(this, _ToggleFullscreenDirective);
        }

        _createClass(_ToggleFullscreenDirective, [{
          key: "onClick",
          value: function onClick() {
            if (screenfull__WEBPACK_IMPORTED_MODULE_0__.isEnabled) {
              screenfull__WEBPACK_IMPORTED_MODULE_0__.toggle();
            }
          }
        }]);

        return _ToggleFullscreenDirective;
      }();

      _ToggleFullscreenDirective.ɵfac = function ToggleFullscreenDirective_Factory(t) {
        return new (t || _ToggleFullscreenDirective)();
      };

      _ToggleFullscreenDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
        type: _ToggleFullscreenDirective,
        selectors: [["", "appToggleFullscreen", ""]],
        hostBindings: function ToggleFullscreenDirective_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ToggleFullscreenDirective_click_HostBindingHandler() {
              return ctx.onClick();
            });
          }
        }
      });
      /***/
    },

    /***/
    24378: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TopMenuAnchorToggleDirective": function TopMenuAnchorToggleDirective() {
          return (
            /* binding */
            _TopMenuAnchorToggleDirective
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _topmenu_link_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./topmenu-link.directive */
      78819);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _TopMenuAnchorToggleDirective = /*#__PURE__*/function () {
        function _TopMenuAnchorToggleDirective(navlink) {
          _classCallCheck(this, _TopMenuAnchorToggleDirective);

          this.navlink = navlink;
        } // @HostListener("click", ["$event"])
        // onClick() {
        //   this.navlink.toggle();
        // }


        _createClass(_TopMenuAnchorToggleDirective, [{
          key: "onMouseOver",
          value: function onMouseOver(e) {
            this.navlink.openDropdown();
          }
        }]);

        return _TopMenuAnchorToggleDirective;
      }();

      _TopMenuAnchorToggleDirective.ɵfac = function TopMenuAnchorToggleDirective_Factory(t) {
        return new (t || _TopMenuAnchorToggleDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_topmenu_link_directive__WEBPACK_IMPORTED_MODULE_0__.TopMenuLinkDirective));
      };

      _TopMenuAnchorToggleDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
        type: _TopMenuAnchorToggleDirective,
        selectors: [["", "appTopMenuAnchorToggle", ""]],
        hostBindings: function TopMenuAnchorToggleDirective_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mouseenter", function TopMenuAnchorToggleDirective_mouseenter_HostBindingHandler($event) {
              return ctx.onMouseOver($event);
            });
          }
        }
      });
      /***/
    },

    /***/
    20154: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TopMenuDropdownDirective": function TopMenuDropdownDirective() {
          return (
            /* binding */
            _TopMenuDropdownDirective
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      3984);

      var _TopMenuDropdownDirective = /*#__PURE__*/function () {
        function _TopMenuDropdownDirective(router) {
          _classCallCheck(this, _TopMenuDropdownDirective);

          this.router = router;
          this.navlinks = [];
        }

        _createClass(_TopMenuDropdownDirective, [{
          key: "ngOnInit",
          value: function ngOnInit() {//write your code here!
          }
        }]);

        return _TopMenuDropdownDirective;
      }();

      _TopMenuDropdownDirective.ɵfac = function TopMenuDropdownDirective_Factory(t) {
        return new (t || _TopMenuDropdownDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router));
      };

      _TopMenuDropdownDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
        type: _TopMenuDropdownDirective,
        selectors: [["", "appTopMenuDropdown", ""]]
      });
      /***/
    },

    /***/
    78819: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TopMenuLinkDirective": function TopMenuLinkDirective() {
          return (
            /* binding */
            _TopMenuLinkDirective
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _topmenu_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./topmenu.directive */
      45197);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _TopMenuLinkDirective = /*#__PURE__*/function () {
        function _TopMenuLinkDirective(topNav) {
          _classCallCheck(this, _TopMenuLinkDirective);

          this.topNav = topNav;
        }

        _createClass(_TopMenuLinkDirective, [{
          key: "show",
          get: function get() {
            return this._show;
          },
          set: function set(value) {
            this._show = value;

            if (value) {
              this.topNav.closeOtherLinks(this);
            }
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            this.topNav.addLink(this);
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {} // public toggle(): any {
          //   this.show = !this.show;
          // }

        }, {
          key: "openDropdown",
          value: function openDropdown() {
            this.show = true;
          }
        }]);

        return _TopMenuLinkDirective;
      }();

      _TopMenuLinkDirective.ɵfac = function TopMenuLinkDirective_Factory(t) {
        return new (t || _TopMenuLinkDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_topmenu_directive__WEBPACK_IMPORTED_MODULE_0__.TopMenuDirective));
      };

      _TopMenuLinkDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
        type: _TopMenuLinkDirective,
        selectors: [["", "appTopMenulink", ""]],
        hostVars: 2,
        hostBindings: function TopMenuLinkDirective_HostBindings(rf, ctx) {
          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("show", ctx.show);
          }
        },
        inputs: {
          parent: "parent",
          level: "level",
          show: "show"
        }
      });
      /***/
    },

    /***/
    45197: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TopMenuDirective": function TopMenuDirective() {
          return (
            /* binding */
            _TopMenuDirective
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _TopMenuDirective = /*#__PURE__*/function () {
        function _TopMenuDirective() {
          _classCallCheck(this, _TopMenuDirective);

          this.navlinks = [];
        }

        _createClass(_TopMenuDirective, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "addLink",
          value: function addLink(link) {
            this.navlinks.push(link);
          }
        }, {
          key: "closeOtherLinks",
          value: function closeOtherLinks(openLink) {
            this.navlinks.forEach(function (link) {
              if (link != openLink && (openLink.level.toString() === "1" || link.level === openLink.level)) {
                link.show = false;
              }
            });
          }
        }, {
          key: "onMouseOut",
          value: function onMouseOut(e) {
            this.navlinks.forEach(function (link) {
              link.show = false;
            });
          }
        }]);

        return _TopMenuDirective;
      }();

      _TopMenuDirective.ɵfac = function TopMenuDirective_Factory(t) {
        return new (t || _TopMenuDirective)();
      };

      _TopMenuDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
        type: _TopMenuDirective,
        selectors: [["", "appTopMenu", ""]],
        hostBindings: function TopMenuDirective_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mouseleave", function TopMenuDirective_mouseleave_HostBindingHandler($event) {
              return ctx.onMouseOut($event);
            });
          }
        }
      });
      /***/
    },

    /***/
    26590: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FooterComponent": function FooterComponent() {
          return (
            /* binding */
            _FooterComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common */
      12057);

      var _FooterComponent = function _FooterComponent() {
        _classCallCheck(this, _FooterComponent);

        //Variables
        this.currentDate = new Date();
      };

      _FooterComponent.ɵfac = function FooterComponent_Factory(t) {
        return new (t || _FooterComponent)();
      };

      _FooterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _FooterComponent,
        selectors: [["app-footer"]],
        decls: 8,
        vars: 4,
        consts: [[1, "footer"], [1, "copyright", "clearfix", "text-muted", "m-0"], ["id", "pixinventLink", "href", "https://bwa-designs.com"], [1, "d-none", "d-sm-inline-block"]],
        template: function FooterComponent_Template(rf, ctx) {
          if (rf & 1) {
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
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Copyright \xA9 ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](3, 1, ctx.currentDate, "yyyy"), " ");
          }
        },
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.DatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb290ZXIuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    83686: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HorizontalMenuComponent": function HorizontalMenuComponent() {
          return (
            /* binding */
            _HorizontalMenuComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _navigation_routes_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./navigation-routes.config */
      83155);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _services_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../services/layout.service */
      60432);
      /* harmony import */


      var _services_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../services/config.service */
      47107);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/router */
      3984);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/common */
      12057);
      /* harmony import */


      var _directives_topmenu_dropdown_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../directives/topmenu-dropdown.directive */
      20154);
      /* harmony import */


      var _directives_topmenu_link_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../directives/topmenu-link.directive */
      78819);
      /* harmony import */


      var _directives_topmenu_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../directives/topmenu-anchor-toggle.directive */
      24378);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ngx-translate/core */
      75629);

      var _c0 = function _c0(a0) {
        return [a0];
      };

      function HorizontalMenuComponent_li_3_a_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](4, _c0, menuItem_r1.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 2, menuItem_r1.title));
        }
      }

      function HorizontalMenuComponent_li_3_a_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("routerLink", menuItem_r1.path);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](5, _c0, menuItem_r1.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 3, menuItem_r1.title));
        }
      }

      function HorizontalMenuComponent_li_3_a_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("href", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](5, _c0, menuItem_r1.path), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](7, _c0, menuItem_r1.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 3, menuItem_r1.title));
        }
      }

      function HorizontalMenuComponent_li_3_ul_4_li_1_a_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubItem_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", "dropdown-toggle dropdown-item d-flex align-items-center");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](5, _c0, menuSubItem_r10.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 3, menuSubItem_r10.title));
        }
      }

      function HorizontalMenuComponent_li_3_ul_4_li_1_a_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubItem_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("routerLink", menuSubItem_r10.path);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", "dropdown-item d-flex align-items-center");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](6, _c0, menuSubItem_r10.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 4, menuSubItem_r10.title));
        }
      }

      function HorizontalMenuComponent_li_3_ul_4_li_1_a_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubItem_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("href", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](6, _c0, menuSubItem_r10.path), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"])("ngClass", "dropdown-item d-flex align-items-center");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](8, _c0, menuSubItem_r10.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 4, menuSubItem_r10.title));
        }
      }

      function HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_li_1_a_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubsubItem_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", "dropdown-item d-flex align-items-center")("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](4, _c0, menuSubsubItem_r19.path));

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](6, _c0, menuSubsubItem_r19.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](menuSubsubItem_r19.title);
        }
      }

      function HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_li_1_ng_template_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "a", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "i", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubsubItem_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", "dropdown-item d-flex align-items-center")("href", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](4, _c0, menuSubsubItem_r19.path), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](6, _c0, menuSubsubItem_r19.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](menuSubsubItem_r19.title);
        }
      }

      var _c1 = function _c1() {
        return {
          exact: true
        };
      };

      function HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_li_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_li_1_a_1_Template, 4, 8, "a", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_li_1_ng_template_2_Template, 4, 8, "ng-template", null, 25, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubsubItem_r19 = ctx.$implicit;

          var _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](3);

          var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4).$implicit;

          var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("level", ctx_r18.level + 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("parent", menuItem_r1.title)("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](5, _c1));

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !menuSubsubItem_r19.isExternalLink)("ngIfElse", _r21);
        }
      }

      function HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ul", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_li_1_Template, 4, 6, "li", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubItem_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", menuSubItem_r10.submenu);
        }
      }

      function HorizontalMenuComponent_li_3_ul_4_li_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HorizontalMenuComponent_li_3_ul_4_li_1_a_1_Template, 5, 7, "a", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, HorizontalMenuComponent_li_3_ul_4_li_1_a_2_Template, 5, 8, "a", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, HorizontalMenuComponent_li_3_ul_4_li_1_a_3_Template, 5, 10, "a", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, HorizontalMenuComponent_li_3_ul_4_li_1_ul_4_Template, 2, 1, "ul", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubItem_r10 = ctx.$implicit;

          var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2).$implicit;

          var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("level", ctx_r9.level + 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("parent", menuItem_r1.title)("routerLinkActive", menuSubItem_r10.submenu.length != 0 ? "active" : "active")("ngClass", menuSubItem_r10["class"] === "dropdown-item" ? "" : "has-sub dropdown dropdown-submenu");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("data-menu", menuSubItem_r10["class"] === "dropdown-item" ? "" : "dropdown-submenu");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuSubItem_r10.submenu.length > 0 && !menuSubItem_r10.isExternalLink);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuSubItem_r10.submenu.length === 0 && !menuSubItem_r10.isExternalLink);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuSubItem_r10.isExternalLink);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuSubItem_r10.submenu.length > 0);
        }
      }

      function HorizontalMenuComponent_li_3_ul_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ul", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HorizontalMenuComponent_li_3_ul_4_li_1_Template, 5, 9, "li", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", menuItem_r1.submenu);
        }
      }

      function HorizontalMenuComponent_li_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HorizontalMenuComponent_li_3_a_1_Template, 5, 6, "a", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, HorizontalMenuComponent_li_3_a_2_Template, 5, 7, "a", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, HorizontalMenuComponent_li_3_a_3_Template, 5, 9, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, HorizontalMenuComponent_li_3_ul_4_Template, 2, 1, "ul", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r1 = ctx.$implicit;

          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("level", ctx_r0.level + 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("parent", menuItem_r1.title)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](10, _c0, menuItem_r1["class"]))("routerLinkActive", menuItem_r1.submenu.length != 0 ? "active" : "active")("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](12, _c1));

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("data-menu", menuItem_r1["class"] === "dropdown nav-item" ? "dropdown" : null);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuItem_r1.submenu.length > 0 && !menuItem_r1.isExternalLink);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuItem_r1.submenu.length === 0 && !menuItem_r1.isExternalLink);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuItem_r1.isExternalLink);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", menuItem_r1.submenu.length > 0);
        }
      }

      var _c2 = function _c2(a0, a1) {
        return {
          "navbar-sticky": a0,
          "navbar-fixed": a1
        };
      };

      var _HorizontalMenuComponent = /*#__PURE__*/function () {
        function _HorizontalMenuComponent(layoutService, configService, cdr, router) {
          _classCallCheck(this, _HorizontalMenuComponent);

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

        _createClass(_HorizontalMenuComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.menuItems = _navigation_routes_config__WEBPACK_IMPORTED_MODULE_0__.HROUTES;
          }
        }, {
          key: "ngAfterViewInit",
          value: function ngAfterViewInit() {
            var _this13 = this;

            this.layoutSub = this.configService.templateConf$.subscribe(function (templateConf) {
              if (templateConf) {
                _this13.config = templateConf;
              }

              _this13.loadLayout();

              _this13.cdr.markForCheck();
            });
          }
        }, {
          key: "loadLayout",
          value: function loadLayout() {
            if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != "") {
              this.menuPosition = this.config.layout.menuPosition;
            }

            if (this.config.layout.variant === "Transparent") {
              this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
            } else {
              this.transparentBGClass = "";
            }
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.layoutSub) {
              this.layoutSub.unsubscribe();
            }
          }
        }]);

        return _HorizontalMenuComponent;
      }();

      _HorizontalMenuComponent.ɵfac = function HorizontalMenuComponent_Factory(t) {
        return new (t || _HorizontalMenuComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_2__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router));
      };

      _HorizontalMenuComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
        type: _HorizontalMenuComponent,
        selectors: [["app-horizontal-menu"]],
        decls: 4,
        vars: 8,
        consts: [["role", "navigation", "data-menu", "menu-wrapper", "data-nav", "brand-center", 3, "ngClass"], ["data-menu", "menu-container", 1, "navbar-container", "main-menu-content", "center-layout"], ["appTopMenuDropdown", "", "id", "main-menu-navigation", "data-menu", "menu-navigation", 1, "navigation-main", "nav", "navbar-nav"], ["appTopMenulink", "", 3, "parent", "level", "ngClass", "routerLinkActive", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["appTopMenulink", "", 3, "parent", "level", "ngClass", "routerLinkActive", "routerLinkActiveOptions"], ["appTopMenuAnchorToggle", "", "data-toggle", "dropdown", "class", "dropdown-toggle nav-link d-flex align-items-center", 4, "ngIf"], ["appTopMenuAnchorToggle", "", "data-toggle", "dropdown", "class", "nav-link d-flex align-items-center", 3, "routerLink", 4, "ngIf"], ["target", "_blank", "data-toggle", "dropdown", "class", "nav-link d-flex align-items-center", 3, "href", 4, "ngIf"], ["appTopMenuDropdown", "", "class", "dropdown-menu", 4, "ngIf"], ["appTopMenuAnchorToggle", "", "data-toggle", "dropdown", 1, "dropdown-toggle", "nav-link", "d-flex", "align-items-center"], [3, "ngClass"], ["appTopMenuAnchorToggle", "", "data-toggle", "dropdown", 1, "nav-link", "d-flex", "align-items-center", 3, "routerLink"], ["target", "_blank", "data-toggle", "dropdown", 1, "nav-link", "d-flex", "align-items-center", 3, "href"], ["appTopMenuDropdown", "", 1, "dropdown-menu"], ["appTopMenulink", "", 3, "parent", "level", "routerLinkActive", "ngClass", 4, "ngFor", "ngForOf"], ["appTopMenulink", "", 3, "parent", "level", "routerLinkActive", "ngClass"], ["appTopMenuAnchorToggle", "", 3, "ngClass", 4, "ngIf"], ["appTopMenuAnchorToggle", "", 3, "routerLink", "ngClass", 4, "ngIf"], [3, "href", "ngClass", 4, "ngIf"], ["appTopMenuAnchorToggle", "", 3, "ngClass"], ["appTopMenuAnchorToggle", "", 3, "routerLink", "ngClass"], [3, "href", "ngClass"], ["appTopMenulink", "", "data-menu", "", "data-toggle", "dropdown", "routerLinkActive", "active", 3, "parent", "level", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], ["appTopMenulink", "", "data-menu", "", "data-toggle", "dropdown", "routerLinkActive", "active", 3, "parent", "level", "routerLinkActiveOptions"], ["appTopMenuAnchorToggle", "", "data-toggle", "dropdown", 3, "ngClass", "routerLink", 4, "ngIf", "ngIfElse"], ["externalSubSubLinkBlock", ""], ["appTopMenuAnchorToggle", "", "data-toggle", "dropdown", 3, "ngClass", "routerLink"], [1, ""], ["data-toggle", "dropdown", "target", "_blank", 3, "ngClass", "href"]],
        template: function HorizontalMenuComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ul", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, HorizontalMenuComponent_li_3_Template, 5, 13, "li", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassMapInterpolate1"]("header-navbar navbar-expand-sm navbar navbar-horizontal navbar-fixed navbar-light navbar-shadow menu-border navbar-brand-center  ", ctx.transparentBGClass, "");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction2"](5, _c2, ctx.menuPosition === "Top" && (ctx.config == null ? null : ctx.config.layout.navbar.type) === "Static", ctx.menuPosition === "Top" && (ctx.config == null ? null : ctx.config.layout.navbar.type) === "Fixed"));

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.menuItems);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass, _directives_topmenu_dropdown_directive__WEBPACK_IMPORTED_MODULE_3__.TopMenuDropdownDirective, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _directives_topmenu_link_directive__WEBPACK_IMPORTED_MODULE_4__.TopMenuLinkDirective, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLinkActive, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _directives_topmenu_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_5__.TopMenuAnchorToggleDirective, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLinkWithHref],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob3Jpem9udGFsLW1lbnUuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    83155: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HROUTES": function HROUTES() {
          return (
            /* binding */
            _HROUTES
          );
        }
        /* harmony export */

      });

      var _HROUTES = [{
        path: "/page",
        title: "Page",
        icon: "ft-home",
        "class": "dropdown nav-item",
        isExternalLink: false,
        submenu: []
      }, {
        path: "",
        title: "Menu Levels",
        icon: "ft-align-left",
        "class": "dropdown nav-item has-sub",
        badge: "",
        badgeClass: "",
        isExternalLink: false,
        submenu: [{
          path: "/YOUR-ROUTE-PATH",
          title: "Second Level",
          icon: "ft-arrow-right submenu-icon",
          "class": "dropdown-item",
          badge: "",
          badgeClass: "",
          isExternalLink: false,
          submenu: []
        }, {
          path: "",
          title: "Second Level Child",
          icon: "ft-arrow-right submenu-icon",
          "class": "has-sub",
          badge: "",
          badgeClass: "",
          isExternalLink: false,
          submenu: [{
            path: "/YOUR-ROUTE-PATH",
            title: "Third Level 1.1",
            icon: "ft-arrow-right submenu-icon",
            "class": "dropdown-item",
            badge: "",
            badgeClass: "",
            isExternalLink: false,
            submenu: []
          }, {
            path: "/YOUR-ROUTE-PATH",
            title: "Third Level 1.2",
            icon: "ft-arrow-right submenu-icon",
            "class": "dropdown-item",
            badge: "",
            badgeClass: "",
            isExternalLink: false,
            submenu: []
          }]
        }]
      }];
      /***/
    },

    /***/
    96319: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "NavbarComponent": function NavbarComponent() {
          return (
            /* binding */
            _NavbarComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/forms */
      24751);
      /* harmony import */


      var _data_template_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../data/template-search */
      14572);
      /* harmony import */


      var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @fortawesome/free-solid-svg-icons */
      49976);
      /* harmony import */


      var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @fortawesome/free-regular-svg-icons */
      51903);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ngx-translate/core */
      75629);
      /* harmony import */


      var _services_layout_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../services/layout.service */
      60432);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/router */
      3984);
      /* harmony import */


      var _services_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../services/config.service */
      47107);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/common */
      12057);
      /* harmony import */


      var ng_click_outside__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ng-click-outside */
      64623);
      /* harmony import */


      var _directives_toggle_fullscreen_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../directives/toggle-fullscreen.directive */
      66763);
      /* harmony import */


      var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @ng-bootstrap/ng-bootstrap */
      96797);
      /* harmony import */


      var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @fortawesome/angular-fontawesome */
      54163);

      var _c0 = ["search"];
      var _c1 = ["searchResults"];

      function NavbarComponent_a_39_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "a", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "fa-icon", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "span", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, " NPCs");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate1"]("routerLink", "/app/region/", ctx_r0.regionId, "/edit-npcs");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("icon", ctx_r0.faUserFriends);
        }
      }

      var _c2 = function _c2(a0, a1, a2, a3) {
        return {
          "navbar-brand-center": a0,
          "navbar-static": a1,
          "navbar-sticky": a2,
          "fixed-top": a3
        };
      };

      var _NavbarComponent = /*#__PURE__*/function () {
        function _NavbarComponent(translate, layoutService, router, configService, cdr, route) {
          var _this14 = this;

          _classCallCheck(this, _NavbarComponent);

          this.translate = translate;
          this.layoutService = layoutService;
          this.router = router;
          this.configService = configService;
          this.cdr = cdr;
          this.route = route;
          this.currentLang = "en";
          this.selectedLanguageText = "English";
          this.selectedLanguageFlag = "./assets/img/flags/us.png";
          this.toggleClass = "ft-maximize";
          this.placement = "bottom-right";
          this.logoUrl = "assets/img/logo.png";
          this.menuPosition = "Side";
          this.isSmallScreen = false;
          this.searchOpenClass = "";
          this.transparentBGClass = "";
          this.hideSidebar = true;
          this.isCollapsed = true;
          this.faHatWizard = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faHatWizard;
          this.faUserFriends = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faUserFriends;
          this.faMap = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faMap;
          this.faCaretSquareDown = _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_7__.faCaretSquareDown;
          this.faSlidersH = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faSlidersH;
          this.faBookOpen = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faBookOpen;
          this.faGlobe = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faGlobe;
          this.toggleHideSidebar = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
          this.seachTextEmpty = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
          this.listItems = [];
          this.control = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl();
          this.faDragon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faDragon;
          this.config = {};
          route.paramMap.subscribe(function (p) {
            console.log(p);

            if (!!p.get("worldId")) {
              _this14.worldId = parseInt(p.get("worldId"), 10);
            }

            if (!!p.get("regionId")) {
              _this14.regionId = parseInt(p.get("regionId"), 10);
            }
          });
          var browserLang = translate.getBrowserLang();
          translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "en");
          this.config = this.configService.templateConf;
          this.innerWidth = window.innerWidth;
          this.layoutSub = layoutService.toggleSidebar$.subscribe(function (isShow) {
            _this14.hideSidebar = !isShow;
          });
        }

        _createClass(_NavbarComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.listItems = _data_template_search__WEBPACK_IMPORTED_MODULE_0__.LISTITEMS;

            if (this.innerWidth < 1200) {
              this.isSmallScreen = true;
            } else {
              this.isSmallScreen = false;
            }
          }
        }, {
          key: "ngAfterViewInit",
          value: function ngAfterViewInit() {
            var _this15 = this;

            this.configSub = this.configService.templateConf$.subscribe(function (templateConf) {
              if (templateConf) {
                _this15.config = templateConf;
              }

              _this15.loadLayout();

              _this15.cdr.markForCheck();
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.layoutSub) {
              this.layoutSub.unsubscribe();
            }

            if (this.configSub) {
              this.configSub.unsubscribe();
            }
          }
        }, {
          key: "onResize",
          value: function onResize(event) {
            this.innerWidth = event.target.innerWidth;

            if (this.innerWidth < 1200) {
              this.isSmallScreen = true;
            } else {
              this.isSmallScreen = false;
            }
          }
        }, {
          key: "loadLayout",
          value: function loadLayout() {
            if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != "") {
              this.menuPosition = this.config.layout.menuPosition;
            }

            if (this.config.layout.variant === "Light") {
              this.logoUrl = "assets/img/logo-dark.png";
            } else {
              this.logoUrl = "assets/img/logo.png";
            }

            if (this.config.layout.variant === "Transparent") {
              this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
            } else {
              this.transparentBGClass = "";
            }
          }
        }, {
          key: "onSearchKey",
          value: function onSearchKey(event) {
            if (this.searchResults && this.searchResults.length > 0) {
              this.searchResults.first.host.nativeElement.classList.add("first-active-item");
            }

            if (event.target.value === "") {
              this.seachTextEmpty.emit(true);
            } else {
              this.seachTextEmpty.emit(false);
            }
          }
        }, {
          key: "removeActiveClass",
          value: function removeActiveClass() {
            if (this.searchResults && this.searchResults.length > 0) {
              this.searchResults.first.host.nativeElement.classList.remove("first-active-item");
            }
          }
        }, {
          key: "onEscEvent",
          value: function onEscEvent() {
            this.control.setValue("");
            this.searchOpenClass = "";
            this.seachTextEmpty.emit(true);
          }
        }, {
          key: "onEnter",
          value: function onEnter() {
            if (this.searchResults && this.searchResults.length > 0) {
              var url = this.searchResults.first.url;

              if (url && url != "") {
                this.control.setValue("");
                this.searchOpenClass = "";
                this.router.navigate([url]);
                this.seachTextEmpty.emit(true);
              }
            }
          }
        }, {
          key: "redirectTo",
          value: function redirectTo(value) {
            this.router.navigate([value]);
            this.seachTextEmpty.emit(true);
          }
        }, {
          key: "ChangeLanguage",
          value: function ChangeLanguage(language) {
            this.translate.use(language);

            if (language === "en") {
              this.selectedLanguageText = "English";
              this.selectedLanguageFlag = "./assets/img/flags/us.png";
            } else if (language === "es") {
              this.selectedLanguageText = "Spanish";
              this.selectedLanguageFlag = "./assets/img/flags/es.png";
            } else if (language === "pt") {
              this.selectedLanguageText = "Portuguese";
              this.selectedLanguageFlag = "./assets/img/flags/pt.png";
            } else if (language === "de") {
              this.selectedLanguageText = "German";
              this.selectedLanguageFlag = "./assets/img/flags/de.png";
            }
          }
        }, {
          key: "ToggleClass",
          value: function ToggleClass() {
            if (this.toggleClass === "ft-maximize") {
              this.toggleClass = "ft-minimize";
            } else {
              this.toggleClass = "ft-maximize";
            }
          }
        }, {
          key: "toggleSearchOpenClass",
          value: function toggleSearchOpenClass(display) {
            var _this16 = this;

            this.control.setValue("");

            if (display) {
              this.searchOpenClass = "open";
              setTimeout(function () {
                _this16.searchElement.nativeElement.focus();
              }, 0);
            } else {
              this.searchOpenClass = "";
            }

            this.seachTextEmpty.emit(true);
          }
        }, {
          key: "toggleNotificationSidebar",
          value: function toggleNotificationSidebar() {
            this.layoutService.toggleNotificationSidebar(true);
          }
        }, {
          key: "toggleSidebar",
          value: function toggleSidebar() {
            this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
          }
        }]);

        return _NavbarComponent;
      }();

      _NavbarComponent.ɵfac = function NavbarComponent_Factory(t) {
        return new (t || _NavbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_layout_service__WEBPACK_IMPORTED_MODULE_1__.LayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_2__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute));
      };

      _NavbarComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: _NavbarComponent,
        selectors: [["app-navbar"]],
        viewQuery: function NavbarComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c1, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.searchElement = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.searchResults = _t);
          }
        },
        hostBindings: function NavbarComponent_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("resize", function NavbarComponent_resize_HostBindingHandler($event) {
              return ctx.onResize($event);
            }, false, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresolveWindow"]);
          }
        },
        outputs: {
          toggleHideSidebar: "toggleHideSidebar",
          seachTextEmpty: "seachTextEmpty"
        },
        decls: 59,
        vars: 21,
        consts: [[3, "ngClass"], [1, "container-fluid", "navbar-wrapper"], [1, "navbar-header", "d-flex"], ["data-toggle", "collapse", 1, "navbar-toggle", "menu-toggle", "d-xl-none", "d-block", "float-left", "align-items-center", "justify-content-center", 3, "click"], [1, "ft-menu", "font-medium-3"], [1, "navbar-nav", 3, "clickOutside"], [1, "nav-item", "mr-2", "d-none", "d-lg-block"], ["id", "navbar-fullscreen", "routerLink", "javascript:;", "appToggleFullscreen", "", 1, "nav-link", "apptogglefullscreen", 3, "click"], ["routerLink", "/app/story", 1, "nav-link"], ["routerLink", "/app/combat", 1, "nav-link"], [1, "navbar-container"], ["id", "navbarSupportedContent", 1, "collapse", "navbar-collapse", "d-block"], [1, "navbar-nav"], ["placement", "bottom-left", "display", "static", "ngbDropdown", "", 1, "dropdown", "nav-item", "mr-1"], ["id", "dropdownBasic2", "href", "javascript:;", "data-toggle", "dropdown", "ngbDropdownToggle", "", 1, "nav-link", "dropdown-toggle", "user-dropdown", "d-flex", "align-items-end"], [1, "user", "d-md-flex", "d-none", "mr-2"], [1, "text-right", "mb-0", "mt-1"], ["aria-labelledby", "dropdownBasic2", "ngbDropdownMenu", "", 1, "dropdown-menu", "text-left", "dropdown-menu-right", "m-0", "pb-0", 2, "font-size", "1.5rem"], [1, "dropdown-item", 3, "routerLink"], [1, "d-flex", "align-items-center"], [3, "icon"], [1, "pl-2"], ["routerLink", "/app/edit-monsters", 1, "dropdown-item"], ["routerLink", "/app/edit-spells", 1, "dropdown-item"], ["class", "dropdown-item", 3, "routerLink", 4, "ngIf"], ["routerLink", "/app/edit-sounds", 1, "dropdown-item"], ["routerLink", "/app/edit-maps", 1, "dropdown-item"], ["routerLink", "/app/edit-story", 1, "dropdown-item"], [1, "dropdown-divider"], [1, "nav-item", "p-0", "m-0"], [1, "nav-link", "notification-sidebar-toggle", "p-0", "m-0", 3, "click"], [2, "font-size", "2.2em", 3, "icon"]],
        template: function NavbarComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "nav", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function NavbarComponent_Template_div_click_3_listener() {
              return ctx.toggleSidebar();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "i", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ul", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("clickOutside", function NavbarComponent_Template_ul_clickOutside_5_listener() {
              return ctx.toggleSearchOpenClass(false);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "li", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "a", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_7_listener() {
              return ctx.ToggleClass();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "i");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "a", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, "Story");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "a", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14, "Combat");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "div", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "ul", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "li", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "a", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "div", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "h4", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](22, "Edit Menu");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "div", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "a", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](26, "fa-icon", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "span", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28, " World");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "a", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](31, "fa-icon", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "span", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](33, " Monsters");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](34, "a", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](35, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](36, "fa-icon", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](37, "span", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](38, " Spells");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](39, NavbarComponent_a_39_Template, 5, 2, "a", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](40, "a", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](41, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](42, "fa-icon", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](43, "span", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](44, " Sounds");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](45, "a", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](46, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](47, "fa-icon", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](48, "span", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](49, " Maps");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](50, "a", 27);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](51, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](52, "fa-icon", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](53, "span", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](54, " Story");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](55, "div", 28);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](56, "li", 29);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](57, "a", 30);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function NavbarComponent_Template_a_click_57_listener() {
              return ctx.toggleNotificationSidebar();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](58, "fa-icon", 31);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassMapInterpolate1"]("navbar navbar-expand-lg navbar-light header-navbar ", ctx.transparentBGClass, "");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction4"](16, _c2, ctx.menuPosition === "Top", ctx.menuPosition === "Side" && (ctx.config == null ? null : ctx.config.layout.navbar.type) === "Static", ctx.menuPosition === "Side" && (ctx.config == null ? null : ctx.config.layout.navbar.type) === "Fixed", ctx.isSmallScreen && ctx.menuPosition === "Top"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassMapInterpolate1"](" ", ctx.toggleClass, " font-medium-3");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](16);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate1"]("routerLink", "/app/world", ctx.worldId ? "/" + ctx.worldId + "/edit" : "", "");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("icon", ctx.faGlobe);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("icon", ctx.faDragon);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("icon", ctx.faHatWizard);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.regionId);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("icon", ctx.faSlidersH);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("icon", ctx.faMap);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("icon", ctx.faBookOpen);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("icon", ctx.faCaretSquareDown);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgClass, ng_click_outside__WEBPACK_IMPORTED_MODULE_3__.ClickOutsideDirective, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterLinkWithHref, _directives_toggle_fullscreen_directive__WEBPACK_IMPORTED_MODULE_4__.ToggleFullscreenDirective, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__.NgbDropdown, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__.NgbDropdownToggle, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__.NgbDropdownMenu, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_13__.FaIconComponent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuYXZiYXIuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    9856: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "NotificationSidebarComponent": function NotificationSidebarComponent() {
          return (
            /* binding */
            _NotificationSidebarComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _services_layout_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../services/layout.service */
      60432);
      /* harmony import */


      var _services_world_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../services/world.service */
      40653);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      12057);
      /* harmony import */


      var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ngx-perfect-scrollbar */
      99904);
      /* harmony import */


      var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ng-bootstrap/ng-bootstrap */
      96797);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/forms */
      24751);

      function NotificationSidebarComponent_ng_template_11_input_5_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "input", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function NotificationSidebarComponent_ng_template_11_input_5_Template_input_ngModelChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);

            return ctx_r4.selectedWorld.name = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx_r3.selectedWorld.name);
        }
      }

      function NotificationSidebarComponent_ng_template_11_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h5", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "World");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, NotificationSidebarComponent_ng_template_11_input_5_Template, 1, 1, "input", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "h5", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Select Active NPCs");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "div", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r1.selectedWorld);
        }
      }

      function NotificationSidebarComponent_ng_template_15_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h5", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "General Settings");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "ul", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "li", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "span", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Notifications");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "input", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "label", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "p", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, " Use switches when looking for yes or no answers. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "li", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "span", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Show recent activity");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "div", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](21, "input", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](22, "label", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "p", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, " The \"for\" attribute is necessary to bind checkbox with the input. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "li", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "span", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "Product Update");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](31, "input", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](32, "label", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "p", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34, " Message and mail me on weekly product updates. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "li", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "span", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "Email on Follow");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](41, "input", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](42, "label", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "p", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](44, " Mail me when someone follows me. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "li", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](47, "span", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](48, "Announcements");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](49, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](50, "div", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](51, "input", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](52, "label", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](53, "p", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](54, " Receive all the news and announcements from my clients. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](55, "li", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](56, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](57, "span", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](58, "Date and Time");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](59, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](60, "div", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](61, "input", 40);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](62, "label", 41);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](63, "p", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](64, " Show date and time on top of every page. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](65, "li");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](66, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](67, "span", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](68, "Email on Comments");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](69, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](70, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](71, "input", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](72, "label", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](73, "p", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](74, " Mail me when someone comments on my article. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
      }

      var _c0 = function _c0(a0) {
        return {
          open: a0
        };
      };

      var _NotificationSidebarComponent = /*#__PURE__*/function () {
        function _NotificationSidebarComponent(layoutService, worldService) {
          var _this17 = this;

          _classCallCheck(this, _NotificationSidebarComponent);

          this.layoutService = layoutService;
          this.worldService = worldService;
          this.isOpen = false;

          this.groupBy = function (list, keyGetter) {
            var map = new Map();
            list.forEach(function (item) {
              var key = keyGetter(item);
              var collection = map.get(key);

              if (!collection) {
                map.set(key, [item]);
              } else {
                collection.push(item);
              }
            });
            return map;
          };

          this.layoutSub = layoutService.toggleNotiSidebar$.subscribe(function (open) {
            _this17.isOpen = open;
          });
        }

        _createClass(_NotificationSidebarComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.layoutSub) {
              this.layoutSub.unsubscribe();
            }
          }
        }, {
          key: "onClose",
          value: function onClose() {
            this.layoutService.toggleNotificationSidebar(false);
          }
        }]);

        return _NotificationSidebarComponent;
      }();

      _NotificationSidebarComponent.ɵfac = function NotificationSidebarComponent_Factory(t) {
        return new (t || _NotificationSidebarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_layout_service__WEBPACK_IMPORTED_MODULE_0__.LayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_world_service__WEBPACK_IMPORTED_MODULE_1__.WorldService));
      };

      _NotificationSidebarComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _NotificationSidebarComponent,
        selectors: [["app-notification-sidebar"]],
        decls: 17,
        vars: 4,
        consts: [["id", "notification-sidebar", 1, "notification-sidebar", "d-none", "d-sm-none", "d-md-block", 3, "ngClass"], [1, "notification-sidebar-close", 3, "click"], [1, "ft-x", "font-medium-3", "grey", "darken-1"], [1, "side-nav", "notification-sidebar-content", 3, "perfectScrollbar"], [1, "row"], [1, "col-12", "notification-tab-content"], ["ngbNav", "", 1, "nav-tabs"], ["nav", "ngbNav"], ["ngbNavItem", "", 1, "nav-item"], ["ngbNavLink", "", 1, "nav-link"], ["ngbNavContent", ""], [1, "mt-2", 3, "ngbNavOutlet"], ["id", "activity-tab", "role", "tabpanel", "aria-expanded", "true", "aria-labelledby", "base-tab1", 1, "row", "tab-pane"], ["id", "activity", 1, "col-12"], [1, "my-2", "text-bold-500"], [1, "timeline-left", "timeline-wrapper", "mb-3"], ["type", "text", "class", "form-control", 3, "ngModel", "ngModelChange", 4, "ngIf"], [1, "timeline-left", "timeline-wrapper"], ["type", "text", 1, "form-control", 3, "ngModel", "ngModelChange"], ["id", "settings-tab", "aria-labelledby", "base-tab2", 1, "row", "tab-pane"], ["id", "settings", 1, "col-12"], [1, "mt-2", "mb-3"], [1, "list-unstyled", "mb-0", "mx-2"], [1, "mb-3"], [1, "mb-1"], [1, "text-bold-500"], [1, "float-right"], [1, "custom-switch"], ["id", "noti-s-switch-1", "type", "checkbox", 1, "custom-control-input"], ["for", "noti-s-switch-1", 1, "custom-control-label"], [1, "font-small-3", "m-0"], [1, "checkbox"], ["id", "noti-s-checkbox-1", "type", "checkbox", "checked", "checked"], ["for", "noti-s-checkbox-1"], ["id", "noti-s-switch-4", "type", "checkbox", "checked", "checked", 1, "custom-control-input"], ["for", "noti-s-switch-4", 1, "custom-control-label"], ["id", "noti-s-switch-3", "type", "checkbox", 1, "custom-control-input"], ["for", "noti-s-switch-3", 1, "custom-control-label"], ["id", "noti-s-checkbox-2", "type", "checkbox", "checked", "checked"], ["for", "noti-s-checkbox-2"], ["id", "noti-s-checkbox-3", "type", "checkbox"], ["for", "noti-s-checkbox-3"], ["id", "noti-s-switch-2", "type", "checkbox", "checked", "checked", 1, "custom-control-input"], ["for", "noti-s-switch-2", 1, "custom-control-label"]],
        template: function NotificationSidebarComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "aside", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "a", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NotificationSidebarComponent_Template_a_click_1_listener() {
              return ctx.onClose();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "i", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "nav", 6, 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](8, 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "a", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "NPCs");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, NotificationSidebarComponent_ng_template_11_Template, 9, 1, "ng-template", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](12, 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "a", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Map");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, NotificationSidebarComponent_ng_template_15_Template, 75, 0, "ng-template", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](16, "div", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](2, _c0, ctx.isOpen));

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](16);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngbNavOutlet", _r0);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_4__.PerfectScrollbarDirective, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__.NgbNav, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__.NgbNavItem, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__.NgbNavLink, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__.NgbNavContent, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__.NgbNavOutlet, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJub3RpZmljYXRpb24tc2lkZWJhci5jb21wb25lbnQuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    32677: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FilterPipe": function FilterPipe() {
          return (
            /* binding */
            _FilterPipe
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _FilterPipe = /*#__PURE__*/function () {
        function _FilterPipe() {
          _classCallCheck(this, _FilterPipe);
        }

        _createClass(_FilterPipe, [{
          key: "transform",
          value: function transform(items, searchTerm, labelKey) {
            if (!items || !searchTerm) {
              return null;
            }

            return items.filter(function (item) {
              return item[labelKey || 'name'].toLowerCase().includes(searchTerm.toLowerCase()) === true;
            }).slice(0, 10);
          }
        }]);

        return _FilterPipe;
      }();

      _FilterPipe.ɵfac = function FilterPipe_Factory(t) {
        return new (t || _FilterPipe)();
      };

      _FilterPipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
        name: "filter",
        type: _FilterPipe,
        pure: true
      });
      /***/
    },

    /***/
    15623: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "OrderByPipe": function OrderByPipe() {
          return (
            /* binding */
            _OrderByPipe
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _OrderByPipe = /*#__PURE__*/function () {
        function _OrderByPipe() {
          _classCallCheck(this, _OrderByPipe);
        }

        _createClass(_OrderByPipe, [{
          key: "transform",
          value: function transform(array, field) {
            array.sort(function (a, b) {
              if (a[field] < b[field]) {
                return -1;
              } else if (a[field] > b[field]) {
                return 1;
              } else {
                return 0;
              }
            });
            return array;
          }
        }]);

        return _OrderByPipe;
      }();

      _OrderByPipe.ɵfac = function OrderByPipe_Factory(t) {
        return new (t || _OrderByPipe)();
      };

      _OrderByPipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
        name: "orderBy",
        type: _OrderByPipe,
        pure: true
      });
      /***/
    },

    /***/
    86088: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "PipeModule": function PipeModule() {
          return (
            /* binding */
            _PipeModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      12057);
      /* harmony import */


      var _filter_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./filter.pipe */
      32677);
      /* harmony import */


      var _search_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./search.pipe */
      97941);
      /* harmony import */


      var _short_name_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./short-name.pipe */
      83512);
      /* harmony import */


      var _order_by_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./order-by.pipe */
      15623);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _PipeModule = function _PipeModule() {
        _classCallCheck(this, _PipeModule);
      };

      _PipeModule.ɵfac = function PipeModule_Factory(t) {
        return new (t || _PipeModule)();
      };

      _PipeModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
        type: _PipeModule
      });
      _PipeModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](_PipeModule, {
          declarations: [_filter_pipe__WEBPACK_IMPORTED_MODULE_0__.FilterPipe, _search_pipe__WEBPACK_IMPORTED_MODULE_1__.SearchPipe, _short_name_pipe__WEBPACK_IMPORTED_MODULE_2__.ShortNamePipe, _order_by_pipe__WEBPACK_IMPORTED_MODULE_3__.OrderByPipe],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule],
          exports: [_filter_pipe__WEBPACK_IMPORTED_MODULE_0__.FilterPipe, _search_pipe__WEBPACK_IMPORTED_MODULE_1__.SearchPipe, _short_name_pipe__WEBPACK_IMPORTED_MODULE_2__.ShortNamePipe, _order_by_pipe__WEBPACK_IMPORTED_MODULE_3__.OrderByPipe]
        });
      })();
      /***/

    },

    /***/
    97941: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SearchPipe": function SearchPipe() {
          return (
            /* binding */
            _SearchPipe
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _SearchPipe = /*#__PURE__*/function () {
        function _SearchPipe() {
          _classCallCheck(this, _SearchPipe);
        }

        _createClass(_SearchPipe, [{
          key: "transform",
          value: function transform(value, keys, term) {
            if (!term) return value;
            return (value || []).filter(function (item) {
              return keys.split(',').some(function (key) {
                return item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key]);
              });
            });
          }
        }]);

        return _SearchPipe;
      }();

      _SearchPipe.ɵfac = function SearchPipe_Factory(t) {
        return new (t || _SearchPipe)();
      };

      _SearchPipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
        name: "search",
        type: _SearchPipe,
        pure: true
      });
      /***/
    },

    /***/
    83512: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ShortNamePipe": function ShortNamePipe() {
          return (
            /* binding */
            _ShortNamePipe
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _ShortNamePipe = /*#__PURE__*/function () {
        function _ShortNamePipe() {
          _classCallCheck(this, _ShortNamePipe);
        }

        _createClass(_ShortNamePipe, [{
          key: "transform",
          value: function transform(fullName) {
            return fullName.split(' ').map(function (n) {
              return n[0];
            }).join('');
          }
        }]);

        return _ShortNamePipe;
      }();

      _ShortNamePipe.ɵfac = function ShortNamePipe_Factory(t) {
        return new (t || _ShortNamePipe)();
      };

      _ShortNamePipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
        name: "shortName",
        type: _ShortNamePipe,
        pure: true
      });
      /***/
    },

    /***/
    95180: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CONTENT_ROUTES": function CONTENT_ROUTES() {
          return (
            /* binding */
            _CONTENT_ROUTES
          );
        }
        /* harmony export */

      }); //Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...


      var _CONTENT_ROUTES = [{
        path: "",
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() */
          "angular_app_pages_content-pages_module_ts").then(__webpack_require__.bind(__webpack_require__,
          /*! ../../pages/content-pages.module */
          7263)).then(function (m) {
            return m.ContentPagesModule;
          });
        }
      }];
      /***/
    },

    /***/
    45400: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "Full_ROUTES": function Full_ROUTES() {
          return (
            /* binding */
            _Full_ROUTES
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../shared/auth/auth-guard.service */
      16929); //Route for content layout with sidebar, navbar and footer.


      var _Full_ROUTES = [{
        path: "",
        canActivate: [_shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
        canLoad: [_shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() */
          "angular_app_main-page_page_module_ts").then(__webpack_require__.bind(__webpack_require__,
          /*! ../../main-page/page.module */
          39045)).then(function (m) {
            return m.PageModule;
          });
        }
      }];
      /***/
    },

    /***/
    47107: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ConfigService": function ConfigService() {
          return (
            /* binding */
            _ConfigService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      26215);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _ConfigService = /*#__PURE__*/function () {
        function _ConfigService() {
          _classCallCheck(this, _ConfigService);

          this.templateConf = this.setConfigValue();
          this.templateConfSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(this.templateConf);
          this.templateConf$ = this.templateConfSubject.asObservable();
        } // Default configurations for Light layout. Please check *customizer.service.ts* for different colors and bg images options


        _createClass(_ConfigService, [{
          key: "setConfigValue",
          value: function setConfigValue() {
            return this.templateConf = {
              layout: {
                variant: "Dark",
                menuPosition: "Top",
                customizer: {
                  hidden: true
                },
                navbar: {
                  type: "Static"
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
          } // Default configurations for Dark layout. Please check *customizer.service.ts* for different colors and bg images options
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

        }, {
          key: "applyTemplateConfigChange",
          value: function applyTemplateConfigChange(tempConfig) {
            this.templateConf = Object.assign(this.templateConf, tempConfig);
            this.templateConfSubject.next(this.templateConf);
          }
        }]);

        return _ConfigService;
      }();

      _ConfigService.ɵfac = function ConfigService_Factory(t) {
        return new (t || _ConfigService)();
      };

      _ConfigService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _ConfigService,
        factory: _ConfigService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    90775: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CustomizerService": function CustomizerService() {
          return (
            /* binding */
            _CustomizerService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _config_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./config.service */
      47107);

      var _CustomizerService = /*#__PURE__*/function () {
        function _CustomizerService(config) {
          _classCallCheck(this, _CustomizerService);

          this.config = config; // sidebar BG colors for Light & Dark Layout

          this.light_dark_colors = [{
            code: "mint",
            "class": "gradient-mint",
            active: false,
            type: "gradient"
          }, {
            code: "king-yna",
            "class": "gradient-king-yna",
            active: false,
            type: "gradient"
          }, {
            code: "ibiza-sunset",
            "class": "gradient-ibiza-sunset",
            active: false,
            type: "gradient"
          }, {
            code: "flickr",
            "class": "gradient-flickr",
            active: false,
            type: "gradient"
          }, {
            code: "purple-bliss",
            "class": "gradient-purple-bliss",
            active: false,
            type: "gradient"
          }, {
            code: "man-of-steel",
            "class": "gradient-man-of-steel",
            active: false,
            type: "gradient"
          }, {
            code: "purple-love",
            "class": "gradient-purple-love",
            active: false,
            type: "gradient"
          }, {
            code: "black",
            "class": "bg-black",
            active: false,
            type: "solid"
          }, {
            code: "white",
            "class": "bg-grey",
            active: false,
            type: "solid"
          }, {
            code: "primary",
            "class": "bg-primary",
            active: false,
            type: "solid"
          }, {
            code: "success",
            "class": "bg-success",
            active: false,
            type: "solid"
          }, {
            code: "warning",
            "class": "bg-warning",
            active: false,
            type: "solid"
          }, {
            code: "info",
            "class": "bg-info",
            active: false,
            type: "solid"
          }, {
            code: "danger",
            "class": "bg-danger",
            active: false,
            type: "solid"
          }]; // sidebar BG colors for Transparent Layout

          this.transparent_colors = [{
            "class": "bg-glass-hibiscus",
            active: false
          }, {
            "class": "bg-glass-purple-pizzazz",
            active: false
          }, {
            "class": "bg-glass-blue-lagoon",
            active: false
          }, {
            "class": "bg-glass-electric-violet",
            active: false
          }, {
            "class": "bg-glass-portage",
            active: false
          }, {
            "class": "bg-glass-tundora",
            active: false
          }]; // sidebar BG images for Light & Dark Layout

          this.light_dark_bg_images = [{
            src: "assets/img/sidebar-bg/01.jpg",
            active: false
          }, {
            src: "assets/img/sidebar-bg/02.jpg",
            active: false
          }, {
            src: "assets/img/sidebar-bg/03.jpg",
            active: false
          }, {
            src: "assets/img/sidebar-bg/04.jpg",
            active: false
          }, {
            src: "assets/img/sidebar-bg/05.jpg",
            active: false
          }, {
            src: "assets/img/sidebar-bg/06.jpg",
            active: false
          }]; // Background Colors with Shades for Transparent Layout

          this.transparent_colors_with_shade = [{
            "class": "bg-glass-1",
            active: false
          }, {
            "class": "bg-glass-2",
            active: false
          }, {
            "class": "bg-glass-3",
            active: false
          }, {
            "class": "bg-glass-4",
            active: false
          }];
          this.lightDarkLayoutGradientBGColors = [];
          this.lightDarkLayoutSolidBGColors = [];
          this.transparentLayoutBGColors = [];
          this.transparentLayoutBGColorsWithShades = [];
          this.lightDarkLayoutBGImages = [];
          this.getData();
        }

        _createClass(_CustomizerService, [{
          key: "getData",
          value: function getData() {
            this.lightDarkLayoutGradientBGColors = this.getlightDarkLayoutGradientBGColors();
            this.lightDarkLayoutSolidBGColors = this.getlightDarkLayoutSolidBGColors();
            this.transparentLayoutBGColors = this.getTransparentLayoutBGColors();
            this.transparentLayoutBGColorsWithShades = this.GetTransparentLayoutBGColorsWithShades();
            this.lightDarkLayoutBGImages = this.getLightDarkLayoutBGImages();
          }
        }, {
          key: "getlightDarkLayoutGradientBGColors",
          value: function getlightDarkLayoutGradientBGColors() {
            var _this18 = this;

            return this.light_dark_colors.filter(function (_) {
              return _.type === "gradient";
            }).map(function (color) {
              color.active = color.code === _this18.config.templateConf.layout.sidebar.backgroundColor;
              return _objectSpread({}, color);
            });
          }
        }, {
          key: "getlightDarkLayoutSolidBGColors",
          value: function getlightDarkLayoutSolidBGColors() {
            var _this19 = this;

            return this.light_dark_colors.filter(function (_) {
              return _.type === "solid";
            }).map(function (color) {
              color.active = color.code === _this19.config.templateConf.layout.sidebar.backgroundColor;
              return _objectSpread({}, color);
            });
          }
        }, {
          key: "getTransparentLayoutBGColors",
          value: function getTransparentLayoutBGColors() {
            var _this20 = this;

            return this.transparent_colors.map(function (color) {
              color.active = color["class"] === _this20.config.templateConf.layout.sidebar.backgroundColor;
              return _objectSpread({}, color);
            });
          }
        }, {
          key: "GetTransparentLayoutBGColorsWithShades",
          value: function GetTransparentLayoutBGColorsWithShades() {
            var _this21 = this;

            return this.transparent_colors_with_shade.map(function (color) {
              color.active = color["class"] === _this21.config.templateConf.layout.sidebar.backgroundColor;
              return _objectSpread({}, color);
            });
          }
        }, {
          key: "getLightDarkLayoutBGImages",
          value: function getLightDarkLayoutBGImages() {
            var _this22 = this;

            return this.light_dark_bg_images.map(function (image) {
              image.active = image.src === _this22.config.templateConf.layout.sidebar.backgroundImageURL;
              return _objectSpread({}, image);
            });
          } //called when click to change on any Gradient/Solid color for Light & Dark layout in customizer

        }, {
          key: "changeSidebarBGColor",
          value: function changeSidebarBGColor(color) {
            var conf = this.config.templateConf;
            conf.layout.sidebar.backgroundColor = color.code;
            this.config.applyTemplateConfigChange({
              layout: conf.layout
            });
            this.getData();
          } //called when click to change on any Transparent color for Transparent layout in customizer

        }, {
          key: "changeSidebarTransparentBGColor",
          value: function changeSidebarTransparentBGColor(color) {
            var conf = this.config.templateConf;
            conf.layout.sidebar.backgroundColor = color["class"];
            conf.layout.sidebar.backgroundImage = false;
            conf.layout.sidebar.backgroundImageURL = "";
            this.config.applyTemplateConfigChange({
              layout: conf.layout
            });
            this.getData();
          } //called when click to change on any image for Light & Dark layout in customizer

        }, {
          key: "changeSidebarBgImage",
          value: function changeSidebarBgImage(image) {
            var conf = this.config.templateConf;
            conf.layout.sidebar.backgroundImageURL = image.src;
            this.config.applyTemplateConfigChange({
              layout: conf.layout
            });
            this.getData();
          }
        }, {
          key: "bgImageDisplay",
          value: function bgImageDisplay(e) {
            var conf = this.config.templateConf;

            if (e.target.checked) {
              conf.layout.sidebar.backgroundImage = true;
            } else {
              conf.layout.sidebar.backgroundImage = false;
            }

            this.config.applyTemplateConfigChange({
              layout: conf.layout
            });
          }
        }, {
          key: "toggleCompactMenu",
          value: function toggleCompactMenu(e) {
            var conf = this.config.templateConf;

            if (e.target.checked) {
              conf.layout.sidebar.collapsed = true;
            } else {
              conf.layout.sidebar.collapsed = false;
            }

            this.config.applyTemplateConfigChange({
              layout: conf.layout
            });
          }
        }, {
          key: "changeSidebarWidth",
          value: function changeSidebarWidth(value) {
            var conf = this.config.templateConf;
            conf.layout.sidebar.size = value;
            this.config.applyTemplateConfigChange({
              layout: conf.layout
            });
          }
        }, {
          key: "toggleNavbarType",
          value: function toggleNavbarType(value) {
            var conf = this.config.templateConf;
            conf.layout.navbar.type = value;
            this.config.applyTemplateConfigChange({
              layout: conf.layout
            });
          } // position: "Side" for vertical menu and position: "Top" for horizontal menu

        }, {
          key: "toggleMenuPosition",
          value: function toggleMenuPosition(position) {
            var conf = this.config.templateConf;
            conf.layout.menuPosition = position;
            this.config.applyTemplateConfigChange({
              layout: conf.layout
            });
          }
        }, {
          key: "switchLayout",
          value: function switchLayout(layout, isBgImageDisplay) {
            var conf = this.config.templateConf;

            if (layout.toLowerCase() === "light") {
              conf.layout.variant = "Light";
              conf.layout.sidebar.backgroundImageURL = this.light_dark_bg_images[0].src;
              conf.layout.sidebar.backgroundColor = this.light_dark_colors[5].code;
              conf.layout.sidebar.backgroundImage = isBgImageDisplay;
            } else if (layout.toLowerCase() === "dark") {
              conf.layout.variant = "Dark";
              conf.layout.sidebar.backgroundImageURL = this.light_dark_bg_images[2].src;
              conf.layout.sidebar.backgroundColor = this.light_dark_colors[7].code;
              conf.layout.sidebar.backgroundImage = isBgImageDisplay;
            } else if (layout.toLowerCase() === "transparent") {
              conf.layout.variant = "Transparent";
              conf.layout.sidebar.backgroundImageURL = "";
              conf.layout.sidebar.backgroundColor = this.transparent_colors_with_shade[0]["class"];
            }

            this.config.applyTemplateConfigChange({
              layout: conf.layout
            });
            this.getData();
          }
        }]);

        return _CustomizerService;
      }();

      _CustomizerService.ɵfac = function CustomizerService_Factory(t) {
        return new (t || _CustomizerService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_config_service__WEBPACK_IMPORTED_MODULE_0__.ConfigService));
      };

      _CustomizerService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _CustomizerService,
        factory: _CustomizerService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    60432: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LayoutService": function LayoutService() {
          return (
            /* binding */
            _LayoutService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      79765);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _LayoutService = /*#__PURE__*/function () {
        function _LayoutService() {
          _classCallCheck(this, _LayoutService);

          this.toggleSidebar = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject(); // small screen

          this.overlaySidebarToggle = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
          this.toggleNotiSidebar = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject(); // Observable

          this.toggleSidebar$ = this.toggleSidebar.asObservable();
          this.overlaySidebarToggle$ = this.overlaySidebarToggle.asObservable();
          this.toggleNotiSidebar$ = this.toggleNotiSidebar.asObservable();
        }

        _createClass(_LayoutService, [{
          key: "toggleSidebarSmallScreen",
          value: function toggleSidebarSmallScreen(toggle) {
            this.toggleSidebar.next(toggle);
          }
        }, {
          key: "overlaySidebartoggle",
          value: function overlaySidebartoggle(toggle) {
            this.overlaySidebarToggle.next(toggle);
          }
        }, {
          key: "toggleNotificationSidebar",
          value: function toggleNotificationSidebar(toggle) {
            this.toggleNotiSidebar.next(toggle);
          }
        }]);

        return _LayoutService;
      }();

      _LayoutService.ɵfac = function LayoutService_Factory(t) {
        return new (t || _LayoutService)();
      };

      _LayoutService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _LayoutService,
        factory: _LayoutService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    80723: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TokenService": function TokenService() {
          return (
            /* binding */
            _TokenService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      74788);

      var _TokenService = /*#__PURE__*/function () {
        function _TokenService() {
          _classCallCheck(this, _TokenService);

          this.issuer = {
            login: 'http://127.0.0.1:8000/api/auth/login',
            register: 'http://127.0.0.1:8000/api/auth/register'
          };
        }

        _createClass(_TokenService, [{
          key: "handleData",
          value: function handleData(token) {
            localStorage.setItem('auth_token', token);
          }
        }, {
          key: "getToken",
          value: function getToken() {
            return localStorage.getItem('auth_token');
          } // Verify the token

        }, {
          key: "isValidToken",
          value: function isValidToken() {
            var token = this.getToken();

            if (token) {
              var payload = this.payload(token);

              if (payload) {
                return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
              }
            } else {
              return false;
            }
          }
        }, {
          key: "payload",
          value: function payload(token) {
            var jwtPayload = token.split('.')[1];
            return JSON.parse(atob(jwtPayload));
          } // User state based on valid token

        }, {
          key: "isLoggedIn",
          value: function isLoggedIn() {
            return this.isValidToken();
          } // Remove token

        }, {
          key: "removeToken",
          value: function removeToken() {
            localStorage.removeItem('auth_token');
          }
        }]);

        return _TokenService;
      }();

      _TokenService.ɵfac = function TokenService_Factory(t) {
        return new (t || _TokenService)();
      };

      _TokenService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _TokenService,
        factory: _TokenService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    28370: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "WINDOW": function WINDOW() {
          return (
            /* binding */
            _WINDOW
          );
        },

        /* harmony export */
        "WindowRef": function WindowRef() {
          return (
            /* binding */
            _WindowRef
          );
        },

        /* harmony export */
        "BrowserWindowRef": function BrowserWindowRef() {
          return (
            /* binding */
            _BrowserWindowRef
          );
        },

        /* harmony export */
        "windowFactory": function windowFactory() {
          return (
            /* binding */
            _windowFactory
          );
        },

        /* harmony export */
        "browserWindowProvider": function browserWindowProvider() {
          return (
            /* binding */
            _browserWindowProvider
          );
        },

        /* harmony export */
        "windowProvider": function windowProvider() {
          return (
            /* binding */
            _windowProvider
          );
        },

        /* harmony export */
        "WINDOW_PROVIDERS": function WINDOW_PROVIDERS() {
          return (
            /* binding */
            _WINDOW_PROVIDERS
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common */
      12057);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* Create a new injection token for injecting the window into a component. */


      var _WINDOW = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("WindowToken");
      /* Define abstract class for obtaining reference to the global window object. */


      var _WindowRef = /*#__PURE__*/function () {
        function _WindowRef() {
          _classCallCheck(this, _WindowRef);
        }

        _createClass(_WindowRef, [{
          key: "nativeWindow",
          get: function get() {
            throw new Error("Not implemented.");
          }
        }]);

        return _WindowRef;
      }();
      /* Define class that implements the abstract class and returns the native window object. */


      var _BrowserWindowRef = /*#__PURE__*/function (_WindowRef2) {
        _inherits(_BrowserWindowRef, _WindowRef2);

        var _super = _createSuper(_BrowserWindowRef);

        function _BrowserWindowRef() {
          _classCallCheck(this, _BrowserWindowRef);

          return _super.call(this);
        }

        _createClass(_BrowserWindowRef, [{
          key: "nativeWindow",
          get: function get() {
            return window;
          }
        }]);

        return _BrowserWindowRef;
      }(_WindowRef);

      _BrowserWindowRef.ɵfac = function BrowserWindowRef_Factory(t) {
        return new (t || _BrowserWindowRef)();
      };

      _BrowserWindowRef.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _BrowserWindowRef,
        factory: _BrowserWindowRef.ɵfac
      });
      /* Create an factory function that returns the native window object. */

      function _windowFactory(browserWindowRef, platformId) {
        if ((0, _angular_common__WEBPACK_IMPORTED_MODULE_1__.isPlatformBrowser)(platformId)) {
          return browserWindowRef.nativeWindow;
        }

        return new Object();
      }
      /* Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class. */


      var _browserWindowProvider = {
        provide: _WindowRef,
        useClass: _BrowserWindowRef
      };
      /* Create an injectable provider that uses the windowFactory function for returning the native window object. */

      var _windowProvider = {
        provide: _WINDOW,
        useFactory: _windowFactory,
        deps: [_WindowRef, _angular_core__WEBPACK_IMPORTED_MODULE_0__.PLATFORM_ID]
      };
      /* Create an array of providers. */

      var _WINDOW_PROVIDERS = [_browserWindowProvider, _windowProvider];
      /***/
    },

    /***/
    40653: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "WorldService": function WorldService() {
          return (
            /* binding */
            _WorldService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      78345);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      26215);
      /* harmony import */


      var _models_world__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../models/world */
      53187);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common/http */
      58497);

      var _WorldService = function _WorldService(http) {
        var _this23 = this;

        _classCallCheck(this, _WorldService);

        this.http = http;
        this.npcsSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject([]);
        this.npcs$ = this.npcsSource.asObservable();
        this.selectedNpcSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject([]);
        this.selectedNpc$ = this.selectedNpcSource.asObservable();
        this.worldDataSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(new _models_world__WEBPACK_IMPORTED_MODULE_0__.World());
        this.worldData$ = this.worldDataSource.asObservable();

        this.getWorld = function (id) {
          _this23.http.get("/api/world/" + id).subscribe(function (data) {
            return _this23.worldDataSource.next(data);
          });
        };

        this.getWorldFromRegion = function (id) {
          _this23.http.get("/api/world/fr/" + id).subscribe(function (data) {
            return _this23.worldDataSource.next(data);
          });
        };

        this.getRegion = function (id) {// this.http.get('/api/region/' + id).subscribe((data: {region: Region}) => this.worldDataSource.next(data.region));
        };

        this.getNpc = function (npcId) {
          _this23.http.get("/api/npc/" + npcId).subscribe(function (data) {
            return _this23.selectedNpcSource.next(data.npc);
          });
        };

        this.getNpcs = function (regionId) {
          return _this23.http.get("/api/region/" + regionId + "/npcs");
        };

        this.getAspects = function () {
          return _this23.http.get("/api/aspects");
        };

        this.updateNpc = function (params) {
          return _this23.http.post("/api/npcs/npc/update", params);
        };

        this.addNpc = function (params) {
          return _this23.http.post("/api/npcs/npc/add", params);
        };

        this.deleteNpc = function (params) {
          return _this23.http.post("/api/npcs/npc/delete", params);
        };

        this.seedRegion = function (region) {
          var call = _this23.http.get("/api/region/" + region.id + "/seed").pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.share)());

          return call;
        };

        this.saveRegion = function (region) {
          var call = _this23.http.put("/api/region/" + region.id, region).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.share)());

          return call;
        };

        this.generateFeatures = function (npcId, lockedFeatures) {
          return _this23.http.put("/api/npc/" + npcId + "/generate-features", {
            locked_features: lockedFeatures
          }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.share)());
        }; // getRegions = (params) => {
        //     return this.http.post('/api/npcs/region/get', params);
        // }


        this.ageRegion = function (region, years) {
          var call = _this23.http.get("/api/region/" + region.id + "/age/" + years).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.share)());

          return call;
        };

        this.clearRegion = function (region) {
          var call = _this23.http.get("/api/region/" + region.id + "/clear").pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.share)());

          return call;
        }; // updateRegion = (params) => {
        //     const call = this.http.post('/api/npcs/region/update', params).pipe(share());
        //     call.subscribe((data) => this.worldDataSource.next(data));
        //     return call;
        // }


        this.addRegion = function (world) {
          var region = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          var call = _this23.http.post("/api/world/" + world.id + "/region/add", {
            region: region
          }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.share)());

          return call;
        };

        this.deleteRegion = function (region) {
          var call = _this23.http["delete"]("/api/region/" + region.id).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.share)());

          return call;
        };
      };

      _WorldService.ɵfac = function WorldService_Factory(t) {
        return new (t || _WorldService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient));
      };

      _WorldService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
        token: _WorldService,
        factory: _WorldService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    8421: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SharedModule": function SharedModule() {
          return (
            /* binding */
            _SharedModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! @angular/common */
      12057);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! @angular/router */
      3984);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
      /*! @angular/forms */
      24751);
      /* harmony import */


      var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
      /*! @angular/cdk/overlay */
      933);
      /* harmony import */


      var _angular_material_menu__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
      /*! @angular/material/menu */
      23021);
      /* harmony import */


      var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! @ng-bootstrap/ng-bootstrap */
      96797);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
      /*! @ngx-translate/core */
      75629);
      /* harmony import */


      var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
      /*! ngx-perfect-scrollbar */
      99904);
      /* harmony import */


      var ng_click_outside__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ng-click-outside */
      64623);
      /* harmony import */


      var _components_autocomplete_autocomplete_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./components/autocomplete/autocomplete.module */
      31977);
      /* harmony import */


      var _angular_app_shared_pipes_pipe_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../angular/app/shared/pipes/pipe.module */
      86088);
      /* harmony import */


      var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
      /*! @fortawesome/angular-fontawesome */
      54163);
      /* harmony import */


      var _footer_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./footer/footer.component */
      26590);
      /* harmony import */


      var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./navbar/navbar.component */
      96319);
      /* harmony import */


      var _horizontal_menu_horizontal_menu_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./horizontal-menu/horizontal-menu.component */
      83686);
      /* harmony import */


      var _vertical_menu_vertical_menu_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./vertical-menu/vertical-menu.component */
      70644);
      /* harmony import */


      var _customizer_customizer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./customizer/customizer.component */
      7114);
      /* harmony import */


      var _notification_sidebar_notification_sidebar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./notification-sidebar/notification-sidebar.component */
      9856);
      /* harmony import */


      var _directives_toggle_fullscreen_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./directives/toggle-fullscreen.directive */
      66763);
      /* harmony import */


      var _directives_sidebar_link_directive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./directives/sidebar-link.directive */
      92489);
      /* harmony import */


      var _directives_sidebar_dropdown_directive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ./directives/sidebar-dropdown.directive */
      77663);
      /* harmony import */


      var _directives_sidebar_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ./directives/sidebar-anchor-toggle.directive */
      60252);
      /* harmony import */


      var _directives_sidebar_directive__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ./directives/sidebar.directive */
      17618);
      /* harmony import */


      var _directives_topmenu_directive__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ./directives/topmenu.directive */
      45197);
      /* harmony import */


      var _directives_topmenu_link_directive__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! ./directives/topmenu-link.directive */
      78819);
      /* harmony import */


      var _directives_topmenu_dropdown_directive__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ./directives/topmenu-dropdown.directive */
      20154);
      /* harmony import */


      var _directives_topmenu_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! ./directives/topmenu-anchor-toggle.directive */
      24378);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @angular/core */
      74788); //COMPONENTS
      // import { ContextMenuComponent } from './components/context-menu-component/context-menu.component';
      //DIRECTIVES


      var _SharedModule = function _SharedModule() {
        _classCallCheck(this, _SharedModule);
      };

      _SharedModule.ɵfac = function SharedModule_Factory(t) {
        return new (t || _SharedModule)();
      };

      _SharedModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineNgModule"]({
        type: _SharedModule
      });
      _SharedModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule, _angular_common__WEBPACK_IMPORTED_MODULE_20__.CommonModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__.NgbModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__.TranslateModule, _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormsModule, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_24__.FontAwesomeModule, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__.OverlayModule, _angular_forms__WEBPACK_IMPORTED_MODULE_23__.ReactiveFormsModule, ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_26__.PerfectScrollbarModule, ng_click_outside__WEBPACK_IMPORTED_MODULE_0__.ClickOutsideModule, _components_autocomplete_autocomplete_module__WEBPACK_IMPORTED_MODULE_1__.AutocompleteModule, _angular_app_shared_pipes_pipe_module__WEBPACK_IMPORTED_MODULE_2__.PipeModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_27__.MatMenuModule], _angular_common__WEBPACK_IMPORTED_MODULE_20__.CommonModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__.NgbModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__.TranslateModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_27__.MatMenuModule, _angular_app_shared_pipes_pipe_module__WEBPACK_IMPORTED_MODULE_2__.PipeModule]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵsetNgModuleScope"](_SharedModule, {
          declarations: [_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__.FooterComponent, _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__.NavbarComponent, _vertical_menu_vertical_menu_component__WEBPACK_IMPORTED_MODULE_6__.VerticalMenuComponent, _horizontal_menu_horizontal_menu_component__WEBPACK_IMPORTED_MODULE_5__.HorizontalMenuComponent, _customizer_customizer_component__WEBPACK_IMPORTED_MODULE_7__.CustomizerComponent, _notification_sidebar_notification_sidebar_component__WEBPACK_IMPORTED_MODULE_8__.NotificationSidebarComponent, _directives_toggle_fullscreen_directive__WEBPACK_IMPORTED_MODULE_9__.ToggleFullscreenDirective, _directives_sidebar_link_directive__WEBPACK_IMPORTED_MODULE_10__.SidebarLinkDirective, _directives_sidebar_dropdown_directive__WEBPACK_IMPORTED_MODULE_11__.SidebarDropdownDirective, _directives_sidebar_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_12__.SidebarAnchorToggleDirective, _directives_sidebar_directive__WEBPACK_IMPORTED_MODULE_13__.SidebarDirective, _directives_topmenu_link_directive__WEBPACK_IMPORTED_MODULE_15__.TopMenuLinkDirective, _directives_topmenu_dropdown_directive__WEBPACK_IMPORTED_MODULE_16__.TopMenuDropdownDirective, _directives_topmenu_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_17__.TopMenuAnchorToggleDirective, _directives_topmenu_directive__WEBPACK_IMPORTED_MODULE_14__.TopMenuDirective],
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule, _angular_common__WEBPACK_IMPORTED_MODULE_20__.CommonModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__.NgbModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__.TranslateModule, _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormsModule, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_24__.FontAwesomeModule, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_25__.OverlayModule, _angular_forms__WEBPACK_IMPORTED_MODULE_23__.ReactiveFormsModule, ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_26__.PerfectScrollbarModule, ng_click_outside__WEBPACK_IMPORTED_MODULE_0__.ClickOutsideModule, _components_autocomplete_autocomplete_module__WEBPACK_IMPORTED_MODULE_1__.AutocompleteModule, _angular_app_shared_pipes_pipe_module__WEBPACK_IMPORTED_MODULE_2__.PipeModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_27__.MatMenuModule],
          exports: [_angular_common__WEBPACK_IMPORTED_MODULE_20__.CommonModule, _footer_footer_component__WEBPACK_IMPORTED_MODULE_3__.FooterComponent, _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__.NavbarComponent, _vertical_menu_vertical_menu_component__WEBPACK_IMPORTED_MODULE_6__.VerticalMenuComponent, _horizontal_menu_horizontal_menu_component__WEBPACK_IMPORTED_MODULE_5__.HorizontalMenuComponent, _customizer_customizer_component__WEBPACK_IMPORTED_MODULE_7__.CustomizerComponent, _notification_sidebar_notification_sidebar_component__WEBPACK_IMPORTED_MODULE_8__.NotificationSidebarComponent, _directives_toggle_fullscreen_directive__WEBPACK_IMPORTED_MODULE_9__.ToggleFullscreenDirective, _directives_sidebar_directive__WEBPACK_IMPORTED_MODULE_13__.SidebarDirective, _directives_topmenu_directive__WEBPACK_IMPORTED_MODULE_14__.TopMenuDirective, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__.NgbModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__.TranslateModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_27__.MatMenuModule, _angular_app_shared_pipes_pipe_module__WEBPACK_IMPORTED_MODULE_2__.PipeModule]
        });
      })();
      /***/

    },

    /***/
    14958: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ROUTES": function ROUTES() {
          return (
            /* binding */
            _ROUTES
          );
        }
        /* harmony export */

      }); //Sidebar menu Routes and data


      var _ROUTES = [{
        path: "/page",
        title: "Page",
        icon: "ft-home",
        "class": "",
        badge: "",
        badgeClass: "",
        isExternalLink: false,
        submenu: []
      }, {
        path: "",
        title: "Menu Levels",
        icon: "ft-align-left",
        "class": "has-sub",
        badge: "3",
        badgeClass: "badge badge-pill badge-danger float-right mr-1 mt-1",
        isExternalLink: false,
        submenu: [{
          path: "/YOUR-ROUTE-PATH",
          title: "Second Level",
          icon: "ft-arrow-right submenu-icon",
          "class": "",
          badge: "",
          badgeClass: "",
          isExternalLink: false,
          submenu: []
        }, {
          path: "",
          title: "Second Level Child",
          icon: "ft-arrow-right submenu-icon",
          "class": "has-sub",
          badge: "",
          badgeClass: "",
          isExternalLink: false,
          submenu: [{
            path: "/YOUR-ROUTE-PATH",
            title: "Third Level 1.1",
            icon: "ft-arrow-right submenu-icon",
            "class": "",
            badge: "",
            badgeClass: "",
            isExternalLink: false,
            submenu: []
          }, {
            path: "/YOUR-ROUTE-PATH",
            title: "Third Level 1.2",
            icon: "ft-arrow-right submenu-icon",
            "class": "",
            badge: "",
            badgeClass: "",
            isExternalLink: false,
            submenu: []
          }]
        }]
      }];
      /***/
    },

    /***/
    70644: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "VerticalMenuComponent": function VerticalMenuComponent() {
          return (
            /* binding */
            _VerticalMenuComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _vertical_menu_routes_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./vertical-menu-routes.config */
      14958);
      /* harmony import */


      var _horizontal_menu_navigation_routes_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../horizontal-menu/navigation-routes.config */
      83155);
      /* harmony import */


      var _animations_custom_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../animations/custom-animations */
      56681);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/router */
      3984);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ngx-translate/core */
      75629);
      /* harmony import */


      var _services_layout_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../services/layout.service */
      60432);
      /* harmony import */


      var _services_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../services/config.service */
      47107);
      /* harmony import */


      var ngx_device_detector__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ngx-device-detector */
      30730);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/common */
      12057);
      /* harmony import */


      var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ngx-perfect-scrollbar */
      99904);
      /* harmony import */


      var _directives_sidebar_dropdown_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../directives/sidebar-dropdown.directive */
      77663);
      /* harmony import */


      var _directives_sidebar_link_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../directives/sidebar-link.directive */
      92489);
      /* harmony import */


      var _directives_sidebar_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../directives/sidebar-anchor-toggle.directive */
      60252);

      var _c0 = ["toggleIcon"];

      var _c1 = function _c1() {
        return ["/page"];
      };

      var _c2 = function _c2(a0, a1) {
        return {
          "ft-toggle-left": a0,
          "ft-toggle-right": a1
        };
      };

      function VerticalMenuComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
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

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function VerticalMenuComponent_div_0_Template_a_click_7_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r4);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r3.toggleSidebar();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "i", 12, 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "a", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function VerticalMenuComponent_div_0_Template_a_click_10_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r4);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r5.CloseSidebar();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](11, "i", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](3, _c1));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("src", ctx_r0.logoUrl, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction2"](4, _c2, ctx_r0.config.layout.sidebar.collapsed, !ctx_r0.config.layout.sidebar.collapsed));
        }
      }

      var _c3 = function _c3(a0) {
        return [a0];
      };

      function VerticalMenuComponent_li_4_a_1_span_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuItem_r6.badgeClass));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuItem_r6.badge);
        }
      }

      function VerticalMenuComponent_li_4_a_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_a_1_span_5_Template, 2, 4, "span", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](5, _c3, menuItem_r6.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 3, menuItem_r6.title));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuItem_r6.badge && menuItem_r6.badge != "");
        }
      }

      function VerticalMenuComponent_li_4_a_2_span_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuItem_r6.badgeClass));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuItem_r6.badge);
        }
      }

      function VerticalMenuComponent_li_4_a_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_a_2_span_5_Template, 2, 4, "span", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("routerLink", menuItem_r6.path);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](6, _c3, menuItem_r6.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, menuItem_r6.title));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuItem_r6.badge && menuItem_r6.badge != "");
        }
      }

      function VerticalMenuComponent_li_4_a_3_span_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuItem_r6.badgeClass));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuItem_r6.badge);
        }
      }

      function VerticalMenuComponent_li_4_a_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_a_3_span_5_Template, 2, 4, "span", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("href", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](6, _c3, menuItem_r6.path), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](8, _c3, menuItem_r6.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, menuItem_r6.title));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuItem_r6.badge && menuItem_r6.badge != "");
        }
      }

      function VerticalMenuComponent_li_4_ul_4_li_1_a_1_span_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuSubItem_r21.badgeClass));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuSubItem_r21.badge);
        }
      }

      function VerticalMenuComponent_li_4_ul_4_li_1_a_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_ul_4_li_1_a_1_span_5_Template, 2, 4, "span", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](5, _c3, menuSubItem_r21.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 3, menuSubItem_r21.title));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubItem_r21.badge && menuSubItem_r21.badge != "");
        }
      }

      function VerticalMenuComponent_li_4_ul_4_li_1_a_2_span_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuSubItem_r21.badgeClass));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuSubItem_r21.badge);
        }
      }

      function VerticalMenuComponent_li_4_ul_4_li_1_a_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_ul_4_li_1_a_2_span_5_Template, 2, 4, "span", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("routerLink", menuSubItem_r21.path);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](6, _c3, menuSubItem_r21.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, menuSubItem_r21.title));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubItem_r21.badge && menuSubItem_r21.badge != "");
        }
      }

      function VerticalMenuComponent_li_4_ul_4_li_1_a_3_span_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuSubItem_r21.badgeClass));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuSubItem_r21.badge);
        }
      }

      function VerticalMenuComponent_li_4_ul_4_li_1_a_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_ul_4_li_1_a_3_span_5_Template, 2, 4, "span", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("routerLink", menuSubItem_r21.path);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](6, _c3, menuSubItem_r21.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, menuSubItem_r21.title));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubItem_r21.badge && menuSubItem_r21.badge != "");
        }
      }

      function VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_a_1_span_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubsubItem_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuSubsubItem_r36.badgeClass));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuSubsubItem_r36.badge);
        }
      }

      function VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_a_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_a_1_span_5_Template, 2, 4, "span", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubsubItem_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("routerLink", menuSubsubItem_r36.path);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](6, _c3, menuSubsubItem_r36.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, menuSubsubItem_r36.title));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubsubItem_r36.badge && menuSubsubItem_r36.badge != "");
        }
      }

      function VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_ng_template_2_span_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubsubItem_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c3, menuSubsubItem_r36.badgeClass));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](menuSubsubItem_r36.badge);
        }
      }

      function VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_ng_template_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "i", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_ng_template_2_span_5_Template, 2, 4, "span", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubsubItem_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("routerLink", menuSubsubItem_r36.path);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](6, _c3, menuSubsubItem_r36.icon));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, menuSubsubItem_r36.title));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubsubItem_r36.badge && menuSubsubItem_r36.badge != "");
        }
      }

      var _c4 = function _c4() {
        return {
          exact: true
        };
      };

      function VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "li", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_a_1_Template, 6, 8, "a", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_ng_template_2_Template, 6, 8, "ng-template", null, 35, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubsubItem_r36 = ctx.$implicit;

          var _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](3);

          var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](4).$implicit;

          var ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("level", ctx_r35.level + 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("parent", menuItem_r6.title)("hasSub", false)("path", menuSubsubItem_r36.path)("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](8, _c4))("ngClass", ctx_r35.config.layout.menuPosition === "Side" ? menuSubsubItem_r36["class"] : "");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !menuSubsubItem_r36.isExternalLink)("ngIfElse", _r38);
        }
      }

      function VerticalMenuComponent_li_4_ul_4_li_1_ul_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ul", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, VerticalMenuComponent_li_4_ul_4_li_1_ul_4_li_1_Template, 4, 9, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubItem_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", menuSubItem_r21.submenu);
        }
      }

      var _c5 = function _c5(a0) {
        return {
          "has-sub": a0
        };
      };

      function VerticalMenuComponent_li_4_ul_4_li_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "li", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, VerticalMenuComponent_li_4_ul_4_li_1_a_1_Template, 6, 7, "a", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, VerticalMenuComponent_li_4_ul_4_li_1_a_2_Template, 6, 8, "a", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, VerticalMenuComponent_li_4_ul_4_li_1_a_3_Template, 6, 8, "a", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, VerticalMenuComponent_li_4_ul_4_li_1_ul_4_Template, 2, 1, "ul", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuSubItem_r21 = ctx.$implicit;

          var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;

          var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("level", ctx_r20.level + 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("parent", menuItem_r6.title)("hasSub", menuSubItem_r21["class"].includes("has-sub") ? true : false)("path", menuSubItem_r21.path)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](10, _c5, menuSubItem_r21["class"].includes("has-sub") ? true : false))("routerLinkActive", menuSubItem_r21.submenu.length != 0 ? "open" : "active");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubItem_r21.submenu.length > 0 && !menuSubItem_r21.isExternalLink);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubItem_r21.submenu.length === 0 && !menuSubItem_r21.isExternalLink);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubItem_r21.isExternalLink);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuSubItem_r21.submenu.length > 0);
        }
      }

      function VerticalMenuComponent_li_4_ul_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ul", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, VerticalMenuComponent_li_4_ul_4_li_1_Template, 5, 12, "li", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", menuItem_r6.submenu);
        }
      }

      var _c6 = function _c6() {
        return {
          exact: false
        };
      };

      function VerticalMenuComponent_li_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "li", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, VerticalMenuComponent_li_4_a_1_Template, 6, 7, "a", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, VerticalMenuComponent_li_4_a_2_Template, 6, 8, "a", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, VerticalMenuComponent_li_4_a_3_Template, 6, 10, "a", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, VerticalMenuComponent_li_4_ul_4_Template, 2, 1, "ul", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r6 = ctx.$implicit;

          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("level", ctx_r1.level + 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("parent", menuItem_r6.title)("path", menuItem_r6.path)("hasSub", menuItem_r6["class"].includes("has-sub") ? true : false)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](11, _c5, menuItem_r6["class"].includes("has-sub") ? true : false))("routerLinkActive", menuItem_r6.submenu.length != 0 ? "open" : "active")("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](13, _c6));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuItem_r6.submenu.length > 0 && !menuItem_r6.isExternalLink);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuItem_r6.submenu.length === 0 && !menuItem_r6.isExternalLink);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuItem_r6.isExternalLink);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", menuItem_r6.submenu.length > 0);
        }
      }

      var _VerticalMenuComponent = /*#__PURE__*/function () {
        function _VerticalMenuComponent(router, translate, layoutService, configService, cdr, deviceService) {
          _classCallCheck(this, _VerticalMenuComponent);

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
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("resize", true, false);
            window.dispatchEvent(evt);
          };

          this.config = this.configService.templateConf;
          this.innerWidth = window.innerWidth;
          this.isTouchDevice();
        }

        _createClass(_VerticalMenuComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.menuItems = _vertical_menu_routes_config__WEBPACK_IMPORTED_MODULE_0__.ROUTES;
          }
        }, {
          key: "ngAfterViewInit",
          value: function ngAfterViewInit() {
            var _this24 = this;

            this.configSub = this.configService.templateConf$.subscribe(function (templateConf) {
              if (templateConf) {
                _this24.config = templateConf;
              }

              _this24.loadLayout();

              _this24.cdr.markForCheck();
            });
            this.layoutSub = this.layoutService.overlaySidebarToggle$.subscribe(function (collapse) {
              if (_this24.config.layout.menuPosition === "Side") {
                _this24.collapseSidebar = collapse;
              }
            });
          }
        }, {
          key: "onWindowResize",
          value: function onWindowResize(event) {
            var _this25 = this;

            if (this.resizeTimeout) {
              clearTimeout(this.resizeTimeout);
            }

            this.resizeTimeout = setTimeout(function () {
              _this25.innerWidth = event.target.innerWidth;

              _this25.loadLayout();
            }.bind(this), 500);
          }
        }, {
          key: "loadLayout",
          value: function loadLayout() {
            if (this.config.layout.menuPosition === "Top") {
              // Horizontal Menu
              if (this.innerWidth < 1200) {
                // Screen size < 1200
                this.menuItems = _horizontal_menu_navigation_routes_config__WEBPACK_IMPORTED_MODULE_1__.HROUTES;
              }
            } else if (this.config.layout.menuPosition === "Side") {
              // Vertical Menu{
              this.menuItems = _vertical_menu_routes_config__WEBPACK_IMPORTED_MODULE_0__.ROUTES;
            }

            if (this.config.layout.sidebar.backgroundColor === "white") {
              this.logoUrl = "assets/img/logo-dark.png";
            } else {
              this.logoUrl = "assets/img/logo.png";
            }

            if (this.config.layout.sidebar.collapsed) {
              this.collapseSidebar = true;
            } else {
              this.collapseSidebar = false;
            }
          }
        }, {
          key: "toggleSidebar",
          value: function toggleSidebar() {
            var _this26 = this;

            var conf = this.config;
            conf.layout.sidebar.collapsed = !this.config.layout.sidebar.collapsed;
            this.configService.applyTemplateConfigChange({
              layout: conf.layout
            });
            setTimeout(function () {
              _this26.fireRefreshEventOnWindow();
            }, 300);
          }
        }, {
          key: "CloseSidebar",
          value: function CloseSidebar() {
            this.layoutService.toggleSidebarSmallScreen(false);
          }
        }, {
          key: "isTouchDevice",
          value: function isTouchDevice() {
            var isMobile = this.deviceService.isMobile();
            var isTablet = this.deviceService.isTablet();

            if (isMobile || isTablet) {
              this.perfectScrollbarEnable = false;
            } else {
              this.perfectScrollbarEnable = true;
            }
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.layoutSub) {
              this.layoutSub.unsubscribe();
            }

            if (this.configSub) {
              this.configSub.unsubscribe();
            }
          }
        }]);

        return _VerticalMenuComponent;
      }();

      _VerticalMenuComponent.ɵfac = function VerticalMenuComponent_Factory(t) {
        return new (t || _VerticalMenuComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_layout_service__WEBPACK_IMPORTED_MODULE_3__.LayoutService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_config_service__WEBPACK_IMPORTED_MODULE_4__.ConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](ngx_device_detector__WEBPACK_IMPORTED_MODULE_11__.DeviceDetectorService));
      };

      _VerticalMenuComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
        type: _VerticalMenuComponent,
        selectors: [["app-sidebar"]],
        viewQuery: function VerticalMenuComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.toggleIcon = _t.first);
          }
        },
        hostBindings: function VerticalMenuComponent_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("resize", function VerticalMenuComponent_resize_HostBindingHandler($event) {
              return ctx.onWindowResize($event);
            }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"]);
          }
        },
        decls: 5,
        vars: 3,
        consts: [["class", "sidebar-header", 4, "ngIf"], [1, "sidebar-content", "main-menu-content", 3, "perfectScrollbar", "disabled"], [1, "nav-container"], ["appSidebarDropdown", "", 1, "navigation"], ["appSidebarlink", "", 3, "parent", "path", "level", "hasSub", "ngClass", "routerLinkActive", "routerLinkActiveOptions", 4, "ngFor", "ngForOf"], [1, "sidebar-header"], [1, "logo", "clearfix"], [1, "logo-text", "float-left", 3, "routerLink"], [1, "logo-img"], ["alt", "Apex logo", 3, "src"], [1, "text", "align-middle"], ["id", "sidebarToggle", "href", "javascript:;", 1, "nav-toggle", "d-none", "d-lg-none", "d-xl-block", 3, "click"], [1, "toggle-icon", 3, "ngClass"], ["toggleIcon", ""], ["id", "sidebarClose", "href", "javascript:;", 1, "nav-close", "d-block", "d-lg-block", "d-xl-none", 3, "click"], [1, "ft-x"], ["appSidebarlink", "", 3, "parent", "path", "level", "hasSub", "ngClass", "routerLinkActive", "routerLinkActiveOptions"], ["appSidebarAnchorToggle", "", 4, "ngIf"], ["appSidebarAnchorToggle", "", 3, "routerLink", 4, "ngIf"], ["target", "_blank", 3, "href", 4, "ngIf"], ["appSidebarDropdown", "", "class", "menu-content", 4, "ngIf"], ["appSidebarAnchorToggle", ""], [3, "ngClass"], [1, "menu-title"], [3, "ngClass", 4, "ngIf"], ["appSidebarAnchorToggle", "", 3, "routerLink"], ["target", "_blank", 3, "href"], ["appSidebarDropdown", "", 1, "menu-content"], ["appSidebarlink", "", 3, "parent", "hasSub", "path", "level", "ngClass", "routerLinkActive", 4, "ngFor", "ngForOf"], ["appSidebarlink", "", 3, "parent", "hasSub", "path", "level", "ngClass", "routerLinkActive"], ["target", "_blank", 3, "routerLink", 4, "ngIf"], ["target", "_blank", 3, "routerLink"], ["appSidebarlink", "", "routerLinkActive", "active", 3, "parent", "hasSub", "path", "level", "routerLinkActiveOptions", "ngClass", 4, "ngFor", "ngForOf"], ["appSidebarlink", "", "routerLinkActive", "active", 3, "parent", "hasSub", "path", "level", "routerLinkActiveOptions", "ngClass"], ["appSidebarAnchorToggle", "", 3, "routerLink", 4, "ngIf", "ngIfElse"], ["externalSubSubLinkBlock", ""]],
        template: function VerticalMenuComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, VerticalMenuComponent_div_0_Template, 12, 7, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ul", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, VerticalMenuComponent_li_4_Template, 5, 14, "li", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", (ctx.config == null ? null : ctx.config.layout.menuPosition) === "Side");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx.perfectScrollbarEnable);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx.menuItems);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_13__.PerfectScrollbarDirective, _directives_sidebar_dropdown_directive__WEBPACK_IMPORTED_MODULE_5__.SidebarDropdownDirective, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLinkWithHref, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgClass, _directives_sidebar_link_directive__WEBPACK_IMPORTED_MODULE_6__.SidebarLinkDirective, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLinkActive, _directives_sidebar_anchor_toggle_directive__WEBPACK_IMPORTED_MODULE_7__.SidebarAnchorToggleDirective],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe],
        encapsulation: 2,
        data: {
          animation: _animations_custom_animations__WEBPACK_IMPORTED_MODULE_2__.customAnimations
        }
      });
      /***/
    },

    /***/
    34139: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "environment": function environment() {
          return (
            /* binding */
            _environment
          );
        }
        /* harmony export */

      }); // The file contents for the current environment will overwrite these during build.
      // The build system defaults to the dev environment which uses `environment.ts`, but if you do
      // `ng build --env=prod` then `environment.prod.ts` will be used instead.
      // The list of which env maps to which file can be found in `.angular-cli.json`.


      var _environment = {
        production: false
      };
      /***/
    },

    /***/
    9022: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/platform-browser */
      91211);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      74788);
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./app/app.module */
      42573);
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./environments/environment */
      34139);

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
        (0, _angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule);
      /***/

    }
  },
  /******/
  function (__webpack_require__) {
    // webpackRuntimeModules

    /******/
    "use strict";
    /******/

    /******/

    var __webpack_exec__ = function __webpack_exec__(moduleId) {
      return __webpack_require__(__webpack_require__.s = moduleId);
    };
    /******/


    __webpack_require__.O(0, ["vendor"], function () {
      return __webpack_exec__(9022);
    });
    /******/


    var __webpack_exports__ = __webpack_require__.O();
    /******/

  }]);
})();
//# sourceMappingURL=main-es5.js.map