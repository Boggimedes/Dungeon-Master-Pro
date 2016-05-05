'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

.controller('SiteCtrl', ['$rootScope', '$route', '$filter', 'monsterDatasource', '$window', '$scope', 'soundsFactory', 'siteFactory', '$location',
    function($rootScope, $route, $filter, monsterDatasource, $window, $scope, soundsFactory, siteFactory, $location) {
        //$scope.css = 'dark';
        $scope.swiped = function(direction) {
            alert('Swiped ' + direction);
        };
        console.log($location);
        $scope.hgt = $window.innerHeight - 56;
        $scope.userAgent = navigator.userAgent;
        $scope.screenSlide = false;
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.loading = false;
            if(!$scope.loggedIn && $location.$$path != "/") $scope.Ui.turnOn('login');
        });

        $scope.sceneOptions = function(scene) {
            console.log($scope.sceneOpt = scene);
            $scope.Ui.turnOn('soundOptions');
        }

        $scope.slideScreen = function(test) {
            $scope.screenSlide = !$scope.screenSlide;
        }

        $scope.go = function(location) {
            console.log(location);
            $location.path(location)
        }
        $scope.notices = [];

        for (var j = 0; j < 10; j++) {
            $scope.notices.push({
                icon: 'envelope',
                message: 'Notice ' + (j + 1)
            });
        }

        $scope.deleteNotice = function(notice) {
            var index = $scope.notices.indexOf(notice);
            if (index > -1) {
                $scope.notices.splice(index, 1);
            }
        };

        if($location.$$path != "/"){
          siteFactory.getSettings().then(function(response) {
            console.log(response.data);
              $scope.loggedIn = response.data.loggedIn;
              $scope.settings = response.data.settings;
              $scope.name = response.data.name;
              $scope.email = response.data.email;
          }).catch(function(fallback) {
              $scope.Ui.turnOn('login');
          });
        }
        else $scope.hideMenu=true;
        console.log($scope.hideMenu)
        $scope.uiScrollMonsters = {
            remain: true
        };

        $scope.login = function(email, password) {
            siteFactory.login({
                "email": email,
                "password": password
            }).then(function(response) {
                $scope.Ui.turnOff('login');
                window.location.reload(); 

            }).catch(function(fallback) {
              $scope.Ui.turnOn('login');
              $route.reload();
            });
        };
        $scope.monsterFilter = function(nfilter, cfilter) {
            monsterDatasource.setFilter(nfilter, cfilter);
            // console.log($scope.uiScrollMonsters);
            // $scope.uiScrollMonsters.reload();
        };

        var orderBy = $filter('orderBy');

        $scope.mfilter = '';
        $rootScope.chkScene = soundsFactory.chkScene;

    }
])

.controller('SoundEditCtrl', ['$scope', '$interval', 'soundsEditFactory', 'soundsFactory', '$routeParams', '$filter',
    function($scope, $interval, soundsEditFactory, soundsFactory, $routeParams, $filter) {
        var stopTime = $interval(function() {}, 200);
        $scope.soundPlaying = [];
        $scope.soundEditInit = function() {
            soundsEditFactory.getEffects().then(function(response) {
                $scope.allEffects = response.data;
            }, function(err) {
                if(err.status == 401) $scope.Ui.turnOn('login');
                console.log(err);
            });
            var objectData = {
                "fields": "all"
            };
            soundsEditFactory.getScenes(objectData).then(function(response) {
                $scope.allScenes = response.data;
            }, function(err) {
                if(err.status == 401) $scope.Ui.turnOn('login');
                console.log(err);
            });
            soundsEditFactory.getCollections().then(function(response) {
                if (typeof response.data === 'object') response.data = [response.data];
                $scope.allCollections = response.data;
            }, function(err) {
                if(err.status == 401) $scope.Ui.turnOn('login');
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
            if ($scope.effect.id !== 'new') {
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
                    $scope.effect.preDelay = $scope.effect.preDelay ? true : false;
                    $scope.effect.optional = $scope.effect.optional ? true : false;
                    $scope.effect.seq = $scope.effect.seq ? true : false;
                }, function(err) {
                if(err.status == 401) $scope.Ui.turnOn('login');
                    console.log(err);
                });
                soundsEditFactory.getSounds().then(function(response) {
                    $scope.sounds = response.data;
                    $scope.activeSet = response.data;
                    console.log($scope.sounds);
                }, function(err) {
                 if(err.status == 401) $scope.Ui.turnOn('login');
                   console.log(err);
                });
            }
            $scope.setActive = function(item, key, depth) {
                console.log($scope.backPath);
                $scope.backPath = $scope.activeSet;
                if ($scope.pathDepth == 1 && depth == -1) {
                    item = $scope.sounds;
                }
                if (item.name) {
                    console.log(item.name);
                    console.log($scope.selectedSound);
                    $scope.Ui.turnOff("soundPicker")
                    $scope.effect.sounds[$scope.selectedSound].file = item.file;
                    $scope.effect.sounds[$scope.selectedSound].name = item.name;
                    return;
                }
                $scope.pathDepth = $scope.pathDepth + depth;
                if ($scope.pathDepth > 0 && key != "Music") $scope.pathIcon = "music";
                else $scope.pathIcon = "folder";
                $scope.activeSet = item;
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

        $scope.sceneInit = function() {
            $scope.sceneContent = {};
            $scope.sceneContent.id = $routeParams.id;
            $scope.heading = "Add a New Scene";
            $scope.sceneContent.effects = [];
            if ($scope.sceneContent.id !== 'new') {
                $scope.heading = "Update Scene";
                var objectData = {
                    "fields": "all",
                    "where": [{
                        "id": $scope.sceneContent.id
                    }]
                };
                soundsEditFactory.getScenes(objectData).then(function(response) {
                    $scope.sceneContent = response.data;
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
                if(err.status == 401) $scope.Ui.turnOn('login');
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
                if(err.status == 401) $scope.Ui.turnOn('login');
                    console.log(err);
                });
            }
        }

        $scope.collectionInit = function() {
            $scope.collectionContent = {};
            $scope.collectionContent.id = $routeParams.id;
            $scope.heading = "Add a New Collection";
            $scope.collectionContent.scenes = [];
            if ($scope.collectionContent.name !== 'new') {
                $scope.heading = "Update Collection";
                var objectData = {
                    "where": [{
                        "id": $scope.collectionContent.id
                    }]
                };
                soundsEditFactory.getCollections(objectData).then(function(response) {
                    $scope.collectionContent = response.data;
                }, function(err) {
                if(err.status == 401) $scope.Ui.turnOn('login');
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
                if(err.status == 401) $scope.Ui.turnOn('login');
                console.log(err);
            });
        }

        $scope.addSound = function() {
            $scope.effect.sounds.push({});
        };

        $scope.saveEffect = function() {
            $scope.effect.loop = $scope.effect.loop ? 1 : 0;
            $scope.effect.preDelay = $scope.effect.preDelay ? 1 : 0;
            $scope.effect.optional = $scope.effect.optional ? 1 : 0;
            $scope.effect.seq = $scope.effect.seq ? 1 : 0;
            soundsEditFactory.updateEffect($scope.effect).then(function() {
                $scope.go('edit');
                flashMessageService.setMessage("Effect Saved Successfully");
            }, function(err) {
                 if(err.status == 401) $scope.Ui.turnOn('login');
               console.log(err);
            });
        };

        $scope.saveCollection = function() {
            soundsEditFactory.updateCollection($scope.collectionContent).then(function(response) {
                $scope.go('edit');
                flashMessageService.setMessage("Collection Saved Successfully");
            }, function(err) {
                if(err.status == 401) $scope.Ui.turnOn('login');
                console.log(err);
            });
        };

        $scope.saveScene = function() {
            soundsEditFactory.updateScene($scope.sceneContent).then(function(response) {
                flashMessageService.setMessage("Scene Saved Successfully");
                $scope.go('edit');
            }, function(err) {
                if(err.status == 401) $scope.Ui.turnOn('login');
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

.controller('MonstersCtrl', ['$scope', '$log', 'monsterFactory', '$filter', '$timeout', '$routeParams',
    function($scope, $log, monsterFactory, $filter, $timeout, $routeParams) {


        $scope.tinymceOptions = {
            onChange: function(e) {},
            inline: false,
            plugins: 'advlist autolink link image lists charmap print preview code',
            skin: 'lightgray',
            menubar: false,
            statusbar: false,
            toolbar_items_size: 'small',
            forced_root_block: "",
            toolbar: 'undo redo | bold italic | link | bullist numlist | code'
        };

        $scope.tinymceOptionsWithButton = {
            onChange: function(e) {},
            inline: false,
            plugins: 'advlist autolink link image lists charmap print preview code',
            skin: 'lightgray',
            menubar: false,
            statusbar: false,
            toolbar_items_size: 'small',
            forced_root_block: "",
            toolbar: 'undo redo | bold italic | link | bullist numlist | code | collapseButton'
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
                    $scope.heading = "Update Monster";
                    $scope.currentMonster = response.data;

                    // $log.info($scope.effect);
                },
                function(err) {
                    console.log(err);
                });
        }
        $scope.loadMonster = function(monster) {
            $scope.currentMonster = monster;
            $scope.go('editMonsters/' + $scope.currentMonster.id);
        }
        $scope.newMonster = function() {
            $scope.currentMonster = [];
        }
        $scope.saveMonster = function() {
            monsterFactory.updateMonster($scope.currentMonster).then(
                function(response) {
                    console.log(response.data);
                    return success(response.data);
                },
                function(err) {
                    console.log(err);
                });
        }
        $scope.addSpell = function(spell, subitem) {
            subitem.submenu.push(spell);
            $scope.spell = [];
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
            if (typeof attack.submenu == 'undefined') {
                attack.submenu = [];
            }
            attack.submenu.push({
                "name": '',
                "bonus": '',
                "type": 'ma'
            });

        }



    }
])

.controller('combatCtrl', ['$scope', '$compile', '$rootScope', 'filterFilter', '$filter', '$http', 'monsterFactory', 'mainFactory', '$timeout', '$sce', 'localStorageService', 'soundsEditFactory',
    function($scope, $compile, $rootScope, filterFilter, $filter, $http, monsterFactory, mainFactory, $timeout, $sce, localStorageService, soundsFactory) {
        $scope.combatLog = '';
        $scope.status = {
            isopen: false
        };
        $scope.selectedRow = '';
        $scope.groups = [];
        $scope.groups.push({
            "name": "The Party",
            "group": [{
                "name": "Savannah",
                "turn": 0
            }, {
                "name": "Jason",
                "turn": 0
            }, {
                "name": "Alex",
                "turn": 0
            }, {
                "name": "Sarah",
                "turn": 0
            }]
        });
        $scope.recentMonsters = [];
        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };
        if (localStorageService.get('combatants')) $scope.combatants = localStorageService.get('combatants');
        else $scope.combatants = [{
            "name": "Savannah",
            "turn": 0
        }, {
            "name": "Jason",
            "turn": 0
        }, {
            "name": "Alex",
            "turn": 0
        }, {
            "name": "Sarah",
            "turn": 0
        }];

        $scope.$watch('combatants', function() {
            localStorageService.set('combatants', $scope.combatants);
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


        $scope.contextClass = "hp-options";

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
                if(err.status == 401) $scope.Ui.turnOn('login');
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
                if (typeof damage == 'undefined') damage = '';
                if (typeof attack == 'undefined') attack = '';
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
            $scope.combatants = $scope.combatants.slice(0, 0).concat(group).concat($scope.combatants.slice(0));
            $scope.order();
        };

        $rootScope.loadMonster = function(monster) {
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
            $scope.combatants[$scope.combatants.length] = tempmon;
            $scope.combatants[$scope.combatants.length - 1]['name'] = tempmon.name + count;
            count = $scope.combatants.length - 1;
            $scope.combatants[count]['hp'] = eval(monsterFactory.rollDice(tempmon.hp));
            tempmon.initiative = tempmon.initiative > 0 ? '1d20' + tempmon.initiative : '1d20-' + tempmon.initiative;
            $scope.combatants[count]['init'] = eval(monsterFactory.rollDice(tempmon.initiative));
            $scope.combatants[count]['turn'] = $scope.currentTurn;
            $scope.combatants[count]['ac'] = eval(monsterFactory.rollDice(tempmon.ac));
        };

        $scope.setClickedRow = function(index) {
            $scope.selectedRow = index;
            $scope.senses = $sce.trustAsHtml($scope.combatants[index].senses);
            $scope.special = $sce.trustAsHtml($scope.combatants[index].special);
        }
    }
])

.controller('SoundCtrl', ['$scope', '$interval', '$timeout', '$http', 'soundsFactory', 'soundsEditFactory',
    function($scope, $interval, $timeout, $http, soundsFactory, soundsEditFactory) {

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

        var objectData = {
            "fields": "all"
        };

        soundsFactory.getScenes(objectData).then(
            function(response) {
                $scope.allScenes = response.data;
                soundsFactory.scenes = response.data;
                console.log(soundsFactory);
            },
            function(err) {
                if(err.status == 401) $scope.Ui.turnOn('login');
                console.log(err);
            });
        $scope.toggleScene = function(scene) {
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
                if(err.status == 401) $scope.Ui.turnOn('login');
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
                if(err.status == 401) $scope.Ui.turnOn('login');
                    console.log(err);
                });
        }
        $scope.loadSpell = function(spell) {
            console.log(spell);
            $scope.go('editSpells/' + spell.id);

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
                if(err.status == 401) $scope.Ui.turnOn('login');
                    console.log(err);
                });


        }
        $scope.saveScene = function() {
            spellFactory.updateScene($scope.sceneContent).then(
                function() {
                    //flashMessageService.setMessage("Page Saved Successfully");
                    $scope.go('edit');
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
                    console.log($scope.regions);
                },
                function(err) {
                if(err.status == 401) $scope.Ui.turnOn('login');
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

            $scope.profCol = [{data: 'name', title: 'Profession'}, 
                              {data: 'minAge', title: 'Minimum Age Group'}, 
                              {data: 'maxAge', title: 'Maximum Age Group'}];
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
                 if(err.status == 401) $scope.Ui.turnOn('login');
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
                if(err.status == 401) $scope.Ui.turnOn('login');
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
                if(err.status == 401) $scope.Ui.turnOn('login');
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
                if(err.status == 401) $scope.Ui.turnOn('login');
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
                if(err.status == 401) $scope.Ui.turnOn('login');
                    console.log(err);
                });
        };

        $scope.settings = {
            height: 200,
            stretchH: 'all',
            colHeaders: true,
            rowHeaders: false,
            minSpareRows: 1
        };

    }
])

.controller('NpcCtrl', ['$rootScope', '$filter', '$scope', 'citizenFactory', '$routeParams',
    function($rootScope, $filter, $scope, citizenFactory, $routeParams) {

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
                if(err.status == 401) $scope.Ui.turnOn('login');
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
            },
            function(err) {
                if(err.status == 401) $scope.Ui.turnOn('login');
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
                if(err.status == 401) $scope.Ui.turnOn('login');
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
                if(err.status == 401) $scope.Ui.turnOn('login');
                    console.log(err);
                });
        };

        $scope.citizenInfo = function(citizen) {
            if (typeof $scope.citizens == "undefined" || typeof citizen == "undefined") return;
            citizen = $scope.citizens.all[citizen];
            return (citizen.alive == "1" ? 'Alive' : 'Dead') + "\nRace: " + citizen.race.name + "\nAge: " + citizen.age;
        }


        $scope.setRegion = function(region){
          $scope.currentRegion = region;
          $scope.citizens = {};
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
                  }
              },
              function(err) {
                if(err.status == 401) $scope.Ui.turnOn('login');
                  console.log(err);
              });
          };

        $scope.setRegion({"id":$scope.region});
    }
])

.controller('SettingsCtrl', ['$scope', '$rootScope', 'Upload', 'siteFactory',
    function($scope, $rootScope, Upload, siteFactory) {
            
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

.controller('ImageGetCtrl', ['$scope', '$http', 
    function($scope, $http) {
            
$http.get('http://res.cloudinary.com/bwa-designs/video/list/synth.json').then(function(response){
    $scope.resources = response.data.resources;
    console.log(response.data);
});

    }
])