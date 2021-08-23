class MathHelper {
  static roundNumber(numberToRound, numberOfDecimalPlaces) {
    if (numberToRound === 0) {
      return 0;
    }

    if (!numberToRound) {
      return '';
    }

    const scrubbedNumber = numberToRound.toString().replace('$', '').replace(',', '');
    return Math.round(scrubbedNumber * Math.pow(10, numberOfDecimalPlaces)) / Math.pow(10, numberOfDecimalPlaces);
  }

  static addArray(values) { // adds array of values passed.
    const total = values.reduce((previousValue, currentValue) => {
      return previousValue + parseInt(this.convertToPennies(currentValue), 10); // do math in pennies to assure accuracy.
    }, 0);

    return total / 100; // convert back into dollars
  }

  static queueEffect(effect) {

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
                            if (perChance >= perRoll) {
                                var url = "/sounds/" + aScene.effects[j].sounds[l].file;
                                k=l;
                                break;
                            }
                        }
                        if(typeof url == "undefined"){
                            console.log("undefined");
                            aScene.effects[j].nextPlay = 0;
                            return;
                        }
                        var feedback={};
                        feedback.j=j;
                        feedback.k=k;
                        feedback.url=url;
                        feedback.aScene=aScene;
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
                                        feedback.channel=channelplayed;
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

                                    console.log("Playing sound " + aScene.effects[j].sounds[k].name + " from " + aScene.effects[j].name + " in scene " + aScene.name);
                                    if(aScene.effects[j].sounds[k].loop) {
                                        source.loop=true;
                                        aScene.effects[j].nextPlay = 9999999;
                                    }
                                    source.start(0);
                                        // At the end of the track, fade it out.
                                    if(aScene.effects[j].sounds[k].fadeOut>0){
                                    aScene.gainNode[gainIndex].gain.linearRampToValueAtTime(aScene.gainNode[gainIndex].gainSet, (aScene.context.currentTime + buffer.duration - aScene.effects[j].sounds[k].fadeOut));
                                    aScene.gainNode[gainIndex].gain.linearRampToValueAtTime(0, (aScene.context.currentTime + buffer.duration));
                                    }


                                },
                                function(e) {
                                    "Error with decoding audio data" + e
                                });
                        };
                        console.log(feedback);
                        request.send();
                        return;
                    }


export default MathHelper;
