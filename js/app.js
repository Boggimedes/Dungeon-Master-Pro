'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'oc.lazyLoad',
  'ui.tinymce',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'dndLists',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures',
  'ui.scroll',
  'ngHandsontable',
  'ui.scroll.jqlite',
  'LocalStorageModule',
  'ui.bootstrap.contextMenu',
  'rzModule',
  'ngFileUpload', 
  'ngImgCrop',
  'angularSoundManager',
  'jkuri.slimscroll'
])

.run(function($transform) {
  window.$transform = $transform;
})
.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false && typeof path == "undefined") {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
                $rootScope.loading=false;
            });
        }
        return original.apply($location, [path]);
    };
}])

.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('ls');
}])

.config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {

$routeProvider.otherwise("/");

        $routeProvider.when('/edit',
            {templateUrl: 'partials/editSound.html',
            controller: 'SoundEditCtrl', reloadOnSearch: false
        });
        
        $routeProvider.when('/faq',
            {templateUrl: 'partials/faq.html',
            controller: 'SettingsCtrl', reloadOnSearch: false
        });
        
        $routeProvider.when('/edit/effect/:id',
            {templateUrl: 'partials/editEffect.html',
            controller: 'SoundEditCtrl', reloadOnSearch: false
        });

        $routeProvider.when('/edit/scene/:id',
            {templateUrl: 'partials/editScene.html',
            controller: 'SoundEditCtrl', reloadOnSearch: false
        });

        $routeProvider.when('/edit/collection/:id',
            {templateUrl: 'partials/editCollection.html',
            controller: 'SoundEditCtrl', reloadOnSearch: false
        });

        $routeProvider.when('campaignboard.sounds', 
            {templateUrl: 'partials/sounds.html',
            controller: 'playSceneController', reloadOnSearch: false
        });

        $routeProvider.when('/npcs/:region',
            {templateUrl: 'partials/npcs.html',
            controller: 'NpcCtrl', reloadOnSearch: false
        });

        $routeProvider.when('/pc',
            {templateUrl: 'partials/pc.html',
             reloadOnSearch: false
        });

        $routeProvider.when('/world',
            {templateUrl: 'partials/worldboard.html',
            controller: 'WorldCtrl', reloadOnSearch: false
        });

        $routeProvider.when('/edit/spells',
            {templateUrl: 'partials/spells.html',
            controller: 'SpellsCtrl', reloadOnSearch: false
        });

        $routeProvider.when('/user/settings',
            {templateUrl: 'partials/userSettings.html',
            controller: 'SettingsCtrl', reloadOnSearch: false
        });

        $routeProvider.when('/edit/spell/:id',
            {templateUrl: 'partials/editSpell.html',
            controller: 'SpellsCtrl', reloadOnSearch: false
        });

        $routeProvider.when('/',
            {templateUrl: 'partials/welcome.html', reloadOnSearch: false
        });

        $routeProvider.when('/soundboard',
          {templateUrl: 'partials/soundboard.html', reloadOnSearch: false
        });

        $routeProvider.when('/edit/monster/:id',
          { templateUrl: 'partials/editMonster.html',controller: 'MonstersCtrl', reloadOnSearch: false
        });

        $routeProvider.when('/edit/sounds',
          { templateUrl: 'partials/editSounds.html', reloadOnSearch: false
        });

        $routeProvider.when('/campaignboard',
          { templateUrl: 'partials/campaignboard.html', reloadOnSearch: false
        });

        $routeProvider.when('/combatboard',
          { templateUrl: 'partials/combatboard.html', reloadOnSearch: false
        });

        $locationProvider.html5Mode(true);
    }
]);

