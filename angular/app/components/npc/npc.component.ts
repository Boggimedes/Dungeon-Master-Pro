import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
.controller('NpcCtrl', ['$rootScope', '$filter', '$scope', 'citizenFactory', '$routeParams', 'localStorageService',
    function($rootScope, $filter, $scope, citizenFactory, $routeParams, localStorageService) {

        var orderBy = $filter('orderBy');


        $scope.region = $routeParams.region;
        $scope.selectedCitizen = null;
        $scope.selectedRow = []; // initialize our variable to null
        $scope.setClickedRow = function(index, table, citizen) { //function that sets the value of selectedRow to current index
            $scope.selectedRow = []; //reset all tables
            $scope.selectedRow[table] = index; //set selected row
            var objectData = {
                "region": $scope.region,
                "where": [{
                    "id": citizen
                }]
            };
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

        citizenFactory.getWorld().then(
            function(response) {
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
                    if ($scope.bodyLock != true) $scope.selectedCitizen.features['Body Type'] = response.data['Body Type'];
                    if ($scope.bodyLock != true) $scope.selectedCitizen.features['Body Description'] = response.data['Body Description'];
                    if ($scope.clothingLock != true) $scope.selectedCitizen.features['Clothing'] = response.data['Clothing'];
                    if ($scope.eyeCLock != true) $scope.selectedCitizen.features['Eye Color'] = response.data['Eye Color'];
                    if ($scope.eyeDLock != true) $scope.selectedCitizen.features['Eye Description'] = response.data['Eye Description'];
                    if ($scope.faceLock != true) $scope.selectedCitizen.features['Face Shape'] = response.data['Face Shape'];
                    if ($scope.hairCLock != true) $scope.selectedCitizen.features['Hair Color'] = response.data['Hair Color'];
                    if ($scope.hairDLock != true) $scope.selectedCitizen.features['Hair Description'] = response.data['Hair Description'];
                    if ($scope.skinCLock != true) $scope.selectedCitizen.features['Skin Color'] = response.data['Skin Color'];
                    if ($scope.skinDLock != true) $scope.selectedCitizen.features['Skin Complexion'] = response.data['Skin Complexion'];
                    if ($scope.specialLock != true) $scope.selectedCitizen.features['Special'] = response.data['Special'];
                    if ($scope.lineageLock != true) $scope.selectedCitizen.lineage = response.data['Lineage'];
                    if ($scope.mannerLock != true) $scope.selectedCitizen.mannerisms = response.data['Manner'];
                    if ($scope.quirkLock != true) $scope.selectedCitizen.quirks = response.data['Quirk'];
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
            return (citizen.alive == "1" ? 'Alive' : 'Dead') + "\nRace: " + citizen.race.name + "\nAge: " + citizen.age;
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
