"use strict";

window.Religions = (function () {
  // name generation approach and relative chance to be selected
  const approach = {
    Number: 1,
    Being: 3,
    Adjective: 5,
    "Color + Animal": 5,
    "Adjective + Animal": 5,
    "Adjective + Being": 5,
    "Adjective + Genitive": 1,
    "Color + Being": 3,
    "Color + Genitive": 3,
    "Being + of + Genitive": 2,
    "Being + of the + Genitive": 1,
    "Animal + of + Genitive": 1,
    "Adjective + Being + of + Genitive": 2,
    "Adjective + Animal + of + Genitive": 2,
  };

  // turn weighted array into simple array
  const approaches = [];
  for (const a in approach) {
    for (let j = 0; j < approach[a]; j++) {
      approaches.push(a);
    }
  }

  const base = {
    number: [
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
    ],
    being: [
      "God",
      "Goddess",
      "Lord",
      "Lady",
      "Deity",
      "Creator",
      "Maker",
      "Overlord",
      "Ruler",
      "Chief",
      "Master",
      "Spirit",
      "Ancestor",
      "Father",
      "Forebear",
      "Forefather",
      "Mother",
      "Brother",
      "Sister",
      "Elder",
      "Numen",
      "Ancient",
      "Virgin",
      "Giver",
      "Council",
      "Guardian",
      "Reaper",
    ],
    animal: [
      "Dragon",
      "Wyvern",
      "Phoenix",
      "Unicorn",
      "Sphinx",
      "Centaur",
      "Pegasus",
      "Kraken",
      "Basilisk",
      "Chimera",
      "Cyclope",
      "Antelope",
      "Ape",
      "Badger",
      "Bear",
      "Beaver",
      "Bison",
      "Boar",
      "Buffalo",
      "Cat",
      "Cobra",
      "Crane",
      "Crocodile",
      "Crow",
      "Deer",
      "Dog",
      "Eagle",
      "Elk",
      "Fox",
      "Goat",
      "Goose",
      "Hare",
      "Hawk",
      "Heron",
      "Horse",
      "Hyena",
      "Ibis",
      "Jackal",
      "Jaguar",
      "Lark",
      "Leopard",
      "Lion",
      "Mantis",
      "Marten",
      "Moose",
      "Mule",
      "Narwhal",
      "Owl",
      "Panther",
      "Rat",
      "Raven",
      "Rook",
      "Scorpion",
      "Shark",
      "Sheep",
      "Snake",
      "Spider",
      "Swan",
      "Tiger",
      "Turtle",
      "Viper",
      "Vulture",
      "Walrus",
      "Wolf",
      "Wolverine",
      "Worm",
      "Camel",
      "Falcon",
      "Hound",
      "Ox",
      "Serpent",
    ],
    adjective: [
      "New",
      "Good",
      "High",
      "Old",
      "Great",
      "Big",
      "Young",
      "Major",
      "Strong",
      "Happy",
      "Last",
      "Main",
      "Huge",
      "Far",
      "Beautiful",
      "Wild",
      "Fair",
      "Prime",
      "Crazy",
      "Ancient",
      "Proud",
      "Secret",
      "Lucky",
      "Sad",
      "Silent",
      "Latter",
      "Severe",
      "Fat",
      "Holy",
      "Pure",
      "Aggressive",
      "Honest",
      "Giant",
      "Mad",
      "Pregnant",
      "Distant",
      "Lost",
      "Broken",
      "Blind",
      "Friendly",
      "Unknown",
      "Sleeping",
      "Slumbering",
      "Loud",
      "Hungry",
      "Wise",
      "Worried",
      "Sacred",
      "Magical",
      "Superior",
      "Patient",
      "Dead",
      "Deadly",
      "Peaceful",
      "Grateful",
      "Frozen",
      "Evil",
      "Scary",
      "Burning",
      "Divine",
      "Bloody",
      "Dying",
      "Waking",
      "Brutal",
      "Unhappy",
      "Calm",
      "Cruel",
      "Favorable",
      "Blond",
      "Explicit",
      "Disturbing",
      "Devastating",
      "Brave",
      "Sunny",
      "Troubled",
      "Flying",
      "Sustainable",
      "Marine",
      "Fatal",
      "Inherent",
      "Selected",
      "Naval",
      "Cheerful",
      "Almighty",
      "Benevolent",
      "Eternal",
      "Immutable",
      "Infallible",
    ],
    genitive: [
      "Day",
      "Life",
      "Death",
      "Night",
      "Home",
      "Fog",
      "Snow",
      "Winter",
      "Summer",
      "Cold",
      "Springs",
      "Gates",
      "Nature",
      "Thunder",
      "Lightning",
      "War",
      "Ice",
      "Frost",
      "Fire",
      "Doom",
      "Fate",
      "Pain",
      "Heaven",
      "Justice",
      "Light",
      "Love",
      "Time",
      "Victory",
    ],
    theGenitive: [
      "World",
      "Word",
      "South",
      "West",
      "North",
      "East",
      "Sun",
      "Moon",
      "Peak",
      "Fall",
      "Dawn",
      "Eclipse",
      "Abyss",
      "Blood",
      "Tree",
      "Earth",
      "Harvest",
      "Rainbow",
      "Sea",
      "Sky",
      "Stars",
      "Storm",
      "Underworld",
      "Wild",
    ],
    color: [
      "Dark",
      "Light",
      "Bright",
      "Golden",
      "White",
      "Black",
      "Red",
      "Pink",
      "Purple",
      "Blue",
      "Green",
      "Yellow",
      "Amber",
      "Orange",
      "Brown",
      "Grey",
    ],
  };

  const forms = {
    Folk: { Shamanism: 2, Animism: 2, "Ancestor worship": 1, Polytheism: 2 },
    Organized: { Polytheism: 5, Dualism: 1, Monotheism: 4, "Non-theism": 1 },
    Cult: { Cult: 1 },
    Heresy: { Heresy: 1 },
  };

  const methods = {
    "Random + type": 1,
    "Random + ism": 1,
    "Supreme + ism": 1,
    "Faith of + Supreme": 1,
    "Place + ism": 1,
    "Culture + ism": 1,
    "Place + ian + type": 1,
    "Culture + type": 1,
  };

  const types = {
    Shamanism: { Beliefs: 3, Shamanism: 2, Spirits: 1 },
    Animism: { Spirits: 1, Beliefs: 1 },
    "Ancestor worship": { Beliefs: 1, Forefathers: 2, Ancestors: 2 },
    Polytheism: { Deities: 3, Faith: 1, Gods: 1, Pantheon: 1 },

    Dualism: { Religion: 3, Faith: 1, Cult: 1 },
    Monotheism: { Religion: 1, Church: 1 },
    "Non-theism": { Beliefs: 3, Spirits: 1 },

    Cult: { Cult: 4, Arcanum: 1, Occultism: 1, Coven: 1 },
    // Cult: {Cult: 4, Sect: 4, Worship: 1, Orden: 1, Coterie: 1, Arcanum: 1},
    // "Dark Cult": {Cult: 2, Sect: 2, Occultism: 1, Idols: 1, Coven: 1, Circle: 1, Blasphemy: 1},

    Heresy: {
      Heresy: 3,
      Sect: 2,
      Schism: 1,
      Dissenters: 1,
      Circle: 1,
      Brotherhood: 1,
      Society: 1,
      Iconoclasm: 1,
      Dissent: 1,
      Apostates: 1,
    },
  };

  const generate = function () {
    TIME && console.time("generateReligions");
    const cells = pack.cells,
      states = pack.states,
      cultures = pack.cultures;
    const religions = (pack.religions = []);
    cells.religion = new Uint16Array(cells.i.length); // cell religion; initially based on culture
    religions.push({ i: 0, name: "No religion" });

    // add folk religions
    // pack.cultures.forEach(c => {
    //   if (!c.i) {
    //     religions.push({i: 0, name: "No religion"});
    //     return;
    //   }
    //   if (c.removed) {
    //     religions.push({i: c.i, name: "Extinct religion for " + c.name, color: getMixedColor(c.color, 0.1, 0), removed: true});
    //     return;
    //   }
    //   const form = rw(forms.Folk);
    //   const name = c.name + " " + rw(types[form]);
    //   const deity = form === "Animism" ? null : getDeityName(c.i);
    //   const color = getMixedColor(c.color, 0.1, 0); // `url(#hatch${rand(8,13)})`;
    //   religions.push({i: c.i, name, color, culture: c.i, type: "Folk", form, deity, center: c.center, origin: 0});
    // });

    const burgs = pack.burgs.filter((b) => b.i && !b.removed);
    const sorted =
      burgs.length > +religionsInput.value
        ? burgs.sort((a, b) => b.population - a.population).map((b) => b.cell)
        : cells.i
            .filter((i) => cells.s[i] > 2)
            .sort((a, b) => cells.s[b] - cells.s[a]);
    const religionsTree = d3.quadtree();
    const spacing =
      (graphWidth + graphHeight) / 6 / window.regionReligions.length; // base min distance between towns

    let localCultures = JSON.parse(JSON.stringify(window.regionCultures));

    window.regionReligions = window.regionReligions.map((r) => {
      let origin = 0;
      let expansion = "global";
      let name = "";
      if (!r.type) r.type = P(0.2) ? "Folk" : P(0.5) ? "Organized" : "Cult";
      if (!r.expansionism) r.expansionism = rand(15, 45) / 10;
      if (!r.form) r.form = rw(forms.Folk);
      if (localCultures.length === 0)
        localCultures = JSON.parse(JSON.stringify(window.regionCultures));
      if (localCultures.length === 0) return r;
      if (typeof r.culture != "undefined" && r.culture) {
        let index = 0;
        localCultures.find((c, i) => {
          index = i;
          return (r.culture = c.i);
        });
        r.cObject = localCultures.splice(index, 1)[0];
      } else {
        r.cObject = localCultures.splice(
          rand(0, localCultures.length - 1),
          1
        )[0];
        r.culture = r.cObject.i;
      }
      r.center = r.cObject.center;
      r.deity =
        r.form === "Animism" || r.form === "Non-Theism"
          ? null
          : getDeityName(r.cObject.i);

      if (!r.center)
        r.center =
          sorted[biased(0, sorted.length - 1, r.type === "Organized" ? 5 : 1)]; // religion center

      let state = cells.state[r.center];

      if (r.type === "Folk") {
        r.center = r.cObject.center;
        r.expansion = "culture";
        if (!r.name) r.name = (r.cObject.name + " " + rw(types[r.form])).trim();
      } else {
        [name, expansion] = getReligionName(r.form, r.deity, r.center);
        if (expansion === "state" && !r.state) expansion = "global";
        if (expansion === "culture" && !r.culture) expansion = "global";
        if (!r.name) r.name = name;

        if (expansion === "state" && state && Math.random() > 0.5)
          r.center = states[state].center;

        //   console.log(cells.burg);
        //   let selectBurgs = cells.c[r.center].filter(c => {
        //     console.log(c);
        //     console.log(cells.burg[c]);
        //     return cells.burg[c];
        //   });
        //   console.log(selectBurgs);
        //   selectBurgs.forEach((center) => {
        var x = cells.p[r.center][0],
          y = cells.p[r.center][1];

        //     var s = r.type === "Organized" ? spacing * gauss(1, 0.3, 0.2, 2, 2) : gauss(2, 0.3, 1, 3, 2); // randomize to make the placement not uniform
        //     if (religionsTree.find(x, y, s) !== undefined) continue; // to close to existing religion

        //     // add "Old" to name of the folk religion on this culture
        let folk = religions.find(
          (l) => l.culture === r.culture && r.type === "Folk"
        );
        if (folk && expansion === "culture" && folk.name.slice(0, 3) !== "Old")
          folk.name = "Old " + folk.name;
        origin = folk ? folk.i : 0;
        //   } while (religionsTree.find(x, y, s) !== undefined);
      }
      // let expansionism = rand(3, 8);
      // let color = getMixedColor(religions[origin].color, 0.3, 0); // `url(#hatch${rand(0,5)})`;
      const color = getMixedColor(r.cObject.color, 0.1, 0); // `url(#hatch${rand(8,13)})`;

      religions.push({
        i: religions.length,
        name: r.name,
        color,
        culture: r.culture,
        type: r.type,
        form: r.form,
        deity: r.deity,
        expansion,
        expansionism: r.expansionism,
        center: r.center,
        origin,
      });
      if (r.type !== "Folk") religionsTree.add([x, y]);
      return r;
    });

    religionsInput.value = localCultures.length;
    if (religionsInput.value == 0 || pack.cultures.length < 2) {
      religions
        .filter((r) => r.i)
        .forEach((r) => (r.code = abbreviate(r.name)));
      return;
    }

    // const cultsCount = Math.floor((rand(10, 40) / 100) * religionsInput.value);
    // const count = +religionsInput.value - cultsCount + religions.length;
    // const cultsCount = Math.floor(+religionsInput.value / 2);
    // const count = Math.ceil(+religionsInput.value / 2);
    // // generate organized religions
    // for (let i = 0; i < count; i++) {
    //   let r =         r.cObject = localCultures.splice(rand(0,localCultures.length-1),1);
    //     r.culture = r.cObject.i;

    //   let center = sorted[biased(0, sorted.length - 1, 5)]; // religion center
    //   const form = r.form ? r.form : rw(forms.Organized);
    //   const state = cells.state[center];
    //   let culture = cells.culture[center];

    //   if (!culture) {
    //     r.cObject = localCultures.splice(rand(0,localCultures.length-1),1);
    //     r.culture = r.cObject.i;
    //   }

    //   const deity = form === "Non-theism" ? null : getDeityName(culture);
    //   let [name, expansion] = getReligionName(form, deity, center);
    //   if (expansion === "state" && !state) expansion = "global";
    //   if (expansion === "culture" && !culture) expansion = "global";

    //   if (expansion === "state" && Math.random() > 0.8) center = states[state].center;
    //   if (expansion === "culture" && Math.random() > 0.3) center = cultures[culture].center;

    //   if (!cells.burg[center] && cells.c[center].some(c => cells.burg[c])) center = cells.c[center].find(c => cells.burg[c]);
    //   const x = cells.p[center][0],
    //     y = cells.p[center][1];

    //   const s = spacing * gauss(1, 0.3, 0.2, 2, 2); // randomize to make the placement not uniform
    //   if (religionsTree.find(x, y, s) !== undefined) continue; // to close to existing religion

    //   // add "Old" to name of the folk religion on this culture
    //   const folk = religions.find(r => r.culture === culture && r.type === "Folk");
    //   if (folk && expansion === "culture" && folk.name.slice(0, 3) !== "Old") folk.name = "Old " + folk.name;
    //   const origin = folk ? folk.i : 0;

    //   const expansionism = rand(3, 8);
    //   const color = getMixedColor(religions[origin].color, 0.3, 0); // `url(#hatch${rand(0,5)})`;
    //   religions.push({i: religions.length, name, color, culture, type: "Organized", form, deity, expansion, expansionism, center, origin});
    //   religionsTree.add([x, y]);
    // }

    // // generate cults
    // for (let i = 0; religions.length < count + cultsCount && i < 1000; i++) {
    //   const form = rw(forms.Cult);
    //   let center = sorted[biased(0, sorted.length - 1, 1)]; // religion center
    //   if (!cells.burg[center] && cells.c[center].some(c => cells.burg[c])) center = cells.c[center].find(c => cells.burg[c]);
    //   const x = cells.p[center][0],
    //     y = cells.p[center][1];

    //   const s = spacing * gauss(2, 0.3, 1, 3, 2); // randomize to make the placement not uniform
    //   if (religionsTree.find(x, y, s) !== undefined) continue; // to close to existing religion

    //   const culture = cells.culture[center];
    //   const folk = religions.find(r => r.culture === culture && r.type === "Folk");
    //   const origin = folk ? folk.i : 0;
    //   const deity = getDeityName(culture);
    //   const name = getCultName(form, center);
    //   const expansionism = gauss(1.1, 0.5, 0, 5);
    //   const color = getMixedColor(cultures[culture].color, 0.5, 0); // "url(#hatch7)";
    //   religions.push({i: religions.length, name, color, culture, type: "Cult", form, deity, expansion: "global", expansionism, center, origin});
    //   religionsTree.add([x, y]);
    //   //debug.append("circle").attr("cx", x).attr("cy", y).attr("r", 2).attr("fill", "red");
    // }

    expandReligions();

    // generate heresies
    religions
      .filter((r) => r.type === "Organized")
      .forEach((r) => {
        if (r.expansionism < 3) return;
        const count = gauss(0, 1, 0, 3);
        for (let i = 0; i < count; i++) {
          let center = ra(
            cells.i.filter(
              (i) =>
                cells.religion[i] === r.i &&
                cells.c[i].some((c) => cells.religion[c] !== r.i)
            )
          );
          if (!center) continue;
          if (!cells.burg[center] && cells.c[center].some((c) => cells.burg[c]))
            center = cells.c[center].find((c) => cells.burg[c]);
          const x = cells.p[center][0],
            y = cells.p[center][1];
          if (religionsTree.find(x, y, spacing / 10) !== undefined) continue; // to close to other

          const culture = cells.culture[center];
          const name = getCultName("Heresy", center);
          const expansionism = gauss(1.2, 0.5, 0, 5);
          const color = getMixedColor(r.color, 0.4, 0.2); // "url(#hatch6)";
          religions.push({
            i: religions.length,
            name,
            color,
            culture,
            type: "Heresy",
            form: r.form,
            deity: r.deity,
            expansion: "global",
            expansionism,
            center,
            origin: r.i,
          });
          religionsTree.add([x, y]);
        }
      });

    expandHeresies();
    checkCenters();
    window.regionReligions = pack.religions.slice(1);
    religionsTable();

    TIME && console.timeEnd("generateReligions");
  };

  const add = function (center) {
    const cells = pack.cells,
      religions = pack.religions;
    const r = cells.religion[center];
    const i = religions.length;
    const culture = cells.culture[center];
    const color = getMixedColor(religions[r].color, 0.3, 0);

    const type =
      religions[r].type === "Organized"
        ? rw({ Organized: 4, Cult: 1, Heresy: 2 })
        : rw({ Organized: 5, Cult: 2 });
    const form = rw(forms[type]);
    const deity =
      type === "Heresy"
        ? religions[r].deity
        : form === "Non-theism"
        ? null
        : getDeityName(culture);

    let name, expansion;
    if (type === "Organized")
      [name, expansion] = getReligionName(form, deity, center);
    else {
      name = getCultName(form, center);
      expansion = "global";
    }
    const formName = type === "Heresy" ? religions[r].form : form;
    const code = abbreviate(
      name,
      religions.map((r) => r.code)
    );
    religions.push({
      i,
      name,
      color,
      culture,
      type,
      form: formName,
      deity,
      expansion,
      expansionism: 0,
      center,
      cells: 0,
      area: 0,
      rural: 0,
      urban: 0,
      origin: r,
      code,
    });
    cells.religion[center] = i;
  };

  // growth algorithm to assign cells to religions
  const expandReligions = function () {
    const cells = pack.cells,
      religions = pack.religions;
    const queue = new PriorityQueue({ comparator: (a, b) => a.p - b.p });
    const cost = [];

    religions
      .filter((r) => r.type === "Organized" || r.type === "Cult")
      .forEach((r) => {
        cells.religion[r.center] = r.i;
        queue.queue({
          e: r.center,
          p: 0,
          r: r.i,
          s: cells.state[r.center],
          c: r.culture,
        });
        cost[r.center] = 1;
      });

    const neutral =
      (cells.i.length / 5000) *
      200 *
      gauss(1, 0.3, 0.2, 2, 2) *
      neutralInput.value; // limit cost for organized religions growth
    const popCost = d3.max(cells.pop) / 3; // enougth population to spered religion without penalty
    console.log(neutralInput.value);
    console.log(neutral);

    while (queue.length) {
      const next = queue.dequeue(),
        n = next.e,
        p = next.p,
        r = next.r,
        c = next.c,
        s = next.s;
      const expansion = religions[r].expansion;

      cells.c[n].forEach(function (e) {
        if (expansion === "culture" && c !== cells.culture[e]) return;
        if (expansion === "state" && s !== cells.state[e]) return;

        const cultureCost = c !== cells.culture[e] ? 10 : 0;
        const stateCost = s !== cells.state[e] ? 10 : 0;
        const biomeCost = cells.road[e] ? 1 : biomesData.cost[cells.biome[e]];
        const populationCost = Math.max(rn(popCost - cells.pop[e]), 0);
        const heightCost = Math.max(cells.h[e], 20) - 20;
        const waterCost = cells.h[e] < 20 ? (cells.road[e] ? 50 : 1000) : 0;
        const totalCost =
          p +
          (cultureCost +
            stateCost +
            biomeCost +
            populationCost +
            heightCost +
            waterCost) /
            religions[r].expansionism;
        if (totalCost > neutral) return;

        if (!cost[e] || totalCost < cost[e]) {
          if (cells.h[e] >= 20 && cells.culture[e]) cells.religion[e] = r; // assign religion to cell
          cost[e] = totalCost;
          queue.queue({ e, p: totalCost, r, c, s });
        }
      });
    }
  };

  // growth algorithm to assign cells to heresies
  const expandHeresies = function () {
    const cells = pack.cells,
      religions = pack.religions;
    const queue = new PriorityQueue({ comparator: (a, b) => a.p - b.p });
    const cost = [];

    religions
      .filter((r) => r.type === "Heresy")
      .forEach((r) => {
        const b = cells.religion[r.center]; // "base" religion id
        cells.religion[r.center] = r.i; // heresy id
        queue.queue({ e: r.center, p: 0, r: r.i, b });
        cost[r.center] = 1;
      });

    const neutral = (cells.i.length / 5000) * 1000 * neutralInput.value; // limit cost for heresies growth

    while (queue.length) {
      const next = queue.dequeue(),
        n = next.e,
        p = next.p,
        r = next.r,
        b = next.b;

      cells.c[n].forEach(function (e) {
        const religionCost = cells.religion[e] === b ? 0 : 2000;
        const biomeCost = cells.road[e] ? 0 : biomesData.cost[cells.biome[e]];
        const heightCost = Math.max(cells.h[e], 20) - 20;
        const waterCost = cells.h[e] < 20 ? (cells.road[e] ? 50 : 1000) : 0;
        const totalCost =
          p +
          (religionCost + biomeCost + heightCost + waterCost) /
            Math.max(religions[r].expansionism, 0.1);

        if (totalCost > neutral) return;

        if (!cost[e] || totalCost < cost[e]) {
          if (cells.h[e] >= 20 && cells.culture[e]) cells.religion[e] = r;
          // assign religion to cell
          else cells.religion[e] = 0;
          cost[e] = totalCost;
          queue.queue({ e, p: totalCost, r });
        }
      });
    }
  };

  function checkCenters() {
    const { cells, religions } = pack;

    const codes = religions.map((r) => r.code);
    religions.forEach((r) => {
      if (!r.i) return;
      r.code = abbreviate(r.name, codes);

      // move religion center if it's not within religion area after expansion
      if (cells.religion[r.center] === r.i) return; // in area
      const religCells = cells.i.filter((i) => cells.religion[i] === r.i);
      if (!religCells.length) return; // extinct religion
      r.center = religCells.sort((a, b) => cells.pop[b] - cells.pop[a])[0];
    });
  }

  function updateCultures() {
    TIME && console.time("updateCulturesForReligions");
    pack.religions = pack.religions.map((religion, index) => {
      if (index === 0) {
        return religion;
      }
      return { ...religion, culture: pack.cells.culture[religion.center] };
    });
    TIME && console.timeEnd("updateCulturesForReligions");
  }

  // get supreme deity name
  const getDeityName = function (culture) {
    if (culture === undefined) {
      ERROR && console.error("Please define a culture");
      return;
    }
    const meaning = generateMeaning();
    const cultureName = Names.getCulture(culture, null, null, "", 0.8);
    return cultureName + ", The " + meaning;
  };

  function generateMeaning() {
    const a = ra(approaches); // select generation approach
    if (a === "Number") return ra(base.number);
    if (a === "Being") return ra(base.being);
    if (a === "Adjective") return ra(base.adjective);
    if (a === "Color + Animal") return ra(base.color) + " " + ra(base.animal);
    if (a === "Adjective + Animal")
      return ra(base.adjective) + " " + ra(base.animal);
    if (a === "Adjective + Being")
      return ra(base.adjective) + " " + ra(base.being);
    if (a === "Adjective + Genitive")
      return ra(base.adjective) + " " + ra(base.genitive);
    if (a === "Color + Being") return ra(base.color) + " " + ra(base.being);
    if (a === "Color + Genitive")
      return ra(base.color) + " " + ra(base.genitive);
    if (a === "Being + of + Genitive")
      return ra(base.being) + " of " + ra(base.genitive);
    if (a === "Being + of the + Genitive")
      return ra(base.being) + " of the " + ra(base.theGenitive);
    if (a === "Animal + of + Genitive")
      return ra(base.animal) + " of " + ra(base.genitive);
    if (a === "Adjective + Being + of + Genitive")
      return (
        ra(base.adjective) + " " + ra(base.being) + " of " + ra(base.genitive)
      );
    if (a === "Adjective + Animal + of + Genitive")
      return (
        ra(base.adjective) + " " + ra(base.animal) + " of " + ra(base.genitive)
      );
  }

  function getReligionName(form, deity, center) {
    const cells = pack.cells;
    const random = function () {
      return Names.getCulture(cells.culture[center], null, null, "", 0);
    };
    const type = function () {
      return rw(types[form]);
    };
    const supreme = function () {
      return deity.split(/[ ,]+/)[0];
    };
    const place = function (adj) {
      const base = cells.burg[center]
        ? pack.burgs[cells.burg[center]].name
        : pack.states[cells.state[center]].name;
      let name = trimVowels(base.split(/[ ,]+/)[0]);
      return adj ? getAdjective(name) : name;
    };
    const culture = function () {
      return pack.cultures[cells.culture[center]].name;
    };

    const m = rw(methods);
    if (m === "Random + type") return [random() + " " + type(), "global"];
    if (m === "Random + ism") return [trimVowels(random()) + "ism", "global"];
    if (m === "Supreme + ism" && deity)
      return [trimVowels(supreme()) + "ism", "global"];
    if (m === "Faith of + Supreme" && deity)
      return [
        ra(["Faith", "Way", "Path", "Word", "Witnesses"]) + " of " + supreme(),
        "global",
      ];
    if (m === "Place + ism") return [place() + "ism", "state"];
    if (m === "Culture + ism")
      return [trimVowels(culture()) + "ism", "culture"];
    if (m === "Place + ian + type")
      return [place("adj") + " " + type(), "state"];
    if (m === "Culture + type") return [culture() + " " + type(), "culture"];
    return [trimVowels(random()) + "ism", "global"]; // else
  }

  function getCultName(form, center) {
    const cells = pack.cells;
    const type = function () {
      return rw(types[form]);
    };
    const random = function () {
      return trimVowels(
        Names.getCulture(cells.culture[center], null, null, "", 0).split(
          /[ ,]+/
        )[0]
      );
    };
    const burg = function () {
      return trimVowels(pack.burgs[cells.burg[center]].name.split(/[ ,]+/)[0]);
    };
    if (cells.burg[center]) return burg() + "ian " + type();
    if (Math.random() > 0.5) return random() + "ian " + type();
    return type() + " of the " + generateMeaning();
  }

  // calculate states data like area, population etc.
  function collectStatistics() {
    TIME && console.time("collectStatistics");
    const cells = pack.cells,
      religions = pack.religions;
    religions.forEach((s) => {
      if (s.removed) return;
      s.cells = s.area = s.burgs = s.rural = s.urban = 0;
      s.neighbors = new Set();
    });
    console.log(cells.i.length);
    for (const i of cells.i) {
      if (cells.h[i] < 20) continue;
      const s = cells.religion[i];

      // check for neighboring religions
      cells.c[i]
        .filter((c) => cells.h[c] >= 20 && cells.religion[c] !== s)
        .forEach((c) => religions[s].neighbors.add(cells.religion[c]));

      // collect stats
      religions[s].cells += 1;
      religions[s].area += cells.area[i];
      religions[s].rural += cells.pop[i];
      if (cells.burg[i]) {
        religions[s].urban += pack.burgs[cells.burg[i]].population;
        religions[s].burgs++;
      }
    }

    // convert neighbors Set object into array
    religions.forEach((s) => {
      if (!s.neighbors) return;
      s.neighbors = Array.from(s.neighbors);
    });

    TIME && console.timeEnd("collectStatistics");
  }

  // calculate and draw curved state labels for a list of states
  const drawReligionLabels = function (list) {
    const { cells, features, religions } = pack;
    const paths = []; // text paths
    lineGen.curve(d3.curveBundle.beta(1));

    for (const religion of religions) {
      let short = false;
      if (
        !religion.i ||
        religion.removed ||
        !religion.cells ||
        (list && !list.includes(religion.i))
      )
        continue;
      const used = [];
      console.log(religion);
      const visualCenter = findCell(religion.pole[0], religion.pole[1]);
      const start =
        cells.religion[visualCenter] === religion.i
          ? visualCenter
          : religion.center;
      const hull = getHull(start, religion.i, religion.cells / 10);
      const points = [...hull].map((v) => pack.vertices.p[v]);
      const delaunay = Delaunator.from(points);
      const voronoi = new Voronoi(delaunay, points, points.length);
      const chain = connectCenters(voronoi.vertices, religion.pole[1]);
      const relaxed = chain
        .map((i) => voronoi.vertices.p[i])
        .filter((p, i) => i % 15 === 0 || i + 1 === chain.length);
      paths.push([religion.i, relaxed]);
      console.log(paths);

      function getHull(start, religion, maxLake) {
        const queue = [start],
          hull = new Set();

        while (queue.length) {
          const q = queue.pop();
          const nQ = cells.c[q].filter((c) => cells.religion[c] === religion);

          cells.c[q].forEach(function (c, d) {
            const passableLake =
              features[cells.f[c]].type === "lake" &&
              features[cells.f[c]].cells < maxLake;
            if (
              cells.b[c] ||
              (cells.religion[c] !== religion && !passableLake)
            ) {
              hull.add(cells.v[q][d]);
              return;
            }
            const nC = cells.c[c].filter((n) => cells.religion[n] === religion);
            const intersected = common(nQ, nC).length;
            if (hull.size > 20 && !intersected && !passableLake) {
              hull.add(cells.v[q][d]);
              return;
            }
            if (used[c]) return;
            used[c] = 1;
            queue.push(c);
          });
        }

        return hull;
      }

      function connectCenters(c, y) {
        // check if vertex is inside the area
        const inside = c.p.map(function (p) {
          if (
            p[0] <= 0 ||
            p[1] <= 0 ||
            p[0] >= graphWidth ||
            p[1] >= graphHeight
          )
            return false; // out of the screen
          return used[findCell(p[0], p[1])];
        });

        const pointsInside = d3.range(c.p.length).filter((i) => inside[i]);
        if (!pointsInside.length) return [0];
        const h = c.p.length < 200 ? 0 : c.p.length < 600 ? 0.5 : 1; // power of horyzontality shift
        const end =
          pointsInside[
            d3.scan(
              pointsInside,
              (a, b) =>
                c.p[a][0] -
                c.p[b][0] +
                (Math.abs(c.p[a][1] - y) - Math.abs(c.p[b][1] - y)) * h
            )
          ]; // left point
        const start =
          pointsInside[
            d3.scan(
              pointsInside,
              (a, b) =>
                c.p[b][0] -
                c.p[a][0] -
                (Math.abs(c.p[b][1] - y) - Math.abs(c.p[a][1] - y)) * h
            )
          ]; // right point

        // connect leftmost and rightmost points with shortest path
        const queue = new PriorityQueue({ comparator: (a, b) => a.p - b.p });
        const cost = [],
          from = [];
        queue.queue({ e: start, p: 0 });

        while (queue.length) {
          const next = queue.dequeue(),
            n = next.e,
            p = next.p;
          if (n === end) break;

          for (const v of c.v[n]) {
            if (v === -1) continue;
            const totalCost = p + (inside[v] ? 1 : 100);
            if (from[v] || totalCost >= cost[v]) continue;
            cost[v] = totalCost;
            from[v] = n;
            queue.queue({ e: v, p: totalCost });
          }
        }

        // restore path
        const chain = [end];
        let cur = end;
        while (cur !== start) {
          cur = from[cur];
          if (inside[cur]) chain.push(cur);
        }
        return chain;
      }
    }

    void (function drawLabels() {
      let g = labels.select("#religions");
      const t = defs.select("#textPaths");
      const displayed = layerIsOn("toggleLabels");
      if (!displayed) toggleLabels();

      // if (!list) {
      // remove all labels and textpaths
      g.selectAll("text").remove();
      t.selectAll("path[id*='religionLabel']").remove();
      labels.select("#states").selectAll("text").remove();
      t.selectAll("path[id*='stateLabel']").remove();
      labels.select("#cultures").selectAll("text").remove();
      t.selectAll("path[id*='cultureLabel']").remove();
      // }

      if (typeof g._groups[0][0] == "undefined") {
        g = labels.append("g").attr("id", "religions");
        console.log(g._groups[0]);
        console.log(g._groups[0][0]);
      }

      const example = g
        .append("text")
        .attr("x", 0)
        .attr("x", 0)
        .text("Average");
      const letterLength = example.node().getComputedTextLength() / 7; // average length of 1 letter
      console.log(paths);
      paths.forEach((p) => {
        const id = p[0];
        const s = religions[p[0]];
        let short = false;
        console.log(s);
        if (list) {
          t.select("#textPath_religionLabel" + id).remove();
          g.select("#religionLabel" + id).remove();
        }

        const path =
          p[1].length > 1
            ? lineGen(p[1])
            : `M${p[1][0][0] - 50},${p[1][0][1]}h${100}`;
        const textPath = t
          .append("path")
          .attr("d", path)
          .attr("id", "textPath_religionLabel" + id);
        const pathLength =
          p[1].length > 1 ? textPath.node().getTotalLength() / letterLength : 0; // path length in letters

        let lines = [];
        let ratio = 100;

        if (pathLength < s.name.length) {
          // only short name will fit
          lines = splitInTwo(s.name);
          ratio = minmax(rn((pathLength / lines[0].length) * 60), 50, 150);
        } else if (pathLength > s.name.length * 2.5) {
          // full name will fit in one line
          lines = [s.name];
          ratio = minmax(rn((pathLength / lines[0].length) * 70), 70, 170);
        } else {
          // try miltilined label
          lines = splitInTwo(s.name);
          ratio = minmax(rn((pathLength / lines[0].length) * 60), 70, 150);
        }

        // prolongate path if it's too short
        if (pathLength && pathLength < lines[0].length) {
          const points = p[1];
          const f = points[0];
          const l = points[points.length - 1];
          const [dx, dy] = [l[0] - f[0], l[1] - f[1]];
          const mod = Math.abs((letterLength * lines[0].length) / dx) / 2;
          points[0] = [rn(f[0] - dx * mod), rn(f[1] - dy * mod)];
          points[points.length - 1] = [
            rn(l[0] + dx * mod),
            rn(l[1] + dy * mod),
          ];
          textPath.attr("d", round(lineGen(points)));
          short = true;
        }
        console.log(lines);
        example.attr("font-size", ratio + "%");
        const top = (lines.length - 1) / -2; // y offset
        const spans = lines.map((l, d) => {
          example.text(l);
          const left = example.node().getBBox().width / -2; // x offset
          return `<tspan x="${left}px" dy="${d ? 1 : top}em">${l}</tspan>`;
        });

        console.log(s.name);
        console.log(ratio);
        const el = g
          .append("text")
          .attr("id", "religionLabel" + id)
          .append("textPath")
          .attr("xlink:href", "#textPath_religionLabel" + id)
          .attr("startOffset", "50%")
          .attr("font-size", ratio + "%")
          .node();

        el.insertAdjacentHTML("afterbegin", spans.join(""));
        if (lines.length < 2) return;

        // check whether multilined label is generally inside the state. If no, replace with short name label
        const cs = pack.cells.state;
        const b = el.parentNode.getBBox();
        const c1 = () => +cs[findCell(b.x, b.y)] === id;
        const c2 = () => +cs[findCell(b.x + b.width / 2, b.y)] === id;
        const c3 = () => +cs[findCell(b.x + b.width, b.y)] === id;
        const c4 = () => +cs[findCell(b.x + b.width, b.y + b.height)] === id;
        const c5 = () =>
          +cs[findCell(b.x + b.width / 2, b.y + b.height)] === id;
        const c6 = () => +cs[findCell(b.x, b.y + b.height)] === id;
        if (c1() + c2() + c3() + c4() + c5() + c6() > 3) return; // generally inside

        // use one-line name
        const name = s.name;
        example.text(name);
        const left = example.node().getBBox().width / -2; // x offset
        el.innerHTML = `<tspan x="${left}px">${name}</tspan>`;
        ratio = minmax(rn((pathLength / name.length) * 60), 40, 130);
        el.setAttribute("font-size", ratio + "%");
      });

      example.remove();
      toggleLabels(1);
    })();
  };

  return {
    generate,
    add,
    getDeityName,
    expandReligions,
    updateCultures,
    drawReligionLabels,
    collectStatistics,
  };
})();
