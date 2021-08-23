//esversion:6
class scenePlayer {
  static constructor(s) {
    this.ctxArray = [];
    this.scenes = s;
  }

  static openContext(scene){
    if (empty(this.ctxArray[scene]) && this.ctxArray.length < 7) {
      this.ctxArray[scene] = {};
      this.ctxArray[scene].context = new (window.AudioContext || window.webkitAudioContext)();
    } else if (this.ctxArray.length >= 6) {
      console.log("attempted to load too many audio context objects");
      return false;
    }
    return true;
  }

  static startScene(iScene) {
    var allScenes = this.scenes;
    var scene = allScenes[iScene];
    var effect;
    var iEffect;
    this.openContext(scene.name);

      let i = 0;
      let iLen = scene.effects.length;

      for (i; i < iLen; i++) {
        effect = scene.effects[i];
        iEffect = i;
        if (effect.preDelay>0) {
          this.queueEffect(iScene, iEffect, getRandomInt(effect.delayL, effect.delayH) + effect.preDelay);
        } else {
          this.queueEffect(iScene, iEffect, 0);
        }
      }
  }

    static closeContext(scene) {

  }

  static currentTime(scene){

  }

  static mergerChannel(scene) {

  }

  static createGain(scene) {

  }
 static  playEffect(iScene, iEffect, iSound, source) {
        var duration = source.buffer.duration;
    var allScenes = this.scenes;
    var scene = allScenes[iScene];
    var effect = scene.effects[iEffect];
    var sound = scene.effects[iSound];
    var ctx = this.ctxArray[scene.name];
       //Do stuff
    if (effect.loop) {
      this.queueEffect(iScene, iEffect, getRandomInt(effect.delayL, effect.delayH) + duration + ctx.context.currentTime - (sound.fadeIn));
    } else if(!sound.loop){
      scene.timeout = window.setTimeout(this.closeScene(iScene), duration);
    }
    source.start(0);
    source.ended(this.cleanupEffect(iEffect));
    // At the end of the track, fade it out.
    if(sound.fadeOut>0){
      ctx.gainNode[gainIndex].gain.linearRampToValueAtTime(ctx.gainNode[gainIndex].gainSet, (ctx.context.currentTime + buffer.duration - sound.fadeOut));
      ctx.gainNode[gainIndex].gain.linearRampToValueAtTime(0, (ctx.context.currentTime + duration));
    }
}

  static createSource(scene) {
    return this.ctxArray[scene].context.createBufferSource();
  }

 static  queueEffect(iScene, iEffect, delay = 0) {
    var allScenes = this.scenes;
    var scene = allScenes[iScene];
    var effect = scene.effects[iEffect];
    var sound;
    var iSound;
    var startSceneFade = sound.fadeIn;
    var cents = sound.pitchSet;
    var source;
    var merger;
    var gI;
    var ctx = this.ctxArray[scene.name];
    var silence = ctx.context.createBufferSource();
    var channelMax = (ctx.context.destination.maxChannelCount - 2);
    var channelplayed;
    var perChance;
    var perRoll;
    var url;
    var i;

        perChance = effect.sounds.reduce((t, c) =>  t + c.chance);
        perRoll = getRandomInt(1, perChance);
        perChance = 0;

        for (i = 0; i < iLen; i++) {
            perChance += effect.sounds[i].chance;
            if (perChance >= perRoll) {
                sound = effect.sounds[i];
                iSound = i;
                url = "/sounds/" + effect.sounds[i].file;
                if(typeof url == "undefined"){
                    console.log("could not locate file");
                    return;
                }
               break;
            }
        }

    cents = cents + getRandomInt(-sound.pitchVar, sound.pitchVar * 2);
    cents = cents * 3;
    sound.gI = gI = scene.name + effect.name + scene.context.currentTime;

    source = ctx.context.createBufferSource();
    merger = ctx.context.createChannelMerger(8);
    ctx.gainNode[gI] = merger.context.createGain();
    ctx.gainNode[gI].gainSet = (sound.vol / 100) * (effect.vol / 100) * (scene.vol / 100);
    merger.connect(ctx.gainNode[gI]);
    source.playbackRate.value = Math.pow(2.0, cents / 1200.0);
    ctx.gainNode[gI].connect(ctx.context.destination);

    if (ctx.context.currentTime < 2) startSceneFade = scene.fadeIn;
    ctx.gainNode[gI].gain.linearRampToValueAtTime(0, ctx.context.currentTime);
    ctx.gainNode[gI].gain.linearRampToValueAtTime(ctx.gainNode[gI].gainSet, (ctx.context.currentTime + (startSceneFade)));

    if (ctx.context.destination.maxChannelCount < 3) channelMax = 1;

    if (sound.randLoc) {
      for (i = 0; i < 7; i++) {
      silence.connect(merger, 0, i);
      }
      channelplayed = getRandomInt(0, channelMax);
      source.connect(merger, 0, channelplayed);
      ctx.gainNode[gI].gainSet = getRandomInt(ctx.gainNode[gI].gainSet * 0.2, ctx.gainNode[gI].gainSet);

    } else {
      for (i = 0; i < 8; i++) source.connect(scene.merger, 0, i);
      channelplayed = "all";
    }

    source.loop=sound.loop;


    $.get(url).done(function(audio) {
      ctx.context.decodeAudioData(audio).then(function(decodedData) {
                                    decodedData = mixToMono(decodedData);
                                    source.buffer = decodedData;
                                    if(ctx[effect] === undefined) ctx[effect] = {};
                                    ctx[effect].timeout = window.setTimeout(this.playEffect(iScene, iEffect, iSound, source),delay);
                                });
    });
  }
}

export default scenePlayer;
