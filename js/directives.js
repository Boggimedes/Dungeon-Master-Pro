'use strict';

/* Directives */


angular.module('myApp.directives', [])


//     .directive('uiTinymce', ['uiTinymceConfig', function(uiTinymceConfig) {
//     uiTinymceConfig = uiTinymceConfig || {};
//     var generatedIds = 0;
//     return {
//         require: 'ngModel',
//         link: function(scope, elm, attrs, ngModel) {
//             var expression, options, tinyInstance;
//             // generate an ID if not present
//             if (!attrs.id) {
//                 attrs.$set('id', 'uiTinymce' + generatedIds++);
//             }
//             options = {
//                 // Update model when calling setContent (such as from the source editor popup)
//                 setup: function(ed) {
//                     ed.on('init', function(args) {
//                         ngModel.$render();
//                     });
//                     // Update model on button click
//                     ed.on('ExecCommand', function(e) {
//                         ed.save();
//                         ngModel.$setViewValue(elm.val());
//                         if (!scope.$$phase) {
//                             scope.$apply();
//                         }
//                     });
//                     ed.addButton('mybutton', {
//                     text: 'My button',
//                     icon: false,
//                     onclick: function () {
//                     ed.insertContent('&nbsp;<b>'+ ed.selection.getContent() +'</b>&nbsp;');
//                     }
//                     });
//                     // Update model on keypress
//                     ed.on('KeyUp', function(e) {
//                         console.log(ed.isDirty());
//                         ed.save();
//                         ngModel.$setViewValue(elm.val());
//                         if (!scope.$$phase) {
//                             scope.$apply();
//                         }
//                     });
//                 },
//                 mode: 'exact',
//                 elements: attrs.id
//             };
//             if (attrs.uiTinymce) {
//                 expression = scope.$eval(attrs.uiTinymce);
//             } else {
//                 expression = {};
//             }
//             angular.extend(options, uiTinymceConfig, expression);
//             setTimeout(function() {
//                 tinymce.init(options);
//             });


//             ngModel.$render = function() {
//                 if (!tinyInstance) {
//                     tinyInstance = tinymce.get(attrs.id);
//                 }
//                 if (tinyInstance) {
//                     tinyInstance.setContent(ngModel.$viewValue || '');
//                 }
//             };
//         }
//     };
// }])




  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

.directive('resize', function ($window) {
    return function ($scope, element) {
        var w = angular.element($window);
        $scope.getWindowDimensions = function () {
           return {
                'h': w[0].innerHeight,
                'w': w[0].innerWidth
            };
        };
        $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
            $scope.windowHeight = newValue.h;
            $scope.windowWidth = newValue.w;

            $scope.style = function () {
               return {
                    'height': (newValue.h - 100) + 'px',
                        'width': (newValue.w - 100) + 'px'
                };
            };

        }, true);

        w.bind('resize', function () {
            $scope.$apply();
        });
    }
})


.directive('onDoubleClick', function ($timeout) {
return {
restrict: 'A',
link: function ($scope, $elm, $attrs) {
var clicks = 0;
var lastClick = new Date();

        $elm.bind('click', function (evt) {
            var dateDiff = new Date() - lastClick;
            if (dateDiff > 300) { // 300 ms
                clicks = 0;
            }
            lastClick = new Date();
            clicks++;
            if (clicks == 1) {
                $timeout(function () {
                    if (clicks == 1) {
                        //....
                    } else {
                        $scope.$apply(function () {

                            $scope.$eval($attrs.onDoubleClick);
                        });
                    }
                }, 300);
            }
        });
    }
};
})

 .directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                console.log(event);
                scope.$parent.$parent.modalX = event.clientX;
                scope.$parent.$parent.modalY = event.clientY;
                console.log(scope);
                fn(scope, {$event:event});
            });
        });
    };
})

 .directive('ngAltClick'['$parse','$touch', function($parse,$touch) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngAltClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                console.log(event);
                scope.$parent.$parent.modalX = event.clientX;
                scope.$parent.$parent.modalY = event.clientY;
                console.log(scope);
                fn(scope, {$event:event});
            });
        });
    };
}])

.directive('onLongPress', function($timeout) {
    return {
        restrict: 'A',
        link: function($scope, $elm, $attrs) {
            $elm.bind('touchstart', function(evt) {
                // Locally scoped variable that will keep track of the long press
                $scope.longPress = true;

                // We'll set a timeout for 600 ms for a long press
                $timeout(function() {
                    if ($scope.longPress) {
                        // If the touchend event hasn't fired,
                        // apply the function given in on the element's on-long-press attribute
                        $scope.$apply(function() {
                            $scope.$eval($attrs.onLongPress)
                        });
                    }
                }, 600);
            });

            $elm.bind('touchend', function(evt) {
                // Prevent the onLongPress event from firing
                $scope.longPress = false;
                // If there is an on-touch-end function attached to this element, apply it
                if ($attrs.onTouchEnd) {
                    $scope.$apply(function() {
                        $scope.$eval($attrs.onTouchEnd)
                    });
                }
            });
        }
    };
})

//Not in use, but interesting code.  May use elsewhere
 .directive('stepTransform', function() {
  return { restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
            console.log(ngModel);

      if(ngModel) { // Don't do anything unless we have a model

        ngModel.$parsers.push(function (value) {
          return scope.stepsArray[value];
        });

        ngModel.$formatters.push(function (value) {
          return scope.stepsArray.indexOf(value);
        });

      }
    }
  };
})

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                // scope.$apply(function(){
                    console.log(attrs)
                    console.log(element)
                    //modelSetter(scope, element[0].files[0]);
                // });
            });
        }
    };
}])

.directive('scrollTest', ['scroll', function(scroll){
  return{
    restrict:'A',
    controller: function($scope){
      scroll.bind();
      $scope.$on('scroll', function(data, $event){
        $scope.scroll = $event;
        console.log($event);
      });
    },
    link:function($scope, $element, $attribute){
        console.log($element);
    }
  };
}])

.directive(
    "combat",
    function() {

        // Return the directive configuration.
        return({
            controller: "combatCtrl",
            link: link,
            restrict: "A",
            templateUrl: "partials/combat.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {
            console.log( "Combat directive linking." );

        }

    }
)

.directive(
    "monsters",
    function() {

        // Return the directive configuration.
        return({
            controller: "",
            link: link,
            restrict: "A",
            templateUrl: "partials/monsters.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {
            console.log( "Monsters directive linking." );

        }

    }
)

.directive(
    "soundScenes",
    function() {

        // Return the directive configuration.
        return({
            controller: "SoundCtrl",
            link: link,
            restrict: "A",
            templateUrl: "partials/sounds.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {
            console.log( "Sounds directive linking." );

        }

    }
)

.directive(
    "npcs",
    function() {

        // Return the directive configuration.
        return({
            controller: "NpcCtrl",
            link: link,
            restrict: "A",
            templateUrl: "partials/npcs.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {
            console.log( "Npcs directive linking." );

        }

    }
)


.directive(
    "soundOptionsModal",
    function() {

        // Return the directive configuration.
        return({
            link: link,
            restrict: "A",
            templateUrl: "partials/modal/soundOptions.html"
        });


        // I bind the JavaScript events to the scope.
        function link( scope, element, attributes ) {

        }

    }
)

.directive("addGroupModal",function() {
        return({
            link: link,
            restrict: "A",
            templateUrl: "partials/modal/addGroup.html"
        });
        function link( scope, element, attributes ) { }
    })

.directive("diceBagModal",function() {
        return({
            link: link,
            restrict: "A",
            templateUrl: "partials/modal/diceBag.html"
        });
        function link( scope, element, attributes ) { }
    })

.directive("persistentModal",function() {
        return({
            link: link,
            restrict: "A",
            templateUrl: "partials/modal/persistent.html"
        });
        function link( scope, element, attributes ) { }
    })

// .directive("Modal",function() {
//         return({
//             link: link,
//             restrict: "A",
//             templateUrl: "partials/modal/.html"
//         });
//         function link( scope, element, attributes ) { }
//     })



        .directive('ngInfinitescroll', infiniteScroll);

    infiniteScroll.$inject = ['$document', '$window', '$compile'];

    function infiniteScroll($document, $window, $compile) {
        return {
            restrict: 'A',
            scope: true,
            link: linkFn
        };

        function linkFn(scope, element, attrs) {
            setScopeValues(scope, element, attrs);

            var el = element[0];

            var minBarHeight = 30,
                releaseScroll = false,
                touchDiff,
                minBarWidth = 30;

            element.css({
                'overflow': 'hidden',
                'width': scope.width,
                'height': scope.height
            });

            var wrapper = angular.element('<div></div>');
            wrapper.css({
                'position': 'relative',
                'overflow': 'hidden',
                'width': scope.width,
                'height': scope.height
            });

            var bar = getBaseBar(scope);

            //element.wrap(wrapper);
            element.append(bar);
            $compile(bar)(scope);

            element.on('mouseenter', function () {
                if (!scope.horizontalScroll) {
                    scope.getBarHeight();
                } else {
                    scope.getBarWidth();
                }
            });

            element.on('mouseleave', function() {
                if(!scope.alwaysVisible) {
                    bar.css({ display: 'none' });
                }
            });

            scope.makeBarDraggable = function () {
                bar.bind('mousedown', function (e) {
                    var top = parseFloat(bar.css('top')),
                        pageY = e.pageY,
                        isDrag = true;

                    $document.bind('mousemove', function (e) {
                        bar.css({'top': top + e.pageY - pageY + 'px'});
                        scope.scrollContent(0, bar[0].offsetTop, false);
                    });

                    $document.bind('mouseup', function (e) {
                        isDrag = false;
                        $document.unbind('mousemove');
                    });
                }).bind('selectstart', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                });
            };

            scope.makeBarDraggableHorizontal = function () {
                bar.bind('mousedown', function (e) {
                    var left = parseFloat(bar.css('left')),
                        pageX = e.pageX,
                        isDrag = true;

                    $document.bind('mousemove', function (e) {
                        bar.css({'left': left + e.pageX - pageX + 'px'});
                        scope.scrollContentHorizontal(0, bar[0].offsetLeft, false);
                    });

                    $document.bind('mouseup', function (e) {
                        isDrag = false;
                        $document.unbind('mousemove');
                    });
                }).bind('selectstart', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                });
            };

            scope.getBarHeight = function () {
                var barHeight = Math.max((el.offsetHeight / el.scrollHeight) * el.offsetHeight, minBarHeight);
                var display = barHeight === el.offsetHeight ? 'none' : 'block';
                bar.css({
                    height: barHeight + 'px',
                    display: display
                });
            };

            scope.getBarWidth = function () {
                var barWidth = Math.max((el.offsetWidth / el.scrollWidth) * el.offsetWidth, minBarWidth);
                var display = barWidth === el.offsetWidth ? 'none' : 'block';
                bar.css({
                    width: barWidth + 'px',
                    display: display
                });
            };

            scope.attachWheel = function (target) {
                if ($window.addEventListener) {
                    target.addEventListener('DOMMouseScroll', scope.onWheel, false);
                    target.addEventListener('mousewheel', scope.onWheel, false);
                } else {
                    $document.addEventListener('onmousewheel', scope.onWheel);
                }
            };

            scope.detachWheel = function (target) {
                if ($window.removeEventListener) {
                    target.removeEventListener('DOMMouseScroll', scope.onWheel, false);
                    target.removeEventListener('mousewheel', scope.onWheel, false);
                } else {
                    $document.removeEventListener('onmousewheel', scope.wheel);
                }
            };

            scope.onWheel = function (e) {
                e = e || $window.event;

                var delta = 0;

                if (e.wheelDelta) {
                    delta = -e.wheelDelta / 120;
                }

                if (e.detail) {
                    delta = e.detail / 3;
                }

                if (!scope.horizontalScroll) {
                    scope.scrollContent(delta, true);
                } else {
                    scope.scrollContentHorizontal(delta, true);
                }

                if (e.preventDefault && !releaseScroll) {
                    e.preventDefault();
                }

                if (!releaseScroll) {
                    e.returnValue = false;
                }
            };

            scope.scrollContent = function (y, isWheel) {
    Array.prototype.rotateLeft = function() {
       var t = this.shift();
       this.push(t);
       return this;
    }
    Array.prototype.rotateRight = function() {
       var t = this.pop();
       this.unshift(t);
       return this;
    }

                releaseScroll = false;
                var delta = y,
                    maxTop = el.offsetHeight - bar[0].offsetHeight,
                    percentScroll;
                    console.log(y);
                if (isWheel) {
                    delta = parseInt(bar.css('top'), 10) + y * parseInt(scope.wheelStep, 10) / 100 * bar[0].offsetHeight;
                    delta = Math.min(Math.max(delta, 0), maxTop);
                    delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
                    bar.css({top: delta + 'px'});
                }

                percentScroll = parseInt(bar.css('top'), 10) / (el.offsetHeight - bar[0].offsetHeight);
                delta = percentScroll * (el.scrollHeight - el.offsetHeight);
                if(y>0) scope.$parent.$parent.monstersArray.rotateLeft();
                    else scope.$parent.$parent.monstersArray.rotateRight();
                //el.scrollTop = delta;
            };

            scope.scrollContentHorizontal = function (x, isWheel) {
                releaseScroll = false;
                var delta = x,
                    maxLeft = el.offsetWidth - bar[0].offsetWidth,
                    percentScroll;

                if (isWheel) {
                    delta = parseInt(bar.css('left'), 10) + x * parseInt(scope.wheelStep, 10) / 100 * bar[0].offsetWidth;
                    delta = Math.min(Math.max(delta, 0), maxLeft);
                    delta = (x > 0) ? Math.ceil(delta) : Math.floor(delta);
                    bar.css({left: delta + 'px'});
                }

                percentScroll = parseInt(bar.css('left'), 10) / (el.offsetWidth - bar[0].offsetWidth);
                delta = percentScroll * (el.scrollWidth - el.offsetWidth);

                el.scrollLeft = delta;
            };

            // mobile
            element.bind('touchstart', function (e, b) {
                if (e.touches.length) {
                    touchDiff = e.touches[0].pageY;
                }
            });

            element.bind('touchmove', function (e) {
                if (!releaseScroll) {
                    e.preventDefault();
                }

                if (e.touches.length) {
                    var diff = (touchDiff - e.touches[0].pageY) / scope.touchScrollStep;
                    if (!scope.horizontalScroll) {
                        scope.scrollContent(diff, true);
                    } else {
                        scope.scrollContentHorizontal(diff, true);
                    }
                    touchDiff = e.touches[0].pageY;
                }
            });

            attrs.$observe('enabled', function () {
                scope.enabled = scope.$eval(attrs.enabled);

                if (scope.enabled === false) {
                    bar.remove();
                    scope.detachWheel(el);
                } else {
                    element.append(bar);
                    scope.attachWheel(el);
                }
            });

            if (scope.watchContent) {
                var contentWatcher = scope.$watch(
                    function () {
                        return element.html();
                    },
                    function () {
                        init();
                    }
                );
                scope.$on("$destroy", function () {
                    contentWatcher();
                });
            }

            function init() {
                bar.css('top');
                if (!scope.horizontalScroll) {
                    scope.getBarHeight();
                    scope.makeBarDraggable();
                } else {
                    scope.getBarWidth();
                    scope.makeBarDraggableHorizontal();
                }
                if(!scope.alwaysVisible) {
                    bar.css({ display: 'none' });
                }
                scope.attachWheel(el);
                return true;
            }
            
            init();
        }

        function getBaseBar(scope) {
            var bar,
                positionCss,
                commonCssProperty = {
                    'background': scope.color,
                    'position': 'absolute',
                    'opacity': scope.opacity,
                    'display': scope.alwaysVisible ? 'block' : 'none',
                    'border-radius': scope.borderRadius,
                    'z-index': scope.zIndex,
                    'cursor': 'pointer'
                };
 
            if (scope.horizontalScroll) {
                bar = angular.element('<div ng-mousedown="makeBarDraggableHorizontal($event)"></div>');
                commonCssProperty = angular.extend(commonCssProperty, {
                    'height': scope.size,
                    'left': '0'
                });
                positionCss = (scope.horizontalScrollPosition === 'bottom')
                    ? {bottom: scope.distance}
                    : {top: scope.distance};
            } else {
                bar = angular.element('<div ng-mousedown="makeBarDraggable($event)""></div>');
                commonCssProperty = angular.extend(commonCssProperty, {
                    'width': scope.size,
                    'top': '0'
                });
                positionCss = (scope.position === 'right')
                    ? {right: scope.distance}
                    : {left: scope.distance};
            }

            commonCssProperty = angular.extend(commonCssProperty, positionCss);
            bar.css(commonCssProperty);
            return bar;
        }

        function setScopeValues(scope, element, attrs) {
            var height = undefined;

            if (attrs.height !== 0 && attrs.height !== undefined) {
                height = attrs.height;
            } else if (element[0].clientHeight !== 0) {
                height = element[0].clientHeight;
            } else {
                height = 250;
            }

            scope.width = attrs['width'] || element[0].clientWidth || 'auto';
            scope.height = height;
            scope.size = attrs['size'] || '7px';
            scope.color = attrs['color'] || '#000';
            scope.position = attrs['position'] || 'right';
            scope.distance = attrs['distance'] || '1px';
            scope.borderRadius = attrs['borderRadius'] || '3px';
            scope.start = attrs['start'] || 'top';
            scope.alwaysVisible = scope.$eval(attrs['alwaysVisible']) !== false;
            scope.barDraggable = scope.$eval(attrs['barDraggable']) !== false;
            scope.wheelStep = attrs['wheelStep'] || 20;
            scope.opacity = attrs['opacity'] || 0.5;
            scope.inifnite = attrs['infinite'] || 0;
            scope.enabled = scope.$eval(attrs['enabled']) !== false;
            scope.horizontalScroll = scope.$eval(attrs['horizontalScroll']) || false;
            scope.horizontalScrollPosition = attrs['horizontalScrollPosition'] || 'bottom';
            scope.touchScrollStep = attrs['touchScrollStep'] || 200;
            scope.watchContent = scope.$eval(attrs['watchContent']) || false;
            scope.zIndex = attrs['zIndex'] || '99';
        }
    }
