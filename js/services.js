'use strict';
angular.module('myApp.services', [])

.factory('mainFactory', ['$http',
    function($http) {

        return {
            setShowFile: function(pageData) {
                console.log(pageData);
                return $http.post('/api/main/setshowfile', pageData);
            }
        };
    }
])

.factory('monsterDatasource', ['$timeout', '$http',
    function($timeout, $http) {
        var nf = '';
        var cf = '';
        return {
            setFilter: function(nfilter, cfilter) {
                nf = nfilter;
                cf = cfilter;
            },
            getUiScrollMonsters: function(pageData) {
                pageData = {
                    "descriptor": pageData
                };
                return $http.post('/api/monster/getui', pageData);
            },
            get: function(descriptor, success) {
                var that = this;
                console.log(descriptor);
                return $timeout(function() {
                    var count, i, index, j, ref, ref1, result, min, max;
                    index = descriptor.index;
                    count = descriptor.count;
                    descriptor.cFilter = cf;
                    descriptor.nFilter = nf;
                    that.getUiScrollMonsters(descriptor).then(function(response) {
                        return success(response.data);
                    }, function(err) {});
                }, 100);
            }
        };
    }
])

.factory('soundsDatasource', ['$timeout', '$http',
    function($timeout, $http) {
        var nf = '';
        var tf = '';
        return {
            setFilter: function(nfilter, tfilter) {
                nf = nfilter;
                tf = tfilter;
            },
            getUiScrollSounds: function(pageData) {
                pageData = {
                    "descriptor": pageData
                };
                return $http.post('/api/sound/sounds/getui', pageData);
            },
            get: function(descriptor, success) {
                var that = this;
                console.log(this);
                return $timeout(function() {
                    var count, i, index, j, ref, ref1, result, min, max;
                    index = descriptor.index;
                    count = descriptor.count;
                    descriptor.nFilter = nf;
                    descriptor.tFilter = tf;
                    that.getUiScrollSounds(descriptor).then(function(response) {
                        return success(response.data);
                    }, function(err) {});
                }, 100);
            }
        };
    }
])

.factory('spellFactory', ['$http',
    function($http) {

        return {
            getSpells: function(pageData) {
                return $http.post('/api/spell/getspells', pageData);
            },
            getSpellBasics: function(pageData) {
                return $http.post('/api/spell/getspellbasics', pageData);
            },
            updateSpell: function(pageData) {
                return $http.post('/api/spell/update', pageData);
            },
            addSpell: function(pageData) {
                return $http.post('/api/spell/add', pageData);
            },
            deleteSpell: function(pageData) {
                return $http.post('/api/spell/delete', pageData);
            }
        };
    }
])

.factory('soundsEditFactory', ['$http',
    function($http) {
        var scenes = {};
        return {
            getSounds: function() {
                return $http.post('/api/sound/sounds/get');
            },
            getScenes: function(pageData) {
                return $http.post('/api/sound/scene/get', pageData);
            },
            updateScene: function(pageData) {
                return $http.post('/api/sound/scene/update', pageData);
            },
            addScene: function(pageData) {
                return $http.post('/api/sound/scene/add', pageData);
            },
            deleteScene: function(pageData) {
                return $http.post('/api/sound/scene/delete', pageData);
            },
            getEffects: function(pageData) {
                return $http.post('/api/sound/effect/get', pageData);
            },
            updateEffect: function(pageData) {
                return $http.post('/api/sound/effect/update', pageData);
            },
            addEffect: function(pageData) {
                return $http.post('/api/sound/effect/add', pageData);
            },
            deleteEffect: function(pageData) {
                return $http.post('/api/sound/effect/delete', pageData);
            },
            getCollections: function(pageData) {
                return $http.post('/api/sound/collection/get', pageData);
            },
            getCollection: function(pageData) {
                return $http.post('/api/sound/collection/getdetails', pageData);
            },
            updateCollection: function(pageData) {
                return $http.post('/api/sound/collection/update', pageData);
            },
            addCollection: function(pageData) {
                return $http.post('/api/sound/collection/add', pageData);
            },
            deleteCollection: function(pageData) {
                return $http.post('/api/sound/collection/delete', pageData);
            }
        };
    }
])

.factory('monsterFactory', ['$http', '$compile',
    function($http, $compile) {

        return {
            getMonsters: function(pageData) {
                console.log(pageData);
                return $http.post('/api/monster/get', pageData);
            },
            addMonster: function(pageData) {
                var id = pageData._id;
                return $http.post('/api/monster/add', pageData);
            },
            updateMonster: function(pageData) {
                return $http.post('/api/monster/update', pageData);
            },
            deleteMonster: function(id) {
               var pageData = {"field":"id","value":id};
                return $http.post('/api/monster/delete', pageData);
            },
            getMonsterContent: function(pageData) {
                return $http.post('/api/monster/' + name);
            },
            getSpells: function(pageData) {
                return $http.post('/api/monster/getspells', pageData);
            },
            diceBag: function(el, actor, mod, dice, scope, adv) {
                console.log(typeof mod === 'object');
                console.log(Array.isArray(mod));
                if (typeof mod === 'object') {
                    var d = new Date();
                    d = " " + d.getTime();
                    d = d.substring(d.length - 6) + "" + Math.floor((Math.random() * 1000) + 1);
                    var pattern = new RegExp("\{collapse\}", "g");
                    if (mod.damage != null) var damage = mod.damage.replace(pattern, '<a class=\"toggleLabel\" ng-click=\"toggle' + d + '=!toggle' + d + '\"> &gt;&gt;<\/a><span class=\"toggleHidden\" ng-if=\"toggle' + d + '\">');
                    if (mod.special != null) var special = mod.special.replace(pattern, '<a class=\"toggleLabel\" ng-click=\"toggle' + d + 2 + '=!toggle' + d + 2 + '\"> &gt;&gt;<\/a><span class=\"toggleHidden\" ng-if=\"toggle' + d + 2 + '\">');
                    pattern = new RegExp("\{\/collapse\}", "g");
                    if (mod.damage != null) damage = damage.replace(pattern, '</span>');
                    if (mod.special != null) special = special.replace(pattern, '</span>');
                    if (mod.bonus == "") {
                        var tmp = '<strong>' + actor + '</strong>, ' + mod.name + ": " + this.rollDice(damage) + "<br><span class='combatSpecial' contenteditable='false'>" + special + "<br>";
                    } else {
                        var fullResult;
                        if (mod.bonus != null) {
                            if (mod.bonus.substr(0, 1) != "+" && mod.bonus.substr(0, 1) != "-") {
                                mod.bonus = "+" + mod.bonus;
                            }
                        }
                        switch (adv) {
                            case 'a':
                                fullResult = eval(Math.max(this.getRandomInt(1, 20), this.getRandomInt(1, 20)) + mod.bonus);
                                break;
                            case 'd':
                                fullResult = eval(Math.min(this.getRandomInt(1, 20), this.getRandomInt(1, 20)) + mod.bonus);
                                break;
                            default:
                                fullResult = eval(this.getRandomInt(1, 20) + mod.bonus);
                        }
                        if (damage) {
                            fullResult = "Hit <strong>AC" + fullResult + "</strong> for " + this.rollDice(damage) + " ";
                        }
                        if (special) {
                            fullResult = fullResult + "<br><span class='combatSpecial' contenteditable='false'>" + special + '</span> ';
                        }
                        var tmp = '<strong>' + actor + '</strong>, ' + mod.name + ": " + fullResult + "<br>";
                    }
                } else var tmp = '<strong>' + actor + '</strong>, ' + mod + ": " + this.rollDice(dice) + "<br>";
                tmp = $compile(tmp)(scope);
                el.prepend(tmp);
            },
            getRandomInt: function(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            rollDice: function(roll) {
                if (roll == "-" || roll == "") {
                    return "";
                }
                var result = 0;
                var reg = /[0-9]+d[0-9]+/g;
                var vMatch;
                var tRoll;
                roll = String(roll);
                vMatch = roll.match(reg);
                if (vMatch == null) {
                    vMatch = [];
                }
                for (var r = 0; r < vMatch.length; r++) {
                    tRoll = vMatch[r].split("d");
                    result=0;
                    for (var i = 0; i < tRoll[0]; i++) {
                        result = result + this.getRandomInt(1, tRoll[1]);
                    }
                    roll = roll.replace(vMatch[r], result);
                }
                reg = /[0-9\+-]{3,10}/g;
                vMatch = roll.match(reg);
                console.log(vMatch);
                if (vMatch == null) return roll;
                for (var r = 0; r < vMatch.length; r++) {
                    console.log(roll);
                    //vMatch[r] = vMatch[r].replace("--","-");
                    console.log(vMatch[r]);
                    console.log(eval(vMatch[r]));
                    roll = roll.replace(vMatch[r], eval(vMatch[r]));
                }
                return roll;
            }
        };
    }
])

.factory('soundsFactory', ['$http', '$rootScope',
    function($http, $rootScope) {
        var scenes = {};
        var aScene = [];
        var unregister = [];

        var getRandomInt = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        var mixToMono = function(buffer) {
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
        return {
            playSound: function(data) {

            },
            getScenes: function(pageData) {
                return $http.post('/api/sound/scene/get', pageData);
            },
            getSounds: function(data) {
                return $http.get('/api/sounds/sounds/get');
            },
            playEffect: function(data) {

            },
            toggleScene: function(data) {
                console.log(JSON.stringify(data));
                if (typeof scenes[data.name] === 'undefined') {
                    if (scenes.length >= 5) {
                        alert("You can only play 5 scenes at once.");
                        return;
                    }
                    scenes[data.name] = angular.copy(data);
                    aScene = scenes[data.name];

                    aScene.context = new AudioContext();
                    aScene.gainNode = [];
                    console.log(aScene);
                    console.log(scenes);
                    aScene.context.destination.channelCountMode = "explicit";
                    aScene.context.destination.channelInterpretation = "discrete";
                    aScene.context.destination.channelCount = aScene.context.destination.maxChannelCount;

                    for (var j = 0; j < aScene.effects.length; j++) {
                        if (aScene.effects[j].preDelay>0) {
                            aScene.effects[j].nextPlay = getRandomInt(aScene.effects[j].delayL, aScene.effects[j].delayH) + aScene.context.currentTime + aScene.effects[j].preDelay + aScene.context.currentTime;
                        } else aScene.effects[j].nextPlay = 0;
                        if (j == 0) aScene.nextPlay = aScene.effects[j].nextPlay;
                        else if (aScene.nextPlay > aScene.effects[j].nextPlay) aScene.nextPlay = aScene.effects[j].nextPlay;
                    }
                    if (typeof aScene.nextPlay == "undefined") {
                        aScene.nextPlay = 0;
                    }

                    unregister[data.name] = $rootScope.$watch(function() {
                        return aScene.context.currentTime;
                    }, function() {
                        if (aScene.nextPlay > aScene.context.currentTime) return;
                        aScene.effects.forEach(function(Effect) {
                            if (typeof Effect.nextPlay == "undefined") {
                                Effect.nextPlay = 0;
                            }
                            if (typeof aScene === "undefined") {
                                return;
                            }
                            if (aScene.closeTime <= aScene.context.currentTime) {
                                aScene.context.close();
                                delete aScene.closeTime;
                                delete aScene.effects;
                                delete scenes[data.name];
                                unregister[data.name]();
                            } else if (Effect.nextPlay <= aScene.context.currentTime) {
                                $rootScope.chkScene(data.name);
                            }
                        });
                    });
                } else {
                    aScene = scenes[data.name];
                    aScene.gainNode.forEach(function(gNode) {
                        gNode.gain.linearRampToValueAtTime(gNode.gainSet, aScene.context.currentTime);
                        gNode.gain.linearRampToValueAtTime(0, aScene.context.currentTime + (aScene.fadeOut));
                    });
                    aScene.closeTime = aScene.context.currentTime + (aScene.fadeOut);
                }
            },
            chkScene: function(name) {
                console.log(name);
                aScene = scenes[name];
                for (var j = 0; j < aScene.effects.length; j++) {
                    if (aScene.effects[j].nextPlay < aScene.context.currentTime + 0.5 && (aScene.effects[j].active || aScene.effects[j].active == null)) {
                        aScene.effects[j].nextPlay = aScene.context.currentTime + 20000;
                        var source = aScene.context.createBufferSource();
                        var perChance = 0;
                        for (var k = 0; k < aScene.effects[j].sounds.length; k++) {
                            perChance += aScene.effects[j].sounds[k].chance;
                        }
                        var perRoll = getRandomInt(1, perChance);
                        perChance = 0;
                        var k=0;
                        for (var l = 0; l < aScene.effects[j].sounds.length; l++) {
                            perChance += aScene.effects[j].sounds[l].chance;
                        console.log(perRoll);
                        console.log(perChance);
                            if (perChance > perRoll) {
                                var url = "/sounds/" + aScene.effects[j].sounds[l].file;
                                k=l;
                                break;
                            }
                        }
                        console.log(j);
                        console.log(k);
                        console.log(url);
                        console.log(aScene);
                        var cents = aScene.effects[j].sounds[k].pitchSet;
                        cents = cents + getRandomInt(-aScene.effects[j].sounds[k].pitchVar, aScene.effects[j].sounds[k].pitchVar * 2);
                        cents = cents * 3;
                        var rate = Math.pow(2.0, cents / 1200.0);
                        source.playbackRate.value = rate;
                        var request = new XMLHttpRequest();
                        request.open("GET", url + "?" + aScene.name + "," + j + "," + k, true);
                        request.responseType = "arraybuffer";
                        request.onload = function() {
                            aScene.context.decodeAudioData(request.response, function(buffer) {
                                    mixToMono(buffer);
                                    source.buffer = buffer;
                                    //aScene.source = source;
                                    aScene.merger = aScene.context.createChannelMerger(8);
                                    aScene.gainNode.push(aScene.merger.context.createGain());
                                    var gainIndex = aScene.gainNode.length - 1;
                                    aScene.gainNode[gainIndex].gainSet = (aScene.effects[j].sounds[k].vol / 100) * (aScene.effects[j].vol / 100) * (aScene.vol / 100);
                                    aScene.merger.connect(aScene.gainNode[gainIndex]);
                                    aScene.gainNode[gainIndex].connect(aScene.context.destination);
                                    var startSceneFade = aScene.effects[j].sounds[k].fadeIn;
                                    if (aScene.context.currentTime < 2) {
                                        startSceneFade = aScene.fadeIn;
                                    }
                                    aScene.gainNode[gainIndex].gain.linearRampToValueAtTime(0, aScene.context.currentTime);
                                    aScene.gainNode[gainIndex].gain.linearRampToValueAtTime(aScene.gainNode[gainIndex].gainSet, (aScene.context.currentTime + (startSceneFade)));

                                    var silence = aScene.context.createBufferSource();
                                    var channelMax = (aScene.context.destination.maxChannelCount - 2);
                                    var channelplayed;
                                    if (aScene.context.destination.maxChannelCount < 3) {
                                        (channelMax = 1)
                                    }
                                    if (aScene.effects[j].sounds[k].randLoc) {
                                        for (var i = 0; i < 7; i++) {
                                            silence.connect(aScene.merger, 0, i);
                                        }
                                        channelplayed = getRandomInt(0, channelMax);
                                        source.connect(aScene.merger, 0, channelplayed);
                                        aScene.gainNode[gainIndex].gainSet = getRandomInt(aScene.gainNode[gainIndex].gainSet * 0.2, aScene.gainNode[gainIndex].gainSet);
                                        console.log("Channel Played:" + channelplayed);
                                    } else {
                                        for (var i = 0; i < 8; i++) {
                                            source.connect(aScene.merger, 0, i);
                                        }
                                        channelplayed = "all";
                                    }

                                    if (aScene.effects[j].loop) aScene.effects[j].nextPlay = getRandomInt(aScene.effects[j].delayL, aScene.effects[j].delayH) + buffer.duration + aScene.context.currentTime - (aScene.effects[j].sounds[k].fadeIn);
                                    else {
                                        aScene.effects[j].nextPlay = 99999999;
                                        if(!aScene.effects[j].sounds[k].loop) aScene.closeTime = aScene.context.currentTime + (buffer.duration);
                                        }
                                    if (aScene.nextPlay > aScene.effects[j].nextPlay) aScene.nextPlay = aScene.effects[j].nextPlay;

                                    console.log("Playing sound " + aScene.effects[j].sounds[k].name + " from " + aScene.effects[j].name + " in scene " + aScene.name);
                                    if(aScene.effects[j].sounds[k].loop) {
                                        source.loop=true;
                                        aScene.effects[j].nextPlay = 9999999;
                                    }
                                    source.start(0);
                                    // At the end of the track, fade it out.
                                    console.log(aScene.effects[j].nextPlay);
                                    console.log(aScene.context.currentTime);
                                    if(aScene.effects[j].sounds[k].fadeOut>0){
                                    aScene.gainNode[gainIndex].gain.linearRampToValueAtTime(aScene.gainNode[gainIndex].gainSet, (aScene.context.currentTime + buffer.duration - aScene.effects[j].sounds[k].fadeOut));
                                    aScene.gainNode[gainIndex].gain.linearRampToValueAtTime(0, (aScene.context.currentTime + buffer.duration));
                                    }


                                },
                                function(e) {
                                    "Error with decoding audio data" + e
                                });
                        };
                        console.log("send");
                        request.send();
                        return;
                    }
                }
            },
            scenes

        };
    }
])

.factory('citizenFactory', ['$http',
    function($http) {

        return {
            getCitizen: function(pageData) {
                return $http.post('/api/citizens/getcitizen', pageData);
            },
            getWorld: function(pageData) {
                return $http.get('/api/citizens/getWorld');
            },
            getCitizens: function(pageData) {
                return $http.post('/api/citizens/getcitizens', pageData);
            },
            getRaces: function(pageData) {
                return $http.post('/api/citizens/getraces', pageData);
            },
            getAspects: function(pageData) {
                return $http.post('/api/citizens/getaspects', pageData);
            },
            updateCitizen: function(pageData) {
                return $http.post('/api/citizens/citizen/update', pageData);
            },
            addCitizen: function(pageData) {
                return $http.post('/api/citizens/citizen/add', pageData);
            },
            deleteCitizen: function(pageData) {
                return $http.post('/api/citizens/citizen/delete', pageData);
            },
            seedRegion: function(pageData) {
                return $http.post('/api/citizens/seedregion', pageData);
            },
            getRegions: function(pageData) {
                return $http.post('/api/citizens/region/get', pageData);
            },
            ageRegion: function(pageData) {
                return $http.post('/api/citizens/ageregion', pageData);
            },
            updateRegion: function(pageData) {
                return $http.post('/api/citizens/region/update', pageData);
            },
            clearRegion: function(pageData) {
                return $http.post('/api/citizens/region/clear', pageData);
            },
            addRegion: function(pageData) {
                return $http.post('/api/citizens/region/add', pageData);
            },
            deleteRegion: function(pageData) {
                return $http.post('/api/citizens/region/delete', pageData);
            },
            getDescriptives: function(pageData) {
                return $http.post('/api/citizens/descriptives/get', pageData);
            },
            updateDescriptives: function(pageData) {
                return $http.post('/api/citizens/descriptives/update', pageData);
            },
            updateNpcRecord: function(table,pageData) {
                return $http.post('/api/citizens/'+table+'/update', pageData);
            },
            deleteNpcRecord: function(table,pageData) {
                return $http.post('/api/citizens/'+table+'/delete', pageData);
            },
            addDescriptives: function(pageData) {
                return $http.post('/api/citizens/descriptives/add', pageData);
            },
            deleteDescriptives: function(pageData) {
                return $http.post('/api/citizens/descriptives/delete', pageData);
            }
        };
    }
])


.factory('siteFactory', ['$http',
    function($http) {

        return {
            getSettings: function() {
                console.log("test");
                return $http.get('/api/settings/get');
            },

            saveSettings: function(pageData) {
                return $http.post('/api/settings/set', pageData);
            },
            login: function(pageData) {
                return $http.post('/login', pageData);
            },
            resetPassword: function(pageData){
                return $http.post('/api/user/reset-password', pageData);
            },
            startMembership: function(pageData){
                return $http.post('/api/user/membership', pageData);
            }

        }
    }
])