import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss']
})
export class SpellsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}



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
