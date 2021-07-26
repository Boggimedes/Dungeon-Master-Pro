import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() { }
}

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
