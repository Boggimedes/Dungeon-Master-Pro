import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss']
})
export class SoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

.controller('SoundCtrl', ['$scope', '$interval', '$timeout', '$http', 'soundsFactory', 'soundsEditFactory', 'localStorageService',
    function($scope, $interval, $timeout, $http, soundsFactory, soundsEditFactory, localStorageService) {

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

