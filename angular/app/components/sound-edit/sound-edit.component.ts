import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sound-edit',
  templateUrl: './sound-edit.component.html',
  styleUrls: ['./sound-edit.component.scss']
})
export class SoundEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


// .controller('SoundEditCtrl', ['$scope', '$timeout', '$interval', 'soundsDatasource', 'soundsEditFactory', 'soundsFactory', '$routeParams', '$filter', 'angularPlayer', 'Upload',
//     function($scope, $timeout, $interval, soundsDatasource, soundsEditFactory, soundsFactory, $routeParams, $filter, angularPlayer, Upload) {
//         var stopTime = $interval(function() {}, 200);
//         $scope.soundPlaying = [];
//         $scope.soundEditInit = function() {
//             soundsEditFactory.getEffects().then(function(response) {
//                 $scope.allEffects = response.data;
//             }, function(err) {
//                 if(err.status == 401){console.log(3);$scope.Ui.turnOn('login');}
//                 console.log(err);
//             });
//             var objectData = {
//                 "fields": "all"
//             };
//             soundsEditFactory.getScenes(objectData).then(function(response) {
//                 $scope.allScenes = response.data;
//             }, function(err) {
//                 if(err.status == 401){console.log(4);$scope.Ui.turnOn('login');}
//                 console.log(err);
//             });
//             soundsEditFactory.getCollections().then(function(response) {
//                 $scope.allCollections = response.data;
//             }, function(err) {
//                 if(err.status == 401){console.log(5);$scope.Ui.turnOn('login');}
//                 console.log(err);
//             });
//         };

//         function getRandomInt(min, max) {
//             return Math.floor(Math.random() * (max - min + 1)) + min;
//         }

//         function mixToMono(buffer) {
//             if (buffer.numberOfChannels == 2) {
//                 var pL = buffer.getChannelData(0);
//                 var pR = buffer.getChannelData(1);
//                 var length = buffer.length;

//                 for (var i = 0; i < length; ++i) {
//                     var mono = 0.5 * (pL[i] + pR[i]);
//                     pL[i] = mono;
//                     pR[i] = mono;
//                 }
//             }
//         }
//         $scope.effectInit = function() {
//             $scope.effect = {};
//             $scope.pathDepth = 0;
//             $scope.pathIcon = "folder";
//             $scope.effect.id = $routeParams.id;
//             $scope.heading = "Add a New Effect";
//             $scope.effect.sounds = [{}];
//             if ($scope.effect.id != 'new') {
//                 $scope.heading = "Update Effect";
//                 var objectData = {
//                     "where": [{
//                         "id": $scope.effect.id
//                     }]
//                 };
//                 soundsEditFactory.getEffects(objectData).then(function(response) {
//                     $scope.effect = response.data;
//                     if ($scope.effect.sounds == null) {
//                         $scope.effect.sounds = [];
//                     }
//                     $scope.effect.loop = $scope.effect.loop ? true : false;
//                     $scope.effect.optional = $scope.effect.optional ? true : false;
//                     $scope.effect.seq = $scope.effect.seq ? true : false;
//                 }, function(err) {
//                 if(err.status == 401){console.log(6);$scope.Ui.turnOn('login');}
//                     console.log(err);
//                 });
//                 soundsEditFactory.getSounds().then(function(response) {
//                     $scope.fx = response.data.sounds.fx;
//                     $scope.ambience = response.data.sounds.ambience;
//                     $scope.music = response.data.sounds.music;
//                     $scope.tags = response.data.tags;
//                     console.log($scope.sounds);
//                 }, function(err) {
//                 if(err.status == 401){console.log(7);$scope.Ui.turnOn('login');}
//                    console.log(err);
//                 });
//             }
//             $scope.soundsFilter = function(nfilter, tfilter) {
//                 soundsDatasource.setFilter(nfilter, tfilter);
//                 // console.log($scope.uiScrollMonsters);
//                 // $scope.uiScrollMonsters.reload();
//             };
//             $scope.hoverRow=0;
//             $scope.setRange = function(index){$scope.hoverRow=index;}
//             $scope.loadSound = function(item) {
//                     console.log(item.name);
//                     console.log($scope.selectedSound);
//                     $scope.Ui.turnOff("soundPicker")
//                     $scope.effect.sounds[$scope.selectedSound].file = item.category+'/'+item.file;
//                     $scope.effect.sounds[$scope.selectedSound].name = item.name;
//             }
//             $scope.stepsArray = [];
//             for (var i = -60; i < 2400; i++) {
//                 if (i <= 120) $scope.stepsArray.push(i);
//                 if (i > 120 && i <= 480) $scope.stepsArray.push(++i);
//                 if (i > 480 && i <= 600) {
//                     i = i + 4;
//                     $scope.stepsArray.push(i);
//                 }
//                 if (i > 600 && i <= 1200) {
//                     i = i + 9;
//                     $scope.stepsArray.push(i);
//                 }
//                 if (i > 1200 && i <= 2400) {
//                     i = i + 59;
//                     $scope.stepsArray.push(i);
//                 }
//             }

//             Object.defineProperty($scope, "delayL", {
//                 get: function() {
//                     return $scope.stepsArray.indexOf($scope.effect.delayL);
//                 },
//                 set: function(value) {
//                     $scope.effect.delayL = $scope.stepsArray[value];
//                 }
//             });

//             Object.defineProperty($scope, "delayH", {
//                 get: function() {
//                     return $scope.stepsArray.indexOf($scope.effect.delayH);
//                 },
//                 set: function(value) {
//                     $scope.effect.delayH = $scope.stepsArray[value];
//                 }
//             });

//             Object.defineProperty($scope, "preDelay", {
//                 get: function() {
//                     return $scope.stepsArray.indexOf($scope.effect.preDelay)-60;
//                 },
//                 set: function(value) {
//                     $scope.effect.preDelay = $scope.stepsArray[value+60];
//                 }
//             });
//             $scope.slider = {
//                 "options": {
//                     "delay": {
//                         showSelectionBar: true,
//                         stepsArray: $scope.stepsArray,
//                         noSwitching: true
//                     },
//                     "preDelay": {
//                         showSelectionBar: true,
//                         stepsArray: $scope.stepsArray.slice(60)
//                     },
//                     "chance": {
//                         showSelectionBar: true,
//                         floor: 1,
//                         ceil: 100,
//                         step: 1,
//                         disabled: $scope.effect.seq
//                     },
//                     "percent": {
//                         showSelectionBar: true,
//                         floor: 1,
//                         ceil: 100,
//                         step: 1
//                     },
//                     "pitchVar": {
//                         showSelectionBar: true,
//                         floor: 0,
//                         ceil: 200,
//                         step: 1
//                     },
//                     "pitchSet": {
//                         showSelectionBar: true,
//                         floor: -600,
//                         ceil: 600,
//                         step: 1
//                     }
//                 }
//             };
//         };
//         $scope.uiScrollSounds = {
//             remain: true
//         };

//          $scope.$on('currentTrack:duration', function(event, data) {
//     //do your stuff here
//         $scope.soundDuration = data;
//     });
//         $scope.$on('currentTrack:position', function(event, data) {
//     //do your stuff here
//         $scope.soundPosition = data;
//     });
//         var playTime;
//                    console.log(angularPlayer);
//                    console.log(angularPlayer.repeatToggle());
//         $scope.hoverPlay = function(track,index){

//                    console.log(angularPlayer.isPlayingStatus());
//                    console.log(angularPlayer.getRepeatStatus());
//             if(angularPlayer.isPlayingStatus()) return;
//             $scope.hoverIndex = index;
//             track = {
//                         "id":'one',
//                         "title":track.name,
//                         "artist":'',
//                         "url":"/sounds/"+track.category+"/"+track.file
//                     };
//            playTime = $timeout(function(){ console.log("hoverplay"); angularPlayer.addTrack(track);
//             angularPlayer.playTrack(track.id); },500);
//         }

//         $scope.hoverStop = function(){
//              $timeout.cancel(playTime);
//             $timeout(function(){ console.log("hoverstop"); angularPlayer.stop();angularPlayer.clearPlaylist(function(){});});
//         }

//         $scope.tagFilter = function(tag){$scope.fxFilter.tags = tag;}
//         $scope.sceneInit = function() {
//             $scope.sceneContent = {};
//             $scope.sceneContent.id = $routeParams.id;
//             $scope.heading = "Add a New Scene";
//             $scope.sceneContent.effects = [];
//             if ($scope.sceneContent.id != 'new') {
//                 $scope.heading = "Update Scene";
//                 var objectData = {
//                     "fields": "all",
//                     "where": [{
//                         "id": $scope.sceneContent.id
//                     }]
//                 };
//                 soundsEditFactory.getScenes(objectData).then(function(response) {
//                     $scope.sceneContent = response.data[0];
//                     soundsEditFactory.getEffects().then(function(response) {
//                         $scope.allEffects = response.data;
//                         $scope.effectIDs = [];
//                         $scope.sceneContent.effects.forEach(function(effect) {
//                             $scope.effectIDs.push(effect.id);
//                         });
//                         $scope.allEffects = $scope.allEffects.filter(function(effect) {
//                             if ($scope.effectIDs.indexOf(effect.id) != -1) return false;
//                             return true;
//                         });
//                     }, function(err) {
//                         console.log(err);
//                     });
//                 }, function(err) {
//                 if(err.status == 401){console.log(8);$scope.Ui.turnOn('login');}
//                     console.log(err);
//                 });
//             } else {
//                 soundsEditFactory.getEffects().then(function(response) {
//                     $scope.allEffects = response.data;
//                     $scope.effectIDs = [];
//                     $scope.sceneContent.effects.forEach(function(effect) {
//                         $scope.effectIDs.push(effect.id);
//                     });
//                 }, function(err) {
//                 if(err.status == 401){console.log(9);$scope.Ui.turnOn('login');}
//                     console.log(err);
//                 });
//             }
//         }

//         $scope.collectionInit = function() {
//             $scope.collectionContent = {};
//             $scope.collectionContent.id = $routeParams.id;
//             $scope.heading = "Add a New Collection";
//             $scope.collectionContent.scenes = [];
//             console.log($routeParams.id);
//             if ($scope.collectionContent.id != 'new') {
//                 $scope.heading = "Update Collection";
//                 var objectData = {
//                     "where": [{
//                         "id": $scope.collectionContent.id
//                     }]
//                 };
//                 soundsEditFactory.getCollection(objectData).then(function(response) {
//                     $scope.collectionContent = response.data;
//                 }, function(err) {
//                 if(err.status == 401){console.log(10);$scope.Ui.turnOn('login');}
//                     console.log(err);
//                 });
//             }

//             soundsEditFactory.getScenes().then(function(response) {
//                 $scope.allScenes = response.data;
//                 $scope.scenesArray = [];
//                 $scope.sceneIDs = [];
//                 $scope.allScenes.forEach(function(scene) {
//                     $scope.scenesArray[scene.id] = scene;
//                     $scope.sceneIDs.push(scene.id);
//                 });
//             }, function(err) {
//                 if(err.status == 401){console.log(11);$scope.Ui.turnOn('login');}
//                 console.log(err);
//             });
//         }

//         $scope.addSound = function() {
//             $scope.effect.sounds.push({});
//         };

//         $scope.saveEffect = function() {
//             $scope.effect.loop = $scope.effect.loop ? 1 : 0;
//             $scope.effect.optional = $scope.effect.optional ? 1 : 0;
//             $scope.effect.seq = $scope.effect.seq ? 1 : 0;
//             soundsEditFactory.updateEffect($scope.effect).then(function() {
//                 //$scope.go('edit');
//                 flashMessageService.setMessage("Effect Saved Successfully");
//             }, function(err) {
//                 if(err.status == 401){console.log(12);$scope.Ui.turnOn('login');}
//                console.log(err);
//             });
//         };

//         $scope.saveCollection = function() {
//             soundsEditFactory.updateCollection($scope.collectionContent).then(function(response) {
//                 //$scope.go('edit');
//                 flashMessageService.setMessage("Collection Saved Successfully");
//             }, function(err) {
//                 if(err.status == 401){console.log(13);$scope.Ui.turnOn('login');}
//                 console.log(err);
//             });
//         };

//         $scope.saveScene = function() {
//             if($scope.sceneContent.img.substring(0,10)=="data:image"){
//                 $scope.sceneContent.file = Upload.dataUrltoBlob($scope.sceneContent.img, $scope.picFile.name);
//                         Upload.upload({
//                             url: '/api/sound/scene/update',
//                             data: $scope.sceneContent
//                         }).then(function(resp) {
//                             console.log(resp);

//                         });
//                         return;

//             }
//             soundsEditFactory.updateScene($scope.sceneContent).then(function(response) {
//                 flashMessageService.setMessage("Scene Saved Successfully");
//                 //$scope.go('edit');
//             }, function(err) {
//                 if(err.status == 401){console.log(14);$scope.Ui.turnOn('login');}
//                 console.log(err);
//             });
//         };

//         $scope.deleteCollection = function(id, index) {
//             $scope.allCollections.splice(index, 1);
//             id = {
//                 "field": "id",
//                 "value": id
//             };
//             soundsEditFactory.deleteCollection(id);
//         };

//         $scope.deleteEffect = function(id, index) {
//             $scope.allEffects.splice(index, 1);
//             id = {
//                 "field": "id",
//                 "value": id
//             };
//             soundsEditFactory.deleteEffect(id);
//         };

//         $scope.deleteScene = function(id, index) {
//             $scope.allScenes.splice(index, 1);
//             id = {
//                 "field": "id",
//                 "value": id
//             };
//             soundsEditFactory.deleteScene(id);
//         };



//         $scope.playSound = function(sound, effect) {

//             $scope.soundPlaying[sound.name] = !$scope.soundPlaying[sound.name];

//             var soundObject = {
//                 "name": sound.name,
//                 "desc": sound.name,
//                 "vol": 100,
//                 "fadeIn": sound.fadeIn,
//                 "fadeOut": sound.fadeOut,
//                 "effects": [{
//                     "name": sound.name,
//                     "desc": sound.name,
//                     "sounds": [sound],
//                     "vol": effect.vol,
//                     "preDelay": 0,
//                     "loop": effect.loop,
//                     "delayL": 0,
//                     "delayH": 0,
//                     "optional": 0,
//                     "seq": 0
//                 }]
//             };

//             soundsFactory.toggleScene(soundObject);

//         };

//         $scope.playEffect = function(effect) {
//             $scope.effectPlaying = !$scope.effectPlaying;
//             var effectObject = {
//                 "name": effect.name,
//                 "desc": effect.name,
//                 "vol": 100,
//                 "fadeIn": 0,
//                 "fadeOut": 0,
//                 "effects": [effect]
//             };

//             soundsFactory.toggleScene(effectObject);

//         };


//     }
// ])
