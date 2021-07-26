import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
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

