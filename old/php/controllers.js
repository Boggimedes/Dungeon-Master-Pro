'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

.controller('SiteCtrl', ['$rootScope', '$route', '$timeout', '$filter', 'Upload', 'monsterDatasource', 'mapDatasource', '$window', '$scope', 'soundsFactory', 'siteFactory', '$location', 'mapService', 'localStorageService', 'storyService',
    function($rootScope, $route, $timeout, $filter, Upload, monsterDatasource, mapDatasource, $window, $scope, soundsFactory, siteFactory, $location, mapService, localStorageService, storyService) {
        //$scope.css = 'dark';
        $scope.newMap = [];

$scope.storyService = storyService;
    //functions to move to services
    $scope.addMap = function(file) {
    file.upload = Upload.upload({
      url: '/api/map/addMap',
      data: {name: $scope.newMap.name,description: $scope.newMap.description, file: $scope.newMap.file},
    });

    file.upload.then(function (response) {
        $scope.reloadMaps();
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
    }

$scope.reloadMaps = function(){
    mapDatasource.getMaps({}).then(function(response) {
        mapDatasource.maps = response.data;
    }, function(err) {});
};

   $scope.deleteMap = function(id,index){
    if(!confirm("Are you sure?\nThis cannot be undone. The map file and all markers will be lost.")) return;
mapDatasource.deleteMap({"id":id}).then(function(response) {
    }, function(err) {});
console.log(index);
    mapDatasource.maps.splice(index,1);
  };

        //Why is this a function at all??
        $scope.sceneOptions = function(scene) {
            console.log($scope.sceneOpt = scene);
            $scope.Ui.turnOn('soundOptions');
        }


        //Don't know what this is for
        $scope.notices = [];

        for (var j = 0; j < 10; j++) {
            $scope.notices.push({
                icon: 'envelope',
                message: 'Notice ' + (j + 1)
            });
        }

        //Don't know what this is for
        $scope.deleteNotice = function(notice) {
            var index = $scope.notices.indexOf(notice);
            if (index > -1) {
                $scope.notices.splice(index, 1);
            }
        };


        //Don't know what this is for
        $scope.checkOverflow = function($event) {
               if ($event.target.offsetHeight < $event.target.scrollHeight ||
                      $event.target.offsetWidth < $event.target.scrollWidth) {
                      return true;
                    } else {
                      return false;
                    }
        };

        //Don't know what this is for
        $scope.slideScreen = function(test) {
            $scope.screenSlide = !$scope.screenSlide;
        }

        //Don't know what this is for
        $scope.swiped = function(direction) {
            alert('Swiped ' + direction);
        };

        //Don't know what this is for
        $scope.go = function(location,reload) {
            $location.path(location, reload);
        }

        if($location.$$path != "/"){
          siteFactory.getSettings().then(function(response) {
            console.log(response.data);
            $scope.applySettings(response.data);
          }).catch(function(err) {
                if(err.status == 401){console.log(1);$scope.Ui.turnOn('login');}
          });
        }
        else $scope.hideMenu=true;
        console.log($scope.hideMenu)
        $scope.uiScrollMonsters = {
            remain: true
        };

        monsterDatasource.getScrollMonsters().then(function(response){
            monsterDatasource.monstersArray = response.data;
            console.log(monsterDatasource.filteredMonsters);
            $scope.filteredMonsters = monsterDatasource.filteredMonsters = response.data;
            console.log(response);
        });


        $scope.monsterFilter = function(nfilter, cfilter) {
            monsterDatasource.filteredMonsters = monsterDatasource.monstersArray.filter(function(el){
                var response = true;
                console.log(cfilter>0);
                console.log(el.name.length>0);
                console.log(el.name.toLowerCase().indexOf(nfilter.toLowerCase()));
                if(cfilter>0 && el.name.length>0){ if(el.name.toLowerCase().indexOf(nfilter.toLowerCase())==-1 || el.cr>cfilter+1 || el.cr<cfilter-1) response = false;}
                    else if(cfilter>0) {if(el.cr>cfilter+1 || el.cr<cfilter-1) response = false;}
                    else if(el.name.length>0) {if(el.name.toLowerCase().indexOf(nfilter.toLowerCase())==-1) response = false;}
                return response;
            });
$scope.filteredMonsters = monsterDatasource.filteredMonsters;
            // monsterDatasource.setFilter(nfilter, cfilter);
            // console.log($scope.uiScrollMonsters);
            // $scope.uiScrollMonsters.reload();
        };



        $scope.loadMap = function(map,index){
            console.log(map);
            mapService.img = null;
            mapService.currentIndex = index;
            mapService.init(document.getElementById('map'), map.file,map.id); 
        };     

  $scope.addUdateMarker = function(markerFields){
console.log(markerFields);
console.log($scope.markerFields);
markerFields = $scope.markerFields;

if(markerFields.id){

mapDatasource.updateMarker({
"id":markerFields.id,
"html":markerFields.html,
"name":markerFields.ttip,
"latitude":markerFields.lat,
"longitude":markerFields.lng,
"zoom":markerFields.zoom,
"map_id":markerFields.map_id
}).then(function(response) {
mapService.reloadMap();
    }, function(err) {});
}
else
{
mapDatasource.addMarker({
"html":markerFields.html,
"name":markerFields.ttip,
"latitude":markerFields.lat,
"longitude":markerFields.lng,
"zoom":markerFields.zoom,
"map_id":markerFields.map_id
}).then(function(response) {
mapService.reloadMap();
    }, function(err) {});
}


  };

  $scope.deleteMarker = function(id){
mapDatasource.deleteMarker({"id":id}).then(function(response) {
mapService.reloadMap();
    }, function(err) {});
  };






    //end


        $scope.hgt = $window.innerHeight - 56;
        $scope.userAgent = navigator.userAgent;
        $scope.screenSlide = false;
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.loading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.loading = false;
        });

        $scope.tinymceOptions = {
            inline: false,
            plugins: 'advlist autolink link lists code fullscreen',
            skin: 'lightgray',
            menubar: false,
            statusbar: false,
            toolbar_items_size: 'small',
            forced_root_block: "",
            toolbar: 'bold italic  link  bullist numlist  code  fullscreen',
            content_css: [
            '/bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-base.min.css',
            '/bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-desktop.min.css',
            '/bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-hover.min.css',
            'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
            '//maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css'
            ]
        };

        $scope.startTutorial = function(){
            $scope.helpOverlay = true;
            $scope.helpStep = 0;
            $scope.tutorial = [
            "/tutorial/0.html",
            "/tutorial/1.0.html",
            "/tutorial/2.0.html",
            "/tutorial/2.1.html",
            "/tutorial/3.0.html",
            "/tutorial/3.1.html",
            "/tutorial/4.0.html",
            "/tutorial/4.1.html",
            "/tutorial/4.2.html",
            "/tutorial/5.0.html",
            "/tutorial/5.1.html"
            ];
        }

        $scope.moveTutorial = function(direction){
            $scope.helpStep += direction;
            console.log($scope.helpStep);
        }


        $scope.applySettings = function(data){
              $scope.loggedIn = data.loggedIn;
              $scope.settings = data.settings;
              $scope.customerID = data.customerID;
              $scope.name = data.name;
              $scope.email = data.email;
              $scope.css = data.settings.customCSS;
        }
        $scope.login = function(email, password) {
            siteFactory.login({
                "email": email,
                "password": password
            }).then(function(response) {
                siteFactory.getSettings().then(function(response) {
                $scope.applySettings(response.data);
                $scope.Ui.turnOff('login');
                $route.reload();
                }).catch(function(fallback) {
                if(err.status == 401){console.log(2);$scope.Ui.turnOn('login');}
                });

            });
        };


        $scope.bar=[];
        if (localStorageService.get('barRight')) $scope.bar.Right = localStorageService.get('barRight');
        if (localStorageService.get('barLeft')) $scope.bar.Left = localStorageService.get('barLeft');

        $scope.barChange = function(){
            localStorageService.set('barRight', $scope.bar.Right);
            localStorageService.set('barLeft', $scope.bar.Left);
        };

        $scope.markerFields={"ttip":"","lat":"","lng":"","html":"","map_id":"","warn":""};
        $scope.mapService = mapService;
        
        mapService.setFields($scope.markerFields);

        $scope.markerFields.checkModel = [false,false,false,false];
        $scope.mapData = mapDatasource;


  $scope.$watchCollection('markerFields.checkModel', function () {
    $scope.markerFields.zoom = [];
    angular.forEach($scope.markerFields.checkModel, function (value, key) {
      if (value) {
        $scope.markerFields.zoom.push(key+2);
      }
    });
  });



        var orderBy = $filter('orderBy');

        $scope.mfilter = '';
        $rootScope.chkScene = soundsFactory.chkScene;




    }
])

.controller('StoryCtrl', ['$scope', '$timeout', '$interval', 'storyService',
    function($scope, $timeout, $interval, storyService) {

        $scope.tinymceOptionsFull = {
            inline: false,
            plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen',
    'insertdatetime media nonbreaking table contextmenu directionality',
    'emoticons template paste textcolor colorpicker textpattern imagetools codesample'],
      toolbar1: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons | codesample | code',
  image_advtab: true,
        skin: 'lightgray',
        theme: 'modern',
            toolbar_items_size: 'small',
            menubar: 'edit insert view format table tools',
     content_css: [
    '/bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-base.min.css',
    '/bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-desktop.min.css',
    '/bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-hover.min.css',
    'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
    '//maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css'
  ]
        };

        $scope.storyService = storyService;


    }
])

.controller('SoundEditCtrl', ['$scope', '$timeout', '$interval', 'soundsDatasource', 'soundsEditFactory', 'soundsFactory', '$routeParams', '$filter', 'angularPlayer', 'Upload',
    function($scope, $timeout, $interval, soundsDatasource, soundsEditFactory, soundsFactory, $routeParams, $filter, angularPlayer, Upload) {
        var stopTime = $interval(function() {}, 200);
        $scope.soundPlaying = [];
        $scope.soundEditInit = function() {
            soundsEditFactory.getEffects().then(function(response) {
                $scope.allEffects = response.data;
            }, function(err) {
                if(err.status == 401){console.log(3);$scope.Ui.turnOn('login');}
                console.log(err);
            });
            var objectData = {
                "fields": "all"
            };
            soundsEditFactory.getScenes(objectData).then(function(response) {
                $scope.allScenes = response.data;
            }, function(err) {
                if(err.status == 401){console.log(4);$scope.Ui.turnOn('login');}
                console.log(err);
            });
            soundsEditFactory.getCollections().then(function(response) {
                $scope.allCollections = response.data;
            }, function(err) {
                if(err.status == 401){console.log(5);$scope.Ui.turnOn('login');}
                console.log(err);
            });
        };

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function mixToMono(buffer) {
            if (buffer.numberOfChannels == 2) {
                var pL = buffer.getChannelData(0);
                var pR = buffer.getChannelData(1);
                var length = buffer.length;

                for (var i = 0; i < length; ++i) {
                    var mono = 0.5 * (pL[i] + pR[i]);
                    pL[i] = mono;
                    pR[i] = mono;
                }
            }
        }
        $scope.effectInit = function() {
            $scope.effect = {};
            $scope.pathDepth = 0;
            $scope.pathIcon = "folder";
            $scope.effect.id = $routeParams.id;
            $scope.heading = "Add a New Effect";
            $scope.effect.sounds = [{}];
            if ($scope.effect.id != 'new') {
                $scope.heading = "Update Effect";
                var objectData = {
                    "where": [{
                        "id": $scope.effect.id
                    }]
                };
                soundsEditFactory.getEffects(objectData).then(function(response) {
                    $scope.effect = response.data;
                    if ($scope.effect.sounds == null) {
                        $scope.effect.sounds = [];
                    }
                    $scope.effect.loop = $scope.effect.loop ? true : false;
                    $scope.effect.optional = $scope.effect.optional ? true : false;
                    $scope.effect.seq = $scope.effect.seq ? true : false;
                }, function(err) {
                if(err.status == 401){console.log(6);$scope.Ui.turnOn('login');}
                    console.log(err);
                });
            }
                soundsEditFactory.getSounds().then(function(response) {
                    $scope.fx = response.data.sounds.fx;
                    $scope.ambience = response.data.sounds.ambience;
                    $scope.music = response.data.sounds.music;
                    $scope.tags = response.data.tags;
                    console.log($scope.sounds);
                }, function(err) {
                if(err.status == 401){console.log(7);$scope.Ui.turnOn('login');}
                   console.log(err);
                });
            $scope.soundsFilter = function(nfilter, tfilter) {
                soundsDatasource.setFilter(nfilter, tfilter);
                // console.log($scope.uiScrollMonsters);
                // $scope.uiScrollMonsters.reload();
            };
            $scope.hoverRow=0;
            $scope.setRange = function(index){$scope.hoverRow=index;}
            $scope.loadSound = function(item) {
                    console.log(item.name);
                    console.log($scope.selectedSound);
                    $scope.Ui.turnOff("soundPicker")
                    $scope.effect.sounds[$scope.selectedSound].file = item.category+'/'+item.file;
                    $scope.effect.sounds[$scope.selectedSound].name = item.name;
            }
            $scope.stepsArray = [];
            for (var i = -60; i < 2400; i++) {
                if (i <= 120) $scope.stepsArray.push(i);
                if (i > 120 && i <= 480) $scope.stepsArray.push(++i);
                if (i > 480 && i <= 600) {
                    i = i + 4;
                    $scope.stepsArray.push(i);
                }
                if (i > 600 && i <= 1200) {
                    i = i + 9;
                    $scope.stepsArray.push(i);
                }
                if (i > 1200 && i <= 2400) {
                    i = i + 59;
                    $scope.stepsArray.push(i);
                }
            }

            Object.defineProperty($scope, "delayL", {
                get: function() {
                    return $scope.stepsArray.indexOf($scope.effect.delayL);
                },
                set: function(value) {
                    $scope.effect.delayL = $scope.stepsArray[value];
                }
            });

            Object.defineProperty($scope, "delayH", {
                get: function() {
                    return $scope.stepsArray.indexOf($scope.effect.delayH);
                },
                set: function(value) {
                    $scope.effect.delayH = $scope.stepsArray[value];
                }
            });

            Object.defineProperty($scope, "preDelay", {
                get: function() {
                    return $scope.stepsArray.indexOf($scope.effect.preDelay)-60;
                },
                set: function(value) {
                    $scope.effect.preDelay = $scope.stepsArray[value+60];
                }
            });
            $scope.slider = {
                "options": {
                    "delay": {
                        showSelectionBar: true,
                        stepsArray: $scope.stepsArray,
                        noSwitching: true
                    },
                    "preDelay": {
                        showSelectionBar: true,
                        stepsArray: $scope.stepsArray.slice(60)
                    },
                    "chance": {
                        showSelectionBar: true,
                        floor: 1,
                        ceil: 100,
                        step: 1,
                        disabled: $scope.effect.seq
                    },
                    "percent": {
                        showSelectionBar: true,
                        floor: 1,
                        ceil: 100,
                        step: 1
                    },
                    "pitchVar": {
                        showSelectionBar: true,
                        floor: 0,
                        ceil: 200,
                        step: 1
                    },
                    "pitchSet": {
                        showSelectionBar: true,
                        floor: -600,
                        ceil: 600,
                        step: 1
                    }
                }
            };
        };
        $scope.uiScrollSounds = {
            remain: true
        };

         $scope.$on('currentTrack:duration', function(event, data) {
    //do your stuff here
        $scope.soundDuration = data;
    });
        $scope.$on('currentTrack:position', function(event, data) {
    //do your stuff here
        $scope.soundPosition = data;
    });
        var playTime;
                   console.log(angularPlayer);
                   console.log(angularPlayer.repeatToggle());
        $scope.hoverPlay = function(track,index){

                   console.log(angularPlayer.isPlayingStatus());
                   console.log(angularPlayer.getRepeatStatus());
            if(angularPlayer.isPlayingStatus()) return;
            $scope.hoverIndex = index;
            track = {
                        "id":'one',
                        "title":track.name,
                        "artist":'',
                        "url":"/sounds/"+track.category+"/"+track.file
                    };
           playTime = $timeout(function(){ console.log("hoverplay"); angularPlayer.addTrack(track);
            angularPlayer.playTrack(track.id); },500);
        }

        $scope.hoverStop = function(){
             $timeout.cancel(playTime);
            $timeout(function(){ console.log("hoverstop"); angularPlayer.stop();angularPlayer.clearPlaylist(function(){});});
        }

        $scope.tagFilter = function(tag){$scope.fxFilter.tags = tag;}
        $scope.sceneInit = function() {
            $scope.sceneContent = {};
            $scope.sceneContent.id = $routeParams.id;
            $scope.heading = "Add a New Scene";
            $scope.sceneContent.effects = [];
            if ($scope.sceneContent.id != 'new') {
                $scope.heading = "Update Scene";
                var objectData = {
                    "fields": "all",
                    "where": [{
                        "id": $scope.sceneContent.id
                    }]
                };
                soundsEditFactory.getScenes(objectData).then(function(response) {
                    $scope.sceneContent = response.data[0];
                    soundsEditFactory.getEffects().then(function(response) {
                        $scope.allEffects = response.data;
                        $scope.effectIDs = [];
                        $scope.sceneContent.effects.forEach(function(effect) {
                            $scope.effectIDs.push(effect.id);
                        });
                        $scope.allEffects = $scope.allEffects.filter(function(effect) {
                            if ($scope.effectIDs.indexOf(effect.id) != -1) return false;
                            return true;
                        });
                    }, function(err) {
                        console.log(err);
                    });
                }, function(err) {
                if(err.status == 401){console.log(8);$scope.Ui.turnOn('login');}
                    console.log(err);
                });
            } else {
                soundsEditFactory.getEffects().then(function(response) {
                    $scope.allEffects = response.data;
                    $scope.effectIDs = [];
                    $scope.sceneContent.effects.forEach(function(effect) {
                        $scope.effectIDs.push(effect.id);
                    });
                }, function(err) {
                if(err.status == 401){console.log(9);$scope.Ui.turnOn('login');}
                    console.log(err);
                });
            }
        }

        $scope.collectionInit = function() {
            $scope.collectionContent = {};
            $scope.collectionContent.id = $routeParams.id;
            $scope.heading = "Add a New Collection";
            $scope.collectionContent.scenes = [];
            console.log($routeParams.id);
            if ($scope.collectionContent.id != 'new') {
                $scope.heading = "Update Collection";
                var objectData = {
                    "where": [{
                        "id": $scope.collectionContent.id
                    }]
                };
                soundsEditFactory.getCollection(objectData).then(function(response) {
                    $scope.collectionContent = response.data;
                }, function(err) {
                if(err.status == 401){console.log(10);$scope.Ui.turnOn('login');}
                    console.log(err);
                });
            }

            soundsEditFactory.getScenes().then(function(response) {
                $scope.allScenes = response.data;
                $scope.scenesArray = [];
                $scope.sceneIDs = [];
                $scope.allScenes.forEach(function(scene) {
                    $scope.scenesArray[scene.id] = scene;
                    $scope.sceneIDs.push(scene.id);
                });
            }, function(err) {
                if(err.status == 401){console.log(11);$scope.Ui.turnOn('login');}
                console.log(err);
            });
        }

        $scope.addSound = function() {
            $scope.effect.sounds.push({});
        };

        $scope.saveEffect = function() {
            $scope.effect.loop = $scope.effect.loop ? 1 : 0;
            $scope.effect.optional = $scope.effect.optional ? 1 : 0;
            $scope.effect.seq = $scope.effect.seq ? 1 : 0;
            soundsEditFactory.updateEffect($scope.effect).then(function() {
                //$scope.go('edit');
                flashMessageService.setMessage("Effect Saved Successfully");
            }, function(err) {
                if(err.status == 401){console.log(12);$scope.Ui.turnOn('login');}
               console.log(err);
            });
        };

        $scope.saveCollection = function() {
            soundsEditFactory.updateCollection($scope.collectionContent).then(function(response) {
                //$scope.go('edit');
                flashMessageService.setMessage("Collection Saved Successfully");
            }, function(err) {
                if(err.status == 401){console.log(13);$scope.Ui.turnOn('login');}
                console.log(err);
            });
        };

        $scope.saveScene = function() {
            if($scope.sceneContent.img.substring(0,10)=="data:image"){
                $scope.sceneContent.file = Upload.dataUrltoBlob($scope.sceneContent.img, $scope.picFile.name);
                        Upload.upload({
                            url: '/api/sound/scene/update',
                            data: $scope.sceneContent
                        }).then(function(resp) {
                            console.log(resp);

                        });
                        return;

            }
            soundsEditFactory.updateScene($scope.sceneContent).then(function(response) {
                flashMessageService.setMessage("Scene Saved Successfully");
                //$scope.go('edit');
            }, function(err) {
                if(err.status == 401){console.log(14);$scope.Ui.turnOn('login');}
                console.log(err);
            });
        };

        $scope.deleteCollection = function(id, index) {
            $scope.allCollections.splice(index, 1);
            id = {
                "field": "id",
                "value": id
            };
            soundsEditFactory.deleteCollection(id);
        };

        $scope.deleteEffect = function(id, index) {
            $scope.allEffects.splice(index, 1);
            id = {
                "field": "id",
                "value": id
            };
            soundsEditFactory.deleteEffect(id);
        };

        $scope.deleteScene = function(id, index) {
            $scope.allScenes.splice(index, 1);
            id = {
                "field": "id",
                "value": id
            };
            soundsEditFactory.deleteScene(id);
        };



        $scope.playSound = function(sound, effect) {

            $scope.soundPlaying[sound.name] = !$scope.soundPlaying[sound.name];

            var soundObject = {
                "name": sound.name,
                "desc": sound.name,
                "vol": 100,
                "fadeIn": sound.fadeIn,
                "fadeOut": sound.fadeOut,
                "effects": [{
                    "name": sound.name,
                    "desc": sound.name,
                    "sounds": [sound],
                    "vol": effect.vol,
                    "preDelay": 0,
                    "loop": effect.loop,
                    "delayL": 0,
                    "delayH": 0,
                    "optional": 0,
                    "seq": 0
                }]
            };

            soundsFactory.toggleScene(soundObject);

        };

        $scope.playEffect = function(effect) {
            $scope.effectPlaying = !$scope.effectPlaying;
            var effectObject = {
                "name": effect.name,
                "desc": effect.name,
                "vol": 100,
                "fadeIn": 0,
                "fadeOut": 0,
                "effects": [effect]
            };

            soundsFactory.toggleScene(effectObject);

        };


    }
])

.controller('MonstersCtrl', ['$scope', '$log', 'monsterFactory', '$filter', '$timeout', '$routeParams', 'Upload', '$sce',
    function($scope, $log, monsterFactory, $filter, $timeout, $routeParams, Upload, $sce) {


        $scope.tinymceOptions = {
            inline: false,
            plugins: 'advlist autolink link lists code',
            skin: 'lightgray',
            menubar: false,
            statusbar: false,
            toolbar_items_size: 'small',
            forced_root_block: "",
            toolbar: 'bold italic | link | bullist numlist | code'
        };

        $scope.tinymceOptionsWithButton = {
            inline: false,
            plugins: 'advlist autolink link lists code',
            skin: 'lightgray',
            menubar: false,
            statusbar: false,
            toolbar_items_size: 'small',
            forced_root_block: "",
            toolbar: 'bold italic | bullist | code | collapseButton'
        };
        $scope.trust = function(snippet) {
          return $sce.trustAsHtml(snippet);
        };  
        $scope.heading = "Add a new Monster";
        if ($routeParams.id !== 'new') {
            $scope.heading = "Update Monster";
            var objectData = {
                "where": [{
                    "id": $routeParams.id
                }]
            };
            monsterFactory.getMonsters(objectData).then(
                function(response) {

                    if(response.data.length==0) {
                        $scope.go("/edit/monster/new");
                        return;
                    }
                    $scope.heading = "Update Monster";
                    response.data.img = response.data.img.replace("{id}",response.data.id);
                    $scope.currentMonster = response.data;
                    console.log(response);

                    // $log.info($scope.effect);
                },
                function(err) {
                    console.log(err);
                });
        }
        else{
            $scope.currentMonster = {};
            $scope.currentMonster.img = "";
            $scope.currentMonster.skills = [];
            $scope.currentMonster.attacks = [];

        }
        $scope.loadMonster = function(monster) {
            $scope.currentMonster = monster;
            $scope.go('edit/monster/' + $scope.currentMonster.id,false);
        }
        $scope.newMonster = function() {
            $scope.currentMonster = [];
        }
        $scope.saveMonster = function() {
            if($scope.currentMonster.img.substring(0,10)=="data:image"){
                $scope.currentMonster.file = Upload.dataUrltoBlob($scope.currentMonster.img, $scope.picFile.name);
                        Upload.upload({
                            url: '/api/monster/update',
                            data: $scope.currentMonster
                        }).then(function(resp) {
                            console.log(resp);

                        });
                        return;

            }
            monsterFactory.updateMonster($scope.currentMonster).then(
                function(response) {
                    console.log(response.data);
                    if(response.data!=$scope.currentMonster.id && response.data!=0) $scope.go("/edit/monster/"+response.data,false);
                },
                function(err) {
                    console.log(err);
                });
        }
        $scope.addSpell = function(spell, subitem) {
            console.log(subitem);
            if (typeof subitem.submenu == 'undefined') {
                subitem.submenu = [];
             console.log(subitem);
           }
           console.log(spell);
            subitem.submenu.push({"name":spell.name,"type":"ca","num":spell.num});
        }
        $scope.addSkill = function() {
            $scope.currentMonster.skills.push({
                "name": "",
                "bonus": ""
            });
        };

        $scope.addAttack = function() {
            console.log("Test");
            $scope.currentMonster.attacks.push({
                "name": "",
                "bonus": "",
                "damage": "",
                "special": ""
            });
        };

        $scope.addLA = function() {
            console.log("Test");
            $scope.currentMonster.legendaryActions.push({
                "name": "",
                "bonus": "",
                "damage": "",
                "special": ""
            });
        };

        $scope.deleteMonster = function(id) {
            monsterFactory.deleteMonster(id);

        };
        var orderBy = $filter('orderBy');
        $scope.mfilter = '';


        $scope.addMulti = function(attack) {
            console.log(attack);
            if (typeof attack.submenu == 'undefined') {
                attack.submenu = [];
             console.log(attack);
           }
            attack.submenu.push({
                "name": '',
                "bonus": '',
                "type": 'ma'
            });

        }
        $scope.$watch('cssFile', function() {
            if ($scope.cssFile != null) {
                $scope.files = [$scope.cssFile];
                $scope.upload($scope.files);
            }
        });


        $scope.upload = function(files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (!file.$error) {
                        Upload.upload({
                            url: '/api/monster/update',
                            data: {
                                settings: $scope.settings,
                                file: Upload.dataUrltoBlob(dataUrl, name)
                            }
                        }).then(function(resp) {
                            console.log(resp);

                        });
                    }
                }
            }
        };
            $scope.upload = function (dataUrl, name) {
        Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: {
                file: Upload.dataUrltoBlob(dataUrl, name)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.result = response.data;
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    }



    }
])

.controller('combatCtrl', ['$scope', '$compile', '$rootScope', 'filterFilter', '$filter', '$http', 'monsterFactory', 'mainFactory', '$timeout', '$sce', 'soundsEditFactory', 'localStorageService',
    function($scope, $compile, $rootScope, filterFilter, $filter, $http, monsterFactory, mainFactory, $timeout, $sce, soundsFactory, localStorageService) {
        $scope.combatLog = '';
        $scope.status = {
            isopen: false
        };
        $scope.selectedRow = '';
        if (localStorageService.get('groups')) $scope.groups = localStorageService.get('groups');
            else $scope.groups = [];
        $scope.pushGroup = function(group){
            console.log(group);
        $scope.groups.push(group);
            console.log($scope.groups);
        };
        $scope.recentMonsters = [];
        $scope.test = function(event){console.log(event);};
        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };
        if (localStorageService.get('combatants')) $scope.combatants = localStorageService.get('combatants');
            else  $scope.combatants = [];

        $scope.$watch('combatants', function() {
            localStorageService.set('combatants', $scope.combatants);
        }, true);

        $scope.$watch('groups', function() {
            console.log($scope.groups);
            localStorageService.set('groups', $scope.groups);
        }, true);

        if (localStorageService.get('diceBagQuick')) $scope.diceBagQuick = localStorageService.get('diceBagQuick');
        else $scope.diceBagQuick = [{
            "name": 'd4',
            "roll": '1d4'
        }, {
            "name": 'd6',
            "roll": '1d6'
        }, {
            "name": 'd8',
            "roll": '1d8'
        }, {
            "name": 'd10',
            "roll": '1d10'
        }, {
            "name": 'd12',
            "roll": '1d12'
        }, {
            "name": 'd20',
            "roll": '1d20'
        }, {
            "name": 'd100',
            "roll": '1d100'
        }, {
            "name": '6d6',
            "roll": '6d6'
        }, {
            "name": '2x d20',
            "roll": '1d20 | 1d20'
        }];

        $scope.$watch('diceBagQuick', function() {
            localStorageService.set('diceBagQuick', $scope.diceBagQuick);
        }, true);

        $scope.slider = {
            "options": {
                "percent": {
                    showSelectionBar: true,
                    floor: 1,
                    ceil: 100,
                    step: 1,
                    hideLimitLabels: true
                }
            }
        };
        if (localStorageService.get('recentMonsters')) $scope.recentMonsters = localStorageService.get('recentMonsters');

        $scope.$watch('recentMonsters', function() {
            localStorageService.set('recentMonsters', $scope.recentMonsters);
        }, true);

        $scope.new = [];

        $scope.addDie = function(die) {
            $scope.diceBagQuick.push({
                "name": die.name,
                "roll": die.roll
            });
            $scope.new.roll = '';
            $scope.new.name = '';
        }

        $scope.diceOptions = [
            ['Edit', function($itemScope) {
                $scope.Ui.turnOn('diceBag');
                $scope.new.roll = $scope.diceBagQuick[$itemScope.$index].roll;
                $scope.new.name = $scope.diceBagQuick[$itemScope.$index].name;
                $scope.diceBagQuick.splice($itemScope.$index, 1);
            }],
            null, ['Remove', function($itemScope) {
                $scope.diceBagQuick.splice($itemScope.$index, 1);
            }]
        ];
        $scope.blarg = function(scope){console.log(scope);}
        $scope.combatOptions = [
            ['Remove', function($itemScope) {
                $scope.combatants.splice($itemScope.$index,1);
            }, ""],
            ['Roll Init', function($itemScope) {
                $itemScope.combatant.init = eval(monsterFactory.rollDice("1d20+"+$itemScope.combatant.dex));
            }, ""],
            ['Roll Save', function($itemScope) {
            },  [
            ['Str', function ($itemScope) {
                     postToCombat($itemScope.combatant, "Str Save", "1d20+"+$itemScope.combatant.strSave);
            }],
            ['Dex', function ($itemScope) {
                     postToCombat($itemScope.combatant, "Dex Save", "1d20+"+$itemScope.combatant.dexSave);
            }],
            ['Con', function ($itemScope) {
                     postToCombat($itemScope.combatant, "Con Save", "1d20+"+$itemScope.combatant.conSave);
            }],
            ['Int', function ($itemScope) {
                     postToCombat($itemScope.combatant, "Int Save", "1d20+"+$itemScope.combatant.intSave);
            }],
            ['Wis', function ($itemScope) {
                     postToCombat($itemScope.combatant, "Wis Save", "1d20+"+$itemScope.combatant.wisSave);
            }],
            ['Cha', function ($itemScope) {
                     postToCombat($itemScope.combatant, "Cha Save", "1d20+"+$itemScope.combatant.chaSave);
            }]
        ]
    ],
            ['Roll Save for All', function($itemScope) {
            },  [
            ['Str', function ($itemScope) {
                for (var i = 0; i < $scope.combatants.length; i++) {
                    var combatant = $scope.combatants[i];
                    if(typeof combatant.strSave=="undefined") continue;
                     postToCombat(combatant, "Str Save", "1d20+"+combatant.strSave);
               }
            }],
            ['Dex', function ($itemScope) {
                for (var i = 0; i < $scope.combatants.length; i++) {
                    var combatant = $scope.combatants[i];
                    if(typeof combatant.dexSave=="undefined") continue;
                     postToCombat(combatant, "Dex Save", "1d20+"+combatant.dexSave);
               }
            }],
            ['Con', function ($itemScope) {
                for (var i = 0; i < $scope.combatants.length; i++) {
                    var combatant = $scope.combatants[i];
                    if(typeof combatant.conSave=="undefined") continue;
                     postToCombat(combatant, "Con Save", "1d20+"+combatant.conSave);
               }
            }],
            ['Int', function ($itemScope) {
                for (var i = 0; i < $scope.combatants.length; i++) {
                    var combatant = $scope.combatants[i];
                    if(typeof combatant.intSave=="undefined") continue;
                     postToCombat(combatant, "Int Save", "1d20+"+combatant.intSave);
               }
            }],
            ['Wis', function ($itemScope) {
                for (var i = 0; i < $scope.combatants.length; i++) {
                    var combatant = $scope.combatants[i];
                    if(typeof combatant.wisSave=="undefined") continue;
                     postToCombat(combatant, "Wis Save", "1d20+"+combatant.wisSave);
               }
            }],
            ['Cha', function ($itemScope) {
                for (var i = 0; i < $scope.combatants.length; i++) {
                    var combatant = $scope.combatants[i];
                    if(typeof combatant.chaSave=="undefined") continue;
                     postToCombat(combatant, "Cha Save", "1d20+"+combatant.chaSave);
               }
            }]
        ]
    ],
            ['Add Persistent Effect', function($itemScope) {
                if(typeof $itemScope.combatant.pE == "undefined") $itemScope.combatant.pE = [];
                $scope.contextCombatant = $itemScope.combatant;
                $scope.Ui.turnOn('persistent');

                // console.log("test");
                // $scope.Ui.turnOn('persistentModal');
            }, ""],
            ['Save Board to Group', function($itemScope) {
                var groupName=prompt("Group Name","");
                var group = angular.copy($scope.combatants);
                if(groupName!=null && groupName!="") $scope.groups.push({"name":groupName,"group":group});
            }, ""],
            ' '
        ];
 
        $scope.hpOptions = [
            ['25', function($itemScope) {
                $itemScope.combatant.hp -= 25;
            }, "stay"],
            ['15', function($itemScope) {
                $itemScope.combatant.hp -= 15;
            }, "stay"],
            ['5', function($itemScope) {
                $itemScope.combatant.hp -= 5;
            }, "stay"],
            ['25', function($itemScope) {
                $itemScope.combatant.hp += 25;
            }, "stay"],
            ['15', function($itemScope) {
                $itemScope.combatant.hp += 15;
            }, "stay"],
            ['5', function($itemScope) {
                $itemScope.combatant.hp += 5;
            }, "stay"],
            ' '
        ];
        function postToCombat(actor,name,roll){
         var combtxt = monsterFactory.diceBag(actor, name, roll);
            combtxt = "<strong>"+actor.name+"</strong><span>,"+combtxt+"</span>";
            combtxt = $compile(combtxt)($scope);
            angular.element(document.querySelector('#combatLog')).prepend(combtxt);            
        }

        $scope.echo = function(str) {
                console.log(str);
            }
            // var customHtml = '<div ng-init="echo(\'test\')" style="cursor: pointer; background-color: pink">' +
            //                  '<i class="glyphicon glyphicon-ok-sign"></i> Testing Custom </div>';

        // var customItem = {
        //     html: customHtml, 
        //     enabled: function() {return true}, 
        //     click: function ($itemScope, $event, value) {
        //         alert("custom html");
        //     }};

        // $scope.hpOptions = [customItem,
        //     ['Example 1', function ($itemScope, $event, value) {
        //         alert("Example 1");
        //     }]];


        // To add to local storage
        // localStorageService.set('localStorageKey','Add this!');
        // Read that value back
        // var value = localStorageService.get('localStorageKey');
        // To remove a local storage
        // localStorageService.remove('localStorageKey');
        // Removes all local storage
        // localStorageService.clearAll();
        // You can also play with cookies the same way
        //localStorageService.cookie.set('localStorageKey','I am a cookie value now');

        $scope.deathCheck = function(hp, index) {
            if (hp < 0) {
                $scope.combatants.splice(index, 1);
            }
        };

        $scope.diceBag = function(name,roll) {
            if (roll == '') return;
            postToCombat({"name":"Dice Bag"}, name, roll);
        };

        $scope.preAction = function(scope) {
            var combatant = $scope.combatants[$scope.selectedRow];
            console.log( combatant);
            if (typeof scope.subsubitem != "undefined") {
                scope.$parent.svisible = false;
                scope.$parent.$parent.visible = false;
                $scope.Ui.turnOff('combatantDropdown');
                combatant.catt = scope.subsubitem;
                combatant.casterLevel = scope.$parent.$parent.attack.cl;
                combatant.meleespell = scope.$parent.$parent.attack.meleespell;
                combatant.rangedspell = scope.$parent.$parent.attack.rangedspell;
                if(typeof scope.$parent.$parent.attack.spellAbil != "undefined") combatant.spellAbil = combatant[scope.$parent.$parent.attack.spellAbil.toLowerCase()];
                combatant.subitem = scope.subitem;
                combatant.attack = scope.attack;
                console.log(scope.attack);
                var objectData = {
                    "where": [{
                        "name": scope.subsubitem.name
                    }]
                };
                monsterFactory.getSpells(objectData).then(
                    function(response) {
                        combatant.spell = response.data;
                        combatant.spellslot = response.data.level;
                        combatant.spell.fulltext = $sce.trustAsHtml(combatant.spell.fulltext);
                    },
                    function(err) {
                if(err.status == 401){console.log(15);$scope.Ui.turnOn('login');}
                        console.log(err);
                    });
            } else if (typeof scope.subitem != "undefined") {
                scope.$parent.visible = false;
                $scope.Ui.turnOff('combatantDropdown');
                combatant.catt = scope.subitem;
                console.log(scope.subitem);
            } else {
                $scope.Ui.turnOff('combatantDropdown');
                //scope.attack.submenu = null
                combatant.catt = scope.attack;
                console.log(scope.attack);
            }
        };
        $scope.Action = function(actor, mod, adv) {
            adv = adv || "";
            if (mod == null) {
                mod = {
                    bonus: "+0",
                    name: "Straight d20" + adv
                };
            }
            var combatant = $scope.combatants[$scope.selectedRow];
            var combtxt="";
            console.log(mod);
            if (mod.type == "ma") {
                var attArr = mod.bonus.split(",");
                for (var i = 0; i < attArr.length; i++) {
                    combatant.attacks.find(function(element, index, array) {
                        if (element.name.substring(0, attArr[i].length) == attArr[i]) {
                            console.log(element);
                            if (element.num > 0) element.num--;

                            //$scope.Action(actor, element, adv);
                            combtxt += "&nbsp;&nbsp;&nbsp;&nbsp;"+monsterFactory.diceBag(actor, element, '', adv);
                            console.log(combtxt);
                            return true;
                        }
                    });
                }
            combtxt = "<strong>"+actor.name+"</strong>,"+" Round "+actor.turn+" <br>"+combtxt;
                //return;
            }
            else if (mod.type == "ca") {
                console.log(combatant);
                var damage = combatant.spell.damage;
                var attack = combatant.spell.attack;
                        console.log(damage);
                if (typeof damage == 'undefined') damage = '';
                if (typeof attack == 'undefined') attack = '';
                    else{
                        attack = attack.replace("melee", combatant.meleespell);
                        attack = attack.replace("ranged", combatant.rangedspell);
                        }
                if (damage.substring(0, 8) == '#summon#') {
                    var summon = damage.substring(8);
                    summon = summon.replace("#init#", 0);
                    summon = summon.replace("#meleespell#", combatant.subitem.meleespell);
                    summon = summon.replace("#rangedspell#", combatant.subitem.rangedspell);
                    summon = JSON.parse(summon);
                    console.log(summon);
                    $scope.addComb(summon);
                    $scope.combatants[$scope.combatants.length - 1].init = combatant.init;
                } else {
                    damage = damage.replace('{level}', combatant.casterLevel);
                    damage = damage.replace('{abil}', combatant.spellAbil);
                    damage = damage.replace('{slotLevel}', combatant.spellslot);
                    var preCalc = damage.match(/\{.*?\}/g);
                    if(preCalc == null) preCalc = [];
                    for (var i = 0; i < preCalc.length; i++) {
                        damage = damage.replace(preCalc[i], Math.round(eval(preCalc[i].slice(1, -1))));
                    }

                    if (combatant.catt.num > 0) combatant.catt.num--;
                    else if(combatant.spell.level != combatant.spellslot){
                        combatant.subitem.num--;
                        for (var i = 0; i < combatant.attack.submenu.length; i++) {
                            if(combatant.attack.submenu[i].name.substring(0,1) == combatant.spellslot){
                                combatant.attack.submenu[i].num--;
                                combatant.subitem.num++;
                                break;
                            }
                        }
                    }
                    else combatant.subitem.num--;
                    var combattxt = {
                        "name": mod.name,
                        "bonus": attack,
                        "damage": damage,
                        "special": combatant.spell.shorttext
                    };
                }
                combtxt = "<strong>"+actor.name+"</strong>,"+" Round "+actor.turn+"<br>&nbsp;&nbsp;&nbsp;&nbsp;";
                combtxt += monsterFactory.diceBag(actor, combattxt, '', $scope, adv);
            } else {
                    if (combatant.catt.num > 0) combatant.catt.num--;
                    combtxt = "<strong>"+actor.name+"</strong>,"+monsterFactory.diceBag(actor, mod, '', adv);
                }
                    if (combatant.catt.num === 0) combatant.catt.num="-";
                    if(typeof combatant.subitem != "undefined") if (combatant.subitem.num === 0) combatant.subitem.num="-";
            combtxt = $compile(combtxt)($scope);
            angular.element(document.querySelector('#combatLog')).prepend(combtxt);
        }

        var orderBy = $filter('orderBy');
        $scope.order = function(e) {
            $scope.combatants = orderBy($scope.combatants, ['turn', '-init', 'name'], false);
            var highest = orderBy($scope.combatants, 'turn', true);
            $scope.currentTurn = highest[0]['turn'];
            if ($scope.combatants[0].img != "" && $scope.combatants[0].img !== undefined) mainFactory.setShowFile({
                "path": $scope.combatants[0].img
            })
            $timeout(function() {
                $scope.setClickedRow(0);
            }, 1);
        };

        $scope.endTurn = function(combatant) {
            combatant.turn += 1;
            $scope.order();
            if($scope.combatants[0].pE){
                var com = $scope.combatants[0];
                for (var i = 0; i < com.pE.length; i++) {
                    com.pE[i].duration--;

                    if(com.pE[i].duration%com.pE[i].frequency==0){
                        var hpChange = '';
                        if(typeof com.pE[i].hp != "undefined"){
                            monsterFactory.rollDice(com.pE[i].hp);
                            com.hp = eval(com.hp+hpChange);
                            hpChange = " (HP: "+hpChange+")";
                        }
                        if(com.pE[i].duration == 0) hpChange = hpChange + " <-Effect Ends";
                        monsterFactory.diceBag(com, com.pE[i].name, com.pE[i].effect+hpChange, $scope);
                    }
                    if(com.pE[i].duration == 0) com.pE.splice(i,1);
                }

            }
        };

        $scope.startCombat = function() {
            for (var i in $scope.combatants) {
                $scope.combatants[i].turn = 1;
            }
            $scope.order();
        };

        $scope.clearCombat = function() {
            $scope.combatants = [];
            $scope.combatLog = '';
        }

        $scope.addGroup = function(group) {
            console.log(group);
            for (var i = 0; i < group.group.length; i++) {
                $rootScope.loadMonster(group.group[i]);
            }
            // $scope.combatants = $scope.combatants.slice(0, 0).concat(group).concat($scope.combatants.slice(0));
            $scope.order();
        };

        $rootScope.loadMonster = function(monster) {
            if(monster.id == null)
            {
            monster.ac=Number(monster.ac);
            monster.hp=Number(monster.hp);
            monster.init=Number(monster.init);
            if ($scope.currentTurn == null) {
                $scope.currentTurn = 0;
            }
            monster.turn = $scope.currentTurn;
                 $scope.combatants.splice(0,0,monster);
            return;
            }
            var getData = {'where':[{"id":monster.id}]};
            monsterFactory.getMonsters(getData).then(function(response){
            console.log(response);
            var tempmon = response.data;
            var recentExists = false;
            for (var i = 0; i < $scope.recentMonsters.length; i++) {
                console.log($scope.recentMonsters[i].id);
                if ($scope.recentMonsters[i].id == monster.id) recentExists = true
            }
            if (recentExists == false) $scope.recentMonsters.push(monster);

            if ($scope.recentMonsters.length == 4) $scope.recentMonsters.splice(0, 1);
            if ($scope.currentTurn == null) {
                $scope.currentTurn = 0;
            }
            var count = $scope.combatants.reduce(function(n, combatant) {
                return n + (combatant.name.substring(0, tempmon.name.length) === tempmon.name);
            }, 0);
            count = count == 0 ? '' : ' ' + eval(count + 1);
            tempmon.ac=Number(tempmon.ac);
            console.log(Number(tempmon.ac));
            $scope.combatants.splice(0,0,tempmon);
            $scope.combatants[0]['name'] = tempmon.name + count;
            // console.log($scope.combatants[count]['initiative']);
            // console.log(tempmon['initiative']);
            $scope.combatants[0]['hp'] = eval(monsterFactory.rollDice(tempmon.hp));
            if(typeof tempmon.initiative != "undefined" && tempmon.initiative != ""){
            // tempmon.initiative = tempmon.initiative > 0 ? '1d20+' + tempmon.initiative : '1d20-' + tempmon.initiative;
            $scope.combatants[0]['init'] = eval(monsterFactory.rollDice(tempmon.initiative.replace("--","-")));
                        } 
            $scope.combatants[0]['turn'] = $scope.currentTurn;
            $scope.combatants[0]['ac'] = eval(monsterFactory.rollDice(tempmon.ac));
            if(typeof $scope.combatants[0].attacks == "undefined")$scope.combatants[0].attacks=[];
            if($scope.combatants[0].attacks.length == 0){
                $scope.combatants[0].catt = {
                                                    "name":"Generic Attack",
                                                    "bonus":"+0",
                                                    "damage":"<br> \
                                                     d6:1d6+{STR} (ex: Shortsword, Mace, Spear)<br>\
                                                     d8:1d8+{STR} (ex: Katana, Quarterstaff, Scythe)<br>\
                                                    d10:1d10+{STR} (ex: Bastard Sword, Glaive)<br>\
                                                    d12:1d12+{STR} (ex: GreatAxe, GreatSword, Maul)<br>\
                                                    ","special":"Damage includes STR Bonus"
                                                    };
                }
                else if(typeof $scope.combatants[0].attacks[0].submenu == 'undefined'){
                    $scope.combatants[0].catt = $scope.combatants[0].attacks[0];
                    }
                    else{
                        $scope.combatants[0].catt = $scope.combatants[0].attacks[0].submenu[0];
                        }


            })
        };

        $scope.setClickedRow = function(index) {
            $scope.selectedRow = index;
            $scope.senses='';
            if(typeof $scope.combatants[index].senses != 'undefined' && $scope.combatants[index].senses != null) $scope.senses = $sce.trustAsHtml($scope.combatants[index].senses.replace("darkvision","<strong>Darkvision</strong>").replace("passive Perception","<strong>Passive Perception</strong>"));
            $scope.special = $sce.trustAsHtml($scope.combatants[index].special);
            $scope.desc = $sce.trustAsHtml($scope.combatants[index].desc);
            $scope.img = $scope.combatants[index].img;
            // var ca = false;
            // if(typeof $scope.combatants[index].catt != 'undefined') if($scope.combatants[index].catt.type =='ca') ca = true;
            // $scope.activeTabValue = $scope.senses?1:$scope.special?2:ca?3:0;
        }
        if($scope.combatants.length>0) $scope.setClickedRow(0);

    }
])

.controller('SoundCtrl', ['$scope', '$interval', '$timeout', '$http', 'soundsFactory', 'soundsEditFactory', 'localStorageService',
    function($scope, $interval, $timeout, $http, soundsFactory, soundsEditFactory, localStorageService) {
                console.log("getScenes");

        var stopTime = $interval(function() {}, 200);

        $scope.aS = [];
        var context;
        var buffer;
        var convolver;
        var panner;
        var source;
        var dryGainNode;
        var wetGainNode;
        var unregister = [];
        var lowFilter;
        var gTopProjection = 0;
        var gFrontProjection = 0;

        var x = 0;
        var y = 0;
        var z = 0;
        var hilightedElement = 0;
        var bufferList;

        var kInitialReverbLevel = 0.6;

        function mixToMono(buffer) {
            if (buffer.numberOfChannels == 2) {
                var pL = buffer.getChannelData(0);
                var pR = buffer.getChannelData(1);
                var length = buffer.length;

                for (var i = 0; i < length; ++i) {
                    var mono = 0.5 * (pL[i] + pR[i]);
                    pL[i] = mono;
                    pR[i] = mono;
                }
            }
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        if (localStorageService.get('collectionId')) {
            $scope.collectionId = localStorageService.get('collectionId');
            $scope.collectionName = localStorageService.get('collectionName');
            var objectData = {
                "fields": "all",
                "collection": $scope.collectionId
            };
            }
            else {
                $scope.collectionId = "default";
                var objectData = {
                    "fields": "all",
                    "collection": "default"
                };
                }

                console.log("getScenes");
        soundsFactory.getScenes(objectData).then(
            function(response) {
                $scope.allScenes = response.data;
                soundsFactory.scenes = response.data;
                console.log(soundsFactory);
            },
            function(err) {
                if(err.status == 401){console.log(16);$scope.Ui.turnOn('login');}
                console.log(err);
            });

            soundsEditFactory.getCollections().then(function(response) {
                console.log(response);
                $scope.collections = response.data;
            }, function(err) {
                if(err.status == 401){console.log(17);$scope.Ui.turnOn('login');}
                console.log(err);
            });


        $scope.changeCollection = function(collection){
                var objectData = {
                    "fields": "all",
                    "collection": collection.id
                };
                $scope.collectionName = collection.name;
         soundsFactory.getScenes(objectData).then(
            function(response) {
                $scope.allScenes = response.data;
                soundsFactory.scenes = response.data;
                console.log(soundsFactory);
            localStorageService.set('collectionId', collection.id);
            localStorageService.set('collectionName', collection.name);
            },
            function(err) {
                if(err.status == 401){console.log(18);$scope.Ui.turnOn('login');}
                console.log(err);
            });
         };
        $scope.toggleScene = function(scene) {
            scene.active=!scene.active;
                console.log(scene.active);
            soundsFactory.toggleScene(scene);

        };

    }
])

.controller('SpellsCtrl', ['$rootScope', '$filter', '$window', 'filterFilter', '$scope', 'spellFactory', '$timeout', '$routeParams', '$sce',
    function($rootScope, $filter, $window, filterFilter, $scope, spellFactory, $timeout, $routeParams, $sce) {

        $scope.spell = {};
        $scope.spell.id = $routeParams.id;
        $scope.tinymceOptions = {
            onChange: function(e) {

                // put logic here for keypress and cut/paste changes
            },
            inline: false,
            plugins: 'advlist autolink link image lists charmap print preview code',
            skin: 'lightgray',
            menubar: false,
            statusbar: false,
            toolbar_items_size: 'small',
            forced_root_block: "",
            toolbar: 'undo redo | bold italic | link | bullist numlist | code'
        };

        $scope.filterSpells = function() {
            return $scope.spells.filter(function(item) {
                console.log(item.name.toString().indexOf($scope.filterName));
                console.log(eval(item.level) == $scope.filterLevel);
                console.log($scope.filterName);
                console.log($scope.filterLevel);
                return (item.name.toString().indexOf($scope.filterName) > -1 && eval(item.level) == $scope.filterLevel)
            }); //end of filter
        }; //end of filterUsers

        console.log($routeParams.id);
        $scope.heading = "Add a New Spell";
        spellFactory.getSpellBasics().then(
            function(response) {
                $scope.spells = response.data;
                // $log.info($scope.sceneContent);
            },
            function(err) {
                if(err.status == 401){console.log(19);$scope.Ui.turnOn('login');}
                console.log(err);
            });
        if ($scope.spell.id !== 'new') {
            $scope.heading = "Update Spell";
            var objectData = {
                "where": [{
                    "id": $scope.spell.id
                }]
            };
            spellFactory.getSpells(objectData).then(
                function(response) {
                    $scope.spell = response.data;
                    $scope.spell.fulltext = $sce.trustAsHtml($scope.spell.fulltext);
                    // $log.info($scope.sceneContent);
                },
                function(err) {
                if(err.status == 401){console.log(20);$scope.Ui.turnOn('login');}
                    console.log(err);
                });
        }
        $scope.loadSpell = function(spell) {
            console.log(spell);
            $scope.go('edit/spell/' + spell.id,false);

            var objectData = {
                "where": [{
                    "id": spell.id
                }]
            };
            spellFactory.getSpells(objectData).then(
                function(response) {
                    $scope.heading = "Update Spell";
                    $scope.spell = response.data;
                    $scope.spell.fulltext = $sce.trustAsHtml($scope.spell.fulltext);
                    // $log.info($scope.sceneContent);
                },
                function(err) {
                if(err.status == 401){console.log(21);$scope.Ui.turnOn('login');}
                    console.log(err);
                });


        }
        $scope.saveSpell = function() {
            spellFactory.updateSpell($scope.spell).then(
                function() {
                    //flashMessageService.setMessage("Page Saved Successfully");
                    //$scope.go('edit');
                },
                function() {
                    // $log.error('error saving data');
                }

            );
        };
    }
])

.controller('WorldCtrl', ['$rootScope', '$filter', '$scope', 'citizenFactory', 'hotRegisterer',
    function($rootScope, $filter, $scope, citizenFactory, hotRegisterer) {
        $scope.ageYears = 20;
        console.log("test");
        $scope.init = function() {
            citizenFactory.getWorld().then(
                function(response) {
                    $scope.regions = response.data.regions;
                    if ($scope.region == null || typeof $scope.region == "undefined" || $scope.region == "") $scope.region = $scope.regions[0].id;
                    $scope.professions = response.data.professions;
                    $scope.races = response.data.races;
                    $scope.descriptives = response.data.descriptives;
                    $scope.names = response.data.names;
                    console.log($scope.regions);
                },
                function(err) {
                if(err.status == 401){console.log(22);$scope.Ui.turnOn('login');}
                    console.log(err);
                });
            $scope.raceCol = [{data: 'name', title: 'Race'}, 
                              {data: 'adulthood', title: 'Adulthood'}, 
                              {data: 'middleAge', title: 'Middle Age'}, 
                              {data: 'oldAge', title: 'Old Age'}, 
                              {data: 'venerable', title: 'Venerable'}, 
                              {data: 'maxAge', title: 'Maximum Age'}, 
                              {data: 'friendRate', title: 'Friend Rate'}, 
                              {data: 'enemyRate', title: 'Enemy Rate'}];

            $scope.descCol = [{data: 'type', title: 'Type'}, 
                              {data: 'text', title: 'Text', width: 460}, 
                              {data: 'gender', title: 'Limit Gender (M/F)'}];

            $scope.profCol = [{data: 'name', title: 'Prof'}, 
                              {data: 'minAge', title: 'Min Age Grp'}, 
                              {data: 'maxAge', title: 'Max Age Grp'}];

            $scope.nameCol = [{data: 'name', title: 'Name'}, 
                              {data: 'race', title: 'Race'}, 
                              {data: 'gender', title: 'Gender'}];
        };

        $scope.deleteObject = function(object,index){
            delete object[index];
            return object;
        }

        $scope.ageRegion = function(region, years, index) {
            var pageData = {
                "region": region,
                "years": years
            };
            console.log(years);
            $scope.regions[index].loading = true;
            citizenFactory.ageRegion(pageData).then(
                function(response) {
                    console.log(response.data);
                    $scope.regions[index].epoch = response.data.epoch;
                    $scope.regions[index].stats = response.data.stats;
                    $scope.regions[index].loading = false;
                },
                function(err) {
                if(err.status == 401){console.log(23);$scope.Ui.turnOn('login');}
                   console.log(err);
                });
        };

        $scope.seedRegion = function(region, index) {
            var pageData = {
                "region": region
            };
            $scope.regions[index].loading = true;
            citizenFactory.seedRegion(pageData).then(
                function(response) {
                    console.log(response.data);
                    $scope.regions[index].stats = response.data;
                    $scope.regions[index].loading = false;
                },
                function(err) {
                if(err.status == 401){console.log(24);$scope.Ui.turnOn('login');}
                    console.log(err);
                });
        };

        $scope.saveRegion = function(region) {
            var pageData = {
                "region": region
            };
            console.log(pageData);
            citizenFactory.updateRegion(pageData).then(
                function(response) {},
                function(err) {
                if(err.status == 401){console.log(25);$scope.Ui.turnOn('login');}
                    console.log(err);
                });
        };

        $scope.clearRegion = function(region, index) {
            var pageData = {
                "region": region
            };
            citizenFactory.clearRegion(pageData).then(
                function(response) {
                    $scope.regions[index].stats = [];
                },
                function(err) {
                if(err.status == 401){console.log(26);$scope.Ui.turnOn('login');}
                    console.log(err);
                });
        };

        $scope.deleteRegion = function(id, index) {
          if(!confirm("Are you sure? This cannot be undone!\nClick 'OK' to delete.")) return;
            var pageData = {
                "value": id,
                "field":"id"
            };
            citizenFactory.deleteRegion(pageData).then(
                function(response) {
                    delete $scope.regions[index];
                },
                function(err) {
                if(err.status == 401){console.log(27);$scope.Ui.turnOn('login');}
                    console.log(err);
                });
        };


        function deleteWorld(table,rowsArray,hot){
            var dataSend = {};
            dataSend.value = [];
            dataSend.field = 'id';
            for(var i=0;i<rowsArray.length;i++){
                dataSend.value.push(hot.getDataAtRowProp(rowsArray[i],"id"));
            }
            citizenFactory.deleteNpcRecord(table,dataSend).then(function(response) {
                console.log(response.data);
                }, function() {console.log("error");
                });
            }

        function updateWorld(table,changes,hot){
                if(changes == null){return;}
                for (var i = 0; i < changes.length; i++) {
                    var change = changes[i];
                     if(change[3] == change[2]){return;}
                        var dataSend = new Object;
                        dataSend['id'] = hot.getDataAtRowProp(change[0],"id");
                        dataSend[change[1]] = change[3];
                        citizenFactory.updateNpcRecord(table,dataSend).then(function(response) {
                            console.log(response.data);
                            hot.setDataAtRowProp(change[0],"id",response.data,"idUpdate");
                            console.log(hot.getDataAtRowProp(change[0],"id"));
                            }, function() {console.log("error");
                            });
               }
        }

        var settings = {
            height: 200,
            stretchH: 'all',
            colHeaders: true,
            rowHeaders: false,
            minSpareRows: 1,
            contextMenu: ['remove_row']
            };
        $scope.descriptivesSettings = angular.copy(settings);
        $scope.descriptivesSettings.onAfterChange = function(changes,source){
            if(source == "idUpdate") return;
            updateWorld("descriptives",changes,hotRegisterer.getInstance('descriptives'));
        };
        $scope.descriptivesSettings.onBeforeRemoveRow = function(index,amount,rowsArray) {
                console.log(rowsArray);
            deleteWorld("descriptives",rowsArray,hotRegisterer.getInstance('descriptives'));
        };

        $scope.namesSettings = angular.copy(settings);
        $scope.namesSettings.onAfterChange = function(changes,source){
            if(source == "idUpdate") return;
            updateWorld("names",changes,hotRegisterer.getInstance('names'));
        };
        $scope.namesSettings.onBeforeRemoveRow = function(index,amount,rowsArray) {
                console.log(rowsArray);
            deleteWorld("names",rowsArray,hotRegisterer.getInstance('names'));
        };

        $scope.professionSettings = angular.copy(settings);
        $scope.professionSettings.onAfterChange = function(changes,source){
            if(source == "idUpdate") return;
            updateWorld("profession",changes,hotRegisterer.getInstance('professions'));
        };
        $scope.professionSettings.onBeforeRemoveRow = function(index,amount,rowsArray) {
                console.log(rowsArray);
            deleteWorld("profession",rowsArray,hotRegisterer.getInstance('professions'));
        };

        $scope.raceSettings = angular.copy(settings);
        $scope.raceSettings.onAfterChange = function(changes,source){
            if(source == "idUpdate") return;
            updateWorld("race",changes,hotRegisterer.getInstance('races'));
        };
        $scope.raceSettings.onBeforeRemoveRow = function(index,amount,rowsArray) {
                console.log(rowsArray);
            deleteWorld("race",rowsArray,hotRegisterer.getInstance('races'));
        };



    }
])

.controller('ActiveNpcCtrl', ['$rootScope', '$filter', '$scope', 'citizenFactory', '$routeParams', 'localStorageService', '$timeout',
    function($rootScope, $filter, $scope, citizenFactory, $routeParams, localStorageService, $timeout) {

           citizenFactory.activeNPCS = [];

           $scope.citizenFactory = citizenFactory;

         if (localStorageService.get('activeNPCS')) $scope.citizenFactory.activeNPCS = localStorageService.get('activeNPCS');

        $scope.$watchCollection('citizenFactory.activeNPCS', function() {
            if($scope.citizenFactory.activeNPCS.length==0) return;
            localStorageService.set('activeNPCS', $scope.citizenFactory.activeNPCS);
            console.log("watch");
             $scope.getCitizenDetails();
        }, true);

        $scope.removeActiveNPC = function(citizenId){
            citizenFactory.activeNPCS.splice(citizenFactory.activeNPCS.indexOf(citizenId),1);
        };

        $scope.updateCitizen = function(citizen) {
            if (citizen.birthYear == '' || citizen.birthYear == null) citizen.birthYear = 'NULL';
            if (citizen.generation == '' || citizen.generation == null) citizen.generation = 'NULL';
            var pageData = {
                "region": $scope.region,
                "citizen": citizen
            };
            citizenFactory.updateCitizen(pageData).then(function(response) {
                    console.log( $scope.saveNotify);
         $scope.saveNotify = "Saved";
                     $timeout(function() {
                            $scope.saveNotify = '';
                        }, 1500);

                },
                function(err) {
                    $scope.saveNotify = 'error saving';
                if(err.status == 401){console.log(31);$scope.Ui.turnOn('login');}
                    console.log(err);
                });
        };
$scope.reloadAfter = function(clickedLink){
    if(clickedLink) $scope.getCitizenDetails();
    return false;
};

$scope.featureCompile = function(features){
    var compiledFeat;
    for(var key in features){
        if(!features[key])
        {
            compiledFeat+= "<strong class='text-capitalize'>"+key.sent+"</strong>: "+features[key]+"<br>";
        }
    }


    return compiledFeat;
};

 $scope.getCitizenDetails = function(){
                if($scope.citizenFactory.activeNPCS.length==0) return;

        citizenFactory.getActiveCitizens($scope.citizenFactory.activeNPCS).then(
            function(response) {
            console.log(response);
            $scope.activeNPCDetails = response.data;
            },
            function(err) {
                if(err.status == 401){console.log(29);$scope.Ui.turnOn('login');}
                console.log(err);
            });
 };

 $scope.citizenPopOver = {  };
 $scope.citizenPopOver.notice = '';
 $scope.clickedLink = false;
 $scope.getCitizenDetails();

    }
])

.controller('NpcCtrl', ['$rootScope', '$filter', '$scope', 'citizenFactory', '$routeParams', 'localStorageService',
    function($rootScope, $filter, $scope, citizenFactory, $routeParams, localStorageService) {

           citizenFactory.activeNPCS = [];

            $scope.citizenFactory = citizenFactory;
            console.log($scope.citizenFactory);
       $scope.setActiveCitizen = function(citizenId){
            citizenFactory.activeNPCS.push(citizenId);
            console.log(citizenFactory.activeNPCS);
        };

        var orderBy = $filter('orderBy');
        $scope.locks=[];
        $scope.locks.body = false; //) $scope.selectedCitizen.features['Body Type'] = response.data['Body Type'];
        $scope.locks.body = false; //) $scope.selectedCitizen.features['Body Description'] = response.data['Body Description'];
        $scope.locks.clothing = false; //) $scope.selectedCitizen.features['Clothing'] = response.data['Clothing'];
        $scope.locks.eyeC = false; //) $scope.selectedCitizen.features['Eye Color'] = response.data['Eye Color'];
        $scope.locks.eyeD = false; //) $scope.selectedCitizen.features['Eye Description'] = response.data['Eye Description'];
        $scope.locks.face = false; //) $scope.selectedCitizen.features['Face Shape'] = response.data['Face Shape'];
        $scope.locks.hairC = false; //) $scope.selectedCitizen.features['Hair Color'] = response.data['Hair Color'];
        $scope.locks.hairD = false; //) $scope.selectedCitizen.features['Hair Description'] = response.data['Hair Description'];
        $scope.locks.skinC = false; //) $scope.selectedCitizen.features['Skin Color'] = response.data['Skin Color'];
        $scope.locks.skinD = false; //) $scope.selectedCitizen.features['Skin Complexion'] = response.data['Skin Complexion'];
        $scope.locks.special = false; //) $scope.selectedCitizen.features['Special'] = response.data['Special'];
        $scope.locks.lineage = false; //) $scope.selectedCitizen.lineage = response.data['Lineage'];
        $scope.locks.manner = false; //) $scope.selectedCitizen.mannerisms = response.data['Manner'];
        $scope.locks.quirk = false;
        $scope.toggleLock = function(lock)
        {
            $scope.locks[lock] = !$scope.locks[lock];
        };

        console.log($routeParams);
        $scope.selectedCitizen = null;
        $scope.region = $routeParams.region;
        $scope.selectedRow = []; // initialize our variable to null
        $scope.setCitizen = function(index, table, citizen) { //function that sets the value of selectedRow to current index
            $scope.selectedRow = []; //reset all tables
            $scope.selectedRow[table] = index; //set selected row
            var objectData = {
                "region": $scope.region,
                "where": [{
                    "id": citizen
                }]
            };
            console.log(citizen);
            citizenFactory.getCitizen(objectData).then(
                function(response) {
                    $scope.selectedCitizen = response.data;
                    $scope.spouse = $scope.citizens.all[$scope.selectedCitizen.spouse];
                    $scope.mother = $scope.citizens.all[$scope.selectedCitizen.mother];
                    $scope.father = $scope.citizens.all[$scope.selectedCitizen.father];
                    $scope.children = $scope.selectedCitizen.children;
                },
                function(err) {
                if(err.status == 401){console.log(28);$scope.Ui.turnOn('login');}
                    console.log(err);
                });
            //$scope.selectedCitizen = citizen; //set selected row
            //$scope.selectedCitizen.alive = citizen.alive == 1? true:false; //set selected row
        };

       if($routeParams.citizen) $scope.setCitizen(0,0,$routeParams.citizen);
            console.log(citizenFactory);
        citizenFactory.getWorld().then(
            function(response) {
            console.log(response);
                $scope.regions = response.data.regions;
                $scope.professions = response.data.professions;
                $scope.races = response.data.races;
                $scope.descriptives = response.data.descriptives;
                $scope.descriptives
                $scope.lineage = $scope.descriptives.filter(function(value) {
                      if (value.type == "Lineage") return true;
                      return false;
                  });
                for (var i = 0; i < $scope.lineage.length; i++) {
                    $scope.lineage[i]=$scope.lineage[i].text;
                }
            },
            function(err) {
                if(err.status == 401){console.log(29);$scope.Ui.turnOn('login');}
                console.log(err);
            });

        $scope.regionInit = function(region) {
            if (region.id == $scope.selectedCitizen.region) $scope.currentRegion = region;
        }
        $scope.generationChange = function() {
            if ($scope.selectedCitizen.generation == '') $scope.selectedCitizen.generation = 'NULL';
        }
        $scope.getAspects = function() {
            var gender = $scope.selectedCitizen.gender.substring(0, 1).toUpperCase();
            var pageData = {
                "region": $scope.region,
                "gender": gender
            };
            citizenFactory.getAspects(pageData).then(function(response) {
                console.log($scope.locks);
                    if ($scope.locks.body != true) $scope.selectedCitizen.features['Body Type'] = response.data['Body Type'];
                    if ($scope.locks.body != true) $scope.selectedCitizen.features['Body Description'] = response.data['Body Description'];
                    if ($scope.locks.clothing != true) $scope.selectedCitizen.features['Clothing'] = response.data['Clothing'];
                    if ($scope.locks.eyeC != true) $scope.selectedCitizen.features['Eye Color'] = response.data['Eye Color'];
                    if ($scope.locks.eyeD != true) $scope.selectedCitizen.features['Eye Description'] = response.data['Eye Description'];
                    if ($scope.locks.face != true) $scope.selectedCitizen.features['Face Shape'] = response.data['Face Shape'];
                    if ($scope.locks.hairC != true) $scope.selectedCitizen.features['Hair Color'] = response.data['Hair Color'];
                    if ($scope.locks.hairD != true) $scope.selectedCitizen.features['Hair Description'] = response.data['Hair Description'];
                    if ($scope.locks.skinC != true) $scope.selectedCitizen.features['Skin Color'] = response.data['Skin Color'];
                    if ($scope.locks.skinD != true) $scope.selectedCitizen.features['Skin Complexion'] = response.data['Skin Complexion'];
                    if ($scope.locks.special != true) $scope.selectedCitizen.features['Special'] = response.data['Special'];
                    if ($scope.locks.lineage != true) $scope.selectedCitizen.lineage = response.data['Lineage'];
                    if ($scope.locks.manner != true) $scope.selectedCitizen.mannerisms = response.data['Manner'];
                    if ($scope.locks.quirk != true) $scope.selectedCitizen.quirks = response.data['Quirk'];
                },
                function(err) {
                if(err.status == 401){console.log(30);$scope.Ui.turnOn('login');}
                    console.log(err);
                });
        }

        $scope.newCitizen = function() {
            $scope.extended = true;
            $scope.spouse = [];
            $scope.mother = [];
            $scope.father = [];
            $scope.children = [];
            $scope.selectedCitizen = {
                "firstName": "",
                "lastName": "",
                "race": {},
                "age": "",
                "gender": "",
                "alive": "1",
                "married": "0",
                "spouse": "",
                "children": [],
                "mother": "",
                "father": "",
                "friends": "",
                "enemies": "",
                "mannerisms": "",
                "lineage": "",
                "quirks": "",
                "abilities": "",
                "features": {
                    "Special": "",
                    "Face Shape": "",
                    "Skin Complexion": "",
                    "Skin Color": "",
                    "Hair Description": "",
                    "Hair Color": "",
                    "Eye Description": "",
                    "Eye Color": "",
                    "Clothing": "",
                    "Body Type": ""
                },
                "region": $scope.region,
                "generation": "NULL",
                "profession": "",
                "notes": "",
                "birthYear": "NULL",
                "residentCity": ""
            };
        }

        $scope.updateCitizen = function(citizen) {
            if (citizen.birthYear == '' || citizen.birthYear == null) citizen.birthYear = 'NULL';
            if (citizen.generation == '' || citizen.generation == null) citizen.generation = 'NULL';
            var pageData = {
                "region": $scope.region,
                "citizen": citizen
            };
            citizenFactory.updateCitizen(pageData).then(function(response) {
                    console.log("saved");
                },
                function(err) {
                if(err.status == 401){console.log(31);$scope.Ui.turnOn('login');}
                    console.log(err);
                });
        };

        $scope.citizenInfo = function(citizen) {
            if (typeof $scope.citizens == "undefined" || typeof citizen == "undefined") return;
            citizen = $scope.citizens.all[citizen];
            return (citizen.alive == "1" ? 'Alive' : 'Dead') + "\nRace: " + citizen.race + "\nAge: " + citizen.age;
        }

        $scope.setGrouping= function(grouping){
            $scope.cGroup=grouping;
        }
        $scope.setRegion = function(region){
          $scope.currentRegion = region;
          $scope.citizens = {};
          $scope.raceGroups=[];
          $scope.lineageGroups=[];
          $scope.profGroups=[];
          $scope.cities=[];
          var objectData = {
              "region": region.id
          };
          citizenFactory.getCitizens(objectData).then(
              function(response) {
                  $scope.citizens.all = response.data;
                  $scope.citizens.alive = $scope.citizens.all.filter(function(value) {
                      if (value.alive == "1") return true;
                      return false;
                  });
                  $scope.citizens.alive = orderBy($scope.citizens.alive, ['age', 'name'], false);
                  for (var i in $scope.citizens.all) {
                      $scope.citizens.all[$scope.citizens.all[i].id] = $scope.citizens.all[i];
                      if($scope.citizens.all[i].alive=="1"){
                          if($scope.raceGroups.indexOf($scope.citizens.all[i].race)==-1) $scope.raceGroups.push($scope.citizens.all[i].race);
                          if($scope.lineageGroups.indexOf($scope.citizens.all[i].lineage)==-1) $scope.lineageGroups.push($scope.citizens.all[i].lineage);
                          if($scope.profGroups.indexOf($scope.citizens.all[i].profession)==-1 && $scope.citizens.all[i].profession.indexOf("Retired")==-1) $scope.profGroups.push($scope.citizens.all[i].profession);
                          if($scope.cities.indexOf($scope.citizens.all[i].residentCity)==-1) $scope.cities.push($scope.citizens.all[i].residentCity);
                      }
                  }
                  $scope.raceGroups.sort();
                  $scope.lineageGroups.sort();
                  $scope.profGroups.sort();
                  $scope.cities.sort();
        $scope.cGroups = {"Age":{
                            "field":"ageGroup",
                            "groups":['Youth','Adult','MiddleAged','Old'],
                            "headers":['Youth','Adult','Middle Aged','Old Age & Venerable']},
                        "Profession":{
                            "field":"profession",
                            "groups":$scope.profGroups,
                            "headers":$scope.profGroups
                        },
                        "City":{
                            "field":"residentCity",
                            "groups":$scope.cities,
                            "headers":$scope.cities
                        },
                        "Race":{
                            "field":"race",
                            "groups":$scope.raceGroups,
                            "headers":$scope.raceGroups
                        },
                        "Lineage":{
                            "field":"lineage",
                            "groups":$scope.lineageGroups,
                            "headers":$scope.lineageGroups
                        }};
        if (localStorageService.get('cGroup')) $scope.setGrouping(localStorageService.get('cGroup'));
            else $scope.setGrouping($scope.cGroups['Age'])

        $scope.$watch('cGroup', function() {
            localStorageService.set('cGroup', $scope.cGroup);
        }, true);
              },
              function(err) {
                if(err.status == 401){console.log(32);$scope.Ui.turnOn('login');}
                  console.log(err);
              });
          };


        if (localStorageService.get('currentRegion')) $scope.setRegion(localStorageService.get('currentRegion'));
            else $scope.setRegion({"id":$scope.region});


        $scope.$watch('currentRegion', function() {
            localStorageService.set('currentRegion', $scope.currentRegion);
        }, true);
    }
])

.controller('SettingsCtrl', ['$scope', '$rootScope', 'Upload', 'siteFactory', '$ocLazyLoad',
    function($scope, $rootScope, Upload, siteFactory, $ocLazyLoad) {
             $ocLazyLoad.load('https://js.stripe.com/v2/stripe.js');


            $scope.verify = function(){
                var a = Stripe.bankAccount.validateRoutingNumber($scope.paymentForm.routing, 'US') && Stripe.bankAccount.validateAccountNumber($scope.paymentForm.account, 'US');
                var b = Stripe.card.validateCardNumber($scope.paymentForm.number) && Stripe.card.validateExpiry($scope.paymentForm.exp_month, $scope.paymentForm.exp_year) && Stripe.card.validateCVC($scope.paymentForm.cvc) ;
                console.log(!(a || b));
                return !(a || b);
            };

           $scope.createMembership = function(){
                 Stripe.setPublishableKey('pk_test_E33MMEqwrwIu5p15UG9oT8zt');
            if($scope.paymentForm.type.substring(0,4) == "bank"){
                 var payData = {
                      country: 'US',
                      currency: 'USD',
                      routing_number: $scope.paymentForm.routing,
                      account_number: $scope.paymentForm.account,
                      account_holder_name: $scope.paymentForm.name,
                      account_holder_type: 'individual'
                     };
                Stripe.bankAccount.createToken(payData, function(status,response){
                    console.log(status);
                    response.payType = $scope.paymentForm.type;
                    console.log(response)
                    siteFactory.startMembership(response).then(function(response){
                        console.log(response);
                    });
                }
                );
                }    
            else{
                 
                 var payData = {
                      number: $scope.paymentForm.number,
                      cvc: $scope.paymentForm.cvc,
                      exp_month: $scope.paymentForm.exp_month,
                      exp_year: $scope.paymentForm.exp_year
                   };
                Stripe.card.createToken(payData, function(status,response){
                    console.log(status);
                    response.payType = $scope.paymentForm.type;
                    if($scope.paymentForm.quantity>20) response.quantity = $scope.paymentForm.quantity;
                   console.log(response)
                   siteFactory.startMembership(response).then(function(response){
                        console.log(response);
                    });
                }
                );
                }
           }
            $scope.$watchCollection('settings', function(newValue, oldValue) {
                console.log(newValue + "|" + oldValue);
                if (newValue != null && newValue != '' && newValue != oldValue) {
            $scope.$parent.$parent.settings = newValue;
                    siteFactory.saveSettings({
                        'settings': $scope.settings
                    }).then(function(response) {});
                }
            }, true);
            $scope.$watch('name', function(newValue, oldValue) {
                console.log(newValue + "|" + oldValue);
                if (newValue != null && newValue != '' && newValue != oldValue) {
             $scope.$parent.$parent.name = newValue;
                   siteFactory.saveSettings({
                        'name': $scope.name
                    }).then(function(response) {});
                }
            }, true);
            $scope.$watch('email', function(newValue, oldValue) {
                console.log(newValue + "|" + oldValue);
                if (newValue != null && newValue != '' && newValue != oldValue) {
                    siteFactory.saveSettings({
                        'email': $scope.email
                    }).then(function(response) {$scope.$parent.$parent.email = newValue;});
                }
            }, true);

        $scope.$watch('cssFile', function() {
            if ($scope.cssFile != null) {
                $scope.files = [$scope.cssFile];
                $scope.upload($scope.files);
            }
        });

        $scope.resetPassword = function(oldPw, newPw) {
            siteFactory.resetPassword({
                "old": oldPw,
                "new": newPw
            }).then(function(response) {

            });
        };

        $scope.upload = function(files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (!file.$error) {
                        Upload.upload({
                            url: '/api/settings/set',
                            data: {
                                settings: $scope.settings,
                                file: file
                            }
                        }).then(function(resp) {
                            console.log(resp);

                        });
                    }
                }
            }
        };

    }
])


.controller('PcCtrl', ['$scope', '$http', 
    function($scope, $http) {
    $scope.aMod = function(ability){
        if(ability == null) return '';
        var mod =  Math.floor((ability/2)-5);
        return mod>0? "+"+mod:mod;
        }

    }
])



.controller('MapCtrl', ['$scope', '$http', 'mapService', 'mapDatasource', '$timeout',
    function($scope, $http, mapService, mapDatasource, $timeout) {

    var map;
    var toggle = true;
    mapDatasource.getMaps({}).then(function(response) {
        console.log(response);
        mapDatasource.maps = response.data;
        console.log(mapDatasource);
    }, function(err) {});
        
        

        $scope.toggleTooltips = mapService.toggleTooltips;

        $scope.toggleMarkers = mapService.toggleMarkers;

    }
])




