(self["webpackChunkapex_admin"] = self["webpackChunkapex_admin"] || []).push([["angular_app_page_page_module_ts"],{

/***/ 20510:
/*!*************************************************!*\
  !*** ./angular/app/page/page-routing.module.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageRoutingModule": function() { return /* binding */ PageRoutingModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 3984);
/* harmony import */ var _page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page.component */ 18428);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 74788);




var routes = [
    {
        path: '',
        component: _page_component__WEBPACK_IMPORTED_MODULE_0__.PageComponent,
        data: {
            title: 'Page'
        }
        // children: [
        //   {
        //     path: 'page',
        //     component: PageComponent,
        //     data: {
        //       title: 'Page'
        //     }
        //   }
        // ]
    }
];
var PageRoutingModule = /** @class */ (function () {
    function PageRoutingModule() {
    }
    PageRoutingModule.ɵfac = function PageRoutingModule_Factory(t) { return new (t || PageRoutingModule)(); };
    PageRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: PageRoutingModule });
    PageRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
    return PageRoutingModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](PageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 18428:
/*!********************************************!*\
  !*** ./angular/app/page/page.component.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageComponent": function() { return /* binding */ PageComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 74788);

var PageComponent = /** @class */ (function () {
    function PageComponent() {
    }
    PageComponent.ɵfac = function PageComponent_Factory(t) { return new (t || PageComponent)(); };
    PageComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PageComponent, selectors: [["app-page"]], decls: 54, vars: 0, consts: [[1, "row"], [1, "col-12"], [1, "content-header"], [1, "content-sub-header", "mb-1"], ["id", "kick-start", 1, "card"], [1, "card-header"], [1, "card-title"], [1, "card-content"], [1, "card-body"], [1, "card-text"], [1, "text-bold-600"], ["href", "https://angular.io/tutorial"], ["href", "https://angular.io/guide/ajs-quick-reference"], ["href", "https://angular.io/guide/cheatsheet"], ["href", "https://angular.io/styleguide"]], template: function PageComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Page");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "You can define your sub-header here");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "h4", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Kick start your project development !");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Getting start with your project custom requirements using a ready template which is quite difficult and time taking process, Apex Admin provides useful features to kick start your project development with no efforts !");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "h6", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Newcomer");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "If you're new to Angular you may feel overwhelmed by the quantity of new concepts to apprehend, so before digging in this project you may want to start with ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "a", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "this progressive tutorial");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " that will guide you step by step into building a complete Angular application.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "h6", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "AngularJS veteran");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "If you come from AngularJS and want to dig straight in the new version, you may want to take a look at the ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "a", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "AngularJS quick reference");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "h6", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Cheatsheet");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Until you know the full Angular API by heart, you may want to keep this ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "a", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "cheatsheet");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, " that resumes the syntax and features on a single page at hand.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "h6", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Style guide");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "This project follows the standard ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "a", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Angular style guide");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, ".");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "More than just coding rules, this style guide also gives advices and best practices for a good application architecture and is an **essential reading** for starters. Reading deeper, you can even find many explanations for some design choices of the framework.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "h6", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Going deeper");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "Even though they are not mandatory, Angular was designed for the use of design patterns you may not be accustomed to, like reactive programming, unidirectional data flow and centralized state management.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "These concepts are difficult to resume in a few words, and despite being tightly related to each other they concern specific parts of an application flow, each being quite deep to learn on its own.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "You will essentially find here a list of good starting points to learn more on these subjects.");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYWdlLmNvbXBvbmVudC5zY3NzIn0= */"] });
    return PageComponent;
}());



/***/ }),

/***/ 17673:
/*!*****************************************!*\
  !*** ./angular/app/page/page.module.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageModule": function() { return /* binding */ PageModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 12057);
/* harmony import */ var _page_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-routing.module */ 20510);
/* harmony import */ var _page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page.component */ 18428);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 74788);




var PageModule = /** @class */ (function () {
    function PageModule() {
    }
    PageModule.ɵfac = function PageModule_Factory(t) { return new (t || PageModule)(); };
    PageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: PageModule });
    PageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ providers: [], imports: [[
                _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
                _page_routing_module__WEBPACK_IMPORTED_MODULE_0__.PageRoutingModule
            ]] });
    return PageModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](PageModule, { declarations: [_page_component__WEBPACK_IMPORTED_MODULE_1__.PageComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        _page_routing_module__WEBPACK_IMPORTED_MODULE_0__.PageRoutingModule] }); })();


/***/ })

}]);
//# sourceMappingURL=angular_app_page_page_module_ts.js.map