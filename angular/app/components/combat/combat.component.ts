import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class CombatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}



.controller('combatCtrl', ['$scope', '$compile', '$rootScope', 'filterFilter', '$filter', '$http', 'monsterFactory', 'mainFactory', '$timeout', '$sce', 'soundsEditFactory', 'localStorageService',
    function($scope, $compile, $rootScope, filterFilter, $filter, $http, monsterFactory, mainFactory, $timeout, $sce, soundsFactory, localStorageService) {
        $scope.combatLog = '';
        $scope.status = {
            isopen: false
        };
        $scope.selectedRow = '';
        if (localStorageService.get('groups')) $scope.groups = localStorageService.get('groups');
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
                monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), $itemScope.combatant.name, "Str Save", "1d20+"+$itemScope.combatant.strSave, $scope);
            }],
            ['Dex', function ($itemScope) {
                monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), $itemScope.combatant.name, "Dex Save", "1d20+"+$itemScope.combatant.dexSave, $scope);
            }],
            ['Con', function ($itemScope) {
                monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), $itemScope.combatant.name, "Con Save", "1d20+"+$itemScope.combatant.conSave, $scope);
            }],
            ['Int', function ($itemScope) {
                monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), $itemScope.combatant.name, "Int Save", "1d20+"+$itemScope.combatant.intSave, $scope);
            }],
            ['Wis', function ($itemScope) {
                monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), $itemScope.combatant.name, "Wis Save", "1d20+"+$itemScope.combatant.wisSave, $scope);
            }],
            ['Cha', function ($itemScope) {
                monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), $itemScope.combatant.name, "Cha Save", "1d20+"+$itemScope.combatant.chaSave, $scope);
            }]
        ]
    ],
            ['Roll Save for All', function($itemScope) {
            },  [
            ['Str', function ($itemScope) {
                for (var i = 0; i < $scope.combatants.length; i++) {
                    var combatant = $scope.combatants[i];
                    if(typeof combatant.strSave=="undefined") continue;
                     monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), combatant.name, "Str Save", "1d20+"+combatant.strSave, $scope);
               }
            }],
            ['Dex', function ($itemScope) {
                for (var i = 0; i < $scope.combatants.length; i++) {
                    var combatant = $scope.combatants[i];
                    if(typeof combatant.dexSave=="undefined") continue;
                     monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), combatant.name, "Dex Save", "1d20+"+combatant.dexSave, $scope);
               }
            }],
            ['Con', function ($itemScope) {
                for (var i = 0; i < $scope.combatants.length; i++) {
                    var combatant = $scope.combatants[i];
                    if(typeof combatant.conSave=="undefined") continue;
                     monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), combatant.name, "Con Save", "1d20+"+combatant.conSave, $scope);
               }
            }],
            ['Int', function ($itemScope) {
                for (var i = 0; i < $scope.combatants.length; i++) {
                    var combatant = $scope.combatants[i];
                    if(typeof combatant.intSave=="undefined") continue;
                     monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), combatant.name, "Int Save", "1d20+"+combatant.intSave, $scope);
               }
            }],
            ['Wis', function ($itemScope) {
                for (var i = 0; i < $scope.combatants.length; i++) {
                    var combatant = $scope.combatants[i];
                    if(typeof combatant.wisSave=="undefined") continue;
                     monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), combatant.name, "Wis Save", "1d20+"+combatant.wisSave, $scope);
               }
            }],
            ['Cha', function ($itemScope) {
                for (var i = 0; i < $scope.combatants.length; i++) {
                    var combatant = $scope.combatants[i];
                    if(typeof combatant.chaSave=="undefined") continue;
                     monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), combatant.name, "Cha Save", "1d20+"+combatant.chaSave, $scope);
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

        $scope.diceBag = function(dicebag) {
            if (dicebag == '') return;
            monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), "Dice Bag", dicebag, dicebag, $scope);
        };

        $scope.preAction = function(scope) {
            console.log(scope);
            console.log( $scope.combatants[$scope.selectedRow]);
            if (typeof scope.subsubitem != "undefined") {
                scope.$parent.svisible = false;
                scope.$parent.$parent.visible = false;
                $scope.Ui.turnOff('combatantDropdown');
                $scope.combatants[$scope.selectedRow].catt = scope.subsubitem;
                $scope.combatants[$scope.selectedRow].casterLevel = scope.$parent.$parent.attack.cl
                $scope.combatants[$scope.selectedRow].subitem = scope.subitem;
                var objectData = {
                    "where": [{
                        "name": scope.subsubitem.name
                    }]
                };
                monsterFactory.getSpells(objectData).then(
                    function(response) {
                        $scope.combatants[$scope.selectedRow].spell = response.data;
                        $scope.combatants[$scope.selectedRow].spell.fulltext = $sce.trustAsHtml($scope.combatants[$scope.selectedRow].spell.fulltext);
                    },
                    function(err) {
                if(err.status == 401){console.log(15);$scope.Ui.turnOn('login');}
                        console.log(err);
                    });
            } else if (typeof scope.subitem != "undefined") {
                scope.$parent.visible = false;
                $scope.Ui.turnOff('combatantDropdown');
                $scope.combatants[$scope.selectedRow].catt = scope.subitem;
                console.log(scope.subitem);
            } else {
                $scope.Ui.turnOff('combatantDropdown');
                //scope.attack.submenu = null
                $scope.combatants[$scope.selectedRow].catt = scope.attack;
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
            console.log(mod);
            if (mod.type == "ma") {
                var attArr = mod.bonus.split(",");
                for (var i = 0; i < attArr.length; i++) {
                    $scope.combatants[$scope.selectedRow].attacks.find(function(element, index, array) {
                        if (element.name.substring(0, attArr[i].length) == attArr[i]) {
                            console.log(element);
                            $scope.Action(actor, element, adv);
                            return true;
                        }
                    });
                }
                return;
            }
            if (mod.type == "ca") {
                console.log($scope.combatants[$scope.selectedRow]);
                var damage = $scope.combatants[$scope.selectedRow].spell.damage;
                var attack = $scope.combatants[$scope.selectedRow].spell.attack;
                        console.log(damage);
                if (typeof damage == 'undefined') damage = '';
                if (typeof attack == 'undefined') attack = '';
                    else{
                        attack = attack.replace("melee", $scope.combatants[$scope.selectedRow].subitem.meleespell);
                        attack = attack.replace("ranged", $scope.combatants[$scope.selectedRow].subitem.rangedspell);
                        }
                if (damage.substring(0, 8) == '#summon#') {
                    var summon = damage.substring(8);
                    summon = summon.replace("#init#", 0);
                    summon = summon.replace("#meleespell#", $scope.combatants[$scope.selectedRow].subitem.meleespell);
                    summon = summon.replace("#rangedspell#", $scope.combatants[$scope.selectedRow].subitem.rangedspell);
                    summon = JSON.parse(summon);
                    console.log(summon);
                    $scope.addComb(summon);
                    $scope.combatants[$scope.combatants.length - 1].init = $scope.combatants[$scope.selectedRow].init;
                } else {
                    damage = damage.replace('{level}', $scope.combatants[$scope.selectedRow].casterLevel);
                    var preCalc = damage.match(/\{.*?\}/g);
                    if(preCalc == null) preCalc = [];
                    for (var i = 0; i < preCalc.length; i++) {
                        console.log(damage);
                        console.log(preCalc[i]);
                        console.log(eval(preCalc[i].slice(1, -1)));
                        damage = damage.replace(preCalc[i], Math.round(eval(preCalc[i].slice(1, -1))));
                    }
                    if ($scope.combatants[$scope.selectedRow].catt.num > 0) $scope.combatants[$scope.selectedRow].catt.num--;
                    else $scope.combatants[$scope.selectedRow].subitem.num--;
                    var combattxt = {
                        "name": mod.name,
                        "bonus": attack,
                        "damage": damage,
                        "special": $scope.combatants[$scope.selectedRow].spell.shorttext
                    };
                }
                monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), actor, combattxt, '', $scope, adv);
            } else monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), actor, mod, '', $scope, adv);
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
                        monsterFactory.diceBag(angular.element(document.querySelector('#combatLog')), com.name, com.pE[i].name, com.pE[i].effect+hpChange, $scope);
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
            console.log(monster);
            var tempmon = JSON.parse(JSON.stringify(monster));
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
                                                     d6:1d6+"+tempmon.str+" (ex: Shortsword, Mace, Spear)<br>\
                                                     d8:1d8+"+tempmon.str+" (ex: Katana, Quarterstaff, Scythe)<br>\
                                                    d10:1d10+"+tempmon.str+" (ex: Bastard Sword, Glaive)<br>\
                                                    d12:1d12+"+tempmon.str+" (ex: GreatAxe, GreatSword, Maul)<br>\
                                                    ","special":"Damage includes STR Bonus:"+tempmon.str
                                                    };
                }
                else if(typeof $scope.combatants[0].attacks[0].submenu == 'undefined'){
                    $scope.combatants[0].catt = $scope.combatants[0].attacks[0];
                    }
                    else{
                        $scope.combatants[0].catt = $scope.combatants[0].attacks[0].submenu[0];
                        }
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
