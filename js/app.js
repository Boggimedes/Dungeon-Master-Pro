'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ui.router',
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
  'ngImgCrop'
])

.run(function($transform) {
  window.$transform = $transform;
})

.run(function($rootScope){
   $rootScope.$on('$stateChangeStart', function(){
      $rootScope.$broadcast('$routeChangeStart');
   });
   $rootScope.$on('$stateChangeSuccess', function(){
      $rootScope.$broadcast('$routeChangeSuccess');
   });
})

.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('ls');
}])

.config(['$locationProvider','$stateProvider', '$urlRouterProvider',
    function($locationProvider, $stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise("/");

        $stateProvider.state('edit', {
            url:'/edit',
            templateUrl: 'partials/editSound.html',
            controller: 'SoundEditCtrl', reloadOnSearch: false
        });
        
    		$stateProvider.state('editEffect', {
            url:'/edit/effect/:id',
            templateUrl: 'partials/editEffect.html',
            controller: 'SoundEditCtrl', reloadOnSearch: false
        });

        $stateProvider.state('editScene', {
            url:'/edit/scene/:id',
            templateUrl: 'partials/editScene.html',
            controller: 'SoundEditCtrl', reloadOnSearch: false
        });

        $stateProvider.state('editCollection', {
            url:'/edit/collection/:id',
            templateUrl: 'partials/editCollection.html',
            controller: 'SoundEditCtrl', reloadOnSearch: false
        });

        $stateProvider.state('campaignboard.sounds', {
            templateUrl: 'partials/sounds.html',
            controller: 'playSceneController', reloadOnSearch: false
        });

        $stateProvider.state('npcs', {
            url:'/npcs/:region',
            templateUrl: 'partials/npcs.html',
            controller: 'NpcCtrl', reloadOnSearch: false
        });

        $stateProvider.state('world', {
            url:'/world',
            templateUrl: 'partials/worldboard.html',
            controller: 'WorldCtrl', reloadOnSearch: false
        });

        $stateProvider.state('spells', {
            url:'/edit/spells',
            templateUrl: 'partials/spells.html',
            controller: 'SpellsCtrl', reloadOnSearch: false
        });

        $stateProvider.state('settings', {
            url:'/user/settings',
            templateUrl: 'partials/userSettings.html',
            controller: 'SettingsCtrl', reloadOnSearch: false
        });

        $stateProvider.state('editSpells', {
            url:'/edit/spell/:id',
            templateUrl: 'partials/editSpell.html',
            controller: 'SpellsCtrl', reloadOnSearch: false
        });

        $stateProvider.state('soundboard', {
        url: '/soundboard',
        views: {
          '@' : {
            templateUrl: 'partials/soundboard.html'
          },
          'sounds@soundboard' : { controller: 'SoundCtrl',templateUrl: 'partials/sounds.html',}
        },
      });

        $stateProvider.state('editMonsters', {
        url: '/edit/monster/:id',
        views: {
          '@' : {
            templateUrl: 'partials/editMonster.html',
            controller: 'MonstersCtrl'
          },
          'monsters@editMonsters' : { templateUrl: 'partials/monsters.html',}
        },
      });

        $stateProvider.state('campaignboard', {
        url: '/',
        views: {
          '@' : {
            templateUrl: 'partials/campaignboard.html'
          },
          'sounds@campaignboard' : { controller: 'SoundCtrl',templateUrl: 'partials/sounds.html',},
          'combat@campaignboard' : { controller: 'combatCtrl',templateUrl: 'partials/combat.html',},
          'monsters@campaignboard' : { templateUrl: 'partials/monsters.html',}
        },
      });


        $stateProvider.state('combatboard', {
        url: '/combatboard',
        views: {
          '@' : {
            templateUrl: 'partials/combatboard.html'
          },
          'combat@combatboardd' : { controller: 'combatCtrl',templateUrl: 'partials/combat.html',}
        },
      });

  		// $routeProvider.otherwise({
  //           redirectTo: '/',
  //           templateUrl: 'partials/campaignboard.html'
  //       });
        $locationProvider.html5Mode(true);
    }
]);