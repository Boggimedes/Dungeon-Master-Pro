import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.scss']
})
export class MonstersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

// .controller('MonstersCtrl', ['$scope', '$log', 'monsterFactory', '$filter', '$timeout', '$routeParams', 'Upload', '$sce',
//     function($scope, $log, monsterFactory, $filter, $timeout, $routeParams, Upload, $sce) {


//         $scope.tinymceOptions = {
//             inline: false,
//             plugins: 'advlist autolink link lists code',
//             skin: 'lightgray',
//             menubar: false,
//             statusbar: false,
//             toolbar_items_size: 'small',
//             forced_root_block: "",
//             toolbar: 'bold italic | link | bullist numlist | code'
//         };

//         $scope.tinymceOptionsWithButton = {
//             inline: false,
//             plugins: 'advlist autolink link lists code',
//             skin: 'lightgray',
//             menubar: false,
//             statusbar: false,
//             toolbar_items_size: 'small',
//             forced_root_block: "",
//             toolbar: 'bold italic | bullist | code | collapseButton'
//         };
//         $scope.trust = function(snippet) {
//           return $sce.trustAsHtml(snippet);
//         };  
//         $scope.heading = "Add a new Monster";
//         if ($routeParams.id !== 'new') {
//             $scope.heading = "Update Monster";
//             var objectData = {
//                 "where": [{
//                     "id": $routeParams.id
//                 }]
//             };
//             monsterFactory.getMonsters(objectData).then(
//                 function(response) {

//                     if(response.data.length==0) {
//                         $scope.go("/edit/monster/new");
//                         return;
//                     }
//                     $scope.heading = "Update Monster";
//                     response.data.img = response.data.img.replace("{id}",response.data.id);
//                     $scope.currentMonster = response.data;
//                     console.log(response);

//                     // $log.info($scope.effect);
//                 },
//                 function(err) {
//                     console.log(err);
//                 });
//         }
//         else{
//             $scope.currentMonster = {};
//             $scope.currentMonster.img = "";
//             $scope.currentMonster.skills = [];
//             $scope.currentMonster.attacks = [];

//         }
//         $scope.loadMonster = function(monster) {
//             $scope.currentMonster = monster;
//             $scope.go('edit/monster/' + $scope.currentMonster.id,false);
//         }
//         $scope.newMonster = function() {
//             $scope.currentMonster = [];
//         }
//         $scope.saveMonster = function() {
//             if($scope.currentMonster.img.substring(0,10)=="data:image"){
//                 $scope.currentMonster.file = Upload.dataUrltoBlob($scope.currentMonster.img, $scope.picFile.name);
//                         Upload.upload({
//                             url: '/api/monster/update',
//                             data: $scope.currentMonster
//                         }).then(function(resp) {
//                             console.log(resp);

//                         });
//                         return;

//             }
//             monsterFactory.updateMonster($scope.currentMonster).then(
//                 function(response) {
//                     console.log(response.data);
//                     if(response.data!=$scope.currentMonster.id && response.data!=0) $scope.go("/edit/monster/"+response.data,false);
//                 },
//                 function(err) {
//                     console.log(err);
//                 });
//         }
//         $scope.addSpell = function(spell, subitem) {
//             console.log(subitem);
//             if (typeof subitem.submenu == 'undefined') {
//                 subitem.submenu = [];
//              console.log(subitem);
//            }
//            console.log(spell);
//             subitem.submenu.push({"name":spell.name,"type":"ca","num":spell.num});
//         }
//         $scope.addSkill = function() {
//             $scope.currentMonster.skills.push({
//                 "name": "",
//                 "bonus": ""
//             });
//         };

//         $scope.addAttack = function() {
//             console.log("Test");
//             $scope.currentMonster.attacks.push({
//                 "name": "",
//                 "bonus": "",
//                 "damage": "",
//                 "special": ""
//             });
//         };

//         $scope.addLA = function() {
//             console.log("Test");
//             $scope.currentMonster.legendaryActions.push({
//                 "name": "",
//                 "bonus": "",
//                 "damage": "",
//                 "special": ""
//             });
//         };

//         $scope.deleteMonster = function(id) {
//             monsterFactory.deleteMonster(id);

//         };
//         var orderBy = $filter('orderBy');
//         $scope.mfilter = '';


//         $scope.addMulti = function(attack) {
//             console.log(attack);
//             if (typeof attack.submenu == 'undefined') {
//                 attack.submenu = [];
//              console.log(attack);
//            }
//             attack.submenu.push({
//                 "name": '',
//                 "bonus": '',
//                 "type": 'ma'
//             });

//         }
//         $scope.$watch('cssFile', function() {
//             if ($scope.cssFile != null) {
//                 $scope.files = [$scope.cssFile];
//                 $scope.upload($scope.files);
//             }
//         });


//         $scope.upload = function(files) {
//             if (files && files.length) {
//                 for (var i = 0; i < files.length; i++) {
//                     var file = files[i];
//                     if (!file.$error) {
//                         Upload.upload({
//                             url: '/api/monster/update',
//                             data: {
//                                 settings: $scope.settings,
//                                 file: Upload.dataUrltoBlob(dataUrl, name)
//                             }
//                         }).then(function(resp) {
//                             console.log(resp);

//                         });
//                     }
//                 }
//             }
//         };
//             $scope.upload = function (dataUrl, name) {
//         Upload.upload({
//             url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
//             data: {
//                 file: Upload.dataUrltoBlob(dataUrl, name)
//             },
//         }).then(function (response) {
//             $timeout(function () {
//                 $scope.result = response.data;
//             });
//         }, function (response) {
//             if (response.status > 0) $scope.errorMsg = response.status 
//                 + ': ' + response.data;
//         }, function (evt) {
//             $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
//         });
//     }



//     }
// ])
