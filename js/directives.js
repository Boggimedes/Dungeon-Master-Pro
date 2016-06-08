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

